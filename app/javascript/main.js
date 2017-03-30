'use strict';

import TweenMax from 'gsap/TweenMax';
import EasePack from 'gsap/EasePack';
import testObj from './test.js';
import * as THREEJS from 'three'

const THREE = THREEJS.THREE;


let init = () => {
  console.log("HELLO! ");

  let scene = new THREE.Scene();
  console.log(THREE)

  testObj();

}

init();
