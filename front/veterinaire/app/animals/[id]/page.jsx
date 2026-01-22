"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import DetailsAnimal from "../../components/detailsAnimal/DetailsAnimal";
import Category from "../../components/category/Category";

export default function AnimalPage() {
  const params = useParams();
  const [id, setId] = useState(null);

  useEffect(() => {
    if (params?.id) {
      setId(params.id);
      console.log("AnimalPage -> id :", params.id); // 🔹 log côté client
    }
  }, [params]);

  if (!id) return <p>Chargement de l'animal...</p>;

  return (
    <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
      <DetailsAnimal animalId={id} />
      <Category animalId={id} />
    </div>
  );
}
