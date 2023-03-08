import * as THREE from '../../build/three.module.js'
import {
    GUI
} from '../jsm/libs/dat.gui.module.js'
import {
    GLTFLoader
} from '../jsm/loaders/GLTFLoader.js'
import {
    OrbitControls
} from '../jsm/controls/OrbitControls.js'
import {
    CSS2DRenderer,
    CSS2DObject,
} from '../jsm/renderers/CSS2DRenderer.js'
import {
    EffectComposer
} from '../jsm/postprocessing/EffectComposer.js'
import {
    RenderPass
} from '../jsm/postprocessing/RenderPass.js'
import {
    ShaderPass
} from '../jsm/postprocessing/ShaderPass.js'
import {
    CopyShader
} from '../jsm/shaders/CopyShader.js'
import {
    OutlinePass
} from '../jsm/postprocessing/OutlinePass.js'
import {
    FXAAShader
} from "../jsm/shaders/FXAAShader.js"
const params = {
    NO1: false,
    NO2: false,
    NO3: false,
    NO4: false,
    NO1light: true,
    NO2light: true,
    NO3light: true,
    NO4light: true,
}

/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene()

var granaryArr = [],
    NO1, NO2, NO3, NO4
var rotate = true
var label = null
var Arr = [],pointArray = []
var lineone = []
var linetwo = []
var linethree = []
var linefour = []

var loader = new GLTFLoader() //创建一个FBX加载器
loader.load('../models/3DMap.gltf', function(obj) {
    console.log('查看返回的模型数据----1', obj.scene)
    obj.scene.traverse(function(mesh){
        if(mesh.type=="Mesh"){  
            pointArray.push(mesh)
        }

    })
    
  
        // 整体缩放
    obj.scene.scale.set(3, 3, 3)
    scene.add(obj.scene)

    var device = scene.getObjectByName('LingShanBuilding')
    var device2 = scene.getObjectByName('NanJingMetroBuilding')
    var device1 = scene.getObjectByName('NanJingNanBuilding')
    Arr.push(device)
    Arr.push(device1)
    Arr.push(device2)
    device.children.forEach(function(mesh) {
        granaryArr.push(mesh)
    })
    device1.children.forEach(function(mesh) {
        granaryArr.push(mesh)
    })
    device2.children.forEach(function(mesh) {
        granaryArr.push(mesh)
    })

    // var dev = scene.getObjectByName('NanJingNanBuilding_(1)')
    // var dev1 = scene.getObjectByName('NanJingMetroBuilding_(1)')
    // var dev2 = scene.getObjectByName('LingShanBuilding_(1)')

    // granaryArr.push(dev)
    // granaryArr.push(dev1)
    // granaryArr.push(dev2)

    var BuildingLine = scene.getObjectByName('BuildingLine')
    BuildingLine.material.opacity = 0
    BuildingLine.material.transparent = true



    var mesh = scene.getObjectByName('Building_(1)')
        // b.children.forEach(function(mesh) {
    // mesh.material.color.set(0x081472)
    // mesh.material.opacity = 0.2
    // mesh.transparent = true
        mesh.material = new THREE.MeshLambertMaterial({
                transparent: true,
                opacity: 0.6,
                color: 0x0044bb,
            })
        // })
 NO1 = scene.getObjectByName('NO1')
    NO2 = scene.getObjectByName('NO2')
    NO3 = scene.getObjectByName('NO3')
    NO4 = scene.getObjectByName('NO4')
        // NO1.position.set(-97.5598679, 0.08202772, 17.5615768)
        // NO2.position.set(-46.5598679, 0.08202772, -32.5615768)
        // NO3.position.set(-79.786582023, 0.09451519, 17)
        // NO4.position.set(-0.5598679, 0.08202772, -44.5615768)
    Arr.push(NO1)
    Arr.push(NO2)
    Arr.push(NO3)
    Arr.push(NO4)
   
})

loader.load('../models/BG.gltf', function(obj) {
    console.log('查看返回的模型数据', obj)
        // 整体缩放
    obj.scene.scale.set(30, 30, 30)
    scene.add(obj.scene)
})






var timeout = null //引入定时器
var chooseMesh = null

