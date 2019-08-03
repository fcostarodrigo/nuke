# NUKE

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e122e150123e44fe86bd46bd1d8aed1a)](https://app.codacy.com/app/fcostarodrigo/nuke?utm_source=github.com&utm_medium=referral&utm_content=fcostarodrigo/nuke&utm_campaign=Badge_Grade_Dashboard)
[![Build Status](https://travis-ci.org/fcostarodrigo/nuke.svg?branch=master)](https://travis-ci.org/fcostarodrigo/nuke)
[![codecov](https://codecov.io/gh/fcostarodrigo/nuke/branch/master/graph/badge.svg)](https://codecov.io/gh/fcostarodrigo/nuke)

Simple node module to remove files and folders recursively.

## Installation

```bash
npm install @fcostarodrigo/nuke
```

## Usage

```javascript
const nuke = require("@fcostarodrigo/nuke");

async function main() {
  await nuke("path/to/remove");
  console.log("Files removed");
}

main();
```

## Documentation

```typescript
function nuke(pathToDelete: string): Promise<void>;
```

Removes files and folders recursively.

`pathToDelete`: Path with folder or file to delete.

## Development

Full tests with coverage

```bash
npm test
```

Unit tests and watch for changes

```bash
npm run unit-test
```

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
