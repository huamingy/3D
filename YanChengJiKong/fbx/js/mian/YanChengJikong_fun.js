import * as THREE from '../../../build/three.module.js'
import { CSS3DSprite, CSS3DObject } from '../../jsm/renderers/CSS3DRenderer.js'
import { CSS2DObject } from '../../jsm/renderers/CSS2DRenderer.js'

import {
  labelRenderer,
  scene,
  renderer,
  camera,
  controls,
  CSS2DlabelRender,
} from './YanChengJikong_scene.js'
import { rotate } from './YanChengJikong_Btn.js'

import { Spinner } from '../spin.js'
var opts = {
  lines: 12, // 菊花瓣的数目
  length: 7, // 菊花瓣的长度
  width: 4, // 菊花瓣的宽度
  radius: 10, // 菊花中心的半径
  corners: 1, // 菊花瓣的圆滑度(0--1)
  rotate: 0, // 让菊花旋转的角度
  color: '#000', // 菊花的颜色
  speed: 1.6, // 菊花旋转的速度
  trail: 58, // 菊花旋转时的余辉
  shadow: false, // 是否需要菊花的阴影
  hwaccel: false, // 是否需要菊花高速旋转(硬件加速)
  className: 'spinner', // 菊花的classname
  zIndex: 2e9, // 菊花的z-index值
  top: 'auto', // 菊花相对定位的top
  left: 'auto', // 菊花相对定位的left
  position: 'relative',
}

var target = document.getElementById('foo')
var Spin = new Spinner({ color: '#fff', lines: 12 })

// import { ThreeVAVLabelgroup, TwoModbusBmsLabel } from './YanChengJikong_2F.js'
var granaryArr = [],
  PrimaryMesh = []

var url = decodeURI(window.location.href)
console.log('url: ', url)
var argsIndex = url.split('?view=')
console.log('argsIndex: ', argsIndex[1])
var acceptName = argsIndex[1]

if (acceptName == 0) {
  $('#controllabel').css({ left: 80 })
} else if (acceptName == 1) {
  $('#controllabel').css({ left: 400 })
}

var faultdata
window.addEventListener('message', function (e) {
  const da = e.data
  if (da.cmd === 'showFaultDevice') {
    faultdata = da.params
    console.log('故障传回数据', faultdata)
    addfaultLabel(faultdata.deviceName, faultdata.details, faultdata.floor)
  }
})
// var faultdata = {
//   deviceName: 'PAU2-6',
//   details: '排风故障',
// }
// $('#test').click(function () {
//   addfaultLabel(faultdata.deviceName, faultdata.details)
// })

/**封装一个延时方法，3秒内只能点击一次 */
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
      console.log('三秒未到不允许点击')
    }
  },
}
/**点击触发向上移动动画 */

/**移动动画 */
var floor
function addfaultLabel(deviceName, details, devfloor) {
  console.log('details.substr(0, 2): ', details.substr(0, 2))
  if (details.search('4-') >= 0 && devfloor == 2) {
    if (CSS3DfaultLabel) {
      console.log('a')
      CSS3DfaultLabel.parent.remove(CSS3DfaultLabel)
    }
    setTimeout("alert('该楼层无此设备')", 1000)
    floor = null
  } else if (details.substr(0, 2) == '排风' || details.substr(0, 2) == '补风') {
    var mun = details.substr(0, details.length - 2)
    floor = 'PF' + mun.substr(2, details.length)
  } else if (details.substr(0, 2) != '排风' || details.substr(0, 2) != '补风') {
    floor = deviceName.replace(/-/g, '_')
  }
  console.log('floor:', floor)
  var twofloorposition = scene.getObjectByName(floor)
  if (twofloorposition == undefined && floor != null) {
    if (CSS3DfaultLabel) {
      CSS3DfaultLabel.parent.remove(CSS3DfaultLabel)
    }
    setTimeout("alert('该楼层无此设备')", 1000)
  }
  $('#fault-out').html('')
  $('#fault-out').append(`<div id="fault"   >
  
  <img src="././img/故障 .png">
  </div>`)

  CSS3DfaultLabel.scale.set(0.1, 0.1, 0.1)
  CSS3DfaultLabel.position.copy(twofloorposition.getWorldPosition())
  scene.add(CSS3DfaultLabel)
}
var faultLabel = document.getElementById('fault-out')
var CSS3DfaultLabel = new CSS3DSprite(faultLabel)
addEventListener('dblclick', function () {
  if (faultdata) {
    if (CSS3DfaultLabel) {
      CSS3DfaultLabel.parent.remove(CSS3DfaultLabel)
    }
  }
})

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
      y: 881,
      z: 0,
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

/**添加环境贴图 */
function addEvnmap(Floor) {
  const textureLoader = new THREE.TextureLoader()
  var evnmap = textureLoader.load('././img/construction_yard01_2k.png')

  evnmap.mapping = THREE.EquirectangularReflectionMapping
  evnmap.encoding = THREE.sRGBEncoding

  var fool = scene.getObjectByName(Floor)
  fool.material = new THREE.MeshStandardMaterial({
    map: fool.material.map,
    envMapIntensity: 2,

    envMap: evnmap,
    roughness: 0.1,
  })
}

/**UV贴图移动 */
var speednum
function changespeed(num) {
  speednum = num
}
钱
var changecube
function addtexture(pipe, num, color) {
  var cube = scene.getObjectByName(pipe)
  if (changecube == cube) {
    speednum = num
    if (speednum == 0) {
      removefireText()
      cube.material.visible = false
    } else if (speednum == 0.0005) {
      cube.material.visible = true

      addFireText()
    }
  } else {
    speednum = num

    changecube = cube

    // var textureLoader = new THREE.TextureLoader();
    // var texture0 = textureLoader.load('./models/jt.jpg');
    var texturemap = cube.material.map
    var textureemissive = cube.material.emissiveMap
    cube.material = new THREE.MeshPhysicalMaterial({
      emissive: color, // emissive默认黑色，设置为白色
      emissiveMap: textureemissive,
      map: texturemap,
      opacity: 0.8,
      transparent: true,
      side: THREE.DoubleSide,
    })

    if (speednum == 0) {
      cube.material.visible = false
    } else if (speednum == 0.0005) {
      cube.material.visible = true
      addFireText()
    }

    setInterval(() => {
      texturemap.offset.y -= speednum
    })
  }
}

function addFireText() {
  $('body').append(`
  <div   id = "fireLabel" class= "fireClass" >
  <span class="blink">火警报警</span>
  
  </div>
  `)

  var FireLabel = document.getElementById('fireLabel')
  var CSS3DFireLabel = new CSS3DSprite(FireLabel)

  CSS3DFireLabel.name = 'nnn'
  CSS3DFireLabel.position.set(0, 0, 0)
  scene.add(CSS3DFireLabel)
}
function removefireText() {
  var fireLabelremove = scene.getObjectByName('nnn')
  if (fireLabelremove) fireLabelremove.parent.remove(fireLabelremove)
}

/**添加电表箱定位 */
function addLabelimg(meshname) {
  var mesh = scene.getObjectByName(meshname)

  $('body').append(
    `<div id = "` + mesh.name + `"><img src = "././img/定位.png"></div>`
  )

  var tag = document.getElementById(mesh.name)
  var meshLabel = new CSS3DSprite(tag)
  meshLabel.name = mesh.name + 'n'
  meshLabel.position.copy(mesh.getWorldPosition())
  meshLabel.element.style.visibility = 'visible'

  meshLabel.scale.set(0.1, 0.1, 0.1)
  meshLabel.position.y += 20
  scene.add(meshLabel)

  $('#' + mesh.name).click(function () {
    movecamera(meshname, meshname.replace(/Body/, 'DoorAll'))
    hiddenLabelimg(meshname)
  })
}

/*添加相机图标 */
var cameraimg = null,
  meshimg = null
