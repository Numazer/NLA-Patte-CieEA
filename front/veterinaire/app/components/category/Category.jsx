"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Category.module.css";

const categoriesButtons = ["Visits", "Treatments"];

export default function Category({ animalId }) {
  const [activeCategory, setActiveCategory] = useState("Visits");
  const [animal, setAnimal] = useState(null); // contient l'animal complet
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch de l'animal complet avec toutes ses visites et traitements
  useEffect(() => {
    if (!animalId) return;

    const fetchAnimal = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/animals/${animalId}`,
          { withCredentials: true }
        );

        setAnimal(res.data);
      } catch (err) {
        console.error(err);
        setError("Impossible de récupérer les données");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [animalId]);

  // 🔹 Mettre à jour les données affichées selon la catégorie
  useEffect(() => {
    if (!animal) {
      setData([]);
      return;
    }

    if (activeCategory === "Visits") {
      setData(animal.visits ?? []);
    } else {
      // Récupérer tous les traitements de toutes les visites
      const treatments = (animal.visits ?? []).flatMap((v) => v.treatments ?? []);

      // Supprimer les doublons par treatment_id
      const uniqueTreatments = Array.from(
        new Map(treatments.map((t) => [t.treatment_id, t])).values()
      );

      setData(uniqueTreatments);
    }
  }, [activeCategory, animal]);

 return (
  <div className={styles.container}>
    {/* Boutons de catégorie */}
    <div className={styles.buttonContainer}>
      {categoriesButtons.map((cat) => (
        <button
          key={cat}
          className={`${styles.categoryButton} ${
            activeCategory === cat ? styles.active : ""
          }`}
          onClick={() => setActiveCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>

    {/* Contenu */}
    <div className={styles.cardsContainer}>
      {loading && <p>Chargement...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && data.length === 0 && <p>Aucune donnée disponible</p>}

      {!loading &&
        data.map((item, idx) => (
          <div
            key={
              activeCategory === "Visits"
                ? `visit-${item.visit_id}-${idx}`
                : `treatment-${item.treatment_id}-${idx}`
            }
            className={styles.card}
          >
            {activeCategory === "Visits" ? (
              <>
                <p>
                  <strong>Date :</strong>{" "}
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Motif :</strong> {item.reason}
                </p>
                <p>
                  <strong>Commentaires :</strong> {item.comments || "RAS"}
                </p>
                <p>
                  <strong>Diagnostic :</strong> {item.diagnosis || "RAS"}
                </p>

                {/* Vaccines */}
                {item.vaccines && item.vaccines.length > 0 && (
                  <>
                    <h4>Vaccins :</h4>
                    <ul>
                      {item.vaccines.map((v, vIdx) => (
                        <li key={`vaccine-${v.vaccine_id}-${vIdx}`}>
                          {v.name} ({new Date(v.date).toLocaleDateString()}) –{" "}
                          {v.notes || "RAS"}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            ) : (
              <>
                <h3>{item.name}</h3>
                <p>
                  <strong>Début :</strong>{" "}
                  {new Date(item.date_start).toLocaleDateString()}
                </p>
                <p>
                  <strong>Fin :</strong>{" "}
                  {new Date(item.date_end).toLocaleDateString()}
                </p>
                <p>
                  <strong>Raison :</strong> {item.reason}
                </p>
                <p>{item.comments}</p>
              </>
            )}
          </div>
        ))}
    </div>
  </div>
);
}
