import * as THREE from '../../../build/three.module.js'
import { GUI } from '../../jsm/libs/dat.gui.module.js'
import { FBXLoader } from '../../jsm/loaders/FBXLoader.js'
import { GLTFLoader } from '../../jsm/loaders/GLTFLoader.js'
import { OrbitControls } from '../../jsm/controls/OrbitControls.js'
import {
  CSS3DRenderer,
  CSS3DObject,
} from '../../jsm/renderers/CSS3DRenderer.js'

import { CSS3DSprite } from '../../jsm/renderers/CSS3DRenderer.js'

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

var scene = new THREE.Scene()

var setspeedPUMP001_CW = 0.01,
  setspeedAHU_HW = 0.01,
  setspeedAHU_CW = 0.01,
  setspeedPUMP003_HW = 0.01,
  setspeedPUMP002_CW = 0.01,
  setspeedPUMP003_CW = 0.01,
  setspeedPUMP004_CW = 0.01,
  setspeedPUMP005_CW = 0.01,
  speed = true

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
hemiLight.position.set(0, 451, 450)
scene.add(hemiLight)

/**
 * 相机设置
 */
var width = window.innerWidth //窗口宽度
var height = window.innerHeight //窗口高度
var k = width / height //窗口宽高比

var camera = new THREE.PerspectiveCamera(45, k, 1, 5000)
camera.position.set(0, 301, 550) //设置相机位置
camera.lookAt(scene.position) //设置相机方向(指向的场景对象)

var GLTFloader = new GLTFLoader() //创建一个FBX加载器
GLTFloader.load('./models/BG/BG.gltf', function (obj) {
  console.log('地面模型', obj)

  scene.add(obj.scene)

  obj.scene.scale.set(200, 200, 200)
  obj.scene.position.y -= 10

  scene.getObjectByName('BG').material = new THREE.MeshBasicMaterial({
    map: scene.getObjectByName('BG').material.map,
  })
})

/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer({
  antialias: true,
})
renderer.setSize(width, height) //设置渲染区域尺寸
renderer.toneMappingExposure = 1
// renderer.shadowMap.enabled = true
renderer.autoClear = false
// renderer.gammaInput = true
// renderer.gammaOutput = true //inear转gamma
// renderer.toneMapping = THREE.ACESFilmicToneMapping

// renderer.setClearColor(0xdddddd, 1)
renderer.outputEncoding = THREE.sRGBEncoding

document.body.appendChild(renderer.domElement) //body元素中插入canvas对象

// 创建一个CSS2渲染器CSS3DRenderer
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

var mapcatTexture = textureLoader.load('./img/Matel01.png')
var MapcatTapTexture = textureLoader.load('./img/YellowMatel.png')
var loader = new FBXLoader() //创建一个FBX加载器
loader.load(
  './models/Principle/YanChengJiKongOpacity_PrincipleModel.FBX',
  function (obj) {
    console.log('查看返回的模型数据', obj)
    // obj.rotateZ(Math.PI / 2)
    scene.add(obj)

    changMaterial(obj)
    addEvnmap('Floor')
    // movetextrue()
    acctdata()
    // chooseDataTextrue()
    scene.getObjectByName('Two_CHI_Net001').material.transparent = true
    scene.getObjectByName('Two_CHI_Net').material.transparent = true

    setTimeout(add, 3000)
    addshui()
    AddPAUName('3F_PAU', '温度预处理新风机组', -Math.PI / 2)
    AddPAUName('2F_PAU', '温度预处理新风机组', 0)
    AddPAUName('AHU', '净化组合式空调', -Math.PI / 2)
    AddPAUName('JMKT', '恒温恒湿空调', 0)
    AddMeshIntoArr('3F_PAU', 'granaryArr')
    AddMeshIntoArr('2F_PAU', 'granaryArr')
    AddMeshIntoArr('AHU', 'granaryArr')

    AddMeshIntoArr('3F_PAU', 'PrimaryMesh')
    AddMeshIntoArr('2F_PAU', 'PrimaryMesh')
    AddMeshIntoArr('AHU', 'PrimaryMesh')
  }
)

