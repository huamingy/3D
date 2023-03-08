import * as THREE from '../../build/three.module.js'
import { LineSegments2 } from '../jsm/lines/LineSegments2.js'
import { LineMaterial } from '../jsm/lines/LineMaterial.js'
import { LineGeometry } from '../jsm/lines/LineGeometry.js'
import { rotate, flyPipe } from './BTN.js'
import { finalComposer, bloomComposer } from './3D-map-ocpity.js'

import { CSS3DSprite } from '../jsm/renderers/CSS3DRenderer.js'
import {
  scene,
  camera,
  renderer,
  labelRender,
  mixer,
  clock,
  uniforms,
  controls,
  label2DRender,
} from './scene.js'

import Stats from '../jsm/libs/stats.module.js'
import { CSS2DObject } from '../jsm/renderers/CSS2DRenderer.js'
//2.0、性能插件  监听fps
var stats = new Stats()
document.body.appendChild(stats.dom)
stats.dom.id = 'stats'

var pos = null
var Light = false

var nextPos = new THREE.Vector3() //射线点击建筑对应XOZ平面坐标
var dir = new THREE.Vector3() //飞行漫游方向，起始点构成的方向 默认值0，0，0
var flyBool = false //作为视角移动的条件
const bloomLayer = new THREE.Layers()
bloomLayer.set(1)
const materials = {}
const darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' })
var granaryArr = [],
  choosearry = [] //被点击的模型对象数组

var Deptlabel = document.getElementById('AHU')
Deptlabel.style.pointerEvents = 'auto'
var CSS3DDeptlabel = new CSS2DObject(Deptlabel)
CSS3DDeptlabel.rotation.x = Math.PI * -0.5

function setTime(callback) {
  setTime.prototype.init(callback)
}
setTime.prototype = {
  canclick: true,
  init: function (callback) {
    if (this.canclick) {
      this.canclick = false
      callback()
      setTimeout(
        function () {
          this.canclick = true
        }.bind(this),
        3000
      )
    } else {
      console.log('未到三秒，重复点击')
    }
  },
}
function setTextrueMove() {
  var cwurl = './models/JiGuangLou_Opacity/liquid_cw.jpg'
  var hwurl = './models/JiGuangLou_Opacity/liquid_hw.jpg'
  var szwurl = './models/JiGuangLou_Opacity/liquid_szw.jpg'
  var iwurl = './models/JiGuangLou_Opacity/liquid_Iw.jpg'
  var alphaurl = './models/JiGuangLou_Opacity/liquid_alpha.jpg'
  var Pipe = scene.getObjectByName('LQL_Pipe')

  changematerial('LQL_CW', 0x3eede7, 0x33ccff, cwurl, alphaurl)
  changematerial('LQL_HW', 0x110000, 0xff0000, hwurl, alphaurl)
  changematerial(
    'LQL_SZW',
    'rgb(199,108,5)',
    'rgb(199,108,5)',
    szwurl,
    alphaurl
  )
  changematerial('LQL_IW', 0x00ff00, 0x00ff00, iwurl, alphaurl)
}

function changematerial(mesh, emissivecolor, color, url, alphaurl) {
  var textureload = new THREE.TextureLoader()
  var texture = textureload.load(url)
  var alphatexture = textureload.load(alphaurl)

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  alphatexture.wrapS = alphatexture.wrapT = THREE.RepeatWrapping
  texture.repeat.x = 1
  texture.repeat.y = 1
  scene.getObjectByName(mesh).material = new THREE.MeshPhongMaterial({
    map: texture,
    alphaMap: alphatexture,
    emissive: emissivecolor,
    transparent: true,
    opacity: 0.9,
    emissiveMap: texture,
    color: color,
    // specular: 0x000000,
  })

  setInterval(() => {
    alphatexture.x -= 0.005
    texture.offset.x -= 0.005
  })
}
var moveboolen = true

