import * as THREE from '../../build/three.module.js'
import {
  CSS3DObject,
  CSS3DRenderer,
  CSS3DSprite,
} from '../jsm/renderers/CSS3DRenderer.js'
import { scene } from './light.js'

var label = document.getElementById('label')
var Alabel = new CSS3DSprite(label)
// Alabel.scale.set(0.1, 0.1, 0.1)
//  AClabel.position.set(1000,1000,1000)
// ACtag.style.pointervents = 'auto' //避免HTML标签遮挡三维场景的鼠标事件
scene.add(Alabel)

var ACtag = document.getElementById('AClabel')
var AClabel = new CSS3DSprite(ACtag)

scene.add(AClabel)

var DeptNameLAbel = document.getElementById('DeptName')
var CSSNameLAbel = new CSS3DSprite(DeptNameLAbel)
scene.add(CSSNameLAbel)

var OneNameLabel = document.getElementById('OneName')
var TwoNameLabel = document.getElementById('TwoName')
var ThreeNameLabel = document.getElementById('ThreeName')
var FourNameLabel = document.getElementById('FourName')

var CSS3Donelabel = new CSS3DSprite(OneNameLabel)
// OneNameLabel.style.pointerEvents = 'none' //避免HTML标签遮挡三维场景的鼠标事件
// CSS3Donelabel.scale.set(0.008,0.008,0.008)
scene.add(CSS3Donelabel)

var CSS3DTwolabel = new CSS3DSprite(TwoNameLabel)
// TwoNameLabel.style.pointerEvents = 'none' //避免HTML标签遮挡三维场景的鼠标事件
// CSS3DTwolabel.scale.set(0.008,0.008,0.008)
scene.add(CSS3DTwolabel)

var CSS3DThreelabel = new CSS3DSprite(ThreeNameLabel)
// CSS3DThreelabel.scale.set(0.008,0.008,0.008)
// ThreeNameLabel.style.pointerEvents = 'none' //避免HTML标签遮挡三维场景的鼠标事件
scene.add(CSS3DThreelabel)

var CSS3DFourlabel = new CSS3DSprite(FourNameLabel)
// FourNameLabel.style.pointerEvents = 'none' //避免HTML标签遮挡三维场景的鼠标事件
// CSS3DFourlabel.scale.set(0.008,0.008,0.008)
scene.add(CSS3DFourlabel)

// // // 坐标系
// var axesHelper = new THREE.AxesHelper(3000)
// axesHelper.position.set(0, 100, 0)
// scene.add(axesHelper)

function addlabel() {
  var one = scene.getObjectByName('TH_01')
  CSS3Donelabel.position.copy(one.getWorldPosition())
  var two = scene.getObjectByName('TH_02')
  CSS3DTwolabel.position.copy(two.getWorldPosition())
  var three = scene.getObjectByName('TH_03')
  CSS3DThreelabel.position.copy(three.getWorldPosition())
  var four = scene.getObjectByName('TH_04')
  CSS3DFourlabel.position.copy(four.getWorldPosition())
}

// 创建一个CSS3渲染器CSS2DRenderer
var labelRenderer = new CSS3DRenderer()
labelRenderer.setSize(window.innerWidth, window.innerHeight)
labelRenderer.domElement.style.position = 'absolute'
// 避免renderer.domElement影响HTMl标签定位，设置top为0px
labelRenderer.domElement.style.top = '0px'
labelRenderer.domElement.style.left = '0px'
//设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
labelRenderer.domElement.style.pointerEvents = 'auto'
document.body.appendChild(labelRenderer.domElement)

export { labelRenderer, addlabel, AClabel, Alabel, CSSNameLAbel }