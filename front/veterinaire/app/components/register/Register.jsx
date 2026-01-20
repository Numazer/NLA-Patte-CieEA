"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("OWNER");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const data = {
        name,
        first_name: firstName,
        email,
        password,
        role,
        phone,
        address,
      };

      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        data
      );

      alert(response.data.message || "Utilisateur créé avec succès !");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Erreur lors de l'inscription"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="register-page"
      style={{ maxWidth: 400, margin: "auto", padding: 20 }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        Créer un compte
      </h1>

      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <form
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="OWNER">propriétaire</option>
            <option value="VETERINARIAN">veterinaire</option>
          </select>

          <input
            type="text"
            placeholder="Téléphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="Adresse"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            S'inscrire
          </button>
        </form>
      )}
    </div>
  );
}
