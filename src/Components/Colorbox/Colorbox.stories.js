import '@storybook/html';
import ColorboxComponent from './Colorbox';
import Badge from '../Badge/Badge';

const colorboxEvents = [
  'cbox_open',
  'cbox_load',
  'cbox_complete',
  'cbox_cleanup',
  'cbox_closed'
];

/**
 * For more info on colorbox, see See [Colorbox docs](http://www.jacklmoore.com/colorbox/)
 */
export const Colorbox = function({ images, albumName, albumDesc }) {
  
  return `${Badge({ contents: 'unread', modifiers: 'bg-primary'})}${ColorboxComponent({
    images,
    album: {
      name: albumName,
      desc: albumDesc
    }
  })}`;
};

Colorbox.args = {
  images: [
    { href: 'https://via.placeholder.com/256x256', title: 'An image'},
    { href: 'https://via.placeholder.com/256x256', title: 'Another image'}
  ],
  albumName: 'An album',
  albumDesc: 'An album'
};

export default {
  title: 'Components/Colorbox',
  component: ColorboxComponent,
  parameters: {
    actions: {
      handles: colorboxEvents
    }
  },
  argTypes: {
    images: {
      control: 'array'
    },
    albumName: {
      control: 'text',
      description: 'Name of the album',
      table: { defaultValue: { summary: '' }}
    },
    albumDesc: {
      control: 'text',
      description: 'Description of the album',
      table: { defaultValue: { summary: '' }}
    }
  }
};