const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/linksdb";

app.use(express.json());
// Сервираме статични файлове (HTML/CSS) от папка public, точно по лекцията ти!
app.use(express.static(path.join(__dirname, "public")));

// Свързване с MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("Успешно свързване с MongoDB!"))
  .catch(err => console.error("Грешка при свързване с MongoDB:", err));

// Схема с допълнително поле за описание
const LinkSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String
});
const Link = mongoose.model("Link", LinkSchema);

// API маршрут за вземане на линковете
app.get("/api/links", async (req, res) => {
  try {
    const links = await Link.find();
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API маршрут за добавяне на линк
app.post("/api/links", async (req, res) => {
  const { title, url, description } = req.body;
  if (!title || !url) {
    return res.status(400).json({ error: "Заглавието и URL-ът са задължителни!" });
  }
  try {
    const newLink = new Link({ title, url, description });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Сървърът работи на порт: ${PORT}`);
});