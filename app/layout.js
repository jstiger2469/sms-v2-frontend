import { Inter } from 'next/font/google'
import './globals.css'
import ClientProvider from './components/ClientProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SMS V2 - Mentor Management System',
  description: 'A comprehensive mentor management and messaging system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  )
} 