import styles from "./page.module.css";
import CarteRappel from "./components/home/carte-rappel/CarteRappel";
import SearchBar from "./components/search/SearchBar";
import Veterinarian from "./components/veterinarian/veterinarian";
import MyAnimal from "./components/myAnimal/MyAnimal";

export default function Home() {
  return (
       <main>
        <CarteRappel />
        <SearchBar />
        <MyAnimal />
        <Veterinarian />
       </main>
  );
}
