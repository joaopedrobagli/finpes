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
    <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #334155' }}>
        <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 15 }}>Transações</p>
      </div>

      {transacoes.length === 0 ? (
        <div style={{ padding: '48px 24px', textAlign: 'center', color: '#475569', fontSize: 14 }}>
          Nenhuma transação encontrada
        </div>
      ) : (
        <div style={{ maxHeight: 384, overflowY: 'auto' }}>
          {transacoes.map((t) => (
            <div
              key={t.id}
              className="group"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid #1e293b', cursor: 'default' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0f172a')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 3, height: 32, borderRadius: 4, backgroundColor: t.tipo === 'receita' ? '#10b981' : '#f43f5e' }} />
                <div>
                  <p style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 500 }}>{t.descricao}</p>
                  <p style={{ color: '#475569', fontSize: 12, marginTop: 2 }}>{t.categorias?.nome} • {formatarData(t.data)}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: t.tipo === 'receita' ? '#10b981' : '#f43f5e' }}>
                  {t.tipo === 'receita' ? '+' : '-'} {formatarMoeda(t.valor)}
                </span>
                <button
                  onClick={() => handleDeletar(t.id)}
                  style={{ fontSize: 12, color: '#334155', background: 'none', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#f43f5e')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#334155')}
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