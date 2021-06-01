import { storiesOf } from '@storybook/html';
import { addReadme } from 'storybook-readme/html';
import { withKnobs, select } from '@storybook/addon-knobs';

import template from './global-footer.hbs';
import readme from './readme.md';
import render from '../../../.storybook/renderer';

import data from '../../includes/data';

const stories = storiesOf('KUL', module);
stories.addParameters({ readme: { sidebar: readme } });
stories.addDecorator(addReadme);
stories.addDecorator(withKnobs);
const variants = ['general', 'kulak', 'intranet', 'hosted-by', 'landingpage'];

stories.add('KUL Global footer', pms => {
  const org = select('Organization', variants, variants[0]);
  const lang = select('Language', ['nl', 'en'], 'nl');
  const container = document.createElement('div');
  container.innerHTML = template(data.langs[org][lang]);
  return render(container.innerHTML);
});
