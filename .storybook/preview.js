import '../src/bootstrap/main.scss';

export const parameters = {
  actions: { argTypesRegex: "^(on[A-Z]|[a-z]\.bs\.).*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    transformSource: (src, context) => {
      const rendering = context.storyFn(context.args);
      if (typeof rendering === 'string') return rendering
      return rendering.innerHTML;
    }
  },
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="../static/fonts/fonts.css">
  `,
  options: {
    storySort: {
      order: ['General', ['Introduction', 'Colors', 'Typography', 'Lists'], 'Components', 'Includes', ['GlobalHeader','LocalHeader','GlobalFooter','LocalFooter']],
    },
  },
};