function moveCaream(meshName, posx, posy, posz) {
  var FloorPosition
  var torusMesh = scene.getObjectByName('torus')
  if (meshName != null) {
    scene.getObjectByName('Digit').material.opacity = 0

    scene.remove(torusMesh)

    var havingmesh = scene.getObjectByName(meshName)
    havingmesh.traverse(function (mesh) {
      if (mesh.isMesh) {
        // addline1(mesh)
      }
    })
    FloorPosition = havingmesh.children[0].getWorldPosition()
    var a = FloorPosition.x + posx,
      b = FloorPosition.y + posy,
      c = FloorPosition.z + posz
  } else {
    scene.getObjectByName('Digit').material.opacity = 1
    changeOpacty()
    FloorPosition = { x: 0, y: 0, z: 0 }
  }
  var p1 = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,

    x1: controls.target.x,
    y1: controls.target.y,
    z1: controls.target.z,
  }

  // 相机目标位置点
  // const p2 = { x: -1000, y: 1020, z: 4060 }
  var p2
  if (meshName != null) {
    p2 = {
      x: a,
      y: b,
      z: c,
      x1: FloorPosition.x,
      y1: FloorPosition.y,
      z1: FloorPosition.z,
    }
  } else {
    p2 = {
      x: -8000,
      y: 6000,
      z: 11000,
      x1: 0,
      y1: 0,
      z1: 0,
    }
  }
  // 使用tween动画
  var tween = new TWEEN.Tween(p1)
    .to(p2, 4000)
    .easing(TWEEN.Easing.Quadratic.InOut)
  tween.onUpdate(() => {
    // 修改相机位置

    camera.position.set(p1.x, p1.y, p1.z)
    // camera.lookAt(FloorPosition.x /*- 20*/, FloorPosition.y, FloorPosition.z)
    controls.target.set(p1.x1, p1.y1, p1.z1)
    controls.update()
  })
  // 开始动画
  tween.start()
}
var DigweiGroup = new THREE.Group()
var allDigwei = []
function addOtherLAbel(meshName, scalenum, maxscale) {
  var Camera = scene.getObjectByName(meshName)

  for (const i in Camera.children) {
    var mesh = Camera.children[i]

    $('body').append(
      `<div id = "` +
        Camera.children[i].name +
        `position">    <img id = "` +
        Camera.children[i].name +
        `rt"  class = "dingwei_img"   src = "././img/定位.png"  >
       </div>`
    )

    var DingPo = document.getElementById(Camera.children[i].name + 'position')
    // console.log('DingPo: ', DingPo)
    var meshLabel = new CSS3DSprite(DingPo)
    meshLabel.name = Camera.children[i].name + 'dingweiLAbel'
    meshLabel.position.copy(Camera.children[i].getWorldPosition())
    meshLabel.element.style.opacity = 0
    meshLabel.element.style.visibility = 'visible'
    labelshow(meshLabel, 0, 1)

    meshLabel.position.y += 300
    meshLabel.scale.set(scalenum, scalenum, scalenum)

    scene.add(meshLabel)
    allDigwei.push(meshLabel)
    $('#' + Camera.children[i].name + 'position').click(function () {
      if (meshName == 'modbusAhu') {
        showmessaeg(
          Camera.children[i].name,
          Camera.children[i].name,
          'AHU' + Camera.children[i].name.slice(-1),
          Camera.children[i]
        )
        deleteAllImglabel('true')
      } else if (mesh.parent.name == 'GongYiLengQueShuiPump') {
        // showGYSWJmessaeg(
        //   'modbusCraftInner',
        //   'modbusCraftInner',
        //   '工艺冷却水泵',
        //   mesh
        // )
      } else if (meshName == 'ShuiLengLuoGanJiZu') {
        showLuoGanJiData(
          'modbusScrewMachine',
          'modbusScrewMachine' + Camera.children[i].name.slice(-1),
          '水冷螺杆机' + Camera.children[i].name.slice(-1),
          Camera.children[i]
        )
        deleteAllImglabel('true')
      } else if (meshName == 'LengShuiTa_All') {
        showLQTmessaeg(
          'modbusCoolTower',
          'modbusCoolTower0' + Camera.children[i].name.slice(-1),
          '冷水塔' + Camera.children[i].name.slice(-1),
          Camera.children[i]
        )
        deleteAllImglabel('true')
      } else if (meshName == 'ZLBianPingLengQueShuiJiZu_All') {
        showGYSWJmessaeg(
          'modbusCraftOuter',
          'modbusCraftOuter',
          '工艺冷却水外机',
          Camera.children[i]
        )
        deleteAllImglabel('true')
      }
    })

    document.getElementById(
      Camera.children[i].name + 'position'
    ).onpointermove = function () {
      scene
        .getObjectByName(Camera.children[i].name + 'dingweiLAbel')
        .scale.set(maxscale, maxscale, maxscale)
    }
    document.getElementById(
      Camera.children[i].name + 'position'
    ).onpointerleave = function () {
      scene
        .getObjectByName(Camera.children[i].name + 'dingweiLAbel')
        .scale.set(scalenum, scalenum, scalenum)
    }
  }
}
function deleteImg(meshname) {
  var Camera = scene.getObjectByName(meshname)
  for (const i in Camera.children) {
    var mesh = Camera.children[i]
    var CameraImgLabel = scene.getObjectByName(
      Camera.children[i].name + 'dingweiLAbel'
    )
    if (CameraImgLabel) CameraImgLabel.parent.remove(CameraImgLabel)
    if (meshname == '3F_BF' || meshname == '2F_PAU' || meshname == '4F_PAU') {
      var CameraImgLabel = scene.getObjectByName(
        Camera.children[i].name + 'hnn'
      )
      if (CameraImgLabel) CameraImgLabel.parent.remove(CameraImgLabel)
    } else if (
      meshname == '3F_AHU' ||
      meshname == '2F_MAU' ||
      meshname == '3F_AHU'
    ) {
      var temLanel = scene.getObjectByName(Camera.children[i].name + 'hnn')

      if (temLanel) temLanel.parent.remove(temLanel)
      var humLabel = scene.getObjectByName(Camera.children[i].name + 'HUMhnn')

      if (humLabel) humLabel.parent.remove(humLabel)
    }
  }
}
function deleteAllImglabel(office) {
  if (allDigwei.length != 0) {
    for (const i in allDigwei) {
      labelhidden(allDigwei[i], 1, 0)
      // if (allDigwei[i]) allDigwei[i].parent.remove(allDigwei[i])
    }
    allDigwei.splice(0, allDigwei.length)
  } else if (CSS3DDeptlabel) {
    office == 'true' ? labelshow(CSS3DDeptlabel) : labelhidden(CSS3DDeptlabel)
  }
  console.log(allDigwei.length)
}
/**悬浮标签转为3D对象 */

