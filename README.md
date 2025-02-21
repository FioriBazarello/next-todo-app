# Next.js Todo App com Firebase

Uma aplicação de lista de tarefas construída com Next.js e Firebase, incluindo autenticação de usuários e armazenamento em tempo real.

## Funcionalidades

- ✅ Autenticação de usuários (Email/Senha e Google)
- 📝 Criar, ler, atualizar e deletar tarefas
- 🔄 Sincronização em tempo real com Firestore
- 🎨 Interface moderna com Tailwind CSS
- 📱 Design responsivo
- 🔒 Proteção de rotas para usuários autenticados

## Tecnologias Utilizadas

- [Next.js 15](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
  - Authentication
  - Firestore Database
  - Hosting
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/next-todo-app.git
cd next-todo-app
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto com suas credenciais do Firebase:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=seu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=seu_measurement_id
```

4. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

5. Acesse `http://localhost:3000`

## Deploy

O projeto está configurado para deploy automático no Firebase Hosting:

```bash
npm run deploy
```

## Estrutura do Projeto

```
src/
  ├── app/
  │   ├── components/
  │   │   ├── Auth.tsx
  │   │   ├── Header.tsx
  │   │   ├── Todo.tsx
  │   │   └── TodoList.tsx
  │   ├── firebase/
  │   │   └── config.ts
  │   └── page.tsx
  └── ...
```

## Licença

MIT
