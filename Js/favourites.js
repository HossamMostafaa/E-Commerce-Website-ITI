/**
 * Favourites (Wishlist) Module
 * Stores favourite product IDs in localStorage. Prevents duplicates.
 * Allows adding, removing, and checking if a product is favourited.
 */

var FAVOURITES_KEY = 'ecommerce_favourites';

/**
 * Get list of favourited product IDs from localStorage
 * @returns {number[]}
 */
function getFavourites() {
  try {
    var raw = localStorage.getItem(FAVOURITES_KEY);
    var arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

/**
 * Save favourites array to localStorage
 * @param {number[]} ids
 */
function saveFavourites(ids) {
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(ids));
}

/**
 * Check if a product is in favourites (no duplicates)
 * @param {number} productId
 * @returns {boolean}
 */
function isFavourite(productId) {
  return getFavourites().indexOf(Number(productId)) !== -1;
}

/**
 * Add product to favourites. Prevents duplicate entries.
 * @param {number} productId
 */
function addFavourite(productId) {
  var ids = getFavourites();
  var id = Number(productId);
  if (ids.indexOf(id) !== -1) return;
  ids.push(id);
  saveFavourites(ids);
}

/**
 * Remove product from favourites
 * @param {number} productId
 */
function removeFavourite(productId) {
  var ids = getFavourites().filter(function(i) { return i !== Number(productId); });
  saveFavourites(ids);
}

/**
 * Toggle favourite state for a product
 * @param {number} productId
 * @returns {boolean} - true if now favourited, false if removed
 */
function toggleFavourite(productId) {
  if (isFavourite(productId)) {
    removeFavourite(productId);
    return false;
  }
  addFavourite(productId);
  return true;
}




/* FAv  ...*/ 



// جلب favourites من localStorage
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

const favItemsContainer = document.getElementById("cart_items"); // استخدم نفس الـ div اللي موجود عندك
const cartTotalEl = document.getElementById("cart_total"); // لو حابب تحسب السعر الإجمالي
const cartContent = document.getElementById("cart-content");
const cartEmpty = document.getElementById("cart-empty");

function renderFavourites() {
    favItemsContainer.innerHTML = "";

    if (favourites.length === 0) {
        cartEmpty.style.display = "block";
        cartContent.style.display = "none";
        return;
    } else {
        cartEmpty.style.display = "none";
        cartContent.style.display = "block";
    }

    let total = 0;

    favourites.forEach(item => {
        total += item.price;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}" width="100">
                <h4>${item.name}</h4>
                <p>Price: ${item.price} EGP</p>
                <button class="remove-btn" data-id="${item.id}">Remove ❌</button>
            </div>
            <hr>
        `;
        favItemsContainer.appendChild(itemDiv);
    });

    cartTotalEl.textContent = total + " EGP";

    // حدث Remove
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            removeFromFav(id);
        });
    });
}

function removeFromFav(id) {
    favourites = favourites.filter(item => item.id !== id);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    renderFavourites();
}

// بدء التحميل
renderFavourites();
