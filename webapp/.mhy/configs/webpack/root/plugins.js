const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = plugins => {
    plugins.push(new CopyPlugin([{ from: path.resolve(process.cwd(), '../game/src/assets'), to: './', flatten: true }]))
    return plugins
}
