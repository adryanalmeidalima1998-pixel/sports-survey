import { NextRequest, NextResponse } from 'next/server'
import { saveSurveyResponse, initializeDatabase } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Inicializar banco de dados na primeira requisição
    await initializeDatabase()

    const data = await request.json()

    // Validar dados
    if (!data.name || !data.email || !data.profession) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando' },
        { status: 400 }
      )
    }

    if (!Array.isArray(data.softwaresUsed) || data.softwaresUsed.length === 0) {
      return NextResponse.json(
        { error: 'Selecione pelo menos um software' },
        { status: 400 }
      )
    }

    // Salvar resposta
    const result = await saveSurveyResponse(data)

    return NextResponse.json(result)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Erro ao processar requisição' },
      { status: 500 }
    )
  }
}
