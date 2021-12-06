/** 
 * entrypoint file to provide a component bundle for NPM
 * The components can then be imported by a client project and rendered from JS with NPM: 
 * 
 * @example
 * import { Badge } from 'kul-components';
 * 
 * const html = Badge({ content: 'unread', modifiers: ['bg-tertiary'] })
 */

export { default as Modal } from './Modal/Modal.hbs';
export { default as Alert } from './Alert/Alert';
export { default as Button } from './Button/Button.hbs';
export { default as Colorbox } from './Colorbox/Colorbox';
export { default as Badge } from './Badge/Badge';
export { default as GlobalFooter } from './GlobalFooter/GlobalFooter.hbs';
