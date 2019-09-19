const CopyPlugin = require('copy-webpack-plugin')
module.exports = plugins => {
    plugins.push(new CopyPlugin([{ from: 'src/assets', to: './', flatten: true }]))
    return plugins
}
