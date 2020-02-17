import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import template from './alert.html';
import { storiesOf } from '@storybook/html';
import { addReadme } from 'storybook-readme/html';
import AlertReadme from './readme.md';
import render from '../../../.storybook/renderer';

const stories = storiesOf('Alert', module);
stories.addDecorator(withKnobs);
stories.addParameters({
  readme: {
    sidebar: AlertReadme
  }
});
stories.addDecorator(addReadme);

const variants = ['primary', 'secondary', 'tertiary'];

stories.add('Alert', pms => {
  console.log(pms);
  const container = document.createElement('div');
  container.innerHTML = template;
  container.querySelector('.alert').className = 'alert alert-' + select('Variant', variants, variants[0]);
  container.querySelector('.alert').textContent = text('Text', 'Download');
  return render(container.innerHTML);
});
