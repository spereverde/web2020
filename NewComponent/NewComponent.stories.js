import 'storybook/@html';
import template from './MyComponent.hbs';
import render from '../../../.storybook/renderer';

// set defaults for all arguments
const defaultArgs = {
  contents: 'Hello World'
};

// base component
function MyComponent(args) {
  return render(template({ ...defaultArgs, ...args }))
}

// define 1 or multiple stories. You can do "MyComponent.bind({})" to create a story, and add its arg values to its "args" property
export const MyComponentUsedSomewhere = MyComponent.bind({});
MyComponentUsedSomwehere.args = {
  contents: 'Hello from somewhere specific!'
}
// or for more flexibility define a custom function in which you use MyComponent(args)
export const MyComponentUsedSomewhereElse = (args) => render('<p>Just some extra fixed markup</p>' + MyComponent(args) );
MyComponentUsedSomwehere.args = {
  contents: 'Hello from somewhere specific!'
}

// export component definition
export default {
  title: 'Components/MyComponent',    // set 'title' to the title of your component: Adding /'es will nest the component in directories, camelcase sequences are transformed to separate words (e.g. MyComponent -> My component)
  component: MyComponent,             // set 'component' to the main component function
  // specify under argTypes the args that you would like to be tweakable by users through Storybook
  argTypes: {
    contents: {
      control: 'text',
      table: { defaultValue: { summary: defaultArgs.contents }}
    },
  },
  // specify under parameters component-specific tweaks (e.g. custom docs page)
  parameters: {

  }
}