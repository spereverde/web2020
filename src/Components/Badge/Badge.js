import template from './Badge.hbs';

/**
 * Bootstrap badge, see [docs](https://getbootstrap.com/docs/5.0/components/badge/)
 * @param {Object} params 
 * @param {String} params.contents HTML to display in the badge
 * @param {String[]} params.modifiers A list of modifier classes
 * @returns {String}
 */
export default function Badge(params) {
  return template(params);
}