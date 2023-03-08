import * as THREE from '../../../build/three.module.js'

import { scene, renderer, camera, labelRenderer } from './Control_scene.js'
import { CSS3DSprite } from '../../jsm/renderers/CSS3DRenderer.js'

import { FBXLoader } from '../../jsm/loaders/FBXLoader.js'
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

var PF_controllabel = true,
  KT_controllabel = true,
  BF_controllabel = true,
  PAU_4fcontrollabel = true,
  MAU_controllabel = true,
  PAU_controllabel = true,
  AHU_controllabel = true
$('#no').bind('hello', function () {
  console.log(document.getElementById('iframe'))
  document
    .getElementById('iframe')
    .removeChild(document.getElementById('iframe').childNodes[0])
  document.getElementById('iframe').style.visibility = 'hidden'
})

$('#PF_controllabel').click(function () {
  if (PF_controllabel == true) {
    PF_controllabel = false
    addImg('3F_PF', '排风扇.png')
    $('#PF_controllabel').css('background-color', 'rgba(176, 176, 8, 0.684)')
  } else {
    PF_controllabel = true
    deleteImg('3F_PF')
    $('#PF_controllabel').css('background-color', 'rgba(162, 192, 135, 0.684)')
  }
})
$('#KT_controllabel').click(function () {
  if (KT_controllabel == true) {
    KT_controllabel = false
    addAHUImg('3F_AHU', 'AHU.png')
    $('#KT_controllabel').css('background-color', 'rgba(176, 176, 8, 0.684)')
  } else {
    KT_controllabel = true
    deleteImg('3F_AHU')
    $('#KT_controllabel').css('background-color', 'rgba(162, 192, 135, 0.684)')
  }
})

var Spin = new Spinner({ color: '#fff', lines: 12 })
$('#BF_controllabel').click(function () {
  if (BF_controllabel == true) {
    BF_controllabel = false
    addBFImg('3F_BF', '补风机.png')
    $('#BF_controllabel').css('background-color', 'rgba(176, 176, 8, 0.684)')
  } else {
    BF_controllabel = true
    deleteImg('3F_BF')
    $('#BF_controllabel').css('background-color', 'rgba(162, 192, 135, 0.684)')
  }
})

$('#PAU_4fcontrollabel').click(function () {
  if (PAU_4fcontrollabel == true) {
    PAU_4fcontrollabel = false
    hiddenAllMesh('3F_Layout')
    ShowFourMesh('4F_Layout')
    addBFImg('4F_PAU', 'PAU.png')
    $('#PAU_4fcontrollabel').css('background-color', 'rgba(176, 176, 8, 0.684)')
  } else {
    PAU_4fcontrollabel = true
    hiddenAllMesh('4F_Layout')
    ShowFourMesh('3F_Layout')
    deleteImg('4F_PAU')
    $('#PAU_4fcontrollabel').css(
      'background-color',
      'rgba(162, 192, 135, 0.684)'
    )

    // meshLabel.element.style.visibility = 'hidden'
  }
})
$('#AHU_controllabel').click(function () {
  if (AHU_controllabel == true) {
    AHU_controllabel = false
    addAHUImg('2F_AHU', 'AHU.png')
  } else {
    AHU_controllabel = true
    deleteImg('2F_AHU')
  }
})

$('#MAU_controllabel').click(function () {
  if (MAU_controllabel == true) {
    MAU_controllabel = false
    addAHUImg('2F_MAU', 'MAU.png')
  } else {
    MAU_controllabel = true
    deleteImg('2F_MAU')
  }
})
$('#PAU_controllabel').click(function () {
  if (PAU_controllabel == true) {
    PAU_controllabel = false
    addBFImg('2F_PAU', 'PAU.png')
  } else {
    PAU_controllabel = true
    deleteImg('2F_PAU')
  }
})

// scene.add(TFGlabel)
/**添加四层模型 */
function ShowFourMesh(name) {
  scene.getChildByName(name).visible = true
}

function hiddenAllMesh(name) {
  scene.getObjectByName(name).visible = false
}

var PrimaryMesh = [],
  granaryArr = []
