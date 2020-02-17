import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import copyCodeBlock from '@pickra/copy-code-block';

export default function render(html) {
  const el = document.createElement('div');
  el.innerHTML = html;
  el.insertAdjacentHTML(
    'beforeEnd',
    '<div id="html-code">' +
      copyCodeBlock(el.innerHTML, {
        lang: 'html'
      }) +
      '</div>'
  );
  hljs.initHighlighting();
  return el;
}
