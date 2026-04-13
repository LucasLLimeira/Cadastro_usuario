import destinos from "@/data/destinos";
import CardDestino from "@/components/CardDestino/CardDestino";
import styles from "./page.module.css";

export default function DestinosPage() {
  return (
    <div className={styles.pagina}>
      <div className={styles.cabecalho}>
        <h1 className={styles.titulo}>Destinos Turísticos</h1>
        <p className={styles.subtitulo}>
          Escolha o seu próximo destino e comece a planejar a viagem dos seus sonhos.
        </p>
      </div>
      <div className={styles.grid}>
        {destinos.map((destino) => (
          <CardDestino
            key={destino.id}
            id={destino.id}
            nome={destino.nome}
            imagem={destino.imagem}
            pais={destino.pais}
          />
        ))}
      </div>
    </div>
  );
}
