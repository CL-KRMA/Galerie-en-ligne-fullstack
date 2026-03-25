// backend/app.js
const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const ADDRESS = "127.0.0.1";
const PORT = 2000;

// Middleware pour parser le JSON
app.use(express.json());
app.use(cors());

// Chemin direct vers db.json
const dbPath = "./db.json";

// Fonction utilitaire pour lire la DB
function readDB() {
  try {
    const data = fs.readFileSync(dbPath, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

// Fonction utilitaire pour écrire la DB
function writeDB(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

// Route POST pour ajouter une image
app.post("/add-image", (req, res) => {
  let { name, description, imageUrl } = req.body;

  if (!name || !description || !imageUrl) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  const db = readDB();

  const newEntry = {
    id: Date.now(),
    name: String(name),
    description: String(description),
    imageUrl: String(imageUrl),
  };

  db.push(newEntry);
  writeDB(db);

  res.status(201).json({ message: "Image ajoutée avec succès", data: newEntry });
});

// Route GET pour récupérer toutes les images
app.get("/images", (req, res) => {
  const db = readDB();
  res.json(db);
});

// Route PUT pour modifier une image
app.put("/update-image/:id", (req, res) => {
  const { id } = req.params;
  let { name, description, imageUrl } = req.body;

  if (!name || !description || !imageUrl) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  const db = readDB();
  const index = db.findIndex((img) => img.id == id);

  if (index === -1) {
    return res.status(404).json({ error: "Image non trouvée" });
  }

  db[index] = {
    ...db[index],
    name: String(name),
    description: String(description),
    imageUrl: String(imageUrl),
  };

  writeDB(db);
  res.json({ message: "Image modifiée avec succès", data: db[index] });
});

// Route DELETE pour supprimer une image
app.delete("/delete-image/:id", (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const index = db.findIndex((img) => img.id == id);

  if (index === -1) {
    return res.status(404).json({ error: "Image non trouvée" });
  }

  const deleted = db.splice(index, 1);
  writeDB(db);

  res.json({ message: "Image supprimée avec succès", data: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://${ADDRESS}:${PORT}`);
});
