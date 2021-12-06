import '@storybook/html';
import template from './Modal.hbs';
import { Modal as bsModal } from 'bootstrap';

const sizeOptions = [
  '',
  'modal-sm',
  'modal-lg'
];
const backdropOptions = [
  true,
  false,
  'static'
];

const bsEvents = [
    'show.bs.modal',
    'shown.bs.modal',
    'hide.bs.modal',
    'hidden.bs.modal'
  ];

function Modal(options) {
  const result = template((options));
  const modal = result.querySelector('.modal');
  return result;
};

/**
 * Also see [Bootstrap docs](https://getbootstrap.com/docs/5.0/components/modal/)
 */
export const Variants = Modal.bind({});

Variants.args = {
  size: '',
  backdrop: false,
  kb: false,
  title: 'Confirm action',
  body: 'Are you sure?',
  footer: '<button type="button" class="btn btn-primary">Save changes</button>\n<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'
};

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: { 
    actions: {
      handles: bsEvents.map(evt => `${evt} .modal`)
    }
  },
  argTypes: {
    backdrop: {
      options: backdropOptions,
      control: { type: 'select' },
      description: 'Backdrop',
      table: { defaultValue: { summary: backdropOptions[0] }}
    },
    size: {
      options: sizeOptions,
      control: { type: 'radio' },
      table: { defaultValue: { summary: sizeOptions[0] }}
    },
    kb: {
      control: 'boolean',
      description: 'Esc closes the modal',
      table: { defaultValue: { summary: false }}
    },
    title: {
      control: 'text',
      description: 'Title HTML',
      table: { defaultValue: { summary: '' }}
    },
    body: {
      control: 'text',
      description: 'Body HTML',
      table: { defaultValue: { summary: '' }}
    },
    footer: {
      control: 'text',
      description: 'Footer HTML',
      table: { defaultValue: { summary: '' }}
    },
  }
};