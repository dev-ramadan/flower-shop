document.addEventListener("DOMContentLoaded", () => {
  fetch("../Js/data.json")
    .then((response) => response.json())
    .then((data) => {
      let container = document.getElementById("flower-cards");

      data.forEach((flower) => {
        let card = document.createElement("div");
        card.classList.add("card", "w-80", "h-120", "bg-gray-100", "rounded-xl", "p-8", "relative");
        card.innerHTML += `
                       <img class="h-60 w-full rounded-lg" src="${flower.image}" alt="${flower.name}">
                       <button class="absolute top-10 right-10 bg-blue-400 text-white rounded p-1 text-sm">Quick View</button>
                        <div class="card-content text-center">
                        <h3 class="text-xl">${flower.name}</h3>
                        <p>${flower.description}</p>
                        <div class="flex justify-between">
                        <span class="text-blue-600">$${flower.price.toFixed(2)}</span>
                        <button class="bg-blue-400 text-white font-bold rounded-full  w-8 h-8 text-lg felx justify-center" ><i class="fa-solid fa-plus"></i></button>
                        </div>
                        </div>
        `;
        card.children[1].addEventListener("click", () => show(flower));
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Error loading data:", error));

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
    $("#popup").fadeIn();
  };

  // customer slider bt Swiper JS
  const customerReviwe = async () => {
    try {
      const getReview = await fetch("../Js/customer.json");
      const review = await getReview.json();
      let swiperWrapper = document.querySelector(".swiper-wrapper");
      review.forEach((item) => {
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
        autoplay: { delay: 1000 },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    } catch (error) {
      console.error("Error loading reviews:", error);
    }
  };

  customerReviwe();
});

// Navbar ZeYad
let nav = document.getElementById("main-nav");
let menu = document.getElementById("Hamburger-menu");
let icon = document.querySelector("#Hamburger-menu i");

menu.addEventListener("click", (e) => {
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
  );
  // Toggle Hamburger-icon with ternary operator
  icon.classList.contains("fa-bars")
    ? icon.classList.replace("fa-bars", "fa-xmark")
    : icon.classList.replace("fa-xmark", "fa-bars");
});

// li Items
let liItems = document.querySelectorAll("#main-nav ul li");

liItems.forEach((item) => {
  item.classList.add("md:px-4", "opacity-50", "p-2");
  // li FirstItem
  liItems[0].classList.replace("opacity-50", "opacity-80");
});
