const fs = require('fs');
const mix = require('laravel-mix');
const handlebars = require('handlebars');

// unfortunately your build will always fail with notifications on Windows,
// under the hood laravel-mix uses node-notifier, which uses snoreToast, and doesn't work reliably on Windows
if (require('os').platform() === 'win32') mix.disableNotifications && mix.disableNotifications();

// code below works as a "switch" depending on the value of cross-env BUILD= in the NPM script

if (process.env.BUILD === 'css') {
  mix.sass('src/bootstrap/main.scss', 'dist/static/css/');
}
if (process.env.BUILD === 'fonts') {

console.log(process.env.BUILD)
  mix.copyDirectory('src/fonts', 'dist/static/fonts').after((stats) => { console.log(stats)})
}

if (process.env.BUILD === 'includes') {
  /** How to use compileIncludes
   *  ==========================
   *  This is a custom NodeJS script that compiles a directory (non-recursively!) of Handlebars templates.
   *  For extra info on how handlebars.js templating works, see https://handlebarsjs.com/guide/
   *
   *  Pass an object to compileIncludes with the following properties:
   *  - partials = directory with 'sub-templates' that can be re-used and parameterized (see https://handlebarsjs.com/guide/partials.html)
   *  - helpers = object with functions that transform the data (see https://handlebarsjs.com/guide/#custom-helpers)
   *  - src = source directory of templates to be compiled and outputted
   *  - dest = destination directory
   *  - data = root context for all the Handlebars templates
   *  - rename = (optional) transform function to change the name/ extension of the template
   *  returns a promise (do .catch to catch errors, .then to log successes)
   */
  const compileIncludes = require('./scripts/compile-includes');
  const data = require('./src/includes/data'); // return value specified in ./src/includes/data/index.js

  data.data.forEach(dataset => {
    compileIncludes({
      partials: './src/includes/partials',
      helpers: {
        slugify: value => (value || '').toLowerCase().replace(/ /g, '-')
      },
      src: './src/includes/templates',
      data: dataset,
      dest: './dist/includes/' + dataset.abbrev,
      rename: filename => filename.replace('.hbs', '.' + dataset.lang + '.inc')
    }).then(() => console.log('Finished compiling dist/' + dataset.abbrev + ' (' + dataset.lang + ')'));
  });
}