function AddMeshIntoArr(mesh, Arr) {
  var AArr
  if (Arr == 'granaryArr') {
    AArr = granaryArr
  } else if (Arr == 'PrimaryMesh') {
    AArr = PrimaryMesh
  }
  var device = scene.getObjectByName(mesh)
  device.traverse(function (obj) {
    if (obj.isMesh) {
      AArr.push(obj)
    }
  })
}
loader.load(
  './models/Principle/YanChengJiKongOpacity_PrincipleModel_ScrewLiquidChillerFan.FBX',
  function (obj) {
    console.log('大系统风扇', obj)
    // obj.rotateZ(Math.PI / 2)
    scene.add(obj)

    BImixer = new THREE.AnimationMixer(obj)

    var BImixerAnimationAction = BImixer.clipAction(obj.animations[0])
    //console.log('object.animations: ', object.animations);
    BImixerAnimationAction.play()
  }
)
loader.load(
  './models/Principle/YanChengJiKongOpacity_PrincipleModel_TwoCHIFan.FBX',
  function (obj) {
    console.log('小系统风扇', obj)
    // obj.rotateZ(Math.PI / 2)
    scene.add(obj)

    mixer = new THREE.AnimationMixer(obj)

    var AnimationAction = mixer.clipAction(obj.animations[0])

    AnimationAction.play()
  }
)

$('#btn').click(function () {
  if (speed) {
    speed = false
    HWsetspeed = 0
    CWsetspeed = 0
  } else {
    speed = true
    HWsetspeed = 0.01
    CWsetspeed = 0.01
  }
})
$('#exit').click(function () {
  movecamera()
  // camera.position.set(0, 1011, 130) //设置相机位置
  // controls.target.set(scene.position.x, scene.position.y, scene.position.z) //设置相机方向(指向的场景对象)
  // controls.update()
})
var exitLabel = document.getElementById('exit')
var CSS3DexitLabel = new CSS3DSprite(exitLabel)

function delteFromArr(value, Arr) {
  var AArr
  if (Arr == 'granaryArr') {
    AArr = granaryArr
  } else if (Arr == 'PrimaryMesh') {
    AArr = PrimaryMesh
  }
  for (var i = 0; i < AArr.length; i++) {
    if ((AArr[i].name = value)) {
      AArr.splice(i, 1)
    }
  }
}

function chooseDataTextrue() {
  if (modbusBmsvalue.jzzt1Bit5 == 1) {
    // movetextrue('PUMP003_HW', speed)
  } else if (modbusBmsvalue.jzzt1Bit6 == 1) {
  } else if (modbusBmsvalue.jzzt1Bit7 == 1) {
  } else if (modbusBmsvalue.jzzt1Bit8 == 1) {
  } else if (modbusBmsvalue.jzzt1Bit9 == 1) {
  } else if (modbusBmsvalue.jzzt1Bit10 == 1) {
  } else if (modbusBmsvalue.jzzt1Bit11 == 1) {
  }
}
function movecamera(m, DoorAll) {
  var FloorPosition
  if (m != null) {
    FloorPosition = scene.getObjectByName(m).getWorldPosition()
    var a = FloorPosition.x,
      b = FloorPosition.y + 0,
      c = FloorPosition.z - 15
  } else {
    FloorPosition = { x: 0, y: 0, z: 0 }
  }

  var p1 = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
  }
  // 相机目标位置点
  // const p2 = { x: -1000, y: 1020, z: 4060 }

  var p2
  if (m != null) {
    p2 = {
      x: a,
      y: b,
      z: c,
    }
  } else {
    p2 = {
      x: 0,
      y: 301,
      z: 550,
    }
  }

  var tween = new TWEEN.Tween(p1).to(p2, 3000)
  // .easing(TWEEN.Easing.Quadratic.InOut)
  tween.onUpdate(() => {
    // 修改相机位置
    camera.position.set(p1.x, p1.y, p1.z)
    camera.lookAt(FloorPosition.x, FloorPosition.y, FloorPosition.z)
    controls.target.set(
      FloorPosition.x /*- 20*/,
      FloorPosition.y,
      FloorPosition.z
    ) // 确保镜头移动后，视觉中心还在圆点处
    controls.update()
  })
  // 开始动画
  tween.start()
  // var PDG_DoorAll = scene.getObjectByName('PDG_DoorAll')
  // var positionb = {
  //   PDG_DoorAllrotationZ: 0,
  // }
  // var tweenB = new TWEEN.Tween(positionb).to({ rotationZ: Math.PI / 2 }, 3000)
  // tweenB.onUpdate(function () {
  //   scene.getObjectByName('PDG_DoorAll').position.z = 0
  // })

  if (DoorAll != null) {
    scene.getObjectByName(DoorAll).rotateZ(Math.PI / 2)
  }
}
function movetextrue(name, speed) {
  var PUMP003_HW = scene.getObjectByName(name)

  setInterval(() => {
    PUMP003_HW.material.map.offset.x -= speed
  })
}

