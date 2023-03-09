---
permalink: /docs/dev/parser
layout: docs
title: Parser
---

# Parser
{:.no_toc}

## Table of Contents
{:.no_toc}

* TOC
{:toc}

## Parser

The parser is a class that helps to convert text into a list of tasks and vice versa. It therefore has two main methods: `parse` and `stringify`:

### `parse`

**Description:** Parses a string into a list of tasks. It also handles hedings and titles (the first heading in the document is used as a title). Headings are recognized because they have one to six `#` leading the text. Tasks have the following structure: `- [x] Text`. Notice that the `x` is optional, meaning that the task is complete. Tasks can also be preceded or ended by a date in between parenthesis and followed by a priority in angle breackets (`low` is the default assumed), i.e., `- [x] (22/07/2024) Task [medium]` or `- [x] Task (22/07/2024) [high]`.

**Arguments:** `text`: The text to be parsed.

**Return value:** `tokens`: An array of tokens. This array may look like this:

```js
[
    {
        type: 'title',
        content: 'UpNext'
    }, {
        type: 'heading',
        content: 'Urgent'
    }, {
        type: 'task',
        complete: true,
        content: 'Task 1',
        deadline: '22/07/2024',
        priority: 'high'
    }
]
```

### `stringify`

**Description:** Converts a list of tokens into a markdown string.

**Arguments:** `tokens`: An array of tokens.

**Return value:** `text`: The markdown string.