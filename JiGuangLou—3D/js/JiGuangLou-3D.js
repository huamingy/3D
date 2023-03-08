import * as THREE from '../build/three.module.js'
import { FBXLoader } from '../jsm/loaders/FBXLoader.js'
import { GUI } from '../jsm/libs/dat.gui.module.js'
// import * as TWEEN from '../jsm/libs/tween.module.min.js'

import { OrbitControls } from '../jsm/controls/OrbitControls.js'
import {
  CSS3DRenderer,
  CSS3DObject,
  CSS3DSprite,
} from '../jsm/renderers/CSS3DRenderer.js'
import { PointerLockControls } from '../jsm/controls/PointerLockControls.js'
var params = {
  en: false,
  enableDevie: true,
  LengQueLouPipe: false,
  LengQueLouEquipmemt: false,
  JiGuangLouPipe: false,
  JiGuangLouEquipment: false,
  JiGuangLouPipefly: false,
  fly: false,
  run: false,
  out: false,
}
var enableFoor1 = true,
  TemHum = true,
  MF = true,
  en,
  OutLet = true,
  LengShuiTa = true,
  LengQueShuiXunHuanPump = true,
  LengDongShuiXunHuanPump = true,
  ReShuiXunHuanPump = true
var JiaYao = true,
  ChunShuiZhungZhi = true,
  DingYa = true,
  ZLBianPingLengQueShuiJiZu = true,
  ShuiLengLuoGanJiZu = true,
  BanReHuanReQi = true,
  ShuiGuanDianJiaRe = true,
  GongYiLengQueShuiPump = true,
  enableDevie,
  LengQueLouPipe = true,
  LengQueLouEquipmemt = true
var PrimaryMesh = [] //被点击的模型对象数组
var Dev = null
var dir = new THREE.Vector3() //飞行漫游方向，起始点构成的方向 默认值0，0，0
var choosemesh = null //射线拾取的模型
var flyBool = false //作为视角移动的条件
var flyPipe = false //作为管道飞行的条件
var label = null //html 弹出标签容器
var pos = null
var nextPos = null
var numb = 8000
var mesh = null
let moveForward = false
let moveBackward = false
let moveLeft = false
let moveRight = false
let canJump = false
let raycaster
const objects = []
const vertex = new THREE.Vector3()
var prevTime = performance.now()
var velocity = new THREE.Vector3() //移动速度变量
var direction = new THREE.Vector3() //移动的方向变量
var rotation = new THREE.Vector3() //当前的相机朝向
var clock = new THREE.Clock()
/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene()
/*
 * 光源设置*/
var point = new THREE.PointLight(0x999999) //点光源
point.castShadow = true
point.position.set(0, 5000, 30000) //点光源位置
scene.add(point) //点光源添加到场景中

const point1 = new THREE.PointLight(0x999999) //点光源
point1.castShadow = true
point1.position.set(0, 5000, -30000) //点光源位置
scene.add(point1) //点光源添加到场景中

const point2 = new THREE.PointLight(0x999999, 0.5) //点光源
point2.castShadow = true
point2.position.set(-550000, 100000, 0) //点光源位置
scene.add(point2) //点光源添加到场景中

var ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)
// var spotLight = new THREE.SpotLight(0xffffff, 0.5)
// // spotLight.castShadow = true
// spotLight.position.set(-30000, 8000, -25000)
// scene.add(spotLight)

const light = new THREE.DirectionalLight(0xffffff, 0.8) // 平行光，颜色为白色，强度为1
light.position.set(-30000, 10000, -25000) // 设置灯源位置
// light.target = Dev
// light.castShadow = true // 允许生成阴影
scene.add(light) // 添加到场景中

// const hemiLight = new THREE.HemisphereLight(0xdddddd, 0x666666)

// hemiLight.position.set(0, 800, 0)
// scene.add(hemiLight)

var width = window.innerWidth //窗口宽度
var height = window.innerHeight //窗口高度
var k = width / height //窗口宽高比

//创建相机对象
var camera = new THREE.PerspectiveCamera(45, k, 10, 500000)
camera.position.set(-31000 / 3, 41000 / 3, 0) //设置相机位置

//创建渲染器对象
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  // alpha: true,
})
renderer.setSize(width, height) //设置渲染区域尺寸
renderer.setClearColor(0x000000, 1) //设置背景颜色
renderer.shadowMap.enabled = true
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1
renderer.outputEncoding = THREE.sRGBEncoding
renderer.localClippingEnabled = true //剖切特定的模型
document.body.appendChild(renderer.domElement) //body元素中插入canvas对象

var control = new OrbitControls(camera, renderer.domElement)
let controls = new PointerLockControls(camera)

scene.add(controls.getObject())

const textureLoader = new THREE.TextureLoader()

var mapcatTexture = textureLoader.load('./img/Matel.png')

var mixer = null
var loader = new FBXLoader()
loader.load('../models/JiGuangLou/JiGungLou.FBX', function (object) {
  console.log('打印对象', object)
  scene.add(object)

  //新建box
  box()
  //根据数值给box上颜色
  color('modbusAhu7', 'modbusAhu7', group7)
  color('modbusAhu6', 'modbusAhu6', groupsix)
  color('modbusAhu5', 'modbusAhu5', groupfive)
  color('modbusAhu4', 'modbusAhu4', groupfour)
  color('modbusAhu3', 'modbusAhu3', groupthree)
  color('modbusAhu2', 'modbusAhu2', grouptwo)
  color('modbusAhu1', 'modbusAhu1', groupone)
  var LQL_OuterPipe = scene.getObjectByName('LQL_OuterPipe')

  LQL_OuterPipe.traverse(function (object) {
    if (object.type === 'Mesh') {
      object.material = new THREE.MeshMatcapMaterial({
        matcap: mapcatTexture,
      })
    }
  })
  // object.traverse(function (child) {
  //   child.isMesh && ((child.castShadow = true), (child.receiveShadow = true))
  // })
  AddMeshIntoArr('JiGuangLouEquipment')
  AddMeshIntoArr('ShuiLengLuoGanJiZu')
  AddMeshIntoArr('LengShuiTa_All')
  AddMeshIntoArr('ZLBianPingLengQueShuiJiZu_All')
  AddMeshIntoArr('GongYiLengQueShuiPump')

  Tree('SugarPalm')
  Tree('Tree01')
  Tree('Tree')
  changeLigtmap('CementRoadLand', 'CementRoadLandLightMap', 'CementRoadLandAO')
  changeLigtmap('Stadium', 'SideWalkLightMap', 'SideWalkAO') //
  changeLigtmap('RoadLand', 'RoadLightMap', 'RoadAO')
  changeLigtmap('PublicSquare', 'SideWalkLightMap', 'SideWalkAO')
  changeLigtmap('SideWalk', 'SideWalkLightMap', 'SideWalkAO')
  changeLigtmap('GrassLand', 'GrassLandLightMap', 'GrassLandAO')
})
loader.load(
  './models/JiGuangLou/JiGungLou_Aircondition.FBX',
  function (object) {
    console.log('打印对象', object)
    scene.add(object)

    mixer = new THREE.AnimationMixer(object)

    var AnimationAction = mixer.clipAction(object.animations[0])
    //console.log('object.animations: ', object.animations);
    AnimationAction.play()
  }
)

loader.load('./models/JiGuangLou/JiGungLou_AHU_PT.FBX', function (object) {
  // console.log('打印对象------', object)
  scene.add(object)
})

// loader.load(
//   './models/JiGuangLou_Opacity_Tree/JiGuangLou_Opacity_Tree_Low.FBX',
//   function (object) {
//     object.traverse(function (mesh) {
//
//     })

//     // console.log('打印对象------', object)
//     scene.add(object)
//   }
// )

/**向点击的数组添加的 */
function AddMeshIntoArr(meshname) {
  var device = scene.getObjectByName(meshname)
  device.traverse(function (obj) {
    if (obj.isMesh) {
      PrimaryMesh.push(obj)
    }
  })
}
function Tree(name) {
  var mesh = scene.getChildByName(name)

  mesh.material.side = THREE.DoubleSide
  mesh.material.side = THREE.DoubleSide
  mesh.material.alphaTest = 0.1
  mesh.material.transparent = true
  mesh.material.vertexColors = false
  mesh.castShadow = true
  mesh.receiveShadow = true
}

