import * as THREE from '../../../build/three.module.js'
import { OrbitControls } from '../../jsm/controls/OrbitControls.js'
import {
  CSS3DObject,
  CSS3DRenderer,
} from '../../jsm/renderers/CSS3DRenderer.js'

const scene = new THREE.Scene()
// 点光源（PointLight）表示的是从一个点朝各个方向发射出光线的一种光照效果
const point = new THREE.PointLight(0xffffff, 1)
point.position.set(1, 100, 0) //点光源位置
// 通过add方法插入场景中，不插入的话，渲染的时候不会获取光源的信息进行光照计算
scene.add(point) //点光源添加到场景中
// const point1 = new THREE.PointLight(0xffffff);//点光源
// point1.position.set(100, 300, 600); //点光源位置
// scene.add(point1); //点光源添加到场景中

const AmbientLight = new THREE.AmbientLight(0xf8f8ff, 1)
AmbientLight.position.set(0, 1, 0)
scene.add(AmbientLight)

// 方向光，常常用来表现太阳光照的效果
const dirLight = new THREE.DirectionalLight(0xffffff)
point.position.set(118, 103, -183) //点光源位置
scene.add(dirLight)

const dirLight2 = new THREE.DirectionalLight(0xffffff)
point.position.set(-186, 103, 128) //点光源位置

scene.add(dirLight2)

var camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.01,
  10000
)
camera.position.set(30 * 1.1, 60 * 1.1, 0)
// camera.up.set(1, 0, 1);//镜头面向朝向

scene.background = new THREE.Color(0x010b32)

var boxgeometry = new THREE.BoxGeometry(20, 20, 20)
var boxmaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
})
var box = new THREE.Mesh(boxgeometry, boxmaterial)
// scene.add(box)

/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.autoClear = false
renderer.gammaInput = true
renderer.gammaOutput = true //inear转gamma
document.body.appendChild(renderer.domElement)

var labelRenderer = new CSS3DRenderer()
labelRenderer.setSize(window.innerWidth, window.innerHeight)
labelRenderer.domElement.style.position = 'absolute'
// 避免renderer.domElement影响HTMl标签定位，设置top为0px
labelRenderer.domElement.style.top = '0px'
labelRenderer.domElement.style.left = '0px'
//设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
labelRenderer.domElement.style.pointerEvents = 'auto'
document.body.appendChild(labelRenderer.domElement)

var controls = new OrbitControls(camera, labelRenderer.domElement)

// 上下旋转范围
controls.minPolarAngle = 0
// controls.maxPolarAngle = Math.PI/2;
controls.maxPolarAngle = Math.PI / 2

/**缩放控制 */
controls.minDistance = 30
controls.maxDistance = 100

export { scene, renderer, labelRenderer, camera, controls }
