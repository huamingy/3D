import * as THREE from '../../../build/three.module.js'
import { GUI } from '../../jsm/libs/dat.gui.module.js'
import { FBXLoader } from '../../jsm/loaders/FBXLoader.js'
import {
  labelRenderer,
  scene,
  renderer,
  camera,
  controls,
} from './YanChengJikong_scene.js'
import {
  CSS2DRenderer,
  CSS2DObject,
} from '../../jsm/renderers/CSS2DRenderer.js'
import { CSS3DSprite } from '../../jsm/renderers/CSS3DRenderer.js'

var nextPos = new THREE.Vector3() //射线点击建筑对应XOZ平面坐标
var dir = new THREE.Vector3() //飞行漫游方向，起始点构成的方向 默认值0，0，0

/**
 * 创建场景对象Scene
 */

// //  坐标系
// var axesHelper = new THREE.AxesHelper(115);
// scene.add(axesHelper);

var granaryArr = [],
  CameraGroup = new THREE.Group()

var loader = new FBXLoader() //创建一个FBX加载器
loader.load('./models/YanChengJiKongOpacity.FBX', function (obj) {
  console.log('查看返回的模型数据', obj)
  obj.traverse(function (obj) {
    if (obj.name == '3F' || obj.name == '2F') {
      // obj.material.color.set(0x001144)
      //   obj.material = new THREE.MeshLambertMaterial({
      //     transparent: true,
      //     opacity: 0.6,
      //     color:0x0011ee,
      //   })
    }
  })

  scene.add(obj)
  var fool = scene.getObjectByName('Floor')

  fool.scale.set(5, 5, 5)
  AddMeshIntoArr('2F_Equipment')
  AddMeshIntoArr('3F_Equipment')

  addtexture()
})
/**添加点击按钮 */

render()

var changemodbusBmsUrl,
  changeJsonUrl,
  modbusBms2f1json,
  modbusBms2f1,
  modbusBms,
  modbusBmsvalue
var modbusBmsUrl =
  'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusType=modbusBms2f1'
var JsonUrl =
  'http://221.6.30.202:15007/prod-api/modbus/api/getFieldDetails?modbusType=modbusBms2f1'

$.extend({
  chURL: function (UrlName, JsonName) {
    changemodbusBmsUrl = modbusBmsUrl.replace(
      /modbusType=modbusBms2f1/,
      UrlName
    )
    changeJsonUrl = JsonUrl.replace(/modbusBms2f1/, JsonName)
  },
})

