// Small nicety: current year in footer (CSP-safe; no inline script)
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Update "Last updated" date on roadmap page
  const lastUpdated = document.getElementById('lastUpdated');
  if (lastUpdated) {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    lastUpdated.textContent = date.toLocaleDateString('en-US', options);
  }

  // Highlight active navigation link
  try {
    const current = window.location.pathname || '/';
    const normalize = (p) => {
      // Remove duplicate slashes, strip trailing index.html and trailing slashes
      let x = (p || '/').replace(/\\+/g, '/');
      x = x.replace(/index\.html$/i, '');
      if (x.length > 1) x = x.replace(/\/+$/, '/');
      return x;
    };
    const here = normalize(current);
    const links = document.querySelectorAll('header.nav .links a.pill');
    links.forEach((a) => {
      // Use the resolved absolute pathname from the anchor
      const linkPath = normalize(a.pathname || a.getAttribute('href') || '');
      if (linkPath && (here === linkPath || here.endsWith(linkPath))) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });
  } catch (_) {
    // no-op if URL parsing fails
  }

  // Access Request form -> mailto assembly
  try {
    const form = document.getElementById('accessForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const name = (fd.get('name') || '').toString().trim();
        const email = (fd.get('email') || '').toString().trim();
        const org = (fd.get('org') || '').toString().trim();
        const use = (fd.get('use') || '').toString().trim();
        const github = (fd.get('github') || '').toString().trim();

        // Minimal client-side validation
        if (!name || !email || !use) {
          alert('Please provide your name, email, and intended use.');
          return;
        }

        const subject = encodeURIComponent('LexRunner Access Request');
        const bodyLines = [
          `Name: ${name}`,
          `Email: ${email}`,
          org ? `Organization: ${org}` : '',
          github ? `GitHub: ${github}` : '',
          '',
          'Intended Use / Goals:',
          use,
          '',
          `Page: ${location.href}`
        ].filter(Boolean);
        const body = encodeURIComponent(bodyLines.join('\n'));

        const mailto = `mailto:hello@smartergpt.dev?subject=${subject}&body=${body}`;
        // Open mail client; also update fallback link for copy/open
        const fallback = document.getElementById('fallbackMailto');
        if (fallback) fallback.href = mailto;
        window.location.href = mailto;

        const success = document.getElementById('successMsg');
        if (success) success.style.display = 'block';
      });
    }
  } catch (_) {
    // ignore
  }
});
