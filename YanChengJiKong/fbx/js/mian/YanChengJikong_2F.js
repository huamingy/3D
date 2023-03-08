import * as THREE from '../../../build/three.module.js'
import { FBXLoader } from '../../jsm/loaders/FBXLoader.js'
import { scene } from './YanChengJikong_scene.js'
import {
  addtexture,
  AddMeshIntoArr,
  render,
  addEvnmap,
  changmaterialdepth,
  hiddenmesh,
} from './YanChengJikong_fun.js'
import { CSS3DSprite } from '../../jsm/renderers/CSS3DRenderer.js'
import { fireStatus } from './data_fun.js'
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
  '././models/YanChengJiKongOpacity_2F/YanChengJiKongOpacity_2F.FBX',
  function (obj) {
    console.log('查看返回的模型数据', obj)
    // obj.traverse(function (obj) {
    //
    //   }
    // })

    // scene.getObjectByName('PDG_DoorAll001').position.set(0, 0, 0)

    scene.add(obj)
    hiddenmesh('2F_Equipment_All')
    addEvnmap('2F_Floor')
    changmaterialdepth('2F_DLJ')

    scene.getObjectByName('2F_RoomName').position.z += 1
  }
)
loader.load('././models/BG/WarningEdge.FBX', function (obj) {
  console.log('查看返回的报警', obj)

  scene.add(obj)
  fireStatus()
})

render()
