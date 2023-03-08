import * as THREE from '../../../build/three.module.js'
import { CSS3DSprite } from '../../jsm/renderers/CSS3DRenderer.js'
import { TWEEN } from '../../jsm/libs/tween.module.min.js'

import { scene, renderer, camera } from './scene.js'
import Stats from '../../jsm/libs/stats.module.js'
//2.0、性能插件  监听fps
var stats = new Stats()
document.body.appendChild(stats.dom)
const container = document.createElement('div')

$('#no').bind('hello', function () {
  console.log(document.getElementById('iframe'))
  document
    .getElementById('iframe')
    .removeChild(document.getElementById('iframe').childNodes[0])
  document.getElementById('iframe').style.visibility = 'hidden'
})

var PrimaryMesh = [],
  granaryArr = []
function AddMeshIntoArr(mesh, Arr) {
  var AArr
  if (Arr == 'granaryArr') {
    AArr = granaryArr
  } else if (Arr == 'PrimaryMesh') {
    AArr = PrimaryMesh
  }
  var device = scene.getObjectByName(mesh)
  console.log('device: ', device)
  device.traverse(function (obj) {
    if (obj.isMesh) {
      AArr.push(obj)
    }
  })
}

var changecolorMesh, PrimaryMesh

function pointermove(event) {
  if (changecolorMesh) {
    changecolorMesh.material.opacity = 0
    changecolorMesh.material.color.set(0xffffff)
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
    // console.log('changecolorMesh: ', changecolorMesh)

    // changecolorMesh.material.opacity = 0.5
    changecolorMesh.material.color.set(0xffffff)
  }
}

addEventListener('pointermove', pointermove)

var chooseMesh = null,
  chooseMeshemssive

/**单击选择模型 */
function choose(event) {
  if (chooseMesh) {
  } else if (chooseMesh) {
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
  var intersects = raycaster.intersectObjects(granaryArr)

  //console.log("射线投射器返回的对象 点point", intersects[0].point);
  if (intersects.length > 0) {
    chooseMesh = intersects[0].object
    console.log('chooseMesh: ', chooseMesh)

    ShowSystemLabel(chooseMesh.name)
  }
}
addEventListener('click', choose) // 监听窗口鼠标单击事件

function ShowSystemLabel(name) {
  console.log(name)
  $('#iframe').html('')
  $('#iframe').append(
    `  <iframe 
    src="./GaoChunIrrigationSystemChart.html"
    style="width: 1000px; height: 720px"
    frameborder="0"
  ></iframe>`
  )
  container2.style.visibility = 'visible'
}
var container2 = document.getElementById('iframe')
var TFGlabel = new CSS3DSprite(container2)
TFGlabel.name = 'iframelabel'
function addEvnmap(Floor) {
  const textureLoader = new THREE.TextureLoader()
  var evnmap = textureLoader.load('././img/evnmap/belfast_farmhouse_2k.png')

  evnmap.mapping = THREE.EquirectangularReflectionMapping
  evnmap.encoding = THREE.sRGBEncoding

  var fool = scene.getObjectByName(Floor)
  fool.material.envMap = evnmap
  fool.material.roughness = 0.5
  fool.material.envMapIntensity = 0.5

  setInterval(function () {
    fool.material.bumpMap.offset.x += 0.0003
  })
}

window.addEventListener('resize', onWindowResize)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

// function movecamera(m, DoorAll) {
//   var parms = { x: 0, y: 0, z: 0 }

//   var tween = new TWEEN.Tween(p1).to(p2, 3000)
//   // .easing(TWEEN.Easing.Quadratic.InOut)
//   tween.onUpdate(() => {

// })
// // 开始动画
// tween.start()
// var PDG_DoorAll = scene.getObjectByName('PDG_DoorAll')
// var positionb = {
//   PDG_DoorAllrotationZ: 0,
// }
// var tweenB = new TWEEN.Tween(positionb).to({ rotationZ: Math.PI / 2 }, 3000)
// tweenB.onUpdate(function () {
//   scene.getObjectByName('PDG_DoorAll').position.z = 0
// })

//   if (DoorAll != null) {
//     scene.getObjectByName(DoorAll).rotateZ(Math.PI / 2)
//   }
// }
function moveup(mesh) {
  var pos = mesh.position

  var tweenA = new TWEEN.Tween(pos)
  var tweenB = new TWEEN.Tween(mesh.position)
  tweenA.to(
    {
      y: pos.y + 80,
    },
    1000
  )

  tweenA.onUpdate(function () {
    mesh.position.y = pos.y
  })

  tweenB.to(
    {
      y: pos.y - 80,
    },
    1000
  )

  tweenB.onUpdate(function () {
    mesh.position.y = pos.y
  })

  tweenA.start()
  tweenA.chain(tweenB)
  tweenB.chain(tweenA)
}
function render() {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
  stats.update()
  TWEEN.update() //tween更新
}

export { render, addEvnmap, AddMeshIntoArr, moveup }