function addCameraImg(meshname, imgName) {
  var Camera = scene.getObjectByName(meshname)
  Camera.traverse(function (mesh) {
    if (mesh.isMesh) {
      $('body').append(
        `<div id = "` +
          mesh.name +
          `qw"><img   id="img` +
          mesh.name +
          `" src = "././img/` +
          imgName +
          `"   title = "` +
          mesh.name +
          `"></div>`
      )

      var tag = document.getElementById(mesh.name + 'qw')
      var meshLabel = new CSS3DSprite(tag)
      meshLabel.name = mesh.name + 'mm'
      meshLabel.position.copy(mesh.getWorldPosition())
      meshLabel.element.style.visibility = 'visible'

      meshLabel.scale.set(0.08, 0.08, 0.08)
      meshLabel.position.y += 10
      scene.add(meshLabel)

      $('#' + mesh.name + 'qw').click(function () {
        if (meshname == '3F_VAV') {
          addVAVLabel(mesh.name, mesh.name, mesh)
        } else {
          if (meshimg == null) {
            addVideo(mesh.name, mesh)
            $('#img' + mesh.name).attr('src', '././img/摄像3.png')
            cameraimg = $('#img' + mesh.name)

            meshimg = mesh.name
          } else if (meshimg != mesh.name) {
            cameraimg.attr('src', '././img/摄像头2.png')
            addVideo(mesh.name, mesh)
            $('#img' + mesh.name).attr('src', '././img/摄像3.png')
            cameraimg = $('#img' + mesh.name)
            meshimg = mesh.name
          } else if (meshimg == mesh.name) {
            $('#img' + mesh.name).attr('src', '././img/摄像头2.png')

            stopAllPreview()
          }
        }
      })

      tag.onpointermove = function () {
        scene.getObjectByName(mesh.name + 'mm').scale.set(0.15, 0.15, 0.15)
      }
      tag.onpointerleave = function () {
        scene.getObjectByName(mesh.name + 'mm').scale.set(0.08, 0.08, 0.08)
      }
    }
  })
}

function deleteCameraImg(meshname) {
  if (meshname == '3F_VAV') {
    VAV_nametag.style.visibility = 'hidden'
  }

  var Camera = scene.getObjectByName(meshname)
  Camera.traverse(function (mesh) {
    var CameraImgLabel = scene.getObjectByName(mesh.name + 'mm')
    if (CameraImgLabel) CameraImgLabel.parent.remove(CameraImgLabel)
  })
}

function hiddenLabelimg(meshname) {
  scene.getObjectByName(meshname + 'n').element.style.visibility = 'hidden'
}
/**向点击的数组添加的 */
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
  console.log('granaryArr: ', granaryArr)
}
/**单击数组去掉东西 */
function delteFromArr(value, Arr) {
  console.log('granaryArr: ', granaryArr)
  var AArr
  if (Arr == 'granaryArr') {
    AArr = granaryArr
  } else if (Arr == 'PrimaryMesh') {
    AArr = PrimaryMesh
  }
  for (var i = 0; i < AArr.length; i++) {
    if (AArr[i].name == value) {
      AArr.splice(i, 1)
    }
  }
}

/**展示温湿度数据 */
function showlabel(meshname, chooseMesh) {
  console.log(meshname)
}

/**随机添加门禁 */
function addDoorLabel(MeshName, labelName) {
  var Door = scene.getObjectByName(MeshName)
  // Door.traverse(function(obj) {

  for (const i in Door.children) {
    $('body').append(
      '<div id="' +
        Door.children[i].name +
        '" class="labelclass"><div id="" class="label_center">' +
        ' <div class = "' +
        (Math.floor(Math.random() * 2) == 0
          ? 'DoorClassred'
          : 'DoorClassgreen') +
        '">' +
        Door.children[i].name +
        '</div></div > '
    )
    var Doortag = document.getElementById(Door.children[i].name)
    var Doorlabel = new CSS3DSprite(Doortag)
    Doorlabel.name = labelName
    Doorlabel.element.style.visibility = 'visible'
    Doorlabel.position.copy(Door.children[i].getWorldPosition())
    Doorlabel.scale.set(0.1, 0.1, 0.1)
    scene.add(Doorlabel)
  }

  // })
}
/**隐藏所有设备 */
function hiddenmesh(meshgroupname) {
  scene.getObjectByName(meshgroupname).traverse(function (mesh) {
    if (mesh.isMesh) {
      mesh.visible = false
    }
  })
}

/**显示所有设备 */
function Showmesh(meshgroupname) {
  scene.getObjectByName(meshgroupname).traverse(function (mesh) {
    if (mesh.isMesh) {
      mesh.visible = true
    }
  })
}

/**隐藏门禁标签 */
function hiddenDoorLabel(MeshName, labelName) {
  var Door = scene.getObjectByName(MeshName)
  Door.traverse(function (obj) {
    var Doorlabel = scene.getObjectByName(labelName)
    scene.remove(Doorlabel)
  })
}

var tag = document.getElementById('label')
var label = new CSS3DSprite(tag)

scene.add(label)
var controllabel = document.getElementById('controllabel')
var controllabellabel = new CSS3DSprite(controllabel)

function hiddenLabel(arr) {
  scene.getObjectByName(arr).traverse(function (mesh) {
    var index = scene.getObjectByName(mesh.name + 'n')

    if (index) index.parent.remove(index)
  })
}

var videostart = document.getElementById('video')
var videostartcontrol = new CSS2DObject(videostart)

//预选改变颜色
var changecolorMesh
function pointermove(event) {
  if (
    changecolorMesh != null &&
    (changecolorMesh.parent.name == '3F_Camera' ||
      changecolorMesh.parent.name == '2F_Camera')
  ) {
    changecolorMesh.material.color.set(0x00ffff)
    changecolorMesh.scale.set(0.052, 0.052, 0.052)
  } else if (
    changecolorMesh != null &&
    (changecolorMesh.parent.name != '3F_Camera' ||
      changecolorMesh.parent.name != '2F_Camera')
  ) {
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

    if (
      changecolorMesh.parent.parent.name == '3F_TFG' ||
      changecolorMesh.parent.name == '3F_VAV'
    ) {
      changecolorMesh.material.color.set(0x00ffff)
    } else if (changecolorMesh.parent.name == '9F_JG_Opacity') {
      changecolorMesh.material.emissive.set(0x33ffff)
    } else if (
      changecolorMesh.parent.name == '3F_Camera' ||
      changecolorMesh.parent.name == '2F_Camera'
    ) {
      changecolorMesh.scale.set(0.15, 0.15, 0.15)
      changecolorMesh.material.color.set(0x444444)
    }
  }
}

addEventListener('pointermove', pointermove)

var chooseMesh = null,
  chooseMeshecolor

