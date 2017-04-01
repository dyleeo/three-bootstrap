//ROLLUP PACKAGE ALL VENDORS
import {TweenMax, EasePack} from 'gsap';
import * as THREEJS from 'three';
import Stats from 'stats.js';
import testObj from './test.js';



const THREE = THREEJS.THREE;
let stats;
let gui, guiData={testVal:0.1};
let scene, camera, renderer;
let geometry, material, cube;

const init = () => {
  'use strict';

  stats = new Stats();
  document.body.appendChild( stats.dom );

  gui = new dat.GUI();
  gui.add(guiData, 'testVal', -10.0, 10.0);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  renderer = new THREE.WebGLRenderer({antialiasing:true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
  document.querySelectorAll('section.main')[0].appendChild( renderer.domElement );
  geometry = new THREE.BoxGeometry( 1, 1, 1 );
  material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
  cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  camera.position.z = 5;

  render();
  testObj();

  window.addEventListener( 'resize', onWindowResize, false );

};

const render = () => {

  stats.begin();

  cube.rotation.x += 0.1;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);

  stats.end();

  requestAnimationFrame( render );

};

const onWindowResize =()=>{

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

};

init();
