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
  plugins: ['~/plugins/axios.js', '~/plugins/i18n.js'],
  router: {
    middleware: 'authRedirect',
  },
  css: [
    '~/assets/css/global.css',
    '~/assets/css/tailwind.css'
  ],
  build: {
    extend(config) {
      // แก้ไข rule ของ SVG ที่มีอยู่เดิม
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))

      // เปลี่ยน rule นี้ให้จัดการเฉพาะไฟล์ภาพที่ไม่ใช่ SVG
      svgRule.test = /\.(png|jpe?g|gif|webp)$/i

      // เพิ่มกฎใหม่สำหรับการจัดการไฟล์ SVG ด้วย vue-svg-loader
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: 'vue-svg-loader',
            options: {
              svgo: {
                plugins: [
                  { removeViewBox: false }, // คงค่า viewBox ไว้เพื่อให้การปรับขนาด SVG ใช้งานได้
                ],
              },
            },
          },
        ],
      })
    }
  }
};