function choose(event) {
    clearTimeout(timeout) //单击事件，清理定时器
        //设置定时器
    timeout = setTimeout(function() {
        if (chooseMesh) {
           rotate = true
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

        var intersects = raycaster.intersectObjects(pointArray)
       
            //console.log("射线投射器返回的对象 点point", intersects[0].point);
            //   console.log("射线投射器的对象 几何体",intersects[0].object.geometry.vertices)
            //   intersects.length大于0说明，说明选中了模型
        if (intersects.length > 0) {
            chooseMesh = intersects[0].object
           
          rotate=false
        }
    }, 200)
}

addEventListener('pointermove', choose) // 监听窗口鼠标单击事件,鼠标单击选中某个国家Mesh
    // addEventListener('mousemove', choose);//鼠标滑动事件

function onMouseDblclick(event) {
    clearTimeout(timeout) //单击事件，清理定时器

    var object = scene.getObjectByName('all')

    var Sx = event.clientX //鼠标单击位置横坐标
    var Sy = event.clientY //鼠标单击位置纵坐标
        //屏幕坐标转WebGL标准设备坐标
    var x = (Sx / window.innerWidth) * 2 - 1 //WebGL标准设 备横坐标
    var y = -(Sy / window.innerHeight) * 2 + 1 //WebGL标准设备纵坐标
        //创建一个射线投射器`Raycaster`
    var raycaster = new THREE.Raycaster()
        //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera)
        //返回.intersectObjects()参数中射线选中的网格模型对象
        // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
    var intersects = raycaster.intersectObjects(granaryArr)

    // console.log('射线器返回的对象', intersects)
    //console.log("射线投射器返回的对象 点point", intersects[0].point);
    //   console.log("射线投射器的对象 几何体",intersects[0].object.geometry.vertices)
    //   intersects.length大于0说明，说明选中了模型
    if (intersects.length > 0) {
        chooseMesh = intersects[0].object

        if (chooseMesh.parent.name == 'NanJingNanBuilding') {
            chooseMesh.material.color.set(0xff9900)
            window.location.href = './webgl_loader_gltf_njn.html'
        } else if (chooseMesh.parent.name == 'NanJingMetroBuilding') {
            chooseMesh.material.color.set(0x00dd00)
            window.location.href = 'webgl_loader_gltf_njMetro.html'
        } else if (chooseMesh.parent.name == 'LingShanBuilding') {
            chooseMesh.material.color.set(0x5500dd)
            window.location.href = 'webgl_loader_gltf_ls.html'
        }
    }
}

addEventListener('dblclick', onMouseDblclick)

//坐标系
// var axesHelper = new THREE.AxesHelper(300)

// scene.add(axesHelper)

/**
 * 光源设置
 */
//点光源
var point = new THREE.PointLight(0xffffff)
point.position.set(0, 600, 0) //点光源位置
scene.add(point) //点光源添加到场景中
    //环境光
var ambient = new THREE.AmbientLight(0xffffff)
scene.add(ambient)

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff)
hemiLight.position.set(0, 800, 0)
scene.add(hemiLight);
var Direction = new THREE.DirectionalLight(0xffffff)
Direction.position.set(600, 500, 0)
scene.add(Direction)

/**
 * 相机设置
 */
var width = window.innerWidth //窗口宽度
var height = window.innerHeight //窗口高度
var k = width / height //窗口宽高比
    //创建相机对象
var camera = new THREE.PerspectiveCamera(45, k, 100, 5000)
camera.position.set(600, 400, 0) //设置相机位置
camera.lookAt(scene.position) //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
})
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.5
// renderer.physicallyCorrectLights =true
renderer.setClearColor("#000000",1)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(width, height) //设置渲染区域尺寸
document.body.appendChild(renderer.domElement) //body元素中插入canvas对象

// 创建一个CSS2渲染器CSS2DRenderer
var labelRenderer = new CSS2DRenderer()
labelRenderer.setSize(window.innerWidth, window.innerHeight)
labelRenderer.domElement.style.position = 'absolute'
    // 避免renderer.domElement影响HTMl标签定位，设置top为0px
labelRenderer.domElement.style.top = '0px'
labelRenderer.domElement.style.left = '0px'
    //设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
