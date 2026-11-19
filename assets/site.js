(function () {
  // ---- Hero: mouse + scroll parallax ----
  var hero = document.querySelector('#top > div');
  var shapes = hero ? hero.querySelectorAll('.shape') : [];
  var cfg = [[-40, .15, ''], [60, .3, ''], [-70, .2, ' rotate(18deg)'], [35, .4, ''], [60, .3, '']];
  var mx = 0, my = 0, sy = 0, raf = 0;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function paint() {
    raf = 0;
    shapes.forEach(function (el, i) {
      var c = cfg[i]; if (!c) return;
      el.style.transform = 'translate(' + (mx * c[0]).toFixed(1) + 'px,' + (my * c[0] - sy * c[1]).toFixed(1) + 'px)' + c[2];
    });
  }
  function queue() { if (!raf && !reduce) raf = requestAnimationFrame(paint); }
  if (hero) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - .5) * 2;
      my = ((e.clientY - r.top) / r.height - .5) * 2;
      queue();
    });
    window.addEventListener('scroll', function () { sy = window.scrollY || 0; queue(); }, { passive: true });
  }

  // ---- Skills constellation: hover highlights ----
  var N = [['tech', 'seo'], ['kw', 'seo'], ['content', 'seo'], ['links', 'seo'], ['gen', 'geo'], ['ent', 'geo'], ['cite', 'geo'], ['gads', 'paid'], ['meta', 'paid'], ['remk', 'paid'], ['ga4', 'data'], ['sem', 'data']];
  var E = [['tech', 'kw'], ['tech', 'content'], ['tech', 'links'], ['kw', 'content'], ['tech', 'ent'], ['content', 'ent'], ['ent', 'gen'], ['gen', 'cite'], ['ent', 'cite'], ['gen', 'gads'], ['gads', 'meta'], ['gads', 'remk'], ['meta', 'remk'], ['ga4', 'cite'], ['ga4', 'remk'], ['ga4', 'sem'], ['sem', 'content'], ['sem', 'kw']];
  var hrefs = { seo: 'seo-geo.html', geo: 'seo-geo.html', paid: 'paid-media.html', data: 'seo-geo.html' };
  var nodes = document.querySelectorAll('#skills .node');
  var edges = document.querySelectorAll('#skills .edge');
  var nameEl = document.getElementById('sk-name');
  var linkEl = document.getElementById('sk-link');
  function setHover(idx) {
    var id = idx === null ? null : N[idx][0];
    var linked = {};
    if (id) { linked[id] = 1; E.forEach(function (e) { if (e[0] === id) linked[e[1]] = 1; if (e[1] === id) linked[e[0]] = 1; }); }
    nodes.forEach(function (b, i) {
      var op = !id || linked[N[i][0]] ? 1 : .3;
      b.style.opacity = op;
      var label = b.parentNode.querySelector('span'); if (label) label.style.opacity = op;
    });
    edges.forEach(function (el, i) {
      var hot = id && (E[i][0] === id || E[i][1] === id);
      el.style.background = hot ? '#FF4D9D' : (id ? 'rgba(255,255,255,.07)' : 'rgba(255,255,255,.22)');
    });
    if (nameEl) nameEl.textContent = id ? nodes[idx].getAttribute('aria-label') : 'Hover a node';
    if (linkEl) { if (id) { linkEl.style.display = 'inline-flex'; linkEl.href = hrefs[N[idx][1]]; } else linkEl.style.display = 'none'; }
  }
  setHover(null);
  nodes.forEach(function (b, i) {
    b.addEventListener('mouseenter', function () { setHover(i); });
    b.addEventListener('focus', function () { setHover(i); });
  });

  // ---- Contact form: opens the visitor's email app with the message filled in ----
  var form = document.querySelector('#contact form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var body = (d.get('message') || '') + '\n\nFrom: ' + (d.get('name') || '') + ' <' + (d.get('email') || '') + '>';
      window.location.href = 'mailto:tien.tieu.lynette@gmail.com?subject=' + encodeURIComponent('Portfolio enquiry from ' + (d.get('name') || '')) + '&body=' + encodeURIComponent(body);
    });
  }
})();
