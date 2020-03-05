const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

function readdir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, filepaths) => {
      if (err) reject(err);
      else resolve(filepaths);
    });
  });
}

function readfile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function writefile(p, data) {
  return new Promise((resolve, reject) => {
    return fs.mkdir(path.dirname(p), { recursive: true }, err => {
      if (err) reject(err);
      else
        fs.writeFile(p, data, err => {
          if (err) reject(err);
          else resolve();
        });
    });
  });
}

const defaults = {
  partials: './partials',
  src: './src',
  dest: './dist',
  data: './data',
  helpers: {},
  rename: filename => filename
};

module.exports = function(config) {
  return new Promise((resolve, reject) => {
    config = Object.assign({}, defaults, config);
    Handlebars.registerHelper(config.helpers);

    const templates = readdir(config.src).then(paths => {
      const files = [];
      paths
        .filter(p => path.extname(p) === '.hbs')
        .forEach(p => {
          files.push(
            readfile(path.join(config.src, p)).then(data =>
              Promise.resolve({
                path: path.join(config.dest, p),
                data: data
              })
            )
          );
        });

      return Promise.all(files);
    });

    const partials = readdir(config.partials)
      .then(paths => {
        const files = [];

        paths
          .filter(p => path.extname(p) === '.hbs')
          .forEach(p => {
            const promise = readfile(path.join(config.partials, p)).then(data => {
              Handlebars.registerPartial(path.basename(p, '.hbs'), data);
              return Promise.resolve();
            });
            files.push(promise);
          });

        return Promise.all(files);
      })
      .catch(reject);

    Promise.all([templates, partials])
      .then(data => {
        const success = [];

        data[0].forEach(tpl => {
          success.push(
            writefile(
              path.join(config.dest, config.rename(path.basename(tpl.path))),
              Handlebars.compile(tpl.data)(config.data)
            )
          );
        });

        return Promise.all(success).then(data => {
          resolve();
        });
      })
      .catch(reject);
  });
};
