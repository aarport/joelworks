/* Reveals anything carrying data-reveal as it comes into view, and on load
   for whatever is already on screen.

   Two things this deliberately does not do. It does not use an
   IntersectionObserver: an observer never reports in a tab that is not being
   painted, which once left whole sections stuck at opacity 0. And it does not
   hide anything itself: the hiding rule hangs off .reveal-ready, which only
   this file adds, so with JavaScript off, or reduced motion asked for, nothing
   is ever hidden in the first place. */
(function () {
  var root = document.documentElement;
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  root.classList.add('reveal-ready');

  function start() {
    var els = document.querySelectorAll('[data-reveal]');
    var left = els.length;
    if (!left) { root.classList.remove('reveal-ready'); return; }

    /* The first pass takes everything actually on screen, so nothing visible
       is left blank waiting for a scroll that may never come. Passes after
       that trigger slightly early, at 0.88, so a section has begun moving by
       the time it is properly in view. */
    var first = true;

    function reveal() {
      var vh = window.innerHeight;
      var line = first ? vh : vh * 0.88;
      var batch = 0;
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.classList.contains('is-in')) continue;
        var r = el.getBoundingClientRect();
        if (r.top < line && r.bottom > 0) {
          /* Whatever arrives together cascades rather than landing as one
             block. Capped so a screenful of gallery tiles does not turn into
             a queue you have to sit and wait out. */
          el.style.animationDelay = (Math.min(batch, 8) * 0.06) + 's';
          batch++;
          el.classList.add('is-in');
          left--;
        }
      }
      first = false;
      if (left <= 0) {
        window.removeEventListener('scroll', reveal);
        window.removeEventListener('resize', reveal);
      }
    }

    reveal();
    window.addEventListener('scroll', reveal, { passive: true });
    window.addEventListener('resize', reveal);
    /* Images finishing after DOMContentLoaded can reflow a masonry column and
       push something onto the first screen that was not there when the first
       pass ran. Neither scroll nor resize fires for that. */
    window.addEventListener('load', reveal);

    /* Last resort, for the case where this script binds and then stops
       working. The failure to look for is something hidden while it is on
       screen; something hidden below the fold is just waiting its turn, so
       timing alone cannot tell the two apart. On a long page a slow reader
       would trip a plain timeout and lose the animation for the whole rest
       of the page. */
    var guard = setInterval(function () {
      if (left <= 0) { clearInterval(guard); return; }
      reveal();                       /* catch any later layout change too */
      if (left <= 0) { clearInterval(guard); return; }
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.classList.contains('is-in')) continue;
        var r = el.getBoundingClientRect();
        /* Strictly inside the 0.88 trigger line. Anything between the two
           is simply below the line and waiting, not stuck, and testing at
           the same threshold would report those as a failure. */
        if (r.top < window.innerHeight * 0.7 && r.bottom > 0) {
          root.classList.remove('reveal-ready');
          clearInterval(guard);
          return;
        }
      }
    }, 4000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
