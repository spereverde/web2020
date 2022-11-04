import Badge from './Badge';

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

export const Variants = ({ contents, bgcolor, color }) => {
  return Badge({
    contents: contents,
    modifiers: [color ? `text-${color}` : '', bgcolor ? `bg-${bgcolor}` : '']
  });
};

Variants.args = {
  contents: 'Unread',
  bgcolor: themeVariants[0],
  color: ''
};

/**
 * A badge can have any background color
 */
export const BackgroundColors = () => {
  return themeVariants
    .map((variant) =>
      Badge({
        contents: 'Unread',
        modifiers: [`text-${variant.match(/^link|light$/) ? 'dark' : ''}`, `bg-${variant}`]
      })
    )
    .join('\n');
};

/**
 * A badge can have an icon
 */
export const BadgeWithIcon = () =>
  [
    Badge({
      contents: 'Unlock <i class="material-icons">lock</i>',
      modifiers: ['bg-tertiary']
    }),
    Badge({
      contents: '<i class="material-icons">error_outline</i> important',
      modifiers: ['bg-primary']
    })
  ].join('\n');

export const CampusBadge = () =>
  `<ul class="list-unstyled campus-labels">
  ${['Alle campussen buiten Leuven', 'Campussen Leuven', 'Campus Brussel', 'Campus Sint-Lucas Gent']
    .map(
      (label) =>
        '<li>' +
        Badge({
          contents: `<i class="material-icons">place</i>${label}`,
          modifiers: ['bg-tertiary']
        }) +
        '</li>'
    )
    .join('')}
</ul>`;

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    contents: {
      control: 'text',
      table: { defaultValue: { summary: defaultArgs.contents } }
    },
    bgcolor: {
      control: 'select',
      options: themeVariants,
      table: { defaultValue: { summary: defaultArgs.bgcolor } }
    },
    color: {
      control: 'select',
      options: themeVariants,
      table: { defaultValue: { summary: defaultArgs.color } }
    }
  },
  parameters: {}
};
