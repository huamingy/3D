import * as THREE from '../../build/three.module.js'
import { LineMaterial } from '../jsm/lines/LineMaterial.js'
import { LineGeometry } from '../jsm/lines/LineGeometry.js'
import { GUI } from '../jsm/libs/dat.gui.module.js'
import { GLTFLoader } from '../jsm/loaders/GLTFLoader.js'
import { CSS2DObject } from '../jsm/renderers/CSS2DRenderer.js'
import { LineSegments2 } from '../jsm/lines/LineSegments2.js'

import { scene, camera, renderer } from './light.js'
import { controls } from './render.js'
import { addlabel, AClabel, labelRenderer, Alabel } from './tempeture.js'
import {
  addTemHUM,
  changeURL,
  changenameURL,
  exchageURL,
  addArry,
  createcurve,
  showlabel,
  deleline,
  addline,
  showDeptName,
  points,
} from './fun-ajax.js'
import {
  F2_JG00,
  F2_JG01,
  F2_JG02,
  F2_JG03,
  F2_JG04,
  F2_JG05,
  F2_JG06,
  F2_JG07,
  F2_JG08,
  F2_JG09,
  F2_JG10,
  F2_JG11,
  F2_JG12,
  F2_JG13,
  F2_JG14,
  F2_JGarr,
} from './fun-ajax.js'
const params = {
  twoFEquipment: false,
  enableFoor2: true,
  enableDevie: true,
}

var URl = 'http://192.168.108.130:9090/njdt_yw_server/3d-view/get-wsd?type=3'
addTemHUM(URl)
// 单击模型数组   //预选模型数组//可双击的数组
var granaryArr = [],
  JIGUI = [],
  DoubleArr = [],
  dept,
  flyPipe

var label = null,
  slope,
  acceptName
var JiGuiarray = [
  '2F_JG09',
  '2F_JG08',
  '2F_JG07',
  '2F_JG01',
  '2F_JG02',
  '2F_JG03',
]
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
console.log('acceptName: ', acceptName)

var loader = new GLTFLoader()
loader.load(
  '../models/NanJingNanBuilding/NanJingNanBuilding_2F.gltf',
  function (obj) {
    obj.scene.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    obj.scene.position.x = +60
    obj.scene.position.z = +85
    obj.scene.position.y = 110
    scene.add(obj.scene)
    console.log('object.scene: ', obj.scene)
    addlabel()
    onloadfun()
    // 所有独立的设备
    addArry('2F_DTE', JIGUI)

    // 可以透明的机柜

    addArry('2F_Opacity_JG', DoubleArr)
    addArry('2F_Opacity_JG', JIGUI)
    addArry('2F_Opacity_JG', granaryArr)
    // 可以单击的设备以及机柜
    addArry('2F_Click', granaryArr)
    scene.getObjectByName('2F_DTE').traverse(function (mesh) {
      if (mesh.isMesh) {
        console.log(mesh.name)
      }
    })
  }
)
//

/**根据接收参数定位设备 */
function onloadfun() {
  /**控制机柜移动方向 */
  var JiGuiNum = null
  if (url.search('name') > 0) {
    const Mesh = scene.getObjectByName(acceptName)

    var JiGuiName = Mesh.parent.name.slice(0, 5) + Mesh.parent.name.slice(-2)

    var JiGuiarray = [
      '2F_JG09',
      '2F_JG08',
      '2F_JG07',
      '2F_JG01',
      '2F_JG02',
      '2F_JG03',
    ]
    DoublechooseMesh = scene.getObjectByName(JiGuiName)

    if (acceptName != undefined) {
      alert('您已进入南京南机房' + Mesh.parent.name.slice(-2) + '机柜')
    }

    if (JiGuiarray.indexOf(JiGuiName) >= 0) {
      console.log()
      addline(Mesh)
      setTimeout(function () {
        MoveOpacityMesh(JiGuiName, -80)
      }, 2000)
      JiGuiNum = 150
    } else {
      JiGuiNum = -150
      addline(Mesh)
      setTimeout(function () {
        MoveOpacityMesh(JiGuiName, 80)
      }, 2000)
    }

    //  if(Mesh.parent.name == "2F_JG_00"){
    // }else if(Mesh.parent.name == "2F_JG_00"){
    //   JiGuiNum =
    //     MoveOpacityMesh("2F_JG00")
    //   }

    var Meshposition = Mesh.getWorldPosition()

    camera.position.set(
      Meshposition.x,
      Meshposition.y,
      Meshposition.z + JiGuiNum
    )
    // camera.lookAt(Meshposition)
    controls.target.copy(Meshposition)
    controls.update()
    addline(Mesh)
  }
}

