import '../src/bootstrap/main.scss';

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
  },
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="../static/fonts/fonts.css">
  `
};