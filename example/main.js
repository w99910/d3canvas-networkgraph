import './style.css'
import D3CanvasNetworkgraph from '../src/d3-canvas-networkgraph';

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
    return { source: sourceNode, target: targetNode, value: parseInt(1 + Math.random() * length) }
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

  return { nodes: nodes, links: links }
}

D3CanvasNetworkgraph(document.getElementById('app'),generateDummyData(1000, 1000), {
  drag: true,
  node: {
      stroke: '#F49FBC',
      strokeWidth: 1,
      radius: 10,
      tooltip: (node) => `Lorem ipsum dolor sit amet, consecteturp ${node.id}`,
  }
})