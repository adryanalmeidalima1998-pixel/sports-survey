import { NextResponse } from 'next/server'
import { getAllResponses } from '@/lib/db'

export async function GET() {
  try {
    const responses = await getAllResponses()
    return NextResponse.json(responses)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar respostas' },
      { status: 500 }
    )
  }
}
