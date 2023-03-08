import * as THREE from '../../../build/three.module.js'
import { GUI } from '../../jsm/libs/dat.gui.module.js'
import { OrbitControls } from '../../jsm/controls/OrbitControls.js'
import { CSS3DRenderer } from '../../jsm/renderers/CSS3DRenderer.js'
import { CSS2DRenderer } from '../../jsm/renderers/CSS2DRenderer.js'

import { GLTFLoader } from '../../jsm/loaders/GLTFLoader.js'

var scene = new THREE.Scene()

/**
 * 光源设置
 */
const ambient = new THREE.AmbientLight(0xffffff, 1) //环境光源
scene.add(ambient)
// const point = new THREE.PointLight(0xffffff) //点光源
// point.position.set(60, 300, 10) //点光源位置
//     // // 通过add方法插入场景中，不插入的话，渲染的时候不会获取光源的信息进行光照计算
// scene.add(point) //点光源添加到场景中

const point1 = new THREE.PointLight(0xffffff) //点光源
point1.position.set(-60, 920, 60) //点光源位置
// scene.add(point1) //点光源添加到场景中

var Direction = new THREE.DirectionalLight(0xffffff)
Direction.position.set(60, 200, 0)
// scene.add(Direction)

const hemiLight = new THREE.HemisphereLight(0xaaaaaa, 0xaaaaaa)
hemiLight.position.set(0, 120, 0)
scene.add(hemiLight)
// //  坐标系
// var axesHelper = new THREE.AxesHelper(115)
// scene.add(axesHelper)
/**
 * 相机设置
 */
var width = window.innerWidth //窗口宽度
var height = window.innerHeight //窗口高度
var k = width / height //窗口宽高比

var camera = new THREE.PerspectiveCamera(45, k, 1, 5000)
camera.position.set(0, 881, 0) //设置相机位置
camera.lookAt(scene.position) //设置相机方向(指向的场景对象)

var GLTFloader = new GLTFLoader() //创建一个FBX加载器
// GLTFloader.load('./models/BG/BG.gltf', function (obj) {
//   console.log('地面模型', obj)
//   // obj.traverse(function (obj) {
//   //
//   //   }
//   // })

//   scene.add(obj.scene)

//   obj.scene.scale.set(100, 100, 100)
// })

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

document.body.appendChild(renderer.domElement) //body元素中插入canvas对象

// 创建一个CSS2渲染器CSS3DRenderer
var labelRenderer = new CSS3DRenderer()
labelRenderer.setSize(window.innerWidth, window.innerHeight)
labelRenderer.domElement.style.position = 'absolute'
// 避免renderer.domElement影响HTMl标签定位，设置top为0px
labelRenderer.domElement.style.top = '0px'
labelRenderer.domElement.style.left = '0px'
//设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
labelRenderer.domElement.style.pointerEvents = 'none'
document.body.appendChild(labelRenderer.domElement)

var CSS2DlabelRender = new CSS2DRenderer()
CSS2DlabelRender.setSize(window.innerWidth, window.innerHeight)
CSS2DlabelRender.domElement.style.position = 'absolute'
// 避免renderer.domElement影响HTMl标签定位，设置top为0px
CSS2DlabelRender.domElement.style.top = '0px'
CSS2DlabelRender.domElement.style.left = '0px'
//设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
CSS2DlabelRender.domElement.style.pointerEvents = 'none'
document.body.appendChild(CSS2DlabelRender.domElement)

var controls = new OrbitControls(camera, renderer.domElement)

// 上下旋转范围
controls.minPolarAngle = 0
// controls.maxPolarAngle = Math.PI/2;
controls.maxPolarAngle = Math.PI / 2
controls.enableRotate = false
// 左右旋转范围
// controls.minAzimuthAngle = -Math.PI * (100 / 180)
// 这一对象包含了用于控制相机平移的按键代码的引用。默认值为4个箭头（方向）键。
// 为指定的DOM元素添加按键监听。推荐将window作为指定的DOM元素。
// controls.listenToKeyEvents(domElement: HTMLDOMElement)
//相机距离观察目标点极小距离——模型最大状态
// controls.minDistance = 700
//相机距离观察目标点极大距离——模型最小状态
// controls.maxDistance = 1500
// 更新控制器。必须在摄像机的变换发生任何手动改变后调用，或如果.autoRotate或.enableDamping被设置时，在update循环里调用。

controls.update()

export { labelRenderer, scene, renderer, camera, controls, CSS2DlabelRender }
