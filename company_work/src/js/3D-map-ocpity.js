import * as THREE from '../../build/three.module.js'
import { EffectComposer } from '../jsm/postprocessing/EffectComposer.js'
import { RenderPass } from '../jsm/postprocessing/RenderPass.js'
import { FilmPass } from '../jsm/postprocessing/FilmPass.js'

import { BloomPass } from '../jsm/postprocessing/BloomPass.js'
import { ShaderPass } from '../jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from '../jsm/shaders/FXAAShader.js'
import { CopyShader } from '../jsm/shaders/CopyShader.js'
import { GUI } from '../jsm/libs/dat.gui.module.js'

import { CSS2DObject } from '../jsm/renderers/CSS2DRenderer.js'
import { UnrealBloomPass } from '../jsm/postprocessing/UnrealBloomPass.js'
import { scene, camera, renderer, controls, mixer, clock } from './scene.js'

import { granaryArr, render } from './MainFuntion.js'

// import {
//   Dev,
//   MF,
//   LengQueLouPipe,
//   LengQueLouEquipmemt,
//   JiGuangLouPipe,
//   JiGuangLouEquipment,
//   LengShuiTa,
//   GongYiLengQueShuiPump,
//   ZLBianPingLengQueShuiJiZu,
//   ShuiLengLuoGanJiZu,
//   run,
//   out,
//   flycurrve,
//   outletopcity,
// } from './BTN.js'
var width = window.innerWidth //窗口宽度
var height = window.innerHeight //窗口高度

var chooseMesh = null //射线拾取的模型

var obj = document.getElementById('label')
var th = document.getElementById('TH')

var label = null

/**
 * 创建场景对象Scene
 */

// controls.target.set(nextPos);
// controls.update();

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight
  // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix()
}

//二号通风管道视线曲线

var timeout = null //引入定时器
function choose(event) {
  clearTimeout(timeout) //单击事件，清理定时器
  //设置定时器
  timeout = setTimeout(function () {
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
      // 选中模型变大
      // intersects[0].object.scale.set(1.5,1.5,1.5);
      chooseMesh = intersects[0].object
      // console.log('chooseMesh: ', chooseMesh)

      // if (chooseMesh.parent.name == 'Aircondition_ALKO') {
      //   showmessaeg('modbusAhu1', 'modbusAhu1', 'AHU1', chooseMesh.parent)
      //   // ShowModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
      // } else if (chooseMesh.parent.name == 'Aircondition_ALKO01') {
      //   showmessaeg('modbusAhu2', 'modbusAhu2', 'AHU2', chooseMesh)
      //   // ShowModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
      // } else if (chooseMesh.parent.name == 'Aircondition_ALKO02') {
      //   showmessaeg('modbusAhu3', 'modbusAhu3', 'AHU3', chooseMesh)
      //   // ShowModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
      // } else if (chooseMesh.parent.name == 'Aircondition_ALKO03') {
      //   showmessaeg('modbusAhu4', 'modbusAhu4', 'AHU4', chooseMesh)
      //   // ShowModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
      // } else if (chooseMesh.parent.name == 'Aircondition_ALKO04') {
      //   showmessaeg('modbusAhu5', 'modbusAhu5', 'AHU5', chooseMesh)
      //   // ShowModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
      // } else if (chooseMesh.parent.name == 'Aircondition_ALKO05') {
      //   showmessaeg('modbusAhu6', 'modbusAhu6', 'AHU6', chooseMesh)
      //   // ShowModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
      // } else if (chooseMesh.parent.name == 'Aircondition_ALKO06') {
      //   showmessaeg('modbusAhu7', 'modbusAhu7', 'AHU7', chooseMesh)
      //   // ShowModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
      // } else if (chooseMesh.name == 'Aircondition_ALKO007') {
      //   showmessaeg('modbusAhu8', 'modbusAhu8', 'AHU8', chooseMesh)
      //   // ShowModbusAhuPipe(chooseMesh.parent.name + 'PIPE')
      // } else
      // if (chooseMesh.name == 'LQL_Equipment') {
      //   showLuoGanJiData(
      //     'modbusScrewMachine',
      //     'modbusScrewMachine1',
      //     '水冷螺杆机01',
      //     chooseMesh
      //   )
      // } else if (chooseMesh.name == 'LQL_Equipment01') {
      //   showLuoGanJiData(
      //     'modbusScrewMachine',
      //     'modbusScrewMachine2',
      //     '水冷螺杆机02',
      //     chooseMesh
      //   )
      // } else if (chooseMesh.name == 'LQL_Equipment02') {
      //   showLuoGanJiData(
      //     'modbusScrewMachine',
      //     'modbusScrewMachine3',
      //     '水冷螺杆机03',
      //     chooseMesh
      //   )
      // } else
      // if (chooseMesh.name == 'LengShuiTa') {
      //   showLQTmessaeg(
      //     'modbusCoolTower',
      //     'modbusCoolTower01',
      //     '冷水塔01',
      //     chooseMesh
      //   )
      // } else if (chooseMesh.name == 'LengShuiTa01') {
      //   showLQTmessaeg(
      //     'modbusCoolTower',
      //     'modbusCoolTower02',
      //     '冷水塔02',
      //     chooseMesh
      //   )
      // } else if (chooseMesh.name == 'LengShuiTa02') {
      //   showLQTmessaeg(
      //     'modbusCoolTower',
      //     'modbusCoolTower03',
      //     '冷水塔03',
      //     chooseMesh
      //   )
      // } else if (chooseMesh.parent.name == 'ZLBianPingLengQueShuiJiZu_All') {
      //   showGYSWJmessaeg(
      //     'modbusCraftOuter',
      //     'modbusCraftOuter',
      //     '工艺冷却水外机',
      //     chooseMesh
      //   )
      // } else if (chooseMesh.parent.name == 'GongYiLengQueShuiPump') {
      //   showmessaeg(
      //     'modbusCraftInner',
      //     'modbusCraftInner',
      //     '工艺冷却水泵',
      //     chooseMesh
      //   )
      // }
    }
  }, 200)
}
addEventListener('click', choose) // 监听窗口鼠标单击事件

