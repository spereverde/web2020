import '@storybook/html';
import template from './LocalFooter.hbs';
import data from '../../includes/data';

const variants = ['general', 'kulak', 'intranet', 'hosted-by', 'landingpage'];
const langs = ['nl', 'en'];

function LocalFooter({ organization, language }) {
  return template((data.langs[organization][language]));
};

export const Variants = LocalFooter.bind({});

Variants.args = {
  organization: variants[0],
  language: langs[0]
};

export default {
  title: 'Includes/LocalFooter',
  component: LocalFooter,
  argTypes: {
    organization: {
      control: 'select',
      options: variants,
      table: { defaultValue: { summary: false }}
    },
    language: {
      control: 'radio',
      options: langs
    }
  }
};