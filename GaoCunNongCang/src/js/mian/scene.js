import * as THREE from '../../../build/three.module.js'
import { OrbitControls } from '../../jsm/controls/OrbitControls.js'

var scene = new THREE.Scene()
scene.background = new THREE.Color(0x363636)

scene.fog = new THREE.Fog(0x363636, 5000, 100000)

var camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  500000
)
camera.position.set(0, 5000, 2000) //设置相机位置
camera.lookAt(0, 0, 0)
const ambient = new THREE.AmbientLight(0xffffff, 0.8) //环境光源
scene.add(ambient)

const point1 = new THREE.PointLight(0xffffff) //点光源
point1.position.set(-60, 3200, 60) //点光源位置
// scene.add(point1) //点光源添加到场景中

var Direction = new THREE.DirectionalLight(0xffffff)
Direction.position.set(-60, 200, 0)
scene.add(Direction)

var renderer = new THREE.WebGLRenderer({
  antialias: true,
  // alpha: true,
})

// var renderer = new THREE.WebGLRenderer({
//   antialias: true,
// })
// renderer.setSize(width, height) //设置渲染区域尺寸
renderer.toneMappingExposure = 1
// // renderer.shadowMap.enabled = true
renderer.autoClear = false
// renderer.gammaInput = true
// renderer.gammaOutput = true //inear转gamma
renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.toneMappingExposure = 1

renderer.outputEncoding = THREE.sRGBEncoding

renderer.setPixelRatio(window.devicePixelRatio)
// renderer.shadowMap.enabled = true
renderer.setClearColor('#444444', 1.0)
renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.toneMappingExposure = 1
// renderer.outputEncoding = THREE.sRGBEncoding
container.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
// 上下旋转范围
controls.minPolarAngle = 0
// controls.maxPolarAngle = Math.PI/2;
controls.maxPolarAngle = Math.PI / 2

controls.minAzimuthAngle = -Math.PI * (100 / 180)
//相机距离观察目标点极小距离——模型最大状态
controls.minDistance = 1000
//相机距离观察目标点极大距离——模型最小状态
controls.maxDistance = 10000
export { scene, renderer, camera }
