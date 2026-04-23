import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ptBRAuth from '@/locales/pt-BR/auth.json'
import ptBRCommon from '@/locales/pt-BR/common.json'
import enUSAuth from '@/locales/en-US/auth.json'
import enUSCommon from '@/locales/en-US/common.json'

const savedLanguage =
  typeof window !== 'undefined'
    ? (localStorage.getItem('app_language') ?? 'pt-BR')
    : 'pt-BR'

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      'pt-BR': { auth: ptBRAuth, common: ptBRCommon },
      'en-US': { auth: enUSAuth, common: enUSCommon },
    },
    lng: savedLanguage,
    fallbackLng: 'pt-BR',
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  })
}

export default i18n
