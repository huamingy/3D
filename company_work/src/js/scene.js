import * as THREE from '../../build/three.module.js'
import { FBXLoader } from '../jsm/loaders/FBXLoader.js'
import { OrbitControls } from '../jsm/controls/OrbitControls.js'

import { CSS3DRenderer } from '../jsm/renderers/CSS3DRenderer.js'
import { CSS2DRenderer } from '../jsm/renderers/CSS2DRenderer.js'
import {
  setTextrueMove,
  changeMaterial,
  AddMeshIntoArr,
  changeOpacty,
} from './MainFuntion.js'

var scene = new THREE.Scene()

var clock = new THREE.Clock()

var mixer = null
/**
 * 创建网格模型
 */

// const ambient = new THREE.AmbientLight(0xdddddd, 0.8) //环境光源
// scene.add(ambient)

var lightGroup = new THREE.Group()

const yellowpoint1 = new THREE.PointLight(0xffff06, 80, 2000, 2) //点光源
yellowpoint1.position.set(-3508, 350, -810) //点光源位置
lightGroup.add(yellowpoint1) //点光源添加到场景中

const yellowpoint2 = new THREE.PointLight(0xffff06, 8, 2000, 2) //点光源
yellowpoint2.position.set(-3619, 350, -2552) //点光源位置
lightGroup.add(yellowpoint2)

const yellowpoint3 = new THREE.PointLight(0xffff06, 80, 2000, 2) //点光源
yellowpoint3.position.set(-3508, 350, 1531) //点光源位置
lightGroup.add(yellowpoint3)

const yellowpoint4 = new THREE.PointLight(0xffff06, 8, 2000, 2) //点光源
yellowpoint4.position.set(-3619, 350, 2386) //点光源位置
lightGroup.add(yellowpoint4)

const bulepoint1 = new THREE.PointLight(0x80ffff, 45, 1500, 2) //点光源
bulepoint1.position.set(-2466, 323, -5625) //点光源位置
lightGroup.add(bulepoint1)

const bulepoint2 = new THREE.PointLight(0x80ffff, 25, 1500, 2) //点光源
bulepoint2.position.set(-1044, 323, -5625) //点光源位置
lightGroup.add(bulepoint2)

const bulepoint3 = new THREE.PointLight(0x80ffff, 10, 1500, 2) //点光源
bulepoint3.position.set(-102, 510, -5694) //点光源位置
lightGroup.add(bulepoint3)

const bulepoint4 = new THREE.PointLight(0x80ffff, 25, 1500, 2) //点光源
bulepoint4.position.set(3385, 423, -4932) //点光源位置
lightGroup.add(bulepoint4)

const bulepoint5 = new THREE.PointLight(0x80ffff, 25, 1500, 2) //点光源
bulepoint5.position.set(3385, 423, -3278) //点光源位置
lightGroup.add(bulepoint5)

const bulepoint6 = new THREE.PointLight(0x80ffff, 10, 1500, 2) //点光源
bulepoint6.position.set(3536, 510, -2337) //点光源位置
lightGroup.add(bulepoint6)

const bulepoint7 = new THREE.PointLight(0x80ffff, 25, 1500, 2) //点光源
bulepoint7.position.set(3385, 423, 2661) //点光源位置
lightGroup.add(bulepoint7)

const bulepoint8 = new THREE.PointLight(0x80ffff, 25, 1500, 2) //点光源
bulepoint8.position.set(3385, 423, 4144) //点光源位置
lightGroup.add(bulepoint8)

const bulepoint9 = new THREE.PointLight(0x80ffff, 10, 1500, 2) //点光源
bulepoint9.position.set(3536, 510, 1448) //点光源位置
lightGroup.add(bulepoint9)

const bulepoint10 = new THREE.PointLight(0x80ffff, 1, 2500, 2) //点光源
bulepoint10.position.set(3582, 510, -158) //点光源位置
lightGroup.add(bulepoint10)

