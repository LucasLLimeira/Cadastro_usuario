'use client'

import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common')

  const toggle = () => {
    const next = i18n.language === 'pt-BR' ? 'en-US' : 'pt-BR'
    i18n.changeLanguage(next)
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_language', next)
    }
  }

  const label =
    i18n.language === 'pt-BR' ? t('language.ptBR') : t('language.enUS')

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors duration-200 text-xs font-medium"
    >
      <Globe size={15} />
      <span>{i18n.language === 'pt-BR' ? 'PT' : 'EN'}</span>
    </button>
  )
}
