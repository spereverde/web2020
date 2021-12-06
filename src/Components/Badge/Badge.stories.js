import '@storybook/html';
import template from './Badge.hbs';
import render from '../../../.storybook/renderer';

// set defaults for all arguments
const defaultArgs = {
  contents: '',
  bgcolor: '',
  color: ''
};

const themeVariants = [
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
];

function Badge(args) {
  return render(template({ ...defaultArgs, ...({
    ...args,
    modifiers: [
      args.color ? `text-${args.color}` : '',
      args.bgcolor ? `bg-${args.bgcolor}` : ''
    ].join(' ').replace(/\s+/g, ' ')
  }) }))
}

export const Variants = (args) => render(
    Badge({
      contents: args.contents,
      bgcolor: args.bgcolor,
      color: args.color
    }).innerHTML
);

Variants.args = {
  contents: 'Unread',
  bgcolor: themeVariants[0],
  color: ''
};


/**
 * A badge can have any background colors
 */
export const BackgroundColors = () => render(
  themeVariants.map(variant => 
    Badge({
      contents: 'Unread',
      bgcolor: variant,
      color: variant.match(/^link|light$/) ? 'dark' : ''
    }).innerHTML
  ).join('\n')
);

/**
 * A badge can have an icon
 */
export const BadgeWithIcon = () => render(
  [
    Badge({
      contents: 'Unlock <i class="material-icons">lock</i>',
      bgcolor: 'tertiary'
    }).innerHTML,
    Badge({
      contents: '<i class="material-icons">error_outline</i> important',
      bgcolor: 'primary'
    }).innerHTML
  ].join('\n')
);

export const CampusBadge = (args) => render(
`<ul class="list-unstyled campus-labels text-capitalize">
  <li><span class="badge bg-tertiary"><i class="material-icons">place</i> Alle campussen buiten Leuven</span></li>
  <li><span class="badge bg-tertiary"><i class="material-icons">place</i> Campussen Leuven</span></li>
  <li><span class="badge bg-tertiary"><i class="material-icons">place</i> Campus Brussel</span></li>
  <li><span class="badge bg-tertiary"><i class="material-icons">place</i> Campus Sint-Lucas Gent</span></li>
</ul>`
);

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    contents: {
      control: 'text',
      table: { defaultValue: { summary: defaultArgs.contents }}
    },
    bgcolor: {
      control: 'select',
      options: themeVariants,
      table: { defaultValue: { summary: defaultArgs.bgcolor }}
    },
    color: {
      control: 'select',
      options: themeVariants,
      table: { defaultValue: { summary: defaultArgs.color }}
    }
  },
  parameters: {

  }
}