const bulepoint11 = new THREE.PointLight(0x80ffff, 1, 2500, 2) //点光源
bulepoint11.position.set(1563, 623, -5888) //点光源位置
lightGroup.add(bulepoint11)

const bulepoint12 = new THREE.PointLight(0x80ffff, 25, 1500, 2) //点光源
bulepoint12.position.set(-2760, 423, 4732) //点光源位置
lightGroup.add(bulepoint12)

const bulepoint13 = new THREE.PointLight(0x80ffff, 25, 1500, 2) //点光源
bulepoint13.position.set(-1965, 423, 4732) //点光源位置
lightGroup.add(bulepoint13)

const bulepoint14 = new THREE.PointLight(0x80ffff, 5, 1500, 2) //点光源
bulepoint14.position.set(-978, 510, 4953) //点光源位置
lightGroup.add(bulepoint14)

const bulepoint15 = new THREE.PointLight(0x80ffff, 1, 2500, 2) //点光源
bulepoint15.position.set(136, 623, 4912) //点光源位置
lightGroup.add(bulepoint15)

scene.add(lightGroup)

var roomGroup = new THREE.Group()

const point1 = new THREE.PointLight(0xffffff, 2, 5000, 1) //点光源
point1.position.set(-16, 654, 1425) //点光源位置
roomGroup.add(point1)

const point2 = new THREE.PointLight(0xffffff, 2, 5000, 1) //点光源
point2.position.set(-16, 654, -2862) //点光源位置
roomGroup.add(point2)
const dirLight = new THREE.DirectionalLight(0xffffff, 1)
dirLight.position.set(300, 500, 100)
scene.add(dirLight)

var AmbientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(AmbientLight)

//坐标系
// var axesHelper = new THREE.AxesHelper(10000)

// scene.add(axesHelper)

scene.fog = new THREE.Fog(0x32030, 0.005, 100000)
console.log('scene.fog : ', scene.fog)

/**
 * 相机设置
 */
var width = window.innerWidth //窗口宽度
var height = window.innerHeight //窗口高度
var k = width / height //窗口宽高比
// var s = 4000; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.PerspectiveCamera(45, k, 100, 2000000)
camera.position.set(-8000, 6000, 11000) //设置相机位置
camera.lookAt(scene.position) //设置相机方向(指向的场景对象)

/**天空盒子 */
var path = './img/6_sides-yun/' //设置路径
var directions = ['Left+X', 'Right-X', 'Up+Y', 'Down-Y', 'Front+Z', 'Back-Z'] //获取对象
var format = '.png' //格式
//创建盒子，并设置盒子的大小为( 5000, 5000, 5000 )
var skyGeometry = new THREE.BoxGeometry(150000, 150000, 150000)
//设置盒子材质
var materialArray = []
for (var i = 0; i < 6; i++)
  materialArray.push(
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture(path + directions[i] + format), //将图片纹理贴上
      side: THREE.BackSide /*镜像翻转，如果设置镜像翻转，那么只会看到黑漆漆的
一片，因为你身处在盒子的内部，所以一定要设置镜像翻转。*/,
    })
  )
var skyMaterial = new THREE.MeshFaceMaterial(materialArray)
var skyBox = new THREE.Mesh(skyGeometry, skyMaterial) //创建一个完整的天空盒，填入几何模型和材质的参数
skyBox.position.y += 10000

scene.add(skyBox) //在场景中加入天空盒

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.localClippingEnabled = true //剖切特定的模型

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.toneMapping = THREE.ReinhardToneMapping
document.body.appendChild(renderer.domElement)

//创建CSS3D渲染器
var labelRender = new CSS3DRenderer()
labelRender.setSize(width, height)
labelRender.domElement.style.position = 'absolute'
// 避免renderer.domElement影响HTMl标签定位，设置top为0px
labelRender.domElement.style.top = '0px'
labelRender.domElement.style.left = '0px'
//设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
labelRender.domElement.style.pointerEvents = 'none'
document.body.appendChild(labelRender.domElement)

