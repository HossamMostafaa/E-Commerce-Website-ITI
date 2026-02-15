/**
 * Cart Page - Full cart functionality (add, remove, increase, decrease)
 * Requires auth - redirects to signin if not logged in
 */

(function() {
  if (typeof requireAuth === 'function' && !requireAuth('cart.html?return=cart.html')) {
    return;
  }

  const cartItemsEl = document.getElementById('cart_items');
  const cartEmptyEl = document.getElementById('cart-empty');
  const cartContentEl = document.getElementById('cart-content');
  const cartTotalEl = document.getElementById('cart_total');
  const checkoutBtn = document.getElementById('checkout_btn');

  function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
      if (cartEmptyEl) cartEmptyEl.style.display = 'block';
      if (cartContentEl) cartContentEl.style.display = 'none';
      if (checkoutBtn) checkoutBtn.style.pointerEvents = 'none';
      if (checkoutBtn) checkoutBtn.style.opacity = '0.6';
      return;
    }

    if (cartEmptyEl) cartEmptyEl.style.display = 'none';
    if (cartContentEl) cartContentEl.style.display = 'block';
    if (checkoutBtn) {
      checkoutBtn.style.pointerEvents = '';
      checkoutBtn.style.opacity = '1';
    }

    let total = 0;
    cartItemsEl.innerHTML = cart.map(function(item, index) {
      const subtotal = (item.price || 0) * (item.quantity || 1);
      total += subtotal;
      return '<div class="cart-item-row" data-id="' + item.id + '" data-index="' + index + '">' +
        '<img src="' + (item.image || item.img || '') + '" alt="">' +
        '<div class="cart-item-info">' +
        '<h4>' + (item.name || '') + '</h4>' +
        '<p class="cart-item-price">$' + subtotal.toFixed(2) + '</p>' +
        '<div class="quantity_control">' +
        '<button type="button" class="qty-btn minus">-</button>' +
        '<span class="qty-value">' + (item.quantity || 1) + '</span>' +
        '<button type="button" class="qty-btn plus">+</button>' +
        '</div></div>' +
        '<button type="button" class="delete_item" title="Remove"><i class="fa-solid fa-trash-can"></i></button>' +
        '</div>';
    }).join('');

    cartTotalEl.textContent = '$' + total.toFixed(2);

    // Event listeners
    cartItemsEl.querySelectorAll('.qty-btn.plus').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const row = this.closest('.cart-item-row');
        const id = parseInt(row.getAttribute('data-id'), 10);
        const cart = getCart();
        const item = cart.find(function(i) { return i.id === id; });
        if (item) {
          item.quantity = (item.quantity || 1) + 1;
          saveCart(cart);
          renderCart();
        }
      });
    });

    cartItemsEl.querySelectorAll('.qty-btn.minus').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const row = this.closest('.cart-item-row');
        const id = parseInt(row.getAttribute('data-id'), 10);
        const cart = getCart();
        const item = cart.find(function(i) { return i.id === id; });
        if (item) {
          item.quantity = Math.max(0, (item.quantity || 1) - 1);
          if (item.quantity === 0) {
            cart.splice(cart.indexOf(item), 1);
          }
          saveCart(cart);
          renderCart();
        }
      });
    });

    cartItemsEl.querySelectorAll('.delete_item').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const row = this.closest('.cart-item-row');
        const id = parseInt(row.getAttribute('data-id'), 10);
        removeFromCart(id);
        renderCart();
      });
    });
  }

  renderCart();
})();
