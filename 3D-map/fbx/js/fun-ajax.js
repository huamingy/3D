import { scene } from './light.js'
import * as THREE from '../../build/three.module.js'
import { LineSegments2 } from '../jsm/lines/LineSegments2.js'
import { LineMaterial } from '../jsm/lines/LineMaterial.js'
import { LineGeometry } from '../jsm/lines/LineGeometry.js'
import {
  addlabel,
  AClabel,
  labelRenderer,
  Alabel,
  CSSNameLAbel,
} from './tempeture.js'

var arr = [
  new THREE.Vector3(-143, 140, 390),
  new THREE.Vector3(-143, 140, 190),
  new THREE.Vector3(20, 140, 190),
  new THREE.Vector3(20, 140, 0),
  new THREE.Vector3(0, 140, 18.5),
]

var JiGui03 = [
  new THREE.Vector3(-143, 140, 390),
  new THREE.Vector3(-143, 140, 190),
  new THREE.Vector3(20, 140, 190),
  new THREE.Vector3(20, 140, -60),
  new THREE.Vector3(15, 140, -58.5),
]

var JiGui04 = [
  new THREE.Vector3(-143, 140, 390),
  new THREE.Vector3(-143, 140, 190),
  new THREE.Vector3(20, 140, 190),
  new THREE.Vector3(20, 140, -110),
  new THREE.Vector3(15, 140, -108.5),
]

var F9_JG011 = [
  //0.008
  new THREE.Vector3(-243, 100, 390),
  new THREE.Vector3(195, 100, 390),

  new THREE.Vector3(200, 100, 290),
  new THREE.Vector3(191, 100, 290.5),
]

var F9_JG010 = [
  new THREE.Vector3(-243, 100, 390),
  new THREE.Vector3(195, 100, 390),

  new THREE.Vector3(200, 100, 240),
  new THREE.Vector3(191, 100, 240.5),
]
var F9_JG009 = [
  //0.015
  new THREE.Vector3(-243, 100, 390),
  new THREE.Vector3(195, 100, 390),

  new THREE.Vector3(200, 100, 190),
  new THREE.Vector3(191, 100, 190.8),
]

var F9_JG008 = [
  //0.015
  new THREE.Vector3(-243, 100, 390),
  new THREE.Vector3(195, 100, 390),

  new THREE.Vector3(200, 100, 140),
  new THREE.Vector3(191, 100, 141.5),
]
var F9_JG006 = [
  new THREE.Vector3(-243, 100, 390),
  new THREE.Vector3(195, 100, 390),

  new THREE.Vector3(200, 100, 40),
  new THREE.Vector3(191, 100, 41.1),
]

var F9_JG005 = [
  //0.02
  new THREE.Vector3(-243, 100, 390),
  new THREE.Vector3(195, 100, 390),

  new THREE.Vector3(200, 100, -10),
  new THREE.Vector3(191, 100, -9.1),
]

var F9_JG004 = [
  //0.02
  new THREE.Vector3(-243, 100, 390),
  new THREE.Vector3(195, 100, 390),

  new THREE.Vector3(200, 100, -60),
  new THREE.Vector3(191, 100, -58),
]

var F9_JG003 = [
  //0.02
  new THREE.Vector3(-243, 100, 390),
  new THREE.Vector3(195, 100, 390),

  new THREE.Vector3(200, 100, -110),
  new THREE.Vector3(191, 100, -109.5),
]

var F9_JG002 = [
  //0.02
  new THREE.Vector3(-243, 100, 390),
  new THREE.Vector3(195, 100, 390),

  new THREE.Vector3(200, 100, -210),
  new THREE.Vector3(191, 100, -208),
]

var arrJG = [
  //0.02
  new THREE.Vector3(700, 100, 390),
  new THREE.Vector3(500, 100, 390),

  new THREE.Vector3(500, 100, -10),
  new THREE.Vector3(509, 100, -9),
]

var F9_JG001 = [
  //0.02
  new THREE.Vector3(700, 100, 390),
  new THREE.Vector3(490, 100, 390),

  new THREE.Vector3(490, 100, -60),
  new THREE.Vector3(499, 100, -59),
]

