"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { useAuth } from "@/app/context/authContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      {/* Texte */}
      <h1 className={styles.title}>Hello, {user ? user.first_name : "human"}</h1>

      {/* Icône redirige vers /contact */}
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
    </header>
  );
}
