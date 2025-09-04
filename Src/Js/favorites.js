function renderFavorites() {
    // getitem by localStorge
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let favoritesContainer = document.querySelector("#favorites-container");

    favoritesContainer.innerHTML = "";

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
          <p class="col-span-full text-center text-gray-500 text-lg">
            The Favorites Is Empty
          </p>`;
        return;
    }

    favorites.forEach((item, index) => {
        const card = document.createElement("div");
        card.className =
            "bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300";
        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="w-60 h-60 rounded-lg mx-auto">
          <div class="p-4">
            <h2 class="text-lg font-semibold text-gray-800 mb-2 text-center">${item.name}</h2>
            <p class="text-gray-600 mb-4">${item.description}</p>
            <div class="flex justify-between items-center">
              <span class="text-blue-600 font-bold text-lg">${item.price}</span>
              <button 
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm remove-fav" 
                data-index="${index}">
                Remove
              </button>
            </div>
          </div>`;

        favoritesContainer.appendChild(card);
    });
    // remove item
    document.querySelectorAll(".remove-fav").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            favorites.splice(index, 1);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            renderFavorites();
            updateFavoritesCount()
        });
    });
}

renderFavorites();