var F9_JG012 = [
  //0.02
  new THREE.Vector3(-260, 100, 390),
  new THREE.Vector3(-170, 100, 390),

  new THREE.Vector3(-170, 100, 140),
  new THREE.Vector3(-179, 100, 140.3),
]

var F9_JG013 = [
  //0.02
  new THREE.Vector3(-260, 100, 390),
  new THREE.Vector3(-170, 100, 390),

  new THREE.Vector3(-170, 100, 40),
  new THREE.Vector3(-179, 100, 40.3),
]

const F2_JG00 = [
  new THREE.Vector3(-243, 110, -260),
  new THREE.Vector3(-143, 110, -260),
  new THREE.Vector3(-143, 110, 235),
  new THREE.Vector3(-90, 110, 235),
  new THREE.Vector3(-97, 110, 250),
]

const F2_JG14 = [
  new THREE.Vector3(-243, 110, -260),
  new THREE.Vector3(-143, 110, -260),
  new THREE.Vector3(-143, 110, 230),
  new THREE.Vector3(-40, 110, 230),
  new THREE.Vector3(-48, 110, 245),
]

const F2_JG13 = [
  new THREE.Vector3(-243, 110, 260),

  // new THREE.Vector3(-143, 110, 230),
  new THREE.Vector3(10, 110, 250),
  new THREE.Vector3(9.5, 110, 265),
]
const F2_JG12 = [
  new THREE.Vector3(-243, 110, 260),
  new THREE.Vector3(60, 110, 240),
  new THREE.Vector3(59.5, 110, 255),
]

const F2_JG11 = [
  new THREE.Vector3(-243, 110, 260),
  new THREE.Vector3(110, 110, 240),
  new THREE.Vector3(109.5, 110, 255),
]
const F2_JG10 = [
  new THREE.Vector3(-243, 110, 260),
  new THREE.Vector3(170, 110, 240),
  new THREE.Vector3(168, 110, 255),
]
const F2_JG09 = [
  new THREE.Vector3(-243, 110, 290),
  new THREE.Vector3(-90, 110, 330),
  new THREE.Vector3(-90, 110, 315),
]
const F2_JG08 = [
  new THREE.Vector3(-243, 110, 290),
  new THREE.Vector3(-50, 110, 330),
  new THREE.Vector3(-52.5, 110, 320),
]
const F2_JG07 = [
  new THREE.Vector3(-243, 110, 290),
  new THREE.Vector3(0, 110, 330),
  new THREE.Vector3(-2.5, 110, 321),
]
const F2_JG06 = [
  new THREE.Vector3(-243, 110, -260),
  new THREE.Vector3(-143, 110, -260),
  new THREE.Vector3(-143, 110, -130),
  new THREE.Vector3(-90, 110, -130),
  new THREE.Vector3(-94, 110, -120),
]
const F2_JG05 = [
  new THREE.Vector3(-243, 110, -260),
  new THREE.Vector3(-143, 110, -260),
  new THREE.Vector3(-143, 110, -130),
  new THREE.Vector3(-30, 110, -130),
  new THREE.Vector3(-35, 110, -120),
]
const F2_JGarr = [
  new THREE.Vector3(-243, 110, 260),
  new THREE.Vector3(-243, 110, 260),
]
const F2_JG04 = [
  new THREE.Vector3(-243, 110, -260),
  new THREE.Vector3(-143, 110, -260),
  new THREE.Vector3(-143, 110, -130),
  new THREE.Vector3(175, 110, -130),
  new THREE.Vector3(165.5, 110, -120),
]

const F2_JG03 = [
  new THREE.Vector3(-243, 110, -260),
  new THREE.Vector3(-143, 110, -260),
  new THREE.Vector3(-143, 110, -30),
  new THREE.Vector3(75, 110, -30),
  new THREE.Vector3(65.5, 110, -40),
]
const F2_JG02 = [
  new THREE.Vector3(-243, 110, -260),
  new THREE.Vector3(-143, 110, -260),
  new THREE.Vector3(-143, 110, -30),
  new THREE.Vector3(120, 110, -30),
  new THREE.Vector3(109.5, 110, -40),
]
const F2_JG01 = [
  new THREE.Vector3(-243, 110, -260),
  new THREE.Vector3(-143, 110, -260),
  new THREE.Vector3(-143, 110, -30),
  new THREE.Vector3(180, 110, -30),
  new THREE.Vector3(168, 110, -40),
]

