import * as THREE from '../../build/three.module.js'
import { GUI } from '../jsm/libs/dat.gui.module.js'
import { GLTFLoader } from '../jsm/loaders/GLTFLoader.js'
import { CSS2DObject } from '../jsm/renderers/CSS2DRenderer.js'

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
  addTemHUM,
  changeURL,
  changenameURL,
  exchageURL,
  MoveOpacityMesh,
  addArry,
  createcurve,
  moveup,
  showlabel,
  deleline,
  addline,
  showDeptName,
  points,
} from './fun-ajax.js'
import { arr, JiGui03, JiGui04 } from './fun-ajax.js'
var URl = 'http://192.168.108.130:9090/njdt_yw_server/3d-view/get-wsd?type=1'
addTemHUM(URl)

const params = {
  HuaWei: false,
  enableFoor2: true,
  enableDevie: true,
}

var granaryArr = [],
  JIGUI = [],
  PrimaryMesh = []

var label, URlSE, dept, IGarr, choosedept, flyPipe, deptNameUrl, acceptName
// $(function () {
//   getData1()
// })
// function getData1() {
//   acceptName = $.query.get('name')
// }

var url = decodeURI(window.location.href)
var argsIndex = url.split('?name=')
console.log('argsIndex: ', argsIndex[1])
acceptName = argsIndex[1]
var loader = new GLTFLoader()
loader.load(
  '../models/NanJingMetroBuilding/NanJingMetroBuilding_5F.gltf',
  function (object) {
    object.scene.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    object.scene.position.y = +160
    scene.add(object.scene)
    console.log('object.scene: ', object.scene)
    addlabel()

    onloadfun()

    addArry('5F_DTE', PrimaryMesh)
    addArry('5F_Opacity_JG', JIGUI)
    addArry('5F_Opacity_JG', PrimaryMesh)
    addArry('5F_Opacity_JG', granaryArr)
    addArry('5F_Click', granaryArr)

    scene.getObjectByName('5F_DTE').traverse(function (mesh) {
      if (mesh.isMesh) {
        console.log(mesh.name)
      }
    })
  }
)

var tag = document.getElementById('label')

label = new CSS2DObject(tag)

tag.style.pointerEvents = 'none' //避免HTML标签遮挡三维场景的鼠标事件
scene.add(label)

var chooseMesh
var timeout = null //引入定时器

