import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

// Busca todas as categorias do banco
export async function GET() {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .order('nome', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}