//  添加单独设备线框
function addline(findmesh) {
  // console.log("进入线框添加");
  var edges = new THREE.EdgesGeometry(findmesh.geometry)
  var geometry = new LineGeometry()
  geometry.fromEdgesGeometry(edges)
  // 3. 创建 LineMaterial，设置颜色和线宽
  var material = new LineMaterial({
    color: 0x31deef,
    linewidth: 4,
  })
  // 4. 设置材质分辨率
  material.resolution.set(window.innerWidth, window.innerHeight)
  // 5. 创建 Line2
  var line = new LineSegments2(geometry, material)
  // line.scale.set(810,810,810)
  line.name = 'line'
  line.position.copy(findmesh.getWorldPosition())
  scene.add(line)
}

// 添加线框
function addline1(findmesh) {
  var edges = new THREE.EdgesGeometry(findmesh.geometry)
  var geometry = new LineGeometry()
  geometry.fromEdgesGeometry(edges)
  // 3. 创建 LineMaterial，设置颜色和线宽
  var material = new LineMaterial({
    color: 0x31deef,
    linewidth: 4,
  })
  // 4. 设置材质分辨率
  material.resolution.set(window.innerWidth, window.innerHeight)
  // 5. 创建 Line2
  var line = new LineSegments2(geometry, material)
  // line.scale.set(810,810,810)
  line.name = 'line1'
  line.position.copy(findmesh.getWorldPosition())
  scene.add(line)
}

// 删除线框方法
function deleline(findmesh) {
  var line = scene.getObjectByName('line')

  scene.remove(line)
}

function deleline1() {
  var line1 = scene.getObjectByName('line1')
  // console.log('line1: ', line1);

  scene.remove(line1)
}
// 展示标签--后期传数据调佣数据库填充
function showlabel(mesh, indent, x, y, z) {
  Alabel.element.style.visibility = 'visible'
  // Alabel.element.style.animationName = 'ball'
  Alabel.position.copy(mesh.getWorldPosition())
  Alabel.scale.set(indent, indent, indent)

  Alabel.position.x = mesh.getWorldPosition().x + x
  Alabel.position.z = mesh.getWorldPosition().z + z
  Alabel.position.y = mesh.getWorldPosition().y + y

  // Alabel.scale.set(5, 5, 5)
}

function showDeptName(me) {
  CSSNameLAbel.element.style.visibility = 'visible'
  CSSNameLAbel.position.copy(me.getWorldPosition())
  CSSNameLAbel.scale.set(0.2, 0.2, 0.2)
}

function movecamera(m) {
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
    x: FloorPosition.x + 160,
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

//机柜移动动画
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

/**添加进入数组 */
function addArry(name, Arry) {
  var dept = scene.getObjectByName(name)
  dept.traverse(function (mesh) {
    if (mesh.isMesh) {
      Arry.push(mesh)
    }
  })
}
/**定位设备，机柜移动 */
function MoveOpacityMesh(JGname, num) {
  const JGMesh = scene.getObjectByName(JGname)
  JGMesh.material.opacity = 0.1
  JGMesh.material.transparent = true

  moveup(JGMesh, num)
}

var points = []
/**跟着确定线路漫游 */
function createcurve(arr, R, num) {
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
  points = curve.getSpacedPoints(3000)
}

var dept, deptNameUrl, URlSE

var URlTEST =
  'http://192.168.108.130:9090/njdt_yw_server/3d-view/get-device-info?deviceNo=S0E31&type=1'
var deptURL =
  'http://192.168.108.130:9090/njdt_yw_server/network-equipment/get-zb-info?deviceNo=JiaoHuanJiS5130'

function addTemHUM(URl) {
  var message
  $.ajax({
    type: 'post',
    url: URl,
    data: message,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      message = data
    },
  })
  $().ready(function () {
    $('#Tvalue1').text(message.data[0].data)

    $('#Hvalue1').text(message.data[1].data)

    $('#Tvalue2').text(message.data[2].data)

    $('#Hvalue2').text(message.data[3].data)
    $('#Tvalue3').text(message.data[4].data)

    $('#Hvalue3').text(message.data[5].data)
    $('#Tvalue4').text(message.data[6].data)

    $('#Hvalue4').text(message.data[7].data)
  })
}
// 温湿度获取数据

