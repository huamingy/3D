import * as THREE from '../../../build/three.module.js'
import { FBXLoader } from '../../jsm/loaders/FBXLoader.js'
import { OrbitControls } from '../../jsm/controls/OrbitControls.js'

import { CSS3DRenderer } from '../../jsm/renderers/CSS3DRenderer.js'
import { CSS2DRenderer } from '../../jsm/renderers/CSS2DRenderer.js'

// import {
//   setTextrueMove,
//   changeMaterial,
//   AddMeshIntoArr,
// } from './MainFuntion.js'

var scene = new THREE.Scene()

var clock = new THREE.Clock()

var mixer = null
/**
 * 创建网格模型
 */

// const ambient = new THREE.AmbientLight(0xdddddd, 0.8) //环境光源
// scene.add(ambient)

// const point1 = new THREE.PointLight(0xffffff, 2, 5000, 1) //点光源
// point1.position.set(-16, 654, 1425) //点光源位置
// roomGroup.add(point1)

// const point2 = new THREE.PointLight(0xffffff, 2, 5000, 1) //点光源
// point2.position.set(-16, 654, -2862) //点光源位置
// roomGroup.add(point2)
// const dirLight = new THREE.DirectionalLight(0xffffff, 2)
// dirLight.position.set(300, 500, 100)
// scene.add(dirLight)

var AmbientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(AmbientLight)

//坐标系
// var axesHelper = new THREE.AxesHelper(10000)

// scene.add(axesHelper)

/**
 * 相机设置
 */
var width = window.innerWidth //窗口宽度
var height = window.innerHeight //窗口高度
var k = width / height //窗口宽高比

const camera = new THREE.OrthographicCamera(
  width / -7,
  width / 7,
  height / 7,
  height / -7,
  1,
  10000
)
camera.position.set(0, 280, 0) //设置相机位置
camera.lookAt(scene.position) //设置相机方向(指向的场景对象)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(width, height) //设置渲染区域尺寸
renderer.toneMappingExposure = 1
// renderer.shadowMap.enabled = true
renderer.autoClear = false
renderer.gammaInput = true
renderer.gammaOutput = true //inear转gamma
// renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.outputEncoding = THREE.sRGBEncoding
document.body.appendChild(renderer.domElement)

//创建CSS3D渲染器
var labelRender = new CSS3DRenderer()
labelRender.setSize(width, height)
labelRender.domElement.style.position = 'absolute'
// 避免renderer.domElement影响HTMl标签定位，设置top为0px
labelRender.domElement.style.top = '0px'
labelRender.domElement.style.left = '0px'
//设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
labelRender.domElement.style.pointerEvents = 'none'
document.body.appendChild(labelRender.domElement)

//创建CSS3D渲染器
var label2DRender = new CSS2DRenderer()
label2DRender.setSize(width, height)
label2DRender.domElement.style.position = 'absolute'
// 避免renderer.domElement影响HTMl标签定位，设置top为0px
label2DRender.domElement.style.top = '0px'
label2DRender.domElement.style.left = '0px'
//设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
label2DRender.domElement.style.pointerEvents = 'none'
document.body.appendChild(label2DRender.domElement)

var controls = new OrbitControls(camera, renderer.domElement)

// 上下旋转范围
controls.minPolarAngle = 0
// controls.maxPolarAngle = Math.PI/2;
controls.maxPolarAngle = Math.PI / 2
// 启用或禁用摄像机平移
controls.enablePan = false
controls.enableZoom = false
//启用或禁用摄像机水平或垂直旋转
controls.enableRotate = false
var clock = new THREE.Clock()

export {
  labelRender,
  label2DRender,
  scene,
  camera,
  renderer,
  controls,
  clock,
  mixer,
}