function changMaterial(obj) {
  obj.traverse(function (mesh) {
    if (mesh.isMesh) {
      mesh.material = new THREE.MeshStandardMaterial({
        map: mesh.material.map,
      })
    }
  })
  var WaterTank = scene.getObjectByName('WaterTank')
  WaterTank.material = new THREE.MeshMatcapMaterial({
    matcap: mapcatTexture,
  })

  var Tap = scene.getObjectByName('Tap')
  Tap.material = new THREE.MeshMatcapMaterial({
    matcap: mapcatTexture,
  })
}
function addEvnmap(Floor) {
  const textureLoader = new THREE.TextureLoader()
  var evnmap = textureLoader.load('./img/construction_yard01_2k.png')

  evnmap.mapping = THREE.EquirectangularReflectionMapping
  evnmap.encoding = THREE.sRGBEncoding

  var fool = scene.getObjectByName(Floor)
  fool.material = new THREE.MeshStandardMaterial({
    map: fool.material.map,
    // envMapIntensity: 2,
    envMap: evnmap,
    roughness: 0,
  })
}

//预选改变颜色
var changecolorMesh

function pointermove(event) {
  if (changecolorMesh) {
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

    changecolorMesh.material.color.set(0x00ffff)
  }
}

addEventListener('pointermove', pointermove)

var chooseMesh

function click(event) {
  if (chooseMesh) {
    chooseMesh.material.color.set(0xffffff)
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
    chooseMesh = intersects[0].object
    console.log('chooseMesh: ', chooseMesh)
    if (chooseMesh.name == 'PAU_2_5') {
      showlabel('ModbusBms2f10', chooseMesh)
    } else if (chooseMesh.name == 'PAU_2_4') {
      showlabel('ModbusBms2f6', chooseMesh)
    } else if (chooseMesh.name == 'PAU_2_3') {
      showlabel('ModbusBms2f5', chooseMesh)
    } else if (chooseMesh.name == 'PAU_2_2') {
      showlabel('ModbusBms2f3', chooseMesh)
    } else if (chooseMesh.name == 'PAU_2_1') {
      showlabel('ModbusBms2f1', chooseMesh)
    } else if (chooseMesh.parent.name == '3F_PAU') {
      showlabel('ModbusBms3f' + chooseMesh.name.slice(-1), chooseMesh)
    } else if (chooseMesh.name == 'AHU-3-1') {
      showlabel('ModbusBms3f5', chooseMesh)
    } else if (chooseMesh.name == 'AHU-3-2') {
      showlabel('ModbusBms3f7', chooseMesh)
    } else if (chooseMesh.name == 'AHU-2-1') {
      showlabel('ModbusBms2f13', chooseMesh)
    }

    chooseMesh.material.color.set(0x00ffff)
  }
}

addEventListener('click', click)

