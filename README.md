# FinPes

Controle financeiro pessoal desenvolvido com Next.js, Supabase e Tailwind CSS.

## Funcionalidades

- Cadastro de receitas e despesas
- Categorização de transações
- Dashboard com resumo financeiro
- Gráfico de receitas vs despesas por mês
- Exclusão de transações

## Tecnologias

- **Next.js 16** — framework React com App Router
- **TypeScript** — tipagem estática
- **Tailwind CSS** — estilização
- **Supabase** — banco de dados PostgreSQL
- **Recharts** — gráficos
- **shadcn/ui** — componentes de UI

## Como rodar localmente

1. Clone o repositório e acesse a pasta
2. Rode `npm install` para instalar as dependências
3. Crie o arquivo `.env.local` com as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Rode `npm run dev` e acesse http://localhost:3000

## Estrutura do projeto

- `src/app/api` — rotas do backend
- `src/app/dashboard` — página principal
- `src/components` — componentes React
- `src/lib` — configurações do Supabase
- `src/types` — tipos TypeScript

## Licença

MIT