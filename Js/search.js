// (function() {
//   const searchInput = document.getElementById('search');
//   const searchBtn = document.getElementById('search-btn');

//   if (!searchInput || !searchBtn) return;

//   // JSON بتاع المنتجات
//   const products = [
//     {"id":0,"img":"img/product/0.png","name":"SAMSUNG 55 Inch UHD 4K Smart TV With Receiver","price":350,"catetory":"electronics"},
//     {"id":1,"img":"img/product/1.png","name":"Redmi 13C Dual SIM with 6GB RAM","price":280,"catetory":"mobiles"},
//     {"id":2,"img":"img/product/2.png","name":"Dell Laptop Latitude 5530 Core i7-1255U 8GB SSD","price":400,"catetory":"electronics"},
//     {"id":3,"img":"img/product/3.png","name":"Canon EOS RP Mirrorless Camera","price":530,"catetory":"electronics"},
//     {"id":4,"img":"img/product/4.png","name":"OPPO A18 128GB 4GB Glowing Black","price":250,"catetory":"mobiles"},
//     {"id":5,"img":"img/product/5.png","name":"Samsung 27-Inch G55C Odyssey QHD 4k","price":280,"catetory":"electronics"},
//     {"id":6,"img":"img/product/6.png","name":"Infinix Smart (Galaxy White, 4GB RAM, 64GB Storage)","price":220,"old_price":300,"catetory":"mobiles"},
//     {"id":7,"img":"img/product/7.png","name":"HP Victus Gaming Laptop 8RAM SSD","price":370,"catetory":"electronics"},
//     {"id":8,"img":"img/product/8.png","name":"Xiaomi Redmi 13C Dual SIM 8GB","price":320,"catetory":"mobiles"},
//     {"id":9,"img":"img/product/9.png","name":"Handheld Barcode Scanner 1D/2D/QR Code","price":80,"old_price":100,"catetory":"electronics"},
//     {"id":10,"img":"img/product/10.png","name":"Large Venue building mapping Projector","price":300,"catetory":"electronics"},
//     {"id":11,"img":"img/product/11.png","name":"Infinix Hot 40i (RAM: 4+4GB, 128GB)","price":260,"old_price":300,"catetory":"mobiles"},
//     {"id":12,"img":"img/product/12.png","name":"HP DeskJet 2710 Printer, All-in-One","price":370,"catetory":"electronics"},
//     {"id":13,"img":"img/product/13.png","name":"Fuzzy Logic Rice Cooker DIGITAL-JAR 1.8L 940W – HD4515/67","price":490,"catetory":"appliances"},
//     {"id":14,"img":"img/product/14.png","name":"Sencor STS 5070SS Electric Toaster for Four Slices","price":340,"catetory":"appliances"},
//     {"id":15,"img":"img/product/15.png","name":"Infinix Smart 6 Plus (Miracle Black)","price":240,"old_price":300,"catetory":"mobiles"},
//     {"id":16,"img":"img/product/16.png","name":"Washing Machine 959 Series 8kg Senator Aqua SX, Silver","price":600,"old_price":700,"catetory":"appliances"},
//     {"id":17,"img":"img/product/17.png","name":"HIKVISION PTZ Camera 4K Outdoo","price":185,"catetory":"electronics"},
//     {"id":18,"img":"img/product/18.png","name":"OPPO Reno11 5G 256GB 12GB","price":225,"catetory":"mobiles"},
//     {"id":19,"img":"img/product/19.png","name":"VIVAX kettle WH-175L with a capacity of 1.7 ","price":140,"catetory":"appliances"},
//     {"id":20,"img":"img/product/20.png","name":"Kenstar Ester ABS Plastic 750W Mixer Grinder","price":280,"old_price":330,"catetory":"appliances"},
//     {"id":21,"img":"img/product/21.png","name":"Multifunctional Food Processor","price":350,"catetory":"appliances"},
//     {"id":22,"img":"img/product/22.png","name":"Zanussi Washing Machine 8 Kg 1200 RPM ","price":580,"catetory":"appliances"},
//     {"id":23,"img":"img/product/23.png","name":"Sharp 42 Lt Electronic Oven Convection","price":400,"catetory":"appliances"},
//     {"id":24,"img":"img/product/24.png","name":"Lenovo Monitor Legion R27fc-30 Gaming Curved","price":300,"old_price":380,"catetory":"electronics"}
//   ];

