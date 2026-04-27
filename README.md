# 📝 Sistema de Cadastro de Usuários

Um aplicativo moderno de **autenticação e cadastro de usuários** desenvolvido com **Next.js 16**, **React 19**, **TypeScript** e **TailwindCSS**. O projeto oferece uma experiência completa com validação robusta, suporte a múltiplos idiomas (PT-BR e EN-US), tema escuro/claro e integração com a API ViaCEP para busca de endereços.

---

## ✨ Principais Funcionalidades

- ✅ **Autenticação de Usuários** - Login e logout com gerenciamento de sessão
- ✅ **Cadastro Completo** - Coleta dados pessoais, endereço e de contato com validação
- ✅ **Validação Robusta** - CPF, email, senha forte (mín. 8 caracteres) com Zod + React Hook Form
- ✅ **Mascaras de Entrada** - Formatação automática de CPF, telefone e CEP
- ✅ **Integração ViaCEP** - Busca automática de endereço ao inserir CEP
- ✅ **Página Protegida** - Dashboard exclusivo para usuários autenticados
- ✅ **Função "Lembrar-me"** - Salva email para facilitar próximos logins
- ✅ **Tema Dark/Light** - Alternância de temas com persistência
- ✅ **Internacionalização (i18n)** - Suporte a Português Brasileiro e Inglês
- ✅ **Responsivo** - Interface adaptável para mobile, tablet e desktop
- ✅ **Design Moderno** - UI/UX com ícones Lucide React e Tailwind CSS

