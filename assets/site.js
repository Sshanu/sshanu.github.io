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

  // Wrap "Shanu Kumar" in authors with span.me (auto, no manual edits needed)
  function highlightAuthorName() {
    document.querySelectorAll(".pub-authors").forEach((el) => {
      const html = el.innerHTML;
      el.innerHTML = html.replaceAll(
        "Shanu Kumar",
        '<span class="me">Shanu Kumar</span>'
      );
    });
  }

  // Move .pub-links into the .pub-venue row and group venue items on the left
  function movePubLinksToVenueRow() {
    document.querySelectorAll(".pub").forEach((pub) => {
      const venue = pub.querySelector(".pub-venue");
      const links = pub.querySelector(".pub-links");
      if (!venue || !links) return;

      // already processed
      if (venue.querySelector(".venue-left")) return;

      const left = document.createElement("div");
      left.className = "venue-left";

      // move current venue children into left (except links if any)
      [...venue.childNodes].forEach((node) => {
        if (node.nodeType === 1 && node.classList.contains("pub-links")) return;
        left.appendChild(node);
      });

      venue.innerHTML = "";
      venue.appendChild(left);
      venue.appendChild(links);
    });
  }

  window.addEventListener("load", () => {
    // Initialize open sections (those that have a non-zero inline max-height)
    document.querySelectorAll(".section-content").forEach((content) => {
      if (isOpen(content)) content.style.maxHeight = content.scrollHeight + "px";
    });

    highlightAuthorName();
    removeEmptyPubLinks();
    movePubLinksToVenueRow();
  });
})();

// Remove placeholder publication links (href="#" or empty)
function removeEmptyPubLinks() {
  document.querySelectorAll(".pub-links a").forEach((a) => {
    const href = (a.getAttribute("href") || "").trim();
    if (!href || href === "#") a.remove();
  });

  // If a pub-links container becomes empty, remove it too
  document.querySelectorAll(".pub-links").forEach((wrap) => {
    if (!wrap.querySelector("a")) wrap.remove();
  });
}