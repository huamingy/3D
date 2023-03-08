import * as THREE from '../../../build/three.module.js'

import { CSS3DSprite, CSS3DObject } from '../../jsm/renderers/CSS3DRenderer.js'
import {
  scene,
  camera,
  renderer,
  labelRender,
  mixer,
  clock,
  controls,
  label2DRender,
} from './control-system-sence.js'

import Stats from '../../jsm/libs/stats.module.js'
import { CSS2DObject } from '../../jsm/renderers/CSS2DRenderer.js'
//2.0、性能插件  监听fps
var stats = new Stats()
document.body.appendChild(stats.dom)

//子页面接收父页面传过来的数据
var str = window.location.search.slice(1, 6)
console.log('str: ', str)
var modbusScrewMachine, name, Chinese
name = 'modbusAhu' + str.slice(-1)

function addDataLabel(ModbusBms) {
  var Allbutton = scene.getObjectByName('Button').children

  $.ajax({
    type: 'get',
    url:
      'http://221.6.30.202:15006/prod-api/modbus/api/getNewestData?modbusType=' +
      name,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusScrewMachine = data.data[0]
      console.log('modbusScrewMachine: ', modbusScrewMachine)
    },
  })

  $.ajax({
    type: 'get',
    url: '../json/chain.json',
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      Chinese = data
      console.log('modbusScrewMachine: ', Chinese)
    },
  })
  $.ajax({
    type: 'get',
    url: '../json/startindex.json',
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ModbusBms_startindex = data
    },
  })
  for (const i in Allbutton) {
    if (Allbutton[i].name == 'systemStartStopTcp') {
      $('body').append(
        `<div class="label_style"><input id="cbCheck` +
          Allbutton[i].name +
          `" class="btn-switch large" type="checkbox" value="1" checked="false"></div>`
      )
      addCSS3DSprite('cbCheck' + Allbutton[i].name, Allbutton[i], 0.3, 0, 0, 0)
    } else if (Allbutton[i].name == 'faultReset') {
      $('body').append(
        `<div  class="label_class"id = "` +
          Allbutton[i].name +
          `">
            <div  class="chinsesname">` +
          Chinese[Allbutton[i].name].name +
          `</div>
            <input id="cbCheck` +
          Allbutton[i].name +
          `" class="btn-switch large" type="checkbox" value="1" checked="false">
          </div>`
      )
      console.log(modbusScrewMachine[Allbutton[i].name])
      $('#BF' + Allbutton[i].name).text(modbusScrewMachine[Allbutton[i].name])
      addCSS3DSprite(Allbutton[i].name, Allbutton[i], 0.3, 0, 0, 0)
    } else {
      $('body').append(
        `<div  class="label_class"id = "` +
          Allbutton[i].name +
          `">
          <div  class="chinsesname">` +
          Chinese[Allbutton[i].name].name +
          `</div>
          <div>    <div  class = "BF_temptrue_value"  id="BF` +
          Allbutton[i].name +
          `"></div>
        <div  id="unit" class= "BF_temptrue_unit">` +
          Chinese[Allbutton[i].name].unit +
          `</div>    </div>
        <input class="AHU_BF_input"  id ="` +
          Allbutton[i].name +
          `range"  type="range" min="0" max="100" step="1" value="` +
          modbusScrewMachine[Allbutton[i].name] +
          `">
        </div>`
      )
      /**设置值 */
      $('#BF' + Allbutton[i].name).text(modbusScrewMachine[Allbutton[i].name])
      //添加标签到对应位置
      addCSS3DSprite(Allbutton[i].name, Allbutton[i], 0.3, 0, 0, 0)

      //调用修改数值方法，并传参
      repairdata(Allbutton[i].name)
    }

    //设置滑块上限和下限
    switch (Allbutton[i].name) {
      // case 'setNewDamperOpen':
      //   $('#' + Allbutton[i].name + 'range').prop('min', 0)
      //   $('#' + Allbutton[i].name + 'range').prop('max', 100)
      //   break
      // case 'setFanFrequency':
      //   $('#' + Allbutton[i].name + 'range').prop('min', 0)
      //   $('#' + Allbutton[i].name + 'range').prop('max', 100)
      //   break
      // case 'setReturnAirTemperatureLowerLimit':
      //   $('#' + Allbutton[i].name + 'range').prop('min', 0)
      //   $('#' + Allbutton[i].name + 'range').prop('max', 100)
      //   break
      // case 'setReturnAirTemperatureUpperLimit':
      //   $('#' + Allbutton[i].name + 'range').prop('min', 0)
      //   $('#' + Allbutton[i].name + 'range').prop('max', 100)
      //   break
      case 'setReturnAirTemperature':
        $('#' + Allbutton[i].name + 'range').prop('min', 0)
        $('#' + Allbutton[i].name + 'range').prop('max', 40)
        break
    }

    /**判断开关状态 */
    if (modbusScrewMachine[Allbutton[i].name] == 1) {
      $('#cbCheck' + Allbutton[i].name).prop('checked', true)
    } else {
      $('#cbCheck' + Allbutton[i].name).prop('checked', false)
    }
    //开关状态改变后触发
    $('#cbCheck' + Allbutton[i].name).change(function () {
      var checkstatu = $('#cbCheck' + Allbutton[i].name).prop('checked')
      var stuts = checkstatu == true ? 1 : 0

      var Startindex = ModbusBms_startindex[name][Allbutton[i].name] - 1

      console.log(
        `http://192.168.1.20:9006/prod-api/modbusWrite/api/writeModbus?modbusType=` +
          name +
          `&setValue=` +
          stuts +
          `&startIndex=` +
          Startindex +
          `&setType=2`
      )
      $.ajax({
        type: 'post',
        url:
          `http://192.168.1.20:9006/prod-api/modbusWrite/api/writeModbus?modbusType=` +
          name +
          `&setValue=` +
          stuts +
          `&startIndex=` +
          Startindex +
          `&setType=2`,

        dataType: 'json',
        async: false, //默认为true 异步
        success: function (data) {},
      })
    })
  }
}

