import '@storybook/html';
import render from '../../../.storybook/renderer';
import template from './Breadcrumbs.hbs';

function getArgs(num) {
  const data = [
    { label: 'Home', url: '/', active: false },
    { label: 'Library', url: '/library', active: false },
    { label: 'Data', url: '/library/data', active: false }
  ].slice(0, num);
  data[data.length - 1].active = true;
  return data;
}

function Breadcrumbs(options) {

  const result = render(template({ items: getArgs(options['Number of items'])}));
  result.addEventListener('click', function(e) {
    if (e.target.nodeName !== 'A') return;
    
    result.innerHTML = template({ items: getArgs(result.querySelectorAll('.breadcrumb-item').length - 1)});
    e.preventDefault();
  });
  return result;
};

export const Variants = Breadcrumbs.bind({});

Variants.args = {
  'Number of items': 3
};

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { 
    actions: {
      handles: ['click .breadcrumb-item a']
    }
  },
  argTypes: {
    'Number of items': {
      control: { type: 'number', min: 1, max: 3 }
    }
  }
};