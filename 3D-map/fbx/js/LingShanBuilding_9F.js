import * as THREE from '../../build/three.module.js'
import { GUI } from '../jsm/libs/dat.gui.module.js'
import { GLTFLoader } from '../jsm/loaders/GLTFLoader.js'
import { CSS2DObject } from '../jsm/renderers/CSS2DRenderer.js'
import { LineSegments2 } from '../jsm/lines/LineSegments2.js'
import { LineMaterial } from '../jsm/lines/LineMaterial.js'
import { LineGeometry } from '../jsm/lines/LineGeometry.js'
import {
  F9_JG001,
  F9_JG002,
  F9_JG003,
  F9_JG004,
  F9_JG005,
  F9_JG006,
  F9_JG008,
  F9_JG009,
  F9_JG010,
  F9_JG011,
  F9_JG012,
  F9_JG013,
  arrJG,
} from './fun-ajax.js'
import { scene, renderer, camera } from './light.js'
import { controls } from './render.js'
import {
  addlabel,
  Alabel,
  AClabel,
  labelRenderer,
  CSSNameLAbel,
} from './tempeture.js'
import {
  changeURL,
  changenameURL,
  exchageURL,
  MoveOpacityMesh,
  addArry,
  createcurve,
  showlabel,
  showDeptName,
  deleline,
  addline,
  points,
} from './fun-ajax.js'
const params = {
  HuaWei: false,
  enableFoor2: false,
  enableDevie: false,
  run: false,
}
/**
 * 创建场景对象Scene
 */

var granaryArr = [],
  Arr = [],
  JIGUI = [],
  PrimaryMesh = []
var label, flyPipe, HUAWEI, slope, num

var acceptName = null
// var url = location.search

// $(function () {
//   getData1()
// })
// function getData1() {
//   acceptName = $.query.get('name')
// }

var url = decodeURI(window.location.href)
console.log('url: ', url)
var argsIndex = url.split('?name=')
console.log('argsIndex: ', argsIndex[1])
acceptName = argsIndex[1]
const loader = new GLTFLoader()
loader.load(
  '../models/LingShanBuilding/LingShanBuilding_9F.gltf',
  function (object) {
    object.scene.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    // object.scene.position.y = 120

    scene.add(object.scene)
    console.log('object.scene: ', object.scene)
    onloadfun()

    addArry('9F_DTE', PrimaryMesh)
    addArry('9F_DTE', granaryArr)
    addArry('9F_JG_Opacity', JIGUI)
    addArry('9F_JG_Opacity', granaryArr)
    addArry('9F_JG_Opacity', PrimaryMesh)

    scene.getObjectByName('9F_DTE').traverse(function (mesh) {
      if (mesh.isMesh) {
        console.log(mesh.name)
      }
    })
  }
)

var R = 10

// var tag = document.getElementById('label')

// label = new CSS3DSprite(tag)

// tag.style.pointerEvents = 'none' //避免HTML标签遮挡三维场景的鼠标事件
// scene.add(label)

// function showlabel(mesh) {
//   Alabel.scale.set(0.2, 0.2, 0.2)
//   Alabel.element.style.visibility = 'visible'
//   Alabel.position.copy(mesh.getWorldPosition())
//   Alabel.position.z = mesh.getWorldPosition().z + 60
//   Alabel.position.y = mesh.getWorldPosition().y - 10
// }

function contextmenu() {
  HUAWEI = scene.getObjectByName('9F_HUAWEI_UP_ALL')
  HUAWEI.traverse(function (mesh) {
    if (mesh.isMesh) {
      mesh.material.visible = true
    }
  })
}

var chooseMesh, timeout, DoublechooseMesh, changecolorMesh