function showLuoGanJiData(name, jsonname, tname, HavingChooseMesh) {
  $.changeurl(name, jsonname)
  $.AddData()

  $('#AHU').html('')
  $('#AHU').append(
    ` 
    <div id="luoganji" class="luoganji_outClass">

    <div style="position: absolute; left: 0px; top: 0px">
      <img
      src="./img/luoganji/28136cd389bf4cc517cc7353b2def2b.jpg" 
        style=" opacity: 0.6"
      />
    </div>
    <h2 id="ktname" class="luoganji_name_class">AHU1</h2>
    
    <div  class="Luoganji_dataClass" >
         <div style="padding-top: 10px;padding-bottom: 10px;border-bottom:1px  groove rgba(255, 255, 255, 0.5);">  <a>冷却塔制冷: 
         ` +
      (modbusScrewMachine.coolTowerRefrigerationStatus == 0 ? '关' : '开') +
      `
         
         
         </a>&nbsp;&nbsp; <a>冷冻管道:   ` +
      (modbusScrewMachine.coolPipelineStatus == 0 ? '关' : '开') +
      `</a>   </div>
         <div style="padding-top: 10px;">  <a>冷冻水泵: ` +
      (tname.search('1') >= 0
        ? modbusScrewMachine.coolWaterPumpRemoteStatus1
        : tname.search('2') >= 0
        ? modbusScrewMachine.coolWaterPumpRemoteStatus2
        : tname.search('3') >= 0
        ? modbusScrewMachine.coolWaterPumpRemoteStatus3
        : undefined) +
      `</a> &nbsp; &nbsp;&nbsp;&nbsp;<a>冷冻系统供回水压差:   ` +
      modbusScrewMachine.coolSystemReturn +
      ` P</a> </div>
      </div>
       
      <div  class="dept02Class">
         <a style="font-size: 14px;">压缩机<br>电流</a><br />
         <a >` +
      (tname.search('1') >= 0
        ? modbusScrewMachine.compressorCurrent1
        : tname.search('2') >= 0
        ? modbusScrewMachine.compressorCurrent2
        : tname.search('3') >= 0
        ? modbusScrewMachine.compressorCurrent3
        : undefined) +
      `</a>
      </div>
      <div  class="dept01Class">
         <a style="font-size: 15px;" >冷冻系统</a><br />
         <a >出水:` +
      modbusScrewMachine.coolSystemOutPress +
      `P</a><br />
         <a >回水:` +
      modbusScrewMachine.coolSystemReturnPress +
      `P</a>
      </div>
      <div  class="dept03Class">
        <div  class=" "  style="padding-top: 29px;">
          <a style="font-size: 13px;">冷冻泵<br>频率</a><br />
          <a >` +
      (tname.search('1') >= 0
        ? modbusScrewMachine.coolPumpHzFeedback1
        : tname.search('2') >= 0
        ? modbusScrewMachine.coolPumpHzFeedback2
        : tname.search('3') >= 0
        ? modbusScrewMachine.coolPumpHzFeedback3
        : undefined) +
      `HZ</a>
        </div>
      </div>
      <div  class="LQ_in_deptdataClass">
          <a>冷却回水</a><br>
          <a>` +
      (tname.search('1') >= 0
        ? modbusScrewMachine.coolDownRetTemp1
        : tname.search('2') >= 0
        ? modbusScrewMachine.coolDownRetTemp2
        : tname.search('3') >= 0
        ? modbusScrewMachine.coolDownRetTemp3
        : undefined) +
      `℃</a>
      </div>
         
      <div  class="LQ_out_deptdataClass">
          <a>冷却出水</a><br>
          <a>` +
      (tname.search('1') >= 0
        ? modbusScrewMachine.coolDownOutTemp1
        : tname.search('2') >= 0
        ? modbusScrewMachine.coolDownOutTemp2
        : tname.search('3') >= 0
        ? modbusScrewMachine.coolDownOutTemp3
        : undefined) +
      `℃</a>
      </div>
         
      <div class="LD_in_deptdataClass">
          <a>冷冻回水</a>
          <a>` +
      (tname.search('1') >= 0
        ? modbusScrewMachine.freezingRetTemp1
        : tname.search('2') >= 0
        ? modbusScrewMachine.freezingRetTemp2
        : tname.search('3') >= 0
        ? modbusScrewMachine.freezingRetTemp3
        : undefined) +
      `℃</a>
      </div>
      <div class="LD_out_deptdataClass">
          <a>冷冻出水</a>
          <a>` +
      (tname.search('1') >= 0
        ? modbusScrewMachine.freezingOutTemp1
        : tname.search('2') >= 0
        ? modbusScrewMachine.freezingOutTemp2
        : tname.search('3') >= 0
        ? modbusScrewMachine.freezingOutTemp3
        : undefined) +
      `℃</a>
     
      </div>
      <img id="luoganji-close"   class="luoganji-close"   title="退出" src="./img/luoganji/1.png"/>	 </div>
     `
  )
  document.getElementById('ktname').innerHTML = tname
  $('#luoganji-close').click(function () {
    addOtherLAbel('ShuiLengLuoGanJiZu', 2, 3)
    labelhidden(CSS3DDeptlabel, 1, 0)
    //    Deptlabel.style.visibility = 'hidden'
  })
  // CSS3DDeptlabel.position.set(1000, 1000, 1000)

  CSS3DDeptlabel.position.copy(HavingChooseMesh.getWorldPosition())
  CSS3DDeptlabel.scale.set(5, 5, 5)
  CSS3DDeptlabel.position.y += 400
  CSS3DDeptlabel.position.z += 600
  CSS3DDeptlabel.element.style.opacity = 0

  labelshow(CSS3DDeptlabel, 0, 1)
  //CSS3DDeptlabel.element.style.visibility = 'visible'
  scene.add(CSS3DDeptlabel)
}

