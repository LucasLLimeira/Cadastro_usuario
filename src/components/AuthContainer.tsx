'use client'

import { useState } from 'react'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import WelcomeModal from './WelcomeModal'
import { useAuth } from '@/context/AuthContext'

interface AuthContainerProps {
  isLogin: boolean
  onModeChange?: (isLogin: boolean) => void
  onLoginError?: (msg: string | null) => void
}

export default function AuthContainer({ isLogin, onModeChange, onLoginError }: AuthContainerProps) {
  const { session } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [welcomeType, setWelcomeType] = useState<'login' | 'register'>('login')

  const handleSuccess = (type: 'login' | 'register') => {
    setWelcomeType(type)
    setShowModal(true)
  }

  return (
    <>
      {/* ── Sliding card content ─────────────────────────────────── */}
      {/*
        Both forms live in the same grid cell.
        Active  → translate-x-0   opacity-100
        Inactive LoginForm  → -translate-x-full opacity-0
        Inactive RegisterForm → translate-x-full opacity-0
        The parent card has overflow-hidden to clip the offscreen forms.
      */}
      <div className="grid flex-1 min-h-0 overflow-hidden">
        {/* Login */}
        <div
          className={[
            'col-start-1 row-start-1 w-full h-full transition-all duration-500 ease-in-out',
            isLogin
              ? 'translate-x-0 opacity-100 pointer-events-auto'
              : '-translate-x-full opacity-0 pointer-events-none',
          ].join(' ')}
        >
          <LoginForm
            onSuccess={handleSuccess}
            onError={onLoginError}
          />
        </div>

        {/* Register */}
        <div
          className={[
            'col-start-1 row-start-1 w-full h-full overflow-y-auto overscroll-contain [touch-action:pan-y] transition-all duration-500 ease-in-out',
            !isLogin
              ? 'translate-x-0 opacity-100 pointer-events-auto'
              : 'translate-x-full opacity-0 pointer-events-none',
          ].join(' ')}
        >
          <RegistrationForm
            onSuccess={handleSuccess}
          />
        </div>
      </div>

      {/* ── Welcome modal ────────────────────────────────────────── */}
      {showModal && session && (
        <WelcomeModal
          name={session.name}
          type={welcomeType}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
