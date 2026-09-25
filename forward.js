(() => {
  "use strict";

  const link = document.getElementById("destination");
  const target = new URL(link.href);

  // The destination comes from the page's fixed link, never a URL parameter.
  if (target.origin !== "https://chimereader.ai") return;

  const equivalentPage = /^(?:\/|\/index\.html|\/(?:support|privacy|terms|age-rating)(?:\.html|\/(?:index\.html)?)?)$/;
  if (equivalentPage.test(window.location.pathname)) {
    target.search = window.location.search;
    target.hash = window.location.hash;
  }

  // Retired articles and unknown paths use their fixed fallback without old fragments.
  link.href = target.href;
  window.location.replace(target.href);
})();