// 空调等设备弹出标签数据
var SE031msg
$.extend({
  SE031taglabel: function () {
    $('#tagName').text(SE031msg.data[0].tagName)
    $('#latestValue').text(SE031msg.data[0].latestValue)
    // $("#tname").text(SE031msg.data[1].tagName)
    // $("#tvalue").text(SE031msg.data[1].latestValue)
  },
  chURL: function (num) {
    URlSE = URlTEST.replace(/31/, num)
  },
  Change: function (name) {
    dept = deptURL.replace(/JiaoHuanJiS5130/, name)
  },
  Changename: function (name) {
    deptNameUrl = deptURL.replace(/JiaoHuanJiS5130/, name)
  },
})

function changeURL(num) {
  $.chURL(num)
  $.ajax({
    type: 'post',
    url: URlSE,
    data: SE031msg,
    dataType: 'json',
    async: false,
    success: function (data) {
      SE031msg = data
    },
  })
  $('#nr').html('')
  SE031msg.data.sort().reverse()

  $.each(SE031msg.data, function (iteam, index) {
    if (index.latestValue == 0) {
    } else {
      if (iteam % 2 == 0) {
        $('#nr').prepend(
          '<div class="TH_tagname_out">' +
            '<div class="TH_tagname" >' +
            index.tagName +
            '</div><div  class="TH_name_value">' +
            index.latestValue +
            '</div></div>'
        )
      } else if (iteam % 2 == 1) {
        $('#nr').prepend(
          '<div  class="TH_name_out2">' +
            '<div class="TH_tagname"  >' +
            index.tagName +
            '</div>' +
            '<div  class="TH_name_value">' +
            index.latestValue +
            '</div></div>'
        )
      }
    }
  })
}

// 独立设备

var deptdata
function exchageURL(name) {
  // console.log('dept: ', dept);
  $.Change(name)

  $.ajax({
    type: 'post',
    url: dept,

    data: deptdata,
    dataType: 'json',
    async: false,
    success: function (data) {
      deptdata = data
    },
  })
  if (deptdata.data == null) {
    $('#2Dname').text(0)
    $('#cpuPjLyl').text(0)
    $('#fsDbl').text(0)
    $('#xySj').text(0)
    $('#ttl').text(0)
    $('#ncLyl').text(0)
    $('#gbBl').text(0)
    $('#dbl').text(0)
    $('#fsGbBl').text(0)
    $('#ncLyl').text(0)
  } else {
    $('#2Dname').text(deptdata.data.deviceName)
    $('#cpuPjLyl').text(deptdata.data.cpuPjLyl)
    $('#fsDbl').text(deptdata.data.fsDbl)
    $('#xySj').text(deptdata.data.xySj)
    $('#ttl').text(deptdata.data.ttl)
    $('#ncLyl').text(deptdata.data.ncLyl)
    $('#gbBl').text(deptdata.data.gbBl)
    $('#dbl').text(deptdata.data.dbl)
    $('#fsGbBl').text(deptdata.data.fsGbBl)
    $('#ncLyl').text(deptdata.data.ncLyl)
  }
}

var deptName
function changenameURL(name) {
  $.Changename(name)

  $.ajax({
    type: 'post',
    url: deptNameUrl,

    data: deptName,
    dataType: 'json',
    async: false,
    success: function (data) {
      deptName = data
    },
  })

  console.log('deptName: ', deptName)
  $('#DeptName').text(deptName.data.deviceName)
}

export {
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
}
export { JiGui03, JiGui04, arr }
export {
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
}
export {
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
}
