import * as THREE from '../../../build/three.module.js'
import { FBXLoader } from '../../jsm/loaders/FBXLoader.js'
import { scene } from './Control_scene.js'
import { render } from './Control_fun.js'
import { CSS3DSprite } from '../../jsm/renderers/CSS3DRenderer.js'

var loader = new FBXLoader() //创建一个FBX加载器
loader.load('././models/control/3F/3F_Layout.FBX', function (obj) {
  console.log('查看返回的模型数据', obj)
  obj.traverse(function (mesh) {
    if (mesh.isMesh) {
      mesh.material = new THREE.MeshBasicMaterial({
        transparent: true,
        map: mesh.material.map,
      })
    }
  })

  scene.add(obj)
})

loader.load('././models/control/4F/4F_Layout.FBX', function (obj) {
  console.log('查看返回的模型数据', obj)
  obj.scale.set(0.25, 0.25, 0.25)
  obj.traverse(function (mesh) {
    if (mesh.isMesh) {
      mesh.material = new THREE.MeshBasicMaterial({
        transparent: true,
        map: mesh.material.map,
      })
    }
  })
  scene.add(obj)
  scene.getChildByName('4F_Layout').visible = false
})
var group = new THREE.Group()
var box = new THREE.BoxGeometry(0.1, 0.1, 0.1)
var material = new THREE.MeshLambertMaterial({
  color: 0x009999,
  visible: false,
})
var boxMesh = new THREE.Mesh(box, material)
boxMesh.name = 'PAU3-1'
group.add(boxMesh)
var boxMesh2 = boxMesh.clone()
boxMesh2.name = 'PAU3-2'
group.add(boxMesh2)
var boxMesh3 = boxMesh.clone()
boxMesh3.name = 'PAU3-3'
group.add(boxMesh3)
var boxMesh4 = boxMesh.clone()
boxMesh4.name = 'PAU3-4'
group.add(boxMesh4)

group.name = '4F_pau'
scene.add(group)

render()