function changeLigtmap(name, lightmapimg, AOmap) {
  var mesh = scene.getChildByName(name)

  var lightmap = textureLoader.load(
    `../models/JiGuangLou/` + lightmapimg + `.jpg`
  )
  var aoMap = textureLoader.load(`../models/JiGuangLou/` + AOmap + `.jpg`)

  mesh.material = new THREE.MeshStandardMaterial({
    map: mesh.material.map,
    lightMap: lightmap,
    aoMap: aoMap,
  })
}
var groupone = new THREE.Group()
var grouptwo = new THREE.Group()
var groupthree = new THREE.Group()
var groupfour = new THREE.Group()
var groupfive = new THREE.Group()
var groupsix = new THREE.Group()
var group7 = new THREE.Group()
var AllBOX = new THREE.Group()
function box() {
  var box = new THREE.BoxGeometry(360, 400, 360)
  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet166 = new THREE.Mesh(box, material)
  Outlet166.position.copy(scene.getObjectByName('Outlet166').getWorldPosition())
  Outlet166.position.y =
    scene.getObjectByName('Outlet166').getWorldPosition().y - 200
  groupone.add(Outlet166)

  var box = new THREE.BoxGeometry(360, 400, 360)
  var material = new THREE.MeshLambertMaterial({
    color: 0x00ff4d,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet = new THREE.Mesh(box, material)
  Outlet.position.copy(scene.getObjectByName('Outlet').getWorldPosition())
  Outlet.position.y = scene.getObjectByName('Outlet').getWorldPosition().y - 200
  groupone.add(Outlet)

  var material = new THREE.MeshLambertMaterial({
    color: 0x33ff00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet167 = new THREE.Mesh(box, material)
  Outlet167.position.copy(scene.getObjectByName('Outlet167').getWorldPosition())
  Outlet167.position.y =
    scene.getObjectByName('Outlet167').getWorldPosition().y - 200
  groupone.add(Outlet167)

  var material = new THREE.MeshLambertMaterial({
    color: 0x64ff3d,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet168 = new THREE.Mesh(box, material)
  Outlet168.position.copy(scene.getObjectByName('Outlet168').getWorldPosition())
  Outlet168.position.y =
    scene.getObjectByName('Outlet168').getWorldPosition().y - 200
  groupone.add(Outlet168)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet169 = new THREE.Mesh(box, material)
  Outlet169.position.copy(scene.getObjectByName('Outlet169').getWorldPosition())
  Outlet169.position.y =
    scene.getObjectByName('Outlet169').getWorldPosition().y - 200
  grouptwo.add(Outlet169)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  //170-179-------------------------------------------------------------------------------------------------------
  var Outlet170 = new THREE.Mesh(box, material)
  Outlet170.position.copy(scene.getObjectByName('Outlet170').getWorldPosition())
  Outlet170.position.y =
    scene.getObjectByName('Outlet170').getWorldPosition().y - 200
  grouptwo.add(Outlet170)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet171 = new THREE.Mesh(box, material)
  Outlet171.position.copy(scene.getObjectByName('Outlet171').getWorldPosition())
  Outlet171.position.y =
    scene.getObjectByName('Outlet171').getWorldPosition().y - 200
  grouptwo.add(Outlet171)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet172 = new THREE.Mesh(box, material)
  Outlet172.position.copy(scene.getObjectByName('Outlet172').getWorldPosition())
  Outlet172.position.y =
    scene.getObjectByName('Outlet172').getWorldPosition().y - 200
  grouptwo.add(Outlet172)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet173 = new THREE.Mesh(box, material)
  Outlet173.position.copy(scene.getObjectByName('Outlet173').getWorldPosition())
  Outlet173.position.y =
    scene.getObjectByName('Outlet173').getWorldPosition().y - 200
  groupthree.add(Outlet173)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet174 = new THREE.Mesh(box, material)
  Outlet174.position.copy(scene.getObjectByName('Outlet174').getWorldPosition())
  Outlet174.position.y =
    scene.getObjectByName('Outlet174').getWorldPosition().y - 200
  groupthree.add(Outlet174)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet175 = new THREE.Mesh(box, material)
  Outlet175.position.copy(scene.getObjectByName('Outlet175').getWorldPosition())
  Outlet175.position.y =
    scene.getObjectByName('Outlet175').getWorldPosition().y - 200
  groupthree.add(Outlet175)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet176 = new THREE.Mesh(box, material)
  Outlet176.position.copy(scene.getObjectByName('Outlet176').getWorldPosition())
  Outlet176.position.y =
    scene.getObjectByName('Outlet176').getWorldPosition().y - 200
  groupthree.add(Outlet176)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet177 = new THREE.Mesh(box, material)
  Outlet177.position.copy(scene.getObjectByName('Outlet177').getWorldPosition())
  Outlet177.position.y =
    scene.getObjectByName('Outlet177').getWorldPosition().y - 200

  groupthree.add(Outlet177)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet178 = new THREE.Mesh(box, material)
  Outlet178.position.copy(scene.getObjectByName('Outlet178').getWorldPosition())
  Outlet178.position.y =
    scene.getObjectByName('Outlet178').getWorldPosition().y - 200
  groupthree.add(Outlet178)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet179 = new THREE.Mesh(box, material)
  Outlet179.position.copy(scene.getObjectByName('Outlet179').getWorldPosition())
  Outlet179.position.y =
    scene.getObjectByName('Outlet179').getWorldPosition().y - 200
  groupthree.add(Outlet179)

  //180-189----------------------------------------------------------------------------------------------------------------------------------------------------------------
  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet180 = new THREE.Mesh(box, material)
  Outlet180.position.copy(scene.getObjectByName('Outlet180').getWorldPosition())
  Outlet180.position.y =
    scene.getObjectByName('Outlet180').getWorldPosition().y - 200
  groupthree.add(Outlet180)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet181 = new THREE.Mesh(box, material)
  Outlet181.position.copy(scene.getObjectByName('Outlet181').getWorldPosition())
  Outlet181.position.y =
    scene.getObjectByName('Outlet181').getWorldPosition().y - 200
  groupfour.add(Outlet181)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet182 = new THREE.Mesh(box, material)
  Outlet182.position.copy(scene.getObjectByName('Outlet182').getWorldPosition())
  Outlet182.position.y =
    scene.getObjectByName('Outlet182').getWorldPosition().y - 200
  groupfour.add(Outlet182)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet183 = new THREE.Mesh(box, material)
  Outlet183.position.copy(scene.getObjectByName('Outlet183').getWorldPosition())
  Outlet183.position.y =
    scene.getObjectByName('Outlet183').getWorldPosition().y - 200
  groupfour.add(Outlet183)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet184 = new THREE.Mesh(box, material)
  Outlet184.position.copy(scene.getObjectByName('Outlet184').getWorldPosition())
  Outlet184.position.y =
    scene.getObjectByName('Outlet184').getWorldPosition().y - 200
  groupfour.add(Outlet184)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet185 = new THREE.Mesh(box, material)
  Outlet185.position.copy(scene.getObjectByName('Outlet185').getWorldPosition())
  Outlet185.position.y =
    scene.getObjectByName('Outlet185').getWorldPosition().y - 200
  groupone.add(Outlet185)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet186 = new THREE.Mesh(box, material)
  Outlet186.position.copy(scene.getObjectByName('Outlet186').getWorldPosition())
  Outlet186.position.y =
    scene.getObjectByName('Outlet186').getWorldPosition().y - 200
  groupone.add(Outlet186)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet187 = new THREE.Mesh(box, material)
  Outlet187.position.copy(scene.getObjectByName('Outlet187').getWorldPosition())
  Outlet187.position.y =
    scene.getObjectByName('Outlet187').getWorldPosition().y - 200
  groupone.add(Outlet187)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet188 = new THREE.Mesh(box, material)
  Outlet188.position.copy(scene.getObjectByName('Outlet188').getWorldPosition())
  Outlet188.position.y =
    scene.getObjectByName('Outlet188').getWorldPosition().y - 200
  groupone.add(Outlet188)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet189 = new THREE.Mesh(box, material)
  Outlet189.position.copy(scene.getObjectByName('Outlet189').getWorldPosition())
  Outlet189.position.y =
    scene.getObjectByName('Outlet189').getWorldPosition().y - 200
  grouptwo.add(Outlet189)

  //190-199----------------------------------------------------------------------------------------------------------------------------------------------------------------
  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet190 = new THREE.Mesh(box, material)
  Outlet190.position.copy(scene.getObjectByName('Outlet190').getWorldPosition())
  Outlet190.position.y =
    scene.getObjectByName('Outlet190').getWorldPosition().y - 200
  grouptwo.add(Outlet190)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet191 = new THREE.Mesh(box, material)
  Outlet191.position.copy(scene.getObjectByName('Outlet191').getWorldPosition())
  Outlet191.position.y =
    scene.getObjectByName('Outlet191').getWorldPosition().y - 200
  grouptwo.add(Outlet191)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet192 = new THREE.Mesh(box, material)
  Outlet192.position.copy(scene.getObjectByName('Outlet192').getWorldPosition())
  Outlet192.position.y =
    scene.getObjectByName('Outlet192').getWorldPosition().y - 200
  grouptwo.add(Outlet192)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet193 = new THREE.Mesh(box, material)
  Outlet193.position.copy(scene.getObjectByName('Outlet193').getWorldPosition())
  Outlet193.position.y =
    scene.getObjectByName('Outlet193').getWorldPosition().y - 200
  groupthree.add(Outlet193)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet194 = new THREE.Mesh(box, material)
  Outlet194.position.copy(scene.getObjectByName('Outlet194').getWorldPosition())
  Outlet194.position.y =
    scene.getObjectByName('Outlet194').getWorldPosition().y - 200
  groupthree.add(Outlet194)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet195 = new THREE.Mesh(box, material)
  Outlet195.position.copy(scene.getObjectByName('Outlet195').getWorldPosition())
  Outlet195.position.y =
    scene.getObjectByName('Outlet195').getWorldPosition().y - 200
  groupthree.add(Outlet195)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet196 = new THREE.Mesh(box, material)
  Outlet196.position.copy(scene.getObjectByName('Outlet196').getWorldPosition())
  Outlet196.position.y =
    scene.getObjectByName('Outlet196').getWorldPosition().y - 200
  groupthree.add(Outlet196)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet197 = new THREE.Mesh(box, material)
  Outlet197.position.copy(scene.getObjectByName('Outlet197').getWorldPosition())
  Outlet197.position.y =
    scene.getObjectByName('Outlet197').getWorldPosition().y - 200
  groupthree.add(Outlet197)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet198 = new THREE.Mesh(box, material)
  Outlet198.position.copy(scene.getObjectByName('Outlet198').getWorldPosition())
  Outlet198.position.y =
    scene.getObjectByName('Outlet198').getWorldPosition().y - 200
  groupthree.add(Outlet198)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet199 = new THREE.Mesh(box, material)
  Outlet199.position.copy(scene.getObjectByName('Outlet199').getWorldPosition())
  Outlet199.position.y =
    scene.getObjectByName('Outlet199').getWorldPosition().y - 200
  groupthree.add(Outlet199)

  //200-209----------------------------------------------------------------------------------------------------------------------------------------------------------------
  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet200 = new THREE.Mesh(box, material)
  Outlet200.position.copy(scene.getObjectByName('Outlet200').getWorldPosition())
  Outlet200.position.y =
    scene.getObjectByName('Outlet200').getWorldPosition().y - 200
  groupthree.add(Outlet200)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet201 = new THREE.Mesh(box, material)
  Outlet201.position.copy(scene.getObjectByName('Outlet201').getWorldPosition())
  Outlet201.position.y =
    scene.getObjectByName('Outlet201').getWorldPosition().y - 200
  groupfour.add(Outlet201)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet202 = new THREE.Mesh(box, material)
  Outlet202.position.copy(scene.getObjectByName('Outlet202').getWorldPosition())
  Outlet202.position.y =
    scene.getObjectByName('Outlet202').getWorldPosition().y - 200
  groupfour.add(Outlet202)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet203 = new THREE.Mesh(box, material)
  Outlet203.position.copy(scene.getObjectByName('Outlet203').getWorldPosition())
  Outlet203.position.y =
    scene.getObjectByName('Outlet203').getWorldPosition().y - 200
  groupfour.add(Outlet203)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet204 = new THREE.Mesh(box, material)
  Outlet204.position.copy(scene.getObjectByName('Outlet204').getWorldPosition())
  Outlet204.position.y =
    scene.getObjectByName('Outlet204').getWorldPosition().y - 200
  groupfour.add(Outlet204)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet205 = new THREE.Mesh(box, material)
  Outlet205.position.copy(scene.getObjectByName('Outlet205').getWorldPosition())
  Outlet205.position.y =
    scene.getObjectByName('Outlet205').getWorldPosition().y - 200
  groupone.add(Outlet205)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet206 = new THREE.Mesh(box, material)
  Outlet206.position.copy(scene.getObjectByName('Outlet206').getWorldPosition())
  Outlet206.position.y =
    scene.getObjectByName('Outlet206').getWorldPosition().y - 200
  groupone.add(Outlet206)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet207 = new THREE.Mesh(box, material)
  Outlet207.position.copy(scene.getObjectByName('Outlet207').getWorldPosition())
  Outlet207.position.y =
    scene.getObjectByName('Outlet207').getWorldPosition().y - 200
  groupone.add(Outlet207)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet208 = new THREE.Mesh(box, material)
  Outlet208.position.copy(scene.getObjectByName('Outlet208').getWorldPosition())
  Outlet208.position.y =
    scene.getObjectByName('Outlet208').getWorldPosition().y - 200
  groupone.add(Outlet208)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet209 = new THREE.Mesh(box, material)
  Outlet209.position.copy(scene.getObjectByName('Outlet209').getWorldPosition())
  Outlet209.position.y =
    scene.getObjectByName('Outlet209').getWorldPosition().y - 200
  grouptwo.add(Outlet209)

  //210-219----------------------------------------------------------------------------------------------------------------------------------------------------------------
  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet210 = new THREE.Mesh(box, material)
  Outlet210.position.copy(scene.getObjectByName('Outlet210').getWorldPosition())
  Outlet210.position.y =
    scene.getObjectByName('Outlet210').getWorldPosition().y - 200
  grouptwo.add(Outlet210)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet211 = new THREE.Mesh(box, material)
  Outlet211.position.copy(scene.getObjectByName('Outlet211').getWorldPosition())
  Outlet211.position.y =
    scene.getObjectByName('Outlet211').getWorldPosition().y - 200
  grouptwo.add(Outlet211)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet212 = new THREE.Mesh(box, material)
  Outlet212.position.copy(scene.getObjectByName('Outlet212').getWorldPosition())
  Outlet212.position.y =
    scene.getObjectByName('Outlet212').getWorldPosition().y - 200
  grouptwo.add(Outlet212)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet213 = new THREE.Mesh(box, material)
  Outlet213.position.copy(scene.getObjectByName('Outlet213').getWorldPosition())
  Outlet213.position.y =
    scene.getObjectByName('Outlet213').getWorldPosition().y - 200
  groupthree.add(Outlet213)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet214 = new THREE.Mesh(box, material)
  Outlet214.position.copy(scene.getObjectByName('Outlet214').getWorldPosition())
  Outlet214.position.y =
    scene.getObjectByName('Outlet214').getWorldPosition().y - 200
  groupthree.add(Outlet214)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet215 = new THREE.Mesh(box, material)
  Outlet215.position.copy(scene.getObjectByName('Outlet215').getWorldPosition())
  Outlet215.position.y =
    scene.getObjectByName('Outlet215').getWorldPosition().y - 200
  groupthree.add(Outlet215)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet216 = new THREE.Mesh(box, material)
  Outlet216.position.copy(scene.getObjectByName('Outlet216').getWorldPosition())
  Outlet216.position.y =
    scene.getObjectByName('Outlet216').getWorldPosition().y - 200
  groupthree.add(Outlet216)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet217 = new THREE.Mesh(box, material)
  Outlet217.position.copy(scene.getObjectByName('Outlet217').getWorldPosition())
  Outlet217.position.y =
    scene.getObjectByName('Outlet217').getWorldPosition().y - 200
  groupthree.add(Outlet217)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet218 = new THREE.Mesh(box, material)
  Outlet218.position.copy(scene.getObjectByName('Outlet218').getWorldPosition())
  Outlet218.position.y =
    scene.getObjectByName('Outlet218').getWorldPosition().y - 200
  groupthree.add(Outlet218)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet219 = new THREE.Mesh(box, material)
  Outlet219.position.copy(scene.getObjectByName('Outlet219').getWorldPosition())
  Outlet219.position.y =
    scene.getObjectByName('Outlet219').getWorldPosition().y - 200
  groupthree.add(Outlet219)

  //220-229----------------------------------------------------------------------------------------------------------------------------------------------------------------
  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet220 = new THREE.Mesh(box, material)
  Outlet220.position.copy(scene.getObjectByName('Outlet220').getWorldPosition())
  Outlet220.position.y =
    scene.getObjectByName('Outlet220').getWorldPosition().y - 200
  groupthree.add(Outlet220)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet221 = new THREE.Mesh(box, material)
  Outlet221.position.copy(scene.getObjectByName('Outlet221').getWorldPosition())
  Outlet221.position.y =
    scene.getObjectByName('Outlet221').getWorldPosition().y - 200
  groupfour.add(Outlet221)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet222 = new THREE.Mesh(box, material)
  Outlet222.position.copy(scene.getObjectByName('Outlet222').getWorldPosition())
  Outlet222.position.y =
    scene.getObjectByName('Outlet222').getWorldPosition().y - 200
  groupfour.add(Outlet222)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet223 = new THREE.Mesh(box, material)
  Outlet223.position.copy(scene.getObjectByName('Outlet223').getWorldPosition())
  Outlet223.position.y =
    scene.getObjectByName('Outlet223').getWorldPosition().y - 200
  groupfour.add(Outlet223)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet224 = new THREE.Mesh(box, material)
  Outlet224.position.copy(scene.getObjectByName('Outlet224').getWorldPosition())
  Outlet224.position.y =
    scene.getObjectByName('Outlet224').getWorldPosition().y - 200
  groupfour.add(Outlet224)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet225 = new THREE.Mesh(box, material)
  Outlet225.position.copy(scene.getObjectByName('Outlet225').getWorldPosition())
  Outlet225.position.y =
    scene.getObjectByName('Outlet225').getWorldPosition().y - 200
  groupone.add(Outlet225)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet226 = new THREE.Mesh(box, material)
  Outlet226.position.copy(scene.getObjectByName('Outlet226').getWorldPosition())
  Outlet226.position.y =
    scene.getObjectByName('Outlet226').getWorldPosition().y - 200
  groupone.add(Outlet226)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet227 = new THREE.Mesh(box, material)
  Outlet227.position.copy(scene.getObjectByName('Outlet227').getWorldPosition())
  Outlet227.position.y =
    scene.getObjectByName('Outlet227').getWorldPosition().y - 200
  grouptwo.add(Outlet227)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet228 = new THREE.Mesh(box, material)
  Outlet228.position.copy(scene.getObjectByName('Outlet228').getWorldPosition())
  Outlet228.position.y =
    scene.getObjectByName('Outlet228').getWorldPosition().y - 200
  grouptwo.add(Outlet228)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet229 = new THREE.Mesh(box, material)
  Outlet229.position.copy(scene.getObjectByName('Outlet229').getWorldPosition())
  Outlet229.position.y =
    scene.getObjectByName('Outlet229').getWorldPosition().y - 200
  grouptwo.add(Outlet229)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet230 = new THREE.Mesh(box, material)
  Outlet230.position.copy(scene.getObjectByName('Outlet230').getWorldPosition())
  Outlet230.position.y =
    scene.getObjectByName('Outlet230').getWorldPosition().y - 200
  groupthree.add(Outlet230)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet231 = new THREE.Mesh(box, material)
  Outlet231.position.copy(scene.getObjectByName('Outlet231').getWorldPosition())
  Outlet231.position.y =
    scene.getObjectByName('Outlet231').getWorldPosition().y - 200
  groupthree.add(Outlet231)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet232 = new THREE.Mesh(box, material)
  Outlet232.position.copy(scene.getObjectByName('Outlet232').getWorldPosition())
  Outlet232.position.y =
    scene.getObjectByName('Outlet232').getWorldPosition().y - 200
  groupthree.add(Outlet232)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet233 = new THREE.Mesh(box, material)
  Outlet233.position.copy(scene.getObjectByName('Outlet233').getWorldPosition())
  Outlet233.position.y =
    scene.getObjectByName('Outlet233').getWorldPosition().y - 200
  groupfour.add(Outlet233)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet234 = new THREE.Mesh(box, material)
  Outlet234.position.copy(scene.getObjectByName('Outlet234').getWorldPosition())
  Outlet234.position.y =
    scene.getObjectByName('Outlet234').getWorldPosition().y - 200
  groupfour.add(Outlet234)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet235 = new THREE.Mesh(box, material)
  Outlet235.position.copy(scene.getObjectByName('Outlet235').getWorldPosition())
  Outlet235.position.y =
    scene.getObjectByName('Outlet235').getWorldPosition().y - 200
  groupone.add(Outlet235)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet236 = new THREE.Mesh(box, material)
  Outlet236.position.copy(scene.getObjectByName('Outlet236').getWorldPosition())
  Outlet236.position.y =
    scene.getObjectByName('Outlet236').getWorldPosition().y - 200
  groupone.add(Outlet236)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet237 = new THREE.Mesh(box, material)
  Outlet237.position.copy(scene.getObjectByName('Outlet237').getWorldPosition())
  Outlet237.position.y =
    scene.getObjectByName('Outlet237').getWorldPosition().y - 200
  grouptwo.add(Outlet237)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet238 = new THREE.Mesh(box, material)
  Outlet238.position.copy(scene.getObjectByName('Outlet238').getWorldPosition())
  Outlet238.position.y =
    scene.getObjectByName('Outlet238').getWorldPosition().y - 200
  grouptwo.add(Outlet238)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet239 = new THREE.Mesh(box, material)
  Outlet239.position.copy(scene.getObjectByName('Outlet239').getWorldPosition())
  Outlet239.position.y =
    scene.getObjectByName('Outlet239').getWorldPosition().y - 200
  grouptwo.add(Outlet239)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet240 = new THREE.Mesh(box, material)
  Outlet240.position.copy(scene.getObjectByName('Outlet240').getWorldPosition())
  Outlet240.position.y =
    scene.getObjectByName('Outlet240').getWorldPosition().y - 200
  grouptwo.add(Outlet240)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet241 = new THREE.Mesh(box, material)
  Outlet241.position.copy(scene.getObjectByName('Outlet241').getWorldPosition())
  Outlet241.position.y =
    scene.getObjectByName('Outlet241').getWorldPosition().y - 200
  groupfour.add(Outlet241)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet242 = new THREE.Mesh(box, material)
  Outlet242.position.copy(scene.getObjectByName('Outlet242').getWorldPosition())
  Outlet242.position.y =
    scene.getObjectByName('Outlet242').getWorldPosition().y - 200
  groupfour.add(Outlet242)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet243 = new THREE.Mesh(box, material)
  Outlet243.position.copy(scene.getObjectByName('Outlet243').getWorldPosition())
  Outlet243.position.y =
    scene.getObjectByName('Outlet243').getWorldPosition().y - 200
  groupfour.add(Outlet243)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet244 = new THREE.Mesh(box, material)
  Outlet244.position.copy(scene.getObjectByName('Outlet244').getWorldPosition())
  Outlet244.position.y =
    scene.getObjectByName('Outlet244').getWorldPosition().y - 200
  groupfour.add(Outlet244)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet245 = new THREE.Mesh(box, material)
  Outlet245.position.copy(scene.getObjectByName('Outlet245').getWorldPosition())
  Outlet245.position.y =
    scene.getObjectByName('Outlet245').getWorldPosition().y - 200
  groupone.add(Outlet245)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet246 = new THREE.Mesh(box, material)
  Outlet246.position.copy(scene.getObjectByName('Outlet246').getWorldPosition())
  Outlet246.position.y =
    scene.getObjectByName('Outlet246').getWorldPosition().y - 200
  groupone.add(Outlet246)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet247 = new THREE.Mesh(box, material)
  Outlet247.position.copy(scene.getObjectByName('Outlet247').getWorldPosition())
  Outlet247.position.y =
    scene.getObjectByName('Outlet247').getWorldPosition().y - 200
  grouptwo.add(Outlet247)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet248 = new THREE.Mesh(box, material)
  Outlet248.position.copy(scene.getObjectByName('Outlet248').getWorldPosition())
  Outlet248.position.y =
    scene.getObjectByName('Outlet248').getWorldPosition().y - 200
  grouptwo.add(Outlet248)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet249 = new THREE.Mesh(box, material)
  Outlet249.position.copy(scene.getObjectByName('Outlet249').getWorldPosition())
  Outlet249.position.y =
    scene.getObjectByName('Outlet249').getWorldPosition().y - 200
  grouptwo.add(Outlet249)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet250 = new THREE.Mesh(box, material)
  Outlet250.position.copy(scene.getObjectByName('Outlet250').getWorldPosition())
  Outlet250.position.y =
    scene.getObjectByName('Outlet250').getWorldPosition().y - 200
  grouptwo.add(Outlet250)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet251 = new THREE.Mesh(box, material)
  Outlet251.position.copy(scene.getObjectByName('Outlet251').getWorldPosition())
  Outlet251.position.y =
    scene.getObjectByName('Outlet251').getWorldPosition().y - 200
  groupfour.add(Outlet251)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet252 = new THREE.Mesh(box, material)
  Outlet252.position.copy(scene.getObjectByName('Outlet252').getWorldPosition())
  Outlet252.position.y =
    scene.getObjectByName('Outlet252').getWorldPosition().y - 200
  groupfour.add(Outlet252)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet253 = new THREE.Mesh(box, material)
  Outlet253.position.copy(scene.getObjectByName('Outlet253').getWorldPosition())
  Outlet253.position.y =
    scene.getObjectByName('Outlet253').getWorldPosition().y - 200
  groupfour.add(Outlet253)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet254 = new THREE.Mesh(box, material)
  Outlet254.position.copy(scene.getObjectByName('Outlet254').getWorldPosition())
  Outlet254.position.y =
    scene.getObjectByName('Outlet254').getWorldPosition().y - 200
  groupfour.add(Outlet254)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet255 = new THREE.Mesh(box, material)
  Outlet255.position.copy(scene.getObjectByName('Outlet255').getWorldPosition())
  Outlet255.position.y =
    scene.getObjectByName('Outlet255').getWorldPosition().y - 200
  groupone.add(Outlet255)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet256 = new THREE.Mesh(box, material)
  Outlet256.position.copy(scene.getObjectByName('Outlet256').getWorldPosition())
  Outlet256.position.y =
    scene.getObjectByName('Outlet256').getWorldPosition().y - 200
  groupone.add(Outlet256)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet257 = new THREE.Mesh(box, material)
  Outlet257.position.copy(scene.getObjectByName('Outlet257').getWorldPosition())
  Outlet257.position.y =
    scene.getObjectByName('Outlet257').getWorldPosition().y - 200
  grouptwo.add(Outlet257)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet258 = new THREE.Mesh(box, material)
  Outlet258.position.copy(scene.getObjectByName('Outlet258').getWorldPosition())
  Outlet258.position.y =
    scene.getObjectByName('Outlet258').getWorldPosition().y - 200
  grouptwo.add(Outlet258)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet259 = new THREE.Mesh(box, material)
  Outlet259.position.copy(scene.getObjectByName('Outlet259').getWorldPosition())
  Outlet259.position.y =
    scene.getObjectByName('Outlet259').getWorldPosition().y - 200
  grouptwo.add(Outlet259)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet260 = new THREE.Mesh(box, material)
  Outlet260.position.copy(scene.getObjectByName('Outlet260').getWorldPosition())
  Outlet260.position.y =
    scene.getObjectByName('Outlet260').getWorldPosition().y - 200
  grouptwo.add(Outlet260)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet261 = new THREE.Mesh(box, material)
  Outlet261.position.copy(scene.getObjectByName('Outlet261').getWorldPosition())
  Outlet261.position.y =
    scene.getObjectByName('Outlet261').getWorldPosition().y - 200
  groupfour.add(Outlet261)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet262 = new THREE.Mesh(box, material)
  Outlet262.position.copy(scene.getObjectByName('Outlet262').getWorldPosition())
  Outlet262.position.y =
    scene.getObjectByName('Outlet262').getWorldPosition().y - 200
  groupfour.add(Outlet262)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet263 = new THREE.Mesh(box, material)
  Outlet263.position.copy(scene.getObjectByName('Outlet263').getWorldPosition())
  Outlet263.position.y =
    scene.getObjectByName('Outlet263').getWorldPosition().y - 200
  groupfour.add(Outlet263)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet264 = new THREE.Mesh(box, material)
  Outlet264.position.copy(scene.getObjectByName('Outlet264').getWorldPosition())
  Outlet264.position.y =
    scene.getObjectByName('Outlet264').getWorldPosition().y - 200
  groupfour.add(Outlet264)

  var lflbox = new THREE.BoxGeometry(280, 400, 360)
  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet265 = new THREE.Mesh(lflbox, material)
  Outlet265.position.copy(scene.getObjectByName('Outlet265').getWorldPosition())
  Outlet265.position.y =
    scene.getObjectByName('Outlet265').getWorldPosition().y - 200
  groupfive.add(Outlet265)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet266 = new THREE.Mesh(lflbox, material)
  Outlet266.position.copy(scene.getObjectByName('Outlet266').getWorldPosition())
  Outlet266.position.y =
    scene.getObjectByName('Outlet266').getWorldPosition().y - 200
  groupfive.add(Outlet266)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet267 = new THREE.Mesh(lflbox, material)
  Outlet267.position.copy(scene.getObjectByName('Outlet267').getWorldPosition())
  Outlet267.position.y =
    scene.getObjectByName('Outlet267').getWorldPosition().y - 200
  groupfive.add(Outlet267)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet268 = new THREE.Mesh(lflbox, material)
  Outlet268.position.copy(scene.getObjectByName('Outlet268').getWorldPosition())
  Outlet268.position.y =
    scene.getObjectByName('Outlet268').getWorldPosition().y - 200
  groupfive.add(Outlet268)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet269 = new THREE.Mesh(lflbox, material)
  Outlet269.position.copy(scene.getObjectByName('Outlet269').getWorldPosition())
  Outlet269.position.y =
    scene.getObjectByName('Outlet269').getWorldPosition().y - 200
  groupfive.add(Outlet269)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet270 = new THREE.Mesh(lflbox, material)
  Outlet270.position.copy(scene.getObjectByName('Outlet270').getWorldPosition())
  Outlet270.position.y =
    scene.getObjectByName('Outlet270').getWorldPosition().y - 200
  groupfive.add(Outlet270)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet271 = new THREE.Mesh(lflbox, material)
  Outlet271.position.copy(scene.getObjectByName('Outlet271').getWorldPosition())
  Outlet271.position.y =
    scene.getObjectByName('Outlet271').getWorldPosition().y - 200
  groupfive.add(Outlet271)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet272 = new THREE.Mesh(lflbox, material)
  Outlet272.position.copy(scene.getObjectByName('Outlet272').getWorldPosition())
  Outlet272.position.y =
    scene.getObjectByName('Outlet272').getWorldPosition().y - 200
  groupfive.add(Outlet272)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet273 = new THREE.Mesh(lflbox, material)
  Outlet273.position.copy(scene.getObjectByName('Outlet273').getWorldPosition())
  Outlet273.position.y =
    scene.getObjectByName('Outlet273').getWorldPosition().y - 200
  groupfive.add(Outlet273)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })

  var Outlet274 = new THREE.Mesh(lflbox, material)
  Outlet274.position.copy(scene.getObjectByName('Outlet274').getWorldPosition())
  Outlet274.position.y =
    scene.getObjectByName('Outlet274').getWorldPosition().y - 200
  groupfive.add(Outlet274)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet275 = new THREE.Mesh(lflbox, material)
  Outlet275.position.copy(scene.getObjectByName('Outlet275').getWorldPosition())
  Outlet275.position.y =
    scene.getObjectByName('Outlet275').getWorldPosition().y - 200
  groupfive.add(Outlet275)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet276 = new THREE.Mesh(lflbox, material)
  Outlet276.position.copy(scene.getObjectByName('Outlet276').getWorldPosition())
  Outlet276.position.y =
    scene.getObjectByName('Outlet276').getWorldPosition().y - 200
  groupfive.add(Outlet276)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet277 = new THREE.Mesh(lflbox, material)
  Outlet277.position.copy(scene.getObjectByName('Outlet277').getWorldPosition())
  Outlet277.position.y =
    scene.getObjectByName('Outlet277').getWorldPosition().y - 200
  groupfive.add(Outlet277)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet278 = new THREE.Mesh(lflbox, material)
  Outlet278.position.copy(scene.getObjectByName('Outlet278').getWorldPosition())
  Outlet278.position.y =
    scene.getObjectByName('Outlet278').getWorldPosition().y - 200
  groupfive.add(Outlet278)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet279 = new THREE.Mesh(lflbox, material)
  Outlet279.position.copy(scene.getObjectByName('Outlet279').getWorldPosition())
  Outlet279.position.y =
    scene.getObjectByName('Outlet279').getWorldPosition().y - 200
  groupfive.add(Outlet279)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet280 = new THREE.Mesh(lflbox, material)
  Outlet280.position.copy(scene.getObjectByName('Outlet280').getWorldPosition())
  Outlet280.position.y =
    scene.getObjectByName('Outlet280').getWorldPosition().y - 200
  groupfive.add(Outlet280)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet281 = new THREE.Mesh(lflbox, material)
  Outlet281.position.copy(scene.getObjectByName('Outlet281').getWorldPosition())
  Outlet281.position.y =
    scene.getObjectByName('Outlet281').getWorldPosition().y - 200
  groupfive.add(Outlet281)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet282 = new THREE.Mesh(lflbox, material)
  Outlet282.position.copy(scene.getObjectByName('Outlet282').getWorldPosition())
  Outlet282.position.y =
    scene.getObjectByName('Outlet282').getWorldPosition().y - 200
  groupfive.add(Outlet282)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet283 = new THREE.Mesh(lflbox, material)
  Outlet283.position.copy(scene.getObjectByName('Outlet283').getWorldPosition())
  Outlet283.position.y =
    scene.getObjectByName('Outlet283').getWorldPosition().y - 200
  groupfive.add(Outlet283)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet284 = new THREE.Mesh(lflbox, material)
  Outlet284.position.copy(scene.getObjectByName('Outlet284').getWorldPosition())
  Outlet284.position.y =
    scene.getObjectByName('Outlet284').getWorldPosition().y - 200
  groupfive.add(Outlet284)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet285 = new THREE.Mesh(lflbox, material)
  Outlet285.position.copy(scene.getObjectByName('Outlet285').getWorldPosition())
  Outlet285.position.y =
    scene.getObjectByName('Outlet285').getWorldPosition().y - 200
  groupfive.add(Outlet285)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })

  var Outlet286 = new THREE.Mesh(box, material)
  Outlet286.position.copy(scene.getObjectByName('Outlet286').getWorldPosition())
  Outlet286.position.y =
    scene.getObjectByName('Outlet286').getWorldPosition().y - 200
  groupsix.add(Outlet286)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet287 = new THREE.Mesh(box, material)
  Outlet287.position.copy(scene.getObjectByName('Outlet287').getWorldPosition())
  Outlet287.position.y =
    scene.getObjectByName('Outlet287').getWorldPosition().y - 200
  groupsix.add(Outlet287)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet288 = new THREE.Mesh(box, material)
  Outlet288.position.copy(scene.getObjectByName('Outlet288').getWorldPosition())
  Outlet288.position.y =
    scene.getObjectByName('Outlet288').getWorldPosition().y - 200
  groupsix.add(Outlet288)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet289 = new THREE.Mesh(box, material)
  Outlet289.position.copy(scene.getObjectByName('Outlet289').getWorldPosition())
  Outlet289.position.y =
    scene.getObjectByName('Outlet289').getWorldPosition().y - 200
  groupsix.add(Outlet289)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet290 = new THREE.Mesh(box, material)
  Outlet290.position.copy(scene.getObjectByName('Outlet290').getWorldPosition())
  Outlet290.position.y =
    scene.getObjectByName('Outlet290').getWorldPosition().y - 200
  groupsix.add(Outlet290)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet291 = new THREE.Mesh(box, material)
  Outlet291.position.copy(scene.getObjectByName('Outlet291').getWorldPosition())
  Outlet291.position.y =
    scene.getObjectByName('Outlet291').getWorldPosition().y - 200
  groupsix.add(Outlet291)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet292 = new THREE.Mesh(box, material)
  Outlet292.position.copy(scene.getObjectByName('Outlet292').getWorldPosition())
  Outlet292.position.y =
    scene.getObjectByName('Outlet292').getWorldPosition().y - 200
  groupsix.add(Outlet292)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet293 = new THREE.Mesh(box, material)
  Outlet293.position.copy(scene.getObjectByName('Outlet293').getWorldPosition())
  Outlet293.position.y =
    scene.getObjectByName('Outlet293').getWorldPosition().y - 200
  groupsix.add(Outlet293)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet294 = new THREE.Mesh(box, material)
  Outlet294.position.copy(scene.getObjectByName('Outlet294').getWorldPosition())
  Outlet294.position.y =
    scene.getObjectByName('Outlet294').getWorldPosition().y - 200
  groupsix.add(Outlet294)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet295 = new THREE.Mesh(box, material)
  Outlet295.position.copy(scene.getObjectByName('Outlet295').getWorldPosition())
  Outlet295.position.y =
    scene.getObjectByName('Outlet295').getWorldPosition().y - 200
  groupsix.add(Outlet295)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet296 = new THREE.Mesh(box, material)
  Outlet296.position.copy(scene.getObjectByName('Outlet296').getWorldPosition())
  Outlet296.position.y =
    scene.getObjectByName('Outlet296').getWorldPosition().y - 200
  groupsix.add(Outlet296)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet297 = new THREE.Mesh(box, material)
  Outlet297.position.copy(scene.getObjectByName('Outlet297').getWorldPosition())
  Outlet297.position.y =
    scene.getObjectByName('Outlet297').getWorldPosition().y - 200
  groupsix.add(Outlet297)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet298 = new THREE.Mesh(box, material)
  Outlet298.position.copy(scene.getObjectByName('Outlet298').getWorldPosition())
  Outlet298.position.y =
    scene.getObjectByName('Outlet298').getWorldPosition().y - 200
  groupsix.add(Outlet298)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet299 = new THREE.Mesh(box, material)
  Outlet299.position.copy(scene.getObjectByName('Outlet299').getWorldPosition())
  Outlet299.position.y =
    scene.getObjectByName('Outlet299').getWorldPosition().y - 200
  groupsix.add(Outlet299)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet300 = new THREE.Mesh(box, material)
  Outlet300.position.copy(scene.getObjectByName('Outlet300').getWorldPosition())
  Outlet300.position.y =
    scene.getObjectByName('Outlet300').getWorldPosition().y - 200
  groupsix.add(Outlet300)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet301 = new THREE.Mesh(box, material)
  Outlet301.position.copy(scene.getObjectByName('Outlet301').getWorldPosition())
  Outlet301.position.y =
    scene.getObjectByName('Outlet301').getWorldPosition().y - 200
  groupsix.add(Outlet301)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet302 = new THREE.Mesh(box, material)
  Outlet302.position.copy(scene.getObjectByName('Outlet302').getWorldPosition())
  Outlet302.position.y =
    scene.getObjectByName('Outlet302').getWorldPosition().y - 200
  groupsix.add(Outlet302)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet303 = new THREE.Mesh(box, material)
  Outlet303.position.copy(scene.getObjectByName('Outlet303').getWorldPosition())
  Outlet303.position.y =
    scene.getObjectByName('Outlet303').getWorldPosition().y - 200
  groupsix.add(Outlet303)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet304 = new THREE.Mesh(box, material)
  Outlet304.position.copy(scene.getObjectByName('Outlet304').getWorldPosition())
  Outlet304.position.y =
    scene.getObjectByName('Outlet304').getWorldPosition().y - 200
  groupsix.add(Outlet304)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet305 = new THREE.Mesh(box, material)
  Outlet305.position.copy(scene.getObjectByName('Outlet305').getWorldPosition())
  Outlet305.position.y =
    scene.getObjectByName('Outlet305').getWorldPosition().y - 200
  groupsix.add(Outlet305)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet306 = new THREE.Mesh(box, material)
  Outlet306.position.copy(scene.getObjectByName('Outlet306').getWorldPosition())
  Outlet306.position.y =
    scene.getObjectByName('Outlet306').getWorldPosition().y - 200
  groupsix.add(Outlet306)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet307 = new THREE.Mesh(box, material)
  Outlet307.position.copy(scene.getObjectByName('Outlet307').getWorldPosition())
  Outlet307.position.y =
    scene.getObjectByName('Outlet307').getWorldPosition().y - 200
  groupsix.add(Outlet307)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet308 = new THREE.Mesh(box, material)
  Outlet308.position.copy(scene.getObjectByName('Outlet308').getWorldPosition())
  Outlet308.position.y =
    scene.getObjectByName('Outlet308').getWorldPosition().y - 200
  groupsix.add(Outlet308)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet309 = new THREE.Mesh(box, material)
  Outlet309.position.copy(scene.getObjectByName('Outlet309').getWorldPosition())
  Outlet309.position.y =
    scene.getObjectByName('Outlet309').getWorldPosition().y - 200
  groupsix.add(Outlet309)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet310 = new THREE.Mesh(box, material)
  Outlet310.position.copy(scene.getObjectByName('Outlet310').getWorldPosition())
  Outlet310.position.y =
    scene.getObjectByName('Outlet310').getWorldPosition().y - 200
  groupsix.add(Outlet310)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet311 = new THREE.Mesh(box, material)
  Outlet311.position.copy(scene.getObjectByName('Outlet311').getWorldPosition())
  Outlet311.position.y =
    scene.getObjectByName('Outlet311').getWorldPosition().y - 200
  groupsix.add(Outlet311)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet312 = new THREE.Mesh(box, material)
  Outlet312.position.copy(scene.getObjectByName('Outlet312').getWorldPosition())
  Outlet312.position.y =
    scene.getObjectByName('Outlet312').getWorldPosition().y - 200
  groupsix.add(Outlet312)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet313 = new THREE.Mesh(lflbox, material)
  Outlet313.position.copy(scene.getObjectByName('Outlet313').getWorldPosition())
  Outlet313.position.y =
    scene.getObjectByName('Outlet313').getWorldPosition().y - 200
  group7.add(Outlet313)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet314 = new THREE.Mesh(lflbox, material)
  Outlet314.position.copy(scene.getObjectByName('Outlet314').getWorldPosition())
  Outlet314.position.y =
    scene.getObjectByName('Outlet314').getWorldPosition().y - 200
  group7.add(Outlet314)

  var btbox = new THREE.BoxGeometry(280, 400, 280)
  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet315 = new THREE.Mesh(btbox, material)
  Outlet315.name = '315'
  Outlet315.position.copy(scene.getObjectByName('Outlet315').getWorldPosition())
  Outlet315.position.y =
    scene.getObjectByName('Outlet315').getWorldPosition().y - 200
  group7.add(Outlet315)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet316 = new THREE.Mesh(btbox, material)
  Outlet316.position.copy(scene.getObjectByName('Outlet316').getWorldPosition())
  Outlet316.position.y =
    scene.getObjectByName('Outlet316').getWorldPosition().y - 200
  group7.add(Outlet316)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet317 = new THREE.Mesh(btbox, material)
  Outlet317.position.copy(scene.getObjectByName('Outlet317').getWorldPosition())
  Outlet317.position.y =
    scene.getObjectByName('Outlet317').getWorldPosition().y - 200
  group7.add(Outlet317)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet318 = new THREE.Mesh(btbox, material)
  Outlet318.position.copy(scene.getObjectByName('Outlet318').getWorldPosition())
  Outlet318.position.y =
    scene.getObjectByName('Outlet318').getWorldPosition().y - 200
  group7.add(Outlet318)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet319 = new THREE.Mesh(btbox, material)
  Outlet319.position.copy(scene.getObjectByName('Outlet319').getWorldPosition())
  Outlet319.position.y =
    scene.getObjectByName('Outlet319').getWorldPosition().y - 200
  group7.add(Outlet319)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })

  var Outlet320 = new THREE.Mesh(btbox, material)
  Outlet320.position.copy(scene.getObjectByName('Outlet320').getWorldPosition())
  Outlet320.position.y =
    scene.getObjectByName('Outlet320').getWorldPosition().y - 200
  group7.add(Outlet320)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet321 = new THREE.Mesh(btbox, material)
  Outlet321.position.copy(scene.getObjectByName('Outlet321').getWorldPosition())
  Outlet321.position.y =
    scene.getObjectByName('Outlet321').getWorldPosition().y - 200
  group7.add(Outlet321)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet322 = new THREE.Mesh(btbox, material)
  Outlet322.position.copy(scene.getObjectByName('Outlet322').getWorldPosition())
  Outlet322.position.y =
    scene.getObjectByName('Outlet322').getWorldPosition().y - 200
  group7.add(Outlet322)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet323 = new THREE.Mesh(btbox, material)
  Outlet323.position.copy(scene.getObjectByName('Outlet323').getWorldPosition())
  Outlet323.position.y =
    scene.getObjectByName('Outlet323').getWorldPosition().y - 200
  group7.add(Outlet323)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet324 = new THREE.Mesh(btbox, material)
  Outlet324.position.copy(scene.getObjectByName('Outlet324').getWorldPosition())
  Outlet324.position.y =
    scene.getObjectByName('Outlet324').getWorldPosition().y - 200
  group7.add(Outlet324)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet325 = new THREE.Mesh(btbox, material)
  Outlet325.position.copy(scene.getObjectByName('Outlet325').getWorldPosition())
  Outlet325.position.y =
    scene.getObjectByName('Outlet325').getWorldPosition().y - 200
  group7.add(Outlet325)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet326 = new THREE.Mesh(btbox, material)
  Outlet326.position.copy(scene.getObjectByName('Outlet326').getWorldPosition())
  Outlet326.position.y =
    scene.getObjectByName('Outlet326').getWorldPosition().y - 200
  group7.add(Outlet326)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet327 = new THREE.Mesh(btbox, material)
  Outlet327.position.copy(scene.getObjectByName('Outlet327').getWorldPosition())
  Outlet327.position.y =
    scene.getObjectByName('Outlet327').getWorldPosition().y - 200
  group7.add(Outlet327)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet328 = new THREE.Mesh(btbox, material)
  Outlet328.position.copy(scene.getObjectByName('Outlet328').getWorldPosition())
  Outlet328.position.y =
    scene.getObjectByName('Outlet328').getWorldPosition().y - 200
  group7.add(Outlet328)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet329 = new THREE.Mesh(btbox, material)
  Outlet329.position.copy(scene.getObjectByName('Outlet329').getWorldPosition())
  Outlet329.position.y =
    scene.getObjectByName('Outlet329').getWorldPosition().y - 200
  group7.add(Outlet329)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet330 = new THREE.Mesh(btbox, material)
  Outlet330.position.copy(scene.getObjectByName('Outlet330').getWorldPosition())
  Outlet330.position.y =
    scene.getObjectByName('Outlet330').getWorldPosition().y - 200
  group7.add(Outlet330)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet331 = new THREE.Mesh(box, material)
  Outlet331.position.copy(scene.getObjectByName('Outlet331').getWorldPosition())
  Outlet331.position.y =
    scene.getObjectByName('Outlet331').getWorldPosition().y - 200
  groupone.add(Outlet331)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet332 = new THREE.Mesh(box, material)
  Outlet332.position.copy(scene.getObjectByName('Outlet332').getWorldPosition())
  Outlet332.position.y =
    scene.getObjectByName('Outlet332').getWorldPosition().y - 200
  groupone.add(Outlet332)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet333 = new THREE.Mesh(box, material)
  Outlet333.position.copy(scene.getObjectByName('Outlet333').getWorldPosition())
  Outlet333.position.y =
    scene.getObjectByName('Outlet333').getWorldPosition().y - 200
  groupone.add(Outlet333)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet334 = new THREE.Mesh(box, material)
  Outlet334.position.copy(scene.getObjectByName('Outlet334').getWorldPosition())
  Outlet334.position.y =
    scene.getObjectByName('Outlet334').getWorldPosition().y - 200
  groupone.add(Outlet334)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet335 = new THREE.Mesh(box, material)
  Outlet335.position.copy(scene.getObjectByName('Outlet335').getWorldPosition())
  Outlet335.position.y =
    scene.getObjectByName('Outlet335').getWorldPosition().y - 200
  groupone.add(Outlet335)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet336 = new THREE.Mesh(box, material)
  Outlet336.position.copy(scene.getObjectByName('Outlet336').getWorldPosition())
  Outlet336.position.y =
    scene.getObjectByName('Outlet336').getWorldPosition().y - 200
  groupone.add(Outlet336)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet337 = new THREE.Mesh(box, material)
  Outlet337.position.copy(scene.getObjectByName('Outlet337').getWorldPosition())
  Outlet337.position.y =
    scene.getObjectByName('Outlet337').getWorldPosition().y - 200
  groupone.add(Outlet337)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet338 = new THREE.Mesh(box, material)
  Outlet338.position.copy(scene.getObjectByName('Outlet338').getWorldPosition())
  Outlet338.position.y =
    scene.getObjectByName('Outlet338').getWorldPosition().y - 200
  groupone.add(Outlet338)

  var material = new THREE.MeshLambertMaterial({
    color: 0xeeee00,
    transparent: true,
    opacity: 0.8,
  })
  var Outlet339 = new THREE.Mesh(box, material)
  Outlet339.position.copy(scene.getObjectByName('Outlet339').getWorldPosition())
  Outlet339.position.y =
    scene.getObjectByName('Outlet339').getWorldPosition().y - 200
  groupsix.add(Outlet339)

  AllBOX.add(groupone)
  AllBOX.add(grouptwo)
  AllBOX.add(groupthree)
  AllBOX.add(groupfour)
  AllBOX.add(groupfive)
  AllBOX.add(groupsix)
  AllBOX.add(group7)
  scene.add(AllBOX)
  //console.log('group7: ', group7);
}
var outletopcity = false,
  hiddenBox = false

