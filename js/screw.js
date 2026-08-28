/* Centres the disc that stands in for the o on the headings.

   Two things make this impossible to hard code. The first is the font: this
   site loads none, so the headings are system-ui, which is SF Pro on an
   iPhone, Roboto on an Android, Segoe on Windows, Helvetica on an older Mac.
   Measured across those, the drop the disc needs off the centre of the inline
   box ranges from .071em to .117em, which at a heading size is over a pixel
   and a half of travel and plainly visible beside the letters it sits in.

   The second is that the centre of the inline box is not where the font says
   it is. At a device pixel ratio of 2 the same heading laid its inline box out
   at 25.5px while the font's own ascent and descent came to 26, and half of
   that half pixel lands straight in the answer.

   So neither end of the sum is assumed here. A zero-sized inline-block sits on
   the baseline for exactly as long as it takes to read where the baseline is,
   and the ink centre of a real lowercase o comes from canvas metrics for
   whatever font is actually rendering. The CSS keeps its old constant as the
   fallback, so with JavaScript off, or on a browser without ink metrics,
   nothing is worse than it was. */
(function () {
  var els = document.querySelectorAll('.screw');
  if (!els.length) return;

  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext && canvas.getContext('2d');
  if (!ctx || !ctx.measureText) return;
  if (typeof ctx.measureText('o').actualBoundingBoxAscent !== 'number') return;

  function place() {
    var ink = {};
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var cs = getComputedStyle(el);
      var size = parseFloat(cs.fontSize);
      if (!size) continue;

      /* Same shorthand the canvas font property takes. A page repeats the same
         heading size all the way down, so each one is measured once. */
      var font = cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
      var centre = ink[font];

      if (centre === undefined) {
        ctx.font = font;
        var m = ctx.measureText('o');
        centre = (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
        /* An o is a round letter: its ink straddles the baseline slightly and
           its centre sits near half the x-height. Anything outside that is a
           measurement that went wrong rather than a real typeface. */
        if (!isFinite(centre) || centre < size * 0.15 || centre > size * 0.45) centre = null;
        ink[font] = centre;
      }
      if (centre === null) continue;

      /* A zero-sized inline-block aligns its bottom edge to the baseline, and
         with no height its top edge is the baseline too. */
      var probe = document.createElement('i');
      probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
      el.appendChild(probe);
      var baseline = probe.getBoundingClientRect().top - el.getBoundingClientRect().top;
      el.removeChild(probe);
      if (!isFinite(baseline) || baseline <= 0) continue;

      el.style.setProperty('--screw-top', (baseline - centre).toFixed(3) + 'px');
    }
  }

  place();
  /* Heading sizes are clamped against the viewport, so a rotated phone lands
     on a different size and a different rasterisation of the same font. */
  window.addEventListener('resize', place);
  window.addEventListener('load', place);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
})();
