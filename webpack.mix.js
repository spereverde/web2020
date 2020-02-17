const mix = require('laravel-mix');
const handlebars = require('handlebars');
const fs = require('fs');

// unfortunately your build will always fail with notifications on Windows,
// under the hood laravel-mix uses node-notifier, which uses snoreToast, and doesn't work reliably on Windows
if (require('os').platform() === 'win32') mix.disableNotifications();

const args = [].slice.call(process.argv, 2);

if (process.env.BUILD === 'css') {
  mix.sass('src/bootstrap/main.scss', 'dist/css/');
} else if (process.env.BUILD === 'includes') {
  const footer = fs.readFileSync('src/includes/kulak/footer.hbs', { encoding: 'utf-8' });
  fs.writeFileSync('dist/kulak_footer.html', handlebars.compile(footer)(require('./src/includes/data/kulak.json')));
}
