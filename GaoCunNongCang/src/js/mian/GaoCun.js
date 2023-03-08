import * as THREE from '../../../build/three.module.js'
import { FBXLoader } from '../../jsm/loaders/FBXLoader.js'
import { scene } from './scene.js'
import { render, addEvnmap, AddMeshIntoArr, moveup } from './fun.js'

document.body.appendChild(container)

var loader = new FBXLoader()
loader.load('./model/GaoChun/GaoChunPlant.FBX', function (fbx) {
  scene.add(fbx)

  fbx.position.set(0, 0, 0)
  console.log('fbx: ', fbx)
  fbx.traverse(function (mesh) {
    if (mesh.name.search('Rice') >= 0 && mesh.isMesh) {
      mesh.material.transparent = true
      mesh.material.depthWrite = false
      mesh.material.side = THREE.DoubleSide
    } else if (
      (mesh.name.search('Granite') >= 0 ||
        mesh.name.search('Granite') >= 0 ||
        mesh.name.search('Tree') >= 0) &&
      mesh.isMesh
    ) {
      mesh.material.alphaTest = 0.1
      mesh.material.transparent = false

      mesh.material.vertexColors = false
      // mesh.material.depthWrite = false
      mesh.material.side = THREE.DoubleSide
    } else if (mesh.name.search('LotusLea') >= 0 && mesh.isMesh) {
      mesh.material.transparent = false
      mesh.material.alphaTest = 0.1

      // mesh.material.depthWrite = false
    }
  })
})
loader.load('./model/GaoChun/GaoChun.FBX', function (fbx) {
  scene.add(fbx)
  fbx.position.set(0, 0, 0)
  console.log('fbx: ', fbx)
  fbx.traverse(function (mesh) {
    if (mesh.name.search('LakeWater') >= 0 && mesh.isMesh) {
      mesh.material.transparent = true
      mesh.material.depthWrite = false
      // mesh.material.side = THREE.DoubleSide
    } else if (
      (mesh.name.search('Granite') >= 0 || mesh.name.search('Tree') >= 0) &&
      mesh.isMesh
    ) {
      mesh.material.vertexColors = false
      mesh.material.depthWrite = false
      mesh.material.side = THREE.DoubleSide
    } else if (mesh.name.search('LotusLea') >= 0 && mesh.isMesh) {
      mesh.material.transparent = true
      mesh.material.depthWrite = false
    }
  })
  scene.getObjectByName('SoilLayer').material = new THREE.MeshBasicMaterial({
    map: scene.getObjectByName('SoilLayer').material.map,
    color: 0x444444,
  })

  addEvnmap('RiverWater')
  addEvnmap('LakeWater')

  addEvnmap('RiceWater')

  addEvnmap('PenStockSoilWater')
  AddMeshIntoArr('Pump_House', 'granaryArr')
  AddMeshIntoArr('Pump_House', 'PrimaryMesh')

  scene.getObjectByName('Terrain_BG').scale.set(30, 30, 30)
})

loader.load('./model/model-position/Point1.fbx', function (fbx) {
  scene.add(fbx)
  // fbx.scale.set(0.01, 0.01, 0.01)
  // fbx.position.set(0, 50, 0)
  fbx.position.copy(scene.getObjectByName('Pump_House').position)

  scene.getObjectByName('Cone').material = new THREE.MeshLambertMaterial({
    color: 0xff2200,
    side: THREE.DoubleSide,
  })
  scene.getObjectByName('Cone').position.y += 190
  // scene.getObjectByName('Cone').material.color.set(0xff2200)
  // scene.getObjectByName('Cone').material.emissive.set(0xff2200)
  // scene.getObjectByName('Cone').material.side = THREE.DoubleSide
  moveup(scene.getObjectByName('Cone'))
  console.log('定位: ', fbx)
})

render()