//创建CSS3D渲染器
var label2DRender = new CSS2DRenderer()
label2DRender.setSize(width, height)
label2DRender.domElement.style.position = 'absolute'
// 避免renderer.domElement影响HTMl标签定位，设置top为0px
label2DRender.domElement.style.top = '0px'
label2DRender.domElement.style.left = '0px'
//设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
label2DRender.domElement.style.pointerEvents = 'none'
document.body.appendChild(label2DRender.domElement)

var controls = new OrbitControls(camera, renderer.domElement)

controls.minPolarAngle = 0
controls.maxPolarAngle = Math.PI / 2

// 左右旋转范围
controls.minAzimuthAngle = -Math.PI * (90 / 180)
controls.maxAzimuthAngle = Math.PI * 1

//相机距离观察目标点极小距离——模型最大状态
controls.minDistance = 3000
//相机距离观察目标点极大距离——模型最小状态
controls.maxDistance = 45000

var clock = new THREE.Clock()

const textureLoader = new THREE.TextureLoader()

var uniforms = {
  // fogDensity: { value: 0.01 },
  clippingPlanes: {
    value: new THREE.Plane(new THREE.Vector3(0, -1, 0), 43 * 2 - 7),
  },
  amplitude: { value: 5.0 },
  opacity: { value: 0.1 },
  // color: { value: new THREE.Color(0xffffff) },
  fogColor: { value: new THREE.Vector3(0, 0, 0) },
  time: { value: 1000 },
  uvScale: { value: new THREE.Vector2(3.0, 1.0) },
  texture1: { value: textureLoader.load('./img/cloud.png') },
  texture2: {
    // value: textureLoader.load("textures/carbon/Carbon_Normal.png"),
    value: textureLoader.load('./img/lavatile.jpg'),
  },
}
// uniforms['texture1'].value.repeat.x = 8
uniforms['texture1'].value.wrapS = uniforms['texture1'].value.wrapT =
  THREE.RepeatWraping

uniforms['texture2'].value.wrapS = uniforms['texture2'].value.wrapT =
  THREE.RepeatWraping

// const size = 0.65

const material = new THREE.ShaderMaterial({
  transparent: true,
  clipping: true,
  uniforms: uniforms,
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('fragmentShader').textContent,
})

var loader = new FBXLoader()
loader.load(
  './models/JiGuangLou_Opacity/JiGuangLou_Opacity.FBX',
  function (object) {
    console.log('透明版主要对象', object)

    // const action = mixer.clipAction( object.animations[ 0 ] );
    // action.play();
    // object.scale.set(30, 30, 30)
    object.traverse(function (child) {
      if (child.isMesh) {
        // child.castShadow = true
        child.receiveShadow = true
      }
    })

    scene.add(object)

    AddMeshIntoArr('JiGuangLouEquipment')
    AddMeshIntoArr('ShuiLengLuoGanJiZu')
    AddMeshIntoArr('LengShuiTa_All')
    AddMeshIntoArr('ZLBianPingLengQueShuiJiZu_All')
    AddMeshIntoArr('GongYiLengQueShuiPump')

    // addLAbel()
    setTextrueMove()
    changeMaterial('QunLou')
    changeMaterial('Building')
    changeMaterial('RoomName')
    changeOpacty()
  }
)

// function Change_LengQueLou_Equipment() {
//   scene.getObjectByName('JiGuangLou').traverse(function (mesh) {
//     if (
//       mesh.type == 'Mesh' &&
//       (mesh.name.search('JiGuangLou') < 0 || mesh.name.search('LQL') < 0)
//     ) {
//       // changeMaterial(mesh.name)
//       var map = mesh.material.map
//       mesh.material = new THREE.MeshPhongMaterial({
//         color: 0xffffff,
//         emissive: 0xffffff,
//         map: map,
//         emissiveMap: map,
//         emissiveIntensity: 3,
//         color: 0xffffff,
//       })

//       console.log(mesh)
//     }
//   })
// }