/**通风管道透明 */
$('#outletopcity').click(function () {
  scene.getObjectByName('AHU_Pipe').traverse(function (mesh) {
    mesh.isMesh && (mesh.material.visible = outletopcity)
  })
  // scene.getObjectByName('OutLet').traverse(function (mesh) {
  //   mesh.isMesh && (mesh.material.visible = a)
  // })
  outletopcity = outletopcity == false ? true : false
})
$('#hiddenBox').click(function () {
  AllBOX.traverse(function (mesh) {
    mesh.isMesh && (mesh.material.visible = hiddenBox)
  })
  hiddenBox = hiddenBox == false ? true : false
})

/**点击触发向上移动动画 */
$('#btn').click(function () {
  setTime(function () {
    if (MF) {
      MF = false
      moveFloor('Both_Roof', 6050)
    } else {
      MF = true
      moveFloor('Both_Roof', -6050)
    }
  })
})
/**横切展示内部 */
$('#enableFoor').click(function () {
  var diss = camera.position.clone().sub(scene.position).length()
  Dev = scene.getObjectByName('JiguangLou')
  if (enableFoor1 == true) {
    enableFoor1 = false
    var PlaneArr = [new THREE.Plane(new THREE.Vector3(0, -1, 0), 450)]

    Dev.traverse(function (obj) {
      if (obj.type == 'Mesh') {
        obj.material.clippingPlanes = PlaneArr
      }
    })

    if (
      params.JiGuangLouEquipment == true ||
      params.LengQueLouEquipmemt == true ||
      num !== 0
    ) {
    } else if (diss < 13000) {
      pos = scene.position
      numb = 8000
      dir.copy(pos.clone().sub(camera.position)).normalize()
      flyBool = true //允许飞行
    } else {
      camera.position.set(-9000, 19500, 0) //设置相机位置
      // camera.lookAt(0, 0, 0)
      camera.lookAt(0, 0, 0)
      pos = scene.position
      numb = 8000
      dir.copy(pos.clone().sub(camera.position)).normalize()
      flyBool = true //允许飞行
    }
  } else {
    enableFoor1 = true
    var PlaneArr = [new THREE.Plane(new THREE.Vector3(0, -1, 0), 6000)]
    Dev.traverse(function (obj) {
      if (obj.type == 'Mesh') {
        obj.material.clippingPlanes = PlaneArr
      }
    })
    flyBool = false
  }
})

