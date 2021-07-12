module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: ['../src/**/*.stories.@(js|mdx)'],
  addons: [
    { name: '@storybook/addon-essentials',
      options: {
        configureJSX: true,
        babelOptions: {
          overrides: {
            plugins: [
              ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
            ]
          }
        },
        sourceLoaderOptions: {},
        transcludeMarkdown: true,
      },
    },
    '@storybook/addon-links',
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.unshift(
      // enables loading Handlebars templates
      {
        test: /\.(hbs|handlebars)$/,
        loader: 'handlebars-loader'
      },
      // enables showing JSDoc comments in Docs output
      {
        test: /\.stories\.js$/,
        use: [{ loader: "story-description-loader" }],
      }
    );

    config.module.rules.push(
      // enables recompiling scss on-the-fly
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: require('path').resolve(__dirname, '../'),
      }
    );

    return config;
  },
};