// Pace.on('done', function () {
//   if (acceptName != null) {
//     const Mesh = scene.getObjectByName(acceptName)
//     console.log(Mesh)
//     // var JiGuiName = Mesh.parent.name.slice(0, 5) + Mesh.parent.name.slice(-2)
//     alert('您已进入南京南机房' + Mesh.parent.name.slice(-2) + '机柜')
//   }
// })

/**定位设备，机柜移动 */
function MoveOpacityMesh(JGname, num) {
  const JGMesh = scene.getObjectByName(JGname)
  JGMesh.material.opacity = 0.1
  JGMesh.material.transparent = true
  moveup(JGMesh, num)
}

var tag = document.getElementById('label')
label = new CSS2DObject(tag)
tag.style.pointerEvents = 'none' //避免HTML标签遮挡三维场景的鼠标事件
scene.add(label)

var chooseMesh, timeout, DoublechooseMesh
// 单击事件
function choose(event) {
  clearTimeout(timeout) //单击事件，清理定时器
  //设置定时器
  timeout = setTimeout(function () {
    if (chooseMesh) {
      AClabel.element.style.visibility = 'hidden' //显示标签
      Alabel.element.style.visibility = 'hidden'
      deleline()
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

      var AClabelname = document.getElementById('AClabelname')

      if (chooseMesh.material.opacity < 1) {
        chooseMesh.material.transparent = true
        chooseMesh.material.opacity = 1
      } else if (chooseMesh.parent.name == '2F_Opacity_JG') {
        chooseMesh.material.transparent = true
        chooseMesh.material.opacity = 0.1
      } else if (chooseMesh.name == 'Emerson01') {
        AClabelname.innerText = '1#佳力图空调'
        changeURL('62')
        showktlabel(chooseMesh)
      } else if (chooseMesh.name == 'Emerson02') {
        AClabelname.innerText = '2#佳力图空调'
        changeURL('63')
        showktlabel(chooseMesh)
      } else if (chooseMesh.name == 'Emerson03') {
        AClabelname.innerText = '3#佳力图空调'
        changeURL('71')
        showktlabel(chooseMesh)
      } else if (chooseMesh.name == 'Emerson04') {
        AClabelname.innerText = '4#世图兹空调'
        changeURL('72')
        showktlabel(chooseMesh)
      } else if (chooseMesh.name == 'Emerson05') {
        AClabelname.innerText = '5#世图兹空调'
        changeURL('101')
        showktlabel(chooseMesh)
      } else if (chooseMesh.name == '2F_UPS01') {
        AClabelname.innerText = 'usp1'
        changeURL('111')
        showktlabel(chooseMesh)
      } else if (chooseMesh.name == '2F_Coulometer02') {
        AClabelname.innerText = '2#电量仪'
        changeURL('51')
        showktlabel(chooseMesh)
      } else if (chooseMesh.name == '2F_Coulometer01') {
        AClabelname.innerText = '1#电量仪'
        changeURL('52')
        showktlabel(chooseMesh)
      } else if (chooseMesh.parent.parent.name == '2F_DTE') {
        addline(chooseMesh)
        exchageURL(chooseMesh.name)
        showlabel(chooseMesh, 0.13, -60, 0, 0)
      }

      // if (chooseMesh.name == 'NZ-C01-BMC-1-SWNJDTH3C-S5560S')
      // } else if (chooseMesh.name == 'NZ-D02-BMC-2-SWNJDTH3C-S5560S') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-D03-CRH-SWNJDTH3C-S6800') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-D04-CRH-SWNJDTH3C-S6800') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-D03-VM-SWNJDTH3C-S6800') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-D04-VM-SWNJDTH3C-S6800') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-D03-TB-SWNJDTH3C-S6520X') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-D04-TB-SWNJDTH3C-S6520X') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'FC_EMC_DS6620') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'FC_EMC_DS6620_01') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'HuiYiFuWuQi') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'HuiYiFuWuQi002') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'HuiYiFuWuQi003') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-D03-1-WZ-NJDTSXF-GAP1000') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-D04-2-WZ-NJDTSXF-GAP1000') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'AC-1000') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'AC-1000_01') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-C02-1-VPNNJDTSXF-VPN1000') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-C03-2-VPNNJDTSXF-VPN1000') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-C02-1-FWNJDTSXF-AF1000') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-C03-2-FWNJDTSXF-AF1000') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-C02-1-FWNJDTSXF-AF2000') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-C03-2-FWNJDTSXF-AF2000') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-C02-1-WAFNJDTAH-V3') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-C03-2-WAFNJDTAH-V3') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-C02-1-LBNJDTSXF-AD1000') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-C03-2-LBNJDTSXF-AD1000') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'FuWuQiFuZaiJunHeng') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'FuWuQiFuZaiJunHeng001') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-C02-SWNJDTH3C-S12508G-AF') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // } else if (chooseMesh.name == 'NZ-C03-SWNJDTH3C-S12508G-AF') {
      //   addline(chooseMesh)
      //   changeURL(chooseMesh.name)
      //   showlabel(chooseMesh)
      // }
    }
  }, 200)
}

