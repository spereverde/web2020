import { configure, addDecorator, addParameters } from '@storybook/html';

// the line below is required due to a bug in storybook-readme
addParameters({ options: {} });
configure(require.context('../src/components', true, /\.stories\.js$/), module);
