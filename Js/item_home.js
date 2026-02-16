/**
 * item_home.js - Products data and home page sections rendering
 *
 * Products structure: id, name, price, image, category, isHotDeal (boolean).
 * Sections are rendered by filtering this single data source:
 * - Hot Deals: products where isHotDeal === true
 * - Electronics: products where category === "electronics"
 * - Appliances: products where category === "appliances"
 * - Mobiles: products where category === "mobiles"
 */

// Single source of products data (id, name, price, image, category, isHotDeal)
var PRODUCTS = [
  { id: 0, name: "SAMSUNG 55 Inch UHD 4K Smart TV With Receiver", price: 350, image: "img/product/0.png", category: "electronics", isHotDeal: false },
  { id: 1, name: "Redmi 13C Dual SIM with 6GB RAM", price: 280, image: "img/product/1.png", category: "mobiles", isHotDeal: false },
  { id: 2, name: "Dell Laptop Latitude 5530 Core i7-1255U 8GB SSD", price: 400, image: "img/product/2.png", category: "electronics", isHotDeal: false },
  { id: 3, name: "Canon EOS RP Mirrorless Camera", price: 530, image: "img/product/3.png", category: "electronics", isHotDeal: false },
  { id: 4, name: "OPPO A18 128GB 4GB Glowing Black", price: 250, image: "img/product/4.png", category: "mobiles", isHotDeal: false },
  { id: 5, name: "Samsung 27-Inch G55C Odyssey QHD 4k", price: 280, image: "img/product/5.png", category: "electronics", isHotDeal: false },
  { id: 6, name: "Infinix Smart (Galaxy White, 4GB RAM, 64GB Storage)", price: 220, image: "img/product/6.png", category: "mobiles", isHotDeal: true, old_price: 300 },
  { id: 7, name: "HP Victus Gaming Laptop 8RAM SSD", price: 370, image: "img/product/7.png", category: "electronics", isHotDeal: false },
  { id: 8, name: "Xiaomi Redmi 13C Dual SIM 8GB", price: 320, image: "img/product/8.png", category: "mobiles", isHotDeal: false },
  { id: 9, name: "Handheld Barcode Scanner 1D/2D/QR Code", price: 80, image: "img/product/9.png", category: "electronics", isHotDeal: true, old_price: 100 },
  { id: 10, name: "Large Venue building mapping Projector", price: 300, image: "img/product/10.png", category: "electronics", isHotDeal: false },
  { id: 11, name: "Infinix Hot 40i (RAM: 4+4GB, 128GB)", price: 260, image: "img/product/11.png", category: "mobiles", isHotDeal: true, old_price: 300 },
  { id: 12, name: "HP DeskJet 2710 Printer, All-in-One", price: 370, image: "img/product/12.png", category: "electronics", isHotDeal: false },
  { id: 13, name: "Fuzzy Logic Rice Cooker DIGITAL-JAR 1.8L 940W – HD4515/67", price: 490, image: "img/product/13.png", category: "appliances", isHotDeal: false },
  { id: 14, name: "Sencor STS 5070SS Electric Toaster for Four Slices", price: 340, image: "img/product/14.png", category: "appliances", isHotDeal: false },
  { id: 15, name: "Infinix Smart 6 Plus (Miracle Black)", price: 240, image: "img/product/15.png", category: "mobiles", isHotDeal: true, old_price: 300 },
  { id: 16, name: "Washing Machine 959 Series 8kg Senator Aqua SX, Silver", price: 600, image: "img/product/16.png", category: "appliances", isHotDeal: true, old_price: 700 },
  { id: 17, name: "HIKVISION PTZ Camera 4K Outdoo", price: 185, image: "img/product/17.png", category: "electronics", isHotDeal: false },
  { id: 18, name: "OPPO Reno11 5G 256GB 12GB", price: 225, image: "img/product/18.png", category: "mobiles", isHotDeal: false },
  { id: 19, name: "VIVAX kettle WH-175L with a capacity of 1.7 ", price: 140, image: "img/product/19.png", category: "appliances", isHotDeal: false },
  { id: 20, name: "Kenstar Ester ABS Plastic 750W Mixer Grinder", price: 280, image: "img/product/20.png", category: "appliances", isHotDeal: true, old_price: 330 },
  { id: 21, name: "Multifunctional Food Processor", price: 350, image: "img/product/21.png", category: "appliances", isHotDeal: false },
  { id: 22, name: "Zanussi Washing Machine 8 Kg 1200 RPM ", price: 580, image: "img/product/22.png", category: "appliances", isHotDeal: false },
  { id: 23, name: "Sharp 42 Lt Electronic Oven Convection", price: 400, image: "img/product/23.png", category: "appliances", isHotDeal: false },
  { id: 24, name: "Lenovo Monitor Legion R27fc-30 Gaming Curved", price: 300, image: "img/product/24.png", category: "electronics", isHotDeal: true, old_price: 380 }
];

// Expose for main.js and search (single source, no duplication)
window.PRODUCTS = PRODUCTS;

function getProductById(id) {
  return PRODUCTS.find(function(p) { return p.id === Number(id); });
}
window.getProductById = getProductById;

/**
 * Build cart-safe product object: id, name, price, quantity, image (for localStorage)
 */
function toCartItem(product, quantity) {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: quantity || 1,
    image: product.image || product.img
  };
}

/**
 * Render one product card HTML (reused across sections)
 */