var textureload = new THREE.TextureLoader()
var Digit_texture = textureload.load('./models/JiGuangLou_Opacity/Digit.jpg')
var AlphaDigit_texture = textureload.load(
  './models/JiGuangLou_Opacity/Digit_Alpha.jpg'
)
Digit_texture.wrapS = Digit_texture.wrapT = THREE.RepeatWrapping
AlphaDigit_texture.wrapS = AlphaDigit_texture.wrapT = THREE.RepeatWrapping
// Digit_texture.repeat.x = 1
// Digit_texture.repeat.y = 1
/**../models/JiGuangLou_Opacity/Digit.fbx */
loader.load('./models/JiGuangLou_Opacity/Digit.fbx', function (object) {
  object.traverse(function (mesh) {
    if (mesh.type == 'Mesh') {
      mesh.material = new THREE.MeshPhongMaterial({
        map: Digit_texture,
        alphaMap: AlphaDigit_texture,
        // envMap: Digit_texture,
        emissive: 0x914d15,
        color: 0xffffff,
        emissiveMap: Digit_texture,
        emissiveIntensity: 5,
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false,
        opacity: 1,
      })
      // mesh.scale.set(1 / 3, 1, 1)
      // mesh.material.emissive.set(0xffa631)
      // mesh.material.emissiveIntensity = 10
      // mesh.material.side = THREE.DoubleSide
      // mesh.material.map = Digit_texture
    }
  })
  var x, y, z
  for (var i = 0; i <= 100; i++) {
    var mesh = object.clone()
    var a = Math.random()
    mesh.scale.set(a, a, a)
    if (i <= 25) {
      ;(x = Math.random() * 28000),
        (y = Math.random() * -100),
        (z = Math.random() * 23000)
    } else if (i > 25 && i <= 50) {
      ;(x = Math.random() * -28000),
        (y = Math.random() * -100),
        (z = Math.random() * 23000)
    } else if (i > 50 && i <= 75) {
      ;(x = Math.random() * 28000),
        (y = Math.random() * -100),
        (z = Math.random() * -23000)
    } else if (i > 75 && i <= 100) {
      ;(x = Math.random() * -28000),
        (y = Math.random() * -100),
        (z = Math.random() * -23000)
    }
    mesh.rotation.y = Math.random() * 5
    mesh.position.set(x, y, z)
    scene.add(mesh)

    moveup(mesh)
  }
  // scene.add(object)
  console.log('object: ', object)

  setInterval(() => {
    Digit_texture.offset.x += 1 / 24
  })
})

function moveup(mesh, num) {
  var speedTime = Math.random() + 1

  var pos = mesh.getWorldPosition()
  var tweenA = new TWEEN.Tween(pos)
  tweenA.to(
    {
      y: pos.y + 10000,
    },
    speedTime * 5000
  )
  tweenA
    .onUpdate(function () {
      mesh.position.y = pos.y
    })
    .repeat(Number.MAX_VALUE)
  tweenA.start()
}

loader.load(
  './models/JiGuangLou_Opacity_Light/JiGuangLou_Opacity_Light.FBX',
  function (object) {
    object.traverse(function (mesh) {
      if (mesh.type == 'Mesh') {
        mesh.material.side = THREE.DoubleSide

        // mesh.castShadow = true
        mesh.receiveShadow = true
      }
    })

    scene.add(object)
  }
)
var texture = textureload.load('./models/JiGuangLou_Opacity/liquid_szw.jpg')

texture.wrapS = texture.wrapT = THREE.RepeatWrapping

texture.repeat.x = 1
texture.repeat.y = 1
loader.load(
  './models/JiGuangLou_Opacity/JiGuangLou_Opacity_StreetLiquid.FBX',
  function (object) {
    object.traverse(function (mesh) {
      if (mesh.type == 'Mesh') {
        mesh.material.emissive.set(0xffa631)
        mesh.material.emissiveIntensity = 3
        mesh.material.depthWrite = false
        mesh.material.side = THREE.DoubleSide
        mesh.material.map = texture
      }
    })
    console.log('-----------', object)
    scene.add(object)

    setInterval(() => {
      texture.offset.x -= 0.006
    })
  }
)

