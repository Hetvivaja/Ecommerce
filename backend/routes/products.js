const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db'); 

// Multer 
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// INSERT 
router.post('/', upload.single('image'), async (req, res) => {
  const { name, price, description, category_id } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !price || !description || !category_id || !image) {
    return res.status(400).send('Missing required fields');
  }

  try {
    await db.query(
      "INSERT INTO products (name, price, description, category_id, image) VALUES (?, ?, ?, ?, ?)",
      [name, price, description, category_id, image]
    );
    res.status(200).send('Product added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.get('/', async (req, res) => {
  const [products] = await db.query('SELECT * FROM products');
  res.json(products);
});

// GET All Products
router.get('/all', async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT id, name AS name, price, description, category_id, image AS image 
      FROM products
    `);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


// UPDATE Product 
router.put('/:id', upload.single('image'), async (req, res) => {
  const { name, price, description, category_id } = req.body;
  const id = req.params.id;
  const image = req.file ? req.file.filename : null;

  if (!name || !price || !description || !category_id) {
    return res.status(400).send('Missing required fields');
  }

  try {
    let query = `
      UPDATE products SET name = ?, price = ?, description = ?, category_id = ?
      ${image ? ', image = ?' : ''} WHERE id = ?
    `;
    let params = image
      ? [name, price, description, category_id, image, id]
      : [name, price, description, category_id, id];

    await db.query(query, params);
    res.send('Product updated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// DELETE Product 
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM products WHERE id = ?", [id]);
    res.send("Product deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

module.exports = router;
