'use client'

import { Transacao } from '@/types'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts'

function agruparPorMes(transacoes: Transacao[]) {
  const meses: Record<string, { mes: string; receitas: number; despesas: number }> = {}

  transacoes.forEach((t) => {
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

  return Object.entries(meses)
    .sort(([a], [b]) => {
      const [ma, ya] = a.split('/').map(Number)
      const [mb, yb] = b.split('/').map(Number)
      return ya !== yb ? ya - yb : ma - mb
    })
    .map(([, v]) => v)
}

function TooltipCustom({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl p-3 shadow-lg text-sm" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
      <p className="font-semibold text-slate-200 mb-2">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.fill }}>
          {p.name}: {Number(p.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      ))}
    </div>
  )
}

export function GraficoMensal({ transacoes }: { transacoes: Transacao[] }) {
  const dados = agruparPorMes(transacoes)

  return (
    <div className="rounded-2xl p-6" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-slate-200">Receitas vs Despesas por Mês</h2>
        <span className="text-xs text-slate-500">{new Date().getFullYear()}</span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={dados} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
          <Tooltip content={<TooltipCustom />} />
          <Legend formatter={(value) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{value}</span>} />
          <Bar dataKey="receitas" name="Receitas" fill="#10b981" radius={[6, 6, 0, 0]} />
          <Bar dataKey="despesas" name="Despesas" fill="#f43f5e" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}