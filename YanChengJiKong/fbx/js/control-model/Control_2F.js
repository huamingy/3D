import * as THREE from '../../../build/three.module.js'
import { FBXLoader } from '../../jsm/loaders/FBXLoader.js'
import { scene } from './Control_scene.js'
import { render, AddMeshIntoArr } from './Control_fun.js'
import { CSS3DSprite } from '../../jsm/renderers/CSS3DRenderer.js'

var loader = new FBXLoader() //创建一个FBX加载器
loader.load('././models/control/2F/2F_Layout.FBX', function (obj) {
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
  AddMeshIntoArr('Preselection', 'PrimaryMesh')
  AddMeshIntoArr('Preselection', 'granaryArr')
  scene.getObjectByName('Preselection').traverse(function (mesh) {
    if (mesh.isMesh) {
      mesh.position.z += 1
      mesh.material.opacity = 0
    }
  })
})

render()
