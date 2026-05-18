'use client'

import { Transacao } from '@/types'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Agrupa as transações por mês e soma receitas e despesas
function agruparPorMes(transacoes: Transacao[]) {
  const meses: Record<string, { mes: string; receitas: number; despesas: number }> = {}

  transacoes.forEach((t) => {
    // Pega o mês e ano da transação (ex: "Jan/2026")
    const data = new Date(t.data)
    const chave = `${data.getMonth() + 1}/${data.getFullYear()}`
    const label = data.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })

    if (!meses[chave]) {
      meses[chave] = { mes: label, receitas: 0, despesas: 0 }
    }

    if (t.tipo === 'receita') {
      meses[chave].receitas += Number(t.valor)
    } else {
      meses[chave].despesas += Number(t.valor)
    }
  })

  // Retorna os dados ordenados por data
  return Object.values(meses)
}

export function GraficoMensal({ transacoes }: { transacoes: Transacao[] }) {
  const dados = agruparPorMes(transacoes)

  return (
    <div className="rounded-xl border p-6">
      <h2 className="text-lg font-semibold mb-4">Receitas vs Despesas por Mês</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados}>
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip formatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
          <Legend />
          <Bar dataKey="receitas" name="Receitas" fill="#22c55e" />
          <Bar dataKey="despesas" name="Despesas" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}