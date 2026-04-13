import Link from "next/link";
import Image from "next/image";
import type { Destino } from "@/data/destinos";
import styles from "./CardDestino.module.css";

type CardDestinoProps = Pick<Destino, "id" | "nome" | "imagem" | "pais">;

export default function CardDestino({ id, nome, imagem, pais }: CardDestinoProps) {
  return (
    <Link href={`/destinos/${id}`} className={styles.card}>
      <div className={styles.imagemWrapper}>
        <Image
          src={imagem}
          alt={`Foto de ${nome}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className={styles.imagem}
        />
      </div>
      <div className={styles.info}>
        <h2 className={styles.nome}>{nome}</h2>
        <p className={styles.pais}>{pais}</p>
      </div>
    </Link>
  );
}