---

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia | Versão |
|-----------|-----------|---------|
| **Framework** | [Next.js](https://nextjs.org) | 16.2.4 |
| **Biblioteca UI** | [React](https://react.dev) | 19.2.4 |
| **Linguagem** | [TypeScript](https://www.typescriptlang.org) | 5.x |
| **Estilização** | [TailwindCSS](https://tailwindcss.com) | 4.x |
| **Formulários** | [React Hook Form](https://react-hook-form.com) | 7.73.1 |
| **Validação** | [Zod](https://zod.dev) | 4.3.6 |
| **Segurança** | [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | 3.0.3 |
| **i18n** | [i18next](https://www.i18next.com) | 26.0.6 |
| **Ícones** | [Lucide React](https://lucide.dev) | 1.8.0 |
| **Temas** | [next-themes](https://github.com/pacocoursey/next-themes) | 0.4.6 |

---

## 📦 Requisitos

- **Node.js** 18.17+ ou superior
- **npm** 9+, **yarn** 1.22+, **pnpm** 8+ ou **bun** 1.0+

---

## 🚀 Como Começar

### 1. Clonar o repositório

```bash
git clone https://github.com/LucasLLimeira/Cadastro_usuario.git
cd Cadastro_usuario
```

### 2. Instalar dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### 3. Executar o servidor de desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em [http://localhost:3000](http://localhost:3000)

### 4. Compilar para produção

```bash
npm run build
npm start
```

---

## 📁 Estrutura de Pastas

```
src/
├── app/
│   ├── auth/                    # Página de login e registro
│   ├── dashboard/               # Página protegida (requer autenticação)
│   ├── layout.tsx               # Layout raiz com Providers
│   ├── page.tsx                 # Página inicial (redireciona para /auth)
│   └── globals.css              # Estilos globais
│
├── components/
│   ├── AuthContainer.tsx        # Container responsivo para auth
│   ├── Input.tsx                # Componente input reutilizável
│   ├── LoginForm.tsx            # Formulário de login
│   ├── RegistrationForm.tsx     # Formulário de cadastro completo
│   ├── LanguageSwitcher.tsx     # Seletor de idioma
│   ├── ThemeSwitcher.tsx        # Alternador de tema dark/light
│   ├── WelcomeModal.tsx         # Modal de boas-vindas
│   └── Providers.tsx            # Configuração de providers (i18n, theme)
│
├── config/
│   └── i18n.ts                  # Configuração do i18next
│
├── context/
│   └── AuthContext.tsx          # Context API para autenticação
│
├── lib/
│   ├── auth.ts                  # Hash e comparação de senhas (bcrypt)
│   ├── masks.ts                 # Máscaras de formatação (CPF, telefone, CEP)
│   ├── storage.ts               # Gerenciamento do localStorage
│   ├── validation.ts            # Schemas Zod e validações (CPF, email, etc)
│   └── viaCep.ts                # Integração com API ViaCEP
│
├── locales/
│   ├── pt-BR/
│   │   ├── auth.json            # Textos em português (autenticação)
│   │   └── common.json          # Textos em português (comuns)
│   └── en-US/
│       ├── auth.json            # Texts in English (authentication)
│       └── common.json          # Texts in English (common)
│
└── types/
    └── user.ts                  # Tipos TypeScript (User, Session, etc)
```

---

## 🔐 Fluxo de Autenticação

### 1️⃣ Registro (Cadastro)
- Usuário acessa `/auth` e seleciona "Criar Conta"
- Preenche: nome completo, email, senha, telefone, CPF, data de nascimento, CEP
- Sistema busca endereço automaticamente via ViaCEP
- Validação de CPF e email
- Senha é hash com bcryptjs antes de ser salva
- Dados são persistidos no localStorage
- Redirecionamento automático para `/dashboard`

### 2️⃣ Login
- Usuário acessa `/auth` com email e senha
- Sistema busca usuário no localStorage
- Compara senha fornecida com hash armazenado
- Opção de "Lembrar-me" para salvar email
- Sessão criada no localStorage
- Redirecionamento para `/dashboard`

### 3️⃣ Dashboard Protegido
- Página `/dashboard` visível apenas para usuários autenticados
- Exibe informações do usuário logado
- Botão para fazer logout
- Logout remove sessão do localStorage e redireciona para `/auth`

---

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build e Produção
npm run build        # Compila a aplicação
npm start            # Inicia servidor de produção

# Linting
npm run lint         # Verifica código com ESLint
```

---

## 🌐 Internacionalização (i18n)

O projeto suporta dois idiomas:

- **🇧🇷 Português Brasileiro (pt-BR)** - Idioma padrão
- **🇺🇸 English (en-US)**

Os textos estão organizados em arquivos JSON na pasta `src/locales/`. Um seletor de idioma está disponível na interface para alternar entre os idiomas em tempo real.

---

## 🎨 Temas

O projeto suporta dois temas:

- **☀️ Tema Claro** - Interface clara com cores neutras
- **🌙 Tema Escuro** - Interface escura para conforto visual

O tema é persistido no localStorage e pode ser alterado através do alternador na interface.

---

## 📝 Dados de Exemplo

Para testar o sistema, você pode criar um usuário com os seguintes dados:

| Campo | Exemplo |
|-------|---------|
| Nome Completo | João da Silva |
| Email | joao@example.com |
| Senha | SenhaSegura123! |
| Telefone | (11) 98765-4321 |
| CPF | 123.456.789-00 |
| Data de Nascimento | 01/01/1990 |
| CEP | 01310-100 |

---

## 💾 Armazenamento de Dados

Atualmente, o projeto utiliza **localStorage** do navegador para armazenar:

- **Usuários cadastrados** - Senhas são hash com bcryptjs
- **Sessão ativa** - Identificação do usuário logado
- **Preferências do usuário** - Idioma e tema escolhido
- **Email memorizado** - Se a opção "Lembrar-me" foi marcada

⚠️ **Nota:** Esta é uma solução de prototipagem. Para produção, migre para um banco de dados real (PostgreSQL, MongoDB, etc) com API backend segura.

---

## 🔒 Segurança

- ✅ Senhas são hash com bcryptjs (não são armazenadas em texto plano)
- ✅ Validação de entrada com Zod no frontend
- ✅ Validações de CPF e email
- ✅ Proteção de rotas (dashboard requer autenticação)
- ⚠️ Para produção, implemente autenticação backend com JWT e HTTPS

---

## 🚧 Próximas Melhorias

- [ ] Integração com banco de dados (PostgreSQL, MongoDB)
- [ ] Autenticação backend com JWT
- [ ] OAuth (Google, GitHub, etc)
- [ ] Recuperação de senha por email
- [ ] Confirmação de email
- [ ] Dashboard com dados do usuário editáveis
- [ ] Testes unitários e E2E
- [ ] Deploy em produção (Vercel, AWS, etc)

---

## 📚 Documentação Adicional

- [Next.js Documentation](https://nextjs.org/docs) - Documentação oficial do Next.js
- [React Documentation](https://react.dev) - Documentação oficial do React
- [TailwindCSS](https://tailwindcss.com/docs) - Guia de classes Tailwind
- [Zod](https://zod.dev) - Validação de schemas
- [i18next](https://www.i18next.com/overview/getting-started) - Internacionalização

---

## 📄 Licença

Este projeto está disponível sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

## 👨‍💻 Autor

**Lucas Lima** - [@LucasLLimeira](https://github.com/LucasLLimeira)

---

## 🤝 Contribuições

Contribuições são bem-vindas! Se você encontrou um bug ou tem uma sugestão de melhoria, abra uma issue ou um pull request.
