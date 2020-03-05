const mix = require('laravel-mix');
const handlebars = require('handlebars');
const fs = require('fs');

// unfortunately your build will always fail with notifications on Windows,
// under the hood laravel-mix uses node-notifier, which uses snoreToast, and doesn't work reliably on Windows
if (require('os').platform() === 'win32') mix.disableNotifications && mix.disableNotifications();

const args = [].slice.call(process.argv, 2);

if (process.env.BUILD === 'css') {
  mix.sass('src/bootstrap/main.scss', 'dist/css/');
  process.exit(0);
}

if (process.env.BUILD === 'includes') {
  const compileIncludes = require('./scripts/compile-includes');
  const data = require('./src/includes/data');

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
  /*fs.readdir('./src/includes/partials', (err, data) => {
    if (err) return console.log(err);
    handlebars.registerPartials({
      
    });
  });
  const footer = fs.readFileSync('src/includes/kulak/footer.hbs', { encoding: 'utf-8' });
  fs.writeFileSync('dist/kulak_footer.html', handlebars.compile(footer)(require('./src/includes/data/kulak.json')));*/
}