var message
$.ajax({
  type: 'get',
  url: 'http://221.6.30.202:15006/prod-api/modbus/api/getNewestData?modbusType=modbusAhu1',
  data: message,
  dataType: 'json',
  async: false, //默认为true 异步
  success: function (data) {
    message = data
  },
})
var MessageUrl =
  'http://221.6.30.202:15006/prod-api/modbus/api/getNewestData?modbusType=modbusScrewMachine'
// var JsonURL = '../JiGuangLou_3D/json/modbusScrewMachine.json'
// var JsonURL = './json/modbusScrewMachine.json'
var modbusScrewMachine,
  changeMessageUrl,
  changeJsonUrl,
  modbusScrewMachine_message
$.extend({
  changeurl: function (messahename, jsonname) {
    changeMessageUrl = MessageUrl.replace(/modbusScrewMachine/, messahename)
    // changeJsonUrl = JsonURL.replace(/modbusScrewMachine/, jsonname)
  },
  AddData: function () {
    // console.log('11111111')
    // $.ajax({
    //   type: 'get',
    //   // url: changeJsonUrl,
    //   data: modbusScrewMachine_message,
    //   dataType: 'json',
    //   async: false, //默认为true 异步
    //   success: function (data) {
    //     modbusScrewMachine_message = data.infoWindowField
    //   },
    // })
    $.ajax({
      type: 'get',
      url: changeMessageUrl,
      data: modbusScrewMachine,
      dataType: 'json',
      async: false, //默认为true 异步
      success: function (data) {
        modbusScrewMachine = data.data[0]
        // console.log(' modbusScrewMachine: ', modbusScrewMachine)
      },
    })

    setTimeout(function () {
      $.AddData()
    }, 240000)
  },
})

//空调标签弹出方法
function showmessaeg(name, jsonname, tname, HavingChooseMesh) {
  $.changeurl(name, jsonname)
  $.AddData()
  // console.log(modbusScrewMachine)
  $('#AHU').html('')
  $('#AHU').append(
    `
  <div class="AHU_outerClass"> 
			<div   id="ktname" class="AHU_name">AHU` +
      name.slice(-1) +
      `</div>
			<div class="dataclass">
				
				<div class="dataclass_value">加温器开度：<a class = "AHU_dataclass_value">` +
      modbusScrewMachine.heaterOpen +
      `</a>%</div>
				<div class="dataclass_value">主加热开度：<a class = "AHU_dataclass_value">` +
      modbusScrewMachine.mainHeatingOpen +
      `</a>%</div>
				<div class="dataclass_value">三通阀开度：<a class = "AHU_dataclass_value">` +
      modbusScrewMachine.threeValveOpen +
      `</a>%</div>
				<div class="dataclass_value">二次回风阀：<a class = "AHU_dataclass_value">` +
      (modbusScrewMachine.secReturnAirValveOpen == undefined
        ? '无'
        : modbusScrewMachine.secReturnAirValveOpen) +
      `</a>%</div>
			</div>
      <div class="AHU_SD">` +
      modbusScrewMachine.airSupplyHumidity +
      `<a class="AHU_unit">%</a></div>
			<div class="AHU_WD">` +
      modbusScrewMachine.airSupplyTemp +
      `<a class="AHU_unit">℃</a></div>
			<div class="AHU_PL">` +
      modbusScrewMachine.blowerFrequency +
      `<a class="AHU_unit">HZ</a></div>
			<div class="AHU_CMH">` +
      modbusScrewMachine.airSupplyAmount +
      `<a class="AHU_unit">CMH</a></div>
      <img class="imgclass_png" src="./img/Fj.png"/>

      <img  id="FJ" class="imgclass_gif" src="./img/Fj.gif"/>
			
			<a class="AHU_SFJ" >送风机</a><br />
			
      <img class="AHU_STAUS_imgclass" src="./img/黄.png"/>
			<div  class="AHU_wjzT">风机状态:<a class = "AHU_value">` +
      (modbusScrewMachine.fanStatus == 1 ? '开' : '关') +
      `</a></div>

      <img class="AHU_module_imgclass" src="./img/AHU2蓝.png"/>
			<div  class="AHU_WJMS">风机模式:<a class="AHU_satus">` +
      (modbusScrewMachine.heatingStatus == 1
        ? '制热'
        : modbusScrewMachine.refrigerationStatus == 1
        ? '制冷'
        : '无') +
      '   ' +
      (modbusScrewMachine.dehumidificationStatus == 1
        ? '除湿'
        : modbusScrewMachine.humidificationStatus == 1
        ? '加湿'
        : '无') +
      `</a></div>
			<div class="AHU_Time"  >运行时间:<a class = "AHU_value">` +
      modbusScrewMachine.runDay +
      `天` +
      modbusScrewMachine.runHour +
      `时` +
      modbusScrewMachine.runMin +
      `分` +
      modbusScrewMachine.runSec +
      `秒` +
      `</a></div>

      <img  id="LQT_out"  class="AHU_loginout"    src = "./img/LQT/8.181.png">
		</div>
  
  `
  )
  if (modbusScrewMachine.fanStatus == 0) {
    document.getElementById('FJ').style.visibility = 'hidden'
  }
  $('#LQT_out').click(function () {
    labelhidden(CSS3DDeptlabel, 1, 0)
    addOtherLAbel('modbusAhu', 3, 4)

    //    Deptlabel.style.visibility = 'hidden'
  })

  document.getElementById('ktname').innerHTML = tname

  labelshow(CSS3DDeptlabel, 0, 1)

  CSS3DDeptlabel.position.copy(HavingChooseMesh.getWorldPosition())
  CSS3DDeptlabel.scale.set(5, 5, 5)
  CSS3DDeptlabel.position.y += 400
  //CSS3DDeptlabel.element.style.visibility = 'visible'
  scene.add(CSS3DDeptlabel)
}

