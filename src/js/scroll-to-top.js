/**
 * @typedef ScrollToTopOptions
 * @prop {string} [selector='[href="#top"]]
 * @prop {number} [scrollOffset=0] Scroll to <scrollOffset> pixels from the top when the toggle is clicked. Default is 0.
 * @prop {number} [showOffset=100] Show the toggle after scrolling down <showOffset> pixels.
 * @prop {HTMLElement} [container=window] Scroll container
 */
const options = {
  selector: '[href="#top"]',
  scrollOffset: 0,
  showOffset: 100,
  container: window
};

function hideToggle(elem) {
  elem.setAttribute('hidden', '');
  setTimeout(function() {
    elem.style.display = 'none';
  }, 50);
}

function showToggle(elem) {
  elem.style.display = 'block';
  setTimeout(function() {
    elem.removeAttribute('hidden');
  }, 50);
}

/**
 * @example
 * var dispose = scrollToTop({
 *   selector: '[href="#top"]',
 *   scrollOffset: document.getElementById('nav').clientHeight,
 *   showOffset: 300
 * });
 * dispose(); // stop listening for events
 * @param {ScrollToTopOptions} opts 
 */
function scrollToTop(opts) {
  opts = Object.assign(options, opts || {});
  let togglesHidden = true;

  Object.keys(options).forEach(function(key) {
    if (opts[key] && typeof opts[key] == typeof options[key])
      options[key] = opts[key];
  });
  
  const elems = document.querySelectorAll(opts.selector);
  for (let i = 0; i < elems.length; i++) {
    elems[i].addEventListener('click', onToggleClick);
  }

  const prop = opts.container === window ? 'scrollY' : 'scrollTop';

  function toggleDisplay() {
    const elems = document.querySelectorAll(opts.selector);
    if (opts.container[prop] < opts.showOffset) {
      if (togglesHidden) return;

      for (let i = 0; i < elems.length; i++) {
        hideToggle(elems[i]);
      }
      togglesHidden = true;
    } else {
      if (!togglesHidden) return;

      for (var i = 0; i < elems.length; i++) {
        showToggle(elems[i]);
      }
      togglesHidden = false;
    }
  }

  function onToggleClick(e) {
    e.preventDefault();
    opts.container.scrollTo(0, 0 + opts.scrollOffset);
  }

  opts.container.addEventListener('scroll', toggleDisplay);
  toggleDisplay();

  // dispose function 
  return function() {
    opts.container && opts.container.removeEventListener('scroll', toggleDisplay);
    const elems = document.querySelectorAll(opts.selector);
    for (let i = 0; i < elems.length; i++) {
      elems[i].removeEventListener('click', onToggleClick);
    }
  }
};

export default scrollToTop;