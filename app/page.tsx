'use client'

import { useState } from 'react'

const PROFESSIONS = [
  'Analista de Desempenho',
  'Auxiliar Técnico',
  'Técnico',
  'Analista Tático',
  'Analista Individual',
  'Analista de Mercado/Scout',
  'Outro',
]

const SOFTWARES = [
  'Hudl Sportscode',
  'Metrica Sports (Nexus/PlayBase)',
  'Catapult Pro Video',
  'Nacsport',
  'Dartfish',
  'Wyscout',
  'Instat',
  'LongoMatch',
  'Once Sport',
  'Veo',
  'KlipDraw',
  'TacticalPad',
  'SofaScore/WhoScored',
  'VideFlow',
]

const DIFFICULTIES = [
  'Curva de aprendizado alta',
  'Interface confusa',
  'Falta de integração com outros sistemas',
  'Custo elevado',
  'Suporte técnico inadequado',
  'Lentidão na análise',
  'Limitações em relatórios',
  'Falta de análise em tempo real',
]

const TOOLS = [
  'Tagging ao vivo/pós-jogo',
  'Telestration (desenho sobre vídeo)',
  'Matriz de dados',
  'Compartilhamento em nuvem',
  'Análise de movimento',
  'Rastreamento de jogadores',
  'Mapas de calor',
  'Estatísticas detalhadas',
]

const FEATURES = [
  'Tagging ao vivo/pós-jogo',
  'Telestration',
  'Matriz de dados',
  'Compartilhamento em nuvem',
  'Análise de movimento',
  'Rastreamento de jogadores',
  'Mapas de calor',
  'Relatórios customizados',
  'Integração com banco de dados',
  'Análise de vídeo 4K',
]

const GAPS = [
  'Falta de IA/Machine Learning',
  'Análise limitada de dados físicos',
  'Sem análise em tempo real',
  'Falta de integração com wearables',
  'Interface não intuitiva',
  'Sem suporte a múltiplos idiomas',
  'Limitações em análise de vídeo',
  'Falta de análise comparativa',
]

export default function Home() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    club: '',
    softwaresUsed: [] as string[],
    customSoftware: '',
    mainDifficulties: [] as string[],
    customDifficulty: '',
    favoriteTools: [] as string[],
    customTool: '',
    essentialFeatures: [] as string[],
    customFeature: '',
    gaps: [] as string[],
    customGap: '',
    additionalFeedback: '',
  })

  const handleCheckbox = (field: keyof typeof formData, value: string) => {
    const arr = formData[field] as string[]
    if (arr.includes(value)) {
      setFormData({
        ...formData,
        [field]: arr.filter((item) => item !== value),
      })
    } else {
      setFormData({
        ...formData,
        [field]: [...arr, value],
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          profession: '',
          club: '',
          softwaresUsed: [],
          customSoftware: '',
          mainDifficulties: [],
          customDifficulty: '',
          favoriteTools: [],
          customTool: '',
          essentialFeatures: [],
          customFeature: '',
          gaps: [],
          customGap: '',
          additionalFeedback: '',
        })
        setStep(1)
      }
    } catch (error) {
      alert('Erro ao enviar formulário. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center backdrop-blur-sm">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold mb-2">Obrigado!</h1>
          <p className="text-slate-300 mb-6">Sua resposta foi registrada com sucesso. Seus insights são valiosos para nós!</p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Enviar Outra Resposta
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl font-bold text-white">Pesquisa de Softwares</h1>
            <span className="text-sm text-slate-400">Etapa {step} de 6</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4 text-white">Informações Pessoais</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Nome *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Profissão *</label>
                  <select
                    required
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Selecione...</option>
                    {PROFESSIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Clube/Equipe (opcional)</label>
                  <input
                    type="text"
                    value={formData.club}
                    onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    placeholder="Nome do clube"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4 text-white">Quais softwares você utiliza? *</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {SOFTWARES.map((software) => (
                  <label key={software} className="flex items-center space-x-3 p-2 hover:bg-slate-700/30 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.softwaresUsed.includes(software)}
                      onChange={() => handleCheckbox('softwaresUsed', software)}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-700 accent-blue-500"
                    />
                    <span className="text-slate-300">{software}</span>
                  </label>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Outro software (opcional):</label>
                <input
                  type="text"
                  value={formData.customSoftware}
                  onChange={(e) => setFormData({ ...formData, customSoftware: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  placeholder="Digite o nome do software..."
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4 text-white">Quais são as maiores dificuldades?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {DIFFICULTIES.map((difficulty) => (
                  <label key={difficulty} className="flex items-center space-x-3 p-2 hover:bg-slate-700/30 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.mainDifficulties.includes(difficulty)}
                      onChange={() => handleCheckbox('mainDifficulties', difficulty)}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-700 accent-blue-500"
                    />
                    <span className="text-slate-300">{difficulty}</span>
                  </label>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Outra dificuldade (opcional):</label>
                <input
                  type="text"
                  value={formData.customDifficulty}
                  onChange={(e) => setFormData({ ...formData, customDifficulty: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  placeholder="Digite outra dificuldade..."
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4 text-white">Quais ferramentas você mais gosta de usar?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {TOOLS.map((tool) => (
                  <label key={tool} className="flex items-center space-x-3 p-2 hover:bg-slate-700/30 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.favoriteTools.includes(tool)}
                      onChange={() => handleCheckbox('favoriteTools', tool)}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-700 accent-blue-500"
                    />
                    <span className="text-slate-300">{tool}</span>
                  </label>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Outra ferramenta (opcional):</label>
                <input
                  type="text"
                  value={formData.customTool}
                  onChange={(e) => setFormData({ ...formData, customTool: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  placeholder="Digite outra ferramenta..."
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4 text-white">O que não pode faltar de jeito nenhum?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {FEATURES.map((feature) => (
                  <label key={feature} className="flex items-center space-x-3 p-2 hover:bg-slate-700/30 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.essentialFeatures.includes(feature)}
                      onChange={() => handleCheckbox('essentialFeatures', feature)}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-700 accent-blue-500"
                    />
                    <span className="text-slate-300">{feature}</span>
                  </label>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Outra funcionalidade (opcional):</label>
                <input
                  type="text"
                  value={formData.customFeature}
                  onChange={(e) => setFormData({ ...formData, customFeature: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  placeholder="Digite outra funcionalidade..."
                />
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4 text-white">Aonde esses softwares deixam a desejar?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {GAPS.map((gap) => (
                    <label key={gap} className="flex items-center space-x-3 p-2 hover:bg-slate-700/30 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.gaps.includes(gap)}
                        onChange={() => handleCheckbox('gaps', gap)}
                        className="w-4 h-4 rounded border-slate-600 bg-slate-700 accent-blue-500"
                      />
                      <span className="text-slate-300">{gap}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Outra lacuna (opcional):</label>
                  <input
                    type="text"
                    value={formData.customGap}
                    onChange={(e) => setFormData({ ...formData, customGap: e.target.value })}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    placeholder="Digite outra lacuna..."
                  />
                </div>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4 text-white">Feedback Adicional (opcional)</h2>
                <textarea
                  value={formData.additionalFeedback}
                  onChange={(e) => setFormData({ ...formData, additionalFeedback: e.target.value })}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 min-h-24"
                  placeholder="Deixe aqui qualquer comentário adicional..."
                />
              </div>
            </div>
          )}

          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-2 border border-slate-600 text-white rounded hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Anterior
            </button>

            {step < 6 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                Próximo
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? 'Enviando...' : 'Enviar Resposta'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
