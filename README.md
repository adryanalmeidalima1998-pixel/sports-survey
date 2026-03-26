# Pesquisa de Softwares de Análise Esportiva

Formulário moderno e direto para coletar percepções de analistas sobre softwares de análise esportiva.

## 🚀 Deploy no Vercel (Passo a Passo)

### 1. Preparar o Repositório GitHub

```bash
# Inicializar git (se não estiver)
git init
git add .
git commit -m "Initial commit"

# Criar repositório no GitHub e fazer push
git remote add origin https://github.com/SEU_USUARIO/sports-survey.git
git branch -M main
git push -u origin main
```

### 2. Conectar ao Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione "Import Git Repository"
4. Conecte sua conta GitHub
5. Selecione o repositório `sports-survey`
6. Clique em "Import"

### 3. Configurar Variáveis de Ambiente

Na página de configuração do Vercel:

1. Vá para "Environment Variables"
2. Adicione:
   - `POSTGRES_URLSTATE`: Sua conexão do Vercel Postgres
   - `NEXT_PUBLIC_ADMIN_PASSWORD`: Sua senha de admin (ex: `senha123`)

### 4. Criar Banco de Dados (Vercel Postgres)

1. No dashboard do Vercel, clique em "Storage"
2. Clique em "Create New" → "Postgres"
3. Selecione a região
4. Copie a `POSTGRES_URLSTATE` e adicione nas variáveis de ambiente

### 5. Deploy

Clique em "Deploy" e aguarde (leva ~2-3 minutos)

## 📝 Como Usar

### Formulário (Público)
- **URL**: `https://seu-projeto.vercel.app`
- Qualquer pessoa pode acessar e responder

### Painel Admin (Protegido)
- **URL**: `https://seu-projeto.vercel.app/admin`
- **Senha**: A que você configurou nas variáveis de ambiente
- Visualize todas as respostas
- Exporte em CSV

## 📤 Mensagens Prontas para Compartilhar

### Para WhatsApp/Telegram (Grupos)

```
🎯 PESQUISA: Softwares de Análise Esportiva

Olá! Estamos realizando uma pesquisa para entender melhor as necessidades dos profissionais de análise esportiva.

Sua opinião é valiosa! ⚽📊

Responda em apenas 5 minutos:
👉 [LINK DO FORMULÁRIO]

Compartilhe com seus colegas! 🙌
```

### Para Instagram (Bio/Stories)

```
📊 Pesquisa Rápida!

Qual software de análise esportiva você usa?
Quais as maiores dificuldades?
O que falta no mercado?

Responda aqui: [LINK]

Leva só 5 minutos! ⚽
```

### Para Email

```
Assunto: Pesquisa sobre Softwares de Análise Esportiva

Olá [Nome],

Estamos desenvolvendo uma pesquisa para mapear as percepções de profissionais sobre softwares de análise esportiva.

Sua experiência é importante! Dedique 5 minutos para responder:

👉 [LINK DO FORMULÁRIO]

Os dados coletados ajudarão a entender tendências e necessidades do mercado.

Obrigado! 🙏
```

## 🔐 Segurança

- A senha do admin é configurada em variáveis de ambiente
- Dados armazenados no Vercel Postgres (criptografado)
- HTTPS automático em todos os domínios Vercel

## 📊 Estrutura do Projeto

```
.
├── app/
│   ├── page.tsx           # Formulário principal
│   ├── admin/page.tsx     # Painel administrativo
│   ├── api/
│   │   ├── submit/        # Salvar respostas
│   │   └── responses/     # Buscar respostas
│   └── layout.tsx
├── lib/
│   └── db.ts              # Conexão com Vercel Postgres
└── public/
```

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Configurar .env.local
cp .env.example .env.local
# Editar .env.local com suas variáveis

# Rodar localmente
npm run dev

# Acessar
# http://localhost:3000 (formulário)
# http://localhost:3000/admin (admin)
```

## 📝 Notas

- O banco de dados é criado automaticamente na primeira requisição
- Respostas são armazenadas em JSON para flexibilidade
- Exportação em CSV está pronta para análise em Excel

---

Dúvidas? Consulte a documentação do [Next.js](https://nextjs.org) e [Vercel](https://vercel.com/docs)