addEventListener('click', choose) // 监听窗口鼠标单击事件,鼠标单击选中某个国家Mesh

//双击事件
function ChangeView() {
  clearTimeout(timeout) //单击事件，清理定时器
  console.log('DoublechooseMesh: ', DoublechooseMesh)
  if (DoublechooseMesh !== undefined) {
    if (JiGuiarray.indexOf(DoublechooseMesh.name) >= 0) {
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
  var intersects = raycaster.intersectObjects(DoubleArr)

  //   intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
    DoublechooseMesh = intersects[0].object

    if (JiGuiarray.indexOf(DoublechooseMesh.name) >= 0) {
      moveup(DoublechooseMesh, -80)
      movecamera(DoublechooseMesh, 160)
    } else {
      moveup(DoublechooseMesh, 80)
      movecamera(DoublechooseMesh, -160)
    }

    // if (DoublechooseMesh.name == '2F_JG00') {
    //   slope = -0.02
    //   createcurve(F2_JG00, 10)
    //   flyPipe = true
    //   controls.target.set(-90, 110, 400)
    //   controls.update()
    //   moveup(DoublechooseMesh, 100)
    // } else if (DoublechooseMesh.name == '2F_JG01') {
    //   slope = -0.02
    //   createcurve(F2_JG01, 10)
    //   flyPipe = true
    //   controls.target.set(180, 80, -200)
    //   controls.update()
    //   moveup(DoublechooseMesh, -42)
    // } else if (DoublechooseMesh.name == '2F_JG02') {
    //   slope = -0.02
    //   createcurve(F2_JG02, 10)
    //   flyPipe = true
    //   controls.target.set(130, 80, -200)
    //   controls.update()
    //   moveup(DoublechooseMesh, -42)
    // } else if (DoublechooseMesh.name == '2F_JG03') {
    //   slope = -0.02
    //   createcurve(F2_JG03, 10)
    //   flyPipe = true
    //   controls.target.set(66.5, 110 - 0.02, -39)
    //   controls.update()
    //   moveup(DoublechooseMesh, -42)
    // } else if (DoublechooseMesh.name == '2F_JG04') {
    //   slope = -0.02
    //   createcurve(F2_JG04, 10)
    //   flyPipe = true
    //   controls.target.set(171.4, 110 - 0.02, -119)
    //   controls.update()
    //   moveup(DoublechooseMesh, 100)
    // } else if (DoublechooseMesh.name == '2F_JG05') {
    //   slope = 0.01
    //   createcurve(F2_JG05, 10)
    //   flyPipe = true
    //   controls.target.set(-34, 110.01, -119)
    //   controls.update()
    //   moveup(DoublechooseMesh, 100)
    // } else if (DoublechooseMesh.name == '2F_JG06') {
    //   flyPipe = true
    //   slope = +0.01
    //   createcurve(F2_JG06, 10)
    //   flyPipe = true
    //   controls.target.set(-93, 110.01, -119)
    //   controls.update()
    //   moveup(DoublechooseMesh, 100)
    // } else if (DoublechooseMesh.name == '2F_JG07') {
    //   slope = -0.01
    //   createcurve(F2_JG07, 10)
    //   flyPipe = true
    //   controls.target.set(10, 110, 150)
    //   controls.update()
    //   moveup(DoublechooseMesh, -42)
    // } else if (DoublechooseMesh.name == '2F_JG08') {
    //   slope = -0.01
    //   createcurve(F2_JG08, 10)
    //   flyPipe = true
    //   controls.target.set(-40, 80, 150)
    //   controls.update()
    //   moveup(DoublechooseMesh, -42)
    // } else if (DoublechooseMesh.name == '2F_JG09') {
    //   slope = 0.01
    //   createcurve(F2_JG09, 10)
    //   flyPipe = true
    //   controls.target.set(-90, 80, 150)
    //   controls.update()
    //   moveup(DoublechooseMesh, -42)
    // } else if (DoublechooseMesh.name == '2F_JG10') {
    //   slope = -0.02
    //   createcurve(F2_JG10, 10)
    //   flyPipe = true
    //   controls.target.set(160, 80, 400)
    //   controls.update()
    //   moveup(DoublechooseMesh, 100)
    // } else if (DoublechooseMesh.name == '2F_JG11') {
    //   slope = -0.01
    //   createcurve(F2_JG11, 10)
    //   flyPipe = true
    //   controls.target.set(110, 80, 400)
    //   controls.update()
    //   moveup(DoublechooseMesh, 100)
    // } else if (DoublechooseMesh.name == '2F_JG12') {
    //   slope = 0
    //   createcurve(F2_JG12, 10)
    //   flyPipe = true
    //   controls.target.set(60, 80, 400)
    //   controls.update()
    //   moveup(DoublechooseMesh, 100)
    // } else if (DoublechooseMesh.name == '2F_JG13') {
    //   slope = 0
    //   createcurve(F2_JG13, 10)
    //   flyPipe = true
    //   controls.target.set(10, 80, 400)
    //   controls.update()
    //   moveup(DoublechooseMesh, 100)
    // } else if (DoublechooseMesh.name == '2F_JG14') {
    //   slope = -0.02
    //   createcurve(F2_JG14, 10)
    //   flyPipe = true
    //   controls.target.set(-40, 80, 400)
    //   controls.update()
    //   moveup(DoublechooseMesh, 100)
    // }
  }
}

function movecamera(m, num, p2) {
  var FloorPosition = m.getWorldPosition()

  var p1 = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
  }
  // 相机目标位置点
  // const p2 = { x: -1000, y: 1020, z: 4060 }

  p2 = {
    x: FloorPosition.x,
    y: FloorPosition.y + 15,
    z: FloorPosition.z + num,
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

addEventListener('click', choose) // 监听窗口鼠标

addEventListener('dblclick', ChangeView)

addEventListener('pointermove', changeopcity)
var chooseMeshopcity
function changeopcity() {
  if (chooseMeshopcity) {
    chooseMeshopcity.material.emissive.set(0x000000)
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
    chooseMeshopcity = intersects[0].object

    chooseMeshopcity.material.emissive.set(0x33ffff)
    if (chooseMeshopcity.parent.parent.name == '2F_DTE') {
      changenameURL(chooseMeshopcity.name)
      showDeptName(chooseMeshopcity)
    }
  }
}

//坐标系
// var axesHelper = new THREE.AxesHelper(300)

// scene.add(axesHelper)

//界面
const gui = new GUI()
var findmesh = null
var line1 = null
gui
  .add(params, 'twoFEquipment')
  .name('内部')
  .onChange((e) => {
    var mesh = scene.getObjectByName('2F_Opacity_JG')

    if (e == true) {
      mesh.children.forEach(function (mesh) {
        mesh.material.transparent = true
        mesh.material.opacity = 0.1
      })
    } else {
      mesh.children.forEach(function (mesh) {
        mesh.material.transparent = true
        mesh.material.opacity = 1
      })
    }
  })

var name = {
  nanjingnan: function () {
    window.location.href = './webgl_loader_gltf_njn.html'
  },
  Map: function () {
    window.location.href = './Map.html'
  },
  数据库审计: function () {
    // 同步透明
    showopty()
    //展示标签
    showlabel()
    if (findmesh != null) {
      deleline(findmesh)

      findmesh = scene.getObjectByName('NZ-C01-DBANJDTAH-DBAuditor')
      addline(findmesh)
    } else {
      findmesh = scene.getObjectByName('NZ-C01-DBANJDTAH-DBAuditor')
      addline(findmesh)
    }
  },
  日志审计: function () {
    // 同步透明
    showopty()
    //展示标签
    showlabel()
    if (findmesh != null) {
      deleline(findmesh)
      findmesh = scene.getObjectByName('NZ-C01-RZSJNJDTTRX-TopAudit')
      addline(findmesh)
    } else {
      findmesh = scene.getObjectByName('NZ-C01-RZSJNJDTTRX-TopAudit')
      addline(findmesh)
    }
  },
  Vplexvs6: function () {
    // 同步透明
    showopty()
    //展示标签
    showlabel()
    if (findmesh != null) {
      deleline(findmesh)
      findmesh = scene.getObjectByName('Vplexvs6')
      addline(findmesh)
    } else {
      findmesh = scene.getObjectByName('Vplexvs6')
      addline(findmesh)
    }
  },
  堡垒机: function () {
    // 同步透明
    showopty()
    //展示标签
    showlabel()
    if (findmesh != null) {
      deleline(findmesh)
      findmesh = scene.getObjectByName('BaoLeiJi')
      addline(findmesh)
    } else {
      findmesh = scene.getObjectByName('BaoLeiJi')
      addline(findmesh)
    }
  },
  EmcUnityXT680: function () {
    // 同步透明
    showopty()
    //展示标签
    showlabel()
    if (findmesh != null) {
      deleline(findmesh)
      findmesh = scene.getObjectByName('EmcUnityXT680')
      addline(findmesh)
    } else {
      findmesh = scene.getObjectByName('EmcUnityXT680')
      addline(findmesh)
    }
  },
  EmcUnityXT680扩容后: function () {
    // 同步透明
    showopty()
    //展示标签
    showlabel()
    if (findmesh != null) {
      deleline(findmesh)
      findmesh = scene.getObjectByName('EmcUnityXT680KuoRongHou')
      addline(findmesh)
    } else {
      findmesh = scene.getObjectByName('EmcUnityXT680KuoRongHou')
      addline(findmesh)
    }
  },
  IBMV7000: function () {
    // 同步透明
    showopty()
    //展示标签
    showlabel()
    if (findmesh != null) {
      deleline(findmesh)
      findmesh = scene.getObjectByName('IBMV7000')
      addline(findmesh)
    } else {
      findmesh = scene.getObjectByName('IBMV7000')
      addline(findmesh)
    }
  },
  关闭设备详情: function () {
    label.element.style.visibility = 'hidden'
  },
}
gui.add(name, 'Map').name('首页')
gui.add(name, 'nanjingnan').name('返回')
gui.add(name, '关闭设备详情')
gui.add(name, '堡垒机')
gui.add(name, '日志审计')
gui.add(name, '数据库审计')
gui.add(name, 'Vplexvs6')
gui.add(name, 'IBMV7000')
gui.add(name, 'EmcUnityXT680')
gui.add(name, 'EmcUnityXT680扩容后')

// 默认值设置
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
  '未选',
]
// 添加
var clipCtrl = gui.add(dropdown, '存储节点华三R4900G3').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  showopty()
  //展示标签
  showlabel()
  if (mesh == '001') {
    if (findmesh != null) {
      deleline(findmesh)
      findmesh = scene.getObjectByName('CunChuJieDianHuaSanR4900G3_00')
      addline(findmesh)
    } else {
      findmesh = scene.getObjectByName('CunChuJieDianHuaSanR4900G3_00')
      addline(findmesh)
    }
  } else if (mesh == '002') {
    deleline(findmesh)
    findmesh = scene.getObjectByName('CunChuJieDianHuaSanR4900G3_001')
    addline(findmesh)
  } else if (mesh == '003') {
    deleline(findmesh)
    findmesh = scene.getObjectByName('CunChuJieDianHuaSanR4900G3_002')
    addline(findmesh)
  } else if (mesh == '004') {
    deleline(findmesh)
    findmesh = scene.getObjectByName('CunChuJieDianHuaSanR4900G3_003')
    addline(findmesh)
  } else if (mesh == '005') {
    deleline(findmesh)
    findmesh = scene.getObjectByName('CunChuJieDianHuaSanR4900G3_004')
    addline(findmesh)
  } else if (mesh == '006') {
    deleline(findmesh)
    findmesh = scene.getObjectByName('CunChuJieDianHuaSanR4900G3_005')
    addline(findmesh)
  } else if (mesh == '007') {
    deleline(findmesh)
    findmesh = scene.getObjectByName('CunChuJieDianHuaSanR4900G3_006')
    addline(findmesh)
  } else if (mesh == '008') {
    deleline(findmesh)
    findmesh = scene.getObjectByName('CunChuJieDianHuaSanR4900G3_007')
    addline(findmesh)
  } else if (mesh == '009') {
    deleline(findmesh)
    findmesh = scene.getObjectByName('CunChuJieDianHuaSanR4900G3_008')
    addline(findmesh)
  } else {
    deleline(findmesh)
    findmesh = scene.getObjectByName('CunChuJieDianHuaSanR4900G3_009')
    addline(findmesh)
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
  showopty()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_13')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_13')
        addline(findmesh)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_014')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_014')
        addline(findmesh)
      }
      break
    case '003':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_015')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_015')
        addline(findmesh)
      }
      break
    case '004':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_016')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_016')
        addline(findmesh)
      }
      break
    case '005':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_017')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_017')
        addline(findmesh)
      }
      break
    case '006':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_018')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_018')
        addline(findmesh)
      }
      break
    case '007':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_019')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_019')
        addline(findmesh)
      }
      break
    case '008':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_020')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_020')
        addline(findmesh)
      }
      break
    case '009':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_021')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_020')
        addline(findmesh)
      }
      break
    case '010':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_022')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_022')
        addline(findmesh)
      }
      break
    case '011':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_023')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_023')
        addline(findmesh)
      }
      break
    case '012':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_024')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('ChaoRongHeHuaSanR4900G3_024')
        addline(findmesh)
      }
      break
  }
})

