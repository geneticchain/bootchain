// vim: ts=2:sw=2
//-----------------------------------------------------------------------------
// art.js - art generation
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// functions
//-----------------------------------------------------------------------------

/**
 * Create a complex element hierarchy using the html5 template element from a
 *   string.
 */
const elemFromTemplate = html => {
  const template     = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
};

//-----------------------------------------------------------------------------

const createCanvasRaw = (id, width, height) => {
  const html = `
    <canvas id="${id}" width="${width}" height="${height}">`;
  return elemFromTemplate(html);
};

//-----------------------------------------------------------------------------

const getDimUnits = canvas => canvas.width > canvas.height
  ? [canvas.width / canvas.height, 1]
  : [1, canvas.height / canvas.width];

//-----------------------------------------------------------------------------

const drawShape = (canvas, centerX, shape, color, width) => {

  // grab canvas context
  const ctx = canvas.getContext("2d");

  // figure out center of canvas
  const halfWidth      = canvas.width / 2;
  const halfHeight     = canvas.height / 2;
  const center         = {x:halfWidth, y:halfHeight};
  const [xUnit, yUnit] = getDimUnits(canvas);

  // line width are in pixel coords
  const lineFactor = Math.max(halfWidth, halfHeight) / 250;

  // convert coord to pixel
  const pixelX     = x => center.x + x * halfWidth / xUnit;
  const pixelY     = y => center.y + y * halfHeight / yUnit;
  const pixelCoord = ([x, y]) => [pixelX(x), pixelY(y)];

  // clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // setup draw
  ctx.strokeStyle = color;
  ctx.lineWidth   = width * lineFactor;
  ctx.lineCap     = "round";

  // draw shape
  if (shape === 'square') {
    const x = pixelX(centerX - 0.5)
    const y = pixelY(-0.5)
    const w = 1 * (halfWidth / xUnit);
    const h = 1 * (halfHeight / yUnit);
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.stroke();
 } else if (shape == 'circle') {
    const x = pixelX(centerX)
    const y = pixelY(0)
    const w = 0.5 * (halfWidth / xUnit);
    const h = 0.5 * (halfHeight / yUnit);
    ctx.beginPath();
    ctx.arc(x, y, (w, h), 0, 2 * Math.PI);
    ctx.stroke();
  }

};

//-----------------------------------------------------------------------------
// main
//-----------------------------------------------------------------------------

const doArt = (canvas, hash, state) => {

  const {
    seed,
    shape,
    color
  } = hashToTraits(hash);

  // initi state
  canvas.initalize = () => {
    state.tf = 0.0;
  };

  // render state
  canvas.render = () => {
    const delta = Math.cos(state.tf) * 0.5;
    drawShape(canvas, delta, shape, color, state.width);
  };

  // update state
  canvas.update = () => {
    state.tf = (state.tf + 0.1) % (Math.PI * 2);
  };

  // render current state
  canvas.initalize();
  canvas.render();

  // setup render loop
  canvas.loopId = setInterval(() => {
    canvas.update();
    canvas.render();
  }, 60);

};

//-----------------------------------------------------------------------------

/**
 * Setup a canvas.
 */
const setupCanvas = () => {

  // figure out canvas size
  const width  = window.innerWidth;
  const height = window.innerHeight;

  // setup canvas
  const body   = document.querySelector('body');
  const canvas = createCanvasRaw('art-canvas', width, height);
  body.appendChild(canvas);

  return canvas;

};

//-----------------------------------------------------------------------------

/**
 * Example of setting up a canvas with three.js.
 */
const setupCanvasThreeJs = () => {

  const body = document.querySelector('body');

  // setup render to match window size
  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  body.appendChild(renderer.domElement);

  return renderer;

};

//-----------------------------------------------------------------------------

/**
 * Example of setting up a canvas with p5.js.
 */
const setupCanvasProcessingJs = () => {

  // figure out canvas size
  const width  = window.innerWidth;
  const height = window.innerHeight;

  // setup canvas to match window size
  const renderer = createCanvas(width, height);
  return renderer;

};

/**
 * Draw is required to be defined for processing library to load into the
 *  global scope.
 */
function draw() {
};

//-----------------------------------------------------------------------------

/**
 * Main entry function.
 */
const run = (tokenData, tokenState) => {
  const canvas = setupCanvas();
  doArt(canvas, tokenData.hash, tokenState);
};

//-----------------------------------------------------------------------------
// main
//-----------------------------------------------------------------------------

window.onload = () => {
  run(tokenData, tokenState);
};
