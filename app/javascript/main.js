
import TweenMax from 'gsap/TweenMax';
import EasePack from 'gsap/EasePack';
import testObj from './test.js';
import * as THREEJS from 'three';
const THREE = THREEJS.THREE;


let scene, camera, renderer;
let geometry, material, cube;

let init = () => {
  'use strict';

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  renderer = new THREE.WebGLRenderer({antialiasing:true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
  document.body.appendChild( renderer.domElement );

  geometry = new THREE.BoxGeometry( 1, 1, 1 );
  material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  let render = () => {
    requestAnimationFrame( render );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  render();

  window.addEventListener( 'resize', onWindowResize, false );

  function onWindowResize(){

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

  }
  //testObj();

};

init();
