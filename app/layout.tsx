import './globals.css'
import Header from './Components/Header'
import { Providers } from './providers'

export const metadata = {
  title: 'EngajaSmart',
  description: 'Inteligent engagement automation for creators',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}