//冷却塔标签弹出方法
function showLQTmessaeg(name, jsonname, tname, HavingChooseMesh) {
  $.changeurl(name, jsonname)
  $.AddData()
  // console.log(modbusScrewMachine)
  $('#AHU').html('')
  $('#AHU').append(
    `<div class="LQT_out">
		<img  class="LQT_img" src="./img/LQT/冷却塔机组.png"/>
		<div id = "ktname" class="LQT_Name"> 冷却塔01  </div>
			<div  class="LQT_FS">风扇状态<br /><a>` +
      ((tname.search('1') >= 0
        ? modbusScrewMachine.coolFanStatus1
        : tname.search('2') >= 0
        ? modbusScrewMachine.coolFanStatus2
        : tname.search('3') >= 0
        ? modbusScrewMachine.coolFanStatus3
        : undefined) == 1
        ? '开'
        : '关') +
      `</a> </div>
			<img  class="LQT_SLL_img" src="./img/LQT/2.png"/>
			<div class="LQT_SLL">水流量 <br /><a>` +
      (tname.search('1') >= 0
        ? modbusScrewMachine.ehFlow1
        : tname.search('2') >= 0
        ? modbusScrewMachine.ehFlow2
        : tname.search('3') >= 0
        ? modbusScrewMachine.ehFlow3
        : undefined) +
      `</a></div>
				<img  class="LQT_PL_img" src="./img/LQT/3.png"/>
			<div class="LQT_PL">冷却泵频率 <br /><a>` +
      (tname.search('1') >= 0
        ? modbusScrewMachine.coolPumpHzFeedback1
        : tname.search('2') >= 0
        ? modbusScrewMachine.coolPumpHzFeedback2
        : tname.search('3') >= 0
        ? modbusScrewMachine.coolPumpHzFeedback3
        : undefined) +
      `</a></div>
		<img  class="LQT_ZHL_img" src="./img/LQT/1.png"/>
			<div class="LQT_ZHL">总耗能 <br /><a>` +
      (tname.search('1') >= 0
        ? modbusScrewMachine.ehTotalEnergy1
        : tname.search('2') >= 0
        ? modbusScrewMachine.ehTotalEnergy2
        : tname.search('3') >= 0
        ? modbusScrewMachine.ehTotalEnergy3
        : undefined) +
      `</a></div>
			
			<div style="position: absolute;left: 300px;top: 195px;">EH进水<br /><a>` +
      (tname.search('1') >= 0
        ? modbusScrewMachine.ehInWaterTemp1
        : tname.search('2') >= 0
        ? modbusScrewMachine.ehInWaterTemp2
        : tname.search('3') >= 0
        ? modbusScrewMachine.ehInWaterTemp3
        : undefined) +
      `℃</a></div>
			<div style="position: absolute;left: 300px;top: 240px;">EH出水<br /><a>` +
      (tname.search('1') >= 0
        ? modbusScrewMachine.ehOutWaterTemp1
        : tname.search('2') >= 0
        ? modbusScrewMachine.ehOutWaterTemp2
        : tname.search('3') >= 0
        ? modbusScrewMachine.ehOutWaterTemp3
        : undefined) +
      `℃</a></div>
			

      <div class="LQT_data">
      <div class="LQT_data_base"><a>冷却系统流量：<a>` +
      modbusScrewMachine.coolSysFlow +
      `P</a></a>
      <div class="LQT_data_base_1"> 系统出水压力：<a>` +
      modbusScrewMachine.coolSysOutletPress +
      `P</a></div></div>
      <div class="LQT_data_base"> <a> 冷却供水温度：<a>` +
      modbusScrewMachine.coolSupWaterTemp +
      `℃</a></a>
      <div class="LQT_data_base_1"> 冷却回水温度：<a>` +
      modbusScrewMachine.coolRetWaterTemp +
      `℃</a></div></div>
      <div class="LQT_data_base"> <a> 冷冻供水温度：<a>` +
      modbusScrewMachine.freezingSupWaterTemp +
      `℃</a></a>
      <div class="LQT_data_base_1"> 冷冻回水温度：<a>` +
      modbusScrewMachine.freezingRetWaterTemp +
      `℃</a></div></div>
    </div>
    <img  id="LQT_out"  class="LQT_loginout"    src = "./img/LQT/8.181.png">

		</div>`
  )

  $('#LQT_out').click(function () {
    addOtherLAbel('LengShuiTa_All', 2, 3)
    labelhidden(CSS3DDeptlabel, 1, 0)
    //    Deptlabel.style.visibility = 'hidden'
  })

  document.getElementById('ktname').innerHTML = tname
  labelshow(CSS3DDeptlabel, 0, 1)
  CSS3DDeptlabel.position.copy(HavingChooseMesh.getWorldPosition())
  CSS3DDeptlabel.scale.set(5, 5, 5)
  CSS3DDeptlabel.position.y += 400
  //CSS3DDeptlabel.element.style.visibility = 'visible'
  scene.add(CSS3DDeptlabel)
}

