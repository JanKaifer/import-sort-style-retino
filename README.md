# import-sort-style-retino

Retino style for [import-sort](https://github.com/renke/import-sort).

## Credits

This style is just a fork of import-sort-style-wes.

## Sorting Example

```js
// Modules that start with 'react'
import React from 'react';
import ReactDom from 'react-dom';
// Other Modules
import _, {...} from 'first-module';
import _, {...} from 'second-module';

// Modules inclued in RETINO_OUR_MODULES_NAMES in .env
import localModule from 'localModule';

// Siblings and parents
import things from '../grand-parent';
import name from '../parent';
import sibling from './sibling';

// Imports without members
import "style.css"
```

## Usage

These instrutions use [prettier](https://prettier.io), which is my preferred
method of enforcing import sort order.

```sh
# Install prettier-plugin-import-sort
yarn add -D prettier-plugin-import-sort

# Install import-sort-style-retino
yarn add -D import-sort-style-retino
```

Then add on your root `package.json`:

```json
{
  "importSort": {
    ".js, .jsx": {
      "parser": "babylon",
      "style": "retino"
    },
    ".ts, .tsx": {
      "parser": "typescript",
      "style": "retino"
    }
  }
}
```

## Config

Use `.import-sort-style-retino-config` file. Used variables:

`RETINO_OUR_MODULES_NAMES` selects which modules should be threated as a local modules (and appear in the second group)

## Development

I've used [yarn](https://yarnpkg.com/en/), and
[tsdx](https://github.com/jaredpalmer/tsdx), which provides scaffolding for
TypeScript libraries.

```sh
# Install yarn, if you don't have it
curl -o- -L https://yarnpkg.com/install.sh | bash

# Install dependencies
yarn install

# Build upon changes (development mode)
yarn run dev

# Lint code
yarn run lint

# Test code
yarn run test

# Build code
yarn run build
```

## License

MIT, https://wes.dev/LICENSE.txt
