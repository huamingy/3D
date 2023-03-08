import * as THREE from '../../build/three.module.js'
import { OrbitControls } from '../jsm/controls/OrbitControls.js'

var scene = new THREE.Scene()

/**
      

* 光源设置
       */
//点光源
var point = new THREE.PointLight(0x333333, 1)
point.position.set(1, 1, -1) //点光源位置
scene.add(point) //点光源添加到场景中

//环境光
var ambient = new THREE.AmbientLight(0xdddddd, 1)
scene.add(ambient)

//  //半球光源
// const hemiLight = new THREE.HemisphereLight( 0xF8F8FF, 0x444444,1);
// 	 hemiLight.position.set( 0, 1, -1 );
// 	 scene.add( hemiLight );

//平行光
var Direction = new THREE.DirectionalLight(0x444444)
Direction.position.set(1, 1, -2)

// 设置mapSize属性可以使阴影更清晰，不那么模糊
Direction.shadow.mapSize.set(1024, 1024)
//  scene.add(Direction);

/**
 * 相机设置
 */
var width = window.innerWidth //窗口宽度
var height = window.innerHeight //窗口高度

var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  10
)
camera.position.set(-1, 0.7, -0.8) //设置相机位置
camera.lookAt(scene.position) //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer({
  antialias: true,
})
renderer.setSize(width, height) //设置渲染区域尺寸
renderer.toneMappingExposure = 1
renderer.shadowMap.enabled = true
renderer.autoClear = false
// renderer.gammaInput = true
// renderer.gammaOutput = true //inear转gamma
// renderer.toneMapping = THREE.ACESFilmicToneMapping

// renderer.setClearColor(0xdddddd, 1)
renderer.outputEncoding = THREE.sRGBEncoding

renderer.setClearColor(0x444444, 1) //设置背景颜色
//局部剖切开始

document.body.appendChild(renderer.domElement) //body元素中插入canvas对象

var controls = new OrbitControls(camera, renderer.domElement)

// // 上下旋转范围
// controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2
controls.maxPolarAngle = Math.PI / 2

// // 左右旋转范围
// controls.minAzimuthAngle = -Math.PI *(60/180);
// controls.maxAzimuthAngle = Math.PI *(60/180);

// 缩放控制
controls.minZoom = 0.9
controls.maxZoom = 3

//  renderer.clippingPlanes=true;

export { scene, camera, renderer, controls }