function onMouseDblclick(event) {
  clearTimeout(timeout) //单击事件，清理定时器

  var object = scene.getObjectByName('all')
  // console.log('onMouseDblclick -> object', object)

  var Sx = event.clientX //鼠标单击位置横坐标
  var Sy = event.clientY //鼠标单击位置纵坐标
  //屏幕坐标转WebGL标准设备坐标
  var x = (Sx / window.innerWidth) * 2 - 1 //WebGL标准设 备横坐标
  var y = -(Sy / window.innerHeight) * 2 + 1 //WebGL标准设备纵坐标
  //创建一个射线投射器`Raycaster`
  var raycaster = new THREE.Raycaster()
  //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera)
  //返回.intersectObjects()参数中射线选中的网格模型对象
  // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
  var intersects = raycaster.intersectObjects(granaryArr)

  // console.log('射线器返回的对象', intersects)
  //console.log("射线投射器返回的对象 点point", intersects[0].point);
  //   console.log("射线投射器的对象 几何体",intersects[0].object.geometry.vertices)
  //   intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
    choosemesh = intersects[0].object

    if (choosemesh.name == 'JiGuangLouPipe01') {
      flyPipe = true //
      pipe = 1
    } else if (choosemesh.name == 'JiGuangLouPipe02') {
      createcurve(arr2, 5000)
      flyPipe = true //
      pipe = 2
    } else if (choosemesh.name == 'JiGuangLouPipe03') {
      createcurve(arr3, 5000)
      flyPipe = true //
      pipe = 3
    } else if (choosemesh.name == 'JiGuangLouPipe04') {
      createcurve(arr4, 5000)
      flyPipe = true //
      pipe = 4
    } else if (choosemesh.name == 'JiGuangLouPipe05') {
      createcurve(arr5)
      flyPipe = true //
      pipe = 5
    } else if (choosemesh.name == 'JiGuangLouPipe06') {
      createcurve(arr6, 5000)
      flyPipe = true //
      pipe = 6
    } else if (choosemesh.name == 'JiGuangLouPipe07') {
      createcurve(arr7, 5000)
      flyPipe = true //
      pipe = 7
    } else if (choosemesh.name == 'JiGuangLouPipe08') {
      createcurve(arr8, 5000)
      flyPipe = true //
      pipe = 8
    }
  }
}

addEventListener('dblclick', onMouseDblclick)

