(function () {
  var lb = document.getElementById('lb');
  var img = document.getElementById('lb-img');
  var last = null;
  function open(btn) {
    last = btn;
    img.src = btn.getAttribute('data-src');
    img.alt = btn.getAttribute('data-alt') || '';
    lb.hidden = false; lb.style.display = 'flex';
    document.getElementById('lb-close').focus();
  }
  function close() {
    lb.hidden = true; lb.style.display = 'none'; img.src = '';
    if (last) last.focus();
  }
  document.querySelectorAll('.shot').forEach(function (b) { b.addEventListener('click', function () { open(b); }); });
  document.getElementById('lb-close').addEventListener('click', close);
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lb.hidden) close(); });
  lb.style.display = 'none';
})();
