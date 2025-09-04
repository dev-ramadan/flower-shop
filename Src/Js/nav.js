const Navbar = document.querySelector("nav");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
Navbar.innerHTML = `
            <!-- Logo Flower Shop -->
            <div class="logo">
                <h1 class="font-semibold md:text-xl lg:text-2xl text-pink-600 text-xl cursor-pointer">Flower Shop</h1>
            </div>
            <!-- ul List -->
            <div id="main-nav" class="md:inline  md:text-sm lg:text-base  md:opacity-100  cursor-pointer pointer-event-none opacity-0">
                <ul class="md:flex">
                    <li><i class="fa-regular fa-house md:hidden"></i>Home</li>
                    <li>Our FLowers</li>
                    <li>Lotus</li>
                    <li>Jasmine</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
            <!-- icons -->
            <div class="md:space-x-3 md:inline md:text-sm lg:text-base cursor-pointer hidden relative ">
                <i class="fa-regular fa-user"></i>
                <i class="fa-regular fa-heart"></i>
                <i id="cart-icon" class="fa-solid fa-cart-shopping relative"></i>
                <span id="counter" class="bg-red-500 absolute -right-2 -top-3 rounded-full w-4 h-4 text-xs text-center text-white">0</span>
            </div>
            <!-- Hamburger-menu -->
            <div id="Hamburger-menu" class="md:hidden cursor-pointer z-10">
                <i class="fa-solid fa-bars"></i>
            </div>
        <!-- Switch Darkmode -->
        <main id="SwitchDarkmode" class="md:hidden z-20 absolute right-50 bottom-[50%] opacity-0 pointer-event-none">
            <label class="switch">
                <input checked="true" id="checkbox" type="checkbox" />
                <span class="slider">
                    <div class="star star_1"></div>
                    <div class="star star_2"></div>
                    <div class="star star_3"></div>
                    <svg viewBox="0 0 16 16" class="cloud_1 cloud">
                        <path transform="matrix(.77976 0 0 .78395-299.99-418.63)" fill="#fff"
                            d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925">
                        </path>
                    </svg>
                </span>
            </label>
        </main>
`
function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    document.getElementById("favorites-count").textContent = favorites.length;
}