function changeURL(UrlName, JsonName) {
  $.chURL(UrlName, JsonName)

  $.ajax({
    type: 'get',
    url: changeJsonUrl,
    data: modbusBms,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusBms = data.data
      console.log('modbusBms: ', modbusBms)
    },
  })

  $.ajax({
    type: 'get',
    url: changemodbusBmsUrl,
    data: modbusBmsvalue,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusBmsvalue = data.data
    },
  })

  if (JsonName == 'modbusBms2f1') {
    modbusBms2f1json = modbusBms.ModbusBms2f1
    modbusBms2f1 = modbusBmsvalue.ModbusBms2f1
  } else if (JsonName == 'modbusBms2f2') {
    modbusBms2f1json = modbusBms.ModbusBms2f2
    modbusBms2f1 = modbusBmsvalue.ModbusBms2f2
  } else if (JsonName == 'modbusBms2f3') {
    modbusBms2f1json = modbusBms.ModbusBms2f3
    modbusBms2f1 = modbusBmsvalue.ModbusBms2f3
  } else if (JsonName == 'modbusBms2f4') {
    modbusBms2f1json = modbusBms.ModbusBms2f4
    modbusBms2f1 = modbusBmsvalue.ModbusBms2f4
  } else if (JsonName == 'modbusBms2f5') {
    modbusBms2f1json = modbusBms.ModbusBms2f5
    modbusBms2f1 = modbusBmsvalue.ModbusBms2f5
  } else if (JsonName == 'modbusBms2f6') {
    modbusBms2f1json = modbusBms.ModbusBms2f6
    modbusBms2f1 = modbusBmsvalue.ModbusBms2f6
  } else if (JsonName == 'modbusBms2f7') {
    modbusBms2f1json = modbusBms.ModbusBms2f7
    modbusBms2f1 = modbusBmsvalue.ModbusBms2f7
  } else if (JsonName == 'modbusBms2f8') {
    modbusBms2f1json = modbusBms.ModbusBms2f8
    modbusBms2f1 = modbusBmsvalue.ModbusBms2f8
  } else if (JsonName == 'modbusBms2f9') {
    modbusBms2f1json = modbusBms.ModbusBms2f9
    modbusBms2f1 = modbusBmsvalue.ModbusBms2f9
  } else if (JsonName == 'modbusBms2f10') {
    modbusBms2f1json = modbusBms.ModbusBms2f10
    modbusBms2f1 = modbusBmsvalue.ModbusBms2f10
  } else if (JsonName == 'modbusBms2f11') {
    modbusBms2f1json = modbusBms.ModbusBms2f11
    modbusBms2f1 = modbusBmsvalue.ModbusBms2f11
  } else if (JsonName == 'modbusBms2f12') {
    modbusBms2f1json = modbusBms.ModbusBms2f12
    modbusBms2f1 = modbusBmsvalue.ModbusBms2f12
  } else if (JsonName == 'modbusBms2f13') {
    modbusBms2f1json = modbusBms.ModbusBms2f13
    modbusBms2f1 = modbusBmsvalue.ModbusBms2f13
  } else if (JsonName == 'modbusBms3f5') {
    modbusBms2f1json = modbusBms.ModbusBms3f5
    modbusBms2f1 = modbusBmsvalue.ModbusBms3f5
  } else if (JsonName == 'modbusBms3f7') {
    modbusBms2f1json = modbusBms.ModbusBms3f7
    modbusBms2f1 = modbusBmsvalue.ModbusBms3f7
  }

  $('#labelone').html('')
  for (const item in modbusBms2f1json) {
    // console.log('modbusBms2f1json[item]: ', modbusBms2f1json[item]);

    // if (modbusBms2f1json[item] != null && (item.search("jzzt") == 0 || item.search("Status") > 0 || item.search("Fault") > 0) && modbusBms2f1json[item] != "预留") {
    if (
      modbusBms2f1json[item] != null &&
      modbusBms2f1json[item].search('温度') == -1 &&
      modbusBms2f1json[item].search('湿度') == -1 &&
      modbusBms2f1json[item] != '预留'
    ) {
      $('#labelone').append(
        ' <div class="namestyle_first"> <div class="namestyle_first_name">' +
          modbusBms2f1json[item] +
          '</div><span id="run" class="namestyle_first_value">' +
          (modbusBms2f1[item] == 0
            ? '关'
            : modbusBms2f1[item] == 1
            ? '开'
            : modbusBms2f1[item]) +
          '</span></div>'
      )
    }
  }
}

var modbusBms2f1, modbusBms2f1TH, modbusVav, modbusVav3f1TH
/*获取二楼空调设备的值 */
$.ajax({
  type: 'get',
  url: 'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusType',
  data: modbusBms2f1TH,
  dataType: 'json',
  async: false, //默认为true 异步
  success: function (data) {
    modbusBms2f1TH = data.data
    console.log('modbusBms2f1TH: ', modbusBms2f1TH)
  },
})

/**获取所有字段中文名称 */
$.ajax({
  type: 'get',
  url: 'http://221.6.30.202:15007/prod-api/modbus/api/getFieldDetails?modbusType',
  data: modbusVav3f1TH,
  dataType: 'json',
  async: false, //默认为true 异步
  success: function (data) {
    modbusVav3f1TH = data.data
  },
})

/**获取三楼VAv设备值 */
$.ajax({
  type: 'get',
  url: 'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusFloor=3f',
  data: modbusVav,
  dataType: 'json',
  async: false, //默认为true 异步
  success: function (data) {
    modbusVav = data.data
  },
})
/**二楼十三个空调设备组 */
var TwoModbusBmsLabel = new THREE.Group()
/**三楼六个空调设备组 */
var ThreeModbusBms3fLgroup = new THREE.Group()
var Threegroup = new THREE.Group()

