import '@storybook/html';
import render from '../../../.storybook/renderer';
import template from './KulHeader.hbs';

const defaultArgs = {
  org_url: 'https://kuleuven.be/kuleuven',
  title: '',
  backlink_text: 'KU Leuven Home',
  nav: null
}

function KulHeader(args = {}) {
  return render(template(Object.assign({}, defaultArgs, args)));
}

export const Standard = KulHeader.bind({});

export const HeaderWithTitle = KulHeader.bind({});
HeaderWithTitle.args = {
  title: 'Faculteit geneeskunde'
}


export const HeaderWithNavigation = KulHeader.bind({});
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
  title: 'Includes/KULHeader',
  component: KulHeader,
  argTypes: {
    title: {
      control: 'text',
      table: { defaultValue: { summary: defaultArgs.title }}
    },
    backlink_text: {
      control: 'text',
      table: { defaultValue: { summary: defaultArgs.backlink_text }}
    },
    nav: {
      control: 'json',
      table: { defaultValue: { summary: defaultArgs.nav }}
    }
  }
};