let category_nav_list=document.querySelector(".category_nav_list")

function openCategorList(){
  
category_nav_list.classList.toggle("active")
}


// function openCategorList() {
//   let list = document.querySelector(".category_nav_list");

//   if (list.style.display === "none") {
//     list.style.display = "block";
//   } else {
//     list.style.display = "none";
//   }
// }
var swiper = new Swiper(".slid-swab", {
      pagination: {
        el: ".swiper-pagination",
        dynamicBullests:true, 
        clickable:true
      },
      autoplay:{
        delay :25000
      }
      ,loop :true
    });