//   const sections = {
//     electronics: document.getElementById('swiper_elctronics'),
//     mobiles: document.getElementById('swiper_mobiles'),
//     appliances: document.getElementById('swiper_appliances')
//   };

//   function renderProducts(items) {
//     Object.values(sections).forEach(sec => { if(sec) sec.innerHTML = ''; });
    
//     items.forEach(p => {
//       const section = sections[p.catetory];
//       if (!section) return;

//       const div = document.createElement('div');
//       div.classList.add('product-item');
//       div.innerHTML = `
//         <img src="${p.img}" alt="${p.name}" width="150">
//         <h4>${p.name}</h4>
//         <p>$${p.price}</p>
//       `;
//       section.appendChild(div);
//     });
//   }

//   // البحث أثناء الكتابة
//   searchInput.addEventListener('input', function() {
//     const query = this.value.toLowerCase().trim();
//     const filtered = query ? products.filter(p => p.name.toLowerCase().includes(query)) : products;
//     renderProducts(filtered);
//   });

//   // البحث عند الضغط على زر Search
//   searchBtn.addEventListener('click', function() {
//     const query = searchInput.value.toLowerCase().trim();
//     const filtered = query ? products.filter(p => p.name.toLowerCase().includes(query)) : products;
//     renderProducts(filtered);
//   });

//   // عرض كل المنتجات أول مرة
//   renderProducts(products);
// })();




// const news = [


//    {"id":0,"img":"img/product/0.png","name":"SAMSUNG 55 Inch UHD 4K Smart TV With Receiver","price":350,"catetory":"electronics"},
//     {"id":1,"img":"img/product/1.png","name":"Redmi 13C Dual SIM with 6GB RAM","price":280,"catetory":"mobiles"},
//     {"id":2,"img":"img/product/2.png","name":"Dell Laptop Latitude 5530 Core i7-1255U 8GB SSD","price":400,"catetory":"electronics"},
//     {"id":3,"img":"img/product/3.png","name":"Canon EOS RP Mirrorless Camera","price":530,"catetory":"electronics"},
//     {"id":4,"img":"img/product/4.png","name":"OPPO A18 128GB 4GB Glowing Black","price":250,"catetory":"mobiles"},
//     {"id":5,"img":"img/product/5.png","name":"Samsung 27-Inch G55C Odyssey QHD 4k","price":280,"catetory":"electronics"},
//     {"id":6,"img":"img/product/6.png","name":"Infinix Smart (Galaxy White, 4GB RAM, 64GB Storage)","price":220,"old_price":300,"catetory":"mobiles"},
//     {"id":7,"img":"img/product/7.png","name":"HP Victus Gaming Laptop 8RAM SSD","price":370,"catetory":"electronics"},
//     {"id":8,"img":"img/product/8.png","name":"Xiaomi Redmi 13C Dual SIM 8GB","price":320,"catetory":"mobiles"},
//     {"id":9,"img":"img/product/9.png","name":"Handheld Barcode Scanner 1D/2D/QR Code","price":80,"old_price":100,"catetory":"electronics"},
//     {"id":10,"img":"img/product/10.png","name":"Large Venue building mapping Projector","price":300,"catetory":"electronics"},
//     {"id":11,"img":"img/product/11.png","name":"Infinix Hot 40i (RAM: 4+4GB, 128GB)","price":260,"old_price":300,"catetory":"mobiles"},
//     {"id":12,"img":"img/product/12.png","name":"HP DeskJet 2710 Printer, All-in-One","price":370,"catetory":"electronics"},
//     {"id":13,"img":"img/product/13.png","name":"Fuzzy Logic Rice Cooker DIGITAL-JAR 1.8L 940W – HD4515/67","price":490,"catetory":"appliances"},
//     {"id":14,"img":"img/product/14.png","name":"Sencor STS 5070SS Electric Toaster for Four Slices","price":340,"catetory":"appliances"},
//     {"id":15,"img":"img/product/15.png","name":"Infinix Smart 6 Plus (Miracle Black)","price":240,"old_price":300,"catetory":"mobiles"},
//     {"id":16,"img":"img/product/16.png","name":"Washing Machine 959 Series 8kg Senator Aqua SX, Silver","price":600,"old_price":700,"catetory":"appliances"},
//     {"id":17,"img":"img/product/17.png","name":"HIKVISION PTZ Camera 4K Outdoo","price":185,"catetory":"electronics"},
//     {"id":18,"img":"img/product/18.png","name":"OPPO Reno11 5G 256GB 12GB","price":225,"catetory":"mobiles"},
//     {"id":19,"img":"img/product/19.png","name":"VIVAX kettle WH-175L with a capacity of 1.7 ","price":140,"catetory":"appliances"},
//     {"id":20,"img":"img/product/20.png","name":"Kenstar Ester ABS Plastic 750W Mixer Grinder","price":280,"old_price":330,"catetory":"appliances"},
//     {"id":21,"img":"img/product/21.png","name":"Multifunctional Food Processor","price":350,"catetory":"appliances"},
//     {"id":22,"img":"img/product/22.png","name":"Zanussi Washing Machine 8 Kg 1200 RPM ","price":580,"catetory":"appliances"},
//     {"id":23,"img":"img/product/23.png","name":"Sharp 42 Lt Electronic Oven Convection","price":400,"catetory":"appliances"},
//     {"id":24,"img":"img/product/24.png","name":"Lenovo Monitor Legion R27fc-30 Gaming Curved","price":300,"old_price":380,"catetory":"electronics"}


