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
});



