import { redirect } from 'next/navigation'

// Redireciona a página inicial para o dashboard
export default function Home() {
  redirect('/dashboard')
}