function choose(event) {
  clearTimeout(timeout) //单击事件，清理定时器
  //设置定时器
  timeout = setTimeout(function () {
    if (chooseMesh) {
      deleline(chooseMesh)
      label.element.style.visibility = 'hidden'
      AClabel.element.style.visibility = 'hidden' //隐藏标签
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

    //   intersects.length大于0说明，说明选中了模型
    if (intersects.length > 0) {
      chooseMesh = intersects[0].object
      console.log('chooseMesh:单击事件 ', chooseMesh)
      var AClabelname = document.getElementById('AClabelname')
      if (chooseMesh.material.opacity < 1) {
        chooseMesh.material.transparent = true
        chooseMesh.material.opacity = 1
      } else if (chooseMesh.parent.name == '5F_Opacity_JG') {
        chooseMesh.material.transparent = true
        chooseMesh.material.opacity = 0.1
      } else if (chooseMesh.name == '5F_UPS01') {
        AClabelname.innerHTML = '1#UPS'
        changeURL('11')
        showktlabel(chooseMesh)
      } else if (chooseMesh.name == '5F_UPS02') {
        AClabelname.innerHTML = '2#UPS'
        changeURL('12')
        showktlabel(chooseMesh)
      } else if (chooseMesh.name == '5F_Air-Conditioning01') {
        AClabelname.innerHTML = '艾默生空调'
        changeURL('31')
        showktlabel(chooseMesh)
      } else if (chooseMesh.name == '5F_Air-Conditioning') {
        AClabelname.innerHTML = '佳力图空调'
        changeURL('61')
        showktlabel(chooseMesh)
      } else {
        // if (chooseMesh.name == '5F_Air-Conditioning01') {
        showlabel(chooseMesh, 0.2, 0, 60, 20)
        addline(chooseMesh)
        exchageURL(chooseMesh.name)

        // } else if (chooseMesh.name == '5F_Air-Conditioning') {
        //   showlabel(chooseMesh,0.2)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // }
        // } else if (chooseMesh.name == 'ZaiNanFuWuQi_00') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'ZaiNanFuWuQi_01') {
        //   addline(chooseMesh)
        //   showlabel(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'ZaiNanFuWuQi_02') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'ZaiNanFuWuQi_03') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'ZaiNanFuWuQi_04') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'ZaiNanFuWuQi_05') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'ZaiNanFuWuQi_06') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'DTDS-C02-SWNJDTH3C-S12508X-AF') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'DTDS-C02-1-AC-NJDT-H3CWX3540H') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'EMC_DD6300') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'DTDS-INT-SWNJDTH3C-S5130S') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'DTDS-C02-1-BMC-SWNJDTH3C-S5130S') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'DTDS-C03-2-FWNJDTSXF-AF1000') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'DTDS-C03-2-ACNJDTSXF-AC1000') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'DTDS-C02-1-ACNJDTSXF-AC1000') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'DTDS-C02-1-FWNJDTSXF-AF1000') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'DTDS-C03-2-AC-NJDT-H3CWX3540H') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'DTDS-C03-SWNJDTH3C-S12508X-AF') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'DTDS-C03-2-BMC-SWNJDTH3C-S5130S') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'LS-A03-1-YW-SWNJDTH3C-S6861') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // } else if (chooseMesh.name == 'LS-A03-2-YW-SWNJDTH3C-S6861') {
        //   showlabel(chooseMesh)
        //   addline(chooseMesh)
        //   exchageURL(chooseMesh.name)
        // }
      }
    }
  }, 200)
}

function showktlabel(chooseMesh) {
  AClabel.element.style.visibility = 'visible' //显示标签
  AClabel.position.copy(chooseMesh.getWorldPosition())
  AClabel.position.z = chooseMesh.getWorldPosition().z - 130
  // AClabel.scale.set(5, 5, 5)
  AClabel.position.y = 50
}
var DoublechooseMesh = null
//双击事件
function ChangeView() {
  clearTimeout(timeout)
  if (DoublechooseMesh) {
    moveup(DoublechooseMesh, 80)
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
    movecamera(DoublechooseMesh.name)
    moveup(DoublechooseMesh, -80)
    // if (
    //   -100 < camera.position.x < 100 &&
    //   -200 < camera.position.z < 500 &&
    //   camera.position.y < 200
    // ) {
    //   switch (DoublechooseMesh.name) {
    //     case 'JiGui02':
    //       camera.position.set(30, 120, 10)
    //       controls.target.set(-200, 110, 3)
    //       controls.update()
    //       moveup(DoublechooseMesh, -80)
    //       break
    //     case 'JiGui03':
    //       camera.position.set(30, 120, -50)
    //       controls.target.set(-200, 110, -50)
    //       controls.update()
    //       moveup(DoublechooseMesh, -80)
    //       break
    //     case 'JiGui04':
    //       camera.position.set(30, 120, -100)
    //       controls.target.set(-200, 110, -100)
    //       controls.update()
    //       moveup(DoublechooseMesh, -80)
    //       break
    //   }
    // } else {
    //   // console.log('DoublechooseMesh.name: ', DoublechooseMesh.name);
    //   switch (DoublechooseMesh.name) {
    //     case 'JiGui02':
    //       createcurve(arr, 20)
    //       flyPipe = true
    //       controls.target.set(-200, 140, 3)
    //       controls.update()
    //       moveup(DoublechooseMesh, -80)
    //       break
    //     case 'JiGui03':
    //       createcurve(JiGui03, 20)
    //       flyPipe = true
    //       controls.target.set(-200, 120, -50)
    //       controls.update()
    //       moveup(DoublechooseMesh, -80)
    //       break
    //     case 'JiGui04':
    //       createcurve(JiGui04, 20)
    //       flyPipe = true
    //       controls.target.set(-200, 120, -100)
    //       controls.update()
    //       moveup(DoublechooseMesh, -80)
    //       break
    //   }
    // }
  }
}

addEventListener('click', choose) // 监听窗口鼠标

addEventListener('dblclick', ChangeView)

addEventListener('pointermove', changecolor)

var changecolorMesh
function changecolor() {
  if (changecolorMesh) {
    changecolorMesh.material.emissive.set(0x000000)
    CSSNameLAbel.element.style.visibility = 'hidden'
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
    if (changecolorMesh.parent.parent.name == '5F_DTE') {
      changecolorMesh.material.emissive.set(0x33ffff)
      changenameURL(changecolorMesh.name)
      showDeptName(changecolorMesh)
    } else if (changecolorMesh.parent.name == '5F_Opacity_JG') {
      changecolorMesh.material.emissive.set(0x33ffff)
    } else {
      changecolorMesh.material.emissive.set(0x000000)
    }
  }
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

  p2 = {
    x: FloorPosition.x + 130,
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
  if (url.search('name') > 0) {
    const Mesh = scene.getObjectByName(acceptName)
    // console.log('Mesh: ', Mesh)

    var Meshposition = Mesh.getWorldPosition()

    if (acceptName != undefined) {
      var JiGuiName = Mesh.parent.name.slice(-2)

      alert('您已进入地铁大厦机房' + JiGuiName + '机柜')

      // console.log('alert: ', alert);
    }
    camera.position.set(Meshposition.x + 160, Meshposition.y, Meshposition.z)
    // camera.lookAt(Meshposition)
    controls.target.copy(Meshposition)
    controls.update()
    addline(Mesh)
    if (Mesh.parent.name == 'JiGui_02') {
      MoveOpacityMesh('JiGui02', -80)
    } else if (Mesh.parent.name == 'JiGui_03') {
      MoveOpacityMesh('JiGui03', -80)
    } else if (Mesh.parent.name == 'JiGui_04') {
      MoveOpacityMesh('JiGui04', -80)
    }
  }
}

// Pace.on('done', function () {
//   if (acceptName) {
//     const Mesh = scene.getObjectByName(acceptName)
//     var JiGuiName = Mesh.parent.name.slice(-2)

//     alert('您已进入地铁大厦机房' + JiGuiName + '机柜')
//   }
// })

var findmesh = null
//界面
const gui = new GUI()
var name = {
  lingshan: function () {
    window.location.href = './webgl_loader_gltf_njMetro.html'
  },
  Map: function () {
    window.location.href = './Map.html'
  },
  EMC_DD6300: function () {
    // 同步透明
    // opacity()
    //展示标签
    // showlabel()
    if (findmesh != null) {
      deleline1()
      findmesh = scene.getObjectByName('EMC_DD6300')
      addline1(findmesh)
      exchageURL(findmesh.name)
    } else {
      findmesh = scene.getObjectByName('EMC_DD6300')
      addline1(findmesh)
      exchageURL(findmesh.name)
    }
  },
  关闭设备详情: function () {
    label.element.style.visibility = 'hidden'
  },
  鸟瞰图: function () {
    camera.position.set(400, 1200, 0)
    camera.lookAt(0, 0, 0)
  },
}
gui.add(name, 'Map').name('首页')
gui.add(name, 'lingshan').name('返回')
gui.add(name, '关闭设备详情')
gui.add(name, 'EMC_DD6300')
gui.add(name, '鸟瞰图').name('退出')

gui
  .add(params, 'HuaWei')
  .name('内部')
  .onChange((e) => {
    var inside = scene.getObjectByName('5F_Opacity_JG')

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

var dropdown = { 管理交换机S5130: '未选' }
//选项
var states = ['001', '002', '003', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '管理交换机S5130').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签
  showlabel()

  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline1()
        findmesh = scene.getObjectByName('DTDS-INT-SWNJDTH3C-S5130S')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('DTDS-INT-SWNJDTH3C-S5130S')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline1()
        findmesh = scene.getObjectByName('DTDS-C02-1-BMC-SWNJDTH3C-S5130S')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('DTDS-C02-1-BMC-SWNJDTH3C-S5130S')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
      break
    case '003':
      if (findmesh != null) {
        deleline1()
        findmesh = scene.getObjectByName('DTDS-C03-2-BMC-SWNJDTH3C-S5130S')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('DTDS-C03-2-BMC-SWNJDTH3C-S5130S')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
      break
  }
})

var dropdown = { 无线控制器: '未选' }
//选项
var states = ['001', '002', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '无线控制器').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline1()
        findmesh = scene.getObjectByName('DTDS-C02-1-AC-NJDT-H3CWX3540H')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('DTDS-C02-1-AC-NJDT-H3CWX3540H')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline1()
        findmesh = scene.getObjectByName('DTDS-C03-2-AC-NJDT-H3CWX3540H')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('DTDS-C03-2-AC-NJDT-H3CWX3540H')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
      break
  }
})

