'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation('common')
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />

  const cycle = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const icon =
    theme === 'light' ? (
      <Sun size={18} />
    ) : theme === 'dark' ? (
      <Moon size={18} />
    ) : (
      <Monitor size={18} />
    )

  const label =
    theme === 'light'
      ? t('theme.light')
      : theme === 'dark'
        ? t('theme.dark')
        : t('theme.system')

  return (
    <button
      onClick={cycle}
      aria-label={label}
      title={label}
      className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors duration-200"
    >
      {icon}
    </button>
  )
}
