export default {
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
  ],
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:5000/api',
  },
  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
      { code: 'th', name: 'ไทย', iso: 'th-TH', file: 'th.json' },
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    },
    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },
  plugins: ['~/plugins/i18n.js'],
  router: {
    middleware: 'authRedirect',
  },
};