'use client'

import { useState } from 'react'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [responses, setResponses] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      fetchResponses()
    } else {
      alert('Senha incorreta')
      setPassword('')
    }
  }

  const fetchResponses = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/responses')
      const data = await response.json()
      setResponses(data)
    } catch (error) {
      console.error('Erro ao buscar respostas:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportCSV = () => {
    if (responses.length === 0) return

    const headers = [
      'Nome',
      'Email',
      'Profissão',
      'Clube',
      'Softwares',
      'Dificuldades',
      'Ferramentas Favoritas',
      'Funcionalidades Essenciais',
      'Lacunas',
      'Feedback',
      'Data',
    ]

    const rows = responses.map((r) => [
      r.name,
      r.email,
      r.profession,
      r.club || '',
      r.softwaresUsed.join('; '),
      r.mainDifficulties.join('; '),
      r.favoriteTools.join('; '),
      r.essentialFeatures.join('; '),
      r.gaps.join('; '),
      r.additional_feedback || '',
      new Date(r.created_at).toLocaleString('pt-BR'),
    ])

    const csv = [
      headers.map((h) => `"${h}"`).join(','),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pesquisa-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800/50 border border-slate-700 rounded-lg p-8 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Painel Administrativo</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                placeholder="Digite a senha"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
          <button
            onClick={() => setAuthenticated(false)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Total de Respostas</p>
            <p className="text-3xl font-bold text-white">{responses.length}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Softwares Únicos</p>
            <p className="text-3xl font-bold text-white">
              {new Set(responses.flatMap((r) => r.softwaresUsed)).size}
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Profissões</p>
            <p className="text-3xl font-bold text-white">
              {new Set(responses.map((r) => r.profession)).size}
            </p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <button
              onClick={exportCSV}
              disabled={responses.length === 0}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-2 rounded transition"
            >
              📥 Exportar CSV
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-slate-300">Carregando...</div>
        ) : (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-700/50 border-b border-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-300">Nome</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-300">Email</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-300">Profissão</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-300">Softwares</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-300">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {responses.map((response) => (
                    <tr
                      key={response.id}
                      className="border-b border-slate-700/50 hover:bg-slate-700/30 transition"
                    >
                      <td className="px-4 py-3 text-slate-200">{response.name}</td>
                      <td className="px-4 py-3 text-slate-400">{response.email}</td>
                      <td className="px-4 py-3 text-slate-300">{response.profession}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded border border-blue-500/30">
                          {response.softwaresUsed.length} softwares
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400">
                        {new Date(response.created_at).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
