//ROLLUP PACKAGE ALL VENDORS
import {TweenMax, EasePack} from 'gsap';
import * as THREE from 'three';

const domMainContainer = document.querySelectorAll('section.main');

const FOV = 75;
const CAM_NEAR = 0.1;
const CAM_FAR = 1000;
let scene, camera, renderer;
let geometry, material, cube;


init();

function initScene() {
    scene = new THREE.Scene();
}

function initCamera() {
    camera = new THREE.PerspectiveCamera( FOV, window.innerWidth / window.innerHeight, CAM_NEAR, CAM_FAR );
    camera.position.z = 5;
}

function initRender() {
    renderer = new THREE.WebGLRenderer({antialiasing:true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    domMainContainer[0].appendChild( renderer.domElement );
}

export function init(){

    initScene();
    initCamera();
    initRender();

    geometry = new THREE.BoxGeometry( 1, 1, 1 );
    material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

}

export function render() {
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

export function windowResizeHandler() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

export default function () {
    'use strict';
    console.log("TESSSST!!!");
}
