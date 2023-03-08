import * as THREE from '../../build/three.module.js'
import { GUI } from '../jsm/libs/dat.gui.module.js'
import { FBXLoader } from '../jsm/loaders/FBXLoader.js'
import { GLTFLoader } from '../jsm/loaders/GLTFLoader.js'
import { OrbitControls } from '../jsm/controls/OrbitControls.js'
import { CSS3DRenderer, CSS3DObject } from '../jsm/renderers/CSS3DRenderer.js'

import { CSS3DSprite } from '../jsm/renderers/CSS3DRenderer.js'

var nextPos = new THREE.Vector3() //射线点击建筑对应XOZ平面坐标
var dir = new THREE.Vector3() //飞行漫游方向，起始点构成的方向 默认值0，0，0

/**
 * 创建场景对象Scene
 */
var mixer = null,
  BImixer = null,
  PrimaryMesh = [],
  granaryArr = []
var clock = new THREE.Clock()
var clockB = new THREE.Clock()

$('#no').bind('hello', function () {
  console.log(document.getElementById('iframe'))
  document
    .getElementById('iframe')
    .removeChild(document.getElementById('iframe').childNodes[0])
  document.getElementById('iframe').style.visibility = 'hidden'
  aaaa()
})

var scene = new THREE.Scene()

/**
 * 光源设置
//  */
// const ambient = new THREE.AmbientLight(0xffffff, 1) //环境光源
// scene.add(ambient)
// const point = new THREE.PointLight(0xffffff) //点光源
// point.position.set(60, 300, 10) //点光源位置
// // 通过add方法插入场景中，不插入的话，渲染的时候不会获取光源的信息进行光照计算
// scene.add(point) //点光源添加到场景中

// const point1 = new THREE.PointLight(0xffffff) //点光源
// point1.position.set(-60, 920, 60) //点光源位置
// // scene.add(point1) //点光源添加到场景中

var Direction = new THREE.DirectionalLight(0xffffff)
Direction.position.set(1000, 1000, 0)
// scene.add(Direction)
scene.fog = new THREE.Fog(0x000000, 0.0001, 5000)
const hemiLight = new THREE.HemisphereLight(0xaaaaaa, 0xaaaaaa)
hemiLight.position.set(0, 120, 0)
scene.add(hemiLight)

/**
 * 相机设置
 */
var width = window.innerWidth //窗口宽度
var height = window.innerHeight //窗口高度
var k = width / height //窗口宽高比

var camera = new THREE.PerspectiveCamera(45, k, 1, 5000)
camera.position.set(0, 100, 0) //设置相机位置
camera.lookAt(scene.position) //设置相机方向(指向的场景对象)

/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer({
  antialias: true,
  // alpha: true,
})
renderer.setSize(width, height) //设置渲染区域尺寸
renderer.toneMappingExposure = 1
renderer.shadowMap.enabled = true
renderer.autoClear = false
renderer.gammaInput = true
renderer.gammaOutput = true //inear转gamma
renderer.toneMapping = THREE.ACESFilmicToneMapping

renderer.setClearColor(0xdddddd, 1)
renderer.outputEncoding = THREE.sRGBEncoding

document.body.appendChild(renderer.domElement) //body元素中插入canvas对象

// 创建一个CSS3渲染器CSS3DRenderer
var labelRenderer = new CSS3DRenderer()
labelRenderer.setSize(window.innerWidth, window.innerHeight)
labelRenderer.domElement.style.position = 'absolute'
// 避免renderer.domElement影响HTMl标签定位，设置top为0px
labelRenderer.domElement.style.top = '0px'
labelRenderer.domElement.style.left = '0px'
//设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
labelRenderer.domElement.style.pointerEvents = 'none'
document.body.appendChild(labelRenderer.domElement)

var controls = new OrbitControls(camera, renderer.domElement)

// 上下旋转范围
controls.minPolarAngle = 0
// controls.maxPolarAngle = Math.PI/2;
controls.maxPolarAngle = Math.PI / 2
// 启用或禁用摄像机平移
// controls.enablePan = false

//启用或禁用摄像机水平或垂直旋转
controls.enableRotate = false

// 左右旋转范围
// controls.minAzimuthAngle = -Math.PI * (100 / 180)
// 这一对象包含了用于控制相机平移的按键代码的引用。默认值为4个箭头（方向）键。
// 为指定的DOM元素添加按键监听。推荐将window作为指定的DOM元素。
// controls.listenToKeyEvents(domElement: HTMLDOMElement)

