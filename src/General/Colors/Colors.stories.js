import render from '../.storybook/renderer';

const themeColors = {
  primary: '#08a7eb',
  secondary: '#1d8db0',
  tertiary: '#00446e',
  success: '#198754',
  info: '#056188',
  warning: '#fd7e14',
  danger: '#dc3545',
  light: '#f8f9fa',
  dark: '#212529',
  brand: '#008dad',
  contact: '#ffc107'
};

const themeColorsHTML = fn => [
  '<div class="row">',
  Object.keys(themeColors).map(fn).join('\n'),
  '</div>'
].join('\n');

/**
 * You can use all these named colors in utility classes like `bg-brand` or `text-primary`, or in a CSS rule like `color: var(--kul-<colorname>)`.
 */

export function Colors() {
  const dom = render(themeColorsHTML(name => `  <div class="col-xs-2 col-md-1 px-1 py-4 text-white text-center bg-${name}">${name}</div>`));
  return dom;
};

/**
 * Links can also be colored any of the theme colors, using the class `link-<color>`.
 */

export const ColoredLinks = () => {
  const dom = render(themeColorsHTML(name => `  <a href="#" class="link-${name}">${name} link</a>`));
  return dom;
}

export default {
  title: 'General/Colors',
  component: Colors,
  parameters: {}
};  