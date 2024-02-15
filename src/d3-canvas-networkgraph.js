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
    select,
    zoom
} from 'd3';


export default function (canvas, data, options = {
    sticky: false,
    drag: true,
    simulation: null,
    zoom: false,
    events: {
        onZoom: null,
        onResize: null,
    },
    node: {
        border: true,
        radius: 10,
        borderWidth: 1,
        label: null,
        labelFontSize: 14,
        labelColor: null,
        tooltip: null,
        tooltipFontSize: 20,
        onClick: null,
        onHover: null,
        onDrag: null,
    },
    link: {
        color: null,
        width: 1,
    }
}) {
    const canvasRect = canvas.getBoundingClientRect();
    let width = canvasRect.width;
    let height = canvasRect.height;

    let currentTransform = {
        k: 1,
        x: 0,
        y: 0,
    };

    let _zoom = zoom()
        .scaleExtent([1, 8])
        .translateExtent([[0, 0], [width, height]])


    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    let simulation = options?.simulation;

    // Specify the color scale.
    const color = scaleOrdinal(schemeCategory10);

    let { links, nodes } = data;

    let radius = options.node?.radius ?? 5;

    const createDefaultSimulation = () =>
        forceSimulation(nodes)
            .force("link", forceLink(links).id(d => d.id))
            .force("charge", forceManyBody())
            .force("center", forceCenter(width / 2, height / 2))
            .force("collide", forceCollide().radius(radius))
            .force("x", forceX(width / 2))
            .force("y", forceY(height / 2))

    if (!simulation) {
        simulation = createDefaultSimulation();
    }

    const context = canvas.getContext('2d');

    select(canvas).call(_zoom)


    const update = (data = null, _options = null) => {
        if (_options && typeof _options === 'object') {
            Object.keys(_options).forEach((key) => {
                options[key] = _options[key];
            })
        }

        radius = options.node?.radius ?? 10;

        const reinitialiseSimulation = () => {
            context.clearRect(0, 0, width, height);
            simulation.stop();
            simulation = null;
            simulation = options.simulation ?? createDefaultSimulation();

            simulation.on('tick', () => {
                draw();
            })
        }

        if (data) {
            links = data.links;
            nodes = data.nodes;

            reinitialiseSimulation();
        } else if (_options.simulation) {
            reinitialiseSimulation();
        } else {
            draw();
        }
    }

    let _tooltip = {
        rect: null,
        text: null,
        arrow: null,
    };

    const drawTooltip = (node) => {

        // get tooltip value to compute possible width
        let canvasRect = canvas.getBoundingClientRect();
        let tooltip = node.tooltip ?? options.node.tooltip
        if (typeof tooltip === 'function') {
            tooltip = tooltip(node);
        }
        if (typeof tooltip !== 'string') {
            throw new TypeError('tooltip should be string')
        }
        // compute positions
        let fontSize = options.node?.tooltipFontSize ?? 20;
        context.font = `${fontSize / currentTransform.k}px serif`;
        let textMetrics = context.measureText(tooltip);
        let paddingValue = 10 / currentTransform.k;
        let padding = {
            top: 10 / currentTransform.k,
            left: 10 / currentTransform.k,
            right: 10 / currentTransform.k,
            bottom: 10 / currentTransform.k,
        }
        let rectWidth = padding.left + textMetrics.width + padding.right;
        let rectHeight = padding.top + textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent + padding.bottom;
        let rectStartingPointX = node.x - rectWidth / 2;
        let rectStartingPointY = node.y - paddingValue - rectHeight - radius;
        let directionUpward = 1;
        if (rectStartingPointX + rectWidth > canvasRect.width) {
            rectStartingPointX = canvasRect.width - rectWidth;
        }

        if (rectStartingPointX < 0) {
            rectStartingPointX = 0;
        }

        if (rectStartingPointY < 0) {
            rectStartingPointY = node.y + paddingValue + radius;
            directionUpward = 0;
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
            x: [node.x - 5 / currentTransform.k, rectStartingPointY + directionUpward * (rectHeight - 1 / currentTransform.k)],
            y: [node.x + 5 / currentTransform.k, rectStartingPointY + directionUpward * (rectHeight - 1 / currentTransform.k)],
            z: [node.x, node.y - directionUpward * radius]
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
        let canvasRect = canvas.getBoundingClientRect();
        if (event.touches) event = event.touches[0];
        let pointX = (event.clientX - canvasRect.left) / (canvasRect.right - canvasRect.left) * width;
        let pointY = (event.clientY - canvasRect.top) / (canvasRect.bottom - canvasRect.top) * height;
        if (currentTransform) {
            pointX = (pointX - currentTransform.x) / currentTransform.k
            pointY = (pointY - currentTransform.y) / currentTransform.k;
        }
        return [pointX, pointY];
    }

    const listenEvents = () => {
        let mouseDown = false;
        let selectedNode = null;
        let canvasSelector = select(canvas)
        let timeout = null;

        _zoom.on('start', (e) => {
            e = e.sourceEvent;
            e.preventDefault();
            mouseDown = true;
            let [mouseX, mouseY] = getPoint(e)
            let nearestNode = getNearestNodeOnPoint(mouseX, mouseY);
            if (nearestNode) {
                selectedNode = nearestNode;
                selectedNode.fx = mouseX;
                selectedNode.fy = mouseY;

                if (options.node?.onClick) {
                    options.node?.onClick(selectedNode, e);
                }
            }

            // show tooltip if it is touch event
            if (e.touches) {
                drawTooltip(selectedNode)
            }
        }).on('end', (e) => {
            e = e.sourceEvent;
            mouseDown = false;
            if (!e.active) simulation.alphaTarget(0);

            // setting 'null' will reposition the node to the original
            if (!options.sticky && selectedNode) {
                selectedNode.fx = null;
                selectedNode.fy = null;
                selectedNode = null;
            }
        }).on('zoom', (e) => {
            if (!selectedNode || !options.drag || e.sourceEvent.type === 'wheel') {
                if (options.zoom) {
                    currentTransform = e.transform;
                    if (options?.events?.onZoom) {
                        options.events.onZoom(e)
                    }
                    draw();
                }
                return;
            }

            let [mouseX, mouseY] = getPoint(e.sourceEvent)
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
            selectedNode.fx = mouseX;
            selectedNode.fy = mouseY;
            simulation.alphaTarget(0.3).restart();

            if (options?.node?.onDrag) {
                options.node.onDrag(selectedNode, e, { mouseX, mouseY })
            }
        })

        canvasSelector.on('mousemove touchmove', (e) => {
            e.preventDefault();
            if (mouseDown && selectedNode) {
                return
            }
            let [mouseX, mouseY] = getPoint(e)
            let nearestNode = getNearestNodeOnPoint(mouseX, mouseY);
            canvasSelector.style('cursor', nearestNode ? 'grab' : 'auto');

            if (nearestNode) {
                if (options.node?.onHover) {
                    options.node?.onHover(nearestNode, e);
                }
                if (options.node?.tooltip || nearestNode.tooltip) {
                    drawTooltip(nearestNode)
                }
            } else {
                _tooltip.arrow = null;
                _tooltip.rect = null;
                _tooltip.text = null;
                draw();
            }
        })
    }

    function draw() {
        context.save();
        context.clearRect(0, 0, width, height);

        if (currentTransform) {
            context.translate(currentTransform.x, currentTransform.y);
            context.scale(currentTransform.k, currentTransform.k);
        }

        // draw links
        for (let i = 0; i <= links.length - 1; i++) {
            if (options.link?.width) {
                context.lineWidth = options.link?.width / currentTransform.k;
            }
            let link = links[i];
            let linkColor = link.color ?? options.link?.color;
            context.strokeStyle = linkColor ? (typeof linkColor === 'function' ? linkColor(link) : linkColor) : 'black';
            context.beginPath();
            context.moveTo(link.source.x, link.source.y)
            context.lineTo(link.target.x, link.target.y)
            context.stroke()
        }

        // draw nodes
        context.lineWidth = options.node?.borderWidth ?? 1;
        for (let i = 0; i <= nodes.length - 1; i++) {
            context.strokeStyle = null;
            let node = nodes[i];

            let nodeColor = node.color ?? options.node?.color;
            let nodeRadius = node.radius ?? options.node?.radius ?? 10;
            if (typeof nodeRadius === 'function') {
                nodeRadius = nodeRadius(node, i);
            }
            context.fillStyle = nodeColor ? (typeof nodeColor === 'function' ? nodeColor(node, i) : nodeColor) : color(node.id);
            context.beginPath();
            node.x = Math.max(nodeRadius, Math.min(width - nodeRadius, node.x))
            node.y = Math.max(nodeRadius, Math.min(height - nodeRadius, node.y))
            context.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2)
            context.fill();
            let stroke = node.stroke ?? options.node?.border
            if (stroke) {
                context.strokeStyle = typeof stroke === 'string' ? stroke : '#ffffff';
                context.stroke();
            }
            context.closePath();
            let label = node.label ?? options.node?.label
            if (label) {
                let fontSize = options?.node?.labelFontSize ?? 14;
                context.font = `${fontSize}px serif`;
                context.fillStyle = options?.node?.labelColor ?? "black";
                context.fillText(typeof label === 'function' ? label(node, i) : typeof label === 'boolean' ? node.id : label, node.x - radius / 2, node.y + radius / 2);
            }
        }

        if (_tooltip.rect) {
            // draw rect
            context.fillStyle = 'white';
            context.strokeStyle = 'black';
            context.lineWidth = 1 / currentTransform.k;
            context.beginPath();
            context.rect(_tooltip.rect.x, _tooltip.rect.y, _tooltip.rect.width, _tooltip.rect.height);
            context.fill();
            context.stroke();
            context.closePath();
        }

        if (_tooltip.arrow) {
            // draw arrow
            context.lineWidth = 1 / currentTransform.k;
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
            context.font = `${fontSize / currentTransform.k}px serif`;
            context.fillText(_tooltip.text.content, _tooltip.text.x, _tooltip.text.y);
        }

        context.restore();
    }

    simulation.on("tick", () => {
        draw();
    });
    listenEvents();

    let windowResizeTimeout = null;

    window.addEventListener('resize', (e) => {
        const canvasRect = canvas.getBoundingClientRect();

        width = canvasRect.width;
        height = canvasRect.height;
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        if (windowResizeTimeout) clearTimeout(windowResizeTimeout);

        windowResizeTimeout = setTimeout(() => {
            _zoom = zoom()
                .scaleExtent([1, 8])
                .translateExtent([[0, 0], [width, height]])


            // update default simulation if user does not provide
            if (!options.simulation) {
                simulation
                    .force("x", forceX(width / 2))
                    .force("y", forceY(height / 2))
                    .force("center", forceCenter(width / 2, height / 2))
                    .alpha(0.3)
                    .restart()
            }

            if (options?.events?.onResize) {
                options.events.onResize(e);
            }
        }, 200);
    })

    const destroy = () => {
        simulation = null;
        context.clearRect(0, 0, width, height)
        _zoom = null;
    }

    return {
        update, destroy
    }
}