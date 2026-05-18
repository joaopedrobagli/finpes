import { Resumo } from '@/types'

// Formata o valor para moeda brasileira
function formatarMoeda(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Card que exibe um valor do resumo (receitas, despesas ou saldo)
function Card({ titulo, valor, cor }: { titulo: string; valor: number; cor: string }) {
  return (
    <div className={`rounded-xl border p-6 ${cor}`}>
      <p className="text-sm text-muted-foreground">{titulo}</p>
      <p className="text-2xl font-bold mt-1">{formatarMoeda(valor)}</p>
    </div>
  )
}

// Componente principal que exibe os 3 cards do resumo
export function ResumoCards({ resumo }: { resumo: Resumo }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card titulo="Receitas" valor={resumo.totalReceitas} cor="bg-green-50 border-green-200" />
      <Card titulo="Despesas" valor={resumo.totalDespesas} cor="bg-red-50 border-red-200" />
      <Card titulo="Saldo" valor={resumo.saldo} cor="bg-blue-50 border-blue-200" />
    </div>
  )
}