function AddMeshIntoArr(mesh, Arr) {
  var AArr
  if (Arr == 'granaryArr') {
    AArr = granaryArr
  } else if (Arr == 'PrimaryMesh') {
    AArr = PrimaryMesh
  }
  var device = scene.getObjectByName(mesh)
  console.log('device: ', device)
  device.traverse(function (obj) {
    if (obj.isMesh) {
      AArr.push(obj)
    }
  })
}
var changecolorMesh, PrimaryMesh

function pointermove(event) {
  if (changecolorMesh) {
    changecolorMesh.material.opacity = 0
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
    // console.log('changecolorMesh: ', changecolorMesh)

    if (changecolorMesh.parent.name == 'Preselection') {
      changecolorMesh.material.opacity = 0.5
      changecolorMesh.material.color.set(0x33ffff)
    } else if (changecolorMesh.parent.name == '3F_Camera') {
      changecolorMesh.material.color.set(0x444444)
    }
  }
}

addEventListener('pointermove', pointermove)

var chooseMesh = null,
  chooseMeshemssive

/**单击选择模型 */
function choose(event) {
  if (chooseMesh) {
    chooseMesh.material.color.set(0x00ff00)
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

    ShowSystemLabel(chooseMesh.name)
  }
}
addEventListener('click', choose) // 监听窗口鼠标单击事件

function ShowSystemLabel(name) {
  console.log(name)
  $('#iframe').html('')
  $('#iframe').append(
    `  <iframe 
    src="./control-system/` +
      name +
      `.html"
    style="width: 1000px; height: 720px"
    frameborder="0"
  ></iframe>`
  )
  container2.style.visibility = 'visible'
}
var container2 = document.getElementById('iframe')
var TFGlabel = new CSS3DSprite(container2)
TFGlabel.name = 'iframelabel'

/*添加排风扇图标并判断开关状态 */
var ChineseName, modbusBmsvalue, ModbusBms_Startindex

