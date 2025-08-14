document.addEventListener("DOMContentLoaded", () => {
  fetch('../Js/data.json')
    .then(response => response.json())
    .then(data => {
      let container = document.getElementById('flower-cards');
      data.forEach(flower => {
        container.innerHTML += `
          <div class="card">
            <img src="${flower.image}" alt="${flower.name}">
            <div class="card-content">
              <h3>${flower.name}</h3>
              <p>${flower.description}</p>
              <span>$${flower.price.toFixed(2)}</span>
              <button>Add to Cart</button>
            </div>
          </div>
        `;
      });
    })
    .catch(error => console.error("Error loading data:", error));
});
