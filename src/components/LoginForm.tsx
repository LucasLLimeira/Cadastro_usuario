'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Loader2 } from 'lucide-react'

import { loginSchema, type LoginFormData } from '@/lib/validation'
import { useAuth } from '@/context/AuthContext'
import { getRememberedEmail } from '@/lib/storage'
import Input from './Input'

interface LoginFormProps {
  onSuccess: (type: 'login') => void
  onError?: (msg: string | null) => void
}

export default function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const { t } = useTranslation('auth')
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema) as never,
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  // Pre-fill remembered email
  useEffect(() => {
    const remembered = getRememberedEmail()
    if (remembered) {
      setValue('email', remembered)
      setValue('rememberMe', true)
    }
  }, [setValue])

  const onSubmit = async (data: LoginFormData) => {
    onError?.(null)
    const result = await login(data)
    if (!result.success && result.error) {
      setError('root', { message: result.error })
      onError?.(result.error)
      return
    }
    onSuccess('login')
  }

  return (
    <div className="p-5 md:p-7 pb-6 md:pb-8">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {t('login.title')}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {t('login.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Email */}
        <Input
          label={t('login.emailLabel')}
          type="email"
          placeholder={t('login.emailPlaceholder')}
          autoComplete="email"
          required
          error={errors.email?.message}
          {...register('email')}
        />

        {/* Password */}
        <Input
          label={t('login.passwordLabel')}
          type="password"
          placeholder={t('login.passwordPlaceholder')}
          autoComplete="current-password"
          required
          error={errors.password?.message}
          {...register('password')}
        />

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-slate-300 dark:border-slate-500 text-blue-600 focus:ring-blue-500 accent-blue-600"
              {...register('rememberMe')}
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {t('login.rememberMe')}
            </span>
          </label>
          <button
            type="button"
            disabled
            className="text-sm text-blue-600 dark:text-blue-400 opacity-50 cursor-not-allowed"
          >
            {t('login.forgotPassword')}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isSubmitting ? t('login.loading') : t('login.submit')}
        </button>
      </form>
    </div>
  )
}