function AcctiveAllDATA(meshname) {
  var jsonurl
  if (meshname == '3F_PF') {
    jsonurl = '././json/ModbusBms_startindex_PF.json'
  } else if (meshname == '3F_BF') {
    jsonurl = '././json/ModbusVav_startindex.json'
  } else if (meshname == '4F_pau' || meshname == '3F_AHU') {
    jsonurl = '././json/ModbusBms2F_startindex.json'
  }
  $.ajax({
    type: 'get',
    url: jsonurl,
    data: ModbusBms_Startindex,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ModbusBms_Startindex = data
    },
  })

  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusType',
    data: modbusBmsvalue,
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
    data: ChineseName,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ChineseName = data.data
    },
  })
}
/**补风机 和二楼PAU数据和四楼PAU数据*/
var ModbusVav_Startindex
function addBFImg(meshname, picture) {
  var StartIndexURl
  if (meshname == '3F_BF') {
    StartIndexURl = '././json/ModbusVav_startindex.json'
  } else if (meshname == '2F_PAU' || meshname == '4F_PAU') {
    StartIndexURl = '././json/ModbusBms2F_startindex.json'
  }
  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusType',
    data: modbusBmsvalue,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusBmsvalue = data.data
    },
  })

  console.log('modbusBmsvalue: ', modbusBmsvalue)
  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/modbus/api/getFieldDetails?modbusType',
    data: ChineseName,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ChineseName = data.data
    },
  })

  $.ajax({
    type: 'get',
    url: StartIndexURl,
    data: ModbusBms_Startindex,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ModbusVav_Startindex = data
    },
  })
  console.log('ModbusVav_Startindex: ', ModbusVav_Startindex)

  var Camera = scene.getObjectByName(meshname)
  console.log('Camera: ', Camera)
  Spin.spin(target)
  Camera.traverse(function (mesh) {
    mesh.name == ('BF3-1' || 'ModbusBms3f3__PAU_3-3') ? Spin.spin() : 0
    mesh.name == 'ModbusBms3f3__PAU_3-3' ? Spin.spin() : 0

    if (
      mesh.name.search('ModbusVav') < 0 &&
      mesh.name != '3F_BF' &&
      mesh.name != '2F_PAU' &&
      mesh.name != '4F_PAU'
    ) {
      $('body').append(
        `<div  class="label_class"   id = "` +
          mesh.name +
          `">    <img id = "` +
          mesh.name +
          `rt"  class = "dingwei_img"   src = "././img/ControlImg/` +
          picture +
          `"  title = "` +
          mesh.name +
          `">
          <div     id="BF_TEMP` +
          mesh.name +
          `"       class= "BF_temptrue"   title="单击设置温度">
          <div  class = "BF_temptrue_value"  id="BF` +
          mesh.name +
          `"></div>
          <div class= "BF_temptrue_unit">℃</div></div>
          <div class="label_style"><input id="cbCheck` +
          mesh.name +
          `" class="btn-switch large" type="checkbox" value="1" checked="false"></div>
          </div>
          </div>`
      )
      /**声明遍历对象子对象和最后传参 */
      var ModbusBms, Startindex
      if (meshname == '3F_BF') {
        ModbusBms = mesh.parent.name
      } else if (meshname == '2F_PAU' || meshname == '4F_PAU') {
        ModbusBms = mesh.name.slice(0, 12)
      }
      console.log('ModbusBms: ', ModbusBms)
      for (const i in ChineseName[ModbusBms]) {
        var chineseData = ChineseName[ModbusBms][i]
        Startindex = ModbusVav_Startindex[ModbusBms][mesh.name] - 1
        /**筛选符合该模型名字的字段*/
        if (
          chineseData.search(mesh.name) >= 0 &&
          (chineseData.search(mesh.name + '启停') >= 0 ||
            chineseData.search(mesh.name + '运行') >= 0)
        ) {
          /**值为一或零设置默认开关状态 */
          if (modbusBmsvalue[ModbusBms][i] == 1) {
            $('#' + 'cbCheck' + mesh.name).prop('checked', true)
          } else {
            $('#' + 'cbCheck' + mesh.name).prop('checked', false)
          }
        } else if (
          chineseData.search('读') >= 0 &&
          chineseData.search('设定温度') >= 0 &&
          chineseData.search('BF2-1') < 0
        ) {
          $('#' + 'BF' + mesh.name).text(modbusBmsvalue[ModbusBms][i])
        }
      }
      $('#' + 'cbCheck' + mesh.name).change(function () {
        var checkstatu = $('#' + 'cbCheck' + mesh.name).prop('checked')
        var stuts = checkstatu == true ? 1 : 0

        console.log(
          `http://192.168.1.6:9007/prod-api/modbusWrite/api/writeModbus?modbusType=` +
            ModbusBms +
            `&setValue=` +
            stuts +
            `&startIndex=` +
            Startindex +
            `&setType=2`
        )

        $.ajax({
          type: 'post',
          url:
            `http://192.168.1.6:9007/prod-api/modbusWrite/api/writeModbus?modbusType=` +
            ModbusBms +
            `&setValue=` +
            stuts +
            `&startIndex=` +
            Startindex +
            `&setType=2`,
          data: ChineseName,
          dataType: 'json',
          async: false, //默认为true 异步
          success: function (data) {
            ChineseName = data.data
          },
        })
      })

      var tag = document.getElementById(mesh.name)
      var meshLabel = new CSS3DSprite(tag)
      meshLabel.name = mesh.name + 'n'
      meshLabel.position.copy(mesh.getWorldPosition())
      meshLabel.element.style.visibility = 'visible'

      meshLabel.scale.set(0.15, 0.15, 0.15)

      scene.add(meshLabel)

      $('#BF_TEMP' + mesh.name).click(function () {
        var HKname = scene.getObjectByName(mesh.name + 'hnn')
        if (HKname) {
        } else {
          addchangTemptrue(mesh.name, mesh, meshname)
        }
      })

      tag.onpointermove = function () {
        scene.getObjectByName(mesh.name + 'n').scale.set(0.15, 0.15, 0.15)
      }
      tag.onpointerleave = function () {
        scene.getObjectByName(mesh.name + 'n').scale.set(0.15, 0.15, 0.15)
      }
    }
  })
}
function addImg(meshname, picture) {
  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusType',
    data: modbusBmsvalue,
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
    data: ChineseName,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ChineseName = data.data
    },
  })
  $.ajax({
    type: 'get',
    url: '././json/ModbusBms_startindex_PF.json',
    data: ModbusBms_Startindex,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ModbusBms_Startindex = data
    },
  })

  console.log('ChineseName: ', ModbusBms_Startindex)

  var Camera = scene.getObjectByName(meshname)
  Camera.traverse(function (mesh) {
    if (mesh.name.search('ModbusBms') < 0 && mesh.name != '3F_PF') {
      $('body').append(
        `<div id = "` +
          mesh.name +
          `">    <img id = "` +
          mesh.name +
          `rt"  class = "dingwei_img"   src = "././img/ControlImg/排风扇.png"  >
          <div class="label_style"><input id="cbCheck` +
          mesh.name +
          `" class="btn-switch large" type="checkbox" value="1" checked="false"></div></div>
          </div>`
      )

      for (const i in ChineseName[mesh.parent.name]) {
        var chineseData = ChineseName[mesh.parent.name][i]

        var Startindex = ModbusBms_Startindex[mesh.parent.name][mesh.name] - 1
        if (
          chineseData.search(mesh.name) >= 0 &&
          (chineseData.search(mesh.name + '启停') >= 0 ||
            chineseData.search(mesh.name + '运行') >= 0)
        ) {
          if (modbusBmsvalue[mesh.parent.name][i] == 1) {
            $('#' + 'cbCheck' + mesh.name).prop('checked', true)
          } else {
            $('#' + 'cbCheck' + mesh.name).prop('checked', false)
          }
        }
      }
      $('#' + 'cbCheck' + mesh.name).change(function () {
        var checkstatu = $('#' + 'cbCheck' + mesh.name).prop('checked')
        var stuts = checkstatu == true ? 1 : 0

        console.log(
          `http://192.168.1.6:9007/prod-api/modbusWrite/api/writeModbus?modbusType=` +
            mesh.parent.name +
            `&setValue=` +
            stuts +
            `&startIndex=` +
            Startindex +
            `&setType=2`
        )
        $.ajax({
          type: 'post',
          url:
            `http://192.168.1.6:9007/prod-api/modbusWrite/api/writeModbus?modbusType=` +
            mesh.parent.name +
            `&setValue=` +
            stuts +
            `&startIndex=` +
            Startindex +
            `&setType=2`,
          data: ChineseName,
          dataType: 'json',
          async: false, //默认为true 异步
          success: function (data) {
            ChineseName = data.data
          },
        })
      })
      var tag = document.getElementById(mesh.name)
      var meshLabel = new CSS3DSprite(tag)
      meshLabel.name = mesh.name + 'n'
      meshLabel.position.copy(mesh.getWorldPosition())
      meshLabel.element.style.visibility = 'visible'

      meshLabel.scale.set(0.14, 0.14, 0.14)

      scene.add(meshLabel)

      tag.onpointermove = function () {
        scene.getObjectByName(mesh.name + 'n').scale.set(0.15, 0.15, 0.15)
      }
      tag.onpointerleave = function () {
        scene.getObjectByName(mesh.name + 'n').scale.set(0.14, 0.14, 0.14)
      }
    }
  })
}

