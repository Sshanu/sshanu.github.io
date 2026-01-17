// assets/site.js
(function () {
  function isOpen(contentEl) {
    return contentEl.style.maxHeight && contentEl.style.maxHeight !== "0px";
  }

  window.toggleSection = function (headerEl) {
    const content = headerEl.nextElementSibling;
    const toggleBtn = headerEl.querySelector(".toggle-btn");
    if (!content) return;

    if (isOpen(content)) {
      content.style.maxHeight = "0px";
      if (toggleBtn) toggleBtn.textContent = "Show";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      if (toggleBtn) toggleBtn.textContent = "Hide";
    }
  };

  // Wrap "Shanu Kumar" in authors with span.me (auto, no manual edits)
  function highlightAuthorName() {
    document.querySelectorAll(".pub-authors").forEach((el) => {
      // avoid double-wrapping
      if (el.querySelector(".me")) return;

      const html = el.innerHTML;
      const replaced = html.replaceAll(
        "Shanu Kumar",
        '<span class="me">Shanu Kumar</span>'
      );
      el.innerHTML = replaced;
    });
  }

  // Remove empty/placeholder links
  function pruneEmptyPubLinks() {
    document.querySelectorAll(".pub").forEach((pub) => {
      const links = pub.querySelector(".pub-links");
      if (!links) return;

      links.querySelectorAll("a.pub-link").forEach((a) => {
        const href = (a.getAttribute("href") || "").trim();
        if (!href || href === "#" || href.toLowerCase() === "javascript:void(0)") {
          a.remove();
        }
      });

      // remove container if nothing left
      if (!links.querySelector("a.pub-link")) links.remove();
    });
  }

  // Move pub-links into the venue row and keep venue left grouped
  function movePubLinksToVenueRow() {
    document.querySelectorAll(".pub").forEach((pub) => {
      const venue = pub.querySelector(".pub-venue");
      const links = pub.querySelector(".pub-links");
      if (!venue) return;

      // already processed
      if (venue.querySelector(".venue-left")) return;

      const left = document.createElement("div");
      left.className = "venue-left";

      // move existing venue children into left
      [...venue.childNodes].forEach((node) => {
        // skip links if they are already inside
        if (node.nodeType === 1 && node.classList.contains("pub-links")) return;
        left.appendChild(node);
      });

      venue.innerHTML = "";
      venue.appendChild(left);

      if (links) venue.appendChild(links);
    });
  }

  // Initialize open sections (those that have a non-zero inline max-height)
  window.addEventListener("load", () => {
    document.querySelectorAll(".section-content").forEach((content) => {
      if (isOpen(content)) content.style.maxHeight = content.scrollHeight + "px";
    });

    highlightAuthorName();
    pruneEmptyPubLinks();
    movePubLinksToVenueRow();
    applyVenueColors();
  });
})();


function applyVenueColors() {
  document.querySelectorAll(".venue-badge").forEach((b) => {
    const t = (b.textContent || "").trim().toUpperCase();

    // normalize common cases
    const map = {
      "ACL": "conf-acl",
      "CVPR": "conf-cvpr",
      "AAAI": "conf-aaai",
      "NAACL": "conf-naacl",
      "IJCAI": "conf-ijcai",
      "EACL": "conf-eacl",
      "COLING": "conf-coling",
      "WWW": "conf-www",
      "AACL": "conf-aacl",
      "ARXIV": "conf-arxiv"
    };

    const cls = map[t];
    if (cls) b.classList.add(cls);
  });
}