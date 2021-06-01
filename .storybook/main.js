module.exports = {
  stories: ['../src/components/**/*.stories.js'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.unshift({ test: /\.(hbs|handlebars)$/, loader: 'handlebars-loader' });
    return config;
  },
};