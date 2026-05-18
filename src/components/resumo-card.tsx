import { Resumo } from '@/types'

function formatarMoeda(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function Card({ titulo, valor, variante }: { titulo: string; valor: number; variante: 'receita' | 'despesa' | 'saldo' }) {
  const estilos = {
    receita: {
      container: 'bg-white border border-slate-200',
      titulo: 'text-slate-500',
      valor: 'text-emerald-600',
      indicador: 'bg-emerald-500',
    },
    despesa: {
      container: 'bg-white border border-slate-200',
      titulo: 'text-slate-500',
      valor: 'text-rose-600',
      indicador: 'bg-rose-500',
    },
    saldo: {
      container: 'bg-slate-900 border border-slate-900',
      titulo: 'text-slate-400',
      valor: 'text-white',
      indicador: 'bg-blue-500',
    },
  }

  const s = estilos[variante]

  return (
    <div className={`rounded-2xl p-6 shadow-sm ${s.container}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${s.indicador}`} />
        <p className={`text-xs font-semibold uppercase tracking-widest ${s.titulo}`}>{titulo}</p>
      </div>
      <p className={`text-3xl font-bold tracking-tight ${s.valor}`}>{formatarMoeda(valor)}</p>
    </div>
  )
}

export function ResumoCards({ resumo }: { resumo: Resumo }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card titulo="Receitas" valor={resumo.totalReceitas} variante="receita" />
      <Card titulo="Despesas" valor={resumo.totalDespesas} variante="despesa" />
      <Card titulo="Saldo" valor={resumo.saldo} variante="saldo" />
    </div>
  )
}