for (const item in modbusVav3f1TH) {
  if (item.search('ModbusBms2f') == 0) {
    $('#threeVAV').append(
      '<div id="ID_' +
        item +
        '" class="twofloor-labelclass"><div id="' +
        item +
        '" class="twofloor-label_center"></div></div>'
    )
    $.each(modbusVav3f1TH[item], function (i, me) {
      if ((me.search('湿度') > 0 || me.search('温度') > 0) && me.length <= 4) {
        $('#' + item).append(
          '<div class="tem-name">' +
            me +
            '</div> <div class="hum-name">' +
            modbusBms2f1TH[item][i] +
            '</div>'
        )
      }
    })
    var ModbusBms2f = document.getElementById('ID_' + item)
    var ModbusBms2flabel = new CSS3DSprite(ModbusBms2f)
    ModbusBms2flabel.name = item
    TwoModbusBmsLabel.add(ModbusBms2flabel)
  } else if (
    item.search('ModbusBms3f') == 0 &&
    item.search('ModbusBms3f6') == -1
  ) {
    $('#threeVAV').append(
      '<div id="ID_' +
        item +
        '" class="labelclass"><div id="' +
        item +
        '" class="label_center"></div></div>'
    )
    $.each(modbusVav3f1TH[item], function (i, me) {
      if (me.search('湿度') > 0 || me.search('温度') > 0) {
        $('#' + item).append(
          '<div class="tem-name">' +
            me +
            '</div> <div class="hum-name">' +
            modbusVav[item][i] +
            '</div>'
        )
      }
    })
    var ModbusBms3f = document.getElementById('ID_' + item)
    var ModbusBms3flabel = new CSS3DSprite(ModbusBms3f)
    ModbusBms3flabel.name = item
    ThreeModbusBms3fLgroup.add(ModbusBms3flabel)
  }

  var ModbusBms3f = document.getElementById('ID_' + item)
  var ModbusBms3flabel = new CSS3DSprite(ModbusBms3f)
  ModbusBms3flabel.name = item
  Threegroup.add(ModbusBms3flabel)
}

var ThreeVAVLabelgroup = new THREE.Group()

for (var item in modbusVav3f1TH) {
  if (item.search('ModbusVav') == 0) {
    $('body').append(
      '<div id="ID_' +
        item +
        '" class="labelclass"><div id="' +
        item +
        '" class="label_center"></div></div>'
    )
    $.each(modbusVav3f1TH[item], function (i, me) {
      if (me.search('湿度') > 0 || me.search('温度') > 0) {
        $('#' + item).append(
          '<div class="tem-name">' +
            me +
            '</div> <div class="hum-name">' +
            modbusVav[item][i] +
            '</div>'
        ) /*modbusVav.item[i]*/
        // console.log(item)
      }
    })

    var ThreeVAV = document.getElementById('ID_' + item)
    var ThreeVAVlabel = new CSS3DSprite(ThreeVAV)
    ThreeVAVlabel.name = item
    ThreeVAVLabelgroup.add(ThreeVAVlabel)
  }
}

scene.add(ThreeVAVLabelgroup)
scene.add(TwoModbusBmsLabel)
scene.add(ThreeModbusBms3fLgroup)
console.log('ThreeModbusBms3fLgroup: ', ThreeModbusBms3fLgroup)
console.log('TwoModbusBmsLabel: ', Threegroup)

function addTwoFloorlabel(meshname) {
  var outf = scene.getObjectByName(meshname)
  for (var i = 0; i < TwoModbusBmsLabel.children.length; i++) {
    TwoModbusBmsLabel.children[i].position.copy(
      outf.children[i].getWorldPosition()
    )
    TwoModbusBmsLabel.children[i].element.style.visibility = 'visible'
    TwoModbusBmsLabel.children[i].scale.set(0.4, 0.4, 0.4)
  }
}

function addThreeFloorlabel(meshname) {
  var outf = scene.getObjectByName(meshname)
  for (var i = 0; i < ThreeVAVLabelgroup.children.length; i++) {
    ThreeVAVLabelgroup.children[i].position.copy(
      outf.children[i].getWorldPosition()
    )
    ThreeVAVLabelgroup.children[i].element.style.visibility = 'visible'
    ThreeVAVLabelgroup.children[i].position.y += 25
    ThreeVAVLabelgroup.children[i].scale.set(0.25, 0.25, 0.25)
  }
}

function ThreeModbusBms3fLabel(meshname) {
  var outf = scene.getObjectByName(meshname)
  for (var i = 0; i < ThreeModbusBms3fLgroup.children.length; i++) {
    ThreeModbusBms3fLgroup.children[i].position.copy(
      outf.children[i].getWorldPosition()
    )
    ThreeModbusBms3fLgroup.children[i].element.style.visibility = 'visible'
    ThreeModbusBms3fLgroup.children[i].scale.set(0.4, 0.4, 0.4)
  }
}
