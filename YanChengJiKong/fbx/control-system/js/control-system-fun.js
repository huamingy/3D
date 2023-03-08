import {
  scene,
  renderer,
  camera,
  labelRenderer,
} from './control-system-scene.js'
import { CSS3DSprite } from '../../jsm/renderers/CSS3DRenderer.js'
import * as THREE from '../../../build/three.module.js'
import { FBXLoader } from '../../jsm/loaders/FBXLoader.js'

var close = document.getElementById('close')
var closelabel = new CSS3DSprite(close)
closelabel.name = 'closelabel'

var modbusBmsvalue, ChineseName
function AcctiveDATA() {
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
  // console.log('ChineseName: ', ChineseName)
}

var ModbusBms_Startindex
function addDataLabel(ModbusBms, PF) {
  AcctiveDATA()

  $.ajax({
    type: 'get',
    url: '../json/ModbusBms2F_startindex.json',
    data: ModbusBms_Startindex,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ModbusBms_Startindex = data
    },
  })

  // console.log('ModbusBms_Startindex: ', ModbusBms_Startindex)

  if (PF != undefined) {
    var AllPF = scene.getObjectByName(PF).children
    var iteam
    if (ModbusBms == 'ModbusBms2f4') {
      iteam = 'ModbusBms3f1'
    } else if (ModbusBms == 'ModbusBms2f12') {
      iteam = 'ModbusBms3f4'
    } else if (ModbusBms == 'ModbusBms2f9') {
      iteam = 'ModbusBms3f3'
    } else if (ModbusBms == 'ModbusBms2f8') {
      iteam = 'ModbusBms3f3'
    } else if (PF) {
      iteam = ModbusBms
    }
    for (const item in AllPF) {
      /**排风扇开关数据 */
      console.log('iteam: ', iteam)
      for (const i in ChineseName[iteam]) {
        console.log('ChineseName[iteam]: ', ChineseName[iteam])
        if (
          AllPF[item].name == 'PF2-38' ||
          AllPF[item].name == 'PF2-39' ||
          AllPF[item].name == 'PF2-15'
        ) {
          iteam = 'ModbusBms3f2'
        } else if (
          ModbusBms == 'ModbusBms2f8' &&
          AllPF[item].name == 'PF4-40'
        ) {
          iteam = 'ModbusBms2f8'
        } else if (ModbusBms == 'ModbusBms2f8') {
          iteam = 'ModbusBms3f3'
        }
        console.log(AllPF[item].name)

        console.log(ChineseName[iteam][i])

        if (
          ChineseName[iteam][i] != undefined &&
          ChineseName[iteam][i].search(AllPF[item].name) >= 0 &&
          ChineseName[iteam][i].search('运行') >= 0
        ) {
          console.log('ChineseName[iteam][i]: ', ChineseName[iteam][i])

          $('body').append(
            `<div class="label_style"><input id="cbCheck` +
              AllPF[item].name +
              `" class="btn-switch large" type="checkbox" value="1" checked="false"></div></div>
</div>`
          )
          document.getElementById('cbCheck' + AllPF[item].name).disabled = true

          $('#cbCheck' + AllPF[item].name).prop('title', '不可控制')
          if (modbusBmsvalue[iteam][i] == 1) {
            $('#cbCheck' + AllPF[item].name).prop('checked', true)
          } else {
            $('#cbCheck' + AllPF[item].name).prop('checked', false)
          }
        }

        addCSS3DSprite('cbCheck' + AllPF[item].name, AllPF[item], 0.17, 5, 0, 1)
      }
    }
  }

  var Alldata = scene.getObjectByName(ModbusBms).children

  for (const item in Alldata) {
    $('body').append(
      `<div  class="data_class"   id = "` +
        Alldata[item].name +
        `"> 
      <div     id="data-fengya"       class= "data-fengya">
      <div  class = "data-fengya_value"  id="` +
        Alldata[item].name +
        `fy"></div>
      <div  id="unit_T` +
        Alldata[item].name +
        `"   class= "data-fengya_unit">Pa</div>
      </div>
    
      <div   class= "data-kaidu"  >
      <div  class = "data-kaidu_value"  id="` +
        Alldata[item].name +
        `kd"></div>
      <div  id="unit_H` +
        Alldata[item].name +
        `"  class= "data-kaidu_unit">%</div></div>
           
              </div>`
    )

    var fengya, fengyakaidu, MeshName
    if (ModbusBms == 'ModbusBms2f2') {
      MeshName = Alldata[item].name
      fengya = Alldata[item].name + 'WindPress'
      fengyakaidu = Alldata[item].name + 'DamperOpen'
    } else if (ModbusBms == 'ModbusBms2f7') {
      fengya = Alldata[item].name + 'wd'
      fengyakaidu = Alldata[item].name + 'sd'
      MeshName = Alldata[item].name
      $('#unit_T' + Alldata[item].name).text('℃')
      $('#unit_H' + Alldata[item].name).text('%')

      $('.data-fengya').css('width', '70px')
      $('.data-kaidu').css('width', '70px')
      $('.data_class').css('width', '70px')
    } else if (Alldata[item].name.search('change') >= 0) {
      fengya = Alldata[item].name.replace(/change/, 'fy')
      fengyakaidu = Alldata[item].name.replace(/change/, 'ffkd')
      MeshName = Alldata[item].name.slice(0, Alldata[item].name.length - 7)
      console.log('MeshName: ', MeshName)
    } else {
      MeshName = Alldata[item].name

      fengya = Alldata[item].name + 'fy'
      fengyakaidu = Alldata[item].name + 'ffkd'
    }
    for (const i in ChineseName[ModbusBms]) {
      if (
        i.search(MeshName) >= 0 &&
        (ChineseName[ModbusBms][i].search('缓冲风压') >= 0 ||
          ChineseName[ModbusBms][i].search('缓冲风阀开度') >= 0)
      ) {
        $('#' + Alldata[item].name + 'fy').text(
          modbusBmsvalue[ModbusBms][fengya]
        )
        $('#' + Alldata[item].name + 'kd').text(
          modbusBmsvalue[ModbusBms][fengyakaidu]
        )
      } else if (
        i.search(MeshName) >= 0 &&
        (ChineseName[ModbusBms][i].search('风压') >= 0 ||
          ChineseName[ModbusBms][i].search('风阀开度') >= 0)
      ) {
        $('#' + Alldata[item].name + 'fy').text(
          modbusBmsvalue[ModbusBms][fengya]
        )
        $('#' + Alldata[item].name + 'kd').text(
          modbusBmsvalue[ModbusBms][fengyakaidu]
        )
      } else if (
        i.search(MeshName) >= 0 &&
        (ChineseName[ModbusBms][i].search('温度') >= 0 ||
          ChineseName[ModbusBms][i].search('湿度') >= 0)
      ) {
        $('#' + Alldata[item].name + 'fy').text(
          modbusBmsvalue[ModbusBms][fengya]
        )
        $('#' + Alldata[item].name + 'kd').text(
          modbusBmsvalue[ModbusBms][fengyakaidu]
        )
      }
      addCSS3DSprite(Alldata[item].name, Alldata[item], 0.22, 0, 0, 2)
    }
  }

  /**空调机组数据 */
  $('body').append(
    `<div  class="label_class"   id = "MAU"> 
  <div     id="MAU_TEMP"       class= "MAU_temptrue"   title="单击设置温度">
  <div  id="tempdata" class = "MAU_temptrue_value"  id="tem">` +
      (modbusBmsvalue[ModbusBms].readTemp == undefined
        ? '无'
        : modbusBmsvalue[ModbusBms].readTemp) +
      `</div>
  <div class= "MAU_temptrue_unit">℃</div>
  </div>

  <div id="MAU_hum"  class= "MAU_hum" title="单击设置湿度" >
  <div id="humdata" class = "MAU_hum_value"  >` +
      (modbusBmsvalue[ModbusBms].readHumidity == undefined
        ? '无'
        : modbusBmsvalue[ModbusBms].readHumidity) +
      `</div>
  <div class= "MAU_hum_unit">%</div></div>
          <div class="label_style"><input id="cbCheck" class="btn-switch large" type="checkbox" value="1" checked="false"></div>
          </div>
          </div>
  `
  )
  var mesh = scene.getObjectByName(ModbusBms + '_Lable')
  $('#cbCheck').change(function () {
    var checkstatu = $('#' + 'cbCheck').prop('checked')
    var stuts = checkstatu == true ? 1 : 0
    var Startindex = ModbusBms_Startindex[ModbusBms][mesh.name] - 1
    console.log(
      `http://192.168.1.6:9007/prod-api/modbusWrite/api/writeModbus?modbusType=` +
        ModbusBms +
        `&setValue=` +
        stuts +
        `&startIndex=` +
        Startindex +
        `&setType=2`
    )
    // $.ajax({
    //   type: 'post',
    //   url:
    //     `http://192.168.1.6:9007/prod-api/modbusWrite/api/writeModbus?modbusType=` +
    //     mesh.parent.name +
    //     `&setValue=` +
    //     stuts +
    //     `&startIndex=` +
    //     Startindex +
    //     `&setType=2`,
    //   data: ChineseName,
    //   dataType: 'json',
    //   async: false, //默认为true 异步
    //   success: function (data) {
    //     ChineseName = data.data
    //   },
    // })
  })

  $('#MAU_TEMP').click(function () {
    var repeat = scene.getObjectByName(mesh.name + 'tempn')
    if (repeat) {
    } else {
      addchangdata(mesh.name, mesh, ModbusBms)
    }
  })
  /** 湿度设置触发点击事件*/
  $('#MAU_hum').click(function () {
    var repeat = scene.getObjectByName(mesh.name + 'HUMhnn')
    if (repeat) {
    } else {
      addHUMdata(mesh.name, mesh, ModbusBms)
    }
  })
  console.log(
    'scene.getObjectByName(ModbusBms +  ',
    scene.getObjectByName(ModbusBms + '_Lable')
  )
  addCSS3DSprite('MAU', scene.getObjectByName(ModbusBms + '_Lable'), 0.2, 25)

  /**送风机数据 */
  $('body').append(
    `<div  class="label_class"   id = "HZ"> 
  <div     id="MAU_HUM"       class= "MAU_temptrue"   title="风机频率">
  <div  class = "MAU_temptrue_value"  id="MAU">` +
      (ModbusBms == 'ModbusBms2f2'
        ? modbusBmsvalue[ModbusBms].airSupplyHz
        : modbusBmsvalue[ModbusBms].sfjpl) +
      `</div>
  <div  class="MAU_temptrue_unit">HZ</div>

  </div>
          </div>
  `
  )
  addCSS3DSprite(
    'HZ',
    scene.getObjectByName(ModbusBms + '_Lable'),
    0.2,
    10,
    0,
    0
  )
}