var tag = document.getElementById('table')
var meshLabel = new CSS3DSprite(tag)
meshLabel.scale.set(0.1, 0.1, 0.1)
/**新风空调机组 二楼和三楼数据*/
function addAHUImg(meshname, picture) {
  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusType',
    data: modbusBmsvalue,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusBmsvalue = data.data
    },
  })
  console.log('modbusBmsvalue: ', modbusBmsvalue)
  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/modbus/api/getFieldDetails?modbusType',
    data: ChineseName,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ChineseName = data.data
    },
  })
  $.ajax({
    type: 'get',
    url: '././json/ModbusBms2F_startindex.json',
    data: ModbusBms_Startindex,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ModbusBms_Startindex = data
    },
  })
  console.log('ChineseName: ', ChineseName)

  var Camera = scene.getObjectByName(meshname)
  console.log('Camera: ', Camera)

  Camera.traverse(function (mesh) {
    if (
      mesh.name.search('ModbusVav') < 0 &&
      mesh.name != '3F_AHU' &&
      mesh.name != '2F_MAU' &&
      mesh.name != '2F_AHU'
    ) {
      $('body').append(
        `<div id = "` +
          mesh.name +
          `">    <img id = "` +
          mesh.name +
          `rt"  class = "dingwei_img"   src = "././img/ControlImg/` +
          picture +
          `"  title = "` +
          (meshname.search('2F_') >= 0 ? mesh.name.slice(-7) : mesh.name) +
          `">
          <div   class= "AHU_temptrue" title="单击设置温度" >
          <div  class = "AHU_temptrue_value"  id="temp` +
          mesh.name +
          `"></div>
          <div class= "AHU_temptrue_unit">℃</div></div>

          <div   class= "AHU_hum" title="单击设置湿度" >
          <div  class = "AHU_hum_value"  id="hum` +
          mesh.name +
          `"></div>
          <div class= "AHU_hum_unit">%</div></div>

          <div class="label_style"><input id="cbCheck` +
          mesh.name +
          `" class="btn-switch large"  type="checkbox" value="1" checked="false"></div></div>
      
          </div>
          </div>`
      )
      var itean
      if (meshname == '3F_AHU') {
        itean = mesh.name == 'AHU-3-2' ? 'ModbusBms3f7' : 'ModbusBms3f5'
      } else if (meshname == '2F_MAU' || meshname == '2F_AHU') {
        itean = mesh.name.slice(0, mesh.name.length - 9)
        console.log('itean: ', itean)
      }

      for (const i in ChineseName[itean]) {
        var chineseData = ChineseName[itean][i]
        var Startindex = ModbusBms_Startindex[itean][mesh.name] - 1
        /**筛选符合该模型名字的字段*/
        if (chineseData.search('系统启停') >= 0) {
          console.log(itean)
          /**值为一或零设置默认开关状态 */
          if (modbusBmsvalue[itean][i] == 1) {
            $('#' + 'cbCheck' + mesh.name).prop('checked', true)
          } else {
            $('#' + 'cbCheck' + mesh.name).prop('checked', false)
          }
        } else if (chineseData.search('读设定温度') >= 0) {
          $('#' + 'temp' + mesh.name).text(
            modbusBmsvalue[itean][i] == undefined
              ? '暂无'
              : modbusBmsvalue[itean][i]
          )
        } else if (chineseData.search('读设定湿度') >= 0) {
          $('#' + 'hum' + mesh.name).text(
            modbusBmsvalue[itean][i] == undefined
              ? '暂无'
              : modbusBmsvalue[itean][i]
          )
        }
      }
      $('#' + 'cbCheck' + mesh.name).change(function () {
        var checkstatu = $('#' + 'cbCheck' + mesh.name).prop('checked')

        var stuts = checkstatu == true ? 1 : 0

        console.log(
          `http://192.168.1.6:9007/prod-api/modbusWrite/api/writeModbus?modbusType=` +
            itean +
            `&setValue=` +
            stuts +
            `&startIndex=` +
            Startindex +
            `&setType=2`
        )

        $.ajax({
          type: 'post',
          url:
            `http://192.168.1.6:9007/prod-api/modbusWrite/api/writeModbus?modbusType=` +
            itean +
            `&setValue=` +
            stuts +
            `&startIndex=` +
            Startindex +
            `&setType=2`,
          data: ChineseName,
          dataType: 'json',
          async: false, //默认为true 异步
          success: function (data) {
            ChineseName = data.data
          },
        })
      })

      var tag = document.getElementById(mesh.name)
      var meshLabel = new CSS3DSprite(tag)
      meshLabel.name = mesh.name + 'n'
      meshLabel.position.copy(mesh.getWorldPosition())
      meshLabel.element.style.visibility = 'visible'

      meshLabel.scale.set(0.15, 0.15, 0.15)

      scene.add(meshLabel)
      /**温度设置触发点击事件 */
      $('#' + 'temp' + mesh.name).click(function () {
        var repeat = scene.getObjectByName(mesh.name + 'hnn')
        if (repeat) {
        } else {
          addchangdata(mesh.name, mesh, meshname)
        }
      })
      /** 湿度设置触发点击事件*/
      $('#' + 'hum' + mesh.name).click(function () {
        var repeat = scene.getObjectByName(mesh.name + 'HUMhnn')
        if (repeat) {
        } else {
          addHUMdata(mesh.name, mesh, meshname)
        }
      })

      tag.onpointermove = function () {
        scene.getObjectByName(mesh.name + 'n').scale.set(0.15, 0.15, 0.15)
      }
      tag.onpointerleave = function () {
        scene.getObjectByName(mesh.name + 'n').scale.set(0.15, 0.15, 0.15)
      }
    }
  })
}
function deleteImg(meshname) {
  var Camera = scene.getObjectByName(meshname)
  Camera.traverse(function (mesh) {
    var CameraImgLabel = scene.getObjectByName(mesh.name + 'n')
    if (CameraImgLabel) CameraImgLabel.parent.remove(CameraImgLabel)
    if (meshname == '3F_BF' || meshname == '2F_PAU' || meshname == '4F_PAU') {
      var CameraImgLabel = scene.getObjectByName(mesh.name + 'hnn')
      if (CameraImgLabel) CameraImgLabel.parent.remove(CameraImgLabel)
    } else if (
      meshname == '3F_AHU' ||
      meshname == '2F_MAU' ||
      meshname == '3F_AHU'
    ) {
      var temLanel = scene.getObjectByName(mesh.name + 'hnn')

      if (temLanel) temLanel.parent.remove(temLanel)
      var humLabel = scene.getObjectByName(mesh.name + 'HUMhnn')

      if (humLabel) humLabel.parent.remove(humLabel)
    }
  })
}