loader.load(
  './models/JiGuangLou_Opacity_Tree/JiGuangLou_Opacity_Tree.FBX',
  function (object) {
    object.traverse(function (mesh) {
      if (mesh.type == 'Mesh') {
        mesh.material.side = THREE.DoubleSide

        // mesh.castShadow = true
        mesh.receiveShadow = true
      }
    })

    scene.add(object)

    object.traverse(function (mesh) {
      if (mesh.type == 'Mesh') {
        mesh.material.vertexColors = false
      }
    })

    console.log('树 ', object)
  }
)

loader.load(
  './models/JiGuangLou_Opacity_Pipe/JiGuangLou_Opacity_Pipe.FBX',
  function (object) {
    object.traverse(function (mesh) {
      if (mesh.type == 'Mesh') {
        // mesh.layers.enable(1)

        if (mesh.name.search('_LIQUID') >= 0) {
          mesh.material = new THREE.MeshPhongMaterial({
            map: mesh.material.map,
            // emissiveMap: mesh.material.map,
            emissive: 0xffffff,
            emissiveIntensity: 11,
            // color: 0x0000ff,
            opacity: 0.8,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
          })
        } else {
          // mesh.material

          mesh.material = new THREE.MeshBasicMaterial({
            // emissive: 0x00ff00,
            opacity: 0.1,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
          })
        }
      }
    })
    setInterval(function () {
      scene.getObjectByName(
        'Aircondition_ALKO05PIPE_LIQUID'
      ).material.map.offset.x += 0.005
    })
    scene.add(object)
    console.log('通风管 ', object)
  }
)

loader.load('./models/JiGuangLou_Opacity_LightRing.FBX', function (fbx) {
  fbx.traverse(function (mesh) {
    if (mesh.type == 'Mesh') {
      // mesh.scale.set(2, 2, 1)
      mesh.material.transparent = true
      // mesh.material.emissive.set(0x12121c)
      // mesh.material.color.set(0x12121c)
      // changeOpacty(mesh)
    }
  })

  // scene.add(fbx)
  fbx.position.y += -100
  mixer = new THREE.AnimationMixer(fbx)

  // var AnimationAction = mixer.clipAction(fbx.animations[0])
  //console.log('object.animations: ', object.animations);
  // AnimationAction.play()

  console.log('fbx: ', fbx)
})

import { GUI } from '../jsm/libs/dat.gui.module.js'

// var parm = {
//   color: 0xffffff,
//   emissiveIntensity: 2,
// }
// var gui = new GUI()
// gui.addColor(parm, 'color').onChange(function (e) {
//   scene.getObjectByName('LightRing').material.color.set(e)
//   scene.getObjectByName('LightRing').material.emissive.set(e)
// })
// gui.add(parm, 'emissiveIntensity', 1, 10).onChange(function (e) {
//   scene.getObjectByName('LightRing').emissiveIntensity = eblank
// })

var rAF = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()

var frame = 0
var allFrameCount = 0
var lastTime = Date.now()
var lastFameTime = Date.now()
var FPS

var loop = function () {
  var now = Date.now()
  var fs = now - lastFameTime
  var fps = Math.round(1000 / fs)

  lastFameTime = now
  // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
  allFrameCount++
  frame++

  if (now > 1000 + lastTime) {
    var fps = Math.round((frame * 1000) / (now - lastTime))

    // console.log(`FPS：`, fps)

    var date = new Date() // 增加8小时
    // console.log('date: ', new Date().getTime())
    // console.log('date: ', date.toJSON().substr(10, 18).replace('T', ' '))

    window.parent.postMessage(
      {
        data: {
          code: 'success',
          fpsNumber: fps,
          currentTime: new Date().getTime(),
        },
      },
      '*'
    )
    frame = 0
    lastTime = now
  }

  rAF(loop)
}

loop()

export {
  labelRender,
  label2DRender,
  scene,
  camera,
  renderer,
  lightGroup,
  roomGroup,
  controls,
  clock,
  mixer,
  uniforms,
}