//修改数据的方法
function repairdata(name) {
  var tempvalue = $('#BF' + name).text()
  var elem = document.getElementById(name + 'range')

  //获取一个想显示值的标签，并且初始化默认值
  var target = document.getElementById('BF' + name)

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
      changeHumData(tempvalue, name)
    } else {
      target.innerHTML = tempvalue
      elem.value = tempvalue
    }
  }

  //绑定input监听事件

  elem.addEventListener('input', rangeValue)
}

//提交数值改变的方法
var ModbusBms_startindex
function changeHumData(tempvalue, tname) {
  console.log(name)
  var value
  /**查找对应接口 */
  $.ajax({
    type: 'get',
    url: '../json/startindex.json',
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ModbusBms_startindex = data
    },
  })

  if (tname.search('setReturnAir') >= 0) {
    // value = Number(tempvalue).toFixed(2)
    value = Number(tempvalue) * 100
  } else {
    value = tempvalue
  }

  var Startindex = ModbusBms_startindex[name][tname] - 1

  console.log(
    `http://192.168.1.20:9006/prod-api/modbusWrite/api/writeModbus?modbusType=` +
      name +
      `&setValue=` +
      value +
      `&startIndex=` +
      Startindex +
      `&setType=2`
  )
  /**带值发送请求 */
  $.ajax({
    type: 'post',
    url:
      `http://192.168.1.20:9006/prod-api/modbusWrite/api/writeModbus?modbusType=` +
      name +
      `&setValue=` +
      value +
      `&startIndex=` +
      Startindex +
      `&setType=2`,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {},
  })
}

var chinesebutton
function addBttonLabel() {
  $.ajax({
    type: 'get',
    url: '../json/chain.json',
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      chinesebutton = data
      // console.log('chinesebutton: ', chinesebutton)
    },
  })

  $.ajax({
    type: 'get',
    url: '../json/startindex.json',
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ModbusBms_startindex = data
    },
  })

  var Allbutton = scene.getObjectByName('Button').children
  for (const i in Allbutton) {
    var urlname = Allbutton[i].name.substring(0, Allbutton[i].name.indexOf('-'))

    $.ajax({
      type: 'get',
      url:
        'http://221.6.30.202:15006/prod-api/modbus/api/getNewestData?modbusType=' +
        urlname,

      dataType: 'json',
      async: false, //默认为true 异步
      success: function (data) {
        modbusScrewMachine = data.data[0]
        console.log('modbusScrewMachine: ', modbusScrewMachine)
      },
    })

    $('body').append(
      `<div  class="label_class"id = "` +
        Allbutton[i].name +
        `">
        <div  class="chinsesname">` +
        chinesebutton[Allbutton[i].name].name +
        `</div>
        <input id="cbCheck` +
        Allbutton[i].name +
        `" class="btn-switch large" type="checkbox" value="1" checked="false">
      </div>`
    )
    addCSS3DSprite(Allbutton[i].name, Allbutton[i], 0.3, 0, 0, 0)

    /**判断开关状态 */
    if (
      modbusScrewMachine[
        Allbutton[i].name.substring(
          Allbutton[i].name.indexOf('-') + 1,
          Allbutton[i].name.length
        )
      ] == 1
    ) {
      $('#cbCheck' + Allbutton[i].name).prop('checked', true)
    } else {
      $('#cbCheck' + Allbutton[i].name).prop('checked', false)
    }
    //开关状态改变后触发
    $('#cbCheck' + Allbutton[i].name).change(function () {
      var checkstatu = $('#cbCheck' + Allbutton[i].name).prop('checked')
      var stuts = checkstatu == true ? 1 : 0

      var Startindex =
        ModbusBms_startindex[
          Allbutton[i].name.substring(0, Allbutton[i].name.indexOf('-'))
        ][Allbutton[i].name] - 1

      console.log(
        `http://192.168.1.20:9006/prod-api/modbusWrite/api/writeModbus?modbusType=` +
          Allbutton[i].name.substring(0, Allbutton[i].name.indexOf('-')) +
          `&setValue=` +
          stuts +
          `&startIndex=` +
          Startindex +
          `&setType=2`
      )
      $.ajax({
        type: 'post',
        url:
          `http://192.168.1.20:9006/prod-api/modbusWrite/api/writeModbus?modbusType=` +
          Allbutton[i].name.substring(0, Allbutton[i].name.indexOf('-')) +
          `&setValue=` +
          stuts +
          `&startIndex=` +
          Startindex +
          `&setType=2`,

        dataType: 'json',
        async: false, //默认为true 异步
        success: function (data) {},
      })
    })
  }
}

