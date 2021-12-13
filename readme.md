# Web 2020 - Components & tech specs

Contact: [Kim Paulissen](https://www.kuleuven.be/wieiswie/nl/person/00045445)

## Getting started

```bash
git clone git@gitea.icts.kuleuven.be:fii/web2020.git
cd web2020
npm install
```

## Development (local)

Live rebuild of KUL-customized bootstrap CSS:

```bash
npm run watch:css
```

Live rebuild and browsersync of storybook documentation:

```bash
npm run start-storybook
```

Run prettier formatting before committing:

```bash
npm run format
```

If at some point you notice the addon panel has disappeared, clear localStorage, see [GH issue](https://github.com/storybookjs/storybook/issues/8383#issuecomment-541562349).

## Build

Build KUL-customized bootstrap CSS:

```bash
BUILD=css npm run build
```

Build KUL header/ footer/ flyout includes:

```bash
BUILD=includes npm run build
```

Build static Storybook documentation distribution:

```bash
npm run build-storybook
```

## Development

### Project structure

```txt
src
├── Components
│   ├── ComponentA
│   │   ├── ComponentA.hbs
│   │   ├── ComponentA.js
│   │   ├── ComponentA.scss
│   │   └── ComponentA.stories.js
│   └── ComponentB
│   │   ├── ComponentB.hbs
│   │   ├── ComponentB.js
│   │   ├── ComponentB.scss
│   │   └── ComponentB.stories.js
├── General
│   ├── Colors
│   └── Typography
├── scss
│   ├── bootstrap.scss
│   ├── fonts.scss
│   └── all.scss
├── includes
│   ├── data
│   ├── partials
│   └── templates
├── js
└── static
    ├── fonts
    └── img
        ├── content
        └── svg
```

In the `src` folder the contents are organized as follows:

- `/scss` contains 3 main entry-point SCSS files:
  - `_base.scss` is used to customize the Bootstrap theme by overwriting defaults found in `bootstrap/scss/_variables.scss`.
  - `_components.scss` groups all component-specific styles for KUL components.
  - `fonts.scss` *(output entrypoint)* loads all the fonts required by KU Leuven websites
  - `bootstrap.scss` *(output entrypoint)* is used to add custom style rules that require more than changing a Bootstrap variable
  - `all.scss` *(output entrypoint)* groups all CSS together
- `/js` contains different entry-points for Webpack output bundles
- `/static` houses all static content, like logo's, images, and webfonts
- All other directories in `src` contain components that can be displayed in Storybook. They consist of:
  - `MyComponent.hbs` - a file defining a Handlebars template to render a `MyComponent`. When this file is not defined, the templates are defined inline, within `MyComponent.stories.js`.
  - `MyComponent.js` - a JS component that parses/ passes arguments to the Handlebars template `MyComponent.hbs`
  - `MyComponent.stories.js` - a file containing all the stories relating to `MyComponent.js`
  - `MyComponent.scss` - _(optionally)_ component-specific style rules
### Adding a new component + stories

Add a folder under `/Components` with the name of the new component and the relevant files:

```txt
Components
└── MyComponent
    ├── MyComponent.hbs
    ├── MyComponent.scss
    ├── MyComponent.js
    └── MyComponent.stories.js
```

In `MyComponent.hbs`:

```html
<h1>{{ text }}</h1>
```

For all the syntax possibilities in `.hbs` files, see [Handlebars documentation](https://handlebarsjs.com/guide/).

In `MyComponent.js`:

```js
import template from './MyComponent.hbs';

const defaults = {};

// base component
export default function MyComponent(args) {
  return template({ ...defaults, ...args }));
}
```

In `MyComponent.stories.js`:

```js
import MyComponent from './MyComponent.js';

// set defaults for all arguments
const defaultArgs = {
  text: 'Hello World'
};

// define 1 or multiple stories. You can do "MyComponent.bind({})" to create a story, and add its arg values to its "args" property
export const MyComponentUsedSomewhere = MyComponent.bind({});
MyComponentUsedSomwehere.args = {
  text: 'Hello from somewhere specific!'
};
// or for more flexibility define a custom function in which you use MyComponent(args)
export const MyComponentUsedSomewhereElse = (args) => render('<p>Just some extra fixed markup</p>' + MyComponent(args));
MyComponentUsedSomwehere.args = {
  text: 'Hello from somewhere specific!'
};

/*
 * if you only define a single story for the component, give it the same name
 * as the last part of the component path specified in the component definition "title" (see below, would be MyComponent)
 */

// export component definition
export default {
  title: 'Components/MyComponent', // set 'title' to the title of your component: Adding /'es will nest the component in directories, camelcase sequences are transformed to separate words (e.g. MyComponent -> My component)
  component: MyComponent, // set 'component' to the main component function
  // specify under argTypes the args that you would like to be tweakable by users through Storybook
  argTypes: {
    text: {
      control: 'text',
      table: { defaultValue: { summary: defaultArgs.text } }
    }
  },
  // specify under parameters component-specific tweaks (e.g. custom docs page)
  parameters: {}
};
```

## FAQ

<details>
<summary>How do I change the order of display of component/doc trees in Storybook?</summary>
The order is determined in the `parameters.options.storySort.order` key in the <a href=".storybook/preview.js">.storybook/preview.js file</a>. See also <a href="https://storybook.js.org/docs/web-components/writing-stories/naming-components-and-hierarchy#sorting-stories">Storybook docs</a>.
</details>

<details>
<summary>How do I add a separate documentation page without component/stories?</summary>
Add a folder with a `.mdx` file and the component path in a Meta tag at the start of the file, like so: `<Meta title="Path/To/PageName"/>`. See <a href="src/General/Introduction/Introduction.stories.mdx">src/General/Introduction/Introduction.stories.mdx</a> for an example.
</details>

<details>
<summary>How do I add a single-story component?</summary>
To add a single-story component (where the initial component display & story are merged into 1) the story name must match the last path-part of the component name specified in the component `title`. For an example, have a look at <a href="src/Components/Tabs/Tabs.stories.js">src/General/Introduction/Introduction.stories.mdx</a>).
</details>


<details>
<summary>How do I test changes to static CSS/JS locally before they are deployed?</summary>
Find the browser add-on **ModHeader** in the Chrome webstore/ Firefox add-ons and install it.<br> 
Load the page you want to test with a new style/JS in the browser, and serve the project locally (<code>npm run start-storybook</code> or <code>npm run build-storybook && serve $BUILD_DIR</code>).

In the Modheader extension, click **+**, and add a **URL Redirect**. To fill in 'From', Inspect element on the webpage and find the FULL url you want to redirect locally. To fill in 'To', this should be `http://localhost:$PORT/static/**/file.ext`, for example to overwrite the KUL WMS css on https://feb.kuleuven.be/home/, you would configure the rule as From: https://stijl.kuleuven.be/releases/latest/css/wms.css & To: http://localhost:5599/static/css/wms.css

</details>