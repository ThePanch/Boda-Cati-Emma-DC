import React, { useEffect, useState } from "react";

export const Album = () => {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    fetch("/api/getFotos")
      .then((res) => res.json())
      .then((data) => setFotos(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      {" "}
      <h1>Fotos de la Boda</h1>
      <section className="gallery">
        {fotos.length > 0 ? (
          fotos.map((foto: any) => (
            <img
              key={foto.public_id}
              src={foto.url}
              alt={`Foto ${foto.public_id}`}
            />
          ))
        ) : (
          <p>No hay fotos disponibles.</p>
        )}
      </section>
    </div>
  );
};
