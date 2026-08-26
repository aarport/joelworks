/* Draws the towns gently toward the pointer, so the area map answers the mouse
   rather than sitting there as a picture.

   Guarded three ways. It does nothing without a fine pointer that can hover, so
   a phone is untouched. It does nothing when reduced motion is asked for. And
   it only ever writes a transform, so with this file blocked or broken the map
   still renders exactly as it does now. */
(function () {
  var svg = document.querySelector('.areamap');
  if (!svg) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

  var towns = [].slice.call(svg.querySelectorAll('.areamap__town'));
  if (!towns.length) return;

  var VB = svg.viewBox.baseVal;
  var REACH = 130;        // user units at which the pull has faded to nothing
  var PULL  = 9;          // most a town will travel, in user units
  var frame = null, px = null, py = null;

  towns.forEach(function (g) {
    g.__x = parseFloat(g.getAttribute('data-x'));
    g.__y = parseFloat(g.getAttribute('data-y'));
  });

  function apply() {
    frame = null;
    for (var i = 0; i < towns.length; i++) {
      var g = towns[i], tx = 0, ty = 0;
      if (px !== null) {
        var dx = px - g.__x, dy = py - g.__y;
        var d = Math.sqrt(dx*dx + dy*dy);
        if (d < REACH && d > 0.001) {
          /* Smooth falloff rather than linear, so the nearest town leads
             clearly instead of the whole map drifting as one. */
          var f = 1 - d / REACH;
          var pull = PULL * f * f;
          tx = dx / d * pull;
          ty = dy / d * pull;
        }
      }
      g.style.transform = tx || ty ? 'translate(' + tx.toFixed(2) + 'px,' + ty.toFixed(2) + 'px)' : '';
    }
  }

  function onMove(e) {
    var r = svg.getBoundingClientRect();
    if (!r.width) return;
    px = (e.clientX - r.left) / r.width  * VB.width;
    py = (e.clientY - r.top)  / r.height * VB.height;
    if (!frame) frame = requestAnimationFrame(apply);
  }

  function onLeave() {
    px = py = null;
    if (!frame) frame = requestAnimationFrame(apply);
  }

  svg.addEventListener('pointermove', onMove);
  svg.addEventListener('pointerleave', onLeave);
})();
