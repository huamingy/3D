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
import { CSS3DSprite } from '../../jsm/renderers/CSS3DRenderer.js'

// var URl = 'http://10.0.0.131:9090/njdt_yw_server/3d-view/get-wsd?type=1'
// var FaultURL =
//   'http://10.0.0.131:9090/njdt_yw_server/3d-view/get-warn-info?type=1'

var URl = 'http://192.168.108.130:9090/njdt_yw_server/3d-view/get-wsd?type=1'
var FaultURL =
  'http://192.168.108.130:9090/njdt_yw_server/3d-view/get-warn-info?type=1'
// var FaultURL = '../json/mudus copy.json'

var loader = new GLTFLoader()
loader.load('../models/地铁大厦/5F_MoveRing.gltf', function (object) {
  object.scene.scale.set(100, 100, 100)
  object.scene.traverse(function (child) {})

  scene.add(object.scene)
  console.log('object.scene: ', object.scene)

  addTemHUM(URl, '5F_TH', '5F_WLA', '5F_SAFE')

  addMeshToPrimary('5F_Click')
  addMeshToPrimary('5F_UPS_(1)')
  monitor(FaultURL, '5F_Click')
  UPS()
})

function UPS() {
  scene.getObjectByName('5F_UPS_(1)').children.forEach(function (mesh) {
    $('#ups').append(
      `<div  id=` +
        mesh.name +
        `>
    <img  src="../img/ups.png">
    </div>`
    )
    var label = document.getElementById(mesh.name)

    var css3D = new CSS3DSprite(label)
    css3D.name = 'label' + mesh.name
    css3D.scale.set(0.01, 0.01, 0.01)
    css3D.position.copy(mesh.getWorldPosition())
    scene.add(css3D)

    // document.getElementById(mesh.name).onpointerover = function () {
    //   showLabelData(mesh)
    // }

    // document.getElementById(mesh.name).onpointerleave = function () {
    //   let label = scene.getObjectByName('JG_label')

    //   label.element.style.visibility = 'hidden'
    // }
  })
}

function showLabelData(pointermoveMesh) {
  $('#pointmove').html('')
  $('#pointmove').append(
    `

<div  id="JG_Data"  >
			<div  class="JG_Data_label_title">
			<a>` +
      pointermoveMesh.name +
      `</a>
			</div>
			<div  class="JG_Data_label"><a>状态</a></div>
			<div  class="JG_Data_label"><a>地铁大厦5F</a></div>
		</div>
`
  )
  var T = document.getElementById('JG_Data')
  console.log('T: ', T)

  var CSS3Tlabel = new CSS3DSprite(T)
  CSS3Tlabel.scale.set(0.06, 0.06, 0.06)
  CSS3Tlabel.name = 'JG_label'
  CSS3Tlabel.position.copy(pointermoveMesh.getWorldPosition())
  CSS3Tlabel.position.y += 10
  scene.add(CSS3Tlabel)
  console.log(scene)
}

addEventListener('pointermove', pointermove)

function render() {
  labelRenderer.render(scene, camera)
  renderer.render(scene, camera) //执行渲染操作

  // composer1.render()
  requestAnimationFrame(render) //请求再次执行渲染函数render，渲染下一帧
}
render()

window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}
