import template from './Button.hbs';

/**
 * @typedef ButtonParams
 * @property {Boolean} disabled
 * @property {String} variant - one of the theme variants (primary, tertiary, etc...)
 * @property {String} size - lg, sm or empty
 * @property {String} content - Text/HTML content in the button
 */

/**
 * @param {ButtonParams} params
 * @see https://getbootstrap.com/docs/5.0/components/buttons
 **/
export default function Button(params) {
  return template(params);
}
