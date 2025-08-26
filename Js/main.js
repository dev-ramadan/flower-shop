document.addEventListener("DOMContentLoaded", () => {
  fetch('../Js/data.json')
    .then(response => response.json())
    .then(data => {
      let container = document.getElementById('flower-cards');

      data.forEach(flower => {
        let card = document.createElement("div");
<<<<<<< Updated upstream
        card.classList.add("card");
        card.innerHTML += `
            <img src="${flower.image}" alt="${flower.name}">
            <div class="card-content">
              <h3>${flower.name}</h3>
              <p>${flower.description}</p>
              <span>$${flower.price.toFixed(2)}</span>
              <button>Add to Cart</button>
            </div>          
=======
        card.classList.add(
          "card",
          "w-80",
          "h-120",
          "bg-white",
          "rounded-xl",
          "p-8",
          "relative",
        );
        card.innerHTML += `
                        <span class="card-bullet"></span>
                        <button class="absolute top-[10px] right-[10px] bg-gray-700  shadow-2xl text-white rounded-lg p-1 text-sm">Quick View</button>
                       <img class="h-60 w-full rounded-lg mt-4" src="${
                         flower.image
                       }" alt="${flower.name}">
                        <div class="card-content text-center">
                        <h3 class="text-xl py-2 font-semibold">${flower.name}</h3>
                        <p class="text-gray-500">${flower.description}</p>
                        <div class="flex justify-between items-center pt-4">
                        <span class="text-blue-600 text-xl">$${flower.price.toFixed(
                          2
                        )}</span>
                        <button class="bg-blue-400 text-white font-bold rounded-full  w-8 h-8 text-sm felx justify-center" ><i class="fa-solid fa-plus"></i></button>
                        </div>
                        </div>
>>>>>>> Stashed changes
        `;
        card.children[0].addEventListener('click', () => show(flower))
        container.appendChild(card)

      })
    })
    .catch(error => console.error("Error loading data:", error));

  // close popup button 
  $("#closePopup").click(function (e) {
    $("#popup").fadeOut();
  });

  // close popup by bageround click
  $("#popup").click(function (e) {
    if (e.target.id === "popup") {
      $("#popup").fadeOut();
    }
  });

  const show = (flowerData) => {
    $("#popupImage").attr("src", flowerData.image);
    $("#popupName").text(flowerData.name);
    $("#popupDescription").text(flowerData.description);
    $("#popupPrice").text(`$${flowerData.price.toFixed(2)}`);
    $("#popup").fadeIn();;
  };


  // customer slider bt Swiper JS
  const customerReviwe = async () => {
    try {
      const getReview = await fetch('../Js/customer.json');
      const review = await getReview.json();
      let swiperWrapper = document.querySelector(".swiper-wrapper");
      review.forEach(item => {
        let card = document.createElement("div");
        card.classList.add("swiper-slide");
        card.innerHTML = `
                           <div class=" p-8 shadow-xl">
                              <p class="mb-6 text-lg desc"> ${item.description} </p>
                           <div class="flex items-center">
                             <img src="${item.image}" class="w-14 h-14 rounded-full mr-4">
                           <div>
                             <h4 class="font-bold text-yellow-400 text-xl">${item.name}</h4>
                             <p class="text-sm text-gray-500">${item.jop}</p>
                           </div>
                           </div>
                           </div>
      `;
        swiperWrapper.appendChild(card);
      });


      new Swiper(".mySwiper", {
        loop: true,
        autoplay: { delay: 5000 },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }
      });

    } catch (error) {
      console.error("Error loading reviews:", error);
    }
  };

  customerReviwe();
});

<<<<<<< Updated upstream

=======
// Navbar ZeYad
let nav = document.getElementById("main-nav");
let menu = document.getElementById("Hamburger-menu");
let icon = document.querySelector("#Hamburger-menu i");
let switch_btn = document.getElementById("SwitchDarkmode");
menu.addEventListener("click", (e) => {
  // Show/Hide Switch_btn
  switch_btn.classList.toggle("opacity-100");
  switch_btn.classList.toggle("animation");
  // Add Animation To Main-Nav
  nav.classList.add("animation");
  // Show/Hide Nav
  nav.classList.toggle("opacity-100");
  nav.classList.add(
    "top-0",
    "bg-gray-300",
    "absolute",
    "left-0",
    "w-full",
    "pl-8",
    "p-4",
    "z-10",
    "h-[50%]"
  );
  // Toggle Hamburger-icon with ternary operator
  icon.classList.contains("fa-bars")
    ? icon.classList.replace("fa-bars", "fa-xmark")
    : icon.classList.replace("fa-xmark", "fa-bars");
});
>>>>>>> Stashed changes

