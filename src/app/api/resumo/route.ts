import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  // Busca todas as transações do banco
  const { data: transacoes, error } = await supabase
    .from('transacoes')
    .select('*')

  // Se der erro retorna 500
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Soma todas as receitas
  const totalReceitas = transacoes
    ?.filter((t) => t.tipo === 'receita')
    .reduce((acc, t) => acc + Number(t.valor), 0) || 0

  // Soma todas as despesas
  const totalDespesas = transacoes
    ?.filter((t) => t.tipo === 'despesa')
    .reduce((acc, t) => acc + Number(t.valor), 0) || 0

  // Calcula o saldo
  const saldo = totalReceitas - totalDespesas

  return NextResponse.json({ totalReceitas, totalDespesas, saldo })
}