document.getElementById('categoryForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent full page reload

  const formData = new FormData(this);
  const name = formData.get('name');
  const parent_id = formData.get('parent_id');

  const res = await fetch('/categories/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, parent_id }),
  });

  const result = await res.json();
  if (result.success) {
    alert('Category added successfully!');
    window.location.reload();
  } else {
    alert('Error adding category');
  }
});
