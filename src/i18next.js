import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import english from '../locales/en.json';
import russian from '../locales/ru.json';
import uzbek from '../locales/uz.json';

i18n
  .use(initReactI18next) // подключение react-i18next
  .init({
    compatibilityJSON: 'v3',       
    fallbackLng: 'uz',             
    lng: 'uz',                     
    resources: {
      en: { translation: english },
      ru: { translation: russian },
      uz: { translation: uzbek }
    },
    interpolation: {
      escapeValue: false, 
    }
  });

export default i18n;