var dropdown = { 管理交换机S5560S: '未选' }
//选项
var states = ['001', '002', '003', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '管理交换机S5560S').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  showopty()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-C01-BMC-1-SWNJDTH3C-S5560S')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-C01-BMC-1-SWNJDTH3C-S5560S')
        addline(findmesh)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-D02-BMC-2-SWNJDTH3C-S5560S')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-D02-BMC-2-SWNJDTH3C-S5560S')
        addline(findmesh)
      }
      break
    case '003':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('JiaoHuanJiS5560_03')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('JiaoHuanJiS5560_03')
        addline(findmesh)
      }
      break
  }
})

var dropdown = { 服务器交换机S6800: '未选' }
//选项
var states = ['001', '002', '003', '004', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '服务器交换机S6800').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  showopty()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-D03-CRH-SWNJDTH3C-S6800')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-D03-CRH-SWNJDTH3C-S6800')
        addline(findmesh)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-D04-CRH-SWNJDTH3C-S6800')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-D04-CRH-SWNJDTH3C-S6800')
        addline(findmesh)
      }
      break
    case '003':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-D03-VM-SWNJDTH3C-S6800')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-D03-VM-SWNJDTH3C-S6800')
        addline(findmesh)
      }
      break
    case '004':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-D04-VM-SWNJDTH3C-S6800')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-D04-VM-SWNJDTH3C-S6800')
        addline(findmesh)
      }
      break
  }
})
var dropdown = { 同步交换机S6520X: '未选' }
//选项
var states = ['001', '002', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '同步交换机S6520X').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  showopty()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-D03-TB-SWNJDTH3C-S6520X')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-D03-TB-SWNJDTH3C-S6520X')
        addline(findmesh)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-D04-TB-SWNJDTH3C-S6520X')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-D04-TB-SWNJDTH3C-S6520X')
        addline(findmesh)
      }
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
  showopty()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('FC_EMC_DS6620')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('FC_EMC_DS6620')
        addline(findmesh)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('FC_EMC_DS6620_01')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('FC_EMC_DS6620_01')
        addline(findmesh)
      }
      break
  }
})

