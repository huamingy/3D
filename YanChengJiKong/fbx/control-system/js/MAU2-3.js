import * as THREE from '../../../build/three.module.js'
import { FBXLoader } from '../../jsm/loaders/FBXLoader.js'
import { scene } from './control-system-scene.js'
import { render, addDataLabel, addtexturemove } from './control-system-fun.js'
var loader = new FBXLoader() //创建一个FBX加载器
loader.load(
  '../models/control-system/Air_ConditioningSystemFlowChart_MAU_2_1/Air_ConditioningSystemFlowChart_MAU_2_3.FBX',
  function (obj) {
    console.log('查看返回的模型数据', obj)
    obj.traverse(function (mesh) {
      if (mesh.isMesh) {
        mesh.material = new THREE.MeshBasicMaterial({
          transparent: true,
          map: mesh.material.map,
        })
      }
    })
    obj.position.z -= 10
    scene.add(obj)
    group('Pipe')
    changMaterial()

    addDataLabel('ModbusBms2f7')
    addtexturemove('RA_Wind', 0.5)
    obj.traverse(function (mesh) {
      if (
        mesh.isMesh &&
        (mesh.name.search('Fan_Fan') >= 0 || mesh.name.search('Fan_Axis') >= 0)
      ) {
        console.log(mesh.name.search('Fan_Fan') >= 0)
        mesh.material = new THREE.MeshBasicMaterial({
          transparent: true,
          map: mesh.material.map,
          color: 0x00ffff,
          opacity: 1,
          transparent: true,
        })
      }
    })
    scene.getObjectByName('BG').material = new THREE.MeshBasicMaterial({
      transparent: true,
      map: scene.getObjectByName('BG').material.map,
    })
  }
)

function changMaterial(obj) {
  const textureLoader = new THREE.TextureLoader()

  var mapcatTexture = textureLoader.load(
    '../models/control-system/Air_ConditioningSystemFlowChart_MAU_2_1/Matel.png'
  )
  var WindTexture = textureLoader.load(
    '../models/control-system/Air_ConditioningSystemFlowChart_MAU_2_1/Wind.png'
  )
  scene.getObjectByName('R').material.color.set(0x883500)

  scene.getObjectByName('MAU_Body').material = new THREE.MeshBasicMaterial({
    map: scene.getObjectByName('MAU_Body').material.map,

    opacity: 0.5,
    transparent: true,
  })
  scene.getObjectByName('Room').material = new THREE.MeshBasicMaterial({
    map: scene.getObjectByName('Room').material.map,
    // color: 0x0a2583,
    opacity: 0.5,
    transparent: true,
  })

  scene.getObjectByName('Vapour').material = new THREE.MeshBasicMaterial({
    map: scene.getObjectByName('Vapour').material.map,
    color: 0x00ffff,
    opacity: 1,
    transparent: true,
  })
  scene.getObjectByName('Nozzle').material = new THREE.MeshBasicMaterial({
    map: scene.getObjectByName('Nozzle').material.map,
    color: 0x0a2583,
    opacity: 0.5,
    transparent: true,
  })
  scene.getObjectByName('RoomName').material.alphaMap =
    scene.getObjectByName('RoomName').material.map
  scene.getObjectByName('RoomName').material.depthWrite = false

  var WaterTank = scene.getObjectByName('Coil')
  WaterTank.material = new THREE.MeshMatcapMaterial({
    matcap: mapcatTexture,
    depthTest: true,
    depthWrite: true,
  })
}
function group(name) {
  scene.getObjectByName(name).traverse(function (mesh) {
    if (mesh.isMesh) {
      mesh.material = new THREE.MeshBasicMaterial({
        map: mesh.material.map,
        color: 0x0a2583,
        opacity: 0.5,
        transparent: true,
        depthWrite: false,
      })
    }
  })
}

render()
