import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.texto}>
          © {new Date().getFullYear()} Portal de Viagens — Explore o mundo com a gente.
        </p>
      </div>
    </footer>
  );
}
