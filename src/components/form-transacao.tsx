'use client'

import { useState } from 'react'
import { Categoria, NovaTransacao } from '@/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

  const inputStyle = {
    backgroundColor: '#0f172a',
    borderColor: '#334155',
    color: '#e2e8f0',
  }

  return (
    <div className="rounded-2xl p-6" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
          <Plus size={14} className="text-white" />
        </div>
        <h2 className="text-base font-semibold text-slate-200">Nova Transação</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Toggle tipo */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl" style={{ backgroundColor: '#0f172a' }}>
          {(['despesa', 'receita'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTipo(t); setCategoriaId('') }}
              className="py-2 rounded-lg text-sm font-medium transition-all"
              style={
                tipo === t
                  ? {
                      backgroundColor: '#1e293b',
                      color: t === 'despesa' ? '#fb7185' : '#34d399',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    }
                  : { color: '#64748b' }
              }
            >
              {t === 'despesa' ? '↓ Despesa' : '↑ Receita'}
            </button>
          ))}
        </div>

        <div>
          <Label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">Descrição</Label>
          <Input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Almoço no restaurante"
            className="rounded-xl placeholder:text-slate-600"
            style={inputStyle}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">Valor</Label>
            <Input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0,00"
              className="rounded-xl placeholder:text-slate-600"
              style={inputStyle}
              required
            />
          </div>
          <div>
            <Label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">Data</Label>
            <Input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="rounded-xl"
              style={inputStyle}
              required
            />
          </div>
        </div>

        <div>
          <Label className="text-xs text-slate-500 uppercase tracking-wide mb-1 block">Categoria</Label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
            className="w-full rounded-xl px-3 py-2 text-sm"
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
          className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
        >
          {carregando ? 'Salvando...' : 'Adicionar Transação'}
        </button>
      </form>
    </div>
  )
}