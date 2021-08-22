// vim: ts=2:sw=2
//-----------------------------------------------------------------------------
// art.js - art generation
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// functions
//-----------------------------------------------------------------------------

/**
 * Example of setting up a canvas with three.js.
 */
const setupCanvasThreeJs = () => {

  const width  = window.innerWidth;
  const height = window.innerHeight;
  const scale  = window.devicePixelRatio;
  const body   = document.querySelector('body');

  // setup render to match window size
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(scale);
  renderer.setSize(width, height);
  body.appendChild(renderer.domElement);

  return renderer;

};

//-----------------------------------------------------------------------------

const doArt = (renderer, hash, state) => {

  const {
    shape,
    color,
    size
  } = hashToTraits(hash);

  const canvas = document.querySelector('canvas');

  // initialize scene
  canvas.initialize = () => {
    const ratio    = window.innerWidth / window.innerHeight;
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000);
    const light    = new THREE.AmbientLight(0xa0a0a0);
    const material = new THREE.MeshLambertMaterial({ color: color });

    // create mesh
    const geometry = shape == 'square'
      ? new THREE.BoxGeometry(1, 1, 1)
      : new THREE.SphereGeometry(.5, 32, 16);
    const mesh = new THREE.Mesh(geometry, material);

    // setup scene
    scene.add(mesh);
    scene.add(light);
    camera.position.z = 5;

    state.three = {
      scene: scene,
      camera: camera,
      mesh: mesh
    };
  };

  // render scene
  canvas.render = () => {
    const { scene, camera } = state.three;
    renderer.render(scene, camera);
  };

  // update
  canvas.update = () => {
    const mesh = state.three.mesh;
    mesh.rotation.x += 0.02;
    mesh.rotation.y += 0.01;
    mesh.scale.x     = state.width;
    mesh.scale.y     = 1;
  };

  // render/update loop
  canvas.loop = () => {
    const { scene, camera } = state.three;
    requestAnimationFrame(canvas.loop);
    canvas.update();
    renderer.render(scene, camera);
  };

  canvas.initialize();
  canvas.render();
  canvas.loop();

};

//-----------------------------------------------------------------------------

/**
 * Main entry function.
 */
const run = (tokenData, tokenState) => {
  const renderer = setupCanvasThreeJs();
  doArt(renderer, tokenData.hash, tokenState);
};

//-----------------------------------------------------------------------------
// main
//-----------------------------------------------------------------------------

window.onload = () => {
  run(tokenData, tokenState);
};