var dropdown = { 会议服务器: '未选' }
//选项
var states = ['001', '002', '003', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '会议服务器').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  showopty()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('HuiYiFuWuQi')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('HuiYiFuWuQi')
        addline(findmesh)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('HuiYiFuWuQi002')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('HuiYiFuWuQi002')
        addline(findmesh)
      }
      break
    case '003':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('HuiYiFuWuQi003')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('HuiYiFuWuQi003')
        addline(findmesh)
      }
      break
  }
})
var dropdown = { 网闸: '未选' }
//选项
var states = ['001', '002', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '网闸').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  showopty()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-D03-1-WZ-NJDTSXF-GAP1000')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-D03-1-WZ-NJDTSXF-GAP1000')
        addline(findmesh)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-D04-2-WZ-NJDTSXF-GAP1000')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-D04-2-WZ-NJDTSXF-GAP1000')
        addline(findmesh)
      }
      break
  }
})
var dropdown = { AC_1000: '未选' }
//选项
var states = ['001', '002', '未选']
// 添加
var clipCtrl = gui.add(dropdown, 'AC_1000').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  showopty()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('AC-1000')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('AC-1000')
        addline(findmesh)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('AC-1000_01')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('AC-1000_01')
        addline(findmesh)
      }
      break
  }
})
var dropdown = { VPN_1000: '未选' }
//选项
var states = ['001', '002', '未选']
// 添加
var clipCtrl = gui.add(dropdown, 'VPN_1000').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  showopty()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-C02-1-VPNNJDTSXF-VPN1000')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-C02-1-VPNNJDTSXF-VPN1000')
        addline(findmesh)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-C03-2-VPNNJDTSXF-VPN1000')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-C03-2-VPNNJDTSXF-VPN1000')
        addline(findmesh)
      }
      break
  }
})

