import * as THREE from '../../../build/three.module.js'
import { CSS3DObject, CSS3DSprite } from '../../jsm/renderers/CSS3DRenderer.js'
import { scene, camera, labelRenderer } from './scene.js'

var primaryMesh = []
var CSS3Tlabel, Tlabel, mintor_CSS3Hlabel, mintor_Tlabel
// 创建一个CSS3渲染器CSS2DRenderer

function addMeshToPrimary(Click_Mesh) {
  scene.getObjectByName(Click_Mesh).traverse(function (mesh) {
    mesh.isMesh && primaryMesh.push(mesh)
  })
}

var pointermoveMesh
function pointermove() {
  if (pointermoveMesh) {
    pointermoveMesh.material.emissive.set(0x000000)
    HiddenLabelData()
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
  var intersects = raycaster.intersectObjects(primaryMesh)

  //   intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
    pointermoveMesh = intersects[0].object
    // console.log('pointermoveMesh: ', pointermoveMesh.name)

    pointermoveMesh.material.emissive.set(0x28be28)
    if (pointermoveMesh.parent.name == '5F_Click') {
      showLabelData(pointermoveMesh, '../json/mudus.json')
    } else {
      showLabelData(pointermoveMesh, '../json/NanJingNan.json')
    }
  }
}

function showLabelData(pointermoveMesh, url) {
  var JgMessage
  $.ajax({
    type: 'get',
    url: url,
    data: JgMessage,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      JgMessage = data
    },
  })
  // console.log(pointermoveMesh)
  // console.log('JgMessage: ', JgMessage)
  for (var i in JgMessage) {
    if (JgMessage[i].deviceNo == pointermoveMesh.name) {
      $('#pointmove').html('')
      $('#pointmove').append(
        `

<div  id="JG_Data"  >
			<div  class="JG_Data_label_title">
			<a>` +
          JgMessage[i].warnInfo +
          `</a>
			</div>
			<div  class="JG_Data_label"><a>状态</a></div>
			<div  class="JG_Data_label"><a>` +
          JgMessage[i].data +
          `</a></div>
		</div>
`
      )
      var T = document.getElementById('JG_Data')
      var CSS3Tlabel = new CSS3DSprite(T)
      CSS3Tlabel.scale.set(0.06, 0.06, 0.06)
      CSS3Tlabel.name = 'JG_label'
      CSS3Tlabel.position.copy(pointermoveMesh.getWorldPosition())
      CSS3Tlabel.position.y += 10
      scene.add(CSS3Tlabel)
    }
  }
}

function HiddenLabelData() {
  let name = scene.getChildByName('JG_label')
  if (name) name.parent.remove(name)
}

function addTemHUM(URl, THGroup, LS, YG) {
  var message
  $.ajax({
    type: 'get',
    url: URl,
    data: message,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      message = data.data
    },
  })
  console.log('message: ', message)
  $.each(message, function (i, team) {
    if (URl.slice(-1) == '3') {
      if (i % 2 == 0 && i < 12) {
        addData(message, i, i, THGroup, '℃', '../img/温度.png', '温度', 4)
        addData(message, i + 1, i, THGroup, '%', '../img/湿度.png', '湿度', 0)
      } else if (message[i].deviceName.search('漏水') >= 0) {
        // console.log(i)
        addData(
          message,
          i,
          2 * (i - 12),
          LS,
          '',
          '../img/漏水感应器.png',
          '漏水',
          0
        )
      }
    } else {
      if (i % 2 == 0 && i < 8) {
        addData(message, i, i, THGroup, '℃', '../img/温度.png', '温度', 4)
        addData(message, i + 1, i, THGroup, '%', '../img/湿度.png', '湿度', 0)
      } else if (message[i].deviceName.search('漏水') >= 0) {
        // console.log(i)
        addData(
          message,
          i,
          2 * (i - 8),
          LS,
          '',
          '../img/漏水感应器.png',
          '漏水',
          0
        )
      }
    }
  })
}

function addData(message, i, m, THGroup, unit, imgurl, LabelName, positionz) {
  $('#TH_Label').append(
    `
    <div   id="TH` +
      i +
      `">
<img  src="` +
      imgurl +
      `"/>

<div   class="TH_class" >` +
      message[i].deviceName +
      `：` +
      (message[i].data == 0
        ? '正常'
        : message[i].data == 1
        ? '报警'
        : message[i].data) +
      unit +
      `</div></div>`
  )
  var T = document.getElementById('TH' + i)
  CSS3Tlabel = new CSS3DSprite(T)
  CSS3Tlabel.scale.set(0.015, 0.015, 0.015)

  if (THGroup.search('TH') >= 0 || THGroup.search('_WLA') >= 0) {
    CSS3Tlabel.position.copy(
      scene.getChildByName(THGroup).children[m / 2].getWorldPosition()
    )
    THGroup.search('_WLA') >= 0
      ? (CSS3Tlabel.position.y -= 13)
      : (CSS3Tlabel.position.y += 5)
  } else if (THGroup.search('_SAFE') >= 0) {
    CSS3Tlabel.position.copy(scene.getChildByName(THGroup).getWorldPosition())
  }

  CSS3Tlabel.name = LabelName + m / 2
  CSS3Tlabel.position.z += positionz
  scene.add(CSS3Tlabel)

  addOtherBigLabel(i, m, unit, message, THGroup)
}

