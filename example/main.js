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

const data = generateDummyData(1000, 1000);
const canvas = document.querySelector('canvas');
let network = D3CanvasNetworkgraph(canvas, data, {
    drag: true,
    node: {
        stroke: '#F49FBC',
        strokeWidth: 1,
        radius: 10,
        tooltip: (node) => `Lorem ipsum dolor sit amet, consecteturp ${node.id}`,
        // onClick: (node) => console.log('click', node),
        // onHover: (node) => console.log('hover', node),
    },
    link: {
        color: 'white'
    }
});

setTimeout(() => {
    network.destroy()
}, 5000)
// const _data = [{"letter": "A", "frequency": 0.08167}, {"letter": "B", "frequency": 0.01492}, {
//     "letter": "C",
//     "frequency": 0.02782
// }, {"letter": "D", "frequency": 0.04253}, {"letter": "E", "frequency": 0.12702}, {
//     "letter": "F",
//     "frequency": 0.02288
// }, {"letter": "G", "frequency": 0.02015}, {"letter": "H", "frequency": 0.06094}, {
//     "letter": "I",
//     "frequency": 0.06966
// }, {"letter": "J", "frequency": 0.00153}, {"letter": "K", "frequency": 0.00772}, {
//     "letter": "L",
//     "frequency": 0.04025
// }, {"letter": "M", "frequency": 0.02406}, {"letter": "N", "frequency": 0.06749}, {
//     "letter": "O",
//     "frequency": 0.07507
// }, {"letter": "P", "frequency": 0.01929}, {"letter": "Q", "frequency": 0.00095}, {
//     "letter": "R",
//     "frequency": 0.05987
// }, {"letter": "S", "frequency": 0.06327}, {"letter": "T", "frequency": 0.09056}, {
//     "letter": "U",
//     "frequency": 0.02758
// }, {"letter": "V", "frequency": 0.00978}, {"letter": "W", "frequency": 0.0236}, {
//     "letter": "X",
//     "frequency": 0.0015
// }, {"letter": "Y", "frequency": 0.01974}, {"letter": "Z", "frequency": 0.00074}]
// const width = 928;
// const height = 500;
// const marginTop = 30;
// const marginRight = 0;
// const marginBottom = 30;
// const marginLeft = 40;
//
// // Declare the x (horizontal position) scale.
// const x = d3.scaleBand()
//     .domain(d3.groupSort(data, ([d]) => -d.frequency, (d) => d.letter)) // descending frequency
//     .range([marginLeft, width - marginRight])
//     .padding(0.1);
//
// // Declare the y (vertical position) scale.
// const y = d3.scaleLinear()
//     .domain([0, d3.max(data, (d) => d.frequency)])
//     .range([height - marginBottom, marginTop]);
//
// // Create the SVG container.
// const svg = d3.create("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("viewBox", [0, 0, width, height])
//     .attr("style", "max-width: 100%; height: auto;");
//
// // Add a rect for each bar.
// svg.append("g")
//     .attr("fill", "steelblue")
//     .selectAll()
//     .data(data)
//     .join("rect")
//     .attr("x", (d) => x(d.letter))
//     .attr("y", (d) => y(d.frequency))
//     .attr("height", (d) => y(0) - y(d.frequency))
//     .attr("width", x.bandwidth());
//
// // Add the x-axis and label.
// svg.append("g")
//     .attr("transform", `translate(0,${height - marginBottom})`)
//     .call(d3.axisBottom(x).tickSizeOuter(0));
//
// // Add the y-axis and label, and remove the domain line.
// svg.append("g")
//     .attr("transform", `translate(${marginLeft},0)`)
//     .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
//     .call(g => g.select(".domain").remove())
//     .call(g => g.append("text")
//         .attr("x", -marginLeft)
//         .attr("y", 10)
//         .attr("fill", "currentColor")
//         .attr("text-anchor", "start")
//         .text("↑ Frequency (%)"));

// document.querySelector('#app').append(svg.node())
// Return the SVG element.
// renderInCanvas(document.querySelector('canvas'),svg.node());
