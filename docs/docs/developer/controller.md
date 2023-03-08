---
permalink: /docs/dev/controller
layout: docs
title: Controller
---

# Controller
{:.no_toc}

## Table of Contents
{:.no_toc}

* TOC
{:toc}

## Controller

Class that manages the app.

### Constructor

```js
class Controller {
    constructor(setView, setSettings, setLoading, addLog) {
        ...
    }
}
```

### Methods

#### `openFile`

**Description:** Opens the task list file.

**Arguments:** None

**Return value:** `contents`

#### `saveFile`

**Description:** Saves the task list file.

**Arguments:** `contents`

**Return value:** None

#### `searchFile`

**Description:** Displays a file dialog to search for a task list file.

**Arguments:** None

**Return value:** `path`

#### `setView`

**Description:** Sets the app view to `view`.

**Arguments:** `view`

**Return value:** None

#### `saveSettings`

**Description:** Sets the provided settings and makes the necessary changes to the app. `firstTime` should always be saved as false.

**Arguments:** `settings`

**Return value:** None

#### `implementSettings`

**Description:** Adapts the app to the current `settings`.

**Arguments:** `settings`

**Return value:** None

#### `resetSettings`

**Description:** Restores settings to their original value.

**Arguments:** None

**Return value:** None

#### `windowButton`

**Description:** Calls the main process's `windowButton` handler.

**Arguments:** `button`

**Return value:** None

#### `log`

**Description:** Logs the `message` using the `Logger` component.

**Arguments:** `message`

**Return value:** None

### Event listeners

`Controller` should set up event listeners for `setView`, `saveSettings`, `resetSettings`, `windowButton`, `resetSettings` and `log`. In addition, `log` should also be listened on `ipcRenderer`.