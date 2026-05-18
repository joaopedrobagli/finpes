'use client'

import { Transacao } from '@/types'
import { Button } from '@/components/ui/button'

// Formata o valor para moeda brasileira
function formatarMoeda(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Formata a data para o padrão brasileiro
function formatarData(data: string) {
  return new Date(data).toLocaleDateString('pt-BR')
}

interface Props {
  transacoes: Transacao[]
  // Função chamada após deletar uma transação
  onDeletar: (id: string) => void
}

export function ListaTransacoes({ transacoes, onDeletar }: Props) {
  async function handleDeletar(id: string) {
    await fetch(`/api/transacoes?id=${id}`, { method: 'DELETE' })
    onDeletar(id)
  }

  if (transacoes.length === 0) {
    return (
      <div className="rounded-xl border p-6 text-center text-muted-foreground">
        Nenhuma transação encontrada
      </div>
    )
  }

  return (
    <div className="rounded-xl border">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">Transações</h2>
      </div>
      <div className="divide-y">
        {transacoes.map((t) => (
          <div key={t.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{t.descricao}</p>
              <p className="text-sm text-muted-foreground">
                {t.categorias?.nome} • {formatarData(t.data)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`font-semibold ${t.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                {t.tipo === 'receita' ? '+' : '-'} {formatarMoeda(t.valor)}
              </span>
              <Button variant="ghost" size="sm" onClick={() => handleDeletar(t.id)}>
                Excluir
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}