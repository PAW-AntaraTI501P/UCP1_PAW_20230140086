const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const booksDB = require("./routes/booksdb"); 

const app = express();
const PORT = 5001; 

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("<h2>Welcome! <a href='/books'>Go to Books</a></h2>");
});

app.get("/books", (req, res) => {
  res.render("books", { books: booksDB.getAll() });
});

app.get("/", (req, res) => {
  res.render("index", {
    layout: "layout/main-layout",
  });
});

app.post("/books", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).send("Task (judul buku) harus diisi");
  booksDB.add(task);
  res.status(201).send({ message: "Book added successfully" });
});

app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { task } = req.body;
  const updated = booksDB.update(id, task);
  if (!updated) return res.status(404).send("Book not found");
  res.send({ message: "Book updated successfully" });
});

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = booksDB.remove(id);
  if (!deleted) return res.status(404).send("Book not found");
  res.send({ message: "Book deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});