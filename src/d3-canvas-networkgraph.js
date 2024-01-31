import { scaleOrdinal, forceLink, forceSimulation, forceManyBody, forceCollide, forceX, forceY, create, schemeCategory10 } from 'd3';

export default function (data, options = {
    sticky: false,
    drag: true,
    iterations: 5,
    node: {
        stroke: true,
        radius: 10,
        strokeWidth: 1,
        label: null,
        tooltip: null,
    },
    link: {
        length: null,
    }
}) {
    const app = document.getElementById('app');
    const appRect = app.getBoundingClientRect();
    const width = appRect.width;
    const height = appRect.height;

    // Specify the color scale.
    const color = scaleOrdinal(schemeCategory10);

    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const links = data.links.map(d => ({ ...d }));
    const nodes = data.nodes.map(d => ({ ...d }));

    let radius = options.node.radius ?? 5;

    // Create a simulation with several forces.
    let _forceLink = forceLink(links).id(d => d.id);
    if (options.link?.length) {
        forceLink.distance(options.link.length)
    }
    const simulation = forceSimulation(nodes)
        .force("link", _forceLink)
        .force("charge", forceManyBody())
        .force("collide", forceCollide().radius(radius * 1.5).iterations(options.iterations ?? 5))
        .force("x", forceX(width / 2))
        .force("y", forceY(height / 2));

    const canvas = create("canvas")
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto;");

    const context = canvas.node().getContext('2d');

    let _tooltip = {
        rect: null,
        text: null,
        arrow: null,
    };

    const drawTooltip = (node) => {
        let canvasRect = canvas.node().getBoundingClientRect();

        // get tooltip value to compute possible width
        let tooltip = node.tooltip ?? options.node.tooltip
        if (typeof tooltip === 'function') {
            tooltip = tooltip(node);
        }
        if (typeof tooltip !== 'string') {
            throw new TypeError('tooltip should be string')
        }
        // compute positions
        context.font = `20  px serif`;
        let textMetrics = context.measureText(tooltip);
        let padding = {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10,
        }
        let rectWidth = padding.left + textMetrics.width + padding.right;
        let rectHeight = padding.top + textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent + padding.bottom;
        let rectStartingPointX = node.x - rectWidth / 2;
        let rectStartingPointY = node.y - 10 - rectHeight - radius;
        if (rectStartingPointX + rectWidth > canvasRect.width) {
            rectStartingPointX = canvasRect.width - rectWidth;
        }

        if (rectStartingPointX < 0) {
            rectStartingPointX = 0;
        }

        // draw rect
        _tooltip.rect = {
            x: rectStartingPointX,
            y: rectStartingPointY,
            width: rectWidth,
            height: rectHeight,
        }
        // draw arrow
        _tooltip.arrow = {
            x: [node.x - 5, rectStartingPointY + rectHeight - 2],
            y: [node.x + 5, rectStartingPointY + rectHeight - 2],
            z: [node.x, node.y - radius]
        }


        // draw text
        _tooltip.text = {
            x: rectStartingPointX + rectWidth / 2 - textMetrics.width / 2,
            y: rectStartingPointY + padding.top + rectHeight / 2 - textMetrics.actualBoundingBoxDescent,
            content: tooltip,
        }

        draw();
    }

    const getNearestNodeOnPoint = (pointX, pointY) => {
        let nearestNodes = nodes.map((node) => {
            node.d = Math.sqrt(Math.pow(pointX - node.x, 2) + Math.pow(pointY - node.y, 2));
            return node;
        })
            .filter((node) => node.d < radius)

        if (nearestNodes.length === 0) {
            return null;
        }
        nearestNodes
            .sort((a, b) => a.d >= b.d ? 1 : -1)
        return nearestNodes[0]
    }

    const drag = () => {
        let mouseDown = false;
        let intersectNode = null;
        canvas.on('mousedown', (e) => {
            let rect = canvas.node().getBoundingClientRect();
            mouseDown = true;
            let mouseX = (e.clientX - rect.left) / (rect.right - rect.left) * width;
            let mouseY = (e.clientY - rect.top) / (rect.bottom - rect.top) * height;
            let nearestNode = getNearestNodeOnPoint(mouseX, mouseY);

            if (nearestNode) {
                intersectNode = nearestNode;
            }
        })
        canvas.on('mouseup', (e) => {
            mouseDown = false;
            if (!e.active) simulation.alphaTarget(0);
            if (intersectNode) {
                intersectNode.x = intersectNode.fx;
                intersectNode.y = intersectNode.fy;
            }

            // setting 'null' will reposition the node to the original
            if (!options.sticky && intersectNode) {
                intersectNode.fx = null;
                intersectNode.fy = null;
                intersectNode = null;
            }
        })

        let timeout = null;

        canvas.on('mousemove', (e) => {
            let rect = canvas.node().getBoundingClientRect();
            let mouseX = (e.clientX - rect.left) / (rect.right - rect.left) * width;
            let mouseY = (e.clientY - rect.top) / (rect.bottom - rect.top) * height;
            if (!mouseDown || !intersectNode) {
                let nearestNode = getNearestNodeOnPoint(mouseX, mouseY);
                canvas.style('cursor', nearestNode ? 'grab' : 'auto');
                if (nearestNode && (options.node?.tooltip || nearestNode.tooltip)) {
                    drawTooltip(nearestNode)
                } else {
                    _tooltip.arrow = null;
                    _tooltip.rect = null;
                    _tooltip.text = null;
                    draw();
                }
                return;
            }
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                simulation.alphaTarget(0);
                mouseDown = false;
                if (!options.sticky && intersectNode) {
                    intersectNode.fx = null;
                    intersectNode.fy = null;
                    intersectNode = null;
                }
                canvas.style('cursor', 'auto');
            }, 3000)
            canvas.style('cursor', 'grabbing');
            _tooltip.arrow = null;
            _tooltip.rect = null;
            _tooltip.text = null;
            intersectNode.fx = mouseX;
            intersectNode.fy = mouseY;
            simulation.alphaTarget(0.3).restart()
        })
    }

    function draw() {
        context.save();
        context.clearRect(0, 0, width, height);

        // draw links
        context.strokeStyle = 'white';
        for (let i = 0; i <= links.length - 1; i++) {
            context.beginPath();
            context.moveTo(links[i].source.x, links[i].source.y)
            context.lineTo(links[i].target.x, links[i].target.y)
            context.stroke()
        }

        // draw nodes
        context.lineWidth = options.node.strokeWidth ?? 1;
        for (let i = 0; i <= nodes.length - 1; i++) {
            context.strokeStyle = null;
            let node = nodes[i];

            context.fillStyle = color(node.id);
            context.beginPath();
            context.arc(node.x, node.y, radius, 0, Math.PI * 2)
            context.fill();
            let stroke = node.stroke || options.node?.stroke
            if (stroke) {
                context.strokeStyle = typeof stroke === 'string' ? stroke : '#ffffff';
                context.stroke();
            }

            context.closePath();
            let label = node.label || options.node?.label
            if (label) {
                context.font = `20px serif`;
                context.fillStyle = "black";
                context.fillText(typeof label === 'function' ? label(node) : typeof label === 'boolean' ? node.id : label, node.x - radius / 2, node.y + radius / 2);
            }

        }


        if (_tooltip.rect) {
            // draw rect
            context.fillStyle = 'white';
            context.beginPath();
            context.fillRect(_tooltip.rect.x, _tooltip.rect.y, _tooltip.rect.width, _tooltip.rect.height);
            context.fill();
            context.stroke();
            context.closePath();
        }


        if (_tooltip.arrow) {
            // draw arrow
            context.fillStyle = 'white';
            context.strokeStyle = 'white';
            context.beginPath();
            context.moveTo(_tooltip.arrow.x[0], _tooltip.arrow.x[1]);
            context.lineTo(_tooltip.arrow.y[0], _tooltip.arrow.y[1]);
            context.lineTo(_tooltip.arrow.z[0], _tooltip.arrow.z[1]);
            context.fill();
            context.closePath();
        }

        if (_tooltip.text) {
            // draw text 
            context.fillStyle = "black";
            context.fillText(_tooltip.text.content, _tooltip.text.x, _tooltip.text.y);
        }

        context.restore();
    }

    simulation.on("tick", () => {
        draw();
    });

    if (options.drag ?? true) {
        drag();
    }

    app.appendChild(canvas.node());
}