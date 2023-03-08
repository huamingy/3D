import { scene, camera, renderer, controls } from './scene.js'
import { CSS2DRenderer, CSS2DObject } from '../jsm/renderers/CSS2DRenderer.js'
import * as THREE from '../../build/three.module.js'
import { CSS3DSprite, CSS3DObject } from '../jsm/renderers/CSS3DRenderer.js'
import { TWEEN } from '../jsm/libs/tween.module.min.js'

window.addEventListener('message', function (e) {
  const da = e.data
  console.log('da: ', da.params)
  document.getElementById('AllDept_out').style.visibility = da.params.visiblity
})

// 渲染函数
var granaryArr = []

var tag = document.getElementById('label')
var label = new CSS2DObject(tag)
label.name = '详细信息'
tag.style.pointerEvents = 'none' //避免HTML标签遮挡三维场景的鼠标事件

scene.add(label)

var chooseMesh = null

function choose(event, label) {
  if (chooseMesh) {
    // chooseMesh.material.color.set(0xffffff);// 把上次选中的mesh设置为原来的颜色
    var ee = scene.getObjectByName('详细信息')

    ee.element.style.visibility = 'hidden' //显示标签
    // label.element.style.visibility = 'hidden';
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
  //   console.log("射线投射器的对象 几何体",intersects[0].object.geometry.vertices)
  //   intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
    chooseMesh = intersects[0].object
    //chooseMesh.material.color.set(0x000000);//选中改变颜色，这样材质颜色贴图.map和color颜色会相乘
    var ee = scene.getObjectByName('详细信息')
    ee.element.style.visibility = 'visible' //显示标签
  }
}

addEventListener('click', choose) // 监听窗口鼠标单击事件
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
  var intersects = raycaster.intersectObjects(granaryArr)

  //   intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
    changecolorMesh = intersects[0].object

    changecolorMesh.material.color.set(0x00ffff)
  }
}

addEventListener('pointermove', pointermove)

function AddMeshIntoArr(mesh) {
  var device = scene.getObjectByName(mesh)
  device.traverse(function (obj) {
    if (obj.isMesh) {
      granaryArr.push(obj)
    }
  })
}
var repairdata,
  Arr = []

function repair() {
  $.ajax({
    type: 'get',
    url: 'https://developserve.com/prod-api/outside-specify-device/get-specify-data/2c2d84d83bdf5bc887130aea266c3ce3    ',
    // url: './js/result.json',

    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      repairdata = data.data
    },
  })
  $('#AllDept').html('')

  hidden('4F_Warning')
  hidden('5F_Warning')
  hidden('6F_Warning')
  hidden('7F_Warning')
  hidden('8F_Warning')
  hidden('9F_Warning')

  for (const i in repairdata) {
    repairMesh()
    Arr.push(repairdata[i].info.deviceCode)
    $('#AllDept').append(
      `<div class="outclass">    <div  class="dept_name">` +
        repairdata[i].info.deviceName +
        `</div><div   class="dept_unit">` +
        repairdata[i].info.deviceDetailAddress +
        `</div>    </div>
`
    )
  }
  $('#deptaccout').text(repairdata.length)
  setTimeout(repair, 3000)
}

var AllDepttag = document.getElementById('AllDept')
var AllDeptlabel = new CSS2DObject(AllDepttag)

/**房间报修 */
function repairMesh(meshName) {
  var mesh = scene.getObjectByName(meshName)
  mesh.visible = true
  mesh.material.transparent = true
  var b = { opacity: 0 }
  var tweenA = new TWEEN.Tween(b) //创建一段tween动画

  tweenA.to({ opacity: 1 }, 800)
  tweenA.onUpdate(function () {
    mesh.material.opacity = b.opacity
  })

  var tweenB = new TWEEN.Tween(b) //创建一段tween动画

  tweenB.to({ opacity: 0 }, 800)
  tweenB.onUpdate(function () {
    mesh.material.opacity = b.opacity
  })
  tweenA.start() //tween动画开始执行(你可以选择合适的时候触发执行)/

  tweenA.chain(tweenB)
  tweenB.chain(tweenA)
}
function hidden(groupname) {
  scene.getObjectByName(groupname).traverse(function (mesh) {
    if (mesh.isMesh && mesh.name.search('2022') >= 0) {
      mesh.visible = false
    }
  })
}
function delteFromArr(value) {
  for (var i = 0; i < Arr.length; i++) {
    if (Arr[i] == value) {
      Arr.splice(i, 1)
    }
  }
}

function render() {
  TWEEN.update() //tween更新
  renderer.render(scene, camera) //执行渲染操作
  requestAnimationFrame(render) //请求再次执行渲染函数render，渲染下一帧
}
/**自适应窗口 */
window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

function hiddendiv() {
  console.log('cxbcb')
}
export { render, AddMeshIntoArr, repair, hiddendiv }
