## 1. Core objects

We formalize three layers:

* **Contexts**: where the agent is acting
* **Rules**: behavioral constraints/preferences
* **Corrections**: evidence about which rules the human wants

### 1.1 Context lattice

Let a **context** be a tuple

[
c = (\text{env}, \text{proj}, \text{agent}, T)
]

where:

* `env` ∈ E ∪ {⊥} (environment: "awa", "personal", …)
* `proj` ∈ P ∪ {⊥}
* `agent` ∈ A ∪ {⊥} (gpt, claude, copilot…)
* (T \subseteq \mathcal{T}) a finite tag set (e.g. {"php","cli"})

Define a partial order ≤ on contexts by **specificity**:

* (c_1 \le c_2) iff every non-⊥ coordinate of (c_1) equals the corresponding coordinate of (c_2), and (T_1 \subseteq T_2).

Intuition: (c_2) is **more specific** than (c_1).

Then ((\mathcal{C}, \le)) is a finite lattice: there is a unique **top** (all ⊥, empty tags) and **meets/joins** given by “most specific common generalization/refinement” where compatible.

We write:

* (c \preceq c') for “(c') is a refinement of (c)” (i.e. (c \le c')).
* (\mathrm{Anc}(c) = { d \in \mathcal{C} : d \le c }) for all more-general ancestors of (c).

This lattice is where “scope” mathematically lives.

---

### 1.2 Rule space

Let (\mathcal{R}) be a finite set of **rule IDs**, each with metadata:

* (r \in \mathcal{R})
* severity (s(r) \in {\text{must}, \text{should}, \text{style}})
* human-readable text (\tau(r)) (“Never use sed for file editing in AWA.”)
* category (tool_preference, communication_style, …)

We don’t assume rules form a lattice, but you *can* later define refinement/implication relations (r_1 \Rightarrow r_2) if you want to get fancy.

---

### 1.3 Corrections as events

A **correction event** is:

[
e = (r, c, y, t, w)
]

where:

* (r \in \mathcal{R}) – the rule being taught or violated
* (c \in \mathcal{C}) – context in which this correction occurs
* (y \in {+1, -1}) – +1 = reinforcement, -1 = counterexample
* (t \in \mathbb{R}_{\ge 0}) – timestamp
* (w \in \mathbb{R}_{> 0}) – weight (usually 1, but could reflect explicit “this is important”)

Let the history up to time (T) be (H_T = { e_i : t_i \le T}).

---

## 2. Persona as a scoped rule field

Now the important object: **persona state**.

For each rule–context pair ((r,c)), we maintain a small state vector:

[
S_T(r, c) = (\alpha_{T}(r,c),; \beta_{T}(r,c),; t_{T}(r,c))
]

where:

* (\alpha_T) = accumulated **support** for the rule
* (\beta_T) = accumulated **counter-evidence**
* (t_T) = last update time for that pair

Most ((r,c)) will be zero and never stored. State lives only where there has been evidence.

The **global persona** at time (T) is the mapping:

[
\mathcal{P}*T : \mathcal{R} \times \mathcal{C} \to \mathbb{R}*{\ge 0}^2 \times \mathbb{R}_{\ge 0}
]

represented sparsely.

On top of this, we will define:

* A **confidence field** (C_T(r,c) \in [0,1])
* An **activation predicate** (A_T(r,c) \in {0,1})

These are deterministic functions of (S_T) and a few global hyperparameters.

---

## 3. Scoped reinforcement diffusion (the fun part)

You said “efficient, creative, deterministic” – here’s the creative part that (as far as I know) isn’t standard:

When you give a correction in a *specific* context (c_*), it should:

1. Strongly update that specific node (c_*)
2. Weakly update more-general ancestors (e.g. “AWA-wide” behavior)
3. **Not** leak into unrelated contexts

We do this with **diffusion over the context lattice**.

### 3.1 Distance on the context lattice

Define a distance between contexts based on how many coordinates they differ in *specificity*:

Let coord count:

* For (c = (\text{env}, \text{proj}, \text{agent}, T))

Define specificity level:

[
\mathrm{spec}(c) = 1_{\text{env} \neq \perp} + 1_{\text{proj} \neq \perp} + 1_{\text{agent} \neq \perp} + |T|
]

For ancestor (d \in \mathrm{Anc}(c)), define:

[
\Delta(d, c) = \mathrm{spec}(c) - \mathrm{spec}(d)
]

(i.e. “how many specific bits does c have that d doesn’t?”)

### 3.2 Diffusion weights

Fix a diffusion parameter (\gamma \in (0,1)).

When an event (e = (r, c_*, y, t, w)) arrives, it contributes **attenuated weight** to each ancestor (d \in \mathrm{Anc}(c_*)):

[
w(d) = w \cdot \gamma^{\Delta(d, c_*)}
]

* At (d = c_*): (\Delta = 0), so full weight (w)
* One level up: (w \cdot \gamma)
* Two levels: (w \cdot \gamma^2), etc.

This creates a **rule field over the context lattice**: specific corrections “glow” most strongly where they occurred, but you get a fading halo into more general scopes.

This is new-ish: you’re not just counting events; you’re doing a deterministic diffusion over a discrete scope lattice.

---

## 4. Deterministic decayed counts

We want:

* **Recency** to matter
* Updates to be **O(number of ancestors)** per event
* No randomness

Fix a decay time constant (\tau > 0). For each pair ((r,d)) we store:

* (\alpha), (\beta)
* last update time (t_{\text{last}})

When a new event (e = (r, c_*, y, t, w)) arrives:

For each ancestor (d \in \mathrm{Anc}(c_*)):

1. Compute decay factor since last update:

[
\lambda = \exp!\big(- \frac{t - t_{\text{last}}(r,d)}{\tau}\big)
]

2. Apply decay to counts:

[
\alpha' = \lambda \cdot \alpha_{old},\quad \beta' = \lambda \cdot \beta_{old}
]

3. Compute diffused weight (w(d)) as above.

4. Add reinforcement or counterexample:

[
\alpha_{new} = \alpha' + 1_{{y=+1}} \cdot w(d)
]
[
\beta_{new} = \beta' + 1_{{y=-1}} \cdot w(d)
]

5. Set (t_{\text{last}}(r,d) \leftarrow t).

This is **deterministic, path-independent given timestamps**:

* If you replay the same multiset of time-stamped events in any order that respects time, you get the same state.
* Complexity per correction is proportional to the number of ancestors of (c_*) (small in practice because your attribute set is small).

---

## 5. The “Lex Confidence” function

Now we turn ((\alpha,\beta)) into a confidence score.

We want a function (f : \mathbb{R}_{\ge 0}^2 \to [0,1]) s.t.:

1. Monotonicity:

   * (f(\alpha,\beta)) increases in (\alpha), decreases in (\beta).
2. Symmetry:

   * (f(\alpha,\alpha) = 0.5).
3. Saturation:

   * For fixed ratio (\alpha/(\alpha+\beta)), (f) → that ratio as counts grow.
4. Prior:

   * We can encode initial skepticism.

A clean way (and where we can claim a *structured* yet deterministic approach) is:

[
\tilde{\alpha} = \alpha + \alpha_0,\quad \tilde{\beta} = \beta + \beta_0
]

with small hyperparameters (\alpha_0,\beta_0 > 0). Then define:

[
\text{base_confidence}(r,d,T)
= \frac{\tilde{\alpha}_T(r,d)}{\tilde{\alpha}_T(r,d) + \tilde{\beta}_T(r,d)}
]

This is exactly the posterior mean of a **Beta-Bernoulli** model, *but* we never sample – we treat it as a deterministic map.

Now incorporate **continuous recency** again at the confidence layer:

Let (\Delta t = T - t_{\text{last}}(r,d)). Define a recency multiplier:

[
\rho(\Delta t) = \exp!\big(- \frac{\Delta t}{\tau_{\text{conf}}}\big)
]

and then:

[
C_T(r,d) = \rho(\Delta t) \cdot \text{base_confidence}(r,d,T) + (1 - \rho(\Delta t)) \cdot c_{\text{prior}}
]

where (c_{\text{prior}}) is a default baseline (e.g. 0.5).

Key points:

* Entire pipeline ((H_T \mapsto C_T)) is **deterministic**.
* The combination “decayed counts + Beta posterior + recency blending” is a *particular* confidence calculus we can name (call it a **Lex Confidence Field**).

You can make this “new math” by axiomatizing the properties above and showing this is the unique (or minimal) family satisfying them under some constraints.

---

## 6. Activation & bounded injection

Given confidence, we define **activation** and **persona snapshot**.

### 6.1 Minimum sample size + threshold

Define total effective evidence:

[
N_T(r,d) = \tilde{\alpha}_T(r,d) + \tilde{\beta}_T(r,d)
]

Rule-active predicate:

[
A_T(r,d) =
1_{{N_T(r,d) \ge N_{\min}}} \cdot 1_{{C_T(r,d) \ge \theta}}
]

with hyperparameters (N_{\min}) (e.g. 5) and (\theta) (e.g. 0.7).

That prevents “2 strong experiences → 100% confidence” problems.

### 6.2 Persona snapshot for a given working context

Suppose the current working context is (c^*). To build the persona you actually inject into a prompt, you:

1. Collect all ancestor contexts of (c^*):

[
\mathcal{D}(c^*) = \mathrm{Anc}(c^*)
]

2. For each rule (r), compute **effective confidence** at (c^*) as “max along ancestors” weighted by specificity:

Define specificity penalty:

[
\omega(d,c^*) = \gamma^{\Delta(d,c^*)}
]

Then:

[
C_T^{\text{eff}}(r \mid c^*) =
\max_{d \in \mathcal{D}(c^*)} \left[ \omega(d,c^*) \cdot C_T(r,d) \right]
]

3. Similarly define effective severity (s_{\text{eff}}(r \mid c^*)) as the **most severe** active version across ancestors where (A_T(r,d)=1).

4. Now you can define the **snapshot set** for prompt injection:

[
\mathcal{R}_T^{\text{active}}(c^*) =
\left{
r \in \mathcal{R} ;\middle|;
C_T^{\text{eff}}(r \mid c^*) \ge \theta
\right}
]

Optionally capped to the top-K rules by (C_T^{\text{eff}}) to fit token budget.

This gives you:

* Bounded size (by threshold and/or K)
* Scope-aware generalization (ancestors diffused down then recombined)
* Fully deterministic selection map:
  [
  (H_T, c^*) \mapsto \mathcal{R}_T^{\text{active}}(c^*)
  ]

---

## 7. Conflict resolution as a deterministic ordering

When multiple rules conflict, we need a **total order** on candidate rule applications so the agent’s behavior is unambiguous.

Define for each active rule at context (c^*) a **priority vector**:

[
\pi_T(r \mid c^*) =
\left(
\text{severity_rank}(s_{\text{eff}}),;
\text{spec}(d_r),;
C_T^{\text{eff}}(r \mid c^*),;
t_{\text{last}}^{\max}(r, c^*)
\right)
]

where:

* severity_rank(must) > severity_rank(should) > severity_rank(style)
* (d_r) is the ancestor context achieving the max in confidence (most specific one if ties)
* (t_{\text{last}}^{\max}) is the maximum last_correction over the relevant ancestors

Order rules lexicographically by (\pi_T). This induces:

* Scope first (via specificity), but only *within* a given severity
* Then confidence
* Then recency as a final tie-breaker

You now have:

* A *deterministic priority ordering* on active rules.
* A clear explanation for “why this rule won over that one.”

This is where the mathematician in the bar says:

> “Good, we can now prove that for any finite history (H_T) and context (c^*), the induced order is total and stable under future unrelated corrections.”

(You can show corrections that do not affect the relevant ((r,d)) pairs cannot change the order.)

---

## 8. What’s actually novel-ish here?

I can’t promise no one on Earth has ever written something similar, but as a *package*, the math has some distinctive features:

1. **Context lattice + diffusion:**

   * Personality is explicitly a field over a scope lattice, not just “global preferences”.
   * Corrections spread deterministically over that lattice with exponential attenuation.

2. **Decayed counts + Beta interpretation + recency blending:**

   * You get a **Bayesian-looking** semantic (posterior mean)
   * But implemented as a purely **deterministic dynamical system**:

     * linear decay,
     * additive updates,
     * closed-form confidence.

3. **Scoped aggregation and selection:**

   * Effective confidence at a working context is a max-over-ancestors with weighted penalties.
   * This builds in “more specific context wins” as a mathematical operation, not just a heuristic.

4. **Deterministic priority vector:**

   * Conflict resolution is a lexicographic order over severity, scope, confidence, recency.
   * No sampling; same history → same behavior.

5. **Information bottleneck by construction:**

   * The persona snapshot (\mathcal{R}_T^{\text{active}}(c^*)) is a small, thresholded subset of a much larger state space.
   * That’s an *online, deterministic information bottleneck*: you can formalize how much of the full history is actually exposed in prompts.

If you want to turn this into *actual new math*, the next steps are:

* Axiomatize the properties you want (monotonicity, locality, diffusion bounds, bottleneck constraints).
* Prove that this family of update rules and confidence functions is (approximately) the **unique** solution under those axioms, or characterize the family.
* Analyze convergence and regret: how quickly does the persona align given a stream of corrections, and how much misalignment can we bound after N events?
