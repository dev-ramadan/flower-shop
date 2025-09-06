const Navbar = document.querySelector("nav");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

Navbar.innerHTML = /* html */ `
  <!-- Logo -->
  <div class="logo">
    <h1
      class="font-semibold md:text-xl lg:text-2xl text-pink-600 text-xl cursor-pointer"
    >
      Flower Shop
    </h1>
  </div>

  <!-- Main Navigation (Desktop) -->
  <div
    id="main-nav"
    class="hidden md:block dark:text-gray-200 md:text-sm lg:text-base cursor-pointer"
  >
    <ul class="md:flex space-x-6">
      <li class="text-black opacity-80"><a href="/">Home</a></li>
      <li class="text-black opacity-50">Our Flowers</li>
      <li class="text-black opacity-50">Lotus</li>
      <li class="text-black opacity-50">Jasmine</li>
      <li class="text-black opacity-50">About</li>
      <li class="text-black opacity-50">Contact</li>
    </ul>
  </div>

  <!-- Icons (Desktop) -->
  <div class="space-x-4 md:flex  items-center hidden relative text-gray-700 dark:text-black">
    <i class="fa-regular fa-user cursor-pointer"></i>

    <div class="relative cursor-pointer">
      <a href="../Pages/favorites.html">
        <i class="fa-regular fa-heart"></i>
        <span
          id="favorites-count-desktop"
          class="bg-red-500 absolute -right-2 -top-2 rounded-full w-4 h-4 text-xs text-center text-white"
        >0</span>
      </a>
    </div>

    <div class="relative cursor-pointer">
      <i id="cart-icon" class="fa-solid fa-cart-shopping"></i>
      <span
        id="counter"
        class="bg-red-500 absolute -right-2 -top-2 rounded-full w-4 h-4 text-xs text-center text-white"
      >0</span>
      </div>
      <div>$<span id="totale">0</span></div>
  </div>

  <!-- Hamburger Menu -->
  <div
    id="Hamburger-menu"
    class="md:hidden cursor-pointer z-20 text-black dark:text-gray-900"
  >
    <i class="fa-solid fa-bars text-xl"></i>
  </div>

  <!-- Mobile Menu (Slide-in) -->
  <div
    id="mobile-menu"
    class="fixed top-0 left-0 w-64 h-screen dark:bg-gray-900 bg-white transform -translate-x-full transition-transform duration-300 flex flex-col justify-between p-6 text-lg text-gray-700 dark:text-gray-200 z-10 cursor-pointer"
  >
    <ul class="space-y-6">
      <li class="hover:text-pink-600 transition"><a href="/">Home</a></li>
      <li class="hover:text-pink-600 transition">Our Flowers</li>
      <li class="hover:text-pink-600 transition">Lotus</li>
      <li class="hover:text-pink-600 transition">Jasmine</li>
      <li class="hover:text-pink-600 transition">About</li>
      <li class="hover:text-pink-600 transition">Contact</li>
    </ul>

    <!-- Switch Dark Mode -->
    <label class="relative inline-flex items-center cursor-pointer">
      <input id="switch" class="sr-only peer" type="checkbox" />
      <div
        class="w-20 h-10 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 peer-checked:from-blue-400 peer-checked:to-indigo-500 transition-all duration-500 after:content-['☀️'] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-8 after:w-8 after:flex after:items-center after:justify-center after:transition-all after:duration-500 peer-checked:after:translate-x-10 peer-checked:after:content-['🌙'] after:shadow-md after:text-lg"
      ></div>
    </label>

    <!-- Bottom Section -->
    <div class="space-y-6">
      <!-- Icons (Mobile) -->
      <div class="flex items-center gap-6">
        <i class="fa-regular fa-user cursor-pointer"></i>
        <div class="relative cursor-pointer">
          <a href="../Pages/favorites.html">
            <i class="fa-regular fa-heart"></i>
            <span
              id="favorites-count-mobile"
              class="bg-red-500 absolute -right-2 -top-2 rounded-full w-4 h-4 text-xs text-center text-white"
            >0</span>
          </a>
        </div>
        <div class="relative cursor-pointer">
          <i id="cart-icon-mobile" class="fa-solid fa-cart-shopping"></i>
          <span
            id="counter-mobile"
            class="bg-red-500 absolute -right-2 -top-2 rounded-full w-4 h-4 text-xs text-center text-white"
          ></span>
        </div>
      <div>$<span id="mobile-totale">0</span></div>
      </div>
    </div>
  </div>
`;

// ----------------------------
// Dark Mode
// ----------------------------
let Darkbtn = document.getElementById('switch');

Darkbtn.addEventListener('change', () => {
  document.documentElement.classList.toggle("dark");

  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("mode", "dark");
  } else {
    localStorage.setItem("mode", "light");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  let savedMode = localStorage.getItem("mode");

  if (savedMode === "dark") {
    document.documentElement.classList.add("dark");
    Darkbtn.checked = true; 
  } else {
    document.documentElement.classList.remove("dark");
    Darkbtn.checked = false;
  }
});

// ----------------------------
// Navbar Responsive (Slide-in)
// ----------------------------
const menuBtn = document.getElementById("Hamburger-menu");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.querySelector("#Hamburger-menu i");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("-translate-x-full");
  mobileMenu.classList.toggle("translate-x-0");

  menuIcon.classList.contains("fa-bars")
    ? menuIcon.classList.replace("fa-bars", "fa-xmark")
    : menuIcon.classList.replace("fa-xmark", "fa-bars");
});

// ----------------------------
// Favorites Count (update desktop + mobile)
// ----------------------------
function updateFavoritesCount() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  document.getElementById("favorites-count-desktop").textContent =
    favorites.length;
  document.getElementById("favorites-count-mobile").textContent =
    favorites.length;
}
updateFavoritesCount();

// ----------------------------
// Function to update cart counter
// ----------------------------
function updateCartCounter() {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("counter").textContent = cartItems.length;
  document.getElementById("counter-mobile").textContent = cartItems.length;
  let totalPrice = cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  console.log(totalPrice);
  
  document.getElementById("totale").textContent = totalPrice;
  document.getElementById("mobile-totale").textContent = totalPrice;
}
updateCartCounter()

// ----------------------------
// Cart Page Redirect
// ----------------------------
const cartDesktop = document.getElementById("cart-icon");
const cartMobile = document.getElementById("cart-icon-mobile");

if (cartDesktop) {
  cartDesktop.addEventListener("click", () => {
    window.location.href = "../Pages/Cart.html";
  });
}
if (cartMobile) {
  cartMobile.addEventListener("click", () => {
    window.location.href = "../Pages/Cart.html";
  });
}



