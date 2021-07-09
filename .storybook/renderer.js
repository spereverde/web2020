import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

export default function render(html) {
  const el = document.createElement('div');
  el.addEventListener('click', function(e) {
    if (e.target.nodeName === 'A') {
      e.preventDefault();
    }
  });
  el.innerHTML = html;
  return el;
}
