/* Shrinks the hero pill until its one line of towns actually fits.

   This exists because predicting the width from font size does not work: the
   stylesheet cannot know which face system-ui resolves to, and the same rule
   that fits in one browser overflows in another. Measuring the rendered box
   sidesteps the guess entirely.

   The CSS already sets a size that is close, so this usually changes nothing.
   With JavaScript off the CSS value stands on its own. */
(function () {
  var pill = document.querySelector('.eyebrow');
  var towns = pill && pill.querySelector('.eyebrow__towns');
  if (!pill || !towns) return;

  function fit() {
    pill.style.fontSize = '';                     // start from the CSS value
    var host = pill.parentElement;
    var cs = getComputedStyle(host);
    var room = host.clientWidth
             - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
             - 1;                                 // a hair, for rounding
    var size = parseFloat(getComputedStyle(pill).fontSize);
    var floor = 7;                                // below this, stop and wrap
    var guard = 0;
    while (pill.getBoundingClientRect().width > room && size > floor && guard < 60) {
      size -= 0.25;
      pill.style.fontSize = size + 'px';
      guard++;
    }
    /* If even the floor will not do it, let the line break rather than run off
       the edge. */
    towns.style.whiteSpace = pill.getBoundingClientRect().width > room ? 'normal' : '';
  }

  fit();
  window.addEventListener('resize', fit);
  /* Webfonts and the system face can settle after first paint, which changes
     the measurement, so run it again once fonts are ready. */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();