/**设置空调的温度方法 */
function addchangdata(name, mesh, meshname) {
  var tempvalue = $('#tempdata').text()
  console.log('tempvalue: ', tempvalue)

  $('body').append(
    `
	  <div  id= "` +
      name +
      `temp">
		<input class="AHU_temp_input"  id ="` +
      name +
      `range"  type="range" min="15" max="40" step="1" value="` +
      tempvalue +
      `">
      </div>
`
  )

  var elem = document.getElementById(name + 'range')

  //获取一个想显示值的标签，并且初始化默认值
  var target = document.getElementById('tempdata')

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
      var controlLabel = scene.getObjectByName(mesh.name + 'tempn')
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

  addCSS3DSprite(name + 'temp', mesh, 0.1, 25, 5, -4)

  // var tag = document.getElementById()
  // var controlLabel = new CSS3DSprite(tag)
  // controlLabel.name = name + 'hnn'
  // controlLabel.position.copy(mesh.getWorldPosition())
  // controlLabel.position.z += 0.5
  // controlLabel.scale.set(0.1, 0.1, 0.1)
  // scene.add(controlLabel)
}

/**设置空调的湿度方法 */
function addHUMdata(name, mesh, meshname) {
  var tempvalue = $('#humdata').text()

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

  //获取一个想显示值的标签，并且初始化默认值
  var target = document.getElementById('humdata')

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
      var controlLabel = scene.getObjectByName(mesh.name + 'HUMhnn')
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

  addCSS3DSprite(name + 'HUMhn', mesh, 0.1, 25, 0, 2)
}

