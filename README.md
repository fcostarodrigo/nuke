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

### In terminal

```
cli <pathToDelete>

Positionals:
  pathToDelete  String with the path to delete                          [string]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

### As a library

```javascript
const nuke = require("@fcostarodrigo/nuke");

async function main() {
  await nuke("path/to/remove");
  console.log("Files removed");
}

main();
```

## Documentation

```javascript
nuke(pathToDelete, walk, unlink, rmdir);
```

`pathToDelete`: Path with folder or file to delete.

`walk`: Optional function to transverse the file system, defaults to `@fcostarodrigo/walk`.

`unlink`: Optional function to remove files, defaults to `fs.promises.unlink`.

`rmdir`: Optional function to remove folders, defaults to `fs.promises.rmdir`.

Returns a promise that resolves with nothing after the path has been deleted.

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
