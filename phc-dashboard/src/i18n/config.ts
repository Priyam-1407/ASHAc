import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      app: {
        title: 'PHC Dashboard',
        subtitle: 'Primary Health Center Insights',
      },
      nav: {
        dashboard: 'Dashboard Overview',
        patients: 'Patient Analytics',
        asha: 'ASHA Worker Analytics',
        reports: 'Reports & Analytics',
        inventory: 'Inventory & Supplies',
        settings: 'Settings',
      },
      auth: {
        welcome: 'Welcome back',
        instruction: 'Use your PHC admin credentials to continue',
        username: 'Username',
        password: 'Password',
        login: 'Login to Dashboard',
      },
    },
  },
  hi: {
    translation: {
      app: {
        title: 'पीएचसी डैशबोर्ड',
        subtitle: 'प्राथमिक स्वास्थ्य केंद्र जानकारी',
      },
      nav: {
        dashboard: 'डैशबोर्ड अवलोकन',
        patients: 'मरीज विश्लेषण',
        asha: 'आशा कार्यकर्ता विश्लेषण',
        reports: 'रिपोर्ट व विश्लेषण',
        inventory: 'भंडार व आपूर्ति',
        settings: 'सेटिंग्स',
      },
      auth: {
        welcome: 'वापसी पर स्वागत है',
        instruction: 'जारी रखने के लिए अपनी पीएचसी साख उपयोग करें',
        username: 'उपयोगकर्ता नाम',
        password: 'पासवर्ड',
        login: 'डैशबोर्ड में लॉगिन करें',
      },
    },
  },
  od: {
    translation: {
      app: {
        title: 'ପିଏଚସି ଡାଶବୋର୍ଡ',
        subtitle: 'ପ୍ରାଥମିକ ସ୍ୱାସ୍ଥ୍ୟ କେନ୍ଦ୍ର ଜ୍ଞାନ',
      },
      nav: {
        dashboard: 'ଡାଶବୋର୍ଡ ସାରାଂଶ',
        patients: 'ରୋଗୀ ବିଶ୍ଳେଷଣ',
        asha: 'ଆଶା କର୍ମୀ ବିଶ୍ଳେଷଣ',
        reports: 'ରିପୋର୍ଟ ଏବଂ ବିଶ୍ଳେଷଣ',
        inventory: 'ଭଣ୍ଡାର ଏବଂ ଯୋଗାଣ',
        settings: 'ସେଟିଂସ୍',
      },
      auth: {
        welcome: 'ପୁଣି ସ୍ୱାଗତ',
        instruction: 'ଜାରି ରଖିବା ପାଇଁ ଆପଣଙ୍କ ପିଏଚସି ସନଦ ବ୍ୟବହାର କରନ୍ତୁ',
        username: 'ଉପଯୋଗକର୍ତ୍ତା ନାମ',
        password: 'ପାସୱାର୍ଡ',
        login: 'ଡାଶବୋର୍ଡକୁ ଲଗଇନ୍ କରନ୍ତୁ',
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n