/**单击选择模型 */
function choose(event) {
  //设置定时器

  if (
    chooseMesh &&
    (chooseMesh.parent.parent.name == '3F_DLJ' ||
      chooseMesh.parent.parent.name == '2F_DLJ')
  ) {
  } else if (chooseMesh) {
    label.element.style.visibility = 'hidden'
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
    // hiddenLabel(LabelArr)
    // rotate = false
    // chooseMesh.material.color.set(0xffffff)
    if (chooseMesh.name == 'AHU_2_1') {
      changeURL(
        'modbusType=modbusBms2f13',
        'ModbusBms2f13',
        chooseMesh.name,
        chooseMesh
      )
    } else if (chooseMesh.name == 'MAU_2_1') {
      changeURL(
        'modbusType=modbusBms2f2',
        'ModbusBms2f2',
        chooseMesh.name,
        chooseMesh
      )

      //fly(chooseMesh)
    } else if (chooseMesh.name == 'MAU_2_2') {
      changeURL(
        'modbusType=modbusBms2f4',
        'ModbusBms2f4',
        chooseMesh.name,
        chooseMesh
      )
      //fly(chooseMesh)
    } else if (chooseMesh.name == 'MAU_2_3') {
      changeURL(
        'modbusType=modbusBms2f7',
        'ModbusBms2f7',
        chooseMesh.name,
        chooseMesh
      )
      //fly(chooseMesh)
    } else if (chooseMesh.name == 'MAU_2_4') {
      changeURL(
        'modbusType=modbusBms2f8',
        'ModbusBms2f8',
        chooseMesh.name,
        chooseMesh
      )
      //fly(chooseMesh)
      showlabel(chooseMesh.name, chooseMesh)
    } else if (chooseMesh.name == 'MAU_2_5') {
      changeURL(
        'modbusType=modbusBms2f9',
        'ModbusBms2f9',
        chooseMesh.name,
        chooseMesh
      )
      //fly(chooseMesh)
    } else if (chooseMesh.name == 'MAU_2_6') {
      changeURL(
        'modbusType=modbusBms2f11',
        'ModbusBms2f11',
        chooseMesh.name,
        chooseMesh
      )
      //fly(chooseMesh)
    } else if (chooseMesh.name == 'MAU_2_7') {
      changeURL(
        'modbusType=modbusBms2f12',
        'ModbusBms2f12',
        chooseMesh.name,
        chooseMesh
      )
      //fly(chooseMesh)
    } else if (chooseMesh.name == 'PAU_2_1') {
      changeURL(
        'modbusType=modbusBms2f1',
        'ModbusBms2f1',
        chooseMesh.name,
        chooseMesh
      )
      //fly(chooseMesh)
    } else if (chooseMesh.name == 'PAU_2_2') {
      changeURL(
        'modbusType=modbusBms2f3',
        'ModbusBms2f3',
        chooseMesh.name,
        chooseMesh
      )
    } else if (chooseMesh.name == 'PAU_2_3') {
      changeURL(
        'modbusType=modbusBms2f5',
        'ModbusBms2f5',
        chooseMesh.name,
        chooseMesh
      )
      //fly(chooseMesh)
    } else if (chooseMesh.name == 'PAU_2_4') {
      changeURL(
        'modbusType=modbusBms2f6',
        'ModbusBms2f6',
        chooseMesh.name,
        chooseMesh
      )
      //fly(chooseMesh)
    } else if (chooseMesh.name == 'PAU_2_5') {
      changeURL(
        'modbusType=modbusBms2f10',
        'ModbusBms2f10',
        chooseMesh.name,
        chooseMesh
      )
      //fly(chooseMesh)
    } else if (chooseMesh.name == 'AHU_3_1') {
      changeURL(
        'modbusFloor=3f&&modbusType=modbusBms3f5',
        'ModbusBms3f5',
        chooseMesh.name,
        chooseMesh
      )
      //fly(chooseMesh)
    } else if (chooseMesh.name == 'AHU_3_2') {
      changeURL(
        'modbusFloor=3f&&modbusType=modbusBms3f7',
        'ModbusBms3f7',
        chooseMesh.name,
        chooseMesh
      )
      //fly(chooseMesh)
    } else if (
      chooseMesh.parent.name == '3F_Camera' ||
      chooseMesh.parent.name == '2F_Camera'
    ) {
      addVideo(chooseMesh.name, chooseMesh)
    } else if (chooseMesh.parent.name == '3F_VAV') {
      var modbustype =
        chooseMesh.name.slice(0, 1).toLowerCase() + chooseMesh.name.slice(1, 12)
      addVAVLabel(
        'modbusFloor=3f&&modbusType=' + modbustype,
        chooseMesh.name,
        chooseMesh.name,
        chooseMesh
      )
    } else if (
      chooseMesh.parent.parent.name == '3F_DLJ' ||
      chooseMesh.parent.parent.name == '2F_DLJ'
    ) {
      var Threename = [
        '2-3',
        '2-4',
        '2-5',
        '2-6',
        '2-7',
        '2-8',
        '2-9',
        '3-3',
        '3-4',
        '3-5',
        '3-6',
        '3-7',
        '3-8',
        '3-9',
      ]
      var Fourname = ['2-10', '2-11', '3-11', '3-10']

      /**外机数在个位 */
      var indoorName = chooseMesh.name.substr(0, 3)
      /**外机数在十位 */
      var indoorName_four = chooseMesh.name.substr(0, 4)

      /**外机数在个位且内机排名在个位 */
      var indoorId = chooseMesh.name.slice(-1)
      /**外机数在十位且内机排在十位 */
      var indoorId_four = chooseMesh.name.slice(-2)
      // chooseMeshecolor = chooseMesh.material.color

      if (Threename.indexOf(indoorName) >= 0 && chooseMesh.name.length == 5) {
        addKT_AirLabel(
          `indoorName=` + indoorName + `&indoorId=` + (Number(indoorId) + 1),

          indoorName + '-' + (Number(indoorId) + 1),
          chooseMesh
        )
      } else if (
        Threename.indexOf(indoorName) >= 0 &&
        chooseMesh.name.length == 6
      ) {
        addKT_AirLabel(
          `indoorName=` +
            indoorName +
            `&indoorId=` +
            (Number(indoorId_four) + 1),

          indoorName + '-' + (Number(indoorId_four) + 1),
          chooseMesh
        )
      } else if (
        Fourname.indexOf(indoorName_four) >= 0 &&
        chooseMesh.name.length == 6
      ) {
        addKT_AirLabel(
          `indoorName=` +
            indoorName_four +
            `&indoorId=` +
            (Number(indoorId) + 1),

          indoorName_four + '-' + (Number(indoorId) + 1),
          chooseMesh
        )
      } else if (
        Fourname.indexOf(indoorName_four) >= 0 &&
        chooseMesh.name.length == 7
      ) {
        addKT_AirLabel(
          `indoorName=` +
            indoorName_four +
            `&indoorId=` +
            (Number(indoorId_four) + 1),

          indoorName_four + '-' + (Number(indoorId_four) + 1),
          chooseMesh
        )
      }
    } else if (
      chooseMesh.parent.name == '2F_PDB_Click' ||
      chooseMesh.parent.name == '3F_PDB_Click'
    ) {
      achieveDianBiaoData(chooseMesh.name, chooseMesh, chooseMesh.name)
    } else if (chooseMesh.parent.parent.name == '3F_TFG') {
      // movecamera(chooseMesh.name)
      // chooseMesh.scale.set(0.5, 0.5, 0.5)
      addTFGData(
        'clientCode=' + chooseMesh.name,
        chooseMesh.parent.name,
        chooseMesh,
        chooseMesh.name
      )
    }
  }
}
addEventListener('click', choose) // 监听窗口鼠标单击事件,鼠标单击选中某个国家Mesh
// addEventListener('pointermove',preselection);
window.addEventListener('message', function (e) {
  const da = e.data
  if (da.cmd === 'controlBarWidth') {
    let offsetLeft = da.params.offsetLeft
    $('#controllabel').css({ left: offsetLeft })
  }
})
/**通风柜数据 */
var changeTFG, modbusBmsvalueTFG, modbusBmsvalueTFG
function addTFGData(UrlName, GroupName, chooseMesh, meshname) {
  var GroupNameType = GroupName.slice(0, chooseMesh.parent.name.length - 3)
  var TFGnumber = GroupName.slice(-2)

  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusFloor=3f',
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusBmsvalueTFG = data.data

      // console.log('modbusBmsvalueTFG: ', modbusBmsvalueTFG)
    },
  })

  for (const i in modbusBmsvalueTFG) {
    if (i == GroupNameType) {
      $('#TFG').html('')
      switch (TFGnumber) {
        case '01':
          $('#TFG').append(
            `
            <div  class = "TFG_data_out">
            <div class="TFGdata_name_class">设备开关状态</div>
            <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg1Bit0 == 1 ? '开' : '关') +
              `</a>
          </div>
          <div   class = "TFG_data_out">
            <div class="TFGdata_name_class">待机节能状态</div>
            <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg1Bit1 == 1 ? '开' : '关') +
              `</a>
          </div>


            <div   class = "TFG_data_out">
            <div class="TFGdata_name_class">紧急排风状态</div>
            <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg1Bit2 == 1 ? '开' : '关') +
              `</a>
          </div>
          <div   class = "TFG_data_out">
          <div class="TFGdata_name_class">最小排风指示</div>
          <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg1Bit3 == 1 ? '开' : '关') +
              `</a>
          </div>
          <div   class = "TFG_data_out">
            <div class="TFGdata_name_class">柜面风速</div>
            <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg1Speed == (undefined || null)
                ? '无'
                : modbusBmsvalueTFG[i].tfg1Speed) +
              `</a>
          </div>
          <div   class = "TFG_data_out">
          <div class="TFGdata_name_class">柜门高</div>
          <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg1Height == undefined
                ? '无'
                : modbusBmsvalueTFG[i].tfg1Height) +
              `</a>
          </div>

              
              <img  id="TFG_out"  class="waiJi_loginout"    src = "././img/8.181.png">`
          )
          break
        case '02':
          $('#TFG').append(
            `
            <div  class = "TFG_data_out">
            <div class="TFGdata_name_class">设备开关状态</div>
            <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg2Bit0 == 1 ? '开' : '关') +
              `</a>
          </div>
          <div   class = "TFG_data_out">
            <div class="TFGdata_name_class">待机节能状态</div>
            <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg2Bit1 == 1 ? '开' : '关') +
              `</a>
          </div>


            <div   class = "TFG_data_out">
            <div class="TFGdata_name_class">紧急排风状态</div>
            <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg2Bit2 == 1 ? '开' : '关') +
              `</a>
          </div>
          <div   class = "TFG_data_out">
          <div class="TFGdata_name_class">最小排风指示</div>
          <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg2Bit3 == 1 ? '开' : '关') +
              `</a>
          </div>
          <div   class = "TFG_data_out">
            <div class="TFGdata_name_class">柜面风速</div>
            <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg2Speed == (undefined || null)
                ? '无'
                : modbusBmsvalueTFG[i].tfg2Speed) +
              `</a>
          </div>
          <div   class = "TFG_data_out">
          <div class="TFGdata_name_class">柜门高</div>
          <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg2Height == undefined
                ? '无'
                : modbusBmsvalueTFG[i].tfg2Height) +
              `</a>
          </div>

              
              <img  id="TFG_out"  class="waiJi_loginout"    src = "././img/8.181.png">`
          )
          break

        case '03':
          $('#TFG').append(
            `
            <div  class = "TFG_data_out">
            <div class="TFGdata_name_class">设备开关状态</div>
            <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg3Bit0 == 1 ? '开' : '关') +
              `</a>
          </div>
          <div   class = "TFG_data_out">
            <div class="TFGdata_name_class">待机节能状态</div>
            <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg3Bit1 == 1 ? '开' : '关') +
              `</a>
          </div>


            <div   class = "TFG_data_out">
            <div class="TFGdata_name_class">紧急排风状态</div>
            <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg3Bit2 == 1 ? '开' : '关') +
              `</a>
          </div>
          <div   class = "TFG_data_out">
          <div class="TFGdata_name_class">最小排风指示</div>
          <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg3Bit3 == 1 ? '开' : '关') +
              `</a>
          </div>
          <div   class = "TFG_data_out">
            <div class="TFGdata_name_class">柜面风速</div>
            <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg3Speed == (undefined || null)
                ? '无'
                : modbusBmsvalueTFG[i].tfg3Speed) +
              `</a>
          </div>
          <div   class = "TFG_data_out">
          <div class="TFGdata_name_class">柜门高</div>
          <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg3Height == undefined
                ? '无'
                : modbusBmsvalueTFG[i].tfg3Height) +
              `</a>
          </div>

              
              <img  id="TFG_out"  class="waiJi_loginout"    src = "././img/8.181.png">`
          )
          break
        case '04':
          $('#TFG').append(
            `
            <div  class = "TFG_data_out">
            <div class="TFGdata_name_class">设备开关状态</div>
            <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg4Bit0 == 1 ? '开' : '关') +
              `</a>
          </div>
          <div   class = "TFG_data_out">
            <div class="TFGdata_name_class">待机节能状态</div>
            <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg4Bit1 == 1 ? '开' : '关') +
              `</a>
          </div>


            <div   class = "TFG_data_out">
            <div class="TFGdata_name_class">紧急排风状态</div>
            <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg4Bit2 == 1 ? '开' : '关') +
              `</a>
          </div>
          <div   class = "TFG_data_out">
          <div class="TFGdata_name_class">最小排风指示</div>
          <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg4Bit3 == 1 ? '开' : '关') +
              `</a>
          </div>
          <div   class = "TFG_data_out">
            <div class="TFGdata_name_class">柜面风速</div>
            <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg4Speed == (undefined || null)
                ? '无'
                : modbusBmsvalueTFG[i].tfg4Speed) +
              `</a>
          </div>
          <div   class = "TFG_data_out">
          <div class="TFGdata_name_class">柜门高</div>
          <a class="TFG_data">` +
              (modbusBmsvalueTFG[i].tfg3Height == (undefined || null)
                ? '无'
                : modbusBmsvalueTFG[i].tfg3Height) +
              `</a>
          </div>

              
              <img  id="TFG_out"  class="waiJi_loginout"    src = "././img/8.181.png">`
          )
          break
      }

      $('#TFG_name').text(TFGnumber)

      TFGlabel.position.copy(chooseMesh.getWorldPosition())

      TFGlabel.scale.set(0.4, 0.4, 0.4)
      TFGtag.style.visibility = 'visible' //显示标签

      $('#TFG_out').click(function () {
        TFGtag.style.visibility = 'hidden'
      })
    }
  }
}
var TFGtag = document.getElementById('TFG_label')
var TFGlabel = new CSS3DSprite(TFGtag)
scene.add(TFGlabel)

/**添加机柜温湿度数据 */
function addTHLAbel(groupname) {
  var SJGValue
  scene.getObjectByName(groupname).children.forEach(function (a, b) {
    if (a.name != 'terminal' && a.name != 'terminal001') {
      $.ajax({
        type: 'get',
        url:
          'http://221.6.30.202:15007/prod-api/cabinet/api/getHumitureList?clientCode=' +
          a.name,

        dataType: 'json',
        async: false, //默认为true 异步
        success: function (data) {
          SJGValue = data.data
          // console.log('SJGValue: ', SJGValue)
        },
      })

      $('body').append(
        `<div   class = "SJGClass"   id="SJG_` +
          b +
          `">
      <div class = "SJGtem">温度</div>
      <div class = "SJGhum">` +
          (Math.random() * 20).toFixed(1) +
          `</div>
      <div class = "SJGtem">湿度</div>
      <div class = "SJGhum">` +
          (Math.random() * 20).toFixed(1) +
          `</div>
      </div>`
      )

      var SJG_tag = document.getElementById('SJG_' + b)

      var SJG_taglabel = new CSS3DSprite(SJG_tag)
      SJG_taglabel.name = 'n' + a.name
      SJG_taglabel.scale.set(0.08, 0.08, 0.08)
      SJG_taglabel.position.copy(a.getWorldPosition())
      scene.add(SJG_taglabel)
      SJG_tag.onpointermove = function () {
        SJG_taglabel.scale.set(0.9, 0.9, 0.9)
        // dxtlabel.position.y += 50
      }
      SJG_tag.onpointerleave = function () {
        SJG_taglabel.scale.set(0.08, 0.08, 0.08)
        // dxtlabel.position.y -= 50
      }
    }
  })
}
/**'通过参数移除标签 */
function HiddenTHLAbel(groupname) {
  scene.getObjectByName(groupname).children.forEach(function (a, b) {
    if (scene.getObjectByName('n' + a.name)) {
      scene
        .getObjectByName('n' + a.name)
        .parent.remove(scene.getObjectByName('n' + a.name))
    }
  })
}

