'use client'

import { useEffect, useState } from 'react'
import { Transacao, Categoria, Resumo } from '@/types'
import { GraficoMensal } from '@/components/grafico-mensal'
import { FormTransacao } from '@/components/form-transacao'
import { ListaTransacoes } from '@/components/lista-transacoes'
import { TrendingUp, TrendingDown, Wallet, LayoutDashboard } from 'lucide-react'

function formatarMoeda(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function Dashboard() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [resumo, setResumo] = useState<Resumo>({ totalReceitas: 0, totalDespesas: 0, saldo: 0 })

  async function carregarDados() {
    const [resTransacoes, resCategorias, resResumo] = await Promise.all([
      fetch('/api/transacoes').then((r) => r.json()),
      fetch('/api/categorias').then((r) => r.json()),
      fetch('/api/resumo').then((r) => r.json()),
    ])
    setTransacoes(resTransacoes)
    setCategorias(resCategorias)
    setResumo(resResumo)
  }

  useEffect(() => { carregarDados() }, [])

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0f172a' }}>

      {/* Sidebar */}
      <aside className="w-72 min-h-screen flex flex-col fixed left-0 top-0 p-6 border-r" style={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }}>
        <div className="mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <Wallet size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">FinPes</h1>
              <p className="text-xs text-slate-500">Finanças pessoais</p>
            </div>
          </div>
        </div>

        <nav className="mb-8">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-white" style={{ backgroundColor: '#1e293b' }}>
            <LayoutDashboard size={16} className="text-blue-400" />
            <span className="text-sm font-medium">Dashboard</span>
          </div>
        </nav>

        <div className="space-y-3">
          <p className="text-xs text-slate-600 uppercase tracking-widest px-1">Resumo</p>

          <div className="rounded-xl p-4" style={{ backgroundColor: '#1e293b' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400">Receitas</span>
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: '#064e3b' }}>
                <TrendingUp size={12} className="text-emerald-400" />
              </div>
            </div>
            <p className="text-xl font-bold text-emerald-400">{formatarMoeda(resumo.totalReceitas)}</p>
          </div>

          <div className="rounded-xl p-4" style={{ backgroundColor: '#1e293b' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400">Despesas</span>
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: '#4c0519' }}>
                <TrendingDown size={12} className="text-rose-400" />
              </div>
            </div>
            <p className="text-xl font-bold text-rose-400">{formatarMoeda(resumo.totalDespesas)}</p>
          </div>

          <div className="rounded-xl p-4" style={{ backgroundColor: '#1d4ed8' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-blue-200">Saldo atual</span>
              <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
                <Wallet size={12} className="text-white" />
              </div>
            </div>
            <p className="text-xl font-bold text-white">{formatarMoeda(resumo.saldo)}</p>
          </div>
        </div>

        <div className="mt-auto px-1">
          <p className="text-xs text-slate-600">
            {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </aside>

      {/* Conteúdo */}
      <main className="ml-72 flex-1 p-8 space-y-6" style={{ backgroundColor: '#0f172a' }}>
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-sm text-slate-500 mt-1">Visão geral das suas finanças</p>
        </div>

        <GraficoMensal transacoes={transacoes} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormTransacao categorias={categorias} onSucesso={carregarDados} />
          <ListaTransacoes transacoes={transacoes} onDeletar={carregarDados} />
        </div>
      </main>
    </div>
  )
}