function choose(event) {
  clearTimeout(timeout) //单击事件，清理定时器
  //设置定时器
  timeout = setTimeout(function () {
    if (chooseMesh) {
      Alabel.element.style.visibility = 'hidden' //显示标签
      deleline(chooseMesh)
      // label.element.style.visibility = 'hidden';
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
    //   console.log("射线投射器的对象 几何体",intersects[0].object.geometry.vertices)
    //   intersects.length大于0说明，说明选中了模型
    if (intersects.length > 0) {
      chooseMesh = intersects[0].object
      console.log('chooseMesh: ', chooseMesh)
      if (chooseMesh.material.opacity < 1) {
        chooseMesh.material.transparent = true
        chooseMesh.material.opacity = 1
      } else if (chooseMesh.parent.name == '9F_JG_Opacity') {
        ;(chooseMesh.material.transparent = true),
          (chooseMesh.material.opacity = 0.1)
      } else {
        showlabel(chooseMesh, 0.2, 0, 20, 60)
        addline(chooseMesh)
        exchageURL(chooseMesh.name)
      }
    }
  }, 200)
}

//双击事件
var cameraposition = true
function dblchoose(event) {
  clearTimeout(timeout)
  HUAWEI = scene.getObjectByName('9F_HUAWEI_UP_ALL')
  HUAWEI.traverse(function (mesh) {
    if (mesh.isMesh) {
      mesh.material.visible = false
      mesh.material.opacity = 0.3
    }
  })
  if (DoublechooseMesh) {
    if (
      DoublechooseMesh.name !== '9F_JG' &&
      DoublechooseMesh.name !== '9F_JG001'
    ) {
      moveup(DoublechooseMesh, 80)
    } else {
      moveup(DoublechooseMesh, -80)
    }
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
  var intersects = raycaster.intersectObjects(JIGUI)

  //   intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
    DoublechooseMesh = intersects[0].object

    if (
      DoublechooseMesh.name == '9F_JG' ||
      DoublechooseMesh.name == '9F_JG001'
    ) {
      cameraposition = false

      movecamera(DoublechooseMesh.name)

      moveup(DoublechooseMesh, 80)
    } else {
      cameraposition = true

      movecamera(DoublechooseMesh.name)

      moveup(DoublechooseMesh, -80)
    }
  }
}

function moveup(mesh, num) {
  var pos = mesh.position

  var tween = new TWEEN.Tween(pos)

  tween.to(
    {
      x: pos.x + num,
    },
    3000
  )

  tween.onUpdate(function () {
    mesh.position.x = pos.x
  })
  tween.start()
}

function movecamera(m, p2) {
  var Floor = scene.getObjectByName(m)
  var FloorPosition = Floor.getWorldPosition()

  console.log('Floor: ', Floor)

  var p1 = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
  }
  // 相机目标位置点
  // const p2 = { x: -1000, y: 1020, z: 4060 }
  var FloorPosition_x
  if (cameraposition == true) {
    FloorPosition_x = FloorPosition.x + 140
  } else {
    FloorPosition_x = FloorPosition.x - 140
  }

  p2 = {
    x: FloorPosition_x,
    y: FloorPosition.y + 15,
    z: FloorPosition.z,
  }

  // 使用tween动画
  var tween = new TWEEN.Tween(p1)
    .to(p2, 4000)
    .easing(TWEEN.Easing.Quadratic.InOut)
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
}

function onloadfun() {
  var JiGuiNum = null
  if (url.search('name') > 0) {
    const Mesh = scene.getObjectByName(acceptName)

    var JiGuiName =
      Mesh.parent.name.slice(0, 5) + 0 + Mesh.parent.name.slice(-2)

    if (acceptName != undefined) {
      alert('您已进入灵山机房' + Mesh.parent.name.slice(-2) + '机柜')
    }
    DoublechooseMesh = scene.getObjectByName(JiGuiName)

    if (JiGuiName == '9F_JG' || JiGuiName == '9F_JG001') {
      JiGuiNum = -140
      MoveOpacityMesh(JiGuiName, 80)
    } else {
      // console.log('00')
      JiGuiNum = 140
      MoveOpacityMesh(JiGuiName, -80)
    }

    var Meshposition = Mesh.getWorldPosition()
    camera.position.set(
      Meshposition.x + JiGuiNum,
      Meshposition.y,
      Meshposition.z
    )

    console.log(Meshposition)
    // camera.lookAt(Meshposition)
    controls.target.copy(Meshposition)
    controls.update()
    addline(Mesh)
  }
}

