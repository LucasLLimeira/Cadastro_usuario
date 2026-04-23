'use client'

import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { PartyPopper, ArrowRight } from 'lucide-react'

interface WelcomeModalProps {
  name: string
  type: 'login' | 'register'
  onClose: () => void
}

export default function WelcomeModal({ name, type, onClose }: WelcomeModalProps) {
  const router = useRouter()
  const { t } = useTranslation('common')

  const title =
    type === 'register'
      ? t('welcome.title', { name })
      : t('welcome.loginTitle', { name })

  const subtitle =
    type === 'register' ? t('welcome.subtitle') : t('welcome.loginSubtitle')

  const handleGo = () => {
    onClose()
    router.push('/dashboard')
  }

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Card */}
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-slate-800 shadow-2xl p-8 text-center animate-[modalPop_0.35s_ease-out]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'modalPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}
      >
        {/* Icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
          <PartyPopper size={32} className="text-blue-600 dark:text-blue-400" />
        </div>

        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          {title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-7">{subtitle}</p>

        <button
          onClick={handleGo}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold text-sm transition-colors duration-200"
        >
          {t('welcome.goToDashboard')}
          <ArrowRight size={16} />
        </button>
      </div>

      <style>{`
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
