import { storiesOf } from '@storybook/html';
import { addReadme } from 'storybook-readme/html';
import { withKnobs, select } from '@storybook/addon-knobs';
import Handlebars from 'handlebars';

import template from './global-footer.html';
import readme from './readme.md';
import render from '../../../.storybook/renderer';

import data from '../../includes/data';

const stories = storiesOf('KUL', module);
stories.addParameters({ readme: { sidebar: readme } });
stories.addDecorator(addReadme);
stories.addDecorator(withKnobs);
console.log(data);
const variants = ['general', 'kulak', 'intranet', 'hosted-by'];
const d = {
  nl: [data.kulakData, data.kulakData, data.kulakData, data.kulakData],
  en: [data.kulakData, data.kulakData, data.kulakData, data.kulakData]
};

stories.add('KUL Global footer', pms => {
  const org = select('Organization', variants, variants[0]);
  const lang = select('Language', ['nl', 'en'], 'nl');
  const container = document.createElement('div');
  container.innerHTML = Handlebars.compile(template)(d[lang][variants.indexOf(org)]);
  return render(container.innerHTML);
});
