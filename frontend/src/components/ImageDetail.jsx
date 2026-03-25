import React, { useState } from "react";

function ImageDetail({ image, onUpdate, onDelete, onCancel }) {
  const [editData, setEditData] = useState({
    name: image.name,
    description: image.description,
    imageUrl: image.imageUrl,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #444" }}>
      <h2>{image.name}</h2>
      <img
        src={image.imageUrl}
        alt={image.name}
        style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
      />
      <input
        type="text"
        name="name"
        value={editData.name}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <textarea
        name="description"
        value={editData.description}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <input
        type="url"
        name="imageUrl"
        value={editData.imageUrl}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => onUpdate(image.id, editData)}>Modifier</button>
        <button onClick={() => onDelete(image.id)}>Supprimer</button>
        <button onClick={onCancel}>Annuler</button>
      </div>
    </div>
  );
}

export default ImageDetail;
