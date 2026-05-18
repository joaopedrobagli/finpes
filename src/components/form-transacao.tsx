'use client'

import { useState } from 'react'
import { Categoria, NovaTransacao } from '@/types'
import { Plus } from 'lucide-react'

interface Props {
  categorias: Categoria[]
  onSucesso: () => void
}

export function FormTransacao({ categorias, onSucesso }: Props) {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState<'receita' | 'despesa'>('despesa')
  const [categoriaId, setCategoriaId] = useState('')
  const [data, setData] = useState('')
  const [carregando, setCarregando] = useState(false)

  const categoriasFiltradas = categorias.filter((c) => c.tipo === tipo)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setCarregando(true)

    const novaTransacao: NovaTransacao = {
      descricao,
      valor: Number(valor),
      tipo,
      categoria_id: categoriaId,
      data,
    }

    await fetch('/api/transacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaTransacao),
    })

    setDescricao('')
    setValor('')
    setCategoriaId('')
    setData('')
    setCarregando(false)
    onSucesso()
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: 10,
    color: '#e2e8f0',
    padding: '8px 12px',
    fontSize: 14,
    width: '100%',
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: 4,
    display: 'block',
  }

  return (
    <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: 16, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Plus size={14} color="white" />
        </div>
        <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 15 }}>Nova Transação</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Toggle tipo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: 4, backgroundColor: '#0f172a', borderRadius: 12 }}>
          {(['despesa', 'receita'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTipo(t); setCategoriaId('') }}
              style={{
                padding: '8px 0',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: tipo === t ? '#1e293b' : 'transparent',
                color: tipo === t ? (t === 'despesa' ? '#fb7185' : '#34d399') : '#64748b',
                boxShadow: tipo === t ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
              }}
            >
              {t === 'despesa' ? '↓ Despesa' : '↑ Receita'}
            </button>
          ))}
        </div>

        <div>
          <label style={labelStyle}>Descrição</label>
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Almoço no restaurante"
            style={{ ...inputStyle }}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={labelStyle}>Valor</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0,00"
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              style={inputStyle}
              required
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Categoria</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="">Selecione uma categoria</option>
            {categoriasFiltradas.map((c) => (
              <option key={c.id} value={c.id} style={{ backgroundColor: '#1e293b' }}>{c.nome}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={carregando}
          style={{
            width: '100%',
            padding: '12px 0',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            color: 'white',
            backgroundColor: carregando ? '#334155' : '#3b82f6',
            border: 'none',
            cursor: carregando ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          {carregando ? 'Salvando...' : 'Adicionar Transação'}
        </button>
      </form>
    </div>
  )
}