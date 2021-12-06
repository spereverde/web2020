import '@storybook/html';
import template from './Tabs.hbs';

const bsEvents = [
  'show.bs.tab',
  'shown.bs.tab',
  'hide.bs.tab',
  'hidden.bs.tab'
];

const defaultArgs = {
  items: [],
  pills: false
};

function TabsComponent(args) {
  return template(({ ...defaultArgs, ...args }))
}

/**
 * More info on tabs in the [bootstrap documentation](https://getbootstrap.com/docs/5.0/components/navs-tabs/#tabs) and the [javascript behaviour](https://getbootstrap.com/docs/5.0/components/navs/#javascript-behavior)
 */
export const Tabs = TabsComponent.bind({});
Tabs.args = {
  pills: false,
  items: [
    {
      id: 'onderzoekstekst',
      label: 'Onderzoekstekst',
      active: true,
      contents: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: 'projecten',
      label: 'Projecten',
      active: false,
      contents: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
    },
    {
      id: 'pubs',
      label: 'Publicaties',
      active: false,
      contents: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
    }
  ]
}

export default {
  title: 'Components/Tabs',
  component: TabsComponent,
  parameters: { 
    actions: {
      handles: bsEvents.map(evt => `${evt} button[data-bs-toggle="tab"]`)
    }
  },
  argTypes: {
    items: {
      control: 'array',
      table: { defaultValue: { summary: defaultArgs.items }}
    },
    pills: {
      control: 'boolean',
      table: { defaultValue: { summary: false }}
    }
  },
}
