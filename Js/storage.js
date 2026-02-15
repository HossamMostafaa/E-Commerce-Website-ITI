/**
 * Storage Module - Cart and shared data persistence
 * Cart is stored per logged-in user in localStorage
 */

/**
 * Get cart storage key (user-specific when logged in)
 */
function getCartKey() {
  if (typeof getCartStorageKey === 'function') {
    return getCartStorageKey();
  }
  return 'ecommerce_cart_guest';
}

/**
 * Get cart items from localStorage
 * @returns {Array}
 */
function getCart() {
  try {
    const key = getCartKey();
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Save cart to localStorage
 * @param {Array} cart - Cart items array
 */
function saveCart(cart) {
  const key = getCartKey();
  localStorage.setItem(key, JSON.stringify(cart));
}

/**
 * Add item to cart (or increase quantity if exists).
 * Each cart item stored has: id, name, price, quantity, image (for display).
 * @param {Object} product - Product object (id, name, price, image or img)
 * @param {number} quantity - Quantity to add
 * @returns {number} - Total quantity of this item in cart
 */
function addToCart(product, quantity) {
  quantity = quantity || 1;
  var cart = getCart();
  var existing = cart.find(function(item) { return item.id === product.id; });
  if (existing) {
    existing.quantity += quantity;
    saveCart(cart);
    return existing.quantity;
  }
  var image = product.image || product.img;
  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: quantity,
    image: image,
    img: image
  });
  saveCart(cart);
  return quantity;
}

/**
 * Update item quantity in cart
 * @param {number} productId - Product ID
 * @param {number} quantity - New quantity
 */
function updateCartQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  if (quantity <= 0) {
    cart.splice(cart.indexOf(item), 1);
  } else {
    item.quantity = quantity;
  }
  saveCart(cart);
}

/**
 * Remove item from cart
 * @param {number} productId - Product ID
 */
function removeFromCart(productId) {
  const cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
}

/**
 * Clear entire cart
 */
function clearCart() {
  saveCart([]);
}

/**
 * Get cart total count
 * @returns {number}
 */
function getCartCount() {
  return getCart().reduce((sum, i) => sum + (i.quantity || 1), 0);
}

/**
 * Get cart total price
 * @returns {number}
 */
function getCartTotal() {
  return getCart().reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);
}
