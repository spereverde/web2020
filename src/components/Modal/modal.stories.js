import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/html';
import { addReadme } from 'storybook-readme/html';
import { action } from '@storybook/addon-actions';
import $ from 'jquery';

import template from './modal.html';
import readme from './readme.md';
import render from '../../../.storybook/renderer';

const stories = storiesOf('Modal', module);
stories.addParameters({ readme: { sidebar: readme } });
stories.addDecorator(addReadme);
stories.addDecorator(withKnobs);

const sizes = {
  small: 'modal-sm',
  large: 'modal-lg'
};
const sizeOptions = Object.keys(sizes);
const sizeClasses = Object.values(sizes);

stories.add('Modal', () => {
  const size = select('Size', sizeOptions, sizeOptions[0]);
  const kb = boolean('ESC closes the modal', true);

  const container = document.createElement('div');
  container.innerHTML = template;
  container.querySelector('.modal').dataset.keyboard = kb;
  container.querySelector('.modal-dialog').className = 'modal ' + sizes[size];
  container.querySelector('.modal-body').innerHTML = text('Text', 'Download');
  $('.modal').modal();
  return render(container.innerHTML);
});
