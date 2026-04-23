'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Session, RegisterData, LoginCredentials } from '@/types/user'
import { hashPassword, comparePassword } from '@/lib/auth'
import {
  findUserByEmail,
  saveUser,
  getSession,
  saveSession,
  clearSession,
  saveRememberedEmail,
  clearRememberedEmail,
} from '@/lib/storage'

/* ─── Types ─────────────────────────────────────────────────────── */
interface AuthResult {
  success: boolean
  error?: string
}

interface AuthContextValue {
  session: Session | null
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<AuthResult>
  register: (data: RegisterData) => Promise<AuthResult>
  logout: () => void
}

/* ─── Context ───────────────────────────────────────────────────── */
const AuthContext = createContext<AuthContextValue | null>(null)

/* ─── Provider ──────────────────────────────────────────────────── */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restore session on mount
  useEffect(() => {
    const stored = getSession()
    if (stored) setSession(stored)
    setIsLoading(false)
  }, [])

  const login = async ({
    email,
    password,
    rememberMe,
  }: LoginCredentials): Promise<AuthResult> => {
    const user = findUserByEmail(email)
    if (!user) return { success: false, error: 'auth:login.errors.userNotFound' }

    const valid = await comparePassword(password, user.passwordHash)
    if (!valid) return { success: false, error: 'auth:login.errors.wrongPassword' }

    const sess: Session = { userId: user.id, email: user.email, name: user.name }
    saveSession(sess)
    setSession(sess)

    if (rememberMe) {
      saveRememberedEmail(email)
    } else {
      clearRememberedEmail()
    }

    return { success: true }
  }

  const register = async (data: RegisterData): Promise<AuthResult> => {
    const existing = findUserByEmail(data.email)
    if (existing) return { success: false, error: 'auth:register.errors.emailExists' }

    const passwordHash = await hashPassword(data.password)

    const user = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash,
      phone: data.phone.replace(/\D/g, ''),
      cpf: data.cpf.replace(/\D/g, ''),
      birthDate: data.birthDate,
      address: {
        cep: data.cep.replace(/\D/g, ''),
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      },
      createdAt: new Date().toISOString(),
    }

    saveUser(user)

    const sess: Session = { userId: user.id, email: user.email, name: user.name }
    saveSession(sess)
    setSession(sess)

    return { success: true }
  }

  const logout = () => {
    clearSession()
    setSession(null)
  }

  return (
    <AuthContext.Provider value={{ session, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/* ─── Hook ──────────────────────────────────────────────────────── */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
