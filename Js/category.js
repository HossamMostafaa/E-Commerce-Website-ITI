document.addEventListener("DOMContentLoaded", () => {

  const categoryLinks = document.querySelectorAll(".category_nav_list a");
  const searchInput = document.getElementById("search");
  const productsContainer = document.getElementById("productsContainer");

  categoryLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const target = link.dataset.target;

      // اقفل السيرش
      if (searchInput) searchInput.value = "";
      if (productsContainer) productsContainer.innerHTML = "";

      // All Category
      if (target === "all") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // Scroll للسيكشن
      const section = document.getElementById(target);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      } else {
        console.log("Section not found:", target);
      }
    });
  });

});


