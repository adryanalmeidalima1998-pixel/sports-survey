import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pesquisa de Softwares de Análise Esportiva',
  description: 'Compartilhe sua experiência com softwares de análise esportiva',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
