import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import CardProduto from './components/CardProduto'

// ─────────────────────────────────────────────
// Estilo global da aplicação
// createGlobalStyle injeta CSS no <head> sem
// criar um elemento no DOM.
// ─────────────────────────────────────────────
const EstiloGlobal = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background: #f5f7fa;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`

/**
 * Layout da página: cabeçalho + grade de cards.
 */
const Pagina = styled.main`
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(24px, 5vw, 48px) clamp(16px, 3vw, 24px);
`

const Cabecalho = styled.header`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 2rem;
    color: #1a1a2e;
    margin: 0 0 8px;
  }

  p {
    color: #6c757d;
    font-size: 1rem;
    margin: 0;
  }
`

/**
 * Grade responsiva de cards.
 * Ajusta automaticamente o número de colunas
 * dependendo do espaço disponível.
 */
const GradeCards = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  align-items: stretch;
`

// ─────────────────────────────────────────────
// Dados estáticos dos produtos
// ─────────────────────────────────────────────
const produtos = [
  { id: 1, nome: 'Fone de Ouvido Bluetooth', preco: 249.9,  emoji: '🎧' },
  { id: 2, nome: 'Teclado Mecânico RGB',     preco: 379.0,  emoji: '⌨️' },
  { id: 3, nome: 'Mouse Gamer 12000 DPI',    preco: 189.99, emoji: '🖱️' },
  { id: 4, nome: 'Webcam Full HD 1080p',     preco: 299.0,  emoji: '📷' },
]

// ─────────────────────────────────────────────
// Componente raiz
// ─────────────────────────────────────────────
function App() {
  return (
    <>
      {/* Injeta o reset/global CSS */}
      <EstiloGlobal />

      <Pagina>
        <Cabecalho>
          <h1>🛒 Loja de Eletrônicos</h1>
          <p>Clique em um card para adicionar ao carrinho</p>
        </Cabecalho>

        <GradeCards>
          {produtos.map((produto) => (
            <CardProduto
              key={produto.id}
              nome={produto.nome}
              preco={produto.preco}
              emoji={produto.emoji}
            />
          ))}
        </GradeCards>
      </Pagina>
    </>
  )
}

export default App
