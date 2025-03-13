const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

config.transformer.minifierConfig = {
  compress: {
    drop_console: ['debug'], // Removes only console.debug
  },
};

module.exports = withNativeWind(config, { input: './src/global.css' });