// Pace.on('done', function () {
//   if (acceptName) {
//     const Mesh = scene.getObjectByName(acceptName)

//     alert('您已进入灵山机房' + Mesh.parent.name.slice(-2) + '机柜')
//   }
// })
// 巡检数据
function a(linearr, DoublechooseMesh, num) {
  console.log(' flyPipe: ', flyPipe)
  slope = num
  createcurve(linearr, 10)
  flyPipe = true
  moveup(DoublechooseMesh, -150)

  // if (DoublechooseMesh.name == ('9F_JG' || '9F_JG001')) {
  //   var movenum = -50
  // } else {
  //   var movenum = 50
  // }
}
//预选改变颜色
function changecolor(event) {
  if (changecolorMesh) {
    changecolorMesh.material.emissive.set(0x000000)
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

    if (changecolorMesh.parent.parent.name == '9F_DTE') {
      changecolorMesh.material.emissive.set(0x33ffff)
      changenameURL(changecolorMesh.name)
      showDeptName(changecolorMesh)
    } else if (changecolorMesh.parent.name == '9F_JG_Opacity') {
      changecolorMesh.material.emissive.set(0x33ffff)
    } else {
      changecolorMesh.material.emissive.set(0x000000)
    }
  }
}

addEventListener('click', choose) // 监听窗口鼠标单击事件,鼠标单击选中某个国家Mesh

addEventListener('contextmenu', contextmenu)

addEventListener('dblclick', dblchoose)

addEventListener('pointermove', changecolor)

//界面
const gui = new GUI()

var name = {
  lingshan: function () {
    window.location.href = './webgl_loader_gltf_ls.html'
  },
  Map: function () {
    window.location.href = './Map.html'
  },
  数据库审计: function () {
    // 同步透明
    opacity()
    //展示标签

    adddept('LS-C07-DBANJDTAH-DBAuditor')
  },
  日志审计: function () {
    // 同步透明
    opacity()
    //展示标签

    adddept('LS-C07-RZSJNJDTTRX-TopAudit')
  },
  Vplexvs6: function () {
    // 同步透明
    opacity()
    //展示标签

    adddept('Vplexvs6')
  },
  堡垒机: function () {
    // 同步透明
    opacity()
    //展示标签

    adddept('LS-C07-BLJNJDTAH-USM')
  },

  EmcUnityXT680扩容后: function () {
    // 同步透明
    opacity()
    //展示标签

    adddept('EMC_UnityXT680_KuoRongHou')
  },
  关闭设备详情: function () {
    label.element.style.visibility = 'hidden'
  },
  退出: function () {
    flyPipe = false
    num = 0
    camera.position.set(400, 1200, 0)
    camera.lookAt(0, 0, 0)
  },
}
gui.add(name, 'Map').name('首页')
gui.add(name, 'lingshan').name('返回')
gui.add(name, '退出')
gui.add(name, '关闭设备详情')
gui.add(name, '堡垒机')
gui.add(name, '日志审计')
gui.add(name, '数据库审计')
gui.add(name, 'Vplexvs6')

gui.add(name, 'EmcUnityXT680扩容后')
var findmesh = null
var line1 = null
gui
  .add(params, 'HuaWei')
  .name('内部')
  .onChange((e) => {
    var inside = scene.getObjectByName('9F_JG_Opacity')

    if (e == true) {
      inside.children.forEach(function (mesh) {
        mesh.material.transparent = true
        mesh.material.opacity = 0.1
      })
    } else {
      inside.children.forEach(function (mesh) {
        mesh.material.transparent = true
        mesh.material.opacity = 1
      })
    }
  })
