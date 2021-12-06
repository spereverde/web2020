import template from './Collapse.hbs';

function Collapse(options) {
  options = { ...options };
  options.useLinkTag = options.useLinkTag === 'yes' ? true : false
  return template(options);
}

const bsEvents = [
  'show.bs.collapse',
  'shown.bs.collapse',
  'hide.bs.collapse',
  'hidden.bs.collapse'
];

/** Also see [Bootstrap docs -> accordion](https://getbootstrap.com/docs/5.0/components/collapse/) */

export const Variants = Collapse.bind({});

Variants.args = {
  useLinkTag: 'no',
  id: 'collapseExample',
  content: '<div class="card card-body">Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.</div>'
};

export default {
  title: 'Components/Collapse',
  component: Collapse,
  parameters: { 
    actions: {
      handles: bsEvents.map(evt => `${evt} .collapse`)
    }
  },
  argTypes: {
    useLinkTag: {
      options: ['yes', 'no'],
      control: { type: 'radio' },
      description: 'Use link as toggle?',
      table: { defaultValue: { summary: 'no' }}
    },
    id: {
      control: { type: 'text' },
      description: 'id attribute of the collapse target',
      table: { defaultValue: { summary: null }}
    },
    content: {
      control: 'text',
      description: 'HTML content of the collapse target',
      table: { defaultValue: { summary: '' }}
    }
  }
};