/***/
var DIanBiaoValue, DIanBiaoChinese

function achieveDianBiaoData(Meshnmae, chooseMesh, meshname) {
  $.ajax({
    type: 'get',
    url:
      'http://221.6.30.202:15007/prod-api/modbus/api/getElectricData?meterAddress=' +
      Meshnmae,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      DIanBiaoValue = data.data[0]
      // console.log('DIanBiaoValue: ', DIanBiaoValue)
    },
  })

  console.log(
    'http://221.6.30.202:15007/prod-api/modbus/api/getElectricData?meterAddress=' +
      Meshnmae
  )
  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/modbus/api/getFieldDetailsElectric',
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      DIanBiaoChinese = data.data.ModbusElectric
      // console.log('DIanBiaoValue: ', DIanBiaoChinese)
    },
  })
  $('#DianBiao_data').html('')
  // for (const i in DIanBiaoChinese) {
  $('#DianBiao_data').append(
    `	<div  class="Dianbiao_out_class">
			
    <div   class="DianBiao_line_out"><img class="img_dot"  src="./img/img_dot.png"><div class="DianBiao_data_name">A相电压</div><div class="DianBiao_data_value">` +
      DIanBiaoValue.uan +
      `</div></div>
    <div   class="DianBiao_line_out"><img class="img_dot"  src="./img/img_dot.png"><div class="DianBiao_data_name">B相电压</div><div class="DianBiao_data_value">` +
      DIanBiaoValue.ubn +
      `</div></div>
    <div   class="DianBiao_line_out"><img class="img_dot"  src="./img/img_dot.png"><div class="DianBiao_data_name">C相电压</div><div class="DianBiao_data_value">` +
      DIanBiaoValue.ucn +
      `</div></div>
  </div>
  
  <div  style="float: left;width: 130px;padding-top: 10px;" >
  <div   class="DianBiao_line_out"><img class="img_dot"  src="./img/img_dot.png"><div class="DianBiao_data_name">A相电流</div><div class="DianBiao_data_value">` +
      DIanBiaoValue.ia +
      `</div></div>
    <div   class="DianBiao_line_out"><img class="img_dot"  src="./img/img_dot.png"><div class="DianBiao_data_name">B相电流</div><div class="DianBiao_data_value">` +
      DIanBiaoValue.ib +
      `</div></div>
    <div   class="DianBiao_line_out"><img class="img_dot"  src="./img/img_dot.png"><div class="DianBiao_data_name">C相电流</div><div class="DianBiao_data_value">` +
      DIanBiaoValue.ic +
      `</div></div>
  </div>
  
  
  <div  class="Dianbiao_out_class">
  
    <div   class="DianBiao_line_out"><img class="img_dot"  src="./img/img_dot.png"><div class="DianBiao_data_name">三相电流最大值</div><div class="DianBiao_data_value">` +
      DIanBiaoValue.mdiElectric +
      `</div></div>
    <div   class="DianBiao_line_out"><img class="img_dot"  src="./img/img_dot.png"><div class="DianBiao_data_name">一次侧正向有功电能</div><div class="DianBiao_data_value">` +
      DIanBiaoValue.wpn +
      `</div></div>
    <div   class="DianBiao_line_out"><img class="img_dot"  src="./img/img_dot.png"><div class="DianBiao_data_name">一次侧负向有功电能</div><div class="DianBiao_data_value">` +
      DIanBiaoValue.wpp +
      `</div></div>
    <div   class="DianBiao_line_out"><img class="img_dot"  src="./img/img_dot.png"><div class="DianBiao_data_name">一次侧正向无功电能</div><div class="DianBiao_data_value">` +
      DIanBiaoValue.wqp +
      `</div></div>
    <div   class="DianBiao_line_out"><img class="img_dot"  src="./img/img_dot.png"><div class="DianBiao_data_name">一次侧负向有功电能</div><div class="DianBiao_data_value">` +
      DIanBiaoValue.wqn +
      `</div></div>
    
  </div>
  
  <div  style="float: left;width: 130px;padding-top: 10px;" >
  <div   class="DianBiao_line_out"><img class="img_dot"  src="./img/img_dot.png"><div class="DianBiao_data_name">三相电压最大值</div><div class="DianBiao_data_value">` +
      DIanBiaoValue.mduMutually +
      `</div></div>
  <div   class="DianBiao_line_out"><img class="img_dot"  src="./img/img_dot.png"><div class="DianBiao_data_name">二次侧正向有功电能</div><div class="DianBiao_data_value">` +
      DIanBiaoValue.epn +
      `</div></div>
  <div   class="DianBiao_line_out"><img class="img_dot"  src="./img/img_dot.png"><div class="DianBiao_data_name">二次侧负向有功电能</div><div class="DianBiao_data_value">` +
      DIanBiaoValue.epp +
      `</div></div>
  <div   class="DianBiao_line_out"><img class="img_dot"  src="./img/img_dot.png"><div class="DianBiao_data_name">二次侧正向无功电能</div><div class="DianBiao_data_value">` +
      DIanBiaoValue.eqp +
      `</div></div>
  <div   class="DianBiao_line_out"><img class="img_dot"  src="./img/img_dot.png"><div class="DianBiao_data_name">二次侧负向有功电能</div><div class="DianBiao_data_value">` +
      DIanBiaoValue.eqn +
      `</div></div>
    
  </div>
<div  style="position: absolute; left: 20px;top: 20px;"><div>累计用电量</div><div></div></div>
  `
  )
  // }

  $('#Dianbiao_name').text(meshname)

  // DianBiaolabel.position.set(10000, 10000, 10000)

  DianBiaolabel.scale.set(0.012, 0.012, 0.012)
  DianBiaotag.style.visibility = 'visible' //显示标签

  DianBiaolabel.position.copy(chooseMesh.getWorldPosition())

  if (chooseMesh.parent.name == '2F_PDB_Click') {
    DianBiaolabel.position.y -= 9
    DianBiaolabel.position.x += 5
  } else if (chooseMesh.parent.name == '3F_PDB_Click') {
    DianBiaolabel.position.x -= 5
  }

  scene.add(DianBiaolabel)
}
var DianBiaotag = document.getElementById('DianBiao')

