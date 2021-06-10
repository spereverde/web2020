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

If at some point you notice the addon panel has disappeared, clear localStorage, see [GH issue](https://github.com/storybookjs/storybook/issues/8383#issuecomment-541562349).

## Build

Build KUL-customized bootstrap CSS:

```bash
npm run build:css
```

Build KUL header/ footer/ flyout includes:

```bash
npm run build:includes
```

Build static Storybook documentation distribution:

```bash
npm run build-storybook
```
