import './style.css'
import D3CanvasNetworkgraph from '../src/d3-canvas-networkgraph';
import * as d3 from 'd3'
import {renderInCanvas} from "../src/renderInCanvas.js";
import {create, forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY} from "d3";

const generateDummyData = (totalNodes, totalLinks, length = 10) => {
    let tnodes = [];
    let links = [];

    const generateLink = () => {
        let sourceNode = parseInt(Math.random() * totalNodes)
        let targetNode = parseInt(Math.random() * totalNodes);
        if (links.filter((link) => (link.source === sourceNode && link.target === targetNode) || (link.source === targetNode && link.target === sourceNode)).length > 0) {
            return null;
        }
        if (!tnodes.includes(sourceNode)) {
            tnodes.push(sourceNode);
        }
        if (!tnodes.includes(targetNode)) {
            tnodes.push(targetNode)
        }
        return {source: sourceNode, target: targetNode, value: parseInt(1 + Math.random() * length)}
    }

    for (let i = 0; i <= totalLinks - 1; i++) {
        let link = null;
        while (true) {
            link = generateLink();
            if (link) {
                break;
            }
        }
        links.push(link)
    }

    let nodes = [];
    for (let i = 0; i <= tnodes.length - 1; i++) {
        nodes.push({
            id: tnodes[i]
        });
    }

    return {nodes: nodes, links: links}
}

const data = generateDummyData(500, 500);
const canvas = document.querySelector('canvas');
let network = D3CanvasNetworkgraph(canvas, data, {
    drag: true,
    zoom: true,
    sticky: false,
    node: {
        border: '#F49FBC',
        borderWidth: 0.2,
        radius: 8,
        label: true,
        // tooltip: (node) => `Lorem ipsum dolor sit amet, consecteturp ${node.id}`,
        // onClick: (node) => console.log('click', node),
        // onHover: (node) => console.log('hover', node),
    },
    link: {
        color: 'white',
    }
});

setTimeout(() => {
    network.update(generateDummyData(400, 400), {
        drag: false,
        zoom: false,
    })
}, 2000)