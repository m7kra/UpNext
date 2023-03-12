---
permalink: /docs/dev/settings
layout: docs
title: Settings
---

# Settings
{:.no_toc}

## Table of contents
{:.no_toc}

* TOC
{:toc}

## The Settings class

Class that manages app settings.

### Methods

#### `get`

**Description:** Gets app settings. If none are defined, returns default settings.

**Arguments:** None

**Return value:** `settings`

#### `set`

**Description:** Store the provided `settings`.

**Arguments:** `settings`

**Return value:** None

#### `reset`

**Description:** Stores the predefined settings.

**Arguments:** None

**Return value:** None

#### `getCustomCSS`

**Description:** Auxiliary method that gets the user-defined CSS, returning `''` if there is no corresponding file.

**Arguments:** None

**Return value:** `customCSS`

#### `setCustomCSS`

**Description:** Auxiliary method that saves the user-defined CSS.

**Arguments:** `customCSS`

**Return value:** None

## Structure

The settings are stored in an object containing `subSettings`. These, in turn, have a property `type` which determines what the other properties are and what should be displayed in the `Setting` component. While `customCSS` and `firstTime` are included in the settings structure, they are not conventional. `firstTime` is only `true` on the first time the app is opened and `customCSS` is stored in `customCSSPath`. To retrieve it, use the `getCustomCSS` function.

```js
const defaultSettings = {
    categories: {
        type: 'internal',
        value: ['General', 'Appearance']
    },
    theme: {
        name: 'Theme',
        category: 'Appearance',
        type: 'select',
        options: ['light', 'dark'],
        value: 'light'
    },
    zoomFactor: {
        name: 'Zoom',
        category: 'Appearance',
        type: 'select',
        options: ['0.7', '0.8', '0.9', '1', '1.2', '1.4', '1.6', '1.8'],
        value: platform() == 'win32'? '0.8' : '1'
    },
    customCSS: {
        name: 'Custom CSS',
        category: 'Appearance',
        description: 'This allows you to change the app\'s appearence. See the documentation for more information.',
        type: 'code',
        language: 'css',
        value: ''
    },
    filePath: {
        name: 'Todo list file path',
        category: 'General',
        description: 'The path to the file where your todo list is stored. If you leave this empty, the app will use a default file.',
        type: 'filepath',
        value: ''
    },
    dimCompleted: {
        name: 'Dim completed tasks',
        category: 'General',
        type: 'bool',
        value: false
    },
    version: {
        type: 'internal',
        value: app.getVersion()
    },
    firstTime: {
        type: 'internal',
        value: true
    }
}
```

## Paths

The paths used by the `Settings` class are these:

- `settingsPath = [userData]/settings.json`

- `customCSSPath = [userData]/css/custom.css`