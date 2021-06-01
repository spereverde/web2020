import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/html';
import { addReadme } from 'storybook-readme/html';
import { action } from '@storybook/addon-actions';
import Handlebars from 'handlebars';

import template from './button.html';
import readme from './readme.md';
import render from '../../../.storybook/renderer';
import $ from 'jquery';

const stories = storiesOf('Button', module);
stories.addParameters({ readme: { sidebar: readme }, knobs: { escapeHTML: false } });
stories.addDecorator(addReadme);
stories.addDecorator(withKnobs);

const htmlTag = {
  data: [
    ''
  ]
}

const buttonTypes = {
  data: [
    'regular',
    'primary',
    'secondary',
    'tertiary',
    'link',
    'success',
    'info',
    'warning',
    'danger',
    'ext'
  ],
  labels: [
    'Regular',
    'Primary',
    'Secondary',
    'Tertiary',
    'Link',
    'Success',
    'Info',
    'Warning',
    'Danger',
    'External link'
  ]
};

const buttonSizes = {
  data: [
    '',
    'sm',
    'lg'
  ],
  labels: [
    'Standard',
    'Small',
    'Large'
  ]
};

stories.add('Button', () => {
  const container = document.createElement('div');

  // options
  const disabled = boolean('Disabled', false);
  const typeKnob = select('Type', buttonTypes.labels, buttonTypes.labels[0]);
  const type = buttonTypes.data[buttonTypes.labels.indexOf(typeKnob)];

  const sizeKnob = select('Size', buttonSizes.labels, buttonSizes.labels[0]);
  const size = buttonSizes.data[buttonSizes.labels.indexOf(sizeKnob)];

  const text = `${sizeKnob} ${typeKnob} button`;
  console.log(size, type)

  container.innerHTML = Handlebars.compile(template)({ type, size, text, disabled });

  const result = render(container.innerHTML);
  return result;
});