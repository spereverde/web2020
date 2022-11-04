// import Button from './Button';

const htmlTag = {
  options: ['button', 'a', 'input']
};

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
    'brand'
  ]
};

const buttonSizes = {
  options: ['', 'sm', 'lg']
};

/** @see https://getbootstrap.com/docs/5.0/components/buttons */
function Button({ variant, size, disabled, active, tag, outline, classes }) {
  const html = `${size} ${variant} button`;

  const className = [
    'btn',
    `btn-${outline ? 'outline-' : ''}${variant}`,
    size ? `btn-${size}` : '',
    !disabled && active ? 'active' : '',
    disabled && tag === 'a' ? 'disabled' : ''
  ]
    .concat(classes)
    .filter((str) => !!str)
    .join(' ');

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
      elem.setAttribute('role', 'button');
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

  const result = elem.outerHTML;
  return result;
}

export const Variants = Button.bind({});

Variants.args = {
  variant: buttonVariants.options[0],
  size: buttonSizes.options[0],
  tag: htmlTag.options[0],
  active: false,
  disabled: false,
  outline: false,
  classes: []
};

export const BlockButtons = (args) => {
  return [Button(args).outerHTML].join('\n');
};

BlockButtons.args = {
  ...Variants.args,
  classes: ['w-100', 'd-block']
};

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    tag: {
      options: htmlTag.options,
      control: { type: 'radio' },
      description: 'HTML tag',
      table: { defaultValue: { summary: htmlTag.options[0] } }
    },
    size: {
      options: buttonSizes.options,
      control: { type: 'select' },
      table: { defaultValue: { summary: buttonSizes.options[0] } }
    },
    variant: {
      options: buttonVariants.options,
      control: 'select',
      description: 'Color variant',
      table: { defaultValue: { summary: buttonVariants.options[0] } }
    },
    outline: {
      control: 'boolean',
      table: { defaultValue: { summary: false } }
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: false } }
    },
    active: {
      control: 'boolean',
      table: { defaultValue: { summary: false } }
    },
    classes: {
      control: 'json',
      description: 'An array of utility classes to apply',
      table: { defaultValue: { summary: [] } }
    }
  }
};
