import { z } from 'zod'

/* ─── CPF validation algorithm ───────────────────────────────────── */
export function validateCpf(raw: string): boolean {
  const cpf = raw.replace(/\D/g, '')
  if (cpf.length !== 11) return false
  if (/^(\d)\1+$/.test(cpf)) return false // repeated digits

  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i)
  let rem = (sum * 10) % 11
  if (rem === 10 || rem === 11) rem = 0
  if (rem !== parseInt(cpf[9])) return false

  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i)
  rem = (sum * 10) % 11
  if (rem === 10 || rem === 11) rem = 0
  return rem === parseInt(cpf[10])
}

/* ─── Login schema ───────────────────────────────────────────────── */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'validation.required' })
    .email({ message: 'validation.invalidEmail' }),
  password: z
    .string()
    .min(1, { message: 'validation.required' })
    .min(8, { message: 'validation.minPassword' }),
  rememberMe: z.boolean(),
})

/* ─── Register schema ────────────────────────────────────────────── */
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'validation.required' })
    .min(2, { message: 'validation.minLength' }),
  email: z
    .string()
    .min(1, { message: 'validation.required' })
    .email({ message: 'validation.invalidEmail' }),
  password: z
    .string()
    .min(1, { message: 'validation.required' })
    .min(8, { message: 'validation.minPassword' }),
  phone: z
    .string()
    .min(1, { message: 'validation.required' })
    .refine((v) => v.replace(/\D/g, '').length >= 10, {
      message: 'validation.invalidPhone',
    }),
  cpf: z
    .string()
    .min(1, { message: 'validation.required' })
    .refine((v) => validateCpf(v), { message: 'validation.invalidCpf' }),
  birthDate: z.string().min(1, { message: 'validation.required' }),
  cep: z
    .string()
    .min(1, { message: 'validation.required' })
    .refine((v) => v.replace(/\D/g, '').length === 8, {
      message: 'validation.invalidCep',
    }),
  street: z.string().min(1, { message: 'validation.required' }),
  number: z.string().min(1, { message: 'validation.required' }),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, { message: 'validation.required' }),
  city: z.string().min(1, { message: 'validation.required' }),
  state: z
    .string()
    .min(1, { message: 'validation.required' })
    .length(2, { message: 'validation.stateLength' }),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