$('#TemHum').click(function () {
  if (TemHum) {
    TemHum = false
    $('#th_label').html('')
    addthlabel('AHU01', 'AHU01', 'modbusAhu1', 'modbusAhu1_temp')
    addthlabel('AHU02', 'AHU02', 'modbusAhu2', 'modbusAhu2_temp')

    addthlabel('AHU03', 'AHU03', 'modbusAhu3', 'modbusAhu3_temp')
    addthlabel('AHU04', 'AHU04', 'modbusAhu4', 'modbusAhu4_temp')
    addthlabel('AHU05', 'AHU05', 'modbusAhu5', 'modbusAhu5_temp')
    addthlabel('AHU06', 'AHU06', 'modbusAhu6', 'modbusAhu6_temp')
    addthlabel('AHU07', 'AHU07', 'modbusAhu7', 'modbusAhu7_temp')
  } else {
    TemHum = true
    removethlabel('AHU01')
    removethlabel('AHU02')

    removethlabel('AHU03')
    removethlabel('AHU04')
    removethlabel('AHU05')
    removethlabel('AHU06')
    removethlabel('AHU07')
  }
})

/**冷却楼管道 */
$('#LengQueLouPipe').click(function () {
  var device = scene.getObjectByName('LengQueLouPipe')
  // plane(LengQueLouPipe)

  if (LengQueLouPipe == true) {
    LengQueLouPipe = false
    device.children.forEach(function (mesh) {
      addline(mesh)
    })
  } else {
    LengQueLouPipe = true
    device.children.forEach(function (mesh) {
      removeline(mesh)
    })
  }
})
/**通风口 */
$('#OutLet').click(function () {
  plane(OutLet)
  box()
  if (OutLet == true) {
    OutLet = false
    mesh.children.forEach(function (mesh) {
      addline(mesh)
    })
  } else {
    OutLet = true
    mesh.children.forEach(function (mesh) {
      removeline(mesh)
    })
  }
})
/**冷冻水循环 */
$('#LengDongShuiXunHuanPump').click(function () {
  plane(LengDongShuiXunHuanPump)
  if (LengDongShuiXunHuanPump == true) {
    LengDongShuiXunHuanPump = false
    movecamera('Pump04', 0, 600, 100)
    addOtherLAbel('LengDongShuiXunHuanPump')
  } else {
    LengDongShuiXunHuanPump = true
    deleteOtherLAbel('LengDongShuiXunHuanPump')
  }
})
/**冷却水循环 */
$('#LengQueShuiXunHuanPump').click(function () {
  plane(LengQueShuiXunHuanPump)
  if (LengQueShuiXunHuanPump == true) {
    LengQueShuiXunHuanPump = false
    movecamera('Pump01', 0, 600, 100)
    addOtherLAbel('LengQueShuiXunHuanPump')
  } else {
    LengQueShuiXunHuanPump = true
    deleteOtherLAbel('LengQueShuiXunHuanPump')
  }
})
/**热水循环水泵 */
$('#ReShuiXunHuanPump').click(function () {
  plane(ReShuiXunHuanPump)
  if (ReShuiXunHuanPump == true) {
    ReShuiXunHuanPump = false
    movecamera('Pump07', 0, 600, 100)
    addOtherLAbel('ReShuiXunHuanPump')
  } else {
    ReShuiXunHuanPump = true
    deleteOtherLAbel('ReShuiXunHuanPump')
  }
})
/**工艺冷却水泵 */
$('#GongYiLengQueShuiPump').click(function () {
  plane(GongYiLengQueShuiPump)
  if (GongYiLengQueShuiPump == true) {
    GongYiLengQueShuiPump = false
    movecamera('GongYiLengQueShuiPump', 0, 400, -200)
    addOtherLAbel('GongYiLengQueShuiPump')
  } else {
    GongYiLengQueShuiPump = true
    deleteOtherLAbel('GongYiLengQueShuiPump')
  }
})
/**水冷螺杆机组 */
$('#ShuiLengLuoGanJiZu').click(function () {
  plane(ShuiLengLuoGanJiZu)

  if (ShuiLengLuoGanJiZu == true) {
    ShuiLengLuoGanJiZu = false
    movecamera('ShuiLengLuoGanJiZu', -500, 1000, 0)
    addOtherLAbel('ShuiLengLuoGanJiZu')
  } else {
    ShuiLengLuoGanJiZu = true
    deleteOtherLAbel('ShuiLengLuoGanJiZu')
  }
})
/**冷水塔 */
$('#LengShuiTa').click(function () {
  plane(LengShuiTa)
  if (LengShuiTa == true) {
    movecamera('LengShuiTa01', -500, 1000, 0)
    addOtherLAbel('LengShuiTa_All')
    LengShuiTa = false
  } else {
    deleteOtherLAbel('LengShuiTa_All')
    LengShuiTa = true
  }
})
/**水管电加热 */
$('#ShuiGuanDianJiaRe').click(function () {
  plane(ShuiGuanDianJiaRe)
  var mesh = scene.getObjectByName('ShuiGuanDianJiaRe')

  if (ShuiGuanDianJiaRe == true) {
    ShuiGuanDianJiaRe = false
    movecamera('ShuiGuanDianJiaRe', 0, 200, -300)
    addline(mesh)
    mesh.scale.set(2, 2, 2)
  } else {
    ShuiGuanDianJiaRe = true
    removeline(mesh)
    mesh.scale.set(1, 1, 1)
  }
})
/**板式换热器 */
$('#BanReHuanReQi').click(function () {
  plane(BanReHuanReQi)

  if (BanReHuanReQi == true) {
    BanReHuanReQi = false
    movecamera('BanReHuanReQi', -400, 0, 0)
    addOtherLAbel('BanReHuanReQi')
  } else {
    BanReHuanReQi = true
    deleteOtherLAbel('BanReHuanReQi')
  }
})
/** '直流变频工艺冷冻水机组*/
$('#ZLBianPingLengQueShuiJiZu').click(function () {
  plane(ZLBianPingLengQueShuiJiZu)

  if (ZLBianPingLengQueShuiJiZu == true) {
    addOtherLAbel('ZLBianPingLengQueShuiJiZu_All')
    movecamera('ZLBianPingLengQueShuiJiZu_All', 0, 900, -400)
    ZLBianPingLengQueShuiJiZu = false
  } else {
    deleteOtherLAbel('ZLBianPingLengQueShuiJiZu_All')
    ZLBianPingLengQueShuiJiZu = true
  }
})
/**纯水装置 */
$('#ChunShuiZhungZhi').click(function () {
  plane(ChunShuiZhungZhi)
  var mesh = scene.getObjectByName('ChunShuiZhungZhi')
  if (ChunShuiZhungZhi == true) {
    ChunShuiZhungZhi = false
    mesh.scale.set(1000, 1000, 1000)
    movecamera('ChunShuiZhungZhi', -400, 100, 0)
    mesh.scale.set(2, 2, 2)
  } else {
    ChunShuiZhungZhi = true
    removeline(mesh)
    mesh.scale.set(1, 1, 1)
  }
})
/** 定压补水装置*/
$('#DingYa').click(function () {
  var mesh = scene.getObjectByName('DingYaBuShuiZhuangZhi')

  if (DingYa == true) {
    DingYa = false
    movecamera('DingYaBuShuiZhuangZhi', 0, 900, -400)
    addline(mesh)
    mesh.scale.set(1.5, 1.5, 1)
  } else {
    DingYa = true
    mesh.scale.set(1, 1, 1)
    removeline(mesh)
  }
})
/**加药装置 */
$('#JiaYao').click(function () {
  var mesh = scene.getObjectByName('JiaYaoZhuangZhi001')
  plane(JiaYao)
  if (JiaYao == true) {
    JiaYao = false
    movecamera('JiaYaoZhuangZhi001', 0, 0, 400)
    addline(mesh)
  } else {
    JiaYao = true
    removeline(mesh)
    mesh.scale.set(1, 1, 1)
  }
})