/**温湿度标签的鼠标悬浮事件 */
function addOtherBigLabel(i, m, unit, message, THGroup) {
  document.getElementById('TH' + i).onpointermove = function () {
    // console.log(Tlabel)
    if (Tlabel !== undefined) {
      Tlabel.element.style.visibility = 'visible'
    }
    $('#pointmove').html('')
    $('#pointmove').append(
      `<div id="H_value` +
        i +
        `"  class="TH_class_point" >` +
        message[i].deviceName +
        `：` +
        (message[i].data == 0
          ? '正常'
          : message[i].data == 1
          ? '报警'
          : message[i].data) +
        unit +
        `</div>`
    )

    var T = document.getElementById('pointmove')
    Tlabel = new CSS3DSprite(T)
    Tlabel.scale.set(0.06, 0.06, 0.06)

    if (THGroup.search('TH') >= 0 || THGroup.search('_WLA') >= 0) {
      Tlabel.position.copy(
        scene.getChildByName(THGroup).children[m / 2].getWorldPosition()
      )
      THGroup.search('_WLA') >= 0
        ? (Tlabel.position.y -= 10)
        : (Tlabel.position.y += 5)
    } else if (THGroup.search('_SAFE') >= 0) {
      Tlabel.position.copy(scene.getChildByName(THGroup).getWorldPosition())
    }
    Tlabel.position.y += 10

    scene.add(Tlabel)
  }

  document.getElementById('TH' + i).onpointerleave = function () {
    Tlabel.element.style.visibility = 'hidden'
  }
}

// function(){

// }
var faultmessage,
  dd = 1
var color = []
function monitor(FaultURL, AlLCKICK) {
  var meshcolor = scene.getObjectByName(AlLCKICK).children

  ajax(FaultURL, AlLCKICK, meshcolor)
}

function ajax(FaultURL, AlLCKICK, meshcolor) {
  $.ajax({
    type: 'get',
    url: FaultURL,
    data: faultmessage,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      faultmessage = data.data
    },
  })
  console.log('faultmessage: ', faultmessage)
  // console.log('faultmessage: ', faultmessage.length)
  if (faultmessage.length > 0) {
    for (const i in faultmessage) {
      // console.log(faultmessage[i].deviceNo)

      addJG_label(i, faultmessage)
    }
  } else if (faultmessage.length == 0) {
    for (var iteam in meshcolor) {
      meshcolor[iteam].material.color.set(0xffffff)
      // console.log(meshcolor[iteam].material.color)
      if (mintor_CSS3Hlabel)
        mintor_CSS3Hlabel.element.style.visibility = 'hidden'
    }
  }
  dd++
  // console.log(dd)

  setTimeout(function () {
    ajax(FaultURL, AlLCKICK, meshcolor)
  }, 30000)
}

function addJG_label(i, message) {
  $('body').append(
    `<div id="` +
      message[i].deviceNo +
      `">
<img src="../img/故障.png" >
</div>`
  )

  // scene.getObjectByName(i).material.emissive.set(0x963200)

  var H = document.getElementById(message[i].deviceNo)
  mintor_CSS3Hlabel = new CSS3DSprite(H)
  mintor_CSS3Hlabel.scale.set(0.015, 0.015, 0.015)
  mintor_CSS3Hlabel.name = message[i].deviceNo
  mintor_CSS3Hlabel.position.copy(
    scene.getObjectByName(message[i].deviceNo).getWorldPosition()
  )
  scene.getChildByName(message[i].deviceNo).material.color.set(0xff8c00)
  mintor_CSS3Hlabel.position.y += 2
  scene.add(mintor_CSS3Hlabel)

  document.getElementById(message[i].deviceNo).onpointermove = function () {
    if (mintor_Tlabel !== undefined) {
      mintor_Tlabel.element.style.visibility = 'visible'
    }

    // console.log('故障进入')
    $('body').append(
      `<div  class="fault-class"   id="label` +
        i +
        `">
  ` +
        message[i].warnInfo +
        `
  </div>`
    )

    var T = document.getElementById('label' + i)
    mintor_Tlabel = new CSS3DSprite(T)
    mintor_Tlabel.scale.set(0.06, 0.06, 0.06)

    mintor_Tlabel.position.copy(
      scene.getChildByName(message[i].deviceNo).getWorldPosition()
    )
    mintor_Tlabel.position.z += 7
    scene.add(mintor_Tlabel)
  }
  document.getElementById(message[i].deviceNo).onpointerleave = function () {
    mintor_Tlabel.element.style.visibility = 'hidden'
  }
}

export {
  addTemHUM,
  addMeshToPrimary,
  primaryMesh,
  labelRenderer,
  pointermove,
  monitor,
}
