import '@storybook/html';
import render from '../../../.storybook/renderer';
import template from './Block.hbs';

function Block(options) {
  const result = render('<div style="width: 500px; max-width: 100%;">' + template({
    title: options['Title'],
    subtitle: options['Subtitle'],
    body: options['Body text'],
    bgcolor: options['bgcolor'],
    leftImg: options.variant === 'left-img'
  }) + '</div>');

  return result;
};

export const Variants = Block.bind({});

Variants.args = {
  'Title': 'Block title',
  'Subtitle': 'Block subtitle',
  'Body text': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
  'bgcolor': ''
};

export const WithImageLeftAligned = Block.bind({});

WithImageLeftAligned.args = { ...Variants.args, variant: 'left-img' };

export default {
  title: 'Components/Blocks',
  component: Block,
  argTypes: {
    'Title': {
      control: 'text',
      table: { defaultValue: { summary: '' }}
    },
    'Subtitle': {
      control: 'text',
      table: { defaultValue: { summary: '' }}
    },
    'Body text': {
      control: 'text',
      table: { defaultValue: { summary: '' }}
    },
    'bgcolor': {
      control: 'select',
        options: [
          '',
          'primary',
          'secondary',
          'tertiary',
          'link',
          'success',
          'info',
          'warning',
          'danger',
          'light',
          'dark',
          'brand'
        ],
      description: 'Background color',
      table: { defaultValue: { summary: '' }}
    }
  }
};