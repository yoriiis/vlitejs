# Provider: Vimeo

Supports for Vimeo player with the [Vimeo player SDK](https://developer.vimeo.com/player/sdk/basics).

> The Vimeo SDK is automatically loaded by the provider.

## Overview

| <!-- -->          | <!-- -->                          |
| ----------------- | --------------------------------- |
| Name              | `vimeo`                           |
| Global name&sup1; | `window.VlitejsVimeo`             |
| Path              | `vlitejs/dist/providers/vimeo`    |
| Entry point       | `vlitejs/dist/providers/vimeo.js` |

- _&sup1; The global name is only useful if `vLitejs` is included with a `<script>` tag (see [CDN](../../../README.md#CDN) section)._

## Usage

### HTML

```html
<div id="player" class="vlite-js" data-vimeo-id="162391385"></div>
```

### JavaScript

```js
import 'vlitejs/dist/vlite.css';
import Vlitejs from 'vlitejs';
import VlitejsVimeo from 'vlitejs/dist/providers/vimeo';

Vlitejs.registerProvider('vimeo', VlitejsVimeo);

new Vlitejs('#player', {
  provider: 'vimeo'
});
```

## SDK documentation

See the [Vimeo player SDK](https://developer.vimeo.com/player/sdk/basics) documentation.
