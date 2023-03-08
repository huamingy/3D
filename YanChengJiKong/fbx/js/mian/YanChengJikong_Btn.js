import * as THREE from '../../../build/three.module.js'

import {
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
  delteFromArr,
  addLabelimg,
  movecamera,
  hiddenLabelimg,
  addTHLAbel,
  HiddenTHLAbel,
  addCameraImg,
  deleteCameraImg,
  hiddenmesh,
  Showmesh,
  addPFImg,
  FromStuatstochangecolor,
} from './YanChengJikong_fun.js'
import {
  labelRenderer,
  scene,
  renderer,
  camera,
  controls,
} from './YanChengJikong_scene.js'

import {
  ThreeModbusBms3fLgroup,
  addTwoFloorlabel,
  ThreeModbusBms3fLabel,
  addThreeFloorlabel,
  ThreeVAVLabelgroup,
  TwoModbusBmsLabel,
  hiddenlabel2F,
  addlabel2F,
  addThreeFloorAirlabel,
  HiddenThreeFloorAirlabel,
  addlabel2FFy,
} from './data_fun.js'
var flyBool = false, //作为视角移动的条件
  twofloor = true,
  threefloor = true,
  fire_test = true,
  threefloordata = true,
  twoVent = true,
  videoCamera = true,
  threeVent = true,
  threeTFG = true,
  twoPipe = true,
  twoSpray = true,
  threeSpray = true,
  threePipe = true,
  DianBiao = true,
  threeDoor = true,
  twoDoor = true,
  MF = true,
  TwoSJGTH = true,
  Twofengya = true,
  ThreeBF = true,
  TemHum = true,
  ThreeSJGTH = true

var rotate = true

/**显示所有标签按钮 */

$('#TemHum').click(function () {
  if (TemHum) {
    TemHum = false

    $('#allLabel').css('display', 'inline')
  } else {
    TemHum = true
    $('#allLabel').css('display', 'none')
  }
})

/**二层数据 */
$('#twofloor').click(function () {
  if (twofloor) {
    twofloor = false

    addlabel2F()
  } else {
    twofloor = true
    hiddenlabel2F('img')
  }
})

/**旋转按钮 */
$('#btn_rolu').click(function () {
  if (rotate) {
    rotate = false
    controls.enableRotate = true
  } else {
    rotate = true
    controls.enableRotate = false
  }
})
/**风压 */
$('#Twofengya').click(function () {
  if (Twofengya) {
    Twofengya = false
    addlabel2FFy()
  } else {
    Twofengya = true
    hiddenlabel2F('data')
  }
})

/**设置相机初始位置 */
$('#exit').click(function () {
  movecamera()
  // camera.position.set(0, 1011, 130) //设置相机位置
  // controls.target.set(scene.position.x, scene.position.y, scene.position.z) //设置相机方向(指向的场景对象)
  // controls.update()
})

/**设置二楼空调 */
$('#twoVent').click(function () {
  if (twoVent) {
    twoVent = false
    Showmesh('2F_Equipment')
    AddMeshIntoArr('2F_Equipment', 'granaryArr')
    // changecolor('2F_Equipment', 0xff9600)
  } else {
    twoVent = true
    hiddenmesh('2F_Equipment')
    scene.getObjectByName('2F_Equipment').traverse(function (mesh) {
      delteFromArr(mesh.name, 'PrimaryMesh')
      delteFromArr(mesh.name, 'granaryArr')
    })
  }
})
/**二楼摄像头 */
$('#camera').click(function () {
  if (videoCamera) {
    videoCamera = false

    addCameraImg('2F_Camera', '摄像头2.png')
  } else {
    videoCamera = true
    deleteCameraImg('2F_Camera', '摄像头2.png')
  }
})
/**二楼水管 */
$('#twoSpray').click(function () {
  var device1 = scene.getObjectByName('2FSpray')
  if (twoSpray) {
    twoSpray = false
    device1.material.color.set(0xffffff)
  } else {
    twoSpray = true
    device1.material.color.set(0x0a20b3)
  }
})

