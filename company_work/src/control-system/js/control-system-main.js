import * as THREE from '../../../build/three.module.js'
import { FBXLoader } from '../../jsm/loaders/FBXLoader.js'
import { GLTFLoader } from '../../jsm/loaders/GLTFLoader.js'

import { CSS2DObject } from '../../jsm/renderers/CSS2DRenderer.js'

import {
  scene,
  camera,
  renderer,
  controls,
  mixer,
  clock,
} from './control-system-sence.js'

import {
  render,
  addDataLabel,
  addthlabel,
  addBttonLabel,
} from './control-system-fun.js'
//子页面接收父页面传过来的数据
var str = window.location.search.slice(1, 6)
console.log('str: ', str)
var loader, modelname
if (str != 'LQLEP') {
  loader = new FBXLoader() //创建一个FBX加载器
  modelname = str + '.FBX'
} else if (str == 'LQLEP') {
  loader = new GLTFLoader() //创建一个FBX加载器
  modelname = str + '.gltf'
}
var obj
loader.load(`../../models/control-system/` + modelname + ``, function (object) {
  if (str != 'LQLEP') {
    obj = object
  } else if (str == 'LQLEP') {
    obj = object.scene
    obj.scale.set(100, 100, 100)
    obj.position.x += -8
  }

  console.log('查看返回的模型数据', obj)

  scene.add(obj)

  obj.traverse(function (mesh) {
    if (mesh.isMesh && mesh.name.search('_Pipe') >= 0) {
      mesh.material = new THREE.MeshBasicMaterial({
        map: mesh.material.map,
        color: 0x0a2583,
        opacity: 0.5,
        transparent: true,
        depthWrite: false,
      })
      // mesh.name = 'pipe'
    } else if (mesh.isMesh && mesh.name.search('_Wind') >= 0) {
      group(mesh)
    }
  })

  if (str.search('AHU0') >= 0 && str != 'AHU08') {
    addDataLabel()
    scene.getObjectByName('Wind').material.transparent = true
    addthlabel(
      str,
      str,
      'modbusAhu' + str.slice(-1),
      'modbusAhu' + str.slice(-1) + '_temp',
      'modbusAhu' + str.slice(-1) + '_hum'
    )
  } else if (str == 'AHU08') {
    scene.getObjectByName('Wind').material.transparent = true

    addDataLabel()
  } else if (str == 'LQLEP') {
    addBttonLabel()
  }
})

function group(mesh) {
  setInterval(() => {
    mesh.material.map.offset.x += 0.005
  })
}

render()

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix()
}
