# D3.js Force Directed Graph

> A force-directed graph that shows which countries share borders

This is my D3 force-directed graph for freeCodeCamp's [fourth D3.js challenge](https://www.freecodecamp.org/challenges/show-national-contiguity-with-a-force-directed-graph).

![National contiguity](/preview.gif?raw=true&sanitize=true)

## User Stories

- [x] I can see a Force-directed Graph that shows which countries share borders.
- [x] I can see each country's flag on its node.

### Todo

- [ ] Reduce image sizes, create a sprite

## Tools Used

- D3.js version 4
- Webpack module bundler
- Babel.js compiler
- ESLint linter with Airbnb's config
- Sass with PostCSS' Autoprefixer

## Install and Build

You need to have either [`yarn`](https://yarnpkg.com/lang/en/docs/install/) or [`npm`](https://www.npmjs.com/) installed on your computer.

#### Clone this repo

```bash
git clone https://github.com/zsoltime/d3-force-directed-graph.git <new-folder-name>
cd <new-folder-name>
```

#### Install dependencies

```bash
yarn
# OR
npm install
```

#### Build dev bundle

It builds the app to the `dist` folder. It creates the JavaScript bundle without uglifying it, and compiles Sass to CSS.

```bash
yarn build:dev
# OR
npm run build:dev
```

#### Start dev server

Once you built the dev bundle you can start the dev server. Open [http://localhost:8080](http://localhost:8080) to view it in browser.

```bash
yarn start
# OR
npm start
```

#### Build production bundle

It builds the app to the `dist` folder. It creates the JavaScript bundle, uglifies it, compiles Sass to CSS and minifies it - ready to deploy.

```bash
yarn build:dist
# OR
npm run build:dist
```
