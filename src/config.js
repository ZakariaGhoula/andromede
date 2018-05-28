require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Andromède et Persée',
    description: 'La maison Andromède et Persée considère la cérémonie du thé comme un hors temps, durant lequel chaque feuille de thé se déploie précieusement, parfumant l’atmosphère et envoûtant les convives. Ce moment est riche d’émotions, de partage et de beauté. En somme, c’est un tableau d’art.',
    head: {
      titleTemplate: '%s - Andromède et Persée',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Montserrat:200,300,400,600,700|Playfair+Display'
        },
      ],
      meta: [
        {name: 'description', content: 'La maison Andromède et Persée considère la cérémonie du thé comme un hors temps, durant lequel chaque feuille de thé se déploie précieusement, parfumant l’atmosphère et envoûtant les convives. Ce moment est riche d’émotions, de partage et de beauté. En somme, c’est un tableau d’art.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Andromède et Persée'},
        {property: 'og:image', content: 'https://andromedeetpersee.com/facebook/facebook.jpg'},
        {property: 'og:locale', content: 'fr_FR'},
        {property: 'og:title', content: 'Andromède et Persée'},
        {property: 'og:description', content: 'La maison Andromède et Persée considère la cérémonie du thé comme un hors temps, durant lequel chaque feuille de thé se déploie précieusement, parfumant l’atmosphère et envoûtant les convives. Ce moment est riche d’émotions, de partage et de beauté. En somme, c’est un tableau d’art.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@andromede.persee'},
        {property: 'og:creator', content: '@andromede.persee'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }, assets: {
      javascript: {
        main: [
          {src: 'https://js.stripe.com/v3/'}
        ]
      }
    }
  }
}, environment);
