import * as THREE from '../../../build/three.module.js'
import { GLTFLoader } from '../../jsm/loaders/GLTFLoader.js'
import { OrbitControls } from '../../jsm/controls/OrbitControls.js'
import { Water } from '../../jsm/objects/Water2.js'
import Stats from '../../jsm/libs/stats.module.js'
import {
  CSS2DObject,
  CSS2DRenderer,
} from '../../jsm/renderers/CSS2DRenderer.js'
// 创建性能监视器
let stats = new Stats()
$('#close').click(function () {
  parent.$('#no').trigger('hello') //触发父页面元素的hello方法
})
// 设置监视器面板，传入面板id（0: fps, 1: ms, 2: mb）
stats.setMode(0)
document.body.appendChild(stats.domElement)
const container = document.createElement('div')
document.body.appendChild(container)

var scene = new THREE.Scene()
scene.background = new THREE.Color(0x08332c)

scene.fog = new THREE.Fog(0x08332c, 10, 100)
// scene.add(fog)
var loader = new GLTFLoader()
loader.load(
  'model/GaoChunIrrigationSystemChart/GaoChunIrrigationSystemChart.gltf',
  function (gltf) {
    scene.add(gltf.scene)
    console.log('gltf: ', gltf)
    addEvnmap('Pipe')
    //

    setInterval(function () {
      scene.getObjectByName('Liuid').material.map.offset.x -= 0.005
    })
  }
)
loader.load(
  'model/GaoChunIrrigationSystemChart/GaoChunIrrigationSystemChart_BG.gltf',
  function (gltf) {
    scene.add(gltf.scene)
    console.log('地面: ', gltf)
    scene.getObjectByName('BG').material = new THREE.MeshBasicMaterial({
      map: scene.getObjectByName('BG').material.map,
      color: 0xffffff,
    })
  }
)

var camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  5000
)
camera.position.set(0, 15, 10) //设置相机位置
camera.lookAt(0, 0, 0)
const ambient = new THREE.AmbientLight(0xffffff, 0.8) //环境光源
scene.add(ambient)

const point1 = new THREE.PointLight(0xffffff) //点光源
point1.position.set(-60, 3200, 60) //点光源位置
// scene.add(point1) //点光源添加到场景中

var Direction = new THREE.DirectionalLight(0xffffff)
Direction.position.set(60, 2000, 0)
scene.add(Direction)

function addEvnmap(Floor) {
  const textureLoader = new THREE.TextureLoader()
  var evnmap = textureLoader.load('textures/evnmap/studio_small_09_2k.png')

  evnmap.mapping = THREE.EquirectangularReflectionMapping
  evnmap.encoding = THREE.sRGBEncoding

  var fool = scene.getObjectByName(Floor)
  fool.material = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0.1,

    // map: fool.material.map,
    envMapIntensity: 1,
    envMap: evnmap,
    roughness: 0,
    metalness: 0.5,
    side: THREE.Doubleside,
    depthWrite: false,
  })
  // scene.getObjectByName('Liuid').material.depthWrite = false
}

// function Water(watername) {
//   scene.getObjectByName('STJHD_Water').visible = false
//   var waterGeometry = scene.getObjectByName('STJHD_Water').geometry
//   console.log('watergeometry: ', waterGeometry)
//   var water = new Water(waterGeometry, {
//     color: '#ffffff',
//     scale: 1,
//     flowDirection: new THREE.Vector2(1, 1),
//     textureHeight: 1024,
//     textureWidth: 1024,
//   })
//   water.position.copy(scene.getObjectByName('STJHD_Water').getWorldPosition())
//   water.scale.set(2, 2, 2)
//   scene.add(water)
// }

var renderer = new THREE.WebGLRenderer({
  antialias: true,
  // alpha: true,
})

renderer.autoClear = false

// renderer.gammaInput = true
// renderer.gammaOutput = true //inear转gamma
// renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.toneMappingExposure = 1

renderer.outputEncoding = THREE.sRGBEncoding

renderer.setPixelRatio(window.devicePixelRatio)
// renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.toneMappingExposure = 1
// renderer.outputEncoding = THREE.sRGBEncoding
container.appendChild(renderer.domElement)

var CSS2DlabelRender = new CSS2DRenderer()
CSS2DlabelRender.setSize(window.innerWidth, window.innerHeight)
CSS2DlabelRender.domElement.style.position = 'absolute'
// 避免renderer.domElement影响HTMl标签定位，设置top为0px
CSS2DlabelRender.domElement.style.top = '0px'
CSS2DlabelRender.domElement.style.left = '0px'
//设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
CSS2DlabelRender.domElement.style.pointerEvents = 'none'
document.body.appendChild(CSS2DlabelRender.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
// controls.addEventListener('change', render) // use if there is no animation loop
//启用或禁用摄像机水平或垂直旋转
controls.enableRotate = false

var imgtag = document.getElementById('close')
var CSS2DLabel = new CSS2DObject(imgtag)
// scene.add(CSS2DLabel)

window.addEventListener('resize', onWindowResize)

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)

  render()
}
// const waterGeometry = new THREE.PlaneGeometry(20, 20)

// var water = new Water(waterGeometry, {
//   color: 0xffffff,
//   scale: 1,
//   flowDirection: new THREE.Vector2(1, 1),
//   textureWidth: 1024,
//   textureHeight: 1024,
// })

// water.position.y = 1
// water.rotation.x = Math.PI * -0.5
// scene.add(water)
//
const clock = new THREE.Clock()
function render() {
  const elapsedTime = clock.getElapsedTime()
  requestAnimationFrame(render)
  renderer.render(scene, camera)
  CSS2DlabelRender.render(scene, camera)
  stats.update()
}
render()