gui
  .add(params, 'run')
  .name('暂停/继续')
  .onChange((e) => {
    if (num == 0) {
      flyPipe = false
    } else {
      if (flyPipe == true) {
        flyPipe = false
        // flyBool = false
      } else {
        flyPipe = true
      }
    }
  })

var dropdown = { 存储节点华三R4900G3: '未选' }
//选项
var states = [
  '001',
  '002',
  '003',
  '004',
  '005',
  '006',
  '007',
  '008',
  '009',
  '010',
  '011',
  '012',
  '013',
  '014',
  '未选',
]
// 添加
var clipCtrl = gui.add(dropdown, '存储节点华三R4900G3').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签
  switch (mesh) {
    case '001':
      adddept('CunChuJieDianHuaSanR4900G3_00')
      break
    case '002':
      adddept('CunChuJieDianHuaSanR4900G3_01')
      break
    case '003':
      adddept('CunChuJieDianHuaSanR4900G3_02')
      break
    case '004':
      adddept('CunChuJieDianHuaSanR4900G3_03')

      break
    case '005':
      adddept('CunChuJieDianHuaSanR4900G3_04')

      break
    case '006':
      adddept('CunChuJieDianHuaSanR4900G3_05')

      break
    case '007':
      adddept('CunChuJieDianHuaSanR4900G3_06')

      break
    case '008':
      adddept('CunChuJieDianHuaSanR4900G3_07')

      break
    case '009':
      adddept('CunChuJieDianHuaSanR4900G3_08')

      break
    case '010':
      adddept('CunChuJieDianHuaSanR4900G3_09')

      break
    case '011':
      adddept('CunChuJieDianHuaSanR4900G3_10')

      break
    case '012':
      adddept('CunChuJieDianHuaSanR4900G3_11')

      break
    case '013':
      adddept('CunChuJieDianHuaSanR4900G3_12')

      break
    case '014':
      adddept('CunChuJieDianHuaSanR4900G3_13')

      break
  }
})

var dropdown = { 超融合华三R4900G3: '未选' }
//选项
var states = [
  '001',
  '002',
  '003',
  '004',
  '005',
  '006',
  '007',
  '008',
  '009',
  '010',
  '011',
  '012',
  '未选',
]
// 添加
var clipCtrl = gui.add(dropdown, '超融合华三R4900G3').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签

  switch (mesh) {
    case '001':
      adddept('ChaoRongHeHuaSanR4900G3_13')

      break
    case '002':
      adddept('ChaoRongHeHuaSanR4900G3_14')

    case '003':
      adddept('ChaoRongHeHuaSanR4900G3_15')

      break
    case '004':
      adddept('ChaoRongHeHuaSanR4900G3_16')

      break
    case '005':
      adddept('ChaoRongHeHuaSanR4900G3_17')

      break
    case '006':
      adddept('ChaoRongHeHuaSanR4900G3_18')

      break
    case '007':
      adddept('ChaoRongHeHuaSanR4900G3_19')

      break
    case '008':
      adddept('ChaoRongHeHuaSanR4900G3_20')

      break
    case '009':
      adddept('ChaoRongHeHuaSanR4900G3_21')

      break
    case '010':
      adddept('ChaoRongHeHuaSanR4900G3_10')

      break
    case '011':
      adddept('ChaoRongHeHuaSanR4900G3_11')

      break
    case '012':
      adddept('ChaoRongHeHuaSanR4900G3_12')

      break
  }
})

