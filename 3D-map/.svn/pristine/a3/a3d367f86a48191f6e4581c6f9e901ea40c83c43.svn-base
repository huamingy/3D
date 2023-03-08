import {scene, renderer,camera } from './light.js'
import { OrbitControls } from '../jsm/controls/OrbitControls.js'
import{labelRenderer} from"./tempeture.js"



var controls = new OrbitControls(camera, labelRenderer.domElement)
// 上下旋转范围
controls.minPolarAngle = 0
// controls.maxPolarAngle = Math.PI/2;
controls.maxPolarAngle = Math.PI / 2

// 左右旋转范围
// controls.minAzimuthAngle = -Math.PI /2
controls.maxAzimuthAngle = Math.PI /1.5

//缩放控制
// controls.minZoom = 0.9;
//  controls.maxZoom = 1.7;
// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}
export{renderer,controls}