document.addEventListener("DOMContentLoaded", () => {
  fetch('../Js/data.json')
    .then(response => response.json())
    .then(data => {
      let container = document.getElementById('flower-cards');

      data.forEach(flower => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML += `
            <img src="${flower.image}" alt="${flower.name}">
            <div class="card-content">
              <h3>${flower.name}</h3>
              <p>${flower.description}</p>
              <span>$${flower.price.toFixed(2)}</span>
              <button>Add to Cart</button>
            </div>          
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