var dropdown = { 管理交换机S5560S: '未选' }
//选项
var states = [
  'S5130S-01',
  'S5130S-02',
  'S5560S-05',
  'S5130S-07',
  '出口S5130S-07',
  '出口S5130S-08',
  '未选',
]
// 添加
var clipCtrl = gui.add(dropdown, '管理交换机S5560S').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签

  switch (mesh) {
    case 'S5560S-05':
      fadddept('LS-A05-BMC-SWNJDTH3C-S5560S')

      break
    case 'S5130S-01':
      adddept('LS-C01-BMC-SWNJDTH3C-S5560S')

      break
    case 'S5130S-02':
      adddept('LS-C02-BMC-SWNJDTH3C-S5560S')

      break
    case 'S5130S-07':
      adddept('LS-C07-BMC-SWNJDTH3C-S5560S')

      break
    case '出口S5130S-07':
      adddept('LS-C07-INT-SWNJDTH3C-S5560S')

      break
    case '出口S5130S-08':
      adddept('LS-C08-INT-SWNJDTH3C-S5560S')

      break
  }
})

var dropdown = { 服务器交换机S6800: '未选' }
//选项
var states = ['S6800-00', 'S6800-01', 'VM-S6800-02', 'VM-S6800-03', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '服务器交换机S6800').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签

  switch (mesh) {
    case 'S6800-00':
      adddept('LS-C00-CRH-SWNJDTH3C-S6800')

      break
    case 'S6800-01':
      adddept('LS-C01-CRH-SWNJDTH3C-S6800')

      break
    case 'VM-S6800-02':
      adddept('LS-C02-VM-SWNJDTH3C-S6800')

      break
    case 'VM-S6800-03':
      adddept('LS-C03-VM-SWNJDTH3C-S6800')

      break
  }
})
var dropdown = { 灵山超融合同步: '未选' }
//选项
var states = ['S6520X-00', 'S6520X-01', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '灵山超融合同步').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签

  switch (mesh) {
    case 'S6520X-00':
      adddept('LS-C00-TB-SWNJDTH3C-S6520X')

      break
    case 'S6520X-01':
      adddept('LS-C01-TB-SWNJDTH3C-S6520X')

      break
  }
})
var dropdown = { FC_EMC_D6620: '未选' }
//选项
var states = ['001', '002', '未选']
// 添加
var clipCtrl = gui.add(dropdown, 'FC_EMC_D6620').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签

  switch (mesh) {
    case '001':
      adddept('FC_EMC_DS6620')

      break
    case '002':
      adddept('FC_EMC_DS6620_01')

      break
  }
})

var dropdown = { 网闸: '未选' }
//选项
var states = ['GAP1000-1', 'GAP1000-2', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '网闸').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签

  switch (mesh) {
    case 'GAP1000-1':
      adddept('LS-F06-1-WZNJDTSXF-GAP1000')

      break
    case 'GAP1000-2':
      adddept('LS-F07-2-WZNJDTSXF-GAP1000')

      break
  }
})
var dropdown = { WAF_1000: '未选' }
//选项
var states = ['WAF-1', 'WAF-2', '未选']
// 添加
var clipCtrl = gui.add(dropdown, 'WAF_1000').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签

  switch (mesh) {
    case 'WAF-1':
      adddept('LS-C07-1-WAFNJDTSXF-WAF1000')

      break
    case 'WAF-2':
      adddept('LS-C08-2-WAFNJDTSXF-WAF1000')

      break
  }
})
var dropdown = { 灵山VPN: '未选' }
//选项
var states = ['001', '002', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '灵山VPN').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签

  switch (mesh) {
    case '001':
      adddept('LS-C07-VPNNJDTSXF-VPN1000')

      break
    case '002':
      adddept('VPN-1000_01')

      break
  }
})

var dropdown = { AF_1000: '未选' }
//选项
var states = ['灵山AF-1', '灵山AF-2', '未选']
// 添加
var clipCtrl = gui.add(dropdown, 'AF_1000').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签

  switch (mesh) {
    case '灵山AF-1':
      adddept('LS-C07-1-FWNJDTSXF-AF1000')

      break
    case '灵山AF-2':
      adddept('LS-C08-2-FWNJDTSXF-AF1000')

      break
  }
})

