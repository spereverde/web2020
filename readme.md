# Web 2020 - Components & tech specs

Contact: [Kim Paulissen](https://www.kuleuven.be/wieiswie/nl/person/00045445)

## Getting started

```bash
git clone git@gitea.icts.kuleuven.be:fii/web2020.git
cd web2020
npm install
```

If you get errors in the webpack build upon running subsequent commands, try running:

```bash
npx -p @storybook/cli sb init --type html -f
```

## Development (local)

## Build

Build KUL-customized bootstrap CSS:

```bash
npm run build:css
```

Build KUL header/ footer includes:

```
npm run build:includes
```

Build static Storybook documentation distribution:

```
npm run build-storybook
```
