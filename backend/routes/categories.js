const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, parent_id FROM categories'); // name should now be lowercase
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Insert 
router.post('/', async (req, res) => {
  const { name, parent_id } = req.body;
  try {
    await db.query("INSERT INTO categories (name, parent_id) VALUES (?, ?)", [name, parent_id || null]);
    res.send("Category added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update 
router.put('/:id', async (req, res) => {
  const { name, parent_id } = req.body;
  const id = req.params.id;
  
  try {
    const [result] = await db.query(
      "UPDATE categories SET name = ?, parent_id = ? WHERE id = ?",
      [name, parent_id || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("Category not found");
    }

    res.send("Category updated");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete
router.delete('/:id', async (req, res) => {
  try {
    await db.query("DELETE FROM categories WHERE id = ?", [req.params.id]);
    res.send("Category deleted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
