"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./DetailsAnimal.module.css";

export default function DetailsAnimal({ animalId }) {
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!animalId) return;

    const fetchAnimal = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/animals/${animalId}`,
          { withCredentials: true }
        );

        setAnimal(res.data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les détails de l'animal");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [animalId]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!animal) return <p>Aucun animal trouvé</p>;

  return (
    <div className={styles.container}>
      {/* Section Animal */}
      <div className={styles.header}>
        <div className={styles.info}>
          <h1>{animal.name}</h1>
          <p><strong>Espèce :</strong> {animal.species}</p>
          <p><strong>Race :</strong> {animal.race}</p>
          <p><strong>Sexe :</strong> {animal.sex}</p>
          <p><strong>Couleur :</strong> {animal.color}</p>
          <p><strong>Stérilisé :</strong> {animal.sterilizes ? "Oui" : "Non"}</p>
          <p><strong>Numéro de puce :</strong> {animal.chip_number}</p>
          <p><strong>Poids :</strong> {animal.weight_kg} kg</p>
          <p>
            <strong>Date de naissance :</strong>{" "}
            {new Date(animal.date_of_birth).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