labelRenderer.domElement.style.pointerEvents = 'none'
document.body.appendChild(labelRenderer.domElement)

// NO3 = lineArr.getObjectByName('NO3')
// NO4 = lineArr.getObjectByName('NO4')

// 创建一个渲染器通道，场景和相机作为参数
var renderPass = new RenderPass(scene, camera)
var renderPassNO1 = new RenderPass(scene, camera)
    // 创建OutlinePass通道,显示外轮廓边框
var OutlinePass1 = new OutlinePass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    scene,
    camera
)
var OutNO1 = new OutlinePass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    scene,
    camera
)
var OutNO2 = new OutlinePass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    scene,
    camera
)
var OutNO3 = new OutlinePass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    scene,
    camera
)
var OutNO4 = new OutlinePass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        scene,
        camera
    )
    // 后处理完成，设置renderToScreen为true，后处理结果在Canvas画布上显示
OutlinePass1.renderToScreen = true
OutNO1.renderToScreen = true
    //设置要显示边框的网格模型
    //交互的时候可以设置一个鼠标事件，点击选中了某个模型，就直接把某个网格模型作为值的元素
OutlinePass1.selectedObjects = Arr
OutNO1.selectedObjects = lineone
    // console.log('No1: ', No1)
    // OutNO2.selectedObjects = [NO2]
    // OutNO3.selectedObjects = [NO3]
    // OutNO4.selectedObjects = [NO4]
OutNO1.visibleEdgeColor.set(0xffff00)
    // OutNO2.visibleEdgeColor.set(0x80ffff)
    // OutNO3.visibleEdgeColor.set(0x80ffff)
    // OutNO4.visibleEdgeColor.set(0x80ffff)
    // OutlinePass1.visibleEdgeColor.set(0x80ffff)
    // //OutlinePass相关属性设置
OutlinePass1.edgeThickness = 0.2 //轮廓边缘描边厚度
OutlinePass1.edgeStrength = 4.0 //边缘发光强度,数值大，更亮一些
OutlinePass1.pulsePeriod = 2 //模型闪烁频率控制，默认0不闪烁

OutNO1.edgeThickness = 0.2 //轮廓边缘描边厚度
OutNO1.edgeStrength = 6.0 //边缘发光强度,数值大，更亮一些
OutNO1.pulsePeriod = 2 //模型闪烁频率控制，默认0不闪烁

// 创建后处理对象EffectComposer，WebGL渲染器作为参数
var composer = new EffectComposer(renderer)
    // 设置renderPass通道
composer.addPass(renderPass)
    // 设置OutlinePass通道
composer.addPass(OutlinePass1)

// 创建后处理对象EffectComposer，WebGL渲染器作为参数
var composer1 = new EffectComposer(renderer)
    // 设置renderPass通道
composer1.addPass(renderPassNO1)
    // 设置OutlinePass通道
composer1.addPass(OutNO1, OutNO2, OutNO3, OutNO4)

renderer.autoClear = false

var FXAAShaderPass = new ShaderPass(FXAAShader);
FXAAShaderPass.uniforms['resolution'].value.set(1 / width, 1 / height);
FXAAShaderPass.renderToScreen = true;
composer.addPass(FXAAShaderPass);



// 渲染函数
function render() {
    if (rotate) {
        scene.rotation.y += 0.002
    }

    // renderer.render(scene, camera) //执行渲染操作
    labelRenderer.render(scene, camera) //CSS2D渲染
    composer.render()
        // composer1.render()
    requestAnimationFrame(render) //请求再次执行渲染函数render，渲染下一帧
}
render()

var controls = new OrbitControls(camera, renderer.domElement)
    // 上下旋转范围
controls.minPolarAngle = 0
    // controls.maxPolarAngle = Math.PI/2;
controls.maxPolarAngle = Math.PI / 2

// 左右旋转范围
controls.minAzimuthAngle = -Math.PI * (100 / 180)
controls.maxAzimuthAngle = Math.PI * (100 / 180)

//缩放控制
// controls.minZoom = 0.9;
//  controls.maxZoom = 1.7;
// onresize 事件会在窗口被调整大小时发生
window.onresize = function() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
}