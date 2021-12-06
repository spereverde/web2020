import '@storybook/html';
import template from './LocalHeader.hbs';

const defaultArgs = {
  title: 'Faculteit <x>',
  nav: null
}

function LocalHeader(args = {}) {
  return template((Object.assign({}, defaultArgs, args)));
}

export const Standard = LocalHeader.bind({});

export const HeaderWithTitle = LocalHeader.bind({});
HeaderWithTitle.args = {
  title: 'Faculteit geneeskunde'
}


export const HeaderWithNavigation = LocalHeader.bind({});
HeaderWithNavigation.args = {
  title: 'Faculteit bio-ingenieurswetenschappen',
  nav: [
    { link: 'https://www.biw.kuleuven.be/studeren/index', label: 'Studeren', active: true },
    { link: 'https://www.biw.kuleuven.be/onderzoek/index', label: 'Onderzoek' },
    { link: 'https://www.biw.kuleuven.be/samenwerken-met-de-faculteit/index', label: 'Samenwerken met de faculteit' },
    { link: 'https://www.biw.kuleuven.be/nws/nieuws-en-agenda', label: 'Nieuws en agenda' },
    { link: 'https://www.biw.kuleuven.be/over-fbiw/index', label: 'Over de faculteit' },
  ]
};

export default {
  title: 'Includes/LocalHeader',
  component: LocalHeader,
  argTypes: {
    title: {
      control: 'text',
      table: { defaultValue: { summary: defaultArgs.title }}
    },
    nav: {
      control: 'json',
      table: { defaultValue: { summary: defaultArgs.nav }}
    }
  }
};