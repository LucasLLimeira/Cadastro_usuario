'use client'

import { forwardRef, useState, type InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  compact?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, type, compact = false, className = '', ...props }, ref) => {
    const { t } = useTranslation('common')
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    return (
      <div className="flex flex-col gap-0.5">
        <label className={compact ? 'text-xs font-medium text-slate-700 dark:text-slate-300' : 'text-sm font-medium text-slate-700 dark:text-slate-300'}>
          {label}
          {props.required && (
            <span className="ml-0.5 text-red-500 dark:text-red-400">*</span>
          )}
        </label>

        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={[
              'w-full rounded-lg border text-sm transition-all duration-200 outline-none',
              compact ? 'px-3 py-1.5' : 'px-4 py-3 rounded-xl',
              'bg-white dark:bg-slate-700',
              'text-slate-800 dark:text-slate-100',
              'placeholder-slate-400 dark:placeholder-slate-500',
              error
                ? 'border-red-400 dark:border-red-500 focus:ring-2 focus:ring-red-400/40'
                : 'border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 dark:focus:border-blue-400',
              isPassword ? 'pr-9' : '',
              className,
            ].join(' ')}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPassword ? t('hidePassword') : t('showPassword')}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              {showPassword ? <EyeOff size={compact ? 15 : 18} /> : <Eye size={compact ? 15 : 18} />}
            </button>
          )}
        </div>

        <p
          className={[
            'text-xs leading-none min-h-3 transition-colors',
            error
              ? 'text-red-500 dark:text-red-400'
              : 'text-slate-400 dark:text-slate-500',
          ].join(' ')}
          aria-live="polite"
        >
          {error
            ? t(error, { defaultValue: error })
            : hint || '\u00A0'}
        </p>
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