$('#start').click(function () {
  controls.lock()
})

$('#kongtiaoxunjian').click(function () {
  camera.position.set(2700, 150, 258)
  control.target.set(2700, 150, 278)
  control.update()
})

$('#lengquelouxunjian').click(function () {
  camera.position.set(4300, 250, 1220)
  control.target.set(4310, 253, 1200)
  control.update()
})
$('#exit').click(function () {
  flyPipe = false
  flyBool = false
  num = 0
  movecamera()
})

// var TrendsGui = new GUI()
// TrendsGui.add(params, 'run')
//   .name('暂停/继续')
//   .onChange((e) => {
//     if (num == 0) {
//       flyPipe = false
//     } else {
//       if (flyPipe == true || flyBool == true) {
//         flyPipe = false
//         flyBool = false
//       } else {
//         flyPipe = true
//       }
//     }
//   })

//鼠标单击事件
var chooseMesh, RepeatMesh

function choose(event) {
  if (chooseMesh) {
    RepeatMesh = chooseMesh
    chooseMesh.parent.parent.name == 'JiGuangLouEquipment' &&
      deleteModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
  }
  var Sx = event.clientX //鼠标单击位置横坐标
  var Sy = event.clientY //鼠标单击位置纵坐标
  //屏幕坐标转WebGL标准设备坐标
  var x = (Sx / window.innerWidth) * 2 - 1 //WebGL标准设备横坐标
  var y = -(Sy / window.innerHeight) * 2 + 1 //WebGL标准设备纵坐标
  //创建一个射线投射器`Raycaster`
  var raycaster = new THREE.Raycaster()
  //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera)
  //返回.intersectObjects()参数中射线选中的网格模型对象
  // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
  var intersects = raycaster.intersectObjects(PrimaryMesh)

  //   intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
    chooseMesh = intersects[0].object

    if (chooseMesh.parent.name == 'Aircondition_ALKO') {
      showmessaeg('modbusAhu1', 'modbusAhu1', 'AHU1')
      ShowModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
    } else if (chooseMesh.parent.name == 'Aircondition_ALKO01') {
      showmessaeg('modbusAhu2', 'modbusAhu2', 'AHU2')
      ShowModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
    } else if (chooseMesh.parent.name == 'Aircondition_ALKO02') {
      showmessaeg('modbusAhu3', 'modbusAhu3', 'AHU3')
      ShowModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
    } else if (chooseMesh.parent.name == 'Aircondition_ALKO03') {
      showmessaeg('modbusAhu4', 'modbusAhu4', 'AHU4')
      ShowModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
    } else if (chooseMesh.parent.name == 'Aircondition_ALKO04') {
      showmessaeg('modbusAhu5', 'modbusAhu5', 'AHU5')
      ShowModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
    } else if (chooseMesh.parent.name == 'Aircondition_ALKO05') {
      showmessaeg('modbusAhu6', 'modbusAhu6', 'AHU6')
      ShowModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
    } else if (chooseMesh.parent.name == 'Aircondition_ALKO06') {
      showmessaeg('modbusAhu7', 'modbusAhu7', 'AHU7')
      ShowModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
    } else if (chooseMesh.name == 'Aircondition_ALKO007') {
      showmessaeg('modbusAhu8', 'modbusAhu8', 'AHU8')
      ShowModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
    } else if (chooseMesh.name == 'LQL_Equipment') {
      showmessaeg('modbusScrewMachine', 'modbusScrewMachine1', '水冷螺杆机01')
    } else if (chooseMesh.name == 'LQL_Equipment01') {
      showmessaeg('modbusScrewMachine', 'modbusScrewMachine2', '水冷螺杆机02')
    } else if (chooseMesh.name == 'LQL_Equipment02') {
      showmessaeg('modbusScrewMachine', 'modbusScrewMachine3', '水冷螺杆机03')
    } else if (chooseMesh.name == 'LengShuiTa') {
      showmessaeg('modbusCoolTower', 'modbusCoolTower01', '冷水塔01')
    } else if (chooseMesh.name == 'LengShuiTa01') {
      showmessaeg('modbusCoolTower', 'modbusCoolTower02', '冷水塔02')
    } else if (chooseMesh.name == 'LengShuiTa02') {
      showmessaeg('modbusCoolTower', 'modbusCoolTower03', '冷水塔03')
    } else if (chooseMesh.parent.name == 'ZLBianPingLengQueShuiJiZu_All') {
      showmessaeg('modbusCraftOuter', 'modbusCraftOuter', '工艺冷却水机组')
    } else if (chooseMesh.parent.name == 'GongYiLengQueShuiPump') {
      showmessaeg('modbusCraftInner', 'modbusCraftInner', '工艺冷却水泵')
    }
  }
}

