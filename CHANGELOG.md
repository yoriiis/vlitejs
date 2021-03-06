# CHANGELOG

## 4.0.2

### Fixes

- Fix README issues [#42](https://github.com/yoriiis/vlitejs/issues/42)
- Fix mute option not transferred to the player [#44](https://github.com/yoriiis/vlitejs/issues/44)
- Fix play not triggered without the poster [#46](https://github.com/yoriiis/vlitejs/issues/46)

## 4.0.1

### Fixes

- Fixed the default parameters and fix the selector `HTMLDivElement` [#42](https://github.com/yoriiis/vlitejs/issues/42)

## 4.0.0

### ⚠ Breaking changes

- Rename `window.vlitejs` to `window.Vlitejs` to make sure the constructor name starts with a capital
- Remove `nativeControlsForTouch` option
- Remove `data-options` HTML attributes in favor of options from the JS constructor
- Supports the latest 2 browsers versions with `.browserslistrc`
- Remove the `dist` directory from GitHub, only available for NPM and CDN

### New features

- New design and new icons
- Add Vimeo provider
- Add Audio HTML5 provider
- Add subtitle plugin
- Add Picture-in-Picture plugin
- Add a provider API to allow extension of current providers
- Add a plugin API to allow extension of current plugins
- Add `sample-provider.js` and `sample-plugin.js` for guidelines
- Add multiple native `Event` fired on media actions (`play`, `pause`, etc.)
- Add A11Y compatibility (`<button>`, `<input type="range">`, `aria-*`, `:focus-visible`)
- Add the volume up/down shortcuts
- Update HTML attributes from options and vice versa (`autoplay`, `playsinline`, `muted`, `loop`)

### Updates

- Convert to Typescript
- Replace Travis by GitHub Action
- Update to webpack v5
- Update Babel config and `.browserslistrc`
- Move `formatVideoTime`, `checkSupportFullScreen`, `isTouch` to utils
- Split code into components (`loader`, `overlay`, `big-play`, `poster`, `control-bar`)
- Remove `MkDocs` and `docs` directory, all docs are available in README files in the repository

### Fixes

- Fix the `loop` and `muted` attributes

## 3.0.4

### Updates

- Bumps `@babel/preset-env` from 7.4.5 to 7.7.7
- Bumps `file-loader` from 1.1.11 to 5.0.2
- Bumps `terser-webpack-plugin` from 2.2.1 to 2.3.1
- Bumps `postcss-loader` from 2.1.6 to 3.0.0
- Bumps `eslint-plugin-standard` from 3.0.1 to 3.1.0
- Bumps `eslint-config-standard` from 10.2.1 to 11.0.0
- Bumps `webpack-cli` from 3.2.3 to 3.3.10
- Bumps `eslint` from 4.18.2 to 4.19.1
- Bumps `eslint-plugin-import` from 2.8.0 to 2.19.1
- Bumps `optimize-css-assets-webpack-plugin` from 5.0.1 to 5.0.3
- Bumps `@babel/core` from 7.4.5 to 7.7.7
- Bumps `webpack` from 4.41.2 to 4.41.4
- Bumps `eslint-plugin-promise` from 3.6.0 to 4.2.1
- Bumps `stylelint-config-standard` from 18.3.0 to 19.0.0
- Bumps `postcss-import` from 11.0.0 to 12.0.1
- Bumps `progress-bar-webpack-plugin` from 1.11.0 to 1.12.1
- Bumps `webpack-manifest-plugin` from 2.0.3 to 2.2.0
- Bumps `eslint-plugin-node` from 5.2.1 to 8.0.1
- Bumps `mini-css-extract-plugin` from 0.4.1 to 0.8.2
- Bumps `@babel/plugin-transform-modules-commonjs` from 7.7.0 to 7.7.5
- Bumps `postcss-nested` from 3.0.0 to 4.2.1
- Bumps `style-loader` from 0.21.0 to 1.0.2
- Bumps `css-loader` from 1.0.0 to 3.4.0
- Bumps `babel-eslint` from 8.0.1 to 10.0.3

## 3.0.3

### Fixes

- Fixed strict node engine version break with different node version [#6](https://github.com/yoriiis/vlitejs/issues/6)

## 3.0.2

### Updates

- Update docs and add `.eslintignore`

## 3.0.1

### Updates

- Update `engines` in `package.json` (node and npm)

## 3.0.0

### New features

- Add all sources of the vLitejs project, including:
  - CSS
  - JS
  - Documentation with MkDocs build
  - Webpack configuration
  - Examples
- New folder structure
- Add `ESLint` with `Standard JS` on the project with associated npm scripts
- Add `StyleLint` configuration on the project with associated npm scripts
- Add `Babel` configuration on the project
- Add `postCSS` configuration on the project
- Add `browserslistrc` files for browsers support
- Add Travis builds: `stylelint`, `eslint` and `mkdocs build`
- Add `JSDoc` configuration file and all code comments
- Add `Material for MkDocs` to build the documentation website
- Add `Webpack` configuration
- Add `./examples` folder with vLitejs examples
- Add `.github` folder with `ISSUE_TEMPLATE` and `PULL_REQUEST_TEMPLATE`
- Add `./dist` folder with vLitejs assets
- Add `CHANGELOG` file
- Add `.editorconfig` file

### Removed

- Remove specific build file for `html5` player only or `youtube` player only. We keep only one bundle compatible with `html5` and `youtube`

### Updates

- Rename the export of the `vLite` constructor to`vlitejs`
- Rename `timeline` option to `progressBar`
- Rename `callback` option to `onReady`
- Rename CSS class prefixes from `.vl-` to `.v-`
- Rename all CSS class with [FUN](https://benfrain.com/enduring-css-writing-style-sheets-rapidly-changing-long-lived-projects/#h-H2_5) methodology

### Fixes

- Fix autoplay option that does not work with browser policy without user gesture. Muted option is forced to solved the problem.

## 2.0.1

### New features

- Add `playsinline` support
- Add fast-forward on the video (+ or - 10s) only on no touch devices

### Updates

- Optimize `unBindEvents` function

### Fixes

- Fix bug with native control for touch devices

## 2.0.0

### New features

- Add prefix `.vl-` before all CSS classes use by vlitejs to prevent conflicts
- Add keyboard shortcut (spacebar) to control the video
- Add option `autoHide` to hide the control bar if the user is inactive
- Add loader linked to `seeking` and `seeked` events

## 1.1.2

### New features

- Add progress bar hover and transition

### Fixes

- Prevent click catch by Youtube iframe which block player click

## 1.1.1

### New features

- Add `UMD` compatibility
- Add package on [npm](https://www.npmjs.com/package/vlitejs)

## 1.1.0

### New features

- First release of vLitejs
- Update README
