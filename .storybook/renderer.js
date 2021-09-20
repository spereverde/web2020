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