//工艺水冷外机标签弹出方法
function showGYSWJmessaeg(name, jsonname, tname, HavingChooseMesh) {
  $.changeurl(name, jsonname)
  $.AddData()
  // console.log(modbusScrewMachine)
  $('#AHU').html('')
  $('#AHU').append(
    `
    <div class="GYSWJ_outerClass"> 
			<div id="ktname"  class="GYSWJ_name">工艺水外机</div>
			<div class="GYSWJ_dataclass">
				<div class="GYSWJ_dataclass_class">系统回水温度：<a >` +
      modbusScrewMachine.sysRetWaterTemp +
      `℃</a></div>
				<div class="GYSWJ_dataclass_class">系统出水温度：<a>` +
      modbusScrewMachine.sysOutWaterTemp +
      `℃</a></div>
				<div class="GYSWJ_dataclass_class">EH进水温度：<a>` +
      modbusScrewMachine.ehInWaterTemp +
      `℃</a></div>
				<div class="GYSWJ_dataclass_class">EH出水温度：<a>` +
      modbusScrewMachine.ehOutWaterTemp +
      `℃</a></div>
				<div class="GYSWJ_dataclass_class">系统输出载荷：<a>` +
      modbusScrewMachine.outputLoad +
      `%</a></div>
				<div class="GYSWJ_dataclass_class">EH总能耗：<a>` +
      modbusScrewMachine.ehTotalEnergy +
      `</a></div>
			</div>
			<img class="GYSWJ_imgclass" src="./img/cb230b72c42a4858819216195b08ec34.png"/>
			
			<a class="GYSWJ_SFJ" ></a><br />
			<img class="GYSWJ_SjzT_imgclass" src="./img/黄.png"/>
			<a  class="GYSWJ_SjzT">水机状态:` +
      (modbusScrewMachine.waterplaneStatus == 1 ? '开' : '关') +
      `</a>
      <img class="GYSWJ_YCB_imgclass" src="./img/工艺蓝.png"/>
			<a  class="GYSWJ_YCB">一次泵状态:` +
      (modbusScrewMachine.onePumpStatus == 1 ? '开' : '关') +
      `</a>
			<div class="GYSWJ_Time">运行时间:<a>` +
      modbusScrewMachine.runDay +
      `天` +
      modbusScrewMachine.runHour +
      `时` +
      `</a></div>
      <img  id="LQT_out"  class="GYSWJ_loginout"    src = "./img/LQT/8.181.png">
		</div>
    `
  )

  $('#LQT_out').click(function () {
    addOtherLAbel('ZLBianPingLengQueShuiJiZu_All', 2, 3)
    labelhidden(CSS3DDeptlabel, 1, 0)
  })

  document.getElementById('ktname').innerHTML = tname

  CSS3DDeptlabel.position.copy(HavingChooseMesh.getWorldPosition())
  CSS3DDeptlabel.scale.set(5, 5, 5)
  CSS3DDeptlabel.position.y += 400
  //CSS3DDeptlabel.element.style.visibility = 'visible'
  // CSS3DDeptlabel.element.style.opacity = 0
  scene.add(CSS3DDeptlabel)
  labelshow(CSS3DDeptlabel, 0, 1)
}

function labelshow(CSS3DDeptlabe) {
  CSS3DDeptlabe.element.style.visibility = 'visible'

  var obj = {
    opacity: 0,
  }
  var tween = new TWEEN.Tween(obj) //创建一段tween动画
  tween.to(
    {
      opacity: 1,
    },
    1000
  ) //2秒钟淡入
  tween.onUpdate(function () {
    //动态更新div元素透明度
    CSS3DDeptlabe.element.style.opacity = obj.opacity
  })
  tween.start() //tween动画开始执行
}

function labelhidden(CSS3DDeptlabel) {
  setTimeout(() => {
    CSS3DDeptlabel.element.style.visibility = 'hidden'
  }, 1000)

  var obj = {
    opacity: 1,
  }
  var tween = new TWEEN.Tween(obj) //创建一段tween动画
  tween.to(
    {
      opacity: 0,
    },
    1000
  ) //2秒钟淡入
  tween.onUpdate(function () {
    //动态更新div元素透明度
    CSS3DDeptlabel.element.style.opacity = obj.opacity
  })
  tween.start() //tween动画开始执行
}

//删除线框
function deleteline(findmesh) {
  var havingmesh = scene.getObjectByName(meshName)

  havingmesh.traverse(function (mesh) {
    if (mesh.isMesh) {
      mesh.remove(line)
    }
  })
}
//横切
function plane(e) {
  var Dev = scene.getObjectByName('JiGuangLou')

  if (e == true) {
    Light = true

    // outletopcity = false
    var PlaneArr = [new THREE.Plane(new THREE.Vector3(0, -1, 0), 450)]
    // 设置渲染器的剪裁平面属性

    Dev.traverse(function (obj) {
      if (obj.type == 'Mesh') {
        obj.material.clippingPlanes = PlaneArr
      }
    })
  } else {
    // Light = false
    var PlaneArr = [
      // 垂直y轴的平面
      new THREE.Plane(new THREE.Vector3(0, -1, 0), 20000),
    ]
    // 设置渲染器的剪裁平面属性

    // renderer.clippingPlanes = PlaneArr

    Dev.traverse(function (obj) {
      if (obj.type == 'Mesh') {
        obj.material.clippingPlanes = PlaneArr
      }
    })
  }
}
//删除标签
function deletetag() {
  label = scene.getObjectByName('label')
  if (label) label.parent.remove(label)
}

