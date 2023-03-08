---
permalink: /docs/dev/main
layout: docs
title: Main
---

# Main
{:.no_toc}

## Table of contents
{:.no_toc}

* TOC
{:toc}

## General

The main script puts together all the logic in the main process. It initializes the app and creates a `BrowserWindow` (only one instance being allowed). Creates instances of Settings and DB and handles a bunch of channels in `ipcMain`:

## `ipcMain` channels

### `openFile`

**Description:** Opens the current todo list file. If none is defined, uses `[userData]/todo.md` as the default file.

**Arguments:** None

**Return value:** The contents of the file.

### `saveFile`

**Description:** Saves the current todo list file. If none is defined, uses `[userData]/todo.md` as the default file.

**Arguments:** `content`

**Return value:** None

### `windowButton`

**Description:** Resizes and closes the window according to the button pressed.

**Arguments:** `button` (`maximize`, `minimize` or `close`)

**Return value:** None

### `getSettings`

**Description:** Gets app settings. If none are defined, returns the default settings.

**Arguments:** None

**Return value:** `settings`

### `setSettings`

**Description:** Stores the provided `settings`.

**Arguments:** None

**Return value:** None

### `resetSettings`

**Description:** Resets settings to their default value.

**Arguments:** None

**Return value:** None

## `checkForUpdates`

**Description:** Checks for existing updates on Github releases, returning true if there are any.

**Arguments:** None

**Return Value:** `updates`
