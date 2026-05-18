// Tipo que representa uma categoria
export type Categoria = {
  id: string
  nome: string
  tipo: 'receita' | 'despesa'
  icone?: string
  criado_em: string
}

// Tipo que representa uma transação
export type Transacao = {
  id: string
  descricao: string
  valor: number
  tipo: 'receita' | 'despesa'
  categoria_id: string
  data: string
  criado_em: string
  // Relacionamento com a categoria (quando buscamos com join)
  categorias?: Categoria
}

// Tipo para criar uma nova transação (sem os campos gerados pelo banco)
export type NovaTransacao = Omit<Transacao, 'id' | 'criado_em' | 'categorias'>

// Tipo para o resumo do dashboard
export type Resumo = {
  totalReceitas: number
  totalDespesas: number
  saldo: number
}