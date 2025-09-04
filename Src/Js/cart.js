// cart

document.addEventListener("DOMContentLoaded", () => {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cart-container");

  if (cartItems.length === 0) {
    container.innerHTML = "<p>Cart is empty</p>";
    return;
  }

  cartItems.forEach(item => {
    let card = document.createElement("div");
    card.classList.add("bg-white", "w-full", "p-4", "rounded-lg", "flex", "items-center", "flex-col")
    card.innerHTML = `
      <img src="${item.image}" class="w-60 h-60 rounded-lg">
      <h3 class= "text-lg text-red-500">${item.name}</h3>
      <p>$${item.price}</p>
      <p class="bg-red-500 w-fit p-2 text-white rounded" >Quantity: ${item.quantity}</p>
    `;
    container.appendChild(card);
  });
});