/**二楼多联机 */
$('#twoPipe').click(function () {
  if (twoPipe) {
    twoPipe = false

    AddMeshIntoArr('2F_DLJ', 'granaryArr')
    FromStuatstochangecolor('2F_DLJ')
  } else {
    twoPipe = true
    hiddenmesh('2F_DLJ')

    scene.getObjectByName('2F_DLJ').traverse(function (obj) {
      if (obj.isMesh) {
        delteFromArr(obj.name, 'granaryArr')
      }
    })
  }
})

$('#btn').click(function () {
  if (MF) {
    MF = false
  } else {
    MF = true
  }
})
$('#TwoSJGTH').click(function () {
  if (TwoSJGTH) {
    TwoSJGTH = false
    addTHLAbel('2F_PP_TG_SJG')
  } else {
    TwoSJGTH = true
    HiddenTHLAbel('2F_PP_TG_SJG')
  }
})
$('#TwoDianBiao').click(function () {
  if (DianBiao) {
    DianBiao = false
    Showmesh('2F_PDG')
    addLabelimg('PDG_Body')
    addLabelimg('PDG_Body001')
    AddMeshIntoArr('2F_PDB_Click', 'granaryArr')
  } else {
    DianBiao = true
    hiddenmesh('2F_PDG')
    hiddenLabelimg('PDG_Body')
    hiddenLabelimg('PDG_Body001')
    // movecamera(m, p2)
  }
})
/**关闭视频 */
$('#btn-close').click(function () {
  var v = document.getElementById('video') //获取视频节点
  $('#Video-start').hide() //点击关闭按钮关闭暂停视频
  v.pause()
  $('#Video-start').html()

  //  dispose();
  document.getElementById('video').dispose()
})

/**二楼门禁 */
$('#twoDoor').click(function () {
  if (twoDoor) {
    twoDoor = false
    addDoorLabel('2F_Door', 'twoDoor')
    changecolor('2F_Door', 0xffffff)
  } else {
    twoDoor = true
    hiddenDoorLabel('2F_Door', 'twoDoor')
    comeback('2F_Door', 0x0a20b3)
  }
})
/**三楼空调 */
$('#threeVent').click(function () {
  if (threeVent) {
    threeVent = false
    Showmesh('3F_Equipment')
    AddMeshIntoArr('3F_Equipment', 'granaryArr')
    AddMeshIntoArr('3F_Equipment', 'PrimaryMesh')
  } else {
    threeVent = true
    hiddenmesh('3F_Equipment')
    scene.getObjectByName('3F_Equipment').traverse(function (mesh) {
      delteFromArr(mesh.name, 'PrimaryMesh')
      delteFromArr(mesh.name, 'granaryArr')
    })
  }
})

/**三楼通风柜 */
$('#threeTFG').click(function () {
  if (threeTFG) {
    threeTFG = false
    Showmesh('3F_TFG')
    AddMeshIntoArr('3F_TFG', 'PrimaryMesh')
    AddMeshIntoArr('3F_TFG', 'granaryArr')
  } else {
    threeTFG = true
    hiddenmesh('3F_TFG')

    scene.getObjectByName('3F_TFG').traverse(function (mesh) {
      delteFromArr(mesh.name, 'PrimaryMesh')
      delteFromArr(mesh.name, 'granaryArr')
    })
  }
})
/**三楼空气数据 */
$('#threeSpray').click(function () {
  if (threeSpray) {
    threeSpray = false
    addThreeFloorAirlabel()
  } else {
    threeSpray = true
    HiddenThreeFloorAirlabel()
  }
})
/**三楼多联机 */
$('#threePipe').click(function () {
  if (threePipe) {
    threePipe = false
    // Showmesh('3F_DLJ')
    AddMeshIntoArr('3F_DLJ', 'granaryArr')
    FromStuatstochangecolor('3F_DLJ')
  } else {
    threePipe = true
    // changecolor('3F_DLJ', 0x969696)
    hiddenmesh('3F_DLJ')
    scene.getObjectByName('3F_DLJ').traverse(function (obj) {
      if (obj.isMesh) {
        delteFromArr(obj.name, 'granaryArr')
      }
    })
  }
})
/**三楼电表 */
$('#ThreeDianBiao').click(function () {
  if (DianBiao) {
    DianBiao = false
    Showmesh('3F_PDG')
    addLabelimg('PDG_Body')
    addLabelimg('PDG_Body001')
    AddMeshIntoArr('3F_PDB_Click', 'granaryArr')
  } else {
    DianBiao = true
    hiddenmesh('3F_PDG')
    hiddenLabelimg('PDG_Body')
    hiddenLabelimg('PDG_Body001')
  }
})

