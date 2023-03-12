---
permalink: /docs/dev/components
layout: docs
title: Components
---

# Components
{:.no_toc}

## Table of Contents
{:.no_toc}

* TOC
{:toc}

## `App`

**Description:** This is the main component. It stores a series of states and renders two other components (`Main` and `Settings`) according to `view`. It also renders a bunch of other components used throughout the app: a `Header`, a `ContextMenu`, a spinner if `loading` and a `Tutorial` if `settings.firstTime`.

**Properties:** None

**Hooks:**

```js
const [view, setView] = useState('main');

// Variable that stores current settings
const [settings, setSettings] = useState({});

const [logs, setLogs] = useState();

// Controlls whether a spinner should be shown
const [loading, setLoading] = useState(false);

const controller = useMemo(
    new Controller(setView, setSettings, setLoading, addLog)
);
```

## `Main`

Displays a list of `Task`s and `Heading`s and a `Title`, which can be dragged and dropped. It also allows to add new tasks and headings, and to search for tasks. Changes are saved automatically. It also renders a `Logger` and a `ContextMenu`.

**Properties:** None

## `Task`

**Description:** Displays a single task. It must be editable and can be marked as complete.

**Properties:** `task`, `modify`, `remove`

## `Heading`

**Description:** Displays a single heading. It must be editable.

**Properties:** `heading`, `modify`, `remove`

## `Title`

**Description:** Displays the title of the document. It must be editable.

**Properties:** `title`, `modify`

## `Settings`

**Description:** Displays current settings, using the `Setting` component, and allows to modify them. The settings `firstTime` and `version` should not be displayed nor modified, and the new settings should be saved automatically. This component should also allow to reset the settings, reset the library and to go through the tutorial again.

**Properties:** `settings`, `displayTutorial`

## `Header`

**Description:** Displays the app's header bar, with app navigation utilities and window buttons. Specifically, people should be able to access `settings`, open a file or export and export the current one if `view == main` and go back to the main view otherwise. The normal three window control buttons must be displayed.

**Properties:** `view`

## `CreateGap`

**Description:** Renders a gap that can be used to create a new task or heading. When hovered, expands and renders two buttons, one for creating a task and one for creating a heading.

**Properties:** `createTask`, `createHeading`

## `ContextMenu`

**Description:** Renders a context menu on a given `position`, showing it whenever it is `visible`. The same file should also give access to a function, `addContextMenu`, which allows to set the states of `ContextMenu`. Please note that the component should be designed in such a way that it is called only once. Furthermore, the `items` that are passed onto `addContextMenu` should be an array dictionaries with entries `text` and `onClick`.

**Properties:** None

**Hooks:**

```js
// Which items are to be displayed in the context menu
const [items, setItems] = useState([]);
// The coordinates of the context menu
const [position, setPosition] = useState({x:0, y:0});
// Whether the context menu should be shown
const [visible, setVisibility] = useState(false);
```

## `Logger`

**Description:** Displays a list of log messages.

**Properties:** `logs`, `removeLog`

## `Setting`

**Description:** Displays a single `setting`. In order to modify the setting, `modify` should be called. The value to be passed to the function is the entire setting. Here is an example:

```js
setting = {
        name: 'Theme',
        type: 'select',
        options: ['light', 'dark'],
        value: 'dark'
};
setting.selected = 'dark';
modify(setting);
```

**Properties:** `setting`, `modify`,

## `Tutorial`

**Description:** Renders a brief introductory tutorial, based on a series of slides.

**Properties:** `setTutorial` (closes the tutorial when called with the argument `false`.

## `Button`

**Description:** Wrapper component that builds a button around its children. Also sets up a shortcut that for `onClick`, which should be removed when the button removed from the DOM.

**Properties:** `onClick`, `type = box` (`box`, `outline` or `nodecor`) and `shortcuts`.

## `Select`

**Description:** A wrapper for react-select.

**Properties:** `options`, `value`