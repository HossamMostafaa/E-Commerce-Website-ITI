/**
 * Authentication Module - Handles user sign in, sign up, and session state
 * Uses localStorage for persistence (no backend)
 */

const AUTH_KEYS = {
  USERS: 'ecommerce_users',
  CURRENT_USER: 'ecommerce_currentUser',
  IS_LOGGED_IN: 'ecommerce_isLoggedIn'
};

/**
 * Get all registered users from localStorage
 * @returns {Array} Array of user objects
 */
function getUsers() {
  try {
    const users = localStorage.getItem(AUTH_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Save users array to localStorage
 * @param {Array} users - Array of user objects
 */
function saveUsers(users) {
  localStorage.setItem(AUTH_KEYS.USERS, JSON.stringify(users));
}

/**
 * Register a new user (Sign Up)
 * @param {string} email - User email (used as unique identifier)
 * @param {string} password - User password
 * @param {string} name - User display name
 * @returns {{success: boolean, message: string}}
 */
function signUp(email, password, name) {
  const users = getUsers();
  const trimmedEmail = (email || '').trim().toLowerCase();

  if (!trimmedEmail || !password || !name) {
    return { success: false, message: 'All fields are required.' };
  }
  if (password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters.' };
  }
  if (users.some(u => u.email.toLowerCase() === trimmedEmail)) {
    return { success: false, message: 'Email already registered.' };
  }

  users.push({
    email: trimmedEmail,
    password: password, // In production, never store plain passwords
    name: (name || '').trim()
  });
  saveUsers(users);

  // Auto login after sign up
  setLoggedInUser(trimmedEmail);
  // Migrate guest cart to user cart if any
  try {
    const guestCart = localStorage.getItem('ecommerce_cart_guest');
    if (guestCart) {
      const guestItems = JSON.parse(guestCart);
      if (guestItems.length > 0) {
        const userKey = 'ecommerce_cart_' + trimmedEmail;
        localStorage.setItem(userKey, guestCart);
        localStorage.removeItem('ecommerce_cart_guest');
      }
    }
  } catch (e) {}
  return { success: true, message: 'Account created successfully!' };
}

/**
 * Validate credentials and sign in
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {{success: boolean, message: string}}
 */
function signIn(email, password) {
  const users = getUsers();
  const trimmedEmail = (email || '').trim().toLowerCase();

  if (!trimmedEmail || !password) {
    return { success: false, message: 'Email and password are required.' };
  }

  const user = users.find(u => u.email.toLowerCase() === trimmedEmail && u.password === password);
  if (!user) {
    return { success: false, message: 'Invalid email or password.' };
  }

  setLoggedInUser(trimmedEmail);
  // Migrate guest cart to user cart if any
  try {
    const guestCart = localStorage.getItem('ecommerce_cart_guest');
    if (guestCart) {
      const guestItems = JSON.parse(guestCart);
      if (guestItems.length > 0) {
        const userKey = 'ecommerce_cart_' + trimmedEmail;
        localStorage.setItem(userKey, guestCart);
        localStorage.removeItem('ecommerce_cart_guest');
      }
    }
  } catch (e) {}
  return { success: true, message: 'Welcome back!' };
}

/**
 * Set the currently logged-in user in localStorage
 * @param {string} email - User email
 */
function setLoggedInUser(email) {
  localStorage.setItem(AUTH_KEYS.CURRENT_USER, email);
  localStorage.setItem(AUTH_KEYS.IS_LOGGED_IN, 'true');
}

/**
 * Sign out the current user
 */
function signOut() {
  localStorage.removeItem(AUTH_KEYS.CURRENT_USER);
  localStorage.setItem(AUTH_KEYS.IS_LOGGED_IN, 'false');
}

/**
 * Check if user is logged in
 * @returns {boolean}
 */
function isLoggedIn() {
  return localStorage.getItem(AUTH_KEYS.IS_LOGGED_IN) === 'true';
}

/**
 * Get current user email
 * @returns {string|null}
 */
function getCurrentUserEmail() {
  return localStorage.getItem(AUTH_KEYS.CURRENT_USER);
}

/**
 * Get cart storage key for the current user (or guest)
 * @returns {string}
 */
function getCartStorageKey() {
  const email = getCurrentUserEmail();
  return email ? `ecommerce_cart_${email}` : 'ecommerce_cart_guest';
}

/**
 * Redirect to sign-in if not logged in (for protected pages like cart, checkout)
 * @param {string} returnUrl - Optional URL to return to after login
 * @returns {boolean} - true if allowed, false if redirected
 */
function requireAuth(returnUrl) {
  if (isLoggedIn()) return true;
  const url = returnUrl ? `signin.html?return=${encodeURIComponent(returnUrl)}` : 'signin.html';
  window.location.href = url;
  return false;
}
