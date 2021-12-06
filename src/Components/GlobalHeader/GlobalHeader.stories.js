import '@storybook/html';
import template from './GlobalHeader.hbs';

const defaultArgs = {
  org_url: 'https://kuleuven.be/kuleuven',
  backlink_text: 'KU Leuven Home'
}

function GlobalHeaderComponent(args = {}) {
  return template((Object.assign({}, defaultArgs, args)));
}

export const GlobalHeader = GlobalHeaderComponent.bind({});

export default {
  title: 'Includes/GlobalHeader',
  component: GlobalHeaderComponent,
  argTypes: {
    title: {
      control: 'text',
      table: { defaultValue: { summary: defaultArgs.title }}
    },
    backlink_text: {
      control: 'text',
      table: { defaultValue: { summary: defaultArgs.backlink_text }}
    }
  }
};