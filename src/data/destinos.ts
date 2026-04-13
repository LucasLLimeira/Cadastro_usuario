export interface Destino {
  id: string;
  nome: string;
  imagem: string;
  descricao: string;
  pais: string;
  continente: string;
}

const destinos: Destino[] = [
  {
    id: "paris",
    nome: "Paris",
    imagem: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop",
    descricao:
      "A Cidade Luz encanta visitantes com a icônica Torre Eiffel, museus de renome mundial como o Louvre, culinária refinada e uma atmosfera romântica incomparável às margens do Rio Sena.",
    pais: "França",
    continente: "Europa",
  },
  {
    id: "tokyo",
    nome: "Tóquio",
    imagem: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
    descricao:
      "Uma metrópole que funde tradição e modernidade. Tóquio oferece templos milenares ao lado de arranha-céus futuristas, gastronomia excepcional e uma cultura pop única que conquistou o mundo.",
    pais: "Japão",
    continente: "Ásia",
  },
  {
    id: "rio-de-janeiro",
    nome: "Rio de Janeiro",
    imagem:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&h=400&fit=crop",
    descricao:
      "A Cidade Maravilhosa reúne o Cristo Redentor, o Pão de Açúcar, praias paradisíacas como Copacabana e Ipanema, e a vibrante energia do Carnaval — tudo em uma paisagem natural deslumbrante.",
    pais: "Brasil",
    continente: "América do Sul",
  },
  {
    id: "marrakech",
    nome: "Marrakech",
    imagem:
      "https://images.unsplash.com/photo-1702211374779-792e3df71b59?w=600&h=400&fit=crop",
    descricao:
      "Uma explosão de cores, aromas e sons na Medina histórica. Marrakech seduz com seus souks labirínticos, jardins exuberantes, riads decorados e a efervescente Praça Jemaa el-Fna.",
    pais: "Marrocos",
    continente: "África",
  },
  {
    id: "nova-york",
    nome: "Nova York",
    imagem:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop",
    descricao:
      "A cidade que nunca dorme impressiona com a Times Square iluminada, o Central Park, o icônico skyline de Manhattan, museus de classe mundial e uma diversidade cultural sem igual.",
    pais: "Estados Unidos",
    continente: "América do Norte",
  },
  {
    id: "santorini",
    nome: "Santorini",
    imagem:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop",
    descricao:
      "Encrustada sobre penhascos com vista para o Mar Egeu, Santorini encanta com suas casas brancas de cúpulas azuis, pores do sol espetaculares e vinhos locais produzidos em solo vulcânico.",
    pais: "Grécia",
    continente: "Europa",
  },
];

export default destinos;
