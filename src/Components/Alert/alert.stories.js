import '@storybook/html';
import template from './alert.html';
import render from '../../../.storybook/renderer';

const variants = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'info',
  'warning',
  'danger',
  'contact',
  'brand',
  'gray'
];

function Alert({ variant, text }) {
  const dom = render(template);
  dom.querySelector('.alert').className = 'alert alert-' + variant;
  dom.querySelector('.alert').textContent = text;
  return dom;
};

export const Variants = Alert.bind({});

Variants.args = {
  variant: variants[0],
  text: 'Download'
};

export default {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    variant: {
      control: 'select',
      options: variants
    },
    text: {
      control: 'text'
    }
  }
};