var dropdown = { 防火墙: '未选' }
//选项
var states = ['001', '002', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '防火墙').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline1()
        findmesh = scene.getObjectByName('DTDS-C02-1-FWNJDTSXF-AF1000')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('DTDS-C02-1-FWNJDTSXF-AF1000')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline1(findmesh)
        findmesh = scene.getObjectByName('DTDS-C03-2-FWNJDTSXF-AF1000')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('DTDS-C03-2-FWNJDTSXF-AF1000')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
      break
  }
})

var dropdown = { 上网行为: '未选' }
//选项
var states = ['001', '002', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '上网行为').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline1()
        findmesh = scene.getObjectByName('DTDS-C02-1-ACNJDTSXF-AC1000')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('DTDS-C02-1-ACNJDTSXF-AC1000')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline1(findmesh)
        findmesh = scene.getObjectByName('DTDS-C03-2-ACNJDTSXF-AC1000')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('DTDS-C03-2-ACNJDTSXF-AC1000')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
      break
  }
})

var dropdown = { 灾备服务器: '未选' }
//选项
var states = ['001', '002', '003', '004', '005', '006', '007', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '灾备服务器').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  // 同步透明
  opacity()
  //展示标签
  showlabel()

  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline1(findmesh)
        findmesh = scene.getObjectByName('ZaiNanFuWuQi_00')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('ZaiNanFuWuQi_00')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline1(findmesh)
        findmesh = scene.getObjectByName('ZaiNanFuWuQi_01')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('ZaiNanFuWuQi_01')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
      break
    case '003':
      if (findmesh != null) {
        deleline1(findmesh)
        findmesh = scene.getObjectByName('ZaiNanFuWuQi_02')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('ZaiNanFuWuQi_02')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
      break
    case '004':
      if (findmesh != null) {
        deleline1(findmesh)
        findmesh = scene.getObjectByName('ZaiNanFuWuQi_03')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('ZaiNanFuWuQi_03')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
      break
    case '005':
      if (findmesh != null) {
        deleline1(findmesh)
        findmesh = scene.getObjectByName('ZaiNanFuWuQi_04')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('ZaiNanFuWuQi_04')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
      break
    case '006':
      if (findmesh != null) {
        deleline1(findmesh)
        findmesh = scene.getObjectByName('ZaiNanFuWuQi_05')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('ZaiNanFuWuQi_05')
        addline1(findmesh)
        exchageURL(findmesh.name)
        exchageURL(findmesh.name)
      }
      break
    case '007':
      if (findmesh != null) {
        deleline1(findmesh)
        findmesh = scene.getObjectByName('ZaiNanFuWuQi_06')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('ZaiNanFuWuQi_06')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
      break
  }
})

var dropdown = { 核心交换机12508G_AF: '未选' }
//选项
var states = ['001', '002', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '核心交换机12508G_AF').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  opacity()
  //展示标签
  showlabel()

  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline1(findmesh)
        findmesh = scene.getObjectByName('DTDS-C02-SWNJDTH3C-S12508X-AF')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('DTDS-C02-SWNJDTH3C-S12508X-AF')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline1(findmesh)
        findmesh = scene.getObjectByName('DTDS-C03-SWNJDTH3C-S12508X-AF')
        addline1(findmesh)
        exchageURL(findmesh.name)
      } else {
        findmesh = scene.getObjectByName('DTDS-C03-SWNJDTH3C-S12508X-AF')
        addline1(findmesh)
        exchageURL(findmesh.name)
      }
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
  //展示标签
  showlabel()
  switch (mesh) {
    case 'S6861-01':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('LS-A03-1-YW-SWNJDTH3C-S6861')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('LS-A03-1-YW-SWNJDTH3C-S6861')
        addline(findmesh)
      }
      break
    case 'S6861-02':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('LS-A03-2-YW-SWNJDTH3C-S6861')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('LS-A03-2-YW-SWNJDTH3C-S6861')
        addline(findmesh)
      }
      break
  }
})

