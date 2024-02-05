import {
    scaleOrdinal,
    forceCenter,
    forceLink,
    forceSimulation,
    forceManyBody,
    forceCollide,
    forceX,
    forceY,
    schemeCategory10,
    select
} from 'd3';

export default function (canvas, data, options = {
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
}) {
    const canvasRect = canvas.getBoundingClientRect();
    const width = canvasRect.width;
    const height = canvasRect.height;

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    let simulation = options?.simulation;

    // Specify the color scale.
    const color = scaleOrdinal(schemeCategory10);

    let {links, nodes} = data;

    let radius = options.node?.radius ?? 5;

    const createSimulation = () =>
        forceSimulation(nodes)
            .force("link", forceLink(links).id(d => d.id))
            .force("charge", forceManyBody())
            .force("center", forceCenter(width / 2, height / 2))
            .force("collide", forceCollide().radius(radius))
            .force("x", forceX(width / 2))
            .force("y", forceY(height / 2))

    if (!simulation) {
        simulation = createSimulation();
    }

    const context = canvas.getContext('2d');

    const update = (data, _options = null) => {
        links = data.links;
        nodes = data.nodes;
        if (_options && typeof _options === 'object') {
            Object.keys(_options).forEach((key) => {
                options[key] = _options[key];
            })
        }

        context.clearRect(0, 0, width, height);
        simulation.stop();
        simulation = null;
        simulation = options.simulation ?? createSimulation();

        simulation.on('tick', () => {
            draw();
        })
    }


    let _tooltip = {
        rect: null,
        text: null,
        arrow: null,
    };

    const drawTooltip = (node) => {

        // get tooltip value to compute possible width
        let tooltip = node.tooltip ?? options.node.tooltip
        if (typeof tooltip === 'function') {
            tooltip = tooltip(node);
        }
        if (typeof tooltip !== 'string') {
            throw new TypeError('tooltip should be string')
        }
        // compute positions
        let fontSize = options.node?.tooltipFontSize ?? 20;
        context.font = `${fontSize}px serif`;
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

        if (rectStartingPointY < 0) {
            rectStartingPointY = node.y + 10 + radius;
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
        }).filter((node, i) => {
            let _radius = typeof radius === 'function' ? radius(node, i) : radius;
            return node.d < _radius
        })

        if (nearestNodes.length === 0) {
            return null;
        }
        nearestNodes
            .sort((a, b) => a.d >= b.d ? 1 : -1)
        return nearestNodes[0]
    }

    const getPoint = (event) => {
        if (event.touches) event = event.touches[0];
        return [(event.clientX - canvasRect.left) / (canvasRect.right - canvasRect.left) * width, (event.clientY - canvasRect.top) / (canvasRect.bottom - canvasRect.top) * height];
    }

    const drag = () => {
        let mouseDown = false;
        let intersectNode = null;
        let canvasSelector = select(canvas)
        canvasSelector.on('mousedown touchstart', (e) => {
            e.preventDefault();
            mouseDown = true;
            let [mouseX, mouseY] = getPoint(e)
            let nearestNode = getNearestNodeOnPoint(mouseX, mouseY);
            if (nearestNode) {
                intersectNode = nearestNode;
                intersectNode.fx = mouseX;
                intersectNode.fy = mouseY;

                if (options.node?.onClick) {
                    options.node?.onClick(intersectNode);
                }
            }

            // show tooltip if it is touch event
            if (e.touches) {
                drawTooltip(intersectNode)
            }


        })
        canvasSelector.on('mouseup touchend', (e) => {
            e.preventDefault();
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

        canvasSelector.on('touchmove mousemove', (e) => {
            console.log('move');
            e.preventDefault();
            let [mouseX, mouseY] = getPoint(e)
            if (!mouseDown || !intersectNode) {
                let nearestNode = getNearestNodeOnPoint(mouseX, mouseY);
                canvasSelector.style('cursor', nearestNode ? 'grab' : 'auto');
                if (nearestNode && (options.node?.tooltip || nearestNode.tooltip)) {
                    drawTooltip(nearestNode)

                    if (options.node?.onHover) {
                        options.node?.onHover(nearestNode);
                    }
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
                canvasSelector.style('cursor', 'auto');
            }, 3000)
            canvasSelector.style('cursor', 'grabbing');
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
        for (let i = 0; i <= links.length - 1; i++) {
            let link = links[i];
            let linkColor = link.color || options.link?.color;
            context.strokeStyle = linkColor ? (typeof linkColor === 'function' ? linkColor(link) : linkColor) : 'black';
            context.beginPath();
            context.moveTo(link.source.x, link.source.y)
            context.lineTo(link.target.x, link.target.y)
            context.stroke()
        }

        // draw nodes
        context.lineWidth = options.node.strokeWidth ?? 1;
        for (let i = 0; i <= nodes.length - 1; i++) {
            context.strokeStyle = null;
            let node = nodes[i];

            let nodeColor = node.color || options.node?.color;
            let nodeRadius = node.radius ?? radius;
            if (typeof nodeRadius === 'function') {
                nodeRadius = nodeRadius(node, i);
            }
            context.fillStyle = nodeColor ? (typeof nodeColor === 'function' ? nodeColor(node, i) : nodeColor) : color(node.id);
            context.beginPath();
            node.x = Math.max(nodeRadius, Math.min(width - nodeRadius, node.x))
            node.y = Math.max(nodeRadius, Math.min(height - nodeRadius, node.y))
            context.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2)
            context.fill();
            let stroke = node.stroke || options.node?.stroke
            if (stroke) {
                context.strokeStyle = typeof stroke === 'string' ? stroke : '#ffffff';
                context.stroke();
            }

            context.closePath();
            let label = node.label || options.node?.label
            if (label) {
                context.font = `14px serif`;
                context.fillStyle = "black";
                context.fillText(typeof label === 'function' ? label(node, i) : typeof label === 'boolean' ? node.id : label, node.x - radius / 2, node.y + radius / 2);
            }

        }


        if (_tooltip.rect) {
            // draw rect
            context.fillStyle = 'white';
            context.strokeStyle = 'black'
            context.beginPath();
            context.rect(_tooltip.rect.x, _tooltip.rect.y, _tooltip.rect.width, _tooltip.rect.height);
            context.fill();
            context.stroke();
            context.closePath();
        }


        if (_tooltip.arrow) {
            // draw arrow
            context.fillStyle = 'white';
            context.beginPath();
            context.moveTo(_tooltip.arrow.x[0], _tooltip.arrow.x[1]);
            context.lineTo(_tooltip.arrow.y[0], _tooltip.arrow.y[1]);
            context.lineTo(_tooltip.arrow.z[0], _tooltip.arrow.z[1]);
            context.fill();
            context.closePath();

            context.beginPath();
            context.moveTo(_tooltip.arrow.z[0], _tooltip.arrow.z[1]);
            context.lineTo(_tooltip.arrow.x[0], _tooltip.arrow.x[1]);
            context.moveTo(_tooltip.arrow.z[0], _tooltip.arrow.z[1]);
            context.lineTo(_tooltip.arrow.y[0], _tooltip.arrow.y[1]);
            context.stroke();
            context.closePath()
        }

        if (_tooltip.text) {
            // draw text 
            context.fillStyle = "black";
            let fontSize = options.node?.tooltipFontSize ?? 20;
            context.font = `${fontSize}px serif`;
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

    const destroy = () => {
        simulation = null;
        context.clearRect(0, 0, width, height)

        if (options.drag) {
            let canvasSelector = select(canvas);
            canvasSelector.on('mousedown touchstart', null)
            canvasSelector.on('mouseup touchend', null)
            canvasSelector.on('touchmove mousemove', null)
        }
    }

    return {
        update, destroy
    }
}