function addchangTemptrue(name, mesh, meshname) {
  var tempvalue = $('#' + 'BF' + mesh.name).text()
  console.log('tempvalue: ', tempvalue)

  $('body').append(
    `
	  <div  id= "` +
      name +
      `hn">
		<input class="AHU_BF_input"  id ="` +
      name +
      `range"  type="range" min="15" max="40" step="1" value="` +
      tempvalue +
      `">
      </div>
`
  )

  var elem = document.getElementById(name + 'range')
  console.log('elem: ', elem)

  //获取一个想显示值的标签，并且初始化默认值
  var target = document.getElementById('BF' + mesh.name)
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

      if (controlLabel) controlLabel.parent.remove(controlLabel)

      /**确定后发送修改数值 */

      changeTempData(tempvalue, mesh, meshname)
    } else {
      target.innerHTML = tempvalue
      elem.value = tempvalue
    }
  }

  //绑定input监听事件

  elem.addEventListener('input', rangeValue)

  var tag = document.getElementById(name + 'hn')
  var controlLabel = new CSS3DSprite(tag)
  controlLabel.name = name + 'hnn'
  controlLabel.position.copy(mesh.getWorldPosition())
  controlLabel.position.z -= 1
  controlLabel.scale.set(0.1, 0.1, 0.1)
  scene.add(controlLabel)
}