/**超快楼顶部移动动画 */
function moveFloor(floor, distance) {
  var twofloorposition = scene.getObjectByName(floor)
  twofloorposition.traverse(function (mesh) {
    if (mesh.isMesh) {
      var pos = mesh.position
      var tween = new TWEEN.Tween(pos)
      tween.to(
        {
          z: pos.z + distance,
        },
        3000
      )
      tween.onUpdate(function () {
        mesh.position.z = pos.z
      })
      tween.start()
    }
  })
}
//修改部分材质
function changeMaterial(name) {
  var textrue = scene.getObjectByName(name).material.map
  var alphatextrue = scene.getObjectByName(name).material.alphaMap

  scene.getObjectByName(name).material = new THREE.MeshBasicMaterial({
    alphaMap: alphatextrue,
    map: textrue,
    transparent: true,
    opacity: 1,
    // emissiveMap: textrue,
    // emissiveIntensity: 5,
    // emissive: 0x0000ff,
  })
}

//飞行动画开关
function restartpipe() {
  flyBool = false
  pipe = 0
}
function run(run) {
  if (run) {
    flyPipe = false
  } else {
    flyPipe = true
  }
}
//添加模型到可点击数组中
function AddMeshIntoArr(meshname) {
  var device = scene.getObjectByName(meshname)
  device.traverse(function (obj) {
    if (obj.isMesh) {
      granaryArr.push(obj)
    }
  })
}
//重新添加红色扫光效果
function changeOpacty() {
  const geometry1 = new THREE.TorusGeometry(100, 5, 10, 50)
  const material1 = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    opacity: 0,
    transparent: true,
    emissive: 0x00ffff,
    emissiveIntensity: 5,
    // depthTest: false,
  })
  const torus = new THREE.Mesh(geometry1, material1)
  torus.position.set(0, 0, 1)
  torus.rotation.x = -Math.PI / 2
  const spotLight = new THREE.SpotLight(0xff0000, 10)
  spotLight.castShadow = true
  // torus.add(spotLight)
  torus.name = 'torus'
  scene.add(torus)

  moveadd(torus)
}

var pipe = 0
var opacity

//移动数字柱动画
function moveadd(mesh) {
  opacity = mesh.material.opacity

  var pos = {
    scale: 0.1,
    opacity: 1,
  }
  // var pos = mesh.getWorldPosition()

  var tweenA = new TWEEN.Tween(pos)
  tweenA.to(
    {
      scale: 200,
      opacity: 0,
      // y: pos.y + 5000,
    },
    3000
  )
  tweenA
    .onUpdate(function () {
      mesh.scale.set(pos.scale, pos.scale, 0.5)
      mesh.material.opacity = pos.opacity
      // mesh.position.y = pos.y
    })
    .repeat(Number.MAX_VALUE)
  tweenA.start()
}
//整个场景的渲染
function render() {
  stats.update()
  const delta = 5 * clock.getDelta()
  // mixer.update(clock.getDelta())
  uniforms['time'].value += 0.3 * delta
  // controls.update(clock.getDelta())

  // scene.traverse(darkenNonBloomed)
  // bloomComposer.render()
  // scene.traverse(restoreMaterial)
  renderer.render(scene, camera)
  // finalComposer.render()

  //移动动画开始不停渲染
  TWEEN.update()

  //旋转
  if (rotate) {
    scene.rotation.y += 0.002
  }

  requestAnimationFrame(render)
  labelRender.render(scene, camera)
  label2DRender.render(scene, camera)

  //用于模型自带动画播放
  if (mixer !== null) {
    mixer.update(clock.getDelta() * 4) //更新混合器相关的时间

    // opacity > 0 ? (opacity += -0.05) : (opacity = 1)
    // console.log('opacity: ', opacity)
  }
  //判断飞行开关
  if (flyBool) {
    var dis = camera.position.clone().sub(pos).length()
    // console.log('dis', dis)
    if (dis > 2500) {
      // 接近nextPos位置，相机停止飞行
      //每次渲染相机沿着视线移动距离递增(xyz每个分量乘以4)
      camera.position.add(dir.clone().multiplyScalar(80))
    } else {
      flyBool = false //停止飞行飞行
    }
  } else if (flyPipe) {
    if (pipe < points.length - 100) {
      var i = Math.floor(pipe)
      // 相机位置设置在当前点位置
      camera.position.set(points[i].x, points[i].y, points[i].z)
      // 设置相机观察点为当前点的下一个点，两点可以构成一个视线方向
      // 你可以简单理解为：要始终保持视线为曲线的切线方向
      camera.lookAt(
        new THREE.Vector3(points[i + 1].x, points[i + 1].y, points[i + 1].z)
      )
      pipe += 5 //调节速度
    } else {
      pipe = 0
    }
  }
}

function darkenNonBloomed(obj) {
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material
    obj.material = darkMaterial
  }
}

function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid]
    delete materials[obj.uuid]
  }
}
var curve2 = new THREE.CurvePath()
var arr2 = [
  new THREE.Vector3(3136, 320, 2673), //入口
  new THREE.Vector3(2700, 320, 2673),
  new THREE.Vector3(2700, 320, 2030),
  new THREE.Vector3(2915, 320, 2033), //三入
  new THREE.Vector3(2915, 40, 2033), //三入
  new THREE.Vector3(2915, 40, 2000), //三入
]
// // 从曲线上获得501个顶点，数量根据需要自己设置
var points2 = curve2.getSpacedPoints(3000)