//固定标签的方法
function addCSS3DSprite(
  name,
  mesh,
  scale = 0.4,
  positionX = 10,
  positionY = 0,
  positionZ = 0
) {
  var MAUtag = document.getElementById(name)
  var meshLabel = new CSS3DSprite(MAUtag)
  // console.log('meshLabel: ', meshLabel)

  meshLabel.name = name + 'n'
  meshLabel.position.copy(mesh.getWorldPosition())
  // meshLabel.element.style.visibility = 'visible'
  meshLabel.position.x += positionX
  meshLabel.position.y += positionY
  meshLabel.position.z += positionZ
  meshLabel.scale.set(scale, scale, scale)
  scene.add(meshLabel)
}

var modbusScrewMachine_message, modbusScrewMachine, modbusHumData

function addthlabel(AHUName, AHUclass, name, jsonname, jsonhumname) {
  console.log('jsonhumname: ', jsonhumname)
  console.log('jsonname: ', jsonname)

  var AHUT = scene.getObjectByName('T')
  var AHUH = scene.getObjectByName('H')

  var labelarray = [],
    labelHUMarray = []

  $.ajax({
    type: 'get',
    url: `../../json/` + jsonname + `.json`,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusScrewMachine_message = data.infoWindowField
    },
  })
  $.ajax({
    type: 'get',
    url: `../../json/` + jsonhumname + `.json`,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusHumData = data.infoWindowField
    },
  })
  $.ajax({
    type: 'get',
    url:
      'http://221.6.30.202:15006/prod-api/modbus/api/getNewestData?modbusType=' +
      name,

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      modbusScrewMachine = data.data[0]
    },
  })
  $('#th_label').html('')
  for (var i in modbusScrewMachine) {
    if (i.search('temp') >= 0 && i.length == 5) {
      $('#th_label').append(
        `<div id="` +
          modbusScrewMachine_message[i].id +
          `"  class=` +
          AHUclass +
          `>
          
          <div class = "out_label"><div class = "labelname_class">
          <img  class = "tempture" src="../../img/温度.png" />
          </div><div class = "labelvalue_class" >` +
          Number(modbusScrewMachine[i]).toFixed(2) +
          modbusScrewMachine_message[i].value +
          `</div></div></div>`
      )
      var la = document.getElementById(modbusScrewMachine_message[i].id)
      var ahula = new CSS3DSprite(la)

      // ahula.name = modbusScrewMachine_message[i].id + `n`
      labelarray.push(ahula)
    } else if (i.search('humidity') >= 0 && i.length == 9) {
      $('#th_label').append(
        `<div id="` +
          modbusHumData[i].id +
          `"  class="` +
          AHUclass +
          `"><div class = "out_label"><div class = "humidityname_class">
          <img  class = "humidity" src="../../img/湿度.png" /> 
          </div><div class = "humidityvalue_class" >` +
          Number(modbusScrewMachine[i]).toFixed(2) +
          modbusHumData[i].value +
          `</div></div></div>`
      )
      var la = document.getElementById(modbusHumData[i].id)
      var ahula = new CSS3DSprite(la)

      // ahula.material.depthWrite = false
      ahula.name = modbusHumData[i].id + 'n'
      labelHUMarray.push(ahula)
    }
  }
  console.log('AHUT.children: ', AHUT.children)
  console.log('AHUH.children: ', AHUH.children)
  //設置溫度标签位置
  for (var i in AHUT.children) {
    // if (AHUT.children[i].name.search('PT') >= 0) {
    labelarray[i].position.copy(AHUT.children[i].getWorldPosition())
    // }
    labelarray[i].name = AHUT.children[i].name + 'label'
    labelarray[i].scale.set(0.07, 0.07, 0.07)
    scene.add(labelarray[i])
  }
  //设置湿度标签位置

  for (var i in AHUH.children) {
    // if (AHUH.children[i].name.search('EE160') >= 0) {
    labelHUMarray[i].position.copy(AHUH.children[i].getWorldPosition())
    // }
    labelHUMarray[i].name = AHUH.children[i].name + 'label'
    labelHUMarray[i].scale.set(0.07, 0.07, 0.07)

    scene.add(labelHUMarray[i])
  }

  console.log(scene)
}

function render() {
  stats.update()
  const delta = 5 * clock.getDelta()

  // scene.traverse(darkenNonBloomed)
  // bloomComposer.render()
  // scene.traverse(restoreMaterial)
  renderer.render(scene, camera)
  // finalComposer.render()

  requestAnimationFrame(render)
  labelRender.render(scene, camera)
  label2DRender.render(scene, camera)
}

export { render, addDataLabel, addthlabel, addBttonLabel }
