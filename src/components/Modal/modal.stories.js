import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/html';
import { addReadme } from 'storybook-readme/html';
import { action } from '@storybook/addon-actions';

import template from './modal.hbs';
import readme from './readme.md';
import render from '../../../.storybook/renderer';

const stories = storiesOf('Modal', module);
stories.addParameters({ readme: { sidebar: readme }, knobs: { escapeHTML: false } });
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
  const container = document.createElement('div');

  container.innerHTML = template({
    size: sizeClasses[sizeOptions.indexOf(size)],
    backdrop: select('Backdrop', [true, false, 'static'], true),
    title: text('Title', ''),
    kb: boolean('ESC closes the modal', true),
    body: text('Body', 'Are you sure?'),
    footer: text(
      'Footer',
      '<button type="button" class="btn btn-primary">Save changes</button>\n<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'
    )
  });

  const result = render(container.innerHTML);
  const modal = result.querySelector('.modal');

  [
    'show.bs.modal',
    'shown.bs.modal',
    'hide.bs.modal',
    'hidden.bs.modal'
  ].forEach((event) => {
    modal.addEventListener(event, function(e) { console.log(e); action(event)(e) })
  });

  return result;
});
