import * as THREE from '../../../build/three.module.js'
import { GUI } from '../../jsm/libs/dat.gui.module.js'
import { GLTFLoader } from '../../jsm/loaders/GLTFLoader.js'
import { OrbitControls } from '../../jsm/controls/OrbitControls.js'
import { CSS2DObject } from '../../jsm/renderers/CSS2DRenderer.js'
import {
  addTemHUM,
  addMeshToPrimary,
  primaryMesh,
  pointermove,
  monitor,
} from './choose.js'
import { scene, renderer, camera, labelRenderer, controls } from './scene.js'

// var URl = 'http://10.0.0.131:9090/njdt_yw_server/3d-view/get-wsd?type=2'
// var FaultURL =
//   'http://10.0.0.131:9090/njdt_yw_server/3d-view/get-warn-info?type=2'

var URl = 'http://192.168.108.130:9090/njdt_yw_server/3d-view/get-wsd?type=2'
var FaultURL =
  'http://192.168.108.130:9090/njdt_yw_server/3d-view/get-warn-info?type=2'

var loader = new GLTFLoader()
loader.load('../models/南京南/1F.gltf', function (object) {
  object.scene.scale.set(100, 100, 100)
  object.scene.traverse(function (child) {})

  scene.add(object.scene)
  console.log('object.scene: ', object.scene)

  scene.getObjectByName('1F_Click').children.forEach((child) => {
    console.log(child)
    if (child.type == 'Mesh') {
      var texture = child.material.map
      child.material = new THREE.MeshStandardMaterial({
        map: texture,
      })
    }
  })

  addTemHUM(URl, 'TH', '1F_WLA', '1F_SAFE')

  addMeshToPrimary('1F_Click')
  monitor(FaultURL, '1F_Click')
})
addEventListener('pointermove', pointermove)

function render() {
  // console.log(camera.position);

  renderer.render(scene, camera) //执行渲染操作
  labelRenderer.render(scene, camera)
  // composer1.render()
  requestAnimationFrame(render) //请求再次执行渲染函数render，渲染下一帧
}
render()

window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}
