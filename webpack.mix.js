require('dotenv').config();
const fs = require('fs');
const mix = require('laravel-mix');
const handlebars = require('handlebars');
const debug = require('debug')('kul');

const srcDir = 'src';
const outDir = process.env.BUILD_DIR;
const outDirStatic = `${outDir}/static`;
const build = {};

function cleanDirectory(dirpath) {
  try {
    require('child_process').execSync(`[ -d "${dirpath}" ] && rm -r ${dirpath}/`);
  } catch (err) {
    // fail silently
  }
}

if (mix.inProduction())
  mix.disableNotifications();

/** @param {import('laravel-mix')} mix */
build.css = mix => {
  debug('Compiling CSS...');
  return mix
    /** @param {import('@types/webpack')} config */
    .override(config => {
      //console.log(config.plugins.map(p => p.constructor.name));
      //console.log(JSON.stringify(config.module.rules[6], null, 2));
      //config.plugins.splice(config.plugins.map(p => p.constructor.name).indexOf('MiniCssExtractPlugin'), 1);
      //console.log(config.plugins);
    })
    .sass('src/bootstrap/main.scss', `static/css/main.css`)
    .setPublicPath(outDir)
    .after(stats => debug('Finished compiling CSS...'));
};

/** @param {import('laravel-mix')} mix */
build.fonts = mix => {
  debug('Compiling fonts CSS...');
  mix
    .copyDirectory('src/static/fonts', 'docs/static/fonts')
    .sass('src/bootstrap/fonts.scss', 'static/css/fonts.css')
    .override(config => {
      //console.log(config.plugins.map(p => p.constructor.name));
      //console.log(JSON.stringify(config.module.rules, null, 2));
      config.module.rules.forEach(rule => {
        if (rule.use && rule.use.length) {
          const newUses = [];
          rule.use.forEach(use => {
            if (!use.loader.match('mini-css-extract-plugin'))
              newUses.push(use);
          })
          rule.use = newUses;
        }
      })
      config.plugins.splice(config.plugins.map(p => p.constructor.name).indexOf('MiniCssExtractPlugin'), 1);
    })
    .setPublicPath(outDir)
    .after(stats => debug('Finished compiling fonts CSS...'));

};


/** Builds all JS files (separate dependencies, bundled)
 * @param {import('laravel-mix')} mix
 */
build.js = mix => {
  // Location of the entry point files can change with updates,
  // always read it from the "main" field in their package.json
  const bootstrapMain = require('bootstrap/package.json').main;
  const colorboxMain = require('jquery-colorbox/package.json').main;
  const jqueryMain = require('jquery/package.json').main;

  cleanDirectory(`${outDirStatic}/js`);

  return mix
    // required to avoid outputting a combined LICENSE.txt in the output directory
    .options({ terser: { extractComments: false }}) 
    .copy(`node_modules/jquery/${jqueryMain}` , `${outDirStatic}/js/jquery.js`)
    .copy(`node_modules/jquery-colorbox/${colorboxMain}`, `${outDirStatic}/js/jquery.colorbox.js`)
    .copy(`node_modules/bootstrap/${bootstrapMain}`, `${outDirStatic}/js/bootstrap.js`)
    .js('src/js/index.legacy.js', `${outDirStatic}/js/all.min.js`);
};

/**
 * Combines tasks to output the entire static folder build: CSS, JS, fonts, images
 * @param {import('laravel-mix')} mix
 **/
build.static = mix => {
  debug('Copying static assets...');

  cleanDirectory(outDirStatic);

  mix
    .setResourceRoot(srcDir)
    .setPublicPath(outDir)
    .copyDirectory('src/static', outDirStatic)
    .after(stats => debug('Finished copying static assets...'));
  
  build.css(mix);
  build.js(mix);
  build.includes();

  return mix;
};

build.includes = () => {
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
      dest: `${outDirStatic}/includes/${dataset.abbrev}`,
      rename: filename => filename.replace('.hbs', '.' + dataset.lang + '.inc')
    }).then(() => console.log('Finished compiling dist/' + dataset.abbrev + ' (' + dataset.lang + ')'));
  });
};

const selected = (process.env.BUILD || '').toLowerCase();

if (build[selected]) {
  build[selected](mix);
} else {
  console.error(`!!! No matching build found for "${process.env.BUILD}".\nSet the BUILD environment variable to one of: ${Object.keys(build)}\n`);
  process.exit(1);
}