var changecolorMesh

function changecolor() {
  if (changecolorMesh) {
    changecolorMesh.material.color.set(
      changecolorMesh.parent.name == 'GongYiLengQueShuiPump'
        ? 0x000000
        : 0x888888
    )
  }

  var Sx = event.clientX //鼠标单击位置横坐标
  var Sy = event.clientY //鼠标单击位置纵坐标
  //屏幕坐标转WebGL标准设备坐标
  var x = (Sx / window.innerWidth) * 2 - 1 //WebGL标准设备横坐标
  var y = -(Sy / window.innerHeight) * 2 + 1 //WebGL标准设备纵坐标
  //创建一个射线投射器`Raycaster`
  var raycaster = new THREE.Raycaster()
  //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera)
  //返回.intersectObjects()参数中射线选中的网格模型对象
  // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
  var intersects = raycaster.intersectObjects(PrimaryMesh)

  //   intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
    changecolorMesh = intersects[0].object
    //  //console.log('changecolorMesh: ', changecolorMesh);

    changecolorMesh.material.color.set(0x33ffff)
  }
}

addEventListener('pointermove', changecolor)
addEventListener('click', choose) // 监听窗口鼠标

//空调部分标签

function addOtherLAbel(meshName) {
  var havingmesh = scene.getObjectByName(meshName)
  // console.log('havingmesh.children[0]: ', havingmesh.children[0])
  // fly(havingmesh.children[0])

  // numb = 1500
  havingmesh.children.forEach(function (mesh) {
    addline(mesh)
    if (LengShuiTa == true || ZLBianPingLengQueShuiJiZu == true) {
    } else {
      mesh.scale.set(2, 2, 2)
    }
  })
}

