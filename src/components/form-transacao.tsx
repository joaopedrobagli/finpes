'use client'

import { useState } from 'react'
import { Categoria, NovaTransacao } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Props {
  categorias: Categoria[]
  // Função chamada após adicionar uma transação com sucesso
  onSucesso: () => void
}

export function FormTransacao({ categorias, onSucesso }: Props) {
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState<'receita' | 'despesa'>('despesa')
  const [categoriaId, setCategoriaId] = useState('')
  const [data, setData] = useState('')
  const [carregando, setCarregando] = useState(false)

  // Filtra as categorias pelo tipo selecionado
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

    // Envia para a API
    await fetch('/api/transacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaTransacao),
    })

    // Limpa o formulário
    setDescricao('')
    setValor('')
    setCategoriaId('')
    setData('')
    setCarregando(false)
    onSucesso()
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border p-6 space-y-4">
      <h2 className="text-lg font-semibold">Nova Transação</h2>

      <div className="space-y-1">
        <Label>Descrição</Label>
        <Input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Ex: Almoço" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Valor</Label>
          <Input type="number" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="0,00" required />
        </div>

        <div className="space-y-1">
          <Label>Data</Label>
          <Input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Tipo</Label>
          <Select value={tipo} onValueChange={(v) => setTipo(v as 'receita' | 'despesa')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="despesa">Despesa</SelectItem>
              <SelectItem value="receita">Receita</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label>Categoria</Label>
          <Select value={categoriaId} onValueChange={setCategoriaId}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {categoriasFiltradas.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={carregando}>
        {carregando ? 'Salvando...' : 'Adicionar Transação'}
      </Button>
    </form>
  )
}