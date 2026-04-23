'use client'

import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '@/context/AuthContext'
import '@/config/i18n' // initialise i18next once

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}
