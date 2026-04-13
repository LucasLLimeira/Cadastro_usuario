import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div className={styles.hero}>
      <div className={styles.conteudo}>
        <h1 className={styles.titulo}>Descubra o Mundo</h1>
        <p className={styles.subtitulo}>
          Explore destinos incríveis, conheça culturas fascinantes e planeje a
          viagem dos seus sonhos com o nosso portal.
        </p>
        <Link href="/destinos" className={styles.botao}>
          Ver Destinos
        </Link>
      </div>
    </div>
  );
}

