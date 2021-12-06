import template from './Block.hbs';

const uiKeys = {
  title: 'Title',
  subtitle: 'Subtitle',
  body: 'Body text',
  variant: 'Variant',
  imgLink: 'Image link',
  imgAltText: 'Image alt text',
  imgPosition: 'Image position',
  imgToContentRatio: 'Image to content ratio'
};

const defaults = Object.values(uiKeys).reduce((acc, current) => {
  acc[current] = '';
  return acc;
}, {});
defaults[uiKeys.imgPosition] = 'left';
defaults[uiKeys.imgToContentRatio] = '6/6';

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
  const ratio = options[uiKeys.imgToContentRatio].split('/');
  const result = template(({
    title: options[uiKeys.title],
    subtitle: options[uiKeys.subtitle],
    contents: options[uiKeys.body],
    variant: options[uiKeys.variant],
    img: options[uiKeys.imgLink] ? ({
      alt: options[uiKeys.imgAltText],
      src: options[uiKeys.imgLink],
      position: ['left', 'right', 'top', 'bottom'].reduce((all, pos) => {
          all[pos] = pos === options[uiKeys.imgPosition];
          return all;
        }, {})
    }) : null,
    columns: { img: ratio[0], contents: ratio[1]}
  }));

  return result;
};

export const Variants = Block.bind({});

Variants.args = {
  ...defaults,
  'Title': 'Block title',
  'Subtitle': 'Block subtitle',
  'Body text': sampleText,
  'Variant': 'tertiary'
};

export const WithImageLeftAligned = Block.bind({});

WithImageLeftAligned.args = {
  ...Variants.args,
  'Image link': 'https://via.placeholder.com/300x600',
  'Image alt': 'A placeholder',
  'Image position': 'left',
  'Variant': 'primary'
};


export const WithImageRightAligned = Block.bind({});

WithImageRightAligned.args = {
  ...WithImageLeftAligned.args,
  'Image position': 'right'
};

export const WithImageTop = options => {
  return [
  '<div class="row">',
    '<div class="col-12 col-md-6 col-lg-4">' + Block(options).outerHTML + '</div>',
    '<div class="col-12 col-md-6 col-lg-4">' + Block(options).outerHTML + '</div>',
    '<div class="col-12 col-md-6 col-lg-4">' + Block(options).outerHTML + '</div>',
  '</div>'
  ].join('\n');
};

WithImageTop.args = {
  ...WithImageLeftAligned.args,
  'Image position': 'top'
};

export const WithImageBottom = options => {
  return [
  '<div class="row">', 
    '<div class="col-12 col-md-6 col-lg-4">' + Block(options).outerHTML + '</div>',
    '<div class="col-12 col-md-6 col-lg-4">' + Block(options).outerHTML + '</div>',
    '<div class="col-12 col-md-6 col-lg-4">' + Block(options).outerHTML + '</div>',
  '</div>'
  ].join('\n');
};

WithImageBottom.args = {
  ...WithImageLeftAligned.args,
  'Image position': 'bottom'
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
    'Variant': {
      control: 'select',
      options: [
        'default',
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
    },
    'Image link': {
      control: 'text',
      table: { defaultValue: { summary: '' }}
    },
    'Image alt text': {
      control: 'text',
      table: { defaultValue: { summary: '' }}
    },
    'Image position': {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      table: { defaultValue: { summary: defaults[uiKeys.imgPosition] }}
    },
    'Image to content ratio': {
      control: 'text',
      description: '\\# of columns to use for image and contents (max. 12), respectively, for example: 6/6, 3/9',
      placeholder: '6/6',
      table: { defaultValue: { summary: defaults[uiKeys.imgToContentRatio] }}
    },
  }
};