import Link from 'next/link';
import animalsData from '../data/animals.json';
import Image from 'next/image';
import styles from './AnimalCard.module.css';


export default function AnimalCard({ animal }) {
  return (
    <Link href={`/detailsAnimal/${animal.id}`}>
      <div className={styles['animal-card']}>
        <img src={animal.image} alt={animal.nom} />
        <div className={styles['animal-info']}>
          <h2>{animal.nom}</h2>
          <p>Espèce : <strong>{animal.espece}</strong></p>
          <p>Race : <strong>{animal.race}</strong></p>
        </div>
      </div>
    </Link>
  );
}
