// assets/main.js
(function () {
  const headerHTML = `
    <header class="site-header">
      <div class="nav-inner">
        <div class="nav-left">
          <a class="social-icon" href="mailto:shanu.kumar@mbzuai.ac.ae" title="Email" aria-label="Email">
            <i class="fa-solid fa-envelope"></i>
          </a>

          <a class="social-icon" href="https://scholar.google.com/citations?user=PR_Xi0EAAAAJ&hl=en"
             target="_blank" rel="noreferrer" title="Google Scholar" aria-label="Google Scholar">
            <i class="fa-solid fa-graduation-cap"></i>
          </a>

          <a class="social-icon" href="curriculum_vitae_2025.pdf" title="CV" aria-label="CV">
            <i class="fa-regular fa-file-lines"></i>
          </a>

          <a class="social-icon" href="https://github.com/Sshanu" target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub">
            <i class="fa-brands fa-github"></i>
          </a>

          <!-- Replace with your actual LinkedIn URL -->
          <a class="social-icon" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn">
            <i class="fa-brands fa-linkedin"></i>
          </a>

          <a class="social-icon" href="https://twitter.com/Sshanukr" target="_blank" rel="noreferrer" title="Twitter/X" aria-label="Twitter/X">
            <i class="fa-brands fa-x-twitter"></i>
          </a>
        </div>

        <nav class="nav-right tabs" aria-label="Primary">
          <a class="tab" href="index.html" data-tab="about">About</a>
          <a class="tab" href="blog.html" data-tab="blog">Blog</a>
          <a class="tab" href="photography.html" data-tab="photography">Photography</a>
        </nav>
      </div>
    </header>
  `;

  const footerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div>© ${new Date().getFullYear()} Shanu Kumar</div>
        <div style="display:flex; gap:14px; flex-wrap:wrap;">
          <a href="publications.html">Publications</a>
          <a href="misc.html">Talks / Teaching / Service</a>
          <a href="index.html">About</a>
        </div>
      </div>
    </footer>
  `;

  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");
  if (headerMount) headerMount.innerHTML = headerHTML;
  if (footerMount) footerMount.innerHTML = footerHTML;

  // Active tab
  const page = document.body.getAttribute("data-page");
  if (page) {
    document.querySelectorAll(".tab").forEach((t) => {
      if (t.dataset.tab === page) t.classList.add("active");
    });
  }

  // Abstract toggle (publications)
  window.toggleAbstract = function (id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("show");
  };
})();