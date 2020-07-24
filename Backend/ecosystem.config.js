// correr la app con pm2 modo prod
module.exports = {
  apps : [{
    name: "money",
    script: 'index.js',
    watch: '.' ,
    env: {
        NODE_ENV: 'production'
    }
  },],

};