// ];

// function searchNews(query) {
//   return news.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
// }

// // مثال على الاستخدام
// console.log(searchNews("egypt")); // هيطلع الخبر عن كرة القدم




// ===== Search Products (Header Input) =====




const searchInput = document.getElementById("search");
const productsContainer = document.getElementById("productsContainer");

// كل السيكشنات اللي في الصفحة (علشان نخفيها وقت السيرش)
const allSections = document.querySelectorAll(
  ".slider, .banner_4, .slider_products, .banners"
);

// هات المنتجات من item_home.js
const ALL_PRODUCTS = window.PRODUCTS || window.news || [];

// عرض نتائج السيرش
function renderSearchResults(products) {
  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML = `<p style="padding:20px">No products found</p>`;
    return;
  }

  products.forEach(product => {
    productsContainer.innerHTML += `
      <div class="product swiper-slide">
        <div class="img_product">
          <img src="${product.image}" alt="${product.name}">
        </div>

        <h3 class="name_product">${product.name}</h3>

        <div class="price">
          <p>$${product.price}</p>
          ${product.old_price ? `<span>$${product.old_price}</span>` : ""}
        </div>

        <div class="icons">
          <button class="btn_add_cart" data-id="${product.id}">
            <i class="fa-solid fa-cart-shopping"></i> Add to cart
          </button>

          <a href="#" class="btn_favourite" data-id="${product.id}">
            <i class="fa-regular fa-heart"></i>
          </a>
        </div>
      </div>
    `;
  });

  // ربط cart & favourite
  attachAddToCartHandlers(productsContainer);
  attachFavouriteHandlers(productsContainer);
}

// السيرش نفسه
searchInput.addEventListener("keyup", function () {
  const value = searchInput.value.toLowerCase().trim();

  // لو الانبت فاضي
  if (value === "") {
    productsContainer.innerHTML = "";
    allSections.forEach(sec => sec.style.display = "");
    return;
  }

  // اخفي الصفحة
  allSections.forEach(sec => sec.style.display = "none");

  // فلترة
  const filtered = ALL_PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(value)
  );

  renderSearchResults(filtered);
});



