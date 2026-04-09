import React, { useState } from 'react'
import styled from 'styled-components'

// ─────────────────────────────────────────────
// Estilos com Styled Components
// Cada bloco abaixo representa um "componente
// estilizado" — o CSS vive dentro do JS.
// ─────────────────────────────────────────────

/**
 * Contêiner externo do card.
 * Define sombra, borda arredondada e largura máxima.
 */
const CardWrapper = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.10);
  padding: 24px;
  width: 100%;
  min-height: 360px;
  max-width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  /* Micro-interação: eleva o card ao passar o mouse */
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
  }
`

/**
 * Área de imagem / placeholder do produto.
 */
const ImagemProduto = styled.div`
  background: #f0f4f8;
  border-radius: 8px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px; /* emoji como placeholder */
`

/**
 * Nome do produto — destaque tipográfico.
 */
const NomeProduto = styled.h2`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
`

/**
 * Exibe o preço formatado.
 */
const PrecoProduto = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  color: #e63946;
  margin: 0 0 auto;
`

/**
 * Botão "Adicionar ao carrinho".
 *
 * Estilização DINÂMICA com base na prop `adicionado`:
 *   - true  → verde  (#198754) — produto já no carrinho
 *   - false → cinza  (#6c757d) — produto ainda não adicionado
 *
 * A prop é acessada via função de interpolação do template literal.
 */
const BotaoCarrinho = styled.button`
  /* Cor de fundo muda de acordo com a prop adicionado */
  background-color: ${({ adicionado }) => (adicionado ? '#198754' : '#6c757d')};

  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px;
  min-height: 48px;
  width: 100%;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: background-color 0.25s ease, opacity 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  white-space: nowrap;

  &:hover {
    /* Escurece levemente ao passar o mouse */
    opacity: 0.88;
  }

`

// ─────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────

/**
 * CardProduto
 *
 * Props:
 *  @param {string}  nome      — Nome do produto
 *  @param {number}  preco     — Preço em reais
 *  @param {string}  emoji     — Emoji representando o produto (placeholder visual)
 */
function CardProduto({ nome, preco, emoji }) {
  // Estado local: controla se o produto foi adicionado ao carrinho
  const [adicionado, setAdicionado] = useState(false)

  function handleClick() {
    setAdicionado((prev) => !prev)
  }

  return (
    <CardWrapper>
      {/* Imagem / placeholder do produto */}
      <ImagemProduto>{emoji}</ImagemProduto>

      {/* Informações do produto */}
      <NomeProduto>{nome}</NomeProduto>
      <PrecoProduto>
        {preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </PrecoProduto>

      {/*
        Prop `adicionado` passada ao botão estilizado.
        O Styled Component a usa para alternar a cor de fundo.
      */}
      <BotaoCarrinho adicionado={adicionado} onClick={handleClick}>
        {adicionado ? '✓ Adicionado' : '+ Adicionar ao carrinho'}
      </BotaoCarrinho>
    </CardWrapper>
  )
}

export default CardProduto
