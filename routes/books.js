const express = require("express");
const router = express.Router();

let books = [
  { id: 1, task: "Dongeng Ayam" },
  { id: 2, task: "Ensiklopedia" },
];


router.get("/", (req, res) => {
  res.json(books);
});


router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Buku tidak ditemukan");
  res.json(book);
});

// POST tambah buku
router.post("/", (req, res) => {
  if (!req.body.task) return res.status(400).json({ error: "Task is required" });
  const newBook = {
    id: books.length + 1,
    task: req.body.task,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update buku
router.put("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Buku tidak ditemukan");
  if (!req.body.task) return res.status(400).json({ error: "Task is required" });

  book.task = req.body.task;
  res.json(book);
});

// DELETE hapus buku
router.delete("/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send("Buku tidak ditemukan");

  books.splice(bookIndex, 1);
  res.status(204).send();
});

module.exports = router;