var dropdown = { AF_1000: '未选' }
//选项
var states = ['001', '002', '未选']
// 添加
var clipCtrl = gui.add(dropdown, 'AF_1000').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  showopty()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-C02-1-FWNJDTSXF-AF1000')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-C02-1-FWNJDTSXF-AF1000')
        addline(findmesh)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-C03-2-FWNJDTSXF-AF1000')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-C03-2-FWNJDTSXF-AF1000')
        addline(findmesh)
      }
      break
  }
})

var dropdown = { AF_2000: '未选' }
//选项
var states = ['001', '002', '未选']
// 添加
var clipCtrl = gui.add(dropdown, 'AF_2000').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  showopty()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-C02-1-FWNJDTSXF-AF2000')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-C02-1-FWNJDTSXF-AF2000')
        addline(findmesh)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-C03-2-FWNJDTSXF-AF2000')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-C03-2-FWNJDTSXF-AF2000')
        addline(findmesh)
      }
      break
  }
})

var dropdown = { 安恒WAF: '未选' }
//选项
var states = ['001', '002', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '安恒WAF').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  showopty()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-C02-1-WAFNJDTAH-V3')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-C02-1-WAFNJDTAH-V3')
        addline(findmesh)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-C03-2-WAFNJDTAH-V3')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-C03-2-WAFNJDTAH-V3')
        addline(findmesh)
      }
      break
  }
})

