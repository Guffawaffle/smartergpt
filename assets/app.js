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
});