function renderProductCard(product, options) {
  var cart = typeof getCart === 'function' ? getCart() : [];
  var isInCart = cart.some(function(i) { return i.id === product.id; });
  var isFav = typeof isFavourite === 'function' ? isFavourite(product.id) : false;
  var img = product.image || product.img;
  var oldPriceHtml = product.old_price ? '<p class="old_price">$' + product.old_price + '</p>' : '';
  var saleBadge = product.old_price
    ? '<span class="sale_present">%' + Math.floor((product.old_price - product.price) / product.old_price * 100) + '</span>'
    : '';
  var favClass = isFav ? 'btn_favourite active' : 'btn_favourite';
  var favIcon = isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart';

  return '<div class="swiper-slide product" data-id="' + product.id + '">' +
    saleBadge +
    '<div class="img_product"><a href="#"><img src="' + img + '" alt=""></a></div>' +
    '<div class="stars">' +
    '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>' +
    '</div>' +
    '<p class="name_product"><a href="#">' + product.name + '</a></p>' +
    '<div class="price"><p><span>$' + product.price + '</span></p>' + oldPriceHtml + '</div>' +
    '<div class="icons">' +
    '<span class="btn_add_cart ' + (isInCart ? 'active' : '') + '" data-id="' + product.id + '">' +
    '<i class="fa-solid fa-cart-shopping"></i> ' + (isInCart ? 'Item in cart' : 'add to cart') + '</span>' +
    '<span class="' + favClass + '" data-id="' + product.id + '" title="' + (isFav ? 'Remove from favourites' : 'Add to favourites') + '">' +
    '<i class="' + favIcon + '"></i></span>' +
    '</div></div>';
}

/**
 * Render a section by filtering PRODUCTS and filling the container
 */
function renderSection(containerId, filterFn) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var filtered = PRODUCTS.filter(filterFn);
  var cart = typeof getCart === 'function' ? getCart() : [];
  container.innerHTML = filtered.map(function(p) { return renderProductCard(p); }).join('');
  if (typeof attachAddToCartHandlers === 'function') attachAddToCartHandlers(container);
  if (typeof attachFavouriteHandlers === 'function') attachFavouriteHandlers(container);
}

(function() {
  var swiper_items_sale = document.getElementById("swiper_items_sale");
  var swiper_elctronics = document.getElementById("swiper_elctronics");
  var swiper_appliances = document.getElementById("swiper_appliances");
  var swiper_mobiles = document.getElementById("swiper_mobiles");

  // Hot Deals: filter products where isHotDeal === true
  if (swiper_items_sale) {
    renderSection("swiper_items_sale", function(p) { return p.isHotDeal === true; });
  }

  // Electronics: filter products where category === "electronics"
  if (swiper_elctronics) {
    renderSection("swiper_elctronics", function(p) { return p.category === "electronics"; });
  }

  // Appliances: filter products where category === "appliances"
  if (swiper_appliances) {
    renderSection("swiper_appliances", function(p) { return p.category === "appliances"; });
  }

  // Mobiles: filter products where category === "mobiles" (reuse same data source)
  if (swiper_mobiles) {
    renderSection("swiper_mobiles", function(p) { return p.category === "mobiles"; });
  }

  // Restore sections (e.g. after search clear) – same filters, single source
  window.restoreHomeSection = function(sectionId) {
    var sale = document.getElementById("swiper_items_sale");
    var elec = document.getElementById("swiper_elctronics");
    var app = document.getElementById("swiper_appliances");
    var mob = document.getElementById("swiper_mobiles");
    if (!sectionId || sectionId === "swiper_items_sale") renderSection("swiper_items_sale", function(p) { return p.isHotDeal === true; });
    if (!sectionId || sectionId === "swiper_elctronics") renderSection("swiper_elctronics", function(p) { return p.category === "electronics"; });
    if (!sectionId || sectionId === "swiper_appliances") renderSection("swiper_appliances", function(p) { return p.category === "appliances"; });
    if (!sectionId || sectionId === "swiper_mobiles") renderSection("swiper_mobiles", function(p) { return p.category === "mobiles"; });
  };
  window._homeProducts = PRODUCTS;
})();
// --- Favourite Functions ---
function getFavourites() {
    return JSON.parse(localStorage.getItem("favourites")) || [];
}

function isFavourite(productId) {
    let favourites = getFavourites();
    return favourites.some(p => p.id === productId);
}

function addToFavourite(product) {
    let favourites = getFavourites();

    // Toggle favourite
    if (!isFavourite(product.id)) {
        favourites.push(product);
        localStorage.setItem("favourites", JSON.stringify(favourites));
        alert("Added to Favourite ✅");
    } else {
        favourites = favourites.filter(p => p.id !== product.id);
        localStorage.setItem("favourites", JSON.stringify(favourites));
        alert("Removed from Favourite ❌");
    }
    updateFavCount();
    // تحديث أيكون Heart في الصفحة
    updateFavIcons();
}

// تحديث عداد Favourite في الهيدر
function updateFavCount() {
    let favourites = getFavourites();
    let favCountEl = document.querySelector(".Favourit");
    if(favCountEl) favCountEl.textContent = favourites.length;
}

// تحديث أيكون Heart في جميع المنتجات
function updateFavIcons() {
    document.querySelectorAll(".btn_favourite").forEach(span => {
        let id = parseInt(span.dataset.id);
        let icon = span.querySelector("i");
        if (isFavourite(id)) {
            span.classList.add("active");
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
        } else {
            span.classList.remove("active");
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
        }
    });
}

// --- Attach Favourite Handlers to Products ---
function attachFavouriteHandlers(container) {
    container.querySelectorAll(".btn_favourite").forEach(span => {
        span.addEventListener("click", function() {
            let id = parseInt(span.dataset.id);
            let product = getProductById(id);
            addToFavourite(product);
        });
    });
}

// Initialize on load
updateFavCount();
updateFavIcons();

