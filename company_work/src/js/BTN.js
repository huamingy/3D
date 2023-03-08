import * as THREE from '../../build/three.module.js'

import { scene, camera, lightGroup, renderer, roomGroup } from './scene.js'

import {
  setTime,
  addOtherLAbel,
  moveFloor,
  plane,
  createcurve,
  arr,
  moveCaream,
  deleteImg,
  deleteAllImglabel,
} from './MainFuntion.js'
var Dev
var rotate = false,
  MF = true,
  LengQueLouPipe = true,
  LengQueLouEquipmemt = true,
  JiGuangLouPipe = true,
  JiGuangLouEquipment = true,
  LengShuiTa = true,
  GongYiLengQueShuiPump = true,
  ZLBianPingLengQueShuiJiZu = true,
  ShuiLengLuoGanJiZu = true,
  run = true,
  out,
  flycurrve = true,
  outletopcity = true,
  flyPipe = false,
  TemHum = true

$('#TemHum').click(function () {
  if (TemHum) {
    TemHum = false

    $('#allLabel').css('display', 'inline')
  } else {
    TemHum = true
    $('#allLabel').css('display', 'none')
  }
})
//旋转控制
$('#btn_rolu').click(function () {
  if (rotate) {
    rotate = false
  } else {
    rotate = true
  }
})

/**点击触发向上移动动画 */
$('#btn').click(function () {
  setTime(function () {
    if (MF) {
      MF = false
      moveFloor('Both_Roof', 5050)
    } else {
      MF = true
      moveFloor('Both_Roof', -5050)
    }
  })
})

//剖切顶部
$('#outletopcity').click(function () {
  Dev = scene.getObjectByName('JiGuangLou')
  var Aircondition_ALKO01PIPE = scene.getObjectByName('Aircondition_ALKO01PIPE')
  if (outletopcity) {
    outletopcity = false
    var PlaneArr = [new THREE.Plane(new THREE.Vector3(0, -1, 0), 460)]
    // 设置渲染器的剪裁平面属性

    Dev.traverse(function (obj) {
      if (obj.type == 'Mesh') {
        obj.material.clippingPlanes = PlaneArr
      }
    })

    // scene.remove(lightGroup)
    // scene.add(roomGroup)
  } else {
    outletopcity = true
    var PlaneArr = [
      // 垂直y轴的平面
      new THREE.Plane(new THREE.Vector3(0, -1, 0), 20000),
    ]
    // 设置渲染器的剪裁平面属性
    Dev.traverse(function (obj) {
      if (obj.type == 'Mesh') {
        obj.material.clippingPlanes = PlaneArr
      }
    })
    // renderer.clippingPlanes = PlaneArr
    // scene.remove(roomGroup)
    // scene.add(lightGroup)
  }
})

$('#LengQueLouPipe').click(function () {
  // if (LengQueLouPipe) {
  plane(LengQueLouPipe)
  // LengQueLouPipe = false
  moveCaream('LQL_Pipe', -400, 800, 0)
  deleteAllImglabel('fasle')
  // } else {
  //   LengQueLouPipe = true
  //   // deleteImg('ZLBianPingLengQueShuiJiZu_All')
  // }
})

$('#ZLBianPingLengQueShuiJiZu').click(function () {
  // if (ZLBianPingLengQueShuiJiZu) {
  ZLBianPingLengQueShuiJiZu = false
  plane(ZLBianPingLengQueShuiJiZu)
  moveCaream('ZLBianPingLengQueShuiJiZu_All', -400, 800, 0)
  deleteAllImglabel('fasle')

  addOtherLAbel('ZLBianPingLengQueShuiJiZu_All', 2, 3)
  // } else {
  //   ZLBianPingLengQueShuiJiZu = true
  //   deleteImg('ZLBianPingLengQueShuiJiZu_All')
  // }
})
$('#GongYiLengQueShuiPump').click(function () {
  // if (GongYiLengQueShuiPump) {
  // GongYiLengQueShuiPump = false

  plane(GongYiLengQueShuiPump)
  deleteAllImglabel('fasle')

  moveCaream('GongYiLengQueShuiPump', -400, 800, 0)
  // } else {
  //   GongYiLengQueShuiPump = true
  //   deleteImg('GongYiLengQueShuiPump')
  // }
})

$('#ShuiLengLuoGanJiZu').click(function () {
  // if (ShuiLengLuoGanJiZu) {
  plane(ShuiLengLuoGanJiZu)
  // ShuiLengLuoGanJiZu = false
  deleteAllImglabel('fasle')

  addOtherLAbel('ShuiLengLuoGanJiZu', 2, 3)
  moveCaream('ShuiLengLuoGanJiZu', -400, 800, 0)
  // } else {
  //   ShuiLengLuoGanJiZu = true
  //   deleteImg('ShuiLengLuoGanJiZu')
  // }
})

$('#LengShuiTa').click(function () {
  // if (LengShuiTa) {
  LengShuiTa = false
  plane(LengShuiTa)
  moveCaream('LengShuiTa_All', -400, 800, 0)
  deleteAllImglabel('fasle')

  addOtherLAbel('LengShuiTa_All', 2, 3)
  // } else {
  //   deleteImg('LengShuiTa_All')
  //   LengShuiTa = true
  // }
})

$('#JiGuangLouPipe').click(function () {
  var device2 = scene.getObjectByName('JiGuangLouPipe')
  // if (JiGuangLouPipe) {
  plane(JiGuangLouPipe)
  deleteAllImglabel('fasle')

  JiGuangLouPipe = false
  moveCaream('JiGuangLouPipe', -400, 800, 0)
  device2.traverse(function (mesh) {
    mesh.material.emssive.set(0xffff00) // 批量更改模型的颜色
  })
  // } else {
  //   JiGuangLouPipe = true
  //   device2.traverse(function (mesh) {
  //     mesh.material.emissive.set(0x0a20b3) // 批量更改模型的颜色
  //   })
  // }
})

$('#JiGuangLouEquipment').click(function () {
  // if (JiGuangLouEquipment) {
  plane(JiGuangLouEquipment)
  // JiGuangLouEquipment = false
  deleteAllImglabel('fasle')
  addOtherLAbel('modbusAhu', 3, 4)
  moveCaream('Aircondition_ALKO03', -1800, 6000, 0)

  // } else {
  //   deleteImg('modbusAhu')
  //   JiGuangLouEquipment = true
  // }
})

$('#flycurrve').click(function () {
  if (flycurrve) {
    flycurrve = false
    createcurve(arr, 12000)
    flyPipe = true
  } else {
    flycurrve = true
    flyPipe = false
  }
})

$('#run').click(function () {
  if (run) {
    run = false
    flyPipe = false
  } else {
    run = true
    flyPipe = true
  }
})

$('#out').click(function () {
  deleteAllImglabel('fasle')
  moveCaream()
})
$('#close').click(function () {
  // Deptlabel.style.visibility = 'hidden'
  console.log('close')
})
export { rotate, Dev }
export {
  MF,
  LengQueLouPipe,
  LengQueLouEquipmemt,
  JiGuangLouPipe,
  JiGuangLouEquipment,
  LengShuiTa,
  GongYiLengQueShuiPump,
  ZLBianPingLengQueShuiJiZu,
  ShuiLengLuoGanJiZu,
  run,
  out,
  flycurrve,
  outletopcity,
  flyPipe,
}
