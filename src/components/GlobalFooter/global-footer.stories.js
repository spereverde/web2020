import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/html';
import { addReadme } from 'storybook-readme/html';
import template from './global-footer.html';
import GlobalFooterReadme from './readme.md';
import render from '../../../.storybook/renderer';
import Handlebars from 'handlebars';
import kulakData from '../../includes/data/kulak.json';

const stories = storiesOf('KUL', module);
stories.addDecorator(withKnobs);
stories.addParameters({
  readme: {
    sidebar: GlobalFooterReadme
  }
});
stories.addDecorator(addReadme);

const variants = ['general', 'kulak', 'intranet', 'hosted-by'];
const data = [kulakData, kulakData];

stories.add('KUL Global footer', pms => {
  const org = select('Organization', variants, variants[0]);
  const container = document.createElement('div');
  container.innerHTML = Handlebars.compile(template)(data[variants.indexOf(org)]);
  return render(container.innerHTML);
});