/**单击查看空调数据 */
var ALLChineseName
function showlabel(name, chooseMesh) {
  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/modbus/api/getFieldDetails?modbusType',
    data: ALLChineseName,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ALLChineseName = data.data
    },
  })
  console.log('ALLChineseName: ', ALLChineseName)
  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusType',
    data: modbusBmsvalue,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusBmsvalue = data.data
      console.log('modbusBmsvalue: ', modbusBmsvalue)
    },
  })

  for (const i in ALLChineseName) {
    if (i == name) {
      $('#dataAll_left').html('')
      $('#dataAll_right').html('')

      for (const j in ALLChineseName[i]) {
        if (
          (ALLChineseName[i][j].search('送风') >= 0 &&
            ALLChineseName[i][j].search('故障') < 0 &&
            ALLChineseName[i][j].search('BF') < 0) ||
          ALLChineseName[i][j].search('系统启停状态') >= 0
        ) {
          $('#dataAll_left').append(
            `
           
               <div   class="dataclass_out">
<div   class="dataclass_out_name">` +
              ALLChineseName[i][j] +
              `</div><div   class="dataclass_value">   ` +
              modbusBmsvalue[i][j] +
              `</div>
</div>
            
         `
          )
        } else if (
          ALLChineseName[i][j].search('频率') >= 0 &&
          ALLChineseName[i][j].search('故障') < 0
        ) {
          $('#dataAll_right').append(
            `
            <div   class="dataclass_out">
<div   class="dataclass_out_name">` +
              ALLChineseName[i][j] +
              `</div><div   class="dataclass_value">   ` +
              modbusBmsvalue[i][j] +
              `HZ</div>
</div>`
          )
        } else if (
          ALLChineseName[i][j].search('风压') >= 0 &&
          ALLChineseName[i][j].search('故障') < 0
        ) {
          $('#dataAll_right').append(
            `
            <div   class="dataclass_out">
<div   class="dataclass_out_name">` +
              ALLChineseName[i][j] +
              `</div><div   class="dataclass_value">   ` +
              modbusBmsvalue[i][j] +
              `Pa</div>
</div>`
          )
        }
      }
    }
  }
  $('#ktname').text(chooseMesh.name)
  $('#LQT_out').click(function () {
    VAV_nametag.style.visibility = 'hidden'
  })
  PrincipLabel.position.copy(chooseMesh.getWorldPosition())
  // PrincipLabel.position.y += 50

  PrincipLabel.element.style.visibility = 'visible' //显示标签
}

var VAV_nametag = document.getElementById('AHU')
var PrincipLabel = new CSS3DSprite(VAV_nametag)
PrincipLabel.scale.set(0.2, 0.2, 0.2)
scene.add(PrincipLabel)

/**添加各个空调机的名字 */
function AddPAUName(MeshGroupName, place, rota) {
  scene.getChildByName(MeshGroupName).traverse(function (mesh) {
    if (mesh.isMesh) {
      $('body').append(
        `<div id="` +
          mesh.name +
          `" class="label_name">
<div class="label_name_one">` +
          mesh.name +
          `</div>
<div  class="label_name_floor" >` +
          place +
          `</div>
</div>`
      )

      var meshtag = document.getElementById(mesh.name)
      var meshlabel = new CSS3DObject(meshtag)
      meshlabel.position.copy(mesh.getWorldPosition())
      meshlabel.position.y += 15
      if (mesh.name == 'AHU-2-1') {
      } else {
        meshlabel.rotateY(rota)
      }
      meshlabel.scale.set(0.2, 0.2, 0.2)
      scene.add(meshlabel)
    }
  })
}

var ChineseName, modbusBmsvalue