/**排风管道 */
$('#ThreeSJGTH').click(function () {
  if (ThreeSJGTH) {
    ThreeSJGTH = false
    // changmaterial('3F_BF')
    Showmesh('3F_PF_Pipe')
    // scene.getChildByName('3F_PF_Pipe').material.emissive.set(0xffffff)
    addPFImg('3F_PF')
  } else {
    deleteCameraImg('3F_PF')
    hiddenmesh('3F_PF_Pipe')
    ThreeSJGTH = true
  }
})

$('#ThreeBF').click(function () {
  if (ThreeBF) {
    ThreeBF = false
    // changmaterial('3F_BF')
    Showmesh('3F_BF')
    // scene.getChildByName('3F_BF').material.emissive.set(0xffffff)
    // addPFImg('3F_PF')
  } else {
    // deleteCameraImg('3F_PF')
    hiddenmesh('3F_BF')
    ThreeBF = true
  }
})
$('#threeDoor').click(function () {
  if (threeDoor) {
    addDoorLabel('3F_Door', 'threeDoor')
    threeDoor = false
    changecolor('3F_Door', 0xff9600)
  } else {
    hiddenDoorLabel('3F_Door', 'threeDoor')
    threeDoor = true
    comeback('3F_Door', 0x0a20b3)
  }
})

$('#threefloor').click(function () {
  if (threefloor) {
    // ThreeModbusBms3fLabel("")
    addThreeFloorlabel('3F_VAV')

    threefloor = false
  } else {
    hiddenLabel('3F_VAV')
    threefloor = true
  }
})

$('#fire_test').click(function () {
  if (fire_test) {
    fire_test = false
    addtexture('Warning', 0.0005)
  } else {
    fire_test = true
    addtexture('Warning', 0)
  }
})
$('#threefloordata').click(function () {
  if (threefloordata) {
    addCameraImg('3F_VAV', 'VAV定位.png')
    Showmesh('3F_VAV')
    threefloordata = false
  } else {
    deleteCameraImg('3F_VAV')
    hiddenmesh('3F_VAV')
    hiddenLabel('3F_VAV')
    threefloordata = true
  }
})
$('#3F_camera').click(function () {
  if (videoCamera) {
    videoCamera = false
    addCameraImg('3F_Camera', '摄像头2.png')

    // changecolor('3F_Camera', 0x00ff00)
    // AddMeshIntoArr('3F_Camera', 'granaryArr')
    // AddMeshIntoArr('3F_Camera', 'PrimaryMesh')

    // scene.getObjectByName('3F_Camera').traverse(function (obj) {
    //   if (obj.isMesh) {
    //     obj.scale.set(0.052, 0.052, 0.052)
    //   }
    // })
  } else {
    videoCamera = true
    // AddMeshIntoArr('3F_Equipment', 'granaryArr')
    // comeback('3F_Camera', 0x0a20b3)4
    deleteCameraImg('3F_Camera', '摄像头2.png')
    // scene.getObjectByName('3F_Camera').traverse(function (obj) {
    // if (obj.isMesh) {
    // obj.scale.set(0.05, 0.05, 0.05)
    // delteFromArr(obj.name, 'granaryArr')
    // delteFromArr(obj.name, 'PrimaryMesh')
    // }
    // })
  }
})
$('#Dianbiao_out').click(function () {
  document.getElementById('DianBiao').style.visibility = 'hidden'
})

// $('#Dianbiao_out').click(function () {

//   if (DianBiaolabel) DianBiaolabel.parent.remove(DianBiaolabel)
// })
export { rotate }