// 更新控制器。必须在摄像机的变换发生任何手动改变后调用，或如果.autoRotate或.enableDamping被设置时，在update循环里调用。

controls.update()

// //  坐标系
// var axesHelper = new THREE.AxesHelper(115);
// scene.add(axesHelper);

const textureLoader = new THREE.TextureLoader()

var loader = new FBXLoader() //创建一个FBX加载器
loader.load(
  './models/Internal_LayoutofCKL/Internal-LayoutofCKL.FBX',
  function (obj) {
    console.log('查看返回的模型数据', obj)
    // obj.position.z
    // obj.position.y += -45

    obj.rotation.z = Math.PI / 2
    scene.add(obj)

    obj.traverse(function (mesh) {
      if (mesh.isMesh) {
        mesh.material = new THREE.MeshBasicMaterial({
          transparent: true,
          map: mesh.material.map,
        })
      }
    })
    // scene.getChildByName('LengQueLouEquipmentYiPlane').material.opacity = 0
    scene.getChildByName('AHUPlane').traverse(function (mesh) {
      if (mesh.isMesh) {
        mesh.material.opacity = 0
        granaryArr.push(mesh)
        PrimaryMesh.push(mesh)
      }
    })
    aaaa()
  }
)

function aaaa() {
  addthlabel(
    'AHU01',
    'AHU01',
    'modbusAhu1',
    'modbusAhu1_temp',
    'modbusAhu1_hum'
  )
  addthlabel(
    'AHU02',
    'AHU02',
    'modbusAhu2',
    'modbusAhu2_temp',
    'modbusAhu2_hum'
  )

  addthlabel(
    'AHU03',
    'AHU03',
    'modbusAhu3',
    'modbusAhu3_temp',
    'modbusAhu3_hum'
  )
  addthlabel(
    'AHU04',
    'AHU04',
    'modbusAhu4',
    'modbusAhu4_temp',
    'modbusAhu4_hum'
  )
  addthlabel(
    'AHU05',
    'AHU05',
    'modbusAhu5',
    'modbusAhu5_temp',
    'modbusAhu5_hum'
  )
  addthlabel(
    'AHU06',
    'AHU06',
    'modbusAhu6',
    'modbusAhu6_temp',
    'modbusAhu6_hum'
  )
  addthlabel(
    'AHU07',
    'AHU07',
    'modbusAhu7',
    'modbusAhu7_temp',
    'modbusAhu7_hum'
  )
}