function acchiveData() {
  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/modbus/api/getFieldDetails?modbusType=modbusBms4f2',
    data: ChineseName,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ChineseName = data.data.ModbusBms4f2
      console.log('ChineseName: ', ChineseName)
    },
  })

  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusFloor=4f&modbusType=modbusBms4f2',
    data: modbusBmsvalue,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusBmsvalue = data.data.ModbusBms4f2
      console.log('modbusBmsvalue: ', modbusBmsvalue)
    },
  })

  // setTimeout(acchiveData(), 10000)
}
acchiveData()
function acctdata() {
  for (const i in ChineseName) {
    if (
      ChineseName[i].search('水泵启停状态') >= 0 ||
      ChineseName[i].search('水泵运行') >= 0
    ) {
      console.log(' modbusBmsvalue[i] == 1: ', modbusBmsvalue[i] == 1)
      if (i.search('5') == 8 && modbusBmsvalue[i] == 1) {
        runBeng('sbHz1')
        movetextrue('PUMP001_CW', 0.01) //第一条
      } else if (i.search('6') == 8 && modbusBmsvalue[i] == 1) {
        runBeng('sbHz2')

        movetextrue('PUMP_CW', 0.01) //第二条
      } else if (i.search(7) == 8 && modbusBmsvalue[i] == 1) {
        runBeng('sbHz3')
        movetextrue('PUMP002_CW', 0.01) //0第三
      } else if (i.search(8) == 8 && modbusBmsvalue[i] == 1) {
        runBeng('sbHz4')
        movetextrue('PUMP003_CW', 0.01) //第四个

        movetextrue('PUMP003_HW', 0.01) //大系统红色
      } else if (i.search(9) == 8 && modbusBmsvalue[i] == 1) {
        runBeng('PUMP004')
        movetextrue('PUMP004_CW', 0.01)
      } else if (i.search(10) == 8 && modbusBmsvalue[i] == 1) {
        runBeng('PUMP005')
        movetextrue('PUMP005_CW', 0.01)
      } else if (i.search(11) == 8 && modbusBmsvalue[i] == 1) {
        runBeng('PUMP006')
        movetextrue('AHU_CW', 0.01) //小系统蓝色
        movetextrue('AHU_HW', 0.01) //小系统红
      }
    }
  }
}
function runBeng(meshName) {
  var obj = { r: 1, g: 1, b: 0 }
  var tweenA = new TWEEN.Tween(obj) //创建一段tween动画
  tweenA.to({ r: 0, g: 1, b: 1 }, 2000) //4000毫秒从红色0xff0000到青色0x00ffff
  tweenA.onUpdate(function () {
    // tween动画执行期间.onUpdate()重复执行，更新mesh颜色
    scene
      .getObjectByName(meshName)
      .material.emissive.setRGB(obj.r, obj.g, obj.b)
  })
  var objB = { r: 1, g: 0, b: 1 }
  var tweenB = new TWEEN.Tween(objB) //创建一段tween动画
  tweenB.to({ r: 1, g: 1, b: 0 }, 2000) //4000毫秒从红色0xff0000到青色0x00ffff
  tweenB.onUpdate(function () {
    // tween动画执行期间.onUpdate()重复执行，更新mesh颜色
    scene
      .getObjectByName(meshName)
      .material.emissive.setRGB(obj.r, obj.g, obj.b)
  })

  tweenA.start() //tween动画开始执行(你可以选择合适的时候触发执行)
  tweenA.chain(tweenB)
  tweenB.chain(tweenA)
}

var benGroup = new THREE.Group()
function add() {
  $('[txname*=shanchu]').remove()
  for (const i in ChineseName) {
    if (ChineseName[i].search('水泵频率') >= 0) {
      $('body').append(
        ` <div txname= "shanchu"   class="class="labelclass_shuibeng_all" " id =  ` +
          i +
          `> <div class="label_center_shuibeng_all"> <div  class="temshuibeng_all"  ></div>
      <div class="humshuibeng_all">` +
          modbusBmsvalue[i] +
          `HZ</div></div></div>
      `
      )

      var jj2 = document.getElementById(i)

      var jj2label = new CSS3DObject(jj2)
      jj2label.name = i + 'n'
      benGroup.add(jj2label)
    }
  }

  var PUMP_ALL = scene.getObjectByName('PUMP_ALL')

  scene.add(benGroup)

  for (var a = 0; a < 4; a++) {
    benGroup.children[a].scale.set(0.35, 0.35, 0.35)
    benGroup.children[a].rotateY(-Math.PI / 2)
    var benGroupname = benGroup.children[a]

    if (PUMP_ALL.children[a].type == 'Mesh') {
      benGroup.children[a].position.copy(
        scene
          .getObjectByName(
            benGroupname.name.slice(0, benGroupname.name.length - 1)
          )
          .getWorldPosition()
      )
    }
    benGroup.children[a].position.y += 20
  }
}

