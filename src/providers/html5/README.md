# Provider: HTML5 video and audio

Supports for HTML5 video and audio player.

## Overview

The provider is already inludes in `vLitejs`.

## Usage

### HTML

#### Video

```html
<video id="player" class="vlite-js" src="/path/to/video.mp4"></video>
```

#### Audio

```html
<audio id="player" class="vlite-js" src="/path/to/audio.mp4"></audio>
```

### JavaScript

```js
import 'vlitejs/dist/vlite.css';
import Vlitejs from 'vlitejs';

new Vlitejs('#player');
```

> The `provider` parameter on the `Vlitejs` constructor is `html5` by default.
