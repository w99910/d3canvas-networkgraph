// let's convert svg into canvas
function convertRects(context, svg) {
    svg.querySelectorAll('rect').forEach(function (rect, i) {
        context.beginPath();
        context.fillStyle = 'steelblue'
        context.rect(
            rect.getAttribute('x'),
            rect.getAttribute('y'),
            rect.getAttribute('width'),
            rect.getAttribute('height'));
        context.fill();
        context.closePath();
    })
}

/**
 * Transform value are required to calculate positions
 * @param element
 */
function traverseAndStruct(element) {
    const parseGroup = (g) => {
        // get margin
        let margin = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        }
        let transform = g.getAttribute('transform')
        if (transform) {
            let matrix = new WebKitCSSMatrix(transform)
            console.log(matrix)
        }
        return margin;
    };

    const parseLine = () => {

    }

    const parseCircle = () => {

    }

    const parseRect = () => {

    }

    const parsePath = () => {

    }


    const data = {
        lines: [],
        paths: [],
        circles: [],
        rects: [],
    }
    let children = element.children;
    for (let i = 0; i <= children.length - 1; i++) {
        let child = children[i]
        switch (child.tagName) {
            case 'g' :
                parseGroup(child);
                break;
            default:
                break;
        }
    }
}

function convertCircles(context, svg) {

}

function convertLines() {

}

export function renderInCanvas(canvas, svg) {
    let context = canvas.getContext('2d');
    let boundingClientRect = canvas.getBoundingClientRect();
    let {width, height} = boundingClientRect;
    canvas.setAttribute('width', width)
    canvas.setAttribute('height', height)
    traverseAndStruct(svg);
    context.save();
    context.clearRect(0, 0, width, height);
    // convertRects(context, svg)

    context.restore();
}