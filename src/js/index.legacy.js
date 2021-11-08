import * as bootstrap from 'bootstrap';
import jquery from 'jquery';
import foreach from 'lodash.foreach';
import debounce from 'lodash.debounce';
import colorbox from 'jquery-colorbox';
import autoInit from './index.kul';

export function autoGlobals(scope = window) {
  const dependencies = {
    '$': jquery.noConflict(),
    'bootstrap': bootstrap,
    'debounce': debounce
  };

  foreach(Object.keys(dependencies), function(property) {
    if (!scope.hasOwnProperty(property)) {
      scope[property] = dependencies[property];
    } else {
      console.warn(`Could not set ${property} on ${scope.toString().match(/\[object (.*)\]/)[1]}. Property already assigned.`);
    }
  });
}

/**
 * Use the <body> element together with a data-auto-globals="true|false" attribute
 * to indicate whether to make dependencies accessible as globals on the window scope.
 * For backwards-compatibility, the default is to make them accessible on the window.
 * New projects (which include the styleguide as NPM module for example) can set data-auto-globals="false"
 */
if (document.body.dataset['auto-globals'] !== 'false') {
  autoGlobals(window);
}

/**
 * Use the <body> element together with a data-auto-init="true|false" attribute
 * to indicate whether to auto-initialize generic JS (menu, scroll-to-top etc).
 * For backwards-compatibility, the default is to initialize the JS.
 * New projects (which include the styleguide as NPM module for example) can set data-auto-init="false"
 * and initialize 
 */
if (document.body.dataset['auto-init'] !== 'false') {
  if (document.readyState === 'interactive') {
    autoInit();
  } else {
    document.addEventListener('readystatechange', function() {
      if (document.readyState === 'interactive') {
        autoInit();
      }
    });
  }
}