/**设置空调的温度方法 */
function addchangdata(name, mesh, meshname) {
  var tempvalue = $('#' + 'temp' + mesh.name).text()
  console.log('tempvalue: ', tempvalue)

  $('body').append(
    `
	  <div  id= "` +
      name +
      `hn">
		<input class="AHU_temp_input"  id ="` +
      name +
      `range"  type="range" min="15" max="40" step="1" value="` +
      tempvalue +
      `">
      </div>
`
  )

  var elem = document.getElementById(name + 'range')
  console.log('elem: ', elem)

  //获取一个想显示值的标签，并且初始化默认值
  var target = document.getElementById('temp' + mesh.name)
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

      if (controlLabel) controlLabel.parent.remove(controlLabel)

      /**确定后发送修改数值 */
      changeTempData(tempvalue, mesh, meshname)
    } else {
      target.innerHTML = tempvalue
      elem.value = tempvalue
    }
  }

  //绑定input监听事件

  elem.addEventListener('input', rangeValue)

  var tag = document.getElementById(name + 'hn')
  var controlLabel = new CSS3DSprite(tag)
  controlLabel.name = name + 'hnn'
  controlLabel.position.copy(mesh.getWorldPosition())
  controlLabel.position.z -= 4
  controlLabel.scale.set(0.1, 0.1, 0.1)
  scene.add(controlLabel)
}
/**设置空调的湿度方法 */
function addHUMdata(name, mesh, meshname) {
  var tempvalue = $('#' + 'hum' + mesh.name).text()
  console.log('tempvalue: ', tempvalue)

  $('body').append(
    `
	  <div  id= "` +
      name +
      `HUMhn">
		<input class="AHU_hum_input"  id ="` +
      name +
      `HUMhnrange"  type="range" min="0" max="100" step="1" value="` +
      tempvalue +
      `">
      </div>
`
  )

  var elem = document.getElementById(name + 'HUMhnrange')
  console.log('elem: ', elem)

  //获取一个想显示值的标签，并且初始化默认值
  var target = document.getElementById('hum' + mesh.name)
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

      if (controlLabel) controlLabel.parent.remove(controlLabel)

      /**确定后发送修改数值 */
      changeHumData(tempvalue, mesh, meshname)
    } else {
      target.innerHTML = tempvalue
      elem.value = tempvalue
    }
  }

  //绑定input监听事件

  elem.addEventListener('input', rangeValue)

  var tag = document.getElementById(name + 'HUMhn')
  var controlLabel = new CSS3DSprite(tag)
  controlLabel.name = name + 'HUMhnn'
  controlLabel.position.copy(mesh.getWorldPosition())
  controlLabel.position.z += 2
  controlLabel.scale.set(0.1, 0.1, 0.1)
  scene.add(controlLabel)
}

