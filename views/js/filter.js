document.addEventListener("DOMContentLoaded", () => {
  fetch('/products/all')
    .then(res => res.json())
    .then(products => {
      const grid = document.getElementById('productGrid');
      grid.innerHTML = ''; // Clear if needed

      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product.image_url}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p class="price">$${product.price}</p>
        `;
        grid.appendChild(card);
      });
    })
    .catch(err => console.error('Failed to load products', err));
});
