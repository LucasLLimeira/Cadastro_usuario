import type { ViaCepResponse } from '@/types/user'

export async function fetchAddressByCep(
  cep: string
): Promise<ViaCepResponse | null> {
  const stripped = cep.replace(/\D/g, '')
  if (stripped.length !== 8) return null

  try {
    const res = await fetch(`https://viacep.com.br/ws/${stripped}/json/`)
    if (!res.ok) return null
    const data: ViaCepResponse = await res.json()
    if (data.erro) return null
    return data
  } catch {
    return null
  }
}
