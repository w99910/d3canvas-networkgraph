# D3CanvasNetworkgraph

Blazing faster than HTML SVG based networkgraph ⚡⚡⚡⚡

> Please note that this project is still under development. Sorry for inconvenience. 

## Demo

[https://w99910.github.io/d3canvas-networkgraph/](https://w99910.github.io/d3canvas-networkgraph/)

## Installation

```bash
npm install d3canvas-networkgraph
```

## Usage

### Basic Example

```js
import D3CanvasNetworkgraph from 'd3-canvas-networkgraph';

D3CanvasNetworkgraph(document.querySelector('canvas-container'), {
    nodes: [{
        id: 1,
    },{
        id: 2,
    },{
        id: 3,
    }],
    links: [{
        source: 1,
        target: 2,
    },{
        source: 2,
        target: 3,
    }]
})
```

