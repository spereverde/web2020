import { storiesOf } from '@storybook/html';
import { addReadme } from 'storybook-readme/html';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import template from './alert.html';
import readme from './readme.md';
import render from '../../../.storybook/renderer';

const stories = storiesOf('Alert', module);
stories.addParameters({ readme: { sidebar: readme } });
stories.addDecorator(addReadme);
stories.addDecorator(withKnobs);

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

stories.add('Alert', pms => {
  const container = document.createElement('div');
  container.innerHTML = template;
  container.querySelector('.alert').className = 'alert alert-' + select('Variant', variants, variants[0]);
  container.querySelector('.alert').textContent = text('Text', 'Download');
  return render(container.innerHTML);
});
