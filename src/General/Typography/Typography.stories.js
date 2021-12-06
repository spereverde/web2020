import render from '../../../.storybook/renderer';

const htags = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6'
];

export function Typography() {
  return render('');
};


/**
 * Apply font styles to any element using CSS var declarations: `font-family: var(--kul-font-sans-serif);`. You can choose between `--kul-font-sans-serif`, `--kul-font-serif`, `--kul-font-monospace`.
 */
export const Fonts = () => {
  return render([
    '<p style="font-family: var(--kul-font-sans-serif);">This is a sans-serif paragraph</p>',
    '<p style="font-family: var(--kul-font-serif);">This is a serif paragraph</p>',
    '<p style="font-family: var(--kul-font-monospace);">This is a monospace paragraph</p>',
  ].join('\n'));
};

/**
 * Heading tags from `h1` to `h6`. The heading styles can also be added to any other element by using a class: `class="h4"`.  
 * Also see https://getbootstrap.com/docs/5.0/content/typography/#headings
 */
export const Headings = () => {
  const dom = render(htags.map(htag => `<${htag}>${htag.toUpperCase()} title</${htag}>`).join('\n'));
  return dom;
};

export const LeadParagraph = () => {
  const dom = render(`<p class="lead">This is a lead paragraph</p>\n<p>And this is a regular paragraph</p>`);
  return dom;
};

export const Quote = () => {
  const dom = render(`<blockquote>
  <p>Maecenas sed diam eget risus varius blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nulla vitae elit libero, a pharetra augue.</p>
</blockquote>`);
return dom;
};

export const InlineElements = () => {
  return render(`<p>You can use the mark tag to <mark>highlight</mark> text.</p>
<p><del>This line of text is meant to be treated as deleted text.</del></p>
<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
<p><u>This line of text will render as underlined.</u></p>
<p><small>This line of text is meant to be treated as fine print.</small></p>
<p><strong>This line rendered as bold text.</strong></p>
<p><em>This line rendered as italicized text.</em></p>`);
}

export default {
  title: 'General/Typography',
  component: Typography,
  parameters: {}
};  