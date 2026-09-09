document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Hero product slider (home page only)
  var slideImg = document.getElementById('heroSlideImg');
  var slideTag = document.getElementById('heroSlideTag');
  if (slideImg && window.HERO_PRODUCTS && window.HERO_PRODUCTS.length) {
    var items = window.HERO_PRODUCTS;
    var i = items.findIndex(function (p) { return p.slug === 'kumkumadi-gel'; });
    if (i < 0) i = 0;

    function preload(src) { var im = new Image(); im.src = src; }
    // preload next couple of images for smoothness
    for (var k = 1; k <= 2; k++) {
      preload('assets/products/' + items[(i + k) % items.length].slug + '.jpg');
    }

    setInterval(function () {
      i = (i + 1) % items.length;
      var next = items[i];
      slideImg.style.opacity = '0';
      setTimeout(function () {
        slideImg.src = 'assets/products/' + next.slug + '.jpg';
        slideImg.alt = next.name;
        slideTag.textContent = next.name;
        slideImg.style.opacity = '1';
      }, 400);
      preload('assets/products/' + items[(i + 2) % items.length].slug + '.jpg');
    }, 2000);
  }
});
