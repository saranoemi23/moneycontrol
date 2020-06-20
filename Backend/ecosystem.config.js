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