var shuiGroup = new THREE.Group()
var shuiArr = []

function addshui() {
  console.log('ChineseName', ChineseName)
  $('body').append(
    ` <div txname= "shanchu"   class="labelclass_shui_all" id = "dxt" >  <div class = "temshui_all" >进水温度</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxtzjJswd +
      `℃</div>
          <div  class = "temshui_all">` +
      ChineseName.dxtzjCswd +
      `</div>
      <div>` +
      modbusBmsvalue.dxtzjCswd +
      `℃</div>

          <div  class = "temshui_all">` +
      ChineseName.dxtzjHjwd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxtzjHjwd +
      `℃</div>
          </div>
      `
  )
  var dxt = document.getElementById('dxt')
  shuiArr.push(dxt)
  var dxtlabel = new CSS3DObject(dxt)
  dxtlabel.name = 'PAU_MCn'
  shuiGroup.add(dxtlabel)

  $('body').append(
    ` <div txname= "shanchu"   class="labelclass_shui_all" id = "dxt0" >  <div class = "temshui_all" >` +
      ChineseName.dxt0cjJswd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt0cjJswd +
      `℃</div>
          <div  class = "temshui_all">` +
      ChineseName.dxt0cjCswd +
      `</div>
      <div>` +
      modbusBmsvalue.dxt0cjCswd +
      `℃</div>

          <div  class = "temshui_all">` +
      ChineseName.dxt0cjHjwd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt0cjHjwd +
      `℃</div>
          </div>
      `
  )
  var dxt0 = document.getElementById('dxt0')
  shuiArr.push(dxt0)
  var dxt0label = new CSS3DObject(dxt0)
  dxt0label.name = 'PAU_MC0n'
  shuiGroup.add(dxt0label)

  $('body').append(
    ` <div txname= "shanchu"   class="labelclass_shui_all" id = "dxt1" >  <div class = "temshui_all" >进水温度</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt1cjJswd +
      `℃</div>
          <div  class = "temshui_all">` +
      ChineseName.dxt1cjCswd +
      `</div>
      <div>` +
      modbusBmsvalue.dxt1cjCswd +
      `℃</div>

          <div  class = "temshui_all">` +
      ChineseName.dxt1cjHjwd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt1cjHjwd +
      `℃</div>
          </div>
      `
  )
  var dxt1 = document.getElementById('dxt1')
  var dxt1label = new CSS3DObject(dxt1)
  dxt1label.name = 'PAU_MC1n'
  shuiGroup.add(dxt1label)

  $('body').append(
    ` <div txname= "shanchu"   class="labelclass_shui_all" id = "dxt2" >  <div class = "temshui_all" >` +
      ChineseName.dxt2cjJswd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt2cjJswd +
      `℃</div>
          <div  class = "temshui_all">` +
      ChineseName.dxt2cjCswd +
      `</div>
      <div>` +
      modbusBmsvalue.dxt2cjCswd +
      `℃</div>

          <div  class = "temshui_all">` +
      ChineseName.dxt2cjHjwd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt2cjHjwd +
      `℃</div>
          </div>
      `
  )
  var dxt2 = document.getElementById('dxt2')
  var dxt2label = new CSS3DObject(dxt2)
  dxt2label.name = 'PAU_MC2n'
  shuiGroup.add(dxt2label)

  $('body').append(
    ` <div txname= "shanchu"   class="labelclass_shui_all" id = "dxt3" >  <div class = "temshui_all" >` +
      ChineseName.dxt3cjJswd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt3cjJswd +
      `℃</div>
          <div  class = "temshui_all">` +
      ChineseName.dxt3cjCswd +
      `</div>
      <div>` +
      modbusBmsvalue.dxt3cjCswd +
      `℃</div>

          <div  class = "temshui_all">` +
      ChineseName.dxt3cjHjwd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt3cjHjwd +
      `℃</div>
          </div>
      `
  )
  var dxt3 = document.getElementById('dxt3')
  var dxt3label = new CSS3DObject(dxt3)
  dxt3label.name = 'PAU_MC3n'
  shuiGroup.add(dxt3label)

  $('body').append(
    ` <div txname= "shanchu"   class="labelclass_shui_all" id = "dxt4" >  <div class = "temshui_all" >` +
      ChineseName.dxt4cjJswd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt4cjJswd +
      `℃</div>
          <div  class = "temshui_all">` +
      ChineseName.dxt4cjCswd +
      `</div>
      <div>` +
      modbusBmsvalue.dxt4cjCswd +
      `℃</div>

          <div  class = "temshui_all">` +
      ChineseName.dxt4cjHjwd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt4cjHjwd +
      `℃</div>
          </div>
      `
  )
  var dxt4 = document.getElementById('dxt4')
  var dxt4label = new CSS3DObject(dxt4)
  dxt4label.name = 'PAU_MC4n'
  shuiGroup.add(dxt4label)

  $('body').append(
    ` <div txname= "shanchu"   class="labelclass_shui_all" id = "dxt5" >  <div class = "temshui_all" >` +
      ChineseName.dxt5cjJswd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt5cjJswd +
      `℃</div>
          <div  class = "temshui_all">` +
      ChineseName.dxt5cjCswd +
      `</div>
      <div>` +
      modbusBmsvalue.dxt5cjCswd +
      `℃</div>

          <div  class = "temshui_all">` +
      ChineseName.dxt5cjHjwd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt5cjHjwd +
      `℃</div>
          </div>
      `
  )
  var dxt5 = document.getElementById('dxt5')
  var dxt5label = new CSS3DObject(dxt5)
  dxt5label.name = 'PAU_MC5n'
  shuiGroup.add(dxt5label)

  $('body').append(
    ` <div txname= "shanchu"   class="labelclass_shui_all" id = "dxt6" >  <div class = "temshui_all" >` +
      ChineseName.dxt6cjJswd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt6cjJswd +
      `℃</div>
          <div  class = "temshui_all">` +
      ChineseName.dxt6cjCswd +
      `</div>
      <div>` +
      modbusBmsvalue.dxt6cjCswd +
      `℃</div>

          <div  class = "temshui_all">` +
      ChineseName.dxt6cjHjwd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt6cjHjwd +
      `℃</div>
          </div>
      `
  )
  var dxt6 = document.getElementById('dxt6')
  var dxt6label = new CSS3DObject(dxt6)
  dxt6label.name = 'PAU_MC6n'
  shuiGroup.add(dxt6label)

  $('body').append(
    ` <div txname= "shanchu"   class="labelclass_shui_all" id = "dxt7" >  <div class = "temshui_all" >` +
      ChineseName.dxt7cjJswd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt7cjJswd +
      `℃</div>
          <div  class = "temshui_all">` +
      ChineseName.dxt7cjCswd +
      `</div>
      <div>` +
      modbusBmsvalue.dxt7cjCswd +
      `℃</div>

          <div  class = "temshui_all">` +
      ChineseName.dxt7cjHjwd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt7cjHjwd +
      `℃</div>
          </div>
      `
  )
  var dxt7 = document.getElementById('dxt7')
  var dxt7label = new CSS3DObject(dxt7)
  dxt7label.name = 'PAU_MC7n'
  shuiGroup.add(dxt7label)

  $('body').append(
    ` <div txname= "shanchu"   class="labelclass_shui_all" id = "dxt8" >  <div class = "temshui_all" >` +
      ChineseName.dxt8cjJswd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt8cjJswd +
      `℃</div>
          <div  class = "temshui_all">` +
      ChineseName.dxt8cjCswd +
      `</div>
      <div>` +
      modbusBmsvalue.dxt8cjCswd +
      `℃</div>

          <div  class = "temshui_all">` +
      ChineseName.dxt8cjHjwd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt8cjHjwd +
      `℃</div>
          </div>
      `
  )
  var dxt8 = document.getElementById('dxt8')
  var dxt8label = new CSS3DObject(dxt8)
  dxt8label.name = 'PAU_MC8n'
  shuiGroup.add(dxt8label)

  $('body').append(
    ` <div txname= "shanchu"   class="labelclass_shui_all" id = "dxt9" >  <div class = "temshui_all" >` +
      ChineseName.dxt9cjJswd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt9cjJswd +
      `℃</div>
          <div  class = "temshui_all">` +
      ChineseName.dxt9cjCswd +
      `</div>
      <div>` +
      modbusBmsvalue.dxt9cjCswd +
      `℃</div>

          <div  class = "temshui_all">` +
      ChineseName.dxt9cjHjwd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt9cjHjwd +
      `℃</div>
          </div>
      `
  )
  var dxt9 = document.getElementById('dxt9')
  var dxt9label = new CSS3DObject(dxt9)
  dxt9label.name = 'PAU_MC9n'
  shuiGroup.add(dxt9label)

  $('body').append(
    ` <div txname= "shanchu"   class="labelclass_shui_all" id = "dxt10" >  <div class = "temshui_all" >` +
      ChineseName.dxt10cjJswd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt10cjJswd +
      `℃</div>
          <div  class = "temshui_all">` +
      ChineseName.dxt10cjCswd +
      `</div>
      <div>` +
      modbusBmsvalue.dxt10cjCswd +
      `℃</div>

          <div  class = "temshui_all">` +
      ChineseName.dxt10cjHjwd +
      `</div>
      <div  clas ="humshui_all">` +
      modbusBmsvalue.dxt10cjHjwd +
      `℃</div>
          </div>
      `
  )
  var dxt10 = document.getElementById('dxt10')
  var dxt10label = new CSS3DObject(dxt10)
  dxt10label.name = 'PAU_MC10n'
  shuiGroup.add(dxt10label)
  shuiGroup.name = 'shuiGroup'
  scene.add(shuiGroup)

  for (var i = 0; i < shuiGroup.children.length; i++) {
    var Labelmesh = shuiGroup.children[i]

    Labelmesh.element.style.visibility = 'visible'
    Labelmesh.position.copy(
      scene
        .getObjectByName(Labelmesh.name.slice(0, Labelmesh.name.length - 1))
        .getWorldPosition()
    )
    // Labelmesh.position.set(0, 0, 0)
    Labelmesh.scale.set(0.1, 0.1, 0.1)
  }

  scale(dxt, dxtlabel)
  scale(dxt0, dxt0label)
  scale(dxt1, dxt1label)
  scale(dxt2, dxt2label)
  scale(dxt3, dxt3label)
  scale(dxt4, dxt4label)
  scale(dxt5, dxt5label)
  scale(dxt6, dxt6label)
  scale(dxt7, dxt7label)
  scale(dxt8, dxt8label)
  scale(dxt9, dxt9label)
  scale(dxt10, dxt10label)
}
function scale(dxt, dxtlabel) {
  dxt.onpointermove = function () {
    dxtlabel.scale.set(0.8, 0.8, 0.8)
    // dxtlabel.position.y += 50
  }
  dxt.onpointerleave = function () {
    dxtlabel.scale.set(0.1, 0.1, 0.1)
    // dxtlabel.position.y -= 50
  }
}
render()
/**整体渲染的方法 */
function render() {
  TWEEN.update() //tween更新

  if (BImixer !== null) {
    BImixer.update(clock.getDelta())
    //更新混合器相关的时间
  }
  if (mixer !== null) {
    mixer.update(clockB.getDelta())

    //更新混合器相关的时间
  }

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
