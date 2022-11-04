export function AllFlavorsCombined() {
  return `<ol>
  <li>An ordered list</li>
  <li>With a nested unstyled list:
    <ul class="list-unstyled">
      <li>Unstyled item 1</li>
      <li>Unstyled item 2</li>
    </ul>
  </li>
  <li>And a KUL-flavor styled list:
    <ul class="list-styled">
      <li>Styled item 1</li>
      <li>Styled item 2</li>
    </ul>
  </li>
  <li>And a definition list:
    <dl>
      <dt>Definition term 1</dt>
      <dd>Definition desc 1</dd>
      <dt>Definition term 2</dt>
      <dd>Definition desc 2</dd>
    </dl>
  </li>
</ol>`;
}

/**
 * Heading tags from `h1` to `h6`. The heading styles can also be added to any other element by using a class: `class="h4"`.
 * Also see https://getbootstrap.com/docs/5.0/content/typography/#headings
 */

export const OrderedLists = () => {
  const dom = `<ol>
  <li>This is an <strong>ordered</strong> list.</li>
  <li>It is numbered.</li>
</ol>`;
  return dom;
};

export const UnstyledLists = () => {
  const dom = `<ul class="list-unstyled">
  <li>This is an <strong>unstyled</strong> list.</li>
  <li>It appears completely unstyled.</li>
  <li>Structurally, it's still a list.</li>
</ul>`;
  return dom;
};

export const StyledLists = () => {
  const dom = `<ul class="list-styled">
  <li>This is a <strong>styled</strong> list.</li>
  <li>Its markers are chevron_right: <i class="material-icons">chevron_right</i></li>
  <li>It is included specifically for KU Leuven.</li>
</ul>`;
  return dom;
};

export const DefinitionLists = () => {
  const dom = `<dl>
  <dt>Euismod Aenean</dt>
  <dd>Aenean venenatis, dolor quid non lectus ac cursus posuere</dd>
  <dt>Magna Lorem</dt>
  <dd>Integer malesuada ipsum non urna</dd>
  <dt>Fringilla</dt>
  <dd>Tempus nullam at turpis sit amet mauris ornare pharetra</dd>
  <dt>Sollicitudin Malesuada Adipiscing</dt>
  <dd>Maecenas nec risus urna, a faucibus tortor</dd>
</dl>`;
  return dom;
};

export default {
  title: 'General/Lists',
  component: AllFlavorsCombined,
  parameters: {}
};
