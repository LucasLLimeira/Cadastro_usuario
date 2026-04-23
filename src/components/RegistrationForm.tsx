'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Loader2, MapPin } from 'lucide-react'

import { registerSchema, type RegisterFormData } from '@/lib/validation'
import { useAuth } from '@/context/AuthContext'
import { fetchAddressByCep } from '@/lib/viaCep'
import { maskCpf, maskPhone, maskCep } from '@/lib/masks'
import Input from './Input'

interface RegistrationFormProps {
  onSuccess: (type: 'register') => void
}

export default function RegistrationForm({
  onSuccess,
}: RegistrationFormProps) {
  const { t } = useTranslation('auth')
  const { register: authRegister } = useAuth()
  const [cepLoading, setCepLoading] = useState(false)
  const [cepError, setCepError] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const cepValue = watch('cep') ?? ''

  /* Auto-fetch address when CEP has 9 chars (00000-000) */
  useEffect(() => {
    const raw = cepValue.replace(/\D/g, '')
    if (raw.length !== 8) return

    let cancelled = false
    setCepLoading(true)
    setCepError(false)
    clearErrors('cep')

    fetchAddressByCep(raw).then((data) => {
      if (cancelled) return
      setCepLoading(false)
      if (!data) {
        setCepError(true)
        setValue('street', '')
        setValue('neighborhood', '')
        setValue('city', '')
        setValue('state', '')
        return
      }
      setValue('street', data.logradouro, { shouldValidate: true })
      setValue('neighborhood', data.bairro, { shouldValidate: true })
      setValue('city', data.localidade, { shouldValidate: true })
      setValue('state', data.uf, { shouldValidate: true })
    })

    return () => {
      cancelled = true
    }
  }, [cepValue, setValue, clearErrors])

  const onSubmit = async (data: RegisterFormData) => {
    const result = await authRegister(data)
    if (!result.success && result.error) {
      setError('root', { message: result.error })
      return
    }
    onSuccess('register')
  }

  return (
    <div className="p-4 pb-6  md:p-5 h-full">
      {/* Header */}
      <div className="mb-3">
        <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">
          {t('register.title')}
        </h1>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          {t('register.subtitle')}
        </p>
      </div>

      <form className='pb-4' onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Name */}
            <div className="md:col-span-2">
              <Input
                compact
                label={t('register.nameLabel')}
                type="text"
                placeholder={t('register.namePlaceholder')}
                autoComplete="name"
                required
                error={errors.name?.message}
                {...register('name')}
              />
            </div>

            {/* Email */}
            <Input
              compact
              label={t('register.emailLabel')}
              type="email"
              placeholder={t('register.emailPlaceholder')}
              autoComplete="email"
              required
              error={errors.email?.message}
              {...register('email')}
            />

            {/* Password */}
            <Input
              compact
              label={t('register.passwordLabel')}
              type="password"
              placeholder={t('register.passwordPlaceholder')}
              autoComplete="new-password"
              required
              error={errors.password?.message}
              {...register('password')}
            />

            {/* Phone */}
            <Input
              compact
              label={t('register.phoneLabel')}
              type="tel"
              placeholder={t('register.phonePlaceholder')}
              autoComplete="tel"
              required
              error={errors.phone?.message}
              {...register('phone', {
                onChange: (e) => {
                  e.target.value = maskPhone(e.target.value)
                },
              })}
            />

            {/* CPF */}
            <Input
              compact
              label={t('register.cpfLabel')}
              type="text"
              placeholder={t('register.cpfPlaceholder')}
              required
              error={errors.cpf?.message}
              {...register('cpf', {
                onChange: (e) => {
                  e.target.value = maskCpf(e.target.value)
                },
              })}
            />
          </div>

          {/* Address section */}
          <div className="pt-0.5 space-y-2">
            <div className="flex items-center gap-1.5">
              <MapPin size={12} className="text-blue-500" />
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Endereço
              </span>
            </div>

            {/* CEP + City + UF */}
            <div className="grid grid-cols-3 gap-2">
              <div className="relative">
                <Input
                  compact
                  label={t('register.cepLabel')}
                  type="text"
                  placeholder={t('register.cepPlaceholder')}
                  required
                  error={
                    cepError
                      ? t('register.cepNotFound')
                      : errors.cep?.message
                  }
                  {...register('cep', {
                    onChange: (e) => {
                      e.target.value = maskCep(e.target.value)
                    },
                  })}
                />
                {cepLoading && (
                  <span className="absolute right-2 top-5 flex items-center gap-1 text-[0.6rem] text-slate-400 dark:text-slate-500">
                    <Loader2 size={11} className="animate-spin" />
                  </span>
                )}
              </div>
              <Input
                compact
                label={t('register.cityLabel')}
                type="text"
                required
                readOnly
                error={errors.city?.message}
                className="bg-slate-50 dark:bg-slate-800 cursor-not-allowed"
                {...register('city')}
              />
              <Input
                compact
                label={t('register.stateLabel')}
                type="text"
                required
                readOnly
                maxLength={2}
                error={errors.state?.message}
                className="bg-slate-50 dark:bg-slate-800 cursor-not-allowed uppercase"
                {...register('state')}
              />
            </div>

            {/* Street */}
            <div>
              <Input
                compact
                label={t('register.streetLabel')}
                type="text"
                required
                readOnly
                error={errors.street?.message}
                className="bg-slate-50 dark:bg-slate-800 cursor-not-allowed"
                {...register('street')}
              />
            </div>

            {/* Birth date + Neighborhood */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Input
                compact
                label={t('register.birthDateLabel')}
                type="date"
                required
                error={errors.birthDate?.message}
                {...register('birthDate')}
              />
              <Input
                compact
                label={t('register.neighborhoodLabel')}
                type="text"
                required
                readOnly
                error={errors.neighborhood?.message}
                className="bg-slate-50 dark:bg-slate-800 cursor-not-allowed"
                {...register('neighborhood')}
              />
            </div>

            {/* Complement + Number */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Input
                  compact
                  label={t('register.complementLabel')}
                  type="text"
                  placeholder={t('register.complementPlaceholder')}
                  error={errors.complement?.message}
                  {...register('complement')}
                />
              </div>
              <Input
                compact
                label={t('register.numberLabel')}
                type="text"
                placeholder={t('register.numberPlaceholder')}
                required
                error={errors.number?.message}
                {...register('number')}
              />
            </div>
          </div>
        </div>

        {/* Global error */}
        {errors.root && (
          <div className="mt-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3">
            <p className="text-sm text-red-600 dark:text-red-400">
              {t(errors.root.message!, { defaultValue: errors.root.message })}
            </p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isSubmitting ? t('register.loading') : t('register.submit')}
        </button>
      </form>
    </div>
  )
}
