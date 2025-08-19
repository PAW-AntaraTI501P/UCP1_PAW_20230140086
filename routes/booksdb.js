const express = require("express");
const router = express.Router();
const db = require("./booksdb");

// GET semua buku
router.get("/", (req, res) => {
  db.all("SELECT * FROM books", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// GET buku by id
router.get("/:id", (req, res) => {
  db.get("SELECT * FROM books WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json(err);
    if (!row) return res.status(404).send("Buku tidak ditemukan");
    res.json(row);
  });
});

// POST tambah buku
router.post("/", (req, res) => {
  if (!req.body.task) return res.status(400).json({ error: "Task is required" });

  db.run("INSERT INTO books (task) VALUES (?)", [req.body.task], function (err) {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: this.lastID, task: req.body.task });
  });
});

// PUT update buku
router.put("/:id", (req, res) => {
  if (!req.body.task) return res.status(400).json({ error: "Task is required" });

  db.run("UPDATE books SET task = ? WHERE id = ?", [req.body.task, req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    if (this.changes === 0) return res.status(404).send("Buku tidak ditemukan");
    res.json({ id: req.params.id, task: req.body.task });
  });
});

// DELETE hapus buku
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM books WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    if (this.changes === 0) return res.status(404).send("Buku tidak ditemukan");
    res.status(204).send();
  });
});

module.exports = router;