var DianBiaolabel = new CSS3DSprite(DianBiaotag)

var changemodbusBmsUrl,
  changeJsonUrl,
  modbusBms,
  modbusBmsvalue,
  DataUrl,
  ChineseName,
  changeKT_Air,
  ChineseNameKT_Air,
  modbusBmsvalueKT_Air
var modbusBmsUrl =
  'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusType=modbusBms2f1'
var JsonUrl =
  'http://221.6.30.202:15007/prod-api/modbus/api/getFieldDetails?modbusType=modbusBms2f1'

/**二三楼多联机设备数据 */
var spinner, spinnertarget
function addKT_AirLabel(UrlName, meshname, chooseMesh) {
  var KT_Air =
    'http://221.6.30.202:15007/prod-api/modbus/api/getCpcData?indoorName=2-3&indoorId=3'

  // console.log('传参', UrlName)
  changeKT_Air = KT_Air.replace(/indoorName=2-3&indoorId=3/, UrlName)
  // console.log('changeKT_Air: ', changeKT_Air)

  /**获取所有字段中文名称 */

  $.ajax({
    type: 'get',
    url: changeKT_Air,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusBmsvalueKT_Air = data.data[0]
      // console.log('modbusBmsvalueKT_Air: ', modbusBmsvalueKT_Air)
    },
  })

  $('#KT_Air').html('')
  $('#KT_Air').append(
    `
        <div class="data_name_class"><div  class="data_name_class_pos">风量</div><a class="data">` +
      modbusBmsvalueKT_Air.setairvolume3 +
      `CMH</a></div>
        <div  class="data_name_class"><div  class="data_name_class_pos">温度</div><a  id="data_value` +
      chooseMesh.name +
      `" class="data">` +
      modbusBmsvalueKT_Air.temperaturesetting +
      `</a><div style="color:#fff">℃</div></div>
        <div  class="data_name_class"><div  class="data_name_class_pos">吸入温度</div><a class="data">` +
      modbusBmsvalueKT_Air.suctiontemperatureTi +
      `℃</a></div>
        <div  class="data_name_class">
        
        <input class="AHU_BF_input"  id ="` +
      chooseMesh.name +
      `range"  type="range" min="19" max="30" step="1" value="` +
      modbusBmsvalueKT_Air.temperaturesetting +
      `">
      </div>
        
        </div>
        <img class="Waiji_imgclass" src="././img/多联机.png"/>
         <img class="waiJi_NJZT_imgclass" src="././img/黄.png"/>
        <div  class="data_NJZT_class"><div class="neiji_name">内机状态:</div>
      <div  class="stwich"><input id="cbCheck` +
      chooseMesh.name +
      `" class="btn-switch large" type="checkbox" value="1" checked="false"> 
      </div>  
      </div>
        
         <img class="waiJi_FJMS_imgclass" src="././img/AHU2蓝.png"/>
        <div class= "data_FJMS_class"><div class="fenji_name">风机模式</div><a class="fengji_a">
        <select id="select2` +
      chooseMesh.name +
      `" style="width: 100%">
        <option  >无</option>  
        <option  id="AUTO" value="00001">自动</option>
        <option  id="cold" value="00010">制冷</option>
        <option  id="wet" value="00100" >除湿</option>
        <option  id="wind" value="01000">送风</option>
        <option  id="hot" value="10000">制热</option>
      </select>
        </a></div>
        


        <div class= "data_FL_class"><div class="fenji_name">风量：</div><a class="fengji_a">
        <select id="select3` +
      chooseMesh.name +
      `" style="width: 100%">
        <option id="hight" value="00010">高风</option>
        <option id="var"   value="00100">中风</option>
        <option id="low"   value="01000" selected>低风</option>
      </select>
        </a></div>
        <img  id="waiJi_out"  class="waiJi_loginout"    src = "././img/8.181.png">
        <div id="loading"></div>
        
        `
  )

  spinnertarget = document.getElementById('loading')
  spinner = new Spinner({ color: '#fff', lines: 12 })

  /**开关状态 */
  $('#cbCheck' + chooseMesh.name).prop(
    'checked',
    modbusBmsvalueKT_Air.runningstate == 0
      ? false
      : modbusBmsvalueKT_Air.runningstate == undefined
      ? false
      : true
  )
  /**默认风速设置 */
  modbusBmsvalueKT_Air.airvolumesetting1 == 1
    ? $('#hight').attr('selected', 'selected')
    : false

  modbusBmsvalueKT_Air.airvolumesetting2 == 1
    ? $('#var').attr('selected', 'selected')
    : false
  modbusBmsvalueKT_Air.airvolumesetting3 == 1
    ? $('#low').attr('selected', 'selected')
    : false

  /**默认模式设置 */

  modbusBmsvalueKT_Air.operationmode1 == 1
    ? $('#cold').attr('selected', 'selected')
    : $('#' + chooseMesh.name + 'range').attr('min', '17')
  modbusBmsvalueKT_Air.operationmode2 == 1
    ? $('#wet').attr('selected', 'selected')
    : false
  modbusBmsvalueKT_Air.operationmode3 == 1
    ? $('#wind').attr('selected', 'selected')
    : false
  modbusBmsvalueKT_Air.operationmode4 == 1
    ? $('#hot').attr('selected', 'selected')
    : false

  /**开关状态写入 */
  $('#' + 'cbCheck' + chooseMesh.name).change(function () {
    var checkstatu = $('#' + 'cbCheck' + chooseMesh.name).prop('checked')
    var stuts = checkstatu == true ? 1 : 0
    var col = checkstatu == true ? 0x00ff00 : 0xffffff
    scene.getObjectByName(chooseMesh.name).material.color.set(col)

    setTimeout(
      function (ModbusBms, stuts, Startindex) {
        setrequest(ModbusBms, stuts, Startindex)
      },
      1000,
      chooseMesh.name,
      stuts,
      0
    )
  })
  /**标签名字 */
  $('#KT_Air_name').text(meshname)
  /**下拉框选中触发，模式 */
  $('#select2' + chooseMesh.name).tinyselect({ showSearch: false })
  $('#select2' + chooseMesh.name).on('change', function (e) {
    console.log('模式', $(this).val())

    if ($(this).val() == '10000') {
      $('#' + chooseMesh.name + 'range').attr('min', '17')
    }
    setTimeout(
      function (ModbusBms, stuts, Startindex) {
        setrequest(ModbusBms, stuts, Startindex)
      },
      1000,
      chooseMesh.name,
      $(this).val(),
      1
    )
  })
  /**下拉框选中触发，风速 */
  $('#select3' + chooseMesh.name).tinyselect({ showSearch: false })
  $('#select3' + chooseMesh.name).on('change', function () {
    console.log('风量', $(this).val())
    spinner.spin(target)

    setTimeout(
      function (ModbusBms, stuts, Startindex) {
        setrequest(ModbusBms, stuts, Startindex)
      },
      1000,
      chooseMesh.name,
      $(this).val(),
      2
    )
  })

  /**滑动条 */

  var tempvalue = $('#' + 'data_value' + chooseMesh.name).text()
  var elem = document.getElementById(chooseMesh.name + 'range')
  console.log('elem: ', elem)

  //获取一个想显示值的标签，并且初始化默认值
  var target = document.getElementById('data_value' + chooseMesh.name)
  console.log('target: ', target)
  target.innerHTML = tempvalue

  var rangeValue = function () {
    var newValue = elem.value
    target.innerHTML = newValue
  }

  /**防止错误修改，添加确定按钮 */
  elem.onmouseup = function () {
    if (confirm('确定修改？')) {
      // if (tempvalue == elem.value) {
      //   alert('值未变')
      // }
      tempvalue = elem.value

      /**确定后发送修改数值 */
      spinner.spin(target)

      setTimeout(
        function (ModbusBms, stuts, Startindex) {
          setrequest(ModbusBms, stuts, Startindex)
        },
        1000,
        chooseMesh.name,
        tempvalue,
        4
      )
    } else {
      target.innerHTML = tempvalue
      elem.value = tempvalue
    }
  }

  //绑定input监听事件

  elem.addEventListener('input', rangeValue)

  $('#havoc').show()
  KT_Airlabel.position.copy(chooseMesh.getWorldPosition())

  KT_Airlabel.scale.set(0.4, 0.4, 0.4)
  KT_Airtag.style.visibility = 'visible' //显示标签

  $('#waiJi_out').click(function () {
    KT_Airtag.style.visibility = 'hidden'
  })
}
var KT_Airtag = document.getElementById('KT_Air_label')
var KT_Airlabel = new CSS3DSprite(KT_Airtag)
scene.add(KT_Airlabel)

