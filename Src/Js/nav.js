const Navbar = document.querySelector("nav");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

Navbar.innerHTML = `
  <!-- Logo -->
  <div class="logo">
    <h1 class="font-semibold md:text-xl lg:text-2xl text-pink-600 text-xl cursor-pointer">
      Flower Shop
    </h1>
  </div>

  <!-- Main Navigation (Desktop) -->
  <div id="main-nav"
      class="hidden md:block text-gray-700 dark:text-gray-200 md:text-sm lg:text-base cursor-pointer">
    <ul class="md:flex space-x-6">
      <li class="hover:text-pink-600 transition"><a href='/'>Home</a></li>
      <li class="hover:text-pink-600 transition">Our Flowers</li>
      <li class="hover:text-pink-600 transition">Lotus</li>
      <li class="hover:text-pink-600 transition">Jasmine</li>
      <li class="hover:text-pink-600 transition">About</li>
      <li class="hover:text-pink-600 transition">Contact</li>
    </ul>
  </div>

  <!-- Icons (Desktop) -->
  <div class="space-x-4 md:flex items-center hidden relative text-gray-700 dark:text-gray-200">
    <i class="fa-regular fa-user cursor-pointer"></i>

    <div class="relative cursor-pointer">
        <a href='../Pages/favorites.html'>
        <i class="fa-regular fa-heart"></i>
        <span id="favorites-count-desktop"
        class="bg-red-500 absolute -right-2 -top-2 rounded-full w-4 h-4 text-xs text-center text-white">0</span>
        </a>
    </div>

    <div class="relative cursor-pointer">
      <i id="cart-icon" class="fa-solid fa-cart-shopping"></i>
      <span id="counter"
          class="bg-red-500 absolute -right-2 -top-2 rounded-full w-4 h-4 text-xs text-center text-white">0</span>
    </div>
  </div>

  <!-- Hamburger Menu -->
  <div id="Hamburger-menu" class="md:hidden cursor-pointer z-20 text-gray-700 dark:text-gray-200">
    <i class="fa-solid fa-bars text-xl"></i>
  </div>

  <!-- Mobile Menu (Slide-in) -->
  <div id="mobile-menu"
    class="fixed top-0 left-0 w-64 h-screen dark:bg-gray-900 bg-white transform -translate-x-full transition-transform duration-300 flex flex-col justify-between p-6 text-lg text-gray-700 dark:text-gray-200 z-10">
    
    <ul class="space-y-6">
      <li class="hover:text-pink-600 transition">Home</li>
      <li class="hover:text-pink-600 transition">Our Flowers</li>
      <li class="hover:text-pink-600 transition">Lotus</li>
      <li class="hover:text-pink-600 transition">Jasmine</li>
      <li class="hover:text-pink-600 transition">About</li>
      <li class="hover:text-pink-600 transition">Contact</li>
    </ul>

    <!-- Bottom Section -->
    <div class="space-y-6">
      <!-- Icons (Mobile) -->
      <div class="flex items-center gap-6">
        <i class="fa-regular fa-user cursor-pointer"></i>
        <div class="relative cursor-pointer">
        <a href='../Pages/favorites.html'>
        <i class="fa-regular fa-heart"></i>
        <span id="favorites-count-mobile"
            class="bg-red-500 absolute -right-2 -top-2 rounded-full w-4 h-4 text-xs text-center text-white">0</span>
        </a>
        </div>
        <div class="relative cursor-pointer">
          <i id="cart-icon-mobile" class="fa-solid fa-cart-shopping"></i>
          <span id="counter-mobile"
              class="bg-red-500 absolute -right-2 -top-2 rounded-full w-4 h-4 text-xs text-center text-white">0</span>
        </div>
      </div>

      <!-- Dark Mode Switch -->
      <div>
        <label class="switch">
          <input id="checkbox" type="checkbox" />
          <span class="slider"></span>
        </label>
      </div>
    </div>
  </div>
`;

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
  document.getElementById("favorites-count-desktop").textContent = favorites.length;
  document.getElementById("favorites-count-mobile").textContent = favorites.length;
}
updateFavoritesCount();
 
   // ----------------------------
  // Function to update cart counter
  // ----------------------------
  function updateCartCounter() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let counter = document.getElementById("counter");
    let counterMobile = document.getElementById("counter-mobile");

    let totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    counter.textContent = totalQuantity;
    counterMobile.textContent = totalQuantity;

  }



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

// ----------------------------
// Dark Mode
// ----------------------------
const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
  document.documentElement.classList.toggle("dark");
});
