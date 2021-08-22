// vim: ts=2:sw=2
//-----------------------------------------------------------------------------
// art.js - art generation
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// functions
//-----------------------------------------------------------------------------

/**
 * Example of setting up a canvas with p5.js.
 */
function setup() {

  // figure out canvas size
  const width  = window.innerWidth;
  const height = window.innerHeight;

  // setup canvas to match window size
  const renderer = createCanvas(width, height);

  // initi state
  tokenState.tf = 0.0;

}

//-----------------------------------------------------------------------------

/**
 * Draw is required to be defined for processing library to load into the
 *  global scope.
 */
function draw() {

  const {
    shape,
    color
  } = hashToTraits(tokenData.hash);

  const hexToRGB = color => Array.from(Array(3).keys())
    .map(i => i * 2 + 1)
    .map(i => fromHex(color.slice(i, i + 2)));

  // goto center
  const halfWidth  = window.innerWidth / 2;
  const halfHeight = window.innerHeight / 2;
  const center     = [halfWidth, halfHeight]

  // clear background
  background(0, 0, 0);

  // setup render mode
  rectMode(CENTER);

  // goto center + delta
  const delta = Math.cos(tokenState.tf) * 50;
  translate(...center);
  translate(delta, 0);

  // set color
  fill(...hexToRGB(color));

  // draw shape
  const size = tokenState.width * 20;
  if (shape == 'square') {
    rect(0, 0, size, size);
  } else {
    circle(0, 0, size);
  }

  // step
  tokenState.tf = (tokenState.tf + 0.05) % (Math.PI * 2);

}
