import '!style-loader!css-loader!sass-loader!../src/bootstrap/main.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    transformSource: (src, context) => {
      return context.storyFn(context.args).innerHTML;
    }
  }
}