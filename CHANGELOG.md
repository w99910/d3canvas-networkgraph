Major and minor changes are logged here.

## v0.2.4

- Make `zoom` extent configurable.
- Update `README.md`.

## v0.2.3

- Added `node.color` option. 
- Update `README.md`

## v0.2.2

- Change `update` behavior. Now `data` is not mandatory. It can pass data as `null` and will just update options. 

## v0.2.1

- Added `node.onDrag` event listener option.

## v0.2.0

- Added `window` resize event ,and recalculate default simulation when window resizes and custom simulation is not provided. 
- Added `events.onResize` and `events.onZoom` options.
- Added `node.labelColor` and `node.labelFontSize` option.

## v0.1.9

- adjust tooltip scale when zoom is triggered.

## v0.1.8

- fix option `radius` not updated when `update` method is called.

## v0.1.7

- add condition to check if 'zoom' enable or not.

## v0.1.6

- fix typo - replace "||" with "??".

## v0.1.5

- rename option parameter "stroke" to "border".
- rename option parameter "strokeWidth" to "borderWidth".
- remove dist folder when publishing to npm and thus use "github" raw file instead of cdn link.

New Features

- added option "link.width" to change link width.

- ### `zoom` feature

  It enables the chart to zoom in/out using mouse or touch actions
  