// renderer.autoClear = false
// var num = 0
// const renderModel = new RenderPass(scene, camera)
// const effectCopy = new ShaderPass(CopyShader)

// const effectBloom = new BloomPass(1.25)
// const effectFilm = new FilmPass(0.65, 0.8, 3, false)

// var composer = new EffectComposer(renderer)

// composer.addPass(renderModel)
// composer.addPass(effectBloom)
// composer.addPass(effectFilm)
// composer.addPass(effectCopy)

// const params = {
//   exposure: 1,
//   bloomStrength: 5,
//   bloomThreshold: 0,
//   bloomRadius: 0,
//   scene: 'Scene with Glow',
// }
// const gui = new GUI()

// gui
//   .add(params, 'scene', ['Scene with Glow', 'Glow only', 'Scene only'])
//   .onChange(function (value) {
//     switch (value) {
//       case 'Scene with Glow':
//         bloomComposer.renderToScreen = false
//         break
//       case 'Glow only':
//         bloomComposer.renderToScreen = true
//         break
//       case 'Scene only':
//         // nothing to do
//         break
//     }

//     // render()
//   })

// const folder = gui.addFolder('Bloom Parameters')

// folder.add(params, 'exposure', 0.1, 2).onChange(function (value) {
//   renderer.toneMappingExposure = Math.pow(value, 4.0)
//   render()
// })

// folder.add(params, 'bloomThreshold', 0.0, 1.0).onChange(function (value) {
//   bloomPass.threshold = Number(value)
//   render()
// })

// folder.add(params, 'bloomStrength', 0.0, 10.0).onChange(function (value) {
//   bloomPass.strength = Number(value)
//   render()
// })

// folder
//   .add(params, 'bloomRadius', 0.0, 1.0)
//   .step(0.01)
//   .onChange(function (value) {
//     bloomPass.radius = Number(value)
//     render()
//   })

//扫光测试效果
// var options = {
//   center: new THREE.Vector3(5000, 0, 5000),
//   innerRadius: 5,
//   outerRadius: 10,
//   fillType: 1, // pure: 0 - linear: 1
//   fillColor: new THREE.Color(1, 1, 0),
// }
// var renderScene = new RenderPass(scene, camera)
// var circleSweepPass = new CircleSweepPass(scene, camera, options)
// var composer = new THREE.EffectComposer(renderer)
// let scale = window.devicePixelRatio * 2 // 用于弥补后处理带来的图像精度损失
// composer.setSize(window.innerWidth * scale, window.innerHeight * scale)

// composer.addPass(renderScene)
// composer.addPass(circleSweepPass)

const renderScene = new RenderPass(scene, camera)
var FXAAShaderPass = new ShaderPass(FXAAShader)
const effectFilm = new FilmPass(0.65, 0.8, 3, false)
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
)
bloomPass.threshold = 0
bloomPass.strength = 0.8
bloomPass.radius = 0

const bloomComposer = new EffectComposer(renderer)
bloomComposer.renderToScreen = false
bloomComposer.addPass(FXAAShaderPass)
bloomComposer.addPass(effectFilm)
bloomComposer.addPass(renderScene)
bloomComposer.addPass(bloomPass)

const finalPass = new ShaderPass(
  new THREE.ShaderMaterial({
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: bloomComposer.renderTarget2.texture },
    },
    vertexShader: document.getElementById('vertexshader').textContent,
    fragmentShader: document.getElementById('fragmentshader').textContent,
    defines: {},
  }),
  'baseTexture'
)
finalPass.needsSwap = true

const finalComposer = new EffectComposer(renderer)
finalComposer.addPass(renderScene)
finalComposer.addPass(finalPass)
// finalComposer.addPass(FXAAShaderPass)

render()

// function fly(points) {
//   if (num < points.length - 100) {
//     var i = Math.floor(num)
//     // 相机位置设置在当前点位置
//     camera.position.set(points[i].x, points[i].y, points[i].z)
//     // 设置相机观察点为当前点的下一个点，两点可以构成一个视线方向
//     // 你可以简单理解为：要始终保持视线为曲线的切线方向
//     camera.lookAt(
//       new THREE.Vector3(points[i + 1].x, points[i].y - 0.01, points[i + 1].z)
//     )
//     num += 4 //调节速度
//   } else {
//     flyPipe = false
//     num = 0
//   }
// }

export { finalComposer, bloomComposer }
