**NOTE: THIS CLI IS CURRENTLY UNDER HEAVY DEVELOPMENT, USE AT YOUR OWN RISK**

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Coveralls][coveralls-image]][coveralls-url]
[![CI][build-image]][build-url]

### @team-choco/auto-updater

> Keeping your services up to date till the Chocobos come home!

### Usage

```sh
# Basic Example
$ npx @team-choco/auto-updater --package <package-name> -- <command>

# Example with Docker
$ docker run -it --rm node:alpine ash -c "npx @team-choco/auto-updater --package <package-name> -- <command>"
```

[npm-version-image]: https://img.shields.io/npm/v/@team-choco/auto-updater.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/@team-choco/auto-updater.svg?style=flat
[npm-url]: https://npmjs.org/package/@team-choco/auto-updater

[coveralls-image]: https://coveralls.io/repos/github/team-choco/auto-updater/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/team-choco/auto-updater?branch=master

[build-image]: https://github.com/team-choco/auto-updater/workflows/CI/badge.svg
[build-url]: https://github.com/team-choco/auto-updater/actions