function deleteOtherLAbel(mesh) {
  var havingmesh = scene.getObjectByName(mesh)
  havingmesh.children.forEach(function (mesh) {
    mesh.scale.set(1, 1, 1)
    removeline(mesh)
  })
}
/**添加点击按钮 */
// $('#Control').append(
//   '<button style="padding-left:0px" id="btn" >测试 </button>'
// )
/**封装一个延时方法，3秒内只能点击一次 */
function setTime(callback) {
  setTime.prototype.init(callback)
}
setTime.prototype = {
  canclick: true,
  init: function (callback) {
    if (this.canclick) {
      this.canclick = false
      callback()
      setTimeout(
        function () {
          this.canclick = true
        }.bind(this),
        3000
      )
    } else {
      console.log('三秒未到不允许点击')
    }
  },
}

/**移动动画 */
function moveFloor(floor, distance) {
  var twofloorposition = scene.getObjectByName(floor)
  twofloorposition.traverse(function (mesh) {
    if (mesh.isMesh) {
      var pos = mesh.position
      var tween = new TWEEN.Tween(pos)
      tween.to(
        {
          z: pos.z + distance,
        },
        3000
      )
      tween.onUpdate(function () {
        mesh.position.z = pos.z
      })
      tween.start()
    }
  })
}
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

function ShowModbusAhuPipe(chooseMesh) {
  var mesh = scene.getChildByName(chooseMesh)

  mesh.material.color.set(0x33ffff)
  // mesh.traverse(function (obj) {
  //   obj.type == 'Mesh' && obj.material.color.set(0x33ffff)
  // })
}

function deleteModbusAhuPipe(chooseMesh) {
  var mesh = scene.getChildByName(chooseMesh)

  mesh.material.color.set(0x999999)
  // mesh.traverse(function (obj) {
  //   obj.type == 'Mesh' && obj.material.color.set(0x33ffff)
  // })
}

function addline(mesh) {
  var edges = new THREE.EdgesGeometry(mesh.geometry, 1)
  var edgesMaterial = new THREE.LineBasicMaterial({
    color: 0x31deef,
  })
  var line = new THREE.LineSegments(edges, edgesMaterial)
  line.name = mesh
  mesh.add(line)
}

function removeline(mesh) {
  var line = scene.getObjectByName(mesh)
  mesh.remove(line)
}

function plane(e) {
  var diss = camera.position.clone().sub(scene.position).length()
  Dev = scene.getObjectByName('JiguangLou')
  if (e == true) {
    var PlaneArr = [
      //创建一个垂直x轴的平面，方向沿着x轴负方向，沿着x轴正方向平移20,
      // new THREE.Plane(new THREE.Vector3(-1, 0, 0), 20),
      // 垂直y轴的平面
      new THREE.Plane(new THREE.Vector3(0, -1, 0), 450),
      // 垂直z轴的平面
    ]
    // device1.material.clippingPlanes=PlaneArr;
    // 设置渲染器的剪裁平面属性
    Dev.traverse(function (obj) {
      if (obj.type == 'Mesh') {
        obj.material.clippingPlanes = PlaneArr
      }
    })

    // if (num !== 0) {
    // } else if (diss < 13000) {
    //   pos = scene.position
    //   numb = 8000
    //   dir.copy(pos.clone().sub(camera.position)).normalize()
    //   flyBool = true //允许飞行
    // } else {
    //   camera.position.set(-9000, 19500, 0) //设置相机位置
    //   // camera.lookAt(0, 0, 0)
    //   camera.lookAt(0, 0, 0)
    //   pos = scene.position
    //   numb = 8000
    //   dir.copy(pos.clone().sub(camera.position)).normalize()
    //   flyBool = true //允许飞行
    // }
  }
}

