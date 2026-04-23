import type { User, Session } from '@/types/user'

const USERS_KEY = 'app_users'
const SESSION_KEY = 'app_session'
const REMEMBER_EMAIL_KEY = 'app_remember_email'

/* ─── Users ──────────────────────────────────────────────────────── */
export function getUsers(): User[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? (JSON.parse(raw) as User[]) : []
  } catch {
    return []
  }
}

export function saveUser(user: User): void {
  const users = getUsers()
  users.push(user)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function findUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase())
}

/* ─── Session (sessionStorage – cleared on tab close) ─────────── */
export function getSession(): Session | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export function saveSession(session: Session): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY)
}

/* ─── Remember-me (only e-mail, never password) ─────────────────── */
export function getRememberedEmail(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(REMEMBER_EMAIL_KEY) ?? ''
}

export function saveRememberedEmail(email: string): void {
  localStorage.setItem(REMEMBER_EMAIL_KEY, email)
}

export function clearRememberedEmail(): void {
  localStorage.removeItem(REMEMBER_EMAIL_KEY)
}