function deletelabel() {
  deletethlabel('AHU01', 'modbusAhu1', 'modbusAhu1_temp', 'modbusAhu1_hum')
  deletethlabel('AHU02', 'modbusAhu2', 'modbusAhu2_temp', 'modbusAhu2_hum')

  deletethlabel('AHU03', 'modbusAhu3', 'modbusAhu3_temp', 'modbusAhu3_hum')
  deletethlabel('AHU04', 'modbusAhu4', 'modbusAhu4_temp', 'modbusAhu4_hum')
  deletethlabel('AHU05', 'modbusAhu5', 'modbusAhu5_temp', 'modbusAhu5_hum')
  deletethlabel('AHU06', 'modbusAhu6', 'modbusAhu6_temp', 'modbusAhu6_hum')
  deletethlabel('AHU07', 'modbusAhu7', 'modbusAhu7_temp', 'modbusAhu7_hum')
}
var modbusScrewMachine_message, modbusScrewMachine, modbusHumData
function addthlabel(AHUName, AHUclass, name, jsonname, jsonhumname) {
  var AHU = scene.getObjectByName(AHUName)
  var labelarray = [],
    labelHUMarray = []

  $.ajax({
    type: 'get',
    url: `./json/` + jsonname + `.json`,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusScrewMachine_message = data.infoWindowField
    },
  })
  $.ajax({
    type: 'get',
    url: `./json/` + jsonhumname + `.json`,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusHumData = data.infoWindowField
    },
  })
  $.ajax({
    type: 'get',
    url:
      'http://221.6.30.202:15006/prod-api/modbus/api/getNewestData?modbusType=' +
      name,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusScrewMachine = data.data[0]
    },
  })

  for (var i in modbusScrewMachine) {
    if (i.search('temp') >= 0 && i.length == 5) {
      $('#th_label').append(
        `<div id="` +
          modbusScrewMachine_message[i].id +
          `"  class=` +
          AHUclass +
          `>
          
          <div class = "out_label"><div class = "labelname_class">
          <img  class = "tempture" src="./img/温度.png" />
          </div><div class = "labelvalue_class" >` +
          Number(modbusScrewMachine[i]).toFixed(2) +
          modbusScrewMachine_message[i].value +
          `</div></div></div>`
      )
      var la = document.getElementById(modbusScrewMachine_message[i].id)
      var ahula = new CSS3DObject(la)

      // ahula.name = modbusScrewMachine_message[i].id + `n`
      labelarray.push(ahula)
    } else if (i.search('humidity') >= 0 && i.length == 9) {
      $('#th_label').append(
        `<div id="` +
          modbusHumData[i].id +
          `"  class="` +
          AHUclass +
          `"><div class = "out_label"><div class = "humidityname_class">
          <img  class = "humidity" src="./img/湿度.png" /> 
          </div><div class = "humidityvalue_class" >` +
          Number(modbusScrewMachine[i]).toFixed(2) +
          modbusHumData[i].value +
          `</div></div></div>`
      )
      var la = document.getElementById(modbusHumData[i].id)
      var ahula = new CSS3DObject(la)
      ahula.name = 'HUM' + modbusHumData[i].id
      // ahula.material.depthWrite = false
      // ahula.name = modbusScrewMachine_message[i].id + 'n'
      labelarray.push(ahula)
    }
  }

  for (var i in AHU.children) {
    labelarray[i].position.copy(AHU.children[i].getWorldPosition())
    // labelarray[i].position.y += 300
    labelarray[i].name = AHU.children[i].name + 'label'
    // labelarray[i].rotation.z = Math.PI / 2

    if (AHU.children[i].name.search('EE160') >= 0) {
      labelarray[i].position.copy(AHU.children[i].getWorldPosition())
    }
    labelarray[i].rotation.x = (Math.PI * 3) / 2
    labelarray[i].scale.set(0.015, 0.015, 0.015)
    scene.add(labelarray[i])
  }
}

function deletethlabel(AHUName, name, jsonname, jsonhumname) {
  $.ajax({
    type: 'get',
    url:
      'http://221.6.30.202:15006/prod-api/modbus/api/getNewestData?modbusType=' +
      name,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusScrewMachine = data.data[0]
    },
  })

  $.ajax({
    type: 'get',
    url: `./json/` + jsonname + `.json`,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusScrewMachine_message = data.infoWindowField
    },
  })
  $.ajax({
    type: 'get',
    url: `./json/` + jsonhumname + `.json`,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusHumData = data.infoWindowField
    },
  })

  var AHU = scene.getObjectByName(AHUName)

  for (var i in AHU.children) {
    var labek = scene.getObjectByName(AHU.children[i].name + 'label')
    if (labek) labek.parent.remove(labek)
  }
}
var chooseMesh

function choose() {
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

  // console.log("射线投射器返回的对象 点point", intersects[0].point);
  // console.log("射线投射器的对象 几何体",intersects[0].object.geometry.vertices)
  // intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
    chooseMesh = intersects[0].object
    console.log('chooseMesh: ', chooseMesh)
    ShowSystemLabel(chooseMesh.name)
    deletelabel()
    //父页面传值给子页面
  }
}
function toChildValue(a) {}
addEventListener('click', choose) // 监听窗口鼠标单击事件

function ShowSystemLabel(name) {
  console.log(name)
  $('#iframe').html('')
  $('#iframe').append(
    `  <iframe 
    src="./control-system/html/control-system.html?` +
      name +
      `"
    style="width: 1000px; height: 722px"
    frameborder="0"
  ></iframe>`
  )
  container2.style.visibility = 'visible'
}

var container2 = document.getElementById('iframe')
var TFGlabel = new CSS3DSprite(container2)
TFGlabel.name = 'iframelabel'

//预选改变颜色
var changecolorMesh

function pointermove(event) {
  if (changecolorMesh) {
    changecolorMesh.material.opacity = 0
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
    changecolorMesh.material.opacity = 0.2
  }
}

addEventListener('pointermove', pointermove)

render()
/**整体渲染的方法 */
function render() {
  renderer.render(scene, camera) //执行渲染操作
  labelRenderer.render(scene, camera) //CSS2D渲染
  requestAnimationFrame(render) //请求再次执行渲染函数render，渲染下一帧
}
/**自适应窗口 */
window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}