var dropdown = { 南站负载: '未选' }
//选项
var states = ['001', '002', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '南站负载').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  showopty()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-C02-1-LBNJDTSXF-AD1000')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-C02-1-LBNJDTSXF-AD1000')
        addline(findmesh)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-C03-2-LBNJDTSXF-AD1000')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-C03-2-LBNJDTSXF-AD1000')
        addline(findmesh)
      }
      break
  }
})

var dropdown = { 服务器负载均衡: '未选' }
//选项
var states = ['001', '002', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '服务器负载均衡').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  showopty()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('FuWuQiFuZaiJunHeng')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('FuWuQiFuZaiJunHeng')
        addline(findmesh)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('FuWuQiFuZaiJunHeng001')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('FuWuQiFuZaiJunHeng001')
        addline(findmesh)
      }
      break
  }
})

var dropdown = { 核心交换机: '未选' }
//选项
var states = ['001', '002', '未选']
// 添加
var clipCtrl = gui.add(dropdown, '核心交换机').options(states)
// 设置点击事件
clipCtrl.onChange((mesh) => {
  // 同步透明
  showopty()
  //展示标签
  showlabel()
  switch (mesh) {
    case '001':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-C02-SWNJDTH3C-S12508G-AF')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-C02-SWNJDTH3C-S12508G-AF')
        addline(findmesh)
      }
      break
    case '002':
      if (findmesh != null) {
        deleline(findmesh)
        findmesh = scene.getObjectByName('NZ-C03-SWNJDTH3C-S12508G-AF')
        addline(findmesh)
      } else {
        findmesh = scene.getObjectByName('NZ-C03-SWNJDTH3C-S12508G-AF')
        addline(findmesh)
      }
      break
  }
})

function showktlabel(chooseMesh) {
  AClabel.element.style.visibility = 'visible' //显示标签
  AClabel.position.copy(chooseMesh.getWorldPosition())
  AClabel.position.z = chooseMesh.getWorldPosition().z - 130
  // AClabel.scale.set(0.2, 0.2, 0.2)
  AClabel.position.y = 50
}
function moveup(mesh, num) {
  var pos = mesh.position
  var tween = new TWEEN.Tween(pos)

  tween.to(
    {
      z: pos.z + num,
    },
    3000
  )
  tween.onUpdate(function () {
    mesh.position.z = pos.z
  })
  tween.start()
}
// 使外部透明化，以便于观看
function showopty() {
  var a = scene.getObjectByName('2F_Opacity_JG')

  a.children.forEach(function (mesh) {
    mesh.material.transparent = true
    mesh.material.opacity = 0.1
  })
}

var num = 0

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

function render() {
  // console.log(camera.position);
  TWEEN.update()
  renderer.render(scene, camera) //执行渲染操作
  labelRenderer.render(scene, camera) //CSS3D渲染

  // composer1.render()
  requestAnimationFrame(render) //请求再次执行渲染函数render，渲染下一帧
  if (flyPipe) {
    if (num < points.length - 50) {
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