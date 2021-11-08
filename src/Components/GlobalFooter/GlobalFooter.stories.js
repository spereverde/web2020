import '@storybook/html';
import template from './GlobalFooter.hbs';
import render from '../../../.storybook/renderer';
import data from '../../includes/data';

const variants = ['general', 'kulak', 'intranet', 'hosted-by', 'landingpage'];
const langs = ['nl', 'en'];

function GlobalFooterComponent({ organization, language }) {
  return render(template(data.langs[organization][language]));
};

export const GlobalFooter = GlobalFooterComponent.bind({});

GlobalFooter.args = {
  organization: variants[0],
  language: langs[0]
};

export default {
  title: 'Includes/GlobalFooter',
  component: GlobalFooterComponent,
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