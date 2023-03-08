import * as THREE from '../../../build/three.module.js'
import { GUI } from '../../jsm/libs/dat.gui.module.js'
import { FBXLoader } from '../../jsm/loaders/FBXLoader.js'
import { GLTFLoader } from '../../jsm/loaders/GLTFLoader.js'
import {
  labelRenderer,
  scene,
  renderer,
  camera,
  controls,
} from './YanChengJikong_scene.js'
import {
  render,
  addEvnmap,
  AddMeshIntoArr,
  changmaterialdepth,
  hiddenmesh,
} from './YanChengJikong_fun.js'
import { fireStatus } from './data_fun.js'
import { CSS3DSprite } from '../../jsm/renderers/CSS3DRenderer.js'

var nextPos = new THREE.Vector3() //射线点击建筑对应XOZ平面坐标
var dir = new THREE.Vector3() //飞行漫游方向，起始点构成的方向 默认值0，0，0

/**
 * 创建场景对象Scene
 */
// //  坐标系
// var axesHelper = new THREE.AxesHelper(115);
// scene.add(axesHelper);

var loader = new FBXLoader() //创建一个FBX加载器
loader.load(
  '././models/YanChengJiKongOpacity_3F/YanChengJiKongOpacity_3F.FBX',
  function (obj) {
    console.log('查看返回的模型数据', obj)

    scene.add(obj)

    //由于墙面默认材质颜色为黑色，此处改为白色
    var fool = scene.getObjectByName('3F')
    fool.traverse(function (mesh) {
      if (mesh.name == '3F' && mesh.isMesh) {
        console.log(mesh)
        mesh.material.color.set(0xffffff)
      }
    })

    var VAV = scene.getObjectByName('3F_VAV')
    VAV.traverse(function (mesh) {
      if (mesh.isMesh) {
        mesh.material.color.set(0xffffff)
      }
    })

    hiddenmesh('3F_Equipment_All')

    addEvnmap('3F_Floor')
    changmaterialdepth('3F_DLJ')

    changmaterialdepth('3F_TFG')
  }
)

loader.load('././models/BG/WarningEdge.FBX', function (obj) {
  console.log('查看返回的报警', obj)

  scene.add(obj)
  fireStatus()
})

render()
