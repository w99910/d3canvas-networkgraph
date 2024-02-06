# D3CanvasNetworkgraph

![GitHub License](https://img.shields.io/github/license/w99910/d3canvas-networkgraph)
[![npm version](https://badge.fury.io/js/d3canvas-networkgraph.svg)](https://badge.fury.io/js/d3canvas-networkgraph)
![NPM Downloads](https://img.shields.io/npm/dt/d3canvas-networkgraph)


Blazing faster than HTML SVG based network-graph ⚡⚡⚡⚡

## Demo

[https://w99910.github.io/d3canvas-networkgraph/](https://w99910.github.io/d3canvas-networkgraph/)

## Installation

```bash
npm install d3canvas-networkgraph
```

## Basic Example

```js
import D3CanvasNetworkgraph from 'd3-canvas-networkgraph';

let networkgraph = D3CanvasNetworkgraph(document.querySelector('canvas'), {
    nodes: [{
        id: 1,
    }, {
        id: 2,
    }, {
        id: 3,
    }],
    links: [{
        source: 1,
        target: 2,
    }, {
        source: 2,
        target: 3,
    }]
})
```

## Usage

- Import the library

```js
import D3CanvasNetworkgraph from 'd3-canvas-networkgraph';
```

or in Vanilla HTML.( Don't forget to replace the latest version )

```html

<html>
...
<body>
...
<script type="module">
    import D3CanvasNetworkgraph
        from "https://cdn.jsdelivr.net/npm/d3canvas-networkgraph@{lastest-version}/dist/d3canvas-networkgraph.es.js";
</script>
</body>
</html>
```

- Initialise graph

```js
// format
D3CanvasNetworkgraph(canvasElement, data, options)
```

CanvasElement should be HTMLCanvasElement.

```js
let canvasElement = document.querySelector('canvas');
```

Data is an `Object` and should have two attributes:

- nodes - An array of nodes. A node must contain `id` attribute if you don't provide custom simulation.
- links - An array of links. A link must contain `source` attribute and `target` attribute if you don't provide custom
  simulation.

- #### Example of nodes and links

Let's say there are two nodes whose ids are 'A' and 'B' respectively, and to form a link between them,

nodes should

```js
let nodes = [{
    id: 'A'
}, {
    id: 'B'
}]

let links = [{
    source: 'A',
    target: 'B',
}]
```

- Options
  Default option values are:

```js
options = {
    sticky: false,
    drag: true,
    simulation: null,
    node: {
        stroke: true,
        radius: 10,
        strokeWidth: 1,
        label: null,
        tooltip: null,
        tooltipFontSize: null,
        onClick: null,
        onHover: null,
    },
    link: {
        color: null,
    }
};
```

> Please note that option value can be changed as the library is developed.

- **sticky** (boolean) : specify whether dragged node should be positioned as it moves.
- **drag** (boolean) : enable drag behavior
- **simulation** (null | d3.forceSimulation): specify your own simulation. Otherwise, simulation will be created as the
  following.
  ```js
  forceSimulation(nodes)
    .force("link", forceLink(links).id(d => d.id))
    .force("charge", forceManyBody())
    .force("center", forceCenter(width / 2, height / 2))
    .force("collide", forceCollide().radius(radius))
    .force("x", forceX(width / 2))
    .force("y", forceY(height / 2))
  ```
- node:
    - **stroke** (boolean| string| null)

      Enable stroke on node. Can specify `boolean` or `string`. If it is `string`, it
      is considered as node
      color. You can pass `stroke` attribute on the node to specify node color. for example `{ id: 1, stroke: '#000' }`
    - **radius** (null | int)

      Specify node radius. You can also specify custom node radius on each
      node. `{ id: 1, radius: 5 }`
    - **strokeWidth** (null | int)

      Specify `strokeWidth` when `stroke` is enabled.
    - **label** ( Function| boolean| string| null)

      Text to display at the node.
      ```js
      { 
        node: { 
           label: (node, index) => node.name // 
        } 
      }
      ```
      Boolean value `true` will create index of the node as label.
      Specifying `label` attribute on `node` object will overwrite this option.
    - **tooltip** ( Function| null )

      Enable tooltip when the node is hovered.
      ```js
      {
       node: {
         tooltip: (node, index) => node.name //
       }
      }
      ```
      Specifying `tooltip` attribute on `node` object will overwrite this option.

    - **tooltipFontSize** (string| int| null)
      Specify tooltip font size.

    - **onClick** ( Function| null)

      a callback when node is clicked
      ```js
      {
       node: {
         onClick: (node, event) => alert('node is clicked') //
       }
      }
      ```

    - **onHover** ( Function| null)

      a callback when hover is hovered
     ```js
      {
        node: {
         onHover: (node, event) => alert('node is hovered') //
        }
      }
     ```
- link:
    - **color** ( string| null)

      Specify link color

## Update and destroy the graph

You can update the nodes and links by passing as first parameter in `update` function and options as `second` parameter.

```js
// Update networkgraph

networkgraph.update({
    nodes: [{
        id: 1,
    }, {
        id: 2,
    }, {
        id: 3,
    }],
    links: [{
        source: 3,
        target: 1,
    }, {
        source: 1,
        target: 3,
    }]
}, options)
```

Destroy the graph

```js
networkgraph.destroy();
```

## License

This project is under MIT license

## Conclusion

Feel free to contribute on this project. And most importantly, have fun.