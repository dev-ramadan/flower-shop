const Navbar = document.querySelector("nav");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
Navbar.innerHTML = `
<div class="flex justify-between items-center h-24 md:px-28 ">
            <!-- Logo Flower Shop -->
            <div class="logo">
                <h1 class="font-semibold md:text-3xl text-pink-600 text-xl">Flower Shop</h1>
            </div>
            <!-- ul List -->
            <div id="main-nav" class="md:inline md:opacity-100 cursor-pointer pointer-event-none opacity-0">
                <ul class="md:flex">
                    <li><i class="fa-regular fa-house"></i>
                        <a href='index.html'>Home</a>
                    </li>
                    <li>Our FLowers</li>
                    <li>Lotus</li>
                    <li>Jasmine</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
            <!-- icons -->
            <div class="md:space-x-5 md:inline   cursor-pointer hidden">
                <i class="fa-regular fa-user"></i>
                <a href='favorites.html'>
                <i class="fa-regular fa-heart relative"><span class='absolute bg-red-300 p-2 rounded-full w-6 h-6 flex items-center justify-center -top-5 -right-4' id='favorites-count'>${favorites.length}</span></i>
                </a>
                <i class="fa-solid fa-cart-shopping"></i>
            </div>
            <!-- Hamburger-menu -->
            <div id="Hamburger-menu" class="md:hidden cursor-pointer z-10">
                <i class="fa-solid fa-bars "></i>
            </div>
        </div>
`
function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    document.getElementById("favorites-count").textContent = favorites.length;
}