function setrequest(ModbusBms, stuts, Startindex) {
  console.log(
    `http://192.168.1.6:9007/prod-api/modbusWrite/api/writeCpcModbus?deviceCode=` +
      ModbusBms +
      `&setValue=` +
      stuts +
      `&controlIndex=` +
      Startindex
  )

  $.ajax({
    type: 'post',
    url:
      `http://192.168.1.6:9007/prod-api/modbusWrite/api/writeCpcModbus?deviceCode=` +
      ModbusBms +
      `&setValue=` +
      stuts +
      `&controlIndex=` +
      Startindex,
    timeout: 1000,
    dataType: 'json',
    async: false, //默认为true 异步

    success: function (msg) {
      console.log(msg)
      spinner.spin()
    },
  })
}

function FromStuatstochangecolor(name) {
  Spin.spin(target)

  setTimeout(
    function (name) {
      changecolorDLJ(name)
    },
    1000,
    name
  )
}

function changecolorDLJ(name) {
  console.log('name: ', name)

  console.log('hj')
  scene.getObjectByName(name).traverse(function (mesh) {
    var Threename = [
      '2-3',
      '2-4',
      '2-5',
      '2-6',
      '2-7',
      '2-8',
      '2-9',
      '3-3',
      '3-4',
      '3-5',
      '3-6',
      '3-7',
      '3-8',
      '3-9',
    ]
    var Fourname = ['2-10', '2-11', '3-11', '3-10']

    /**外机数在个位 */
    var indoorName = mesh.name.substr(0, 3)
    /**外机数在十位 */
    var indoorName_four = mesh.name.substr(0, 4)

    /**外机数在个位且内机排名在个位 */
    var indoorId = mesh.name.slice(-1)
    /**外机数在十位且内机排在十位 */
    var indoorId_four = mesh.name.slice(-2)
    // chooseMesh.material.emissiveIntensity = 2
    if (Threename.indexOf(indoorName) >= 0 && mesh.name.length == 5) {
      tochangeDLJcolor(
        `indoorName=` + indoorName + `&indoorId=` + (Number(indoorId) + 1),

        indoorName + '-' + (Number(indoorId) + 1),
        mesh
      )
    } else if (Threename.indexOf(indoorName) >= 0 && mesh.name.length == 6) {
      tochangeDLJcolor(
        `indoorName=` + indoorName + `&indoorId=` + (Number(indoorId_four) + 1),

        indoorName + '-' + (Number(indoorId_four) + 1),
        mesh
      )
    } else if (
      Fourname.indexOf(indoorName_four) >= 0 &&
      mesh.name.length == 6
    ) {
      tochangeDLJcolor(
        `indoorName=` + indoorName_four + `&indoorId=` + (Number(indoorId) + 1),

        indoorName_four + '-' + (Number(indoorId) + 1),
        mesh
      )
    } else if (
      Fourname.indexOf(indoorName_four) >= 0 &&
      mesh.name.length == 7
    ) {
      tochangeDLJcolor(
        `indoorName=` +
          indoorName_four +
          `&indoorId=` +
          (Number(indoorId_four) + 1),

        indoorName_four + '-' + (Number(indoorId_four) + 1),
        mesh
      )
    }

    if (mesh.name == '3-11-12') {
      Showmesh('3F_DLJ')
      Spin.spin()
    } else if (mesh.name == '2-11-3') {
      Showmesh('2F_DLJ')
      Spin.spin()
    }
  })
}

var modbusBmsvalueDLJ, changeDLJ
function tochangeDLJcolor(UrlName, meshname, chooseMesh) {
  var KT_Air =
    'http://221.6.30.202:15007/prod-api/modbus/api/getCpcData?indoorName=2-3&indoorId=3'

  changeDLJ = KT_Air.replace(/indoorName=2-3&indoorId=3/, UrlName)
  /**获取所有字段中文名称 */

  $.ajax({
    type: 'get',
    url: changeDLJ,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusBmsvalueDLJ = data.data[0]
      // console.log('modbusBmsvalueDLJ: ', modbusBmsvalueDLJ)
    },
  })
  var color
  modbusBmsvalueDLJ.runningstate == 0
    ? (color = 0xffffff)
    : modbusBmsvalueDLJ.runningstate == null
    ? (color = 0xffffff)
    : (color = 0x00ff00)
  chooseMesh.material.color.set(color)
}

/**三楼VAV设备数据 */

function acctiveVAV() {}