function fly(chooseMesh) {
  pos = chooseMesh.getWorldPosition()

  camera.position.set(-11000, 22000, 0)

  control.target.set(pos.x, pos.y, pos.z)
  control.update()
  // camera.lookAt(nextPos)
  dir.copy(pos.clone().sub(camera.position)).normalize()
  flyBool = true //允许飞行
}
var FloorPosition, posiuu
function movecamera(m, posx, posy, posz) {
  if (m != null) {
    var OBject = scene.getObjectByName(m)

    FloorPosition =
      OBject.type == 'Mesh'
        ? OBject.getWorldPosition()
        : OBject.children[1].getWorldPosition()
    if (FloorPosition == undefined) {
    } else {
      posiuu = FloorPosition
    }

    var a = FloorPosition.x + posx,
      b = FloorPosition.y + posy,
      c = FloorPosition.z + posz
  } else {
    console.log(posiuu)
    FloorPosition = posiuu
  }

  var p1 = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
  }
  // 相机目标位置点
  // const p2 = { x: -1000, y: 1020, z: 4060 }

  var p2
  if (m != null) {
    p2 = {
      x: a,
      y: b,
      z: c,
    }
  } else {
    p2 = {
      x: -11000,
      y: 22000,
      z: 0,
    }
  }
  console.log(FloorPosition)
  var tween = new TWEEN.Tween(p1).to(p2, 3000)
  // .easing(TWEEN.Easing.Quadratic.InOut)
  tween.onUpdate(() => {
    // 修改相机位置
    camera.position.set(p1.x, p1.y, p1.z)
    camera.lookAt(FloorPosition.x, FloorPosition.y, FloorPosition.z)
    control.target.set(
      FloorPosition.x /*- 20*/,
      FloorPosition.y,
      FloorPosition.z
    ) // 确保镜头移动后，视觉中心还在圆点处
    control.update()
  })
  // 开始动画
  tween.start()
  var PDG_DoorAll = scene.getObjectByName('PDG_DoorAll')
  var positionb = {
    PDG_DoorAllrotationZ: 0,
  }
  var tweenB = new TWEEN.Tween(positionb).to({ rotationZ: Math.PI / 2 }, 3000)
  tweenB.onUpdate(function () {
    scene.getObjectByName('PDG_DoorAll').position.z = 0
  })
}

//创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性

var onKeyDown = (event) => {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = true
      // console.log('w,up')
      break

    case 37: // left
    case 65: // a
      moveLeft = true
      // console.log('a,l')
      break

    case 40: // down
    case 83: // s
      moveBackward = true
      // console.log('s,d')
      break

    case 39: // right
    case 68: // d
      moveRight = true
      // console.log('d,r')
      break

    case 32: // space
      if (canJump === true) velocity.y += 350
      canJump = false
      break
  }
}

var onKeyUp = (event) => {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      moveForward = false
      break

    case 37: // left
    case 65: // a
      moveLeft = false
      break

    case 40: // down
    case 83: // s
      moveBackward = false
      break

    case 39: // right
    case 68: // d
      moveRight = false
      break
  }
}

addEventListener('keydown', onKeyDown, false)
addEventListener('keyup', onKeyUp, false)

raycaster = new THREE.Raycaster(
  new THREE.Vector3(),
  new THREE.Vector3(0, 100, 0),
  0,
  10
)

var num = 0

function render() {
  TWEEN.update()
  requestAnimationFrame(render)

  const time = performance.now() //eslint-disable-line

  if (controls.isLocked === true) {
    raycaster.ray.origin.copy(controls.getObject().position)
    raycaster.ray.origin.y -= 10

    const intersections = raycaster.intersectObjects(objects, false)

    const onObject = intersections.length > 0

    const delta = (time - prevTime) / 1000

    velocity.x -= velocity.x * 5.0 * delta
    velocity.z -= velocity.z * 5.0 * delta

    //  velocity.y -= 9.8 * 100.0 * delta // 100.0 = mass

    direction.z = Number(moveForward) - Number(moveBackward)
    direction.x = Number(moveRight) - Number(moveLeft)
    direction.normalize() // this ensures consistent movements in all directions

    if (moveForward || moveBackward) velocity.z -= direction.z * 2000.0 * delta
    if (moveLeft || moveRight) velocity.x -= direction.x * 2000.0 * delta

    if (onObject === true) {
      velocity.y = Math.max(0, velocity.y)
      canJump = true
    }

    controls.moveRight(-velocity.x * delta)
    controls.moveForward(-velocity.z * delta)

    controls.getObject().position.y += velocity.y * delta // new behavior

    if (controls.getObject().position.y < 10) {
      velocity.y = 0
      controls.getObject().position.y = 10

      canJump = true
    }
  }

  prevTime = time

  renderer.render(scene, camera)

  labelRender.render(scene, camera)
  if (mixer !== null) {
    mixer.update(clock.getDelta()) //更新混合器相关的时间
  }
  if (flyBool) {
    var dis = camera.position.clone().sub(pos).length()
    // //console.log('dis', dis)
    if (dis > numb) {
      // 接近nextPos位置，相机停止飞行
      //每次渲染相机沿着视线移动距离递增(xyz每个分量乘以4)
      camera.position.add(dir.clone().multiplyScalar(100))

      //  //console.log("render -> nextPos.position", nextPos.position)
    } else {
      flyBool = false //停止飞行飞行
    }
  } else if (flyPipe) {
  }
}

render()

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}

var MessageUrl =
  'http://221.6.30.202:15006/prod-api/modbus/api/getNewestData?modbusType=modbusScrewMachine'
var JsonURL = '../JiGuangLou_3D/json/modbusScrewMachine.json'
// var JsonURL = '../json/modbusScrewMachine.json'
var modbusScrewMachine,
  changeMessageUrl,
  changeJsonUrl,
  modbusScrewMachine_message
$.extend({
  changeurl: function (messahename, jsonname) {
    changeMessageUrl = MessageUrl.replace(/modbusScrewMachine/, messahename)
    changeJsonUrl = JsonURL.replace(/modbusScrewMachine/, jsonname)
  },
  AddData: function () {
    // console.log('11111111')
    $.ajax({
      type: 'get',
      url: changeJsonUrl,

      dataType: 'json',
      async: false, //默认为true 异步
      success: function (data) {
        modbusScrewMachine_message = data.infoWindowField
      },
    })
    $.ajax({
      type: 'get',
      url: changeMessageUrl,

      dataType: 'json',
      async: false, //默认为true 异步
      success: function (data) {
        modbusScrewMachine = data
        // //console.log(' modbusScrewMachine: ',  modbusScrewMachine);
      },
    })
    $('#labelone').html('')
    for (const i in modbusScrewMachine_message) {
      var status = RegExp(/Status/)
      if (
        (status.test(i) == true && modbusScrewMachine.data[0][i] !== 0) ||
        status.test(i) == false
      ) {
        $('#labelone').append(
          '  <div class="font">' +
            '<div class="style1">' +
            modbusScrewMachine_message[i].label +
            '</div><div class="style2">' +
            (status.test(i) == true
              ? modbusScrewMachine.data[0][i] == 0
                ? '关'
                : modbusScrewMachine.data[0][i] > 1
                ? modbusScrewMachine.data[0][i]
                : '开'
              : modbusScrewMachine.data[0][i]) +
            modbusScrewMachine_message[i].value +
            '</div></div>'
        )
      }
    }
    setTimeout(function () {
      $.AddData()
    }, 240000)
  },
})
var winclose
function showmessaeg(name, jsonname, tname) {
  document.getElementById('ktname').innerHTML = tname
  $.changeurl(name, jsonname)
  $.AddData()

  if (chooseMesh == RepeatMesh && document.getElementById('aa') !== null) {
    alert('重复点击')
  } else {
    setTimeout(function () {
      new WinBox('设备数据', {
        id: 'aa',
        mount: document.getElementById('content').cloneNode(true),
        class: 'backg',
        width: 390,
        height: 500,
      })
    }, 300)
  }
}

function addthlabel(AHUName, AHUclass, name, jsonname) {
  var AHU = scene.getObjectByName(AHUName)
  var labelarray = []
  $.changeurl(name, jsonname)

  $.ajax({
    type: 'get',
    url: changeJsonUrl,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusScrewMachine_message = data.infoWindowField
    },
  })
  $.ajax({
    type: 'get',
    url: changeMessageUrl,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusScrewMachine = data.data[0]
      console.log(' modbusScrewMachine: ', modbusScrewMachine)
    },
  })

  for (var i in modbusScrewMachine_message) {
    $('#th_label').append(
      '<div id="' +
        modbusScrewMachine_message[i].id +
        '"  class=' +
        AHUclass +
        '><div class = "out_label"><div class = "labelname_class">' +
        modbusScrewMachine_message[i].label +
        '</div><div class = "labelvalue_class" >' +
        modbusScrewMachine[i] +
        modbusScrewMachine_message[i].value +
        '</div></div></div>'
    )

    var la = document.getElementById(modbusScrewMachine_message[i].id)
    var ahula = new CSS3DObject(la)

    labelarray.push(ahula)
  }

  for (var i in AHU.children) {
    labelarray[i].position.copy(AHU.children[i].getWorldPosition())
    labelarray[i].position.y -= 300
    labelarray[i].name = AHU.children[i].name + 'label'
    labelarray[i].rotation.z = (Math.PI * 3) / 2
    labelarray[i].rotation.x = (Math.PI * 3) / 2
    scene.add(labelarray[i])
  }
}

function removethlabel(AHUName) {
  var AHU = scene.getObjectByName(AHUName)
  for (var i in AHU.children) {
    let removelabel = scene.getObjectByName(AHU.children[i].name + 'label')
    if (removelabel) removelabel.parent.remove(removelabel)
  }
}

/**获取温度修改颜色数据 */
// var messsageurl = '../JiGuangLou_3D/json'

function color(url, jsonname, group) {
  var messsageurl = '../JiGuangLou_3D/json'
  // var messsageurl = '../json'
  var Temurl =
    'http://221.6.30.202:15006/prod-api/modbus/api/getNewestData?modbusType=modbusAhu7'
  var temjsonUrl = messsageurl + '/modbusAhu7_temp.json'

  var changeTemUrl = Temurl.replace(/modbusAhu7/, url)
  var changetemJsonUrl = temjsonUrl.replace(/modbusAhu7/, jsonname)

  $.ajax({
    type: 'get',
    url: changeTemUrl,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusScrewMachine = data
      // //console.log(' modbusScrewMachine: ',  modbusScrewMachine);
    },
  })
  $.ajax({
    type: 'get',
    url: changetemJsonUrl,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusScrewMachine_message = data.infoWindowField
    },
  })
  var message = []
  for (const i in modbusScrewMachine_message) {
    message.push(modbusScrewMachine.data[0][i])
  }
  var max = Math.max.apply(null, message)
  // //console.log(max)
  for (var i = 0; i < message.length; i++) {
    let two = parseInt(getColorByNumber(message[i], 300), 16)
    group.children[i].material.color.set(two)
  }
}

function rgbaToHex(color) {
  var values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',')

  // console.log('values: ', values);
  var a = parseFloat(values[3] || 1),
    r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
    g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
    b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)

  return (
    '0x' +
    ('0' + r.toString(16)).slice(-2) +
    ('0' + g.toString(16)).slice(-2) +
    ('0' + b.toString(16)).slice(-2)
  )
}

function getColorByNumber(n, max) {
  let halfMax = 50 //最大数值的二分之一
  //var 百分之一 = (单色值范围) / halfMax;  单颜色的变化范围只在50%之内
  var one = 255 / halfMax
  // //console.log('one= ' + one)
  var r = 0
  var g = 0
  var b = 0

  if (n < halfMax) {
    // 比例小于halfMax的时候红色是越来越多的,直到红色为255时(红+绿)变为黄色.
    r = one * n
    g = 255
  }

  if (n >= halfMax) {
    // 比例大于halfMax的时候绿色是越来越少的,直到0 变为纯红
    g = 255 - (n - halfMax) * one < 0 ? 0 : 255 - (n - halfMax) * one
    r = 255
  }
  r = parseInt(r) // 取整
  g = parseInt(g) // 取整
  b = parseInt(b) // 取整

  // //console.log(r,g,b)
  return rgbaToHex('rgb(' + r + ',' + g + ',' + b + ')')
}
