'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { LogOut, User } from 'lucide-react'

import { useAuth } from '@/context/AuthContext'
import { findUserByEmail } from '@/lib/storage'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function DashboardPage() {
  const router = useRouter()
  const { session, isLoading, logout } = useAuth()
  const { t } = useTranslation('common')

  // Protect route
  useEffect(() => {
    if (!isLoading && !session) {
      router.replace('/auth')
    }
  }, [isLoading, session, router])

  if (isLoading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const user = findUserByEmail(session.email)

  const handleLogout = () => {
    logout()
    router.replace('/auth')
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">U</span>
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-100 text-lg">
            {t('appName')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800 transition-colors duration-200 text-xs font-medium"
          >
            <LogOut size={15} />
            {t('dashboard.logout')}
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-8">
          {/* Avatar + Greeting */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <User size={28} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                {t('dashboard.greeting', { name: session.name })}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t('dashboard.description')}
              </p>
            </div>
          </div>

          {/* User info cards */}
          <div className="grid gap-3">
            <InfoRow label={t('dashboard.yourEmail')} value={session.email} />
            {user && (
              <>
                <InfoRow
                  label={t('dashboard.memberSince')}
                  value={new Date(user.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                />
                <InfoRow
                  label="Telefone"
                  value={user.phone
                    .replace(/\D/g, '')
                    .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}
                />
                <InfoRow
                  label="Cidade / UF"
                  value={`${user.address.city} / ${user.address.state}`}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <span className="text-sm text-slate-800 dark:text-slate-200 text-right">
        {value}
      </span>
    </div>
  )
}