//三号通风管道视线曲线
// 三维样条曲线CatmullRomCurve3创建一个曲线路径
var curve3 = new THREE.CurvePath()
var arr3 = [
  new THREE.Vector3(3100, 320, -575), //入口
  new THREE.Vector3(2670, 320, -575),
  new THREE.Vector3(2670, 320, 1200),
  new THREE.Vector3(2980, 300, 1195),
  new THREE.Vector3(2980, 30, 1195),
  new THREE.Vector3(2980, 30, 1170),
]

// // 从曲线上获得501个顶点，数量根据需要自己设置
var points3 = curve3.getSpacedPoints(5000)

// 三维样条曲线CatmullRomCurve3创建一个曲线路径
var curve4 = new THREE.CurvePath()
var arr4 = [
  new THREE.Vector3(3120, 320, -504),
  new THREE.Vector3(2750, 320, -504),
  new THREE.Vector3(2750, 320, 418),
  new THREE.Vector3(3000, 320, 418),
  new THREE.Vector3(3000, 38, 400),
  new THREE.Vector3(3000, 38, 340),
]

// 从曲线上获得501个顶点，数量根据需要自己设置
var points4 = curve4.getSpacedPoints(2500)

var curve5 = new THREE.CurvePath()
var arr5 = [
  new THREE.Vector3(3118, 320, -1041), //入口
  new THREE.Vector3(2700, 320, -1041),
  new THREE.Vector3(2700, 320, -2008),
  new THREE.Vector3(2950, 320, -2008), //三入
  new THREE.Vector3(2950, 50, -2008), //三入
  new THREE.Vector3(2950, 50, -2064), //三入
]

// 从曲线上获得501个顶点，数量根据需要自己设置
var points5 = curve5.getSpacedPoints(2500)

var curve7 = new THREE.CurvePath()
var arr7 = [
  new THREE.Vector3(3123, 320, -3450), //入口
  new THREE.Vector3(2800, 320, -3450), //一中
  new THREE.Vector3(2800, 320, -2780), //入口
  new THREE.Vector3(3000, 320, -2780), //入口
  new THREE.Vector3(3000, 38, -2810), //
  new THREE.Vector3(3000, 38, -2879), //出口
]

// 从曲线上获得501个顶点，数量根据需要自己设置
var points7 = curve7.getSpacedPoints(2500)

var curve8 = new THREE.CurvePath()

var arr8 = [
  new THREE.Vector3(3123, 320, -3492), //入口
  new THREE.Vector3(2746, 320, -3492),
  new THREE.Vector3(2746, 320, -2850),
  new THREE.Vector3(2550, 320, -2850), //三入
  new THREE.Vector3(2550, 30, -2850), //三入
  new THREE.Vector3(2550, 30, -2966), //三入
]
// 从曲线上获得501个顶点，数量根据需要自己设置
var points8 = curve8.getSpacedPoints(2500)

var R = 90 //圆弧半径

//直线轨迹坐标
var arr = [
  new THREE.Vector3(-2700, 150, 600), //入口
  new THREE.Vector3(-2300, 150, 500), //
  new THREE.Vector3(-2300, 150, -2200), //
  new THREE.Vector3(2300, 150, -2200), //
  new THREE.Vector3(2300, 150, 3750), //
  new THREE.Vector3(-2300, 150, 3750), //
  new THREE.Vector3(-2300, 150, 500), //
  new THREE.Vector3(-2700, 150, 400), //入口
]
var points = []

function createcurve(arr, num) {
  var curve = new THREE.CurvePath()
  // 从曲线上获得501个顶点，数量根据需要自己设置
  // var points = curve.getPoints(6000);
  for (var i = 0; i < arr.length - 1; i++) {
    if (i == 0) {
      var dir = arr[0].clone().sub(arr[1])
      dir.normalize()
      var p2 = arr[1].clone()
      p2.add(dir.clone().multiplyScalar(R))
      var line = new THREE.LineCurve3(arr[0], p2)
      curve.curves.push(line)
    } else {
      // 计算三个点构成的两条线的方向
      var dir1 = arr[i - 1].clone().sub(arr[i])
      dir1.normalize()
      var dir2 = arr[i + 1].clone().sub(arr[i])
      dir2.normalize()
      var p12_ = arr[i].clone()
      p12_.add(dir1.clone().multiplyScalar(R))
      var p1 = arr[i].clone().add(dir1.clone().multiplyScalar(R))
      var p2 = arr[i].clone()
      var p3 = arr[i].clone().add(dir2.clone().multiplyScalar(R))
      var beziercurve = new THREE.QuadraticBezierCurve3(p1, p2, p3)
      var line1 = arr[i].clone()
      line1.add(dir2.clone().multiplyScalar(R))
      var line2 = arr[i + 1].clone()
      if (i < arr.length - 2) {
        //最后一段不用减掉半径尺寸
        line2.add(dir2.clone().multiplyScalar(-R))
      }
      var line = new THREE.LineCurve3(line1, line2)
      // 把转换曲线和直线插入曲线中
      curve.curves.push(beziercurve, line)
    }
  }
  points = curve.getSpacedPoints(num)
}

window.addEventListener('message', function (e) {
  const da = e.data
  if (da.cmd === 'controlBarWidth') {
    let offsetLeft = da.params.offsetLeft
    $('#controllabel').css({ left: offsetLeft })
  }
})

export {
  render,
  setTime,
  deletetag,
  plane,
  addOtherLAbel,
  setTextrueMove,
  changeMaterial,
  AddMeshIntoArr,
  granaryArr,
  moveFloor,
  createcurve,
  arr,
  restartpipe,
  deleteImg,
  deleteAllImglabel,
  moveCaream,
  changeOpacty,
}
