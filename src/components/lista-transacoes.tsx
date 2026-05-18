'use client'

import { Transacao } from '@/types'

function formatarMoeda(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function formatarData(data: string) {
  return new Date(data).toLocaleDateString('pt-BR')
}

interface Props {
  transacoes: Transacao[]
  onDeletar: (id: string) => void
}

export function ListaTransacoes({ transacoes, onDeletar }: Props) {
  async function handleDeletar(id: string) {
    await fetch(`/api/transacoes?id=${id}`, { method: 'DELETE' })
    onDeletar(id)
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
      <div className="px-6 py-4" style={{ borderBottom: '1px solid #334155' }}>
        <h2 className="text-base font-semibold text-slate-200">Transações</h2>
      </div>

      {transacoes.length === 0 ? (
        <div className="px-6 py-12 text-center text-slate-600 text-sm">
          Nenhuma transação encontrada
        </div>
      ) : (
        <div className="divide-y max-h-96 overflow-y-auto" style={{ borderColor: '#334155' }}>
          {transacoes.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between px-6 py-4 transition-colors group"
              style={{ borderColor: '#334155' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0f172a')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div className="flex items-center gap-3">
                <div className={`w-1 h-8 rounded-full ${t.tipo === 'receita' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                <div>
                  <p className="text-sm font-medium text-slate-200">{t.descricao}</p>
                  <p className="text-xs text-slate-500">{t.categorias?.nome} • {formatarData(t.data)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm font-semibold ${t.tipo === 'receita' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {t.tipo === 'receita' ? '+' : '-'} {formatarMoeda(t.valor)}
                </span>
                <button
                  onClick={() => handleDeletar(t.id)}
                  className="text-xs text-slate-700 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}