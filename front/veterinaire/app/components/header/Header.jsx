"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();      // 🔐 clear cookie + setUser(null)
    router.push("/login"); // 🚀 redirect
  };


  return (
    <header className={styles.header}>
      {/* Texte */}
      <h1 className={styles.title}>
        Hello, {user ? user.first_name : "human"}
      </h1>

      <div className={styles.right}>
        {/* Auth buttons */}
        {!user ? (
          <div className={styles.authButtons}>
            <Link href="/login" className={styles.btn}>
              Login
            </Link>
            <Link href="/register" className={styles.btnOutline}>
              Register
            </Link>
          </div>
        ) : (
          <button onClick={handleLogout} className={styles.btnDanger}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