// 使外部透明化，以便于观看
function opacity() {
  var inside = scene.getObjectByName('5F_Opacity_JG')
  inside.children.forEach(function (mesh) {
    mesh.material.transparent = true
    mesh.material.opacity = 0.1
  })
}

function colselabel() {
  var label = document.getElementById('label')

  label.element.style.visibility = 'hidden'
}
//线条生成动画
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

// var curve = new THREE.CurvePath(arr)
// var points = curve.getPoints(1000);
var geometry = new THREE.BufferGeometry() //声明一个几何体对象Geometry
geometry.setFromPoints(points)
// 材质对象
var material = new THREE.LineBasicMaterial({
  color: 0xffff00,
  opacity: 0.5,
})
//线条模型对象
var line = new THREE.Line(geometry, material)
scene.add(line)

var num = 0
//实时渲染
function render() {
  // console.log(camera.position);
  TWEEN.update()
  renderer.render(scene, camera) //执行渲染操作
  labelRenderer.render(scene, camera) //CSS3D渲染

  // composer1.render()
  requestAnimationFrame(render) //请求再次执行渲染函数render，渲染下一帧
  if (flyPipe) {
    if (num < points.length - 100) {
      var i = Math.floor(num)
      // 相机位置设置在当前点位置
      camera.position.set(points[i].x, points[i].y, points[i].z)

      // 设置相机观察点为当前点的下一个点，两点可以构成一个视线方向
      // 你可以简单理解为：要始终保持视线为曲线的切线方向
      camera.lookAt(
        new THREE.Vector3(points[i + 1].x, points[i].y - 0.05, points[i + 1].z)
      )

      num += 4 //调节速度
    } else {
      flyPipe = false
      num = 0
    }
  }
}
render()
