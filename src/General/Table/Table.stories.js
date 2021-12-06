import template from './Table.hbs';

// set defaults for all arguments
const defaultArgs = {
  headers: [],
  data: [[]],
  modifiers: [],
  caption: ''
};

const dummyData = {
  headers: ['First name', 'Last Name', 'Company <i class="material-icons">expand_more</i>', 'Phone', 'E-mail', 'Language'],
  data: [
    [
      "Kathrine",
      "Reyes",
      "Unisure",
      "(808) 595-3142",
      "kathrinereyes@unisure.com",
      "en"
    ],
    [
      "Kathrine",
      "Reyes",
      "Unisure",
      "(808) 595-3142",
      "kathrinereyes@unisure.com",
      "en"
    ],
    [
      "Kathrine",
      "Reyes",
      "Unisure",
      "(808) 595-3142",
      "kathrinereyes@unisure.com",
      "en"
    ]
  ]
};

function Table(args) {
  return template(({ ...defaultArgs, ...args }));
}

export const Variants = (args) => 
    Table({
      data: args.data,
      headers: args.headers,
      modifiers: args.color
    })
);

Variants.args = {
  ...dummyData
};

/**
 * A table can have any background colors
 */
export const BackgroundColors = () => 
  [ 
    Table({
      headers: ['First','Second'],
      data: [
        ['Cell 1', 'Cell 2'],
        ['Cell 1', 'Cell 2']
      ],
      modifiers: ['dark']
    }),
    Table({
      headers: ['First','Second'],
      data: [
        ['Cell 1', 'Cell 2'],
        ['Cell 1', 'Cell 2']
      ],
      modifiers: ['success']
    })
  ].join('\n')
);

/**
 * A table can be striped
 */
export const Striped = () => 
    Table({
      headers: ['First','Second'],
      data: [
        ['Cell 1', 'Cell 2'],
        ['Cell 1', 'Cell 2']
      ],
      modifiers: ['striped']
    })
);

export default {
  title: 'General/Table',
  component: Table,
  argTypes: {
    headers: {
      control: 'array',
      table: { defaultValue: { summary: '[]' }}
    },
    data: {
      control: 'array',
      description: 'An array in which every item is an array representing a row',
      table: { defaultValue: { summary: '[]' }}
    },
    modifiers: {
      control: 'array',
      description: 'A list of modifier classes, e.g. a color (primary, success, striped)',
      table: { defaultValue: { summary: defaultArgs.modifiers }}
    },
    caption: {
      control: 'text',
      description: 'A caption to describe the table contents',
      table: { defaultValue: { summary: '' }}
    }
  },
  parameters: {

  }
}