/**
 * Product Search - Real-time search across Home and Accessories pages
 */

(function() {
  const searchInput = document.getElementById('search');
  if (!searchInput) return;

  let allProducts = [];

  function getCartItems() {
    try {
      const email = localStorage.getItem('ecommerce_currentUser');
      const key = email ? 'ecommerce_cart_' + email : 'ecommerce_cart_guest';
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function initSearch() {
    fetch('products.json')
      .then(r => r.json())
      .then(products => {
        allProducts = products;
        searchInput.removeAttribute('required');
        searchInput.addEventListener('input', function() {
          handleSearch(this.value);
        });
      })
      .catch(() => {});
  }

  function handleSearch(query) {
    const q = (query || '').trim().toLowerCase();

    // Accessories page
    const accGrid = document.getElementById('accessories_grid');
    if (accGrid) {
      const filtered = q
        ? allProducts.filter(p => (p.catetory || p.category) === 'accessories' && (p.name || '').toLowerCase().includes(q))
        : allProducts.filter(p => (p.catetory || p.category) === 'accessories');
      renderProductsInto(accGrid, filtered);
      if (typeof attachAddToCartHandlers === 'function') attachAddToCartHandlers(accGrid);
    }

    // Home page - update each product section
    ['swiper_items_sale', 'swiper_elctronics', 'swiper_appliances', 'swiper_mobiles'].forEach(function(sectionId) {
      const container = document.getElementById(sectionId);
      if (!container) return;
      const category = { swiper_items_sale: null, swiper_elctronics: 'electronics', swiper_appliances: 'appliances', swiper_mobiles: 'mobiles' }[sectionId];
      let filtered;
      if (q) {
        filtered = allProducts.filter(function(p) {
          var cat = p.catetory || p.category;
          if (sectionId === 'swiper_items_sale') return p.old_price && (p.name || '').toLowerCase().includes(q);
          return cat === category && (p.name || '').toLowerCase().includes(q);
        });
      } else {
        if (typeof restoreHomeSection === 'function') {
          restoreHomeSection(sectionId);
          return;
        }
      }
      if (filtered !== undefined) {
        renderProductsInto(container, filtered, sectionId);
        if (typeof attachAddToCartHandlers === 'function') attachAddToCartHandlers(container);
      }
    });
  }

  function renderProductsInto(container, products, sectionId) {
    var cart = getCartItems();
    if (products.length === 0) {
      container.innerHTML = '<div class="no-products-msg"><i class="fa-solid fa-box-open"></i><p>No products found</p></div>';
      return;
    }
    var html = products.map(function(p) {
      var isInCart = cart.some(function(i) { return i.id === p.id; });
      var oldPrice = p.old_price ? '<p class="old_price">$' + p.old_price + '</p>' : '';
      var badge = p.old_price ? '<span class="sale_present">%' + Math.floor((p.old_price - p.price) / p.old_price * 100) + '</span>' : '';
      var slideClass = (container.classList && container.classList.contains('swiper-wrapper')) ? 'swiper-slide product' : 'product';
      return '<div class="' + slideClass + '">' + badge +
        '<div class="img_product"><a href="#"><img src="' + p.img + '" alt=""></a></div>' +
        '<div class="stars"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>' +
        '<p class="name_product"><a href="#">' + p.name + '</a></p>' +
        '<div class="price"><p><span>$' + p.price + '</span></p>' + oldPrice + '</div>' +
        '<div class="icons"><span class="btn_add_cart ' + (isInCart ? 'active' : '') + '" data-id="' + p.id + '">' +
        '<i class="fa-solid fa-cart-shopping"></i> ' + (isInCart ? 'Item in cart' : 'add to cart') + '</span>' +
        '<span class="icon_product"><i class="fa-regular fa-heart"></i></span></div></div>';
    }).join('');
    container.innerHTML = html;
  }

  window.handleSearchInput = handleSearch;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();