function addVAVLabel(JsonName, meshname, chooseMesh) {
  /**获取所有字段中文名称 */
  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/modbus/api/getFieldDetails?modbusType',

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ChineseName = data.data
      console.log('ChineseName: ', ChineseName)
    },
  })

  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusFloor=3f',

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusBmsvalue = data.data
    },
  })

  console.log(modbusBmsvalue)
  console.log(ChineseName)
  $('#All_data_inside').html('')
  for (const vav in ChineseName) {
    if (vav == JsonName) {
      for (const i in ChineseName[vav]) {
        if (
          (ChineseName[vav][i].search('VOC') >= 0 ||
            ChineseName[vav][i].search('CO2') >= 0 ||
            ChineseName[vav][i].search('湿度') >= 0 ||
            ChineseName[vav][i].search('温度') >= 0 ||
            ChineseName[vav][i].search('PM2.5') >= 0) &&
          ChineseName[vav][i].search('读') < 0 &&
          ChineseName[vav][i].search('写') < 0 &&
          ChineseName[vav][i].search('BF') < 0
        ) {
          $('#All_data_inside').append(
            `
  <div  class="temVAV_all">` +
              ChineseName[vav][i] +
              `</div>
  <div  class="humVAV_all">` +
              modbusBmsvalue[vav][i] +
              `</div>
`
          )
        }
      }
    }
  }

  $('#VAV_name').text(meshname)

  VAV_namelabel.position.copy(chooseMesh.getWorldPosition())
  VAV_namelabel.position.y += 50
  VAV_namelabel.scale.set(0.6, 0.6, 0.6)
  VAV_namelabel.element.style.visibility = 'visible' //显示标签
}
var VAV_nametag = document.getElementById('All_data')
var VAV_namelabel = new CSS3DSprite(VAV_nametag)
scene.add(VAV_namelabel)

/**空调主机的数据 */
function changeURL(UrlName, JsonName, meshname, chooseMesh) {
  if (JsonName.search('ModbusBms3f') >= 0) {
    DataUrl =
      'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusFloor=3f'
  } else {
    DataUrl =
      'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusType'
  }
  // $.chURL(UrlName, JsonName)
  changemodbusBmsUrl = modbusBmsUrl.replace(/modbusType=modbusBms2f1/, UrlName)
  changeJsonUrl = JsonUrl.replace(/modbusBms2f1/, JsonName)
  console.log(changeJsonUrl)
  $.ajax({
    type: 'get',
    url: changeJsonUrl,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusBms = data.data
    },
  })

  $.ajax({
    type: 'get',
    url: DataUrl,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusBmsvalue = data.data
    },
  })

  console.log('modbusBms: ', modbusBmsvalue)

  $('#label').html('')
  for (const i in modbusBmsvalue) {
    if (
      (i == JsonName) &
      (JsonName == 'ModbusBms2f1' || JsonName == 'ModbusBms2f2')
    ) {
      console.log(modbusBmsvalue[i])
      $('#label').append(
        `<div  id="AHU" class="AHU_outerClass"> 
          <div   id="ktname" class="AHU_name">
          </div>
          <div class="dataclass">
            <div   id = "JSQ" class="dataclass_value">加湿器开度：<a class = "AHU_dataclass_value"> ` +
          (modbusBmsvalue[i].humidifierValveOpen == undefined
            ? '无'
            : modbusBmsvalue[i].humidifierValveOpen) +
          `
          </a>%</div>
            <div class="dataclass_value">加热阀开度：<a class = "AHU_dataclass_value">` +
          (modbusBmsvalue[i].heatingValveOpen == undefined
            ? '无'
            : modbusBmsvalue[i].heatingValveOpen) +
          `
          </a>%</div>
            <div class="dataclass_value">三通阀开度：<a class = "AHU_dataclass_value">` +
          modbusBmsvalue[i].threeValveOpen +
          `
          </a>%</div>
        </div>
          <div class="AHU_SD">` +
          modbusBmsvalue[i].airSupplyHumidity +
          `
          <a class="AHU_unit">%</a></div>
          <div class="AHU_WD">` +
          modbusBmsvalue[i].airSupplyTemp +
          `
          <a class="AHU_unit">℃</a></div>
          <div class="AHU_PL">` +
          (modbusBmsvalue[i].blowerHz == undefined
            ? modbusBmsvalue[i].airSupplyHz
            : modbusBmsvalue[i].blowerHz) +
          `
          <a class="AHU_unit">HZ</a></div>
          <div class="AHU_CMH">` +
          modbusBmsvalue[i].airSupplyAmount +
          `
          <a class="AHU_unit">CMH</a></div>
          <img class="imgclass_png" src="././img/Fj.png"/>
          <img  id="FJ" class="imgclass_gif" src="././img/Fj.gif"/>
         
       
          <a class="AHU_SFJ" >送风机</a><br />
          <img class="AHU_STAUS_imgclass" src="././img/黄.png"/>
          <div  class="AHU_wjzT">系统状态:
          <a class = "AHU_value">` +
          (modbusBmsvalue[i].blowerRun == 1 ? '开' : '关') +
          `
          </a></div>
    
          <img class="AHU_module_imgclass" src="././img/AHU2蓝.png"/>
          <div  class="AHU_WJMS">风机模式:<a class="AHU_satus">` +
          (modbusBmsvalue[i].coolingStatus == 1 ? '制冷' : ' ') +
          (modbusBmsvalue[i].heatingStatus == 1 ? '制热' : '') +
          (modbusBmsvalue[i].dehumidifiedStatus == 1 ? '除湿' : '') +
          (modbusBmsvalue[i].humidificationStatus == 1 ? '加湿' : '') +
          `
          </a>
   
          </div>
            <img  id="LQT_out"  class="AHU_loginout"    src = "././img/8.181.png">
        `
      )
    } else if (
      (i == JsonName) &
      (JsonName != 'ModbusBms2f1' || JsonName != 'ModbusBms2f2')
    ) {
      $('#label').append(
        `<div  id="AHU"  class="AHU_outerClass"> 
                <div   id="ktname" class="AHU_name">AHU 
                </div>
                <div class="dataclass">
                  <div  id="JSQ" class="dataclass_value">加温器开度：<a class = "AHU_dataclass_value"> ` +
          (modbusBmsvalue[i].jsqkd == undefined
            ? '无'
            : modbusBmsvalue[i].jsqkd) +
          `
                </a>%</div>
                  <div class="dataclass_value">加热阀开度：<a class = "AHU_dataclass_value">` +
          (modbusBmsvalue[i].jrfkd == undefined
            ? '无'
            : modbusBmsvalue[i].jrfkd) +
          `
                </a>%</div>
                  <div class="dataclass_value">三通阀开度：<a class = "AHU_dataclass_value">` +
          (modbusBmsvalue[i].stfkd == undefined
            ? modbusBmsvalue[i].sdfkd == undefined
              ? modbusBmsvalue[i].stfkd
              : modbusBmsvalue[i].sdfkd
            : modbusBmsvalue[i].stfkd) +
          `
                </a>%</div>
              </div>
                <div class="AHU_SD">
                <a class="AHU_unit">` +
          modbusBmsvalue[i].sfsd +
          `%</a></div>
                <div class="AHU_WD">
                <a class="AHU_unit">` +
          modbusBmsvalue[i].sfwd +
          `℃</a></div>
                <div class="AHU_PL">
                <a class="AHU_unit">` +
          (i.search('3f') >= 0 == true
            ? modbusBmsvalue[i].sfjHz
            : modbusBmsvalue[i].sfjpl) +
          `HZ</a></div>
                <div class="AHU_CMH">
                <a class="AHU_unit">` +
          modbusBmsvalue[i].sfl +
          `CMH</a></div>
          <img class="imgclass_png" src="././img/Fj.png"/>

          <img  id="FJ" class="imgclass_gif" src="././img/Fj.gif"/>
                <a class="AHU_SFJ" >送风机</a><br />
                <img class="AHU_STAUS_imgclass" src="././img/黄.png"/>
                <div  class="AHU_wjzT">系统状态:
                <a class = "AHU_value">` +
          (modbusBmsvalue[i].jzzt1Bit1 == 1 ? '开' : '关') +
          `
                </a></div>
          
                <img class="AHU_module_imgclass" src="././img/AHU2蓝.png"/>
                <div  class="AHU_WJMS">风机模式:<a class="AHU_satus">` +
          (modbusBmsvalue[i].jzzt1Bit2 == 1 ? '制冷' : '') +
          (modbusBmsvalue[i].jzzt1Bit3 == 1 ? '制热' : ' ') +
          (modbusBmsvalue[i].jzzt1Bit5 == 1 ? '加湿 ' : '') +
          (modbusBmsvalue[i].jzzt1Bit4 == 1 ? '除湿' : '') +
          `
                </a></div>

               
                <img  id="LQT_out"  class="AHU_loginout"    src = "././img/8.181.png"></div>
              `
      )
    }
  }
  if (
    modbusBmsvalue[JsonName].blowerRun == 0 ||
    modbusBmsvalue[JsonName].jzzt1Bit1 == 0
  ) {
    document.getElementById('FJ').style.visibility = 'hidden'
  }

  $('#changeTH').click(function () {
    console.log($('#input_hum').val())
    console.log($('#input_tem').val())
  })
  $('#ktname').text(meshname)
  var tag = document.getElementById('label')
  var label = new CSS3DSprite(tag)
  scene.add(label)
  $('#LQT_out').click(function () {
    tag.style.visibility = 'hidden'
  })
  label.position.copy(chooseMesh.getWorldPosition())

  label.scale.set(0.4, 0.4, 0.4)
  label.element.style.visibility = 'visible' //显示标签
}

