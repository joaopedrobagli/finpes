import { supabase } from '@/lib/supabase'
import { NovaTransacao } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

// Busca todas as transações com a categoria relacionada
export async function GET() {
  const { data, error } = await supabase
    .from('transacoes')
    .select('*, categorias(*)')
    .order('data', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// Cria uma nova transação
export async function POST(req: NextRequest) {
  const body: NovaTransacao = await req.json()

  const { data, error } = await supabase
    .from('transacoes')
    .insert(body)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

// Deleta uma transação pelo id
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  const { error } = await supabase
    .from('transacoes')
    .delete()
    .eq('id', id!)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ sucesso: true })
}