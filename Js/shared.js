/**
 * Shared UI - Navbar updates (cart count, auth state), cart link auth check
 */

(function() {
  function updateNavbar() {
    const cartLink = document.querySelector('.header_icon .icon a[href="cart.html"]') ||
      document.querySelector('a[href="cart.html"]') ||
      document.querySelector('.cart-link');
    const cartCountEl = document.querySelector('.item_header') || document.querySelector('.count');
    const loginSignupWrap = document.querySelector('.login_signup');

    // Update cart count
    if (typeof getCartCount === 'function' && cartCountEl) {
      const count = getCartCount();
      cartCountEl.textContent = count;
    }
    // Update favourites count
    var favEl = document.querySelector('.Favourit');
    if (typeof getFavourites === 'function' && favEl) {
      favEl.textContent = getFavourites().length;
    }

    // Update auth state: show Login/Sign Up or user + Logout
    if (typeof isLoggedIn === 'function' && loginSignupWrap) {
      if (isLoggedIn()) {
        loginSignupWrap.innerHTML = '<span class="user-email">' +
          (getCurrentUserEmail() || '') +
          '</span> <a href="#" class="btn btn-logout">Logout</a>';
        const logoutBtn = loginSignupWrap.querySelector('.btn-logout');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            signOut();
            window.location.href = 'index.html';
          });
        }
      } else {
        loginSignupWrap.innerHTML =
          '<a href="signin.html" class="btn">Login <i class="fa-solid fa-right-to-bracket"></i></a> ' +
          '<a href="signup.html" class="btn">Sign Up <i class="fa-solid fa-user-plus"></i></a>';
      }
    }
  }

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', updateNavbar);
    } else {
      updateNavbar();
    }
    document.addEventListener('click', function(e) {
      var link = e.target.closest('a[href="cart.html"]');
      if (link && typeof isLoggedIn === 'function' && !isLoggedIn()) {
        e.preventDefault();
        window.location.href = 'signin.html?return=' + encodeURIComponent('cart.html');
      }
    });
  }
  init();
})();
