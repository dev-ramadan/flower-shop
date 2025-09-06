// cart

document.addEventListener("DOMContentLoaded", () => {
  const cartRender = () => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-container");

    if (cartItems.length === 0) {
      container.innerHTML = "<p>Cart is empty</p>";
      return;
    }

    cartItems.forEach((item) => {
      let card = document.createElement("div");
      card.classList.add(
        "bg-white",
        "dark:bg-gray-500",
        "w-full",
        "p-4",
        "rounded-lg",
        "flex",
        "items-center",
        "flex-col"
      );
      card.innerHTML = `
      <img src="${item.image}" class="w-60 h-60 rounded-lg">
      <h3 class= "text-lg text-red-500 dark:text-white">${item.name}</h3>
      <p>$${item.price}</p>
        <p class="bg-red-500 w-fit p-2 text-white rounded" >Quantity: <span class='qty'>${item.quantity}</span></p>
                      <span class="relative flex items-center">
                  <h6 class="absolute left-2 cursor-pointer plus">+</h6>
                  <input class='border-2 border-gray-600 w-20 text-center' id='setQty' value=${item.quantity}> 
                  <h6 class="absolute right-2 cursor-pointer mins">-</h6>
                </span>
      <button id='remove'>Remove</button>
      `;
      container.appendChild(card);
      let qty = card.querySelector(".qty");
      let setQty = card.querySelector("#setQty");
      let plus = card.querySelector(".plus");
      let mins = card.querySelector(".mins");
      let remove = card.querySelector("#remove");
      remove.addEventListener("click", () => {
        container.innerHTML = '';
        let newCartItems = cartItems.filter(product => product.id !== item.id);
        localStorage.setItem("cart", JSON.stringify(newCartItems))
        cartRender();
        updateCartCounter()
      })
      // controle in the qty

      plus.addEventListener("click", () => {
        setQty.value = Number(setQty.value) + 1;
        item.quantity = Number(setQty.value); 
        localStorage.setItem("cart", JSON.stringify(cartItems)); 
        qty.textContent = setQty.value;
      });

      mins.addEventListener("click", () => {
        if (setQty.value > 1) {
          setQty.value = Number(setQty.value) - 1;
          item.quantity = Number(setQty.value);
          localStorage.setItem("cart", JSON.stringify(cartItems));
          qty.textContent = setQty.value;
        }
      });


    });
  }
  cartRender()
});
