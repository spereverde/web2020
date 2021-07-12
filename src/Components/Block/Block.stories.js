import '@storybook/html';
import render from '../../../.storybook/renderer';
import template from './Block.hbs';

const sampleText = `<p>
  Gebruik voor het standaard tekstblok enkel knoppen met de class .btn.btn-primary (voor de blauwe knop)of de class .btn.btn-ghost-inv (transparante knop)<br>
  Indien er meerdere knoppen nodig zijn, plaats deze dan naast elkaar. <br>
  De knop in dit blok heeft de class <strong>.btn .btn-primary</strong><br><a href="#">Link om kleur te testen</a>
</p>
<ul>
  <li>Lijstje default</li>
  <li><a href="#">Link om kleur te testen</a></li>
</ul>
<ul class="list-styled">
  <li>Lijstje met class list-styled</li>
  <li><a href="#">Link om kleur te testen</a></li>
</ul>
<p>&nbsp;</p><a class="btn btn-primary" href="#">Lees meer</a>
`;

function Block(options) {
  const result = render('<div style="width: 500px; max-width: 100%;">' + template({
    title: options['Title'],
    subtitle: options['Subtitle'],
    body: options['Body text'],
    bgcolor: options['bgcolor'],
    leftImg: options.variant === 'left-img'
  }) + '</div>');

  return result;
};

export const Variants = Block.bind({});

Variants.args = {
  'Title': 'Block title',
  'Subtitle': 'Block subtitle',
  'Body text': sampleText,
  'bgcolor': ''
};

export const WithImageLeftAligned = Block.bind({});

WithImageLeftAligned.args = {
  ...Variants.args,
  'Body text': sampleText,
  variant: 'left-img'
};

export default {
  title: 'Components/Block',
  component: Block,
  argTypes: {
    'Title': {
      control: 'text',
      table: { defaultValue: { summary: '' }}
    },
    'Subtitle': {
      control: 'text',
      table: { defaultValue: { summary: '' }}
    },
    'Body text': {
      control: 'text',
      table: { defaultValue: { summary: '' }}
    },
    'bgcolor': {
      control: 'select',
        options: [
          '',
          'primary',
          'secondary',
          'tertiary',
          'success',
          'info',
          'warning',
          'danger',
          'light',
          'dark',
          'brand',
          'contact'
        ],
      description: 'Background color',
      table: { defaultValue: { summary: '' }}
    }
  }
};