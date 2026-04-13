import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import destinos from "@/data/destinos";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return destinos.map((d) => ({ id: d.id }));
}

export default async function DetalheDestinoPage({ params }: PageProps) {
  const { id } = await params;
  const destino = destinos.find((d) => d.id === id);

  if (!destino) {
    notFound();
  }

  return (
    <div className={styles.pagina}>
      <Link href="/destinos" className={styles.voltar}>
        ← Voltar para Destinos
      </Link>

      <div className={styles.card}>
        <div className={styles.imagemWrapper}>
          <Image
            src={destino.imagem}
            alt={`Foto de ${destino.nome}`}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className={styles.imagem}
            priority
          />
        </div>

        <div className={styles.conteudo}>
          <div className={styles.cabecalho}>
            <h1 className={styles.nome}>{destino.nome}</h1>
            <div className={styles.tags}>
              <span className={styles.tag}>{destino.pais}</span>
              <span className={styles.tag}>{destino.continente}</span>
            </div>
          </div>
          <p className={styles.descricao}>{destino.descricao}</p>
        </div>
      </div>
    </div>
  );
}
