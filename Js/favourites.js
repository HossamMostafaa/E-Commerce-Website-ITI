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



let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

const favItemsContainer = document.getElementById("fav-items");
const favContent = document.getElementById("fav-content");
const favEmpty = document.getElementById("fav-empty");

function renderFavourites() {
    favItemsContainer.innerHTML = "";

    if (favourites.length === 0) {
        favEmpty.style.display = "block";
        favContent.style.display = "none";
        return;
    }

    favEmpty.style.display = "none";
    favContent.style.display = "block";

    favourites.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("fav-item");
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.price} EGP</p>
            <button class="remove-btn" data-id="${item.id}">Remove</button>
        `;
        favItemsContainer.appendChild(itemDiv);
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            removeFromFavourite(id);
        });
    });
}

function removeFromFavourite(id) {
    favourites = favourites.filter(item => item.id !== id);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    renderFavourites();
}

renderFavourites();














