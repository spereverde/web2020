import '@storybook/html';
import template from './global-footer.hbs';
import render from '../../../.storybook/renderer';
import data from '../../includes/data';

const variants = ['general', 'kulak', 'intranet', 'hosted-by', 'landingpage'];
const langs = ['nl', 'en'];

function GlobalFooter({ organization, language }) {
  return render(template(data.langs[organization][language]));
};

export const Variants = GlobalFooter.bind({});

Variants.args = {
  organization: variants[0],
  language: langs[0]
};

export default {
  title: 'Includes/GlobalFooter',
  component: GlobalFooter,
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