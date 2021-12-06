import '../src/scss/all.scss';

export const parameters = {
  actions: { argTypesRegex: "^(on[A-Z]|[a-z]\.bs\.).*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        'General',
        ['Introduction', 'Colors', 'Typography', 'Lists'],
        'Components',
        'Includes',
        ['GlobalHeader','LocalHeader','GlobalFooter','LocalFooter']
      ],
    },
  },
};