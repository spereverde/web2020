import '@storybook/html';
import render from '../../../.storybook/renderer';

const htmlTag = {
  options: [
    'button',
    'a',
    'input'
  ]
}

const buttonVariants = {
  options: [
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
    'ext'
  ]
};

const buttonSizes = {
  options: [
    '',
    'sm',
    'lg'
  ]
};

/** @see https://getbootstrap.com/docs/5.0/components/buttons */
const Button = function ({ variant, size, disabled, active, tag, outline }) {
  const html = `${size} ${variant} button`;

  const className = [
    'btn',
    ` btn-${outline ? 'outline-' : ''}${variant}`,
    size ? ` btn-${size}` : '',
    !disabled && active ? ' active' : '',
    disabled && tag === 'a' ? ' disabled' : ''
  ].join('');
  
  const elem = document.createElement(tag);

  elem.className = className;

  switch (tag) {
    case 'input':
      elem.type = 'submit';
      elem.value = html;
      if (disabled) elem.disabled = true;
      break;
    case 'a':
      elem.href = '#';
      elem.innerHTML = html;
      elem.setAttribute('role','button');
      break;
    case 'button':
      elem.type = 'button';
      elem.innerHTML = html;
      if (disabled) elem.disabled = true;
      break;
  }

  if (active) {
    elem.dataset['bsToggle'] = 'button';
    elem.setAttribute('aria-pressed', 'true');
  }

  if (disabled) {
    elem.setAttribute('aria-disabled', 'true');
  }

  const result = render(elem.outerHTML);
  return result;
};


export const Variants = Button.bind({});

Variants.args = {
  variant: buttonVariants.options[0],
  size: buttonSizes.options[0],
  tag: htmlTag.options[0],
  active: false,
  disabled: false,
  outline: false
}

export const BlockButtons = Button.bind({});


export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    tag: {
      options: htmlTag.options,
      control: { type: 'radio' },
      description: 'HTML tag',
      table: { defaultValue: { summary: htmlTag.options[0] }}
    },
    size: {
      options: buttonSizes.options,
      control: { type: 'select' },
      table: { defaultValue: { summary: buttonSizes.options[0] }}
    },
    variant: {
      options: buttonVariants.options,
      control: 'select',
      description: 'Color variant',
      table: { defaultValue: { summary: buttonVariants.options[0] }}
    },
    outline: {
      control: 'boolean',
      table: { defaultValue: { summary: false }}
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: false }}
    },
    active: {
      control: 'boolean',
      table: { defaultValue: { summary: false }}
    }
  }
};