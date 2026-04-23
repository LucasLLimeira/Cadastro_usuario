export interface Address {
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  phone: string
  cpf: string
  birthDate: string
  address: Address
  createdAt: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone: string
  cpf: string
  birthDate: string
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}

export interface Session {
  userId: string
  email: string
  name: string
}

export interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}
