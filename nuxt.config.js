export default {
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss'
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
  plugins: ['~/plugins/axios.js', '~/plugins/i18n.js', '~/plugins/toast.js',],
  router: {
    middleware: 'authRedirect',
  },
  css: [
    '~/assets/css/global.css',
    '~/assets/css/tailwind.css'
  ],
  build: {
    extend(config) {
      // Edit existing SVG rules
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))

      // Change this rule to only handle non-SVG image files.
      svgRule.test = /\.(png|jpe?g|gif|webp)$/i

      // Added new rules for handling SVG files with vue-svg-loader.
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: 'vue-svg-loader',
            options: {
              svgo: {
                plugins: [
                  { removeViewBox: false }, // Keep the viewBox value intact to make SVG scaling work.
                ],
              },
            },
          },
        ],
      })
    }
  }
};