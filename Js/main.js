/**
 * Main - Category menu, add-to-cart handlers, cart link auth check
 */

var category_nav_list = document.querySelector(".category_nav_list");

function Open_Categ_list() {
  if (category_nav_list) category_nav_list.classList.toggle("active");
}

var nav_links = document.querySelector(".nav_links");

function open_Menu() {
  if (nav_links) nav_links.classList.toggle("active");
}

// Cart link: redirect to signin if not logged in
(function() {
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href="cart.html"]');
    if (link && typeof requireAuth === 'function' && !isLoggedIn()) {
      e.preventDefault();
      window.location.href = 'signin.html?return=' + encodeURIComponent('cart.html');
    }
  });
})();

/**
 * Attach add-to-cart handlers. Uses product from window.PRODUCTS (item_home.js) when available.
 * Cart items stored: id, name, price, quantity, image.
 */
function attachAddToCartHandlers(container) {
  if (!container) return;
  var btns = container.querySelectorAll(".btn_add_cart");
  btns.forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      var target = e.currentTarget;
      if (target.classList.contains("active")) return;
      var productId = target.getAttribute("data-id");
      if (!productId) return;
      var product = typeof getProductById === 'function' ? getProductById(productId) : null;
      if (!product && window.PRODUCTS) {
        product = window.PRODUCTS.find(function(p) { return p.id == productId; });
      }
      if (!product) return;
      addToCart(product, 1);
      target.classList.add("active");
      target.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Item in cart';
      var allBtns = document.querySelectorAll('.btn_add_cart[data-id="' + productId + '"]');
      allBtns.forEach(function(b) {
        b.classList.add("active");
        b.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Item in cart';
      });
      var countEl = document.querySelector('.item_header');
      if (countEl && typeof getCartCount === 'function') countEl.textContent = getCartCount();
    });
  });
}

/**
 * Attach favourite (wishlist) handlers. Toggle favourite, prevent duplicates, visual feedback.
 */
function attachFavouriteHandlers(container) {
  if (!container || typeof toggleFavourite !== 'function') return;
  var hearts = container.querySelectorAll(".btn_favourite");
  hearts.forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      var productId = btn.getAttribute("data-id");
      if (!productId) return;
      var added = toggleFavourite(productId);
      btn.classList.toggle("active", added);
      btn.querySelector("i").className = added ? "fa-solid fa-heart" : "fa-regular fa-heart";
      btn.title = added ? "Remove from favourites" : "Add to favourites";
      var favCount = document.querySelector(".Favourit");
      if (favCount && typeof getFavourites === 'function') favCount.textContent = getFavourites().length;
    });
  });
}

window.attachAddToCartHandlers = attachAddToCartHandlers;
window.attachFavouriteHandlers = attachFavouriteHandlers;
