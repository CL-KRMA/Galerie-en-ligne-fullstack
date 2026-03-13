import React, { useEffect, useState } from "react";
import ImageDetail from "./ImageDetail";

function ImageList() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:2000/images")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Erreur :", err));
  }, []);

  const handleUpdate = async (id, editData) => {
    const response = await fetch(`http://localhost:2000/update-image/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    if (response.ok) {
      const updated = await response.json();
      setImages((prev) =>
        prev.map((img) => (img.id === id ? updated.data : img))
      );
      setSelectedImage(null);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:2000/delete-image/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setImages((prev) => prev.filter((img) => img.id !== id));
      setSelectedImage(null);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Liste des images</h2>

      {!selectedImage ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {images.map((img) => (
            <div
              key={img.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => setSelectedImage(img)}
            >
              <h3>{img.name}</h3>
              <img
                src={img.imageUrl}
                alt={img.name}
                style={{ width: "100%", borderRadius: "6px" }}
              />
            </div>
          ))}
        </div>
      ) : (
        <ImageDetail
          image={selectedImage}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onCancel={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}

export default ImageList;
