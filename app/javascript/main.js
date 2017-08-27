//ROLLUP PACKAGE ALL VENDORS
import {TweenMax, EasePack} from 'gsap';
import * as THREE from 'three';
import Stats from 'stats.js';
import * as Stage from './stage.js';

let stats;
let gui, guiData={testVal:0.1};


const init = () => {
  'use strict';

  initStats();
  initDatGui();
  initWindowEvents();
  render();



};

const initStats = () => {
    stats = new Stats();
    document.body.appendChild( stats.dom );
}

const initDatGui = () => {
    gui = new dat.GUI();
    gui.add(guiData, 'testVal', -10.0, 10.0);
}

const initWindowEvents = () => {
    window.addEventListener( 'resize', onWindowResize, false );
}

const render = () => {

  stats.begin();

  Stage.render();

  stats.end();

  requestAnimationFrame( render );

};

const onWindowResize =()=>{
    Stage.windowResizeHandler();
};

init();
