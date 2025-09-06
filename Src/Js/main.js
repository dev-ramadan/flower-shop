document.addEventListener("DOMContentLoaded", () => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let letestFlower = document.querySelector(".letest-flower");
  let letestFlowerBtn = letestFlower.querySelector("button");
  let letestProduct = {
    id : 99,
    name : letestFlower.querySelector("h1").textContent.trim(),
    description : letestFlower.querySelector("h3").textContent.trim(),
    price : letestFlower.querySelector("P").textContent.trim(),
    image : `../${letestFlower.querySelector("img").getAttribute("src")}`,
    quantity : 1
  }
  letestFlowerBtn.addEventListener("click" , ()=>{
             let existing = cartItems.find((item) => item.id === letestProduct.id);
          if (existing) {
            existing.quantity += letestProduct.quantity;
          } else {
            cartItems.push(letestProduct);
          }
          //  Save back to localStorage
          localStorage.setItem("cart", JSON.stringify(cartItems));
          // 5. Update counter
          updateCartCounter();
          //  Success alert
          Swal.fire({
            title: "Added to Cart!",
            text: `${letestProduct.name} has been added to your cart.`,
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          }); 
  })
  const checkInCart = (btn) => {
    if (btn.textContent === "in Cart") {
      btn.className =
        "w-24 rounded-md bg-green-400 text-white font-bold h-8 text-sm cart no-click";
      btn.disabled = true;
    } else {
      btn.className =
        "rounded-full w-8 bg-blue-400 text-white font-bold h-8 text-sm cart";
      btn.disabled = false;
    }
  };

  fetch("../Src/data/data.json")
    .then((response) => response.json())
    .then((data) => {
      let container = document.getElementById("flower-cards");

      data.forEach((flower) => {
        let card = document.createElement("div");
        card.classList.add(
          "card",
          "w-80",
          "h-120",
          "bg-white",
          "rounded-xl",
          "p-8",
          "relative",
          "md:w-72",
          "md:w-80"
        );
        card.innerHTML += `
          <span class="card-bullet"></span>
          <button class="absolute top-[10px] right-[10px] bg-gray-700 shadow-2xl text-white rounded-lg p-1 text-sm">Quick View</button>
          <img class="h-60 w-full rounded-lg mt-4" src="${flower.image}" alt="${flower.name}">
          <div class="card-content text-center">
            <h3 class="text-xl py-2 font-semibold">${flower.name}</h3>
            <p class="text-gray-500">${flower.description}</p>
            <div class="flex justify-between items-center pt-4">
              <span class="text-blue-600 text-xl">$${flower.price.toFixed(
          2
        )}</span>
              <div class='flex items-center gap-2'>
                <span class="relative flex items-center hidden qty">
                  <h6 class="absolute left-2 cursor-pointer plus">+</h6>
                  <input class='border-2 border-gray-600 w-20 text-center' id='setQty' value='1'> 
                  <h6 class="absolute right-2 cursor-pointer mins">-</h6>
                </span>
                <button class="bg-blue-400 text-white font-bold h-8 text-sm cart"></button>
                <button class="hidden bg-red-400 text-white font-bold rounded-full w-8 h-8 text-sm add">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        `;

        // Quick View button
        card.children[1].addEventListener("click", () => show(flower));
        container.appendChild(card);

        // Item To Controle
        let cartBtn = card.querySelector(".cart");
        let addBtn = card.querySelector(".add");
        let qty = card.querySelector(".qty");
        let setQty = card.querySelector("#setQty");
        let plus = card.querySelector(".plus");
        let mins = card.querySelector(".mins");

        // Chack item in Cart
        let existing = cartItems.find((item) => item.id === flower.id);
        cartBtn.innerHTML = existing
          ? "in Cart"
          : `<i class="fa-solid fa-plus"></i>`;
        checkInCart(cartBtn);

        // controle in the qty
        setQty.addEventListener("input", (e) => {
          let qtyValue = Number(e.target.value);
          if (qtyValue < 1 || isNaN(qtyValue)) setQty.value = 1;
        });

        plus.addEventListener("click", () => {
          setQty.value = Number(setQty.value) + 1;
        });

        mins.addEventListener("click", () => {
          if (setQty.value > 1) {
            setQty.value = Number(setQty.value) - 1;
          }
        });

        // frist click in add
        cartBtn.addEventListener("click", function () {
          if (this.textContent !== "in Cart") {
            qty.classList.remove("hidden");
            cartBtn.classList.add("hidden");
            addBtn.classList.remove("hidden");
          }
        });

        addBtn.addEventListener("click", addTocard)

        // add product to card
        function addTocard ()  {
          // 1. Prepare product data
          let product = {
            id: flower.id,
            name: flower.name,
            price: flower.price,
            image: flower.image,
            description: flower.description,
            quantity: Number(setQty.value) || 1,
          };
          // 2. Read cart from localStorage
          let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
          // 3. Check if product already exists
          let existing = cartItems.find((item) => item.id === product.id);
          if (existing) {
            existing.quantity += product.quantity;
          } else {
            cartItems.push(product);
          }
          // 4. Save back to localStorage
          localStorage.setItem("cart", JSON.stringify(cartItems));
          // 5. Update counter
          updateCartCounter();
          // 6. Success alert
          Swal.fire({
            title: "Added to Cart!",
            text: `${flower.name} has been added to your cart.`,
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });

          // change the btn
          cartBtn.textContent = "in Cart";
          checkInCart(cartBtn);
          cartBtn.classList.remove("hidden");
          addBtn.classList.add("hidden");
          qty.classList.add("hidden");
        }
      });
    })
    .catch((error) => console.error("Error loading data:", error));

  // Call counter update when page loads
  updateCartCounter();

  // Close popup button
  $("#closePopup").click(function () {
    $("#popup").fadeOut();
  });

  // Close popup by clicking background
  $("#popup").click(function (e) {
    if (e.target.id === "popup") {
      $("#popup").fadeOut();
    }
  });

  const show = (flowerData) => {
    $("#popupImage").attr("src", flowerData?.image);
    $("#popupName").text(flowerData?.name);
    $("#popupDescription").text(flowerData?.description);
    $("#popupPrice").text(`$${flowerData?.price.toFixed(2)}`);
    $("#popup").fadeIn();
    return flowerData;
  };

  // add Favorite item to localStorage
  $(".fav").on("click", function () {
    const favProduct = {
      name: $("#popupName").text(),
      price: $("#popupPrice").text(),
      image: $("#popupImage").attr("src"),
      description: $("#popupDescription").text(),
    };

    if (!favorites.some((item) => item.name === favProduct.name)) {
      favorites.push(favProduct);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateFavoritesCount();
    } else {
      console.log("المنتج موجود بالفعل في المفضلة");
    }
  });

  // customer slider by Swiper JS
  const customerReviwe = async () => {
    try {
      const getReview = await fetch("../Src/data/customer.json");
      const review = await getReview.json();
      let swiperWrapper = document.querySelector(".swiper-wrapper");
      review.forEach((item) => {
        let card = document.createElement("div");
        card.classList.add("swiper-slide");
        card.innerHTML = `
          <div class="p-8 shadow-xl">
            <p class="mb-6 text-lg desc">${item.description}</p>
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