/**提交温度修改 */
var ModbusBms_temp_startindex
function changeTempData(tempvalue, mesh, meshname) {
  console.log(meshname)
  var TempUrl, item
  if (meshname == '3F_BF') {
    item = mesh.parent.name
    TempUrl = '././json/ModbusVav_temp_startindex.json'
  } else if (meshname == '2F_MAU' || meshname == '2F_AHU') {
    item = mesh.name.slice(0, mesh.name.length - 9)
    TempUrl = '././json/ModbusBms_temp_startindex.json'
  } else if (meshname == '3F_AHU') {
    item = mesh.name == 'AHU-3-2' ? 'ModbusBms3f7' : 'ModbusBms3f5'
    TempUrl = '././json/ModbusBms_temp_startindex.json'
  } else if (meshname == '4F_pau') {
    switch (mesh.name) {
      case 'PAU3-1':
        item = 'ModbusBms3f1'
        break
      case 'PAU3-2':
        item = 'ModbusBms3f2'
        break
      case 'PAU3-3':
        item = 'ModbusBms3f3'
        break

      case 'PAU3-4':
        item = 'ModbusBms3f4'
        break
    }
    TempUrl = '././json/ModbusBms_temp_startindex.json'
  }
  /**查找对应接口 */
  $.ajax({
    type: 'get',
    url: TempUrl,
    data: ModbusBms_temp_startindex,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ModbusBms_temp_startindex = data
    },
  })
  console.log('item: ', item)
  console.log(ModbusBms_temp_startindex)
  var Startindex = ModbusBms_temp_startindex[item][mesh.name] - 1

  console.log(
    `http://192.168.1.6:9007/prod-api/modbusWrite/api/writeModbus?modbusType=` +
      item +
      `&setValue=` +
      tempvalue +
      `&startIndex=` +
      Startindex +
      `&setType=1`
  )
  /**带值发送请求 */
  $.ajax({
    type: 'post',
    url:
      `http://192.168.1.6:9007/prod-api/modbusWrite/api/writeModbus?modbusType=` +
      item +
      `&setValue=` +
      tempvalue +
      `&startIndex=` +
      Startindex +
      `&setType=1`,
    data: ChineseName,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ChineseName = data.data
    },
  })
}

/**提交湿度修改数据 */
var ModbusBms_hum_startindex
function changeHumData(tempvalue, mesh, meshname) {
  console.log(meshname)
  var TempUrl, item
  if (meshname == '2F_MAU' || meshname == '2F_AHU') {
    item = mesh.name.slice(0, mesh.name.length - 9)
  } else if (meshname == '3F_AHU') {
    item = mesh.name == 'AHU-3-2' ? 'ModbusBms3f7' : 'ModbusBms3f5'
  }

  /**查找对应接口 */
  $.ajax({
    type: 'get',
    url: '././json/ModbusBms_hum_startindex.json',
    data: ModbusBms_hum_startindex,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ModbusBms_hum_startindex = data
    },
  })
  console.log('item: ', item)

  var Startindex = ModbusBms_hum_startindex[item][mesh.name] - 1

  console.log(
    `http://192.168.1.6:9007/prod-api/modbusWrite/api/writeModbus?modbusType=` +
      item +
      `&setValue=` +
      tempvalue +
      `&startIndex=` +
      Startindex +
      `&setType=1`
  )
  /**带值发送请求 */
  $.ajax({
    type: 'post',
    url:
      `http://192.168.1.6:9007/prod-api/modbusWrite/api/writeModbus?modbusType=` +
      item +
      `&setValue=` +
      tempvalue +
      `&startIndex=` +
      Startindex +
      `&setType=1`,
    data: ChineseName,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {},
  })
}

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

export { render, AddMeshIntoArr }
