"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyAnimal.module.css"; // fichier CSS séparé

export default function MyAnimal() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyAnimals = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/animals/my`,
          { withCredentials: true }
        );
        setAnimals(response.data);
      } catch (err) {
        setError("Impossible de charger les animaux");
      } finally {
        setLoading(false);
      }
    };

    fetchMyAnimals();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
  <div className={styles.container}>
    <h2 className={styles.title}>Mes animaux</h2>

    {animals.length === 0 ? (
      <p className={styles.animalInfo}>Aucun animal enregistré</p>
    ) : (
      <div className={styles.grid}>
        {animals.map((animal) => (
          <Link
            key={animal.animal_id}
            href={`/animals/${animal.animal_id}`}
            className={styles.cardLink}
          >
            <div className={styles.card}>
              <img
                src={animal.photo || "/default-animal.jpg"}
                alt={animal.name}
                className={styles.photo}
              />

              <h3 className={styles.animalName}>{animal.name}</h3>

              <p className={styles.animalInfo}>
                <strong>Espèce :</strong> {animal.species}
              </p>

              <p className={styles.animalInfo}>
                <strong>Race :</strong> {animal.race}
              </p>

              <p className={styles.animalInfo}>
                <strong>Âge :</strong>{" "}
                {new Date().getFullYear() -
                  new Date(animal.date_of_birth).getFullYear()}{" "}
                ans
              </p>

              <p className={styles.animalInfo}>
                <strong>Poids :</strong> {animal.weight_kg} kg
              </p>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
);
}