/**提交温度修改 */
var ModbusBms_temp_startindex
function changeTempData(tempvalue, mesh, meshname) {
  var TempUrl, item
  if (meshname == '3F_BF') {
    item = mesh.parent.name
    TempUrl = '././json/ModbusVav_temp_startindex.json'
  } else if (
    meshname == '2F_MAU' ||
    meshname == '2F_AHU' ||
    meshname == '3F_AHU' ||
    meshname == '4F_PAU'
  ) {
    item = mesh.name.slice(0, mesh.name.length - 9)
    TempUrl = '././json/ModbusBms_temp_startindex.json'
  }
  /**查找对应接口 */
  $.ajax({
    type: 'get',
    url: '../json/ModbusBms_temp_startindex.json',
    data: ModbusBms_temp_startindex,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ModbusBms_temp_startindex = data
    },
  })

  var Startindex = ModbusBms_temp_startindex[meshname][mesh.name] - 1

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

var ModbusBms_hum_startindex
function changeHumData(tempvalue, mesh, meshname) {
  var TempUrl, item
  /**查找对应接口 */
  $.ajax({
    type: 'get',
    url: '../json/ModbusBms_hum_startindex.json',
    data: ModbusBms_hum_startindex,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      ModbusBms_hum_startindex = data
    },
  })
  // console.log('item: ', ModbusBms_hum_startindex)

  var Startindex = ModbusBms_hum_startindex[meshname][mesh.name] - 1

  console.log(
    `http://192.168.1.6:9007/prod-api/modbusWrite/api/writeModbus?modbusType=` +
      meshname +
      `&setValue=` +
      tempvalue +
      `&startIndex=` +
      Startindex +
      `&setType=1`
  )
  /**带值发送请求 */
  //   $.ajax({
  //     type: 'post',
  //     url:
  //       `http://192.168.1.6:9007/prod-api/modbusWrite/api/writeModbus?modbusType=` +
  //       item +
  //       `&setValue=` +
  //       tempvalue +
  //       `&startIndex=` +
  //       Startindex +
  //       `&setType=1`,
  //     data: ChineseName,
  //     dataType: 'json',
  //     async: false, //默认为true 异步
  //     success: function (data) {},
  //   })
}

function addCSS3DSprite(
  name,
  mesh,
  scale = 0.4,
  positionX = 10,
  positionY = 0,
  positionZ = 0
) {
  // console.log(name)
  var MAUtag = document.getElementById(name)
  var meshLabel = new CSS3DSprite(MAUtag)
  meshLabel.name = name + 'n'
  meshLabel.position.copy(mesh.getWorldPosition())
  meshLabel.element.style.visibility = 'visible'
  meshLabel.position.x += positionX
  meshLabel.position.y += positionY
  meshLabel.position.z += positionZ
  meshLabel.scale.set(scale, scale, scale)
  scene.add(meshLabel)
}
var changecube, speednum
function addtexturemove(pipe, num, color) {
  var cube = scene.getObjectByName(pipe)

  setInterval(() => {
    cube.material.map.offset.x += 0.005
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

export { render, addDataLabel, addtexturemove }
