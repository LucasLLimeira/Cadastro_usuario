'use client'

import { useState } from 'react'
import AuthContainer from '@/components/AuthContainer'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslation } from 'react-i18next'

export default function AuthPage() {
  const { t } = useTranslation('common')
  const [isLogin, setIsLogin] = useState(true)
  const [loginError, setLoginError] = useState<string | null>(null)

  return (
    <main className="h-screen overflow-hidden flex flex-col bg-linear-to-br from-blue-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Top bar */}
      <header className="shrink-0 flex items-center justify-between px-6 py-4">
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
        </div>
      </header>

      {/* Auth card */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-4 py-4 gap-3">
        <div
          className={[
            'w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden',
            'flex flex-col transition-all duration-500 ease-in-out',
            'max-w-lg',
            isLogin ? 'max-h-106' : 'max-h-[calc(100vh-10rem)]',
          ].join(' ')}
        >
          <div className="h-full min-h-0 flex flex-col">
            <AuthContainer isLogin={isLogin} onModeChange={setIsLogin} onLoginError={setLoginError} />
          </div>
        </div>

        <p className="w-full max-w-lg text-center text-sm text-slate-500 dark:text-slate-400">
          {isLogin ? t('login.noAccount', { ns: 'auth' }) : t('register.hasAccount', { ns: 'auth' })}{' '}
          <button
            type="button"
            onClick={() => setIsLogin((value) => !value)}
            className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            {isLogin ? t('login.registerLink', { ns: 'auth' }) : t('register.loginLink', { ns: 'auth' })}
          </button>
        </p>

        {/* Login error toast — below the card, no layout shift */}
        <div
          role="alert"
          aria-live="polite"
          className={[
            'w-full max-w-lg flex items-center gap-2.5 rounded-xl border px-4 py-3 transition-all duration-300',
            loginError
              ? 'opacity-100 translate-y-0 bg-red-50 dark:bg-red-900/25 border-red-200 dark:border-red-700'
              : 'opacity-0 -translate-y-1 pointer-events-none bg-transparent border-transparent',
          ].join(' ')}
        >
          <span className="shrink-0 w-5 h-5 rounded-full bg-red-500 dark:bg-red-400 flex items-center justify-center text-white text-xs font-bold">!</span>
          <p className="text-sm text-red-600 dark:text-red-400">
            {loginError ? t(loginError, { defaultValue: loginError }) : ''}
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="shrink-0 py-3 text-center text-xs text-slate-400 dark:text-slate-600">
        © {new Date().getFullYear()} {t('appName')}
      </footer>
    </main>
  )
}
