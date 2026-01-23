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

        {/* Icône panier */}
        <Link href="/contact" className={styles.iconBox}>
          <div className={styles.notification}>
            <Image
              src="/shopping-bag.png"
              alt="icon"
              width={24}
              height={24}
              className={styles.icon}
            />
            <span className={styles.badge}>2</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
