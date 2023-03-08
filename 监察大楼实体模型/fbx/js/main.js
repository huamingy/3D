import * as THREE from '../../build/three.module.js'
import { GUI } from '../jsm/libs/dat.gui.module.js'
import { GLTFLoader } from '../jsm/loaders/GLTFLoader.js'
import { OrbitControls } from '../jsm/controls/OrbitControls.js'
import { scene, camera, renderer, controls } from './scene.js'
import { render, AddMeshIntoArr, repair, hiddendiv } from './render.js'
const params = {
  NO1: false,
  NO2: false,
  NO3: false,
  NO4: false,
  NO1light: false,
  NO2light: false,
  NO3light: false,
  NO4light: false,
}

/**
 * 创建场景对象Scene
 */

var loader = new GLTFLoader() //创建一个FBX加载器

loader.load(
  './JSInstituteOfFoodAndDrugControl/JSInstituteOfFoodAndDrugControl.gltf',
  function (obj) {
    console.log('查看返回的模型数据', obj)
    // 整体缩放
    //  obj.scene.scale.set(0.1,0.1,0.1)
    // obj.scene.scale.set(600,600,600)

    if (obj.isMesh) {
      obj.castShadow = true
      obj.receiveShadow = true
    }

    scene.add(obj.scene)
    obj.scene.traverse(function (mesh) {
      if (mesh.isMesh && mesh.name.search('2022') >= 0) {
        mesh.visible = false
      }
    })
    // AddMeshIntoArr('Airconditioner')
    // AddMeshIntoArr('9FPipe')
    AddMeshIntoArr('8FPipe')
    repair()
  }
)

var gui = new GUI()

//改变线路颜色
gui.add(params, 'NO1').name('大楼')
// 默认值设置
var dropdown = { 楼层: '全景' }
//选项
var states = [
  '1层',
  '2层',
  '3层',
  '4层',
  '5层',
  '6层',
  '7层',
  '8层',
  '9层',
  '全景',
]
// 添加
var clipCtrl = gui.add(dropdown, '楼层').options(states)
// 设置点击事件
clipCtrl.onChange((floor) => {
  var PlaneArr
  if (floor == '1层') {
    PlaneArr = [
      new THREE.Plane(new THREE.Vector3(0, -1, 0), (4.578 - 0.9) / 100),
    ]
    var onefloor = scene.getObjectByName('1F')
    // onefloor.material=
  } else if (floor == '2层') {
    PlaneArr = [
      new THREE.Plane(new THREE.Vector3(0, -1, 0), (4.578 + 3.813 - 0.9) / 100),
    ]
  } else if (floor == '3层') {
    PlaneArr = [
      new THREE.Plane(
        new THREE.Vector3(0, -1, 0),
        (4.578 + 3.813 + 4.111 - 0.9) / 100
      ),
    ]
  } else if (floor == '4层') {
    PlaneArr = [
      new THREE.Plane(
        new THREE.Vector3(0, -1, 0),
        (4.578 + 3.813 + 4.111 + 3.85 - 0.9) / 100
      ),
    ]
  } else if (floor == '5层') {
    PlaneArr = [
      new THREE.Plane(
        new THREE.Vector3(0, -1, 0),
        (4.578 + 3.813 + 4.111 + 3.85 * 2 - 0.9) / 100
      ),
    ]
  } else if (floor == '6层') {
    PlaneArr = [
      new THREE.Plane(
        new THREE.Vector3(0, -1, 0),
        (4.578 + 3.813 + 4.111 + 3.85 * 3 - 0.9) / 100
      ),
    ]
  } else if (floor == '7层') {
    PlaneArr = [
      new THREE.Plane(
        new THREE.Vector3(0, -1, 0),
        (4.578 + 3.813 + 4.111 + 3.85 * 4 - 0.9) / 100
      ),
    ]
  } else if (floor == '8层') {
    PlaneArr = [
      new THREE.Plane(
        new THREE.Vector3(0, -1, 0),
        (4.578 + 3.813 + 4.111 + 3.85 * 5 - 0.8) / 100
      ),
    ]
  } else if (floor == '9层') {
    PlaneArr = [
      new THREE.Plane(
        new THREE.Vector3(0, -1, 0),
        (4.578 + 3.813 + 4.111 + 3.85 * 6 - 0.9) / 100
      ),
    ]
  } else {
    PlaneArr = [
      new THREE.Plane(
        new THREE.Vector3(0, -1, 0),
        (4.578 + 3.813 + 4.111 + 3.85 * 10 - 0.9) / 100
      ),
    ]
  }
  renderer.clippingPlanes = PlaneArr
})

//坐标系辅助
// var axesHelper = new THREE.AxesHelper(8000)
// scene.add(axesHelper)

//   var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
//  var material = new THREE.MeshLambertMaterial({
//               color: 0x0000ff
//    }); //材质对象Material
// var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
// mesh.position.set(0.5,0.5,0)
// scene.add(mesh); //网格模型添加到场景中
// console.log("mesh", mesh)

render()
