  let allProducts = [];

  // Fetch all products from backend
  async function loadProducts() {
    try {
      const res = await fetch('/products'); // make sure this route exists in backend
      const data = await res.json();
      allProducts = data;
      renderProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  }

  // Render product cards
  function renderProducts(products) {
    const container = document.getElementById('productList');
    container.innerHTML = ''; // Clear existing

    products.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${prod.image || 'images/default.jpg'}" alt="${prod.name}">
        <h3>${prod.name}</h3>
        <p class="price">$${prod.price}</p>
      `;
      container.appendChild(card);
    });
  }

  // Filter logic
  document.getElementById('applyFilter').addEventListener('click', () => {
    const min = parseFloat(document.getElementById('minPrice').value) || 0;
    const max = parseFloat(document.getElementById('maxPrice').value) || Infinity;

    const filtered = allProducts.filter(p => p.price >= min && p.price <= max);
    renderProducts(filtered);
  });

  // Sort logic
  document.getElementById('sortSelect').addEventListener('change', (e) => {
    let sorted = [...allProducts];
    const val = e.target.value;

    if (val === 'az') sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (val === 'priceLow') sorted.sort((a, b) => a.price - b.price);
    else if (val === 'priceHigh') sorted.sort((a, b) => b.price - a.price);

    renderProducts(sorted);
  });

  window.onload = loadProducts;

