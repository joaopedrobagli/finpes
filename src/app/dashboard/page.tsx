'use client'

import { useEffect, useState } from 'react'
import { Transacao, Categoria, Resumo } from '@/types'
import { ResumoCards } from '@/components/resumo-card'
import { GraficoMensal } from '@/components/grafico-mensal'
import { FormTransacao } from '@/components/form-transacao'
import { ListaTransacoes } from '@/components/lista-transacoes'

export default function Dashboard() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [resumo, setResumo] = useState<Resumo>({ totalReceitas: 0, totalDespesas: 0, saldo: 0 })

  // Busca todos os dados ao carregar a página
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

  // Roda quando a página carrega
  useEffect(() => {
    carregarDados()
  }, [])

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">FinPes</h1>

      {/* Cards de resumo */}
      <ResumoCards resumo={resumo} />

      {/* Gráfico mensal */}
      <GraficoMensal transacoes={transacoes} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulário de nova transação */}
        <FormTransacao categorias={categorias} onSucesso={carregarDados} />

        {/* Lista de transações */}
        <ListaTransacoes transacoes={transacoes} onDeletar={carregarDados} />
      </div>
    </main>
  )
}