var dropdown = { 负载均衡: '未选' }
//选项
var states = ['AD1000-1', 'AD1000-2', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '负载均衡').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签

  switch (mesh) {
    case 'AD1000-1':
      adddept('LS-C05-1-LBNJDTSXF-AD1000')

      break
    case 'AD1000-2':
      adddept('LS-C06-2-LBNJDTSXF-AD1000')

      break
  }
})

var dropdown = { 核心交换机: '未选' }
//选项
var states = ['12508G_AF-05', '12508G_AF-06', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '核心交换机').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签

  switch (mesh) {
    case '12508G_AF-05':
      adddept('LS-C05-SWNJDTH3C-S12508G-AF')

      break
    case '12508G_AF-06':
      adddept('LS-C06-SWNJDTH3C-S12508G-AF')

      break
  }
})

var dropdown = { 灵山超融合业务: '未选' }
//选项
var states = ['S6861-01', 'S6861-02', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '灵山超融合业务').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()

  switch (mesh) {
    case 'S6861-01':
      adddept('LS-A03-1-YW-SWNJDTH3C-S6861')

      break
    case 'S6861-02':
      adddept('LS-A03-2-YW-SWNJDTH3C-S6861')

      break
  }
})

function adddept(dept_name) {
  console.log('dept_name: ', dept_name)

  if (findmesh != null) {
    console.log('findmesh: ', findmesh)
    deleline(findmesh)
    findmesh = scene.getObjectByName(dept_name)
    showlabel(findmesh)
    addline(findmesh)
  } else {
    console.log('findmesh:------- ', findmesh)
    findmesh = scene.getObjectByName(dept_name)
    showlabel(findmesh)
    addline(findmesh)
  }
}

// function addline() {
//   var edges = new THREE.EdgesGeometry(findmesh.geometry)
//   var geometry = new LineGeometry()
//   geometry.fromEdgesGeometry(edges)
//   // 3. 创建 LineMaterial，设置颜色和线宽
//   var material = new LineMaterial({
//     color: 0x31deef,
//     linewidth: 4,
//   })
//   // 4. 设置材质分辨率
//   material.resolution.set(window.innerWidth, window.innerHeight)
//   // 5. 创建 Line2
//   var line = new LineSegments2(geometry, material)
//   // line.scale.set(810,810,810)
//   line.name = 'line'
//   line.position.copy(findmesh.getWorldPosition())
//   scene.add(line)
// }
// function deleline() {
//   var line = scene.getObjectByName('line')
//   // console.log('line: ', line);
//   scene.remove(line)
// }
// 使外部透明化，以便于观看
function opacity() {
  var inside = scene.getObjectByName('9F_JG')
  inside.children.forEach(function (mesh) {
    mesh.material.transparent = true
    mesh.material.opacity = 0.1
  })
}

// function createcurve(arr, num) {
//   var curve = new THREE.CurvePath()
//   // 从曲线上获得501个顶点，数量根据需要自己设置
//   // var points = curve.getPoints(6000);
//   for (var i = 0; i < arr.length - 1; i++) {
//     if (i == 0) {
//       var dir = arr[0].clone().sub(arr[1])
//       dir.normalize()
//       var p2 = arr[1].clone()
//       p2.add(dir.clone().multiplyScalar(R))
//       var line = new THREE.LineCurve3(arr[0], p2)
//       curve.curves.push(line)
//     } else {
//       // 计算三个点构成的两条线的方向
//       var dir1 = arr[i - 1].clone().sub(arr[i])
//       dir1.normalize()
//       var dir2 = arr[i + 1].clone().sub(arr[i])
//       dir2.normalize()
//       var p12_ = arr[i].clone()
//       p12_.add(dir1.clone().multiplyScalar(R))
//       var p1 = arr[i].clone().add(dir1.clone().multiplyScalar(R))
//       var p2 = arr[i].clone()
//       var p3 = arr[i].clone().add(dir2.clone().multiplyScalar(R))
//       var beziercurve = new THREE.QuadraticBezierCurve3(p1, p2, p3)
//       var line1 = arr[i].clone()
//       line1.add(dir2.clone().multiplyScalar(R))
//       var line2 = arr[i + 1].clone()
//       if (i < arr.length - 2) {
//         //最后一段不用减掉半径尺寸
//         line2.add(dir2.clone().multiplyScalar(-R))
//       }
//       var line = new THREE.LineCurve3(line1, line2)
//       // 把转换曲线和直线插入曲线中
//       curve.curves.push(beziercurve, line)
//     }
//   }
//   points = curve.getSpacedPoints(3000)
// }
// var curve = new THREE.CurvePath()
// // 从曲线上获得501个顶点，数量根据需要自己设置
// // var points = curve.getPoints(6000);
// for (var i = 0; i < arr.length - 1; i++) {
//   if (i == 0) {
//     var dir = arr[0].clone().sub(arr[1])
//     dir.normalize()
//     var p2 = arr[1].clone()
//     p2.add(dir.clone().multiplyScalar(R))
//     var line = new THREE.LineCurve3(arr[0], p2)
//     curve.curves.push(line)
//   } else {
//     // 计算三个点构成的两条线的方向
//     var dir1 = arr[i - 1].clone().sub(arr[i])
//     dir1.normalize()
//     var dir2 = arr[i + 1].clone().sub(arr[i])
//     dir2.normalize()
//     var p12_ = arr[i].clone()
//     p12_.add(dir1.clone().multiplyScalar(R))
//     var p1 = arr[i].clone().add(dir1.clone().multiplyScalar(R))
//     var p2 = arr[i].clone()
//     var p3 = arr[i].clone().add(dir2.clone().multiplyScalar(R))
//     var beziercurve = new THREE.QuadraticBezierCurve3(p1, p2, p3)
//     var line1 = arr[i].clone()
//     line1.add(dir2.clone().multiplyScalar(R))
//     var line2 = arr[i + 1].clone()
//     if (i < arr.length - 2) {
//       //最后一段不用减掉半径尺寸
//       line2.add(dir2.clone().multiplyScalar(-R))
//     }
//     var line = new THREE.LineCurve3(line1, line2)
//     // 把转换曲线和直线插入曲线中
//     curve.curves.push(beziercurve, line)
//   }
// }
// points = curve.getSpacedPoints(3000)

// var curve = new THREE.CurvePath(arr)
// var points = curve.getPoints(1000);
// var geometry = new THREE.BufferGeometry() //声明一个几何体对象Geometry
// geometry.setFromPoints(points)
// // 材质对象
// var material = new THREE.LineBasicMaterial({
//   color: 0xffff00,
//   opacity: 0.5,
// })
// //线条模型对象
// var line = new THREE.Line(geometry, material)
// scene.add(line)

// function moveup(mesh, num) {
//   var pos = mesh.position
//   var tween = new TWEEN.Tween(pos)
//   tween.to(
//     {
//       x: pos.x + num,
//     },
//     3000
//   )
//   tween.onUpdate(function () {
//     mesh.position.x = pos.x
//   })
//   tween.start()
// }
function render() {
  TWEEN.update()
  renderer.render(scene, camera) //执行渲染操作
  labelRenderer.render(scene, camera) //CSS3D渲染

  requestAnimationFrame(render) //请求再次执行渲染函数render，渲染下一帧
  if (flyPipe) {
    if (num < points.length - 10) {
      var i = Math.floor(num)
      // 相机位置设置在当前点位置
      camera.position.set(points[i].x, points[i].y, points[i].z)

      // 设置相机观察点为当前点的下一个点，两点可以构成一个视线方向
      // 你可以简单理解为：要始终保持视线为曲线的切线方向
      camera.lookAt(
        new THREE.Vector3(points[i + 1].x, points[i].y + slope, points[i + 1].z)
      )

      num += 4 //调节速度
    } else {
      flyPipe = false
      num = 0
    }
  }
}
render()