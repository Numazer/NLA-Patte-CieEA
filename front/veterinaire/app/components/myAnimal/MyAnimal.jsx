"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function MyAnimal() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyAnimals = async () => {
        try {
            const response = await axios.get(
            "http://localhost:4000/api/animals/my",
            {
                withCredentials: true, // 🔑 envoie les cookies httpOnly
            }
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
    <div>
      <h2>Mes animaux</h2>

      {animals.length === 0 ? (
        <p>Aucun animal enregistré</p>
      ) : (
        <ul>
          {animals.map((animal) => (
            <li key={animal.animal_id}>
              <strong>{animal.name}</strong> – {animal.species}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
