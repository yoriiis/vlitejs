# Plugin: Picture-in-Picture

Supports for multiple caption tracks (VTT).

## Overview

| <!-- -->          | <!-- -->                          |
| ----------------- | --------------------------------- |
| Name              | `pip`                             |
| Global name&sup1; | `window.VlitejsPip`               |
| Path              | `vlitejs/dist/plugins/pip`        |
| Entry point       | `vlitejs/dist/plugins/pip/pip.js` |
| Stylesheet        | -                                 |
| Provider&sup2;    | `'html5'`                         |
| Media type&sup3;  | `'video'`                         |

- _&sup1; Useful only if `vLitejs` is included with a `<script>` tag (see [CDN](../../../README.md#CDN) section)._
- _&sup2;Providers: `html5|youtube|vimeo`_
- _&sup3;Media type: `video|audio`_

## Usage

### HTML

```html
<video id="player" class="vlite-js" src="/path/to/video.mp4"></video>
```

### JavaScript

```js
import 'vlitejs/dist/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsPip from 'vlitejs/dist/plugins/pip';

Vlitejs.registerPlugin('pip', VlitejsPip);

new Vlitejs('#player', {
  plugins: ['pip']
});
```