function addPFImg(meshname, picture) {
  var Camera = scene.getObjectByName(meshname)
  Camera.traverse(function (mesh) {
    if (mesh.name.search('ModbusBms') < 0 && mesh.name != '3F_PF') {
      $('body').append(
        `<div id = "` +
          mesh.name +
          `">    <img id = "` +
          mesh.name +
          `rt"  class = "dingwei_img"   src = "././img/ControlImg/排风扇定位.png" title = "` +
          mesh.name +
          `" >
        </div>
          `
      )

      $('#' + mesh.name).click(function () {
        addPFData(mesh)
      })
      var PF_imgtag = document.getElementById(mesh.name)
      var PF_imgLabel = new CSS3DSprite(PF_imgtag)
      PF_imgLabel.name = mesh.name + 'mm'
      PF_imgLabel.position.copy(mesh.getWorldPosition())
      PF_imgLabel.element.style.visibility = 'visible'

      PF_imgLabel.scale.set(0.14, 0.14, 0.14)

      scene.add(PF_imgLabel)

      PF_imgtag.onpointermove = function () {
        scene.getObjectByName(mesh.name + 'mm').scale.set(0.15, 0.15, 0.15)
      }
      PF_imgtag.onpointerleave = function () {
        scene.getObjectByName(mesh.name + 'mm').scale.set(0.14, 0.14, 0.14)
      }
    }
  })
}
function addPFData(mesh) {
  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusType',
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusBmsvalue = data.data
    },
  })
  // console.log('modbusBmsvalue: ', modbusBmsvalue)
  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/modbus/api/getFieldDetails?modbusType',
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ChineseName = data.data
    },
  })
  console.log('ChineseName: ', ChineseName)
  $('#PF_data').html('')
  for (const i in ChineseName[mesh.parent.name]) {
    var chineseData = ChineseName[mesh.parent.name][i]
    var name_c
    if (
      chineseData.search(mesh.name) >= 0 &&
      (chineseData.search(mesh.name + '运行') >= 0 ||
        chineseData.search(mesh.name + '启停') >= 0)
    ) {
      name_c = chineseData
      if (name_c.search(mesh.name + '启停') >= 0) {
      } else {
        $('#PF_data').append(
          `
        <div class="PF_data_out">
        <div  class="PF_data_name">
      ` +
            chineseData.slice(-2) +
            `</div><div   class="PF_data_value">
      ` +
            (modbusBmsvalue[mesh.parent.name][i] == 1
              ? '开'
              : modbusBmsvalue[mesh.parent.name][i] == 0
              ? '关'
              : modbusBmsvalue[mesh.parent.name][i]) +
            `</div>
        </div>
        `
        )
      }
    } else if (
      chineseData.search(mesh.name) >= 0 &&
      (chineseData.search(mesh.name + '风压') >= 0 ||
        chineseData.search(mesh.name + '频率') >= 0)
    ) {
      $('#PF_data').append(
        `
        <div class="PF_data_out">
        <div  class="PF_data_name">
      ` +
          chineseData.slice(-2) +
          `</div><div   class="PF_data_value">
      ` +
          modbusBmsvalue[mesh.parent.name][i] +
          `</div>
        </div>
        `
      )
    }
  }
  $('#PF_out').click(function () {
    PFtag.style.visibility = 'hidden'
  })
  $('#PF_name').text(mesh.name)
  PFmeshLabel.position.copy(mesh.getWorldPosition())
  PFmeshLabel.element.style.visibility = 'visible'

  PFmeshLabel.scale.set(0.8, 0.8, 0.8)

  scene.add(PFmeshLabel)
}
var PFtag = document.getElementById('PF')
var PFmeshLabel = new CSS3DSprite(PFtag)
PFmeshLabel.name = 'PF'

/**改变模型的颜色 */
function changecolor(meshname, color) {
  var mesh = scene.getObjectByName(meshname)

  mesh.traverse(function (obj) {
    if (obj.isMesh) {
      obj.material.color.set(color)
      obj.material.opacity = 0.9
      // obj.scale.set(1.05,1.05,1.05)
    }
  })
}

/**材质分开 */
function changmaterialdepth(name) {
  scene.getObjectByName(name).traverse(function (mesh) {
    if (mesh.isMesh) {
      mesh.material = new THREE.MeshPhongMaterial({
        map: mesh.material.map,
        alphaMap: mesh.material.alphaMap,
      })
    }
  })
}
function changmaterial(name) {
  scene.getObjectByName(name).traverse(function (mesh) {
    if (mesh.isMesh) {
      mesh.material = new THREE.MeshStandardMaterial({
        transparent: true,
        opacity: 0.8,
        map: mesh.material.map,
        alphaMap: mesh.material.alphaMap,
      })
    }
  })
}
/**恢复模型颜色 */
function comeback(meshname, color) {
  var mesh = scene.getObjectByName(meshname)
  mesh.traverse(function (obj) {
    if (obj.isMesh) {
      obj.material.color.set(color)
      obj.material.opacity = 0.5
    }
  })
}

/**添加视频页面 */

function addVideo(JKName, mesh) {
  if (document.getElementById('playWnd') != null) {
    stopAllPreview()
  }
  var codeurl
  if (mesh.parent.name == '2F_Camera') {
    codeurl =
      'http://192.168.1.52:9007/prod-api/hikang/camera/camerasSearch?cameraName=' +
      JKName
  } else if (mesh.parent.name == '3F_Camera') {
    codeurl =
      'http://192.168.1.9:9007/prod-api/hikang/camera/camerasSearch?cameraName=' +
      JKName
  }
  $('#video').html('')
  $('#video').append(
    `<div id="playWnd" class="playWnd" style="left: 109px; top: 133px"></div>`
  )
  var JkdeptCode
  $.ajax({
    type: 'get',
    url: codeurl,
    data: JkdeptCode,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      JkdeptCode = data.data.cameraIndexCode
      console.log('JkdeptCode: ', JkdeptCode)
      var cameraIndexCode = JkdeptCode //获取输入的监控点编号值，必填
      var streamMode = 0 //主子码流标识：0-主码流，1-子码流
      var transMode = 1 //传输协议：0-UDP，1-TCP
      var gpuMode = 0 //是否启用GPU硬解，0-不启用，1-启用
      var wndId = -1 //播放窗口序号（在2x2以上布局下可指定播放窗口）
      //
      cameraIndexCode = cameraIndexCode.replace(/(^\s*)/g, '')
      cameraIndexCode = cameraIndexCode.replace(/(\s*$)/g, '')

      initPlugin(cameraIndexCode)
      // videostartcontrol.element.style.visibility = 'visible' //显示标签
    },
  })

  $('#hidden').click(function () {
    stopAllPreview()
    $('#img' + JKName).attr('src', '././img/摄像头2.png')
  })
}

/**整体渲染的方法 */
function render() {
  TWEEN.update()
  // if (rotate) {
  //   scene.rotation.y += 0.002
  // }

  renderer.render(scene, camera) //执行渲染操作
  CSS2DlabelRender.render(scene, camera)
  labelRenderer.render(scene, camera) //CSS2D渲染
  requestAnimationFrame(render) //请求再次执行渲染函数render，渲染下一帧
}
/**自适应窗口 */
window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

export {
  comeback,
  changecolor,
  addtexture,
  AddMeshIntoArr,
  showlabel,
  addDoorLabel,
  hiddenDoorLabel,
  hiddenLabel,
  addVideo,
  render,
  granaryArr,
  addEvnmap,
  delteFromArr,
  addLabelimg,
  movecamera,
  changmaterialdepth,
  hiddenLabelimg,
  addTHLAbel,
  HiddenTHLAbel,
  addCameraImg,
  deleteCameraImg,
  hiddenmesh,
  Showmesh,
  addPFImg,
  changespeed,
  changmaterial,
  FromStuatstochangecolor,
}
