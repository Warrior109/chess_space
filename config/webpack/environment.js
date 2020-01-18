const { environment } = require('@rails/webpacker')

environment.loaders.append('graphql', {
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  use: 'webpack-graphql-loader'
});

module.exports = environment
