import * as THREE from '../../../build/three.module.js'
import { CSS2DObject } from '../../jsm/renderers/CSS2DRenderer.js'
import { CSS3DSprite, CSS3DObject } from '../../jsm/renderers/CSS3DRenderer.js'
import { showlabel, addtexture } from './YanChengJikong_fun.js'
import { scene } from './YanChengJikong_scene.js'

var modbusBms2f1, modbusBms2F, modbusVav, ChineseName
/*获取二楼BMS设备的值 */
var ModbusBmsvalue
$.ajax({
  type: 'get',
  url: 'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusFloor=2f',
  data: ModbusBmsvalue,
  dataType: 'json',
  async: false, //默认为true 异步
  success: function (data) {
    ModbusBmsvalue = data.data
  },
})
/**获取所有字段中文名称 */
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

console.log('ChineseName: ', ChineseName)
/**二楼十三个空调设备组 */
var TwoModbusBmsLabel = new THREE.Group()

var ThreeVAVLabelgroup = new THREE.Group()

var clickmesh = null
var twofloorRoomLabel = new THREE.Group()
var twofloorRoomLabel_hc = new THREE.Group()
var twofloorFy = new THREE.Group()
var twofloorFy_hc = new THREE.Group()
function show2Flabel(meshname) {
  clickmesh = scene.getObjectByName(meshname)
  scene.getObjectByName(meshname).element.style.visibility = 'visible'
}

function addlabel2FFy() {
  $('body').append(
    `	<div id="moldfy" class="classFy">
    <div  class="labelFy">
      <div  class="temFy">
       
        风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f2.moldWindPress +
      `Pa</div>
    </div>
  </div>
    <div id="moldfy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f2.moldBuffWindPress +
      `Pa</div>
  </div>
  </div>`
  )

  var moldfy = document.getElementById('moldfy')
  var moldfy_hc = document.getElementById('moldfy_hc')

  var moldfylabel = new CSS3DSprite(moldfy)
  moldfylabel.name = 'moldfy'
  var moldfy_hclabel = new CSS3DSprite(moldfy_hc)
  moldfy_hclabel.name = 'mold_hcfy'
  twofloorFy.add(moldfylabel)
  twofloorFy_hc.add(moldfy_hclabel)

  /**肠道 */

  $('body').append(
    `	<div id="gutfy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f2.gutWindPress +
      `Pa</div>
  </div>
  </div>
  <div id="gutfy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f2.gutBuffWindPress +
      `Pa</div>
  </div>
  </div>`
  )

  var gutfy = document.getElementById('gutfy')
  var gutfy_hc = document.getElementById('gutfy_hc')

  var gutfylabel = new CSS3DSprite(gutfy)
  gutfylabel.name = 'gutfy'
  var gutfy_hclabel = new CSS3DSprite(gutfy_hc)
  gutfy_hclabel.name = 'gut_hcfy'
  twofloorFy.add(gutfylabel)
  twofloorFy_hc.add(gutfy_hclabel)

  $('body').append(
    `	<div id="rstfy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f2.rstWindPress +
      `Pa</div>
  </div>
  </div>
  <div id="rstfy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f2.rstBuffWindPress +
      `Pa</div>
  </div>
  </div>`
  )

  var rstfy = document.getElementById('rstfy')
  var rstfy_hc = document.getElementById('rstfy_hc')

  var rstfylabel = new CSS3DSprite(rstfy)
  rstfylabel.name = 'rstfy'
  var rstfy_hclabel = new CSS3DSprite(rstfy_hc)
  rstfy_hclabel.name = 'rst_hcfy'
  twofloorFy.add(rstfylabel)
  twofloorFy_hc.add(rstfy_hclabel)

  /**modbusBm2f4 */
  /** 高致病*/
  /** 高致病*/
  $('body').append(
    `	<div id="gzbfy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f4.gzbfy +
      `Pa</div>
  </div>
  </div>
  <div id="gzbfy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f4.gzbhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var gzbfy = document.getElementById('gzbfy')
  var gzbfy_hc = document.getElementById('gzbfy_hc')

  var gzbfylabel = new CSS3DSprite(gzbfy)
  gzbfylabel.name = 'gzbfy'
  var gzbfy_hclabel = new CSS3DSprite(gzbfy_hc)
  gzbfy_hclabel.name = 'gzb_hcfy'
  twofloorFy.add(gzbfylabel)
  twofloorFy_hc.add(gzbfy_hclabel)

  /** 样本病*/
  $('body').append(
    `	<div id="ybfy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f4.ybfy +
      `Pa</div>
  </div>
  </div>
  <div id="ybfy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f4.ybhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var ybfy = document.getElementById('ybfy')
  var ybfy_hc = document.getElementById('ybfy_hc')

  var ybfylabel = new CSS3DSprite(ybfy)
  ybfylabel.name = 'ybfy'
  var ybfy_hclabel = new CSS3DSprite(ybfy_hc)
  ybfy_hclabel.name = 'yb_hcfy'
  twofloorFy.add(ybfylabel)
  twofloorFy_hc.add(ybfy_hclabel)

  /** 试剂*/
  $('body').append(
    `	<div id="sjfy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f4.sjfy +
      `Pa</div>
  </div>
  </div>
  <div id="sjfy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f4.sjhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var sjfy = document.getElementById('sjfy')
  var sjfy_hc = document.getElementById('sjfy_hc')

  var sjfylabel = new CSS3DSprite(sjfy)
  sjfylabel.name = 'sjfy'
  var sjfy_hclabel = new CSS3DSprite(sjfy_hc)
  sjfy_hclabel.name = 'sj_hcfy'
  twofloorFy.add(sjfylabel)
  twofloorFy_hc.add(sjfy_hclabel)

  /** 核酸*/
  $('body').append(
    `	<div id="hsfy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f4.hsfy +
      `Pa</div>
  </div>
  </div>
  <div id="hsfy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f4.hshcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var hsfy = document.getElementById('hsfy')
  var hsfy_hc = document.getElementById('hsfy_hc')

  var hsfylabel = new CSS3DSprite(hsfy)
  hsfylabel.name = 'hsfy'
  var hsfy_hclabel = new CSS3DSprite(hsfy_hc)
  hsfy_hclabel.name = 'hs_hcfy'
  twofloorFy.add(hsfylabel)
  twofloorFy_hc.add(hsfy_hclabel)

  /** 扩增分析*/
  $('body').append(
    `	<div id="kzfxfy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f4.kzfxfy +
      `Pa</div>
  </div>
  </div>
  <div id="kzfxfy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f4.kzfxhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var kzfxfy = document.getElementById('kzfxfy')
  var kzfxfy_hc = document.getElementById('kzfxfy_hc')

  var kzfxfylabel = new CSS3DSprite(kzfxfy)
  kzfxfylabel.name = 'kzfxfy'
  var kzfxfy_hclabel = new CSS3DSprite(kzfxfy_hc)
  kzfxfy_hclabel.name = 'kzfx_hcfy'
  twofloorFy.add(kzfxfylabel)
  twofloorFy_hc.add(kzfxfy_hclabel)

  /** 产物分析*/
  $('body').append(
    `	<div id="cwfxfy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f4.cwfxfy +
      `Pa</div>
  </div>
  </div>
  <div id="cwfxfy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f4.cwfxhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var cwfxfy = document.getElementById('cwfxfy')
  var cwfxfy_hc = document.getElementById('cwfxfy_hc')

  var cwfxfylabel = new CSS3DSprite(cwfxfy)
  cwfxfylabel.name = 'cwfxfy'
  var cwfxfy_hclabel = new CSS3DSprite(cwfxfy_hc)
  cwfxfy_hclabel.name = 'cwfx_hcfy'
  twofloorFy.add(cwfxfylabel)
  twofloorFy_hc.add(cwfxfy_hclabel)

  /**ModbusBms2f8 */
  /** 产物*/

  $('body').append(
    `	<div id="cwfy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f8.cwfy +
      `Pa</div>
  </div>
  </div>
  <div id="cwfy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f8.cwhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var cwfy = document.getElementById('cwfy')
  var cwfy_hc = document.getElementById('cwfy_hc')

  var cwfylabel = new CSS3DSprite(cwfy)
  cwfylabel.name = 'cwfy'
  var cwfy_hclabel = new CSS3DSprite(cwfy_hc)
  cwfy_hclabel.name = 'cw_hcfy'
  twofloorFy.add(cwfylabel)
  twofloorFy_hc.add(cwfy_hclabel)

  /** 致病菌*/
  $('body').append(
    `	<div id="zbjfy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f8.zbjfy +
      `Pa</div>
  </div>
  </div>
  <div id="zbjfy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f8.zbjhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var zbjfy = document.getElementById('zbjfy')
  var zbjfy_hc = document.getElementById('zbjfy_hc')

  var zbjfylabel = new CSS3DSprite(zbjfy)
  zbjfylabel.name = 'zbjfy'
  var zbjfy_hclabel = new CSS3DSprite(zbjfy_hc)
  zbjfy_hclabel.name = 'zbj_hcfy'
  twofloorFy.add(zbjfylabel)
  twofloorFy_hc.add(zbjfy_hclabel)
  /** 扩增分析室*/
  $('body').append(
    `	<div id="kzfy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f8.kzfy +
      `Pa</div>
  </div>
  </div>
  <div id="kzfy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f8.kzhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var kzfy = document.getElementById('kzfy')
  var kzfy_hc = document.getElementById('kzfy_hc')

  var kzfylabel = new CSS3DSprite(kzfy)
  kzfylabel.name = 'kzfy'
  var kzfy_hclabel = new CSS3DSprite(kzfy_hc)
  kzfy_hclabel.name = 'kz_hcfy'
  twofloorFy.add(kzfylabel)
  twofloorFy_hc.add(kzfy_hclabel)

  /** 样本1*/
  $('body').append(
    `	<div id="yb1fy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f8.ybfy1 +
      `Pa</div>
  </div>
  </div>
  <div id="yb1fy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f8.ybhcfy1 +
      `Pa</div>
  </div>
  </div>`
  )

  var ybfy = document.getElementById('ybfy')
  var ybfy_hc = document.getElementById('ybfy_hc')

  var ybfylabel = new CSS3DSprite(ybfy)
  ybfylabel.name = 'yb1fy'
  var ybfy_hclabel = new CSS3DSprite(ybfy_hc)
  ybfy_hclabel.name = 'yb1_hcfy'
  twofloorFy.add(ybfylabel)
  twofloorFy_hc.add(ybfy_hclabel)
  /** 样本2*/
  $('body').append(
    `	<div id="yb2fy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f8.ybfy2 +
      `Pa</div>
  </div>
  </div>
  <div id="yb2fy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f8.ybhcfy2 +
      `Pa</div>
  </div>
  </div>`
  )

  var ybfy = document.getElementById('yb2fy')
  var ybfy_hc = document.getElementById('yb2fy_hc')

  var ybfylabel = new CSS3DSprite(ybfy)
  ybfylabel.name = 'yb2fy'
  var ybfy_hclabel = new CSS3DSprite(ybfy_hc)
  ybfy_hclabel.name = 'yb2_hcfy'
  twofloorFy.add(ybfylabel)
  twofloorFy_hc.add(ybfy_hclabel)

  /** 试剂1*/
  $('body').append(
    `	<div id="sjfy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f8.sjfy +
      `Pa</div>
  </div>
  </div>
  <div id="sjfy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f8.sjhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var sjfy = document.getElementById('sjfy')
  var sjfy_hc = document.getElementById('sjfy_hc')

  var sjfylabel = new CSS3DSprite(sjfy)
  sjfylabel.name = 'sj1fy'
  var sjfy_hclabel = new CSS3DSprite(sjfy_hc)
  sjfy_hclabel.name = 'sj1_hcfy'
  twofloorFy.add(sjfylabel)
  twofloorFy_hc.add(sjfy_hclabel)

  /** 试剂2*/
  $('body').append(
    `	<div id="sj2fy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f8.sjfy2 +
      `Pa</div>
  </div>
  </div>
  <div id="sj2fy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f8.sjhcfy2 +
      `Pa</div>
  </div>
  </div>`
  )

  var sj2fy = document.getElementById('sj2fy')
  var sj2fy_hc = document.getElementById('sj2fy_hc')

  var sj2fylabel = new CSS3DSprite(sj2fy)
  sj2fylabel.name = 'sj2fy'
  var sj2fy_hclabel = new CSS3DSprite(sj2fy_hc)
  sj2fy_hclabel.name = 'sj2_hcfy'
  twofloorFy.add(sj2fylabel)
  twofloorFy_hc.add(sj2fy_hclabel)

  /** 核酸*/

  $('body').append(
    `	<div id="hs2fy" class="classFy">
    <div  class="labelFy">
      <div  class="temFy">
       
        风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f8.hsfy +
      `Pa</div>
    </div>
  </div>
    <div id="hs2fy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f8.hshcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var hsfy = document.getElementById('hs2fy')
  var hsfy_hc = document.getElementById('hs2fy_hc')

  var hsfylabel = new CSS3DSprite(hsfy)
  hsfylabel.name = 'hsbdfy'
  var hsfy_hclabel = new CSS3DSprite(hsfy_hc)
  hsfy_hclabel.name = 'hsbd_hcfy'
  twofloorFy.add(hsfylabel)
  twofloorFy_hc.add(hsfy_hclabel)
  /**ModbusBms2f8 */
  /** 呼吸道*/
  $('body').append(
    `	<div id="wxd2fy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f9.wxdfy +
      `Pa</div>
  </div>
  </div>
  <div id="wxd2fy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f9.wxdhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var wxd2fy = document.getElementById('wxd2fy')
  var wxd2fy_hc = document.getElementById('wxd2fy_hc')

  var wxd2fylabel = new CSS3DSprite(wxd2fy)
  wxd2fylabel.name = 'wxdfy'
  var wxd2fy_hclabel = new CSS3DSprite(wxd2fy_hc)
  wxd2fy_hclabel.name = 'wxd_hcfy'
  twofloorFy.add(wxd2fylabel)
  twofloorFy_hc.add(wxd2fy_hclabel)

  /** 肠道病毒*/
  $('body').append(
    `	<div id="cd2fy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f9.cdfy +
      `Pa</div>
  </div>
  </div>
  <div id="cd2fy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f9.cdhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var cd2fy = document.getElementById('cd2fy')
  var cd2fy_hc = document.getElementById('cd2fy_hc')

  var cd2fylabel = new CSS3DSprite(cd2fy)
  cd2fylabel.name = 'cdfy'
  var cd2fy_hclabel = new CSS3DSprite(cd2fy_hc)
  cd2fy_hclabel.name = 'cd_hcfy'
  twofloorFy.add(cd2fylabel)
  twofloorFy_hc.add(cd2fy_hclabel)
  /** 细胞培养1*/
  $('body').append(
    `	<div id="xb1fy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f9.xbfy1 +
      `Pa</div>
  </div>
  </div>
  <div id="xb1fy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f9.xbhcfy1 +
      `Pa</div>
  </div>
  </div>`
  )

  var xb1fy = document.getElementById('xb1fy')
  var xb1fy_hc = document.getElementById('xb1fy_hc')

  var xb1fylabel = new CSS3DSprite(xb1fy)
  xb1fylabel.name = 'xb1fy'
  var xb1fy_hclabel = new CSS3DSprite(xb1fy_hc)
  xb1fy_hclabel.name = 'xb1_hcfy'
  twofloorFy.add(xb1fylabel)
  twofloorFy_hc.add(xb1fy_hclabel)
  /** 细胞培养2*/
  $('body').append(
    `	<div id="xb2fy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f9.xbfy2 +
      `Pa</div>
  </div>
  </div>
  <div id="xb2fy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f9.xbhcfy2 +
      `Pa</div>
  </div>
  </div>`
  )

  var xb2fy = document.getElementById('xb2fy')
  var xb2fy_hc = document.getElementById('xb2fy_hc')

  var xb2fylabel = new CSS3DSprite(xb2fy)
  xb2fylabel.name = 'xb2fy'
  var xb2fy_hclabel = new CSS3DSprite(xb2fy_hc)
  xb2fy_hclabel.name = 'xb2_hcfy'
  twofloorFy.add(xb2fylabel)
  twofloorFy_hc.add(xb2fy_hclabel)
  /** 测序*/
  $('body').append(
    `	<div id="cx2fy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f11.cxfy +
      `Pa</div>
  </div>
  </div>
  <div id="cx2fy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f11.cxhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var cx2fy = document.getElementById('cx2fy')
  var cx2fy_hc = document.getElementById('cx2fy_hc')

  var cx2fylabel = new CSS3DSprite(cx2fy)
  cx2fylabel.name = 'cxfy'
  var cx2fy_hclabel = new CSS3DSprite(cx2fy_hc)
  cx2fy_hclabel.name = 'cx_hcfy'
  twofloorFy.add(cx2fylabel)
  twofloorFy_hc.add(cx2fy_hclabel)

  /** 扩增*/
  $('body').append(
    `	<div id="kz2fy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f11.kzfy +
      `Pa</div>
  </div>
  </div>
  <div id="kz2fy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f11.kzhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var kzfy = document.getElementById('kz2fy')
  var kzfy_hc = document.getElementById('kz2fy_hc')

  var kzfylabel = new CSS3DSprite(kzfy)
  kzfylabel.name = 'kzndfy'
  var kzfy_hclabel = new CSS3DSprite(kzfy_hc)
  kzfy_hclabel.name = 'kznd_hcfy'
  twofloorFy.add(kzfylabel)
  twofloorFy_hc.add(kzfy_hclabel)

  /** 数据*/
  $('body').append(
    `	<div id="shujufy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f11.shujufy +
      `Pa</div>
  </div>
  </div>
  <div id="shujufy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f11.shujuhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var shujufy = document.getElementById('shujufy')
  var shujufy_hc = document.getElementById('shujufy_hc')

  var shujufylabel = new CSS3DSprite(shujufy)
  shujufylabel.name = 'shujufy'
  var shujufy_hclabel = new CSS3DSprite(shujufy_hc)
  shujufy_hclabel.name = 'shuju_hcfy'
  twofloorFy.add(shujufylabel)
  twofloorFy_hc.add(shujufy_hclabel)
  /** 11-试剂*/
  $('body').append(
    `	<div id="sjfynd" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f11.sjfy +
      `Pa</div>
  </div>
  </div>
  <div id="sjfynd_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f11.sjhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var sjfynd = document.getElementById('sjfynd')
  var sjfynd_hc = document.getElementById('sjfynd_hc')

  var sjfyndlabel = new CSS3DSprite(sjfynd)
  sjfyndlabel.name = 'sjndfy'
  var sjfynd_hclabel = new CSS3DSprite(sjfynd_hc)
  sjfynd_hclabel.name = 'sjnd_hcfy'
  twofloorFy.add(sjfyndlabel)
  twofloorFy_hc.add(sjfynd_hclabel)

  /** 11-文库*/
  $('body').append(
    `	<div id="fy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f11.wkfy +
      `Pa</div>
  </div>
  </div>
  <div id="wk2fy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f11.wkhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var wk2fy = document.getElementById('wk2fy')
  var wk2fy_hc = document.getElementById('wk2fy_hc')

  var wk2fylabel = new CSS3DSprite(wk2fy)
  wk2fylabel.name = 'wkfy'
  var wk2fy_hclabel = new CSS3DSprite(wk2fy_hc)
  wk2fy_hclabel.name = 'wk_hcfy'
  twofloorFy.add(wk2fylabel)
  twofloorFy_hc.add(wk2fy_hclabel)

  /** 11 - 样本*/
  $('body').append(
    `	<div id="ybnbfy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f11.ybfy +
      `Pa</div>
  </div>
  </div>
  <div id="ybnbfy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f11.ybhcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var ybnbfy = document.getElementById('ybnbfy')
  var ybnbfy_hc = document.getElementById('ybnbfy_hc')

  var ybnbfylabel = new CSS3DSprite(ybnbfy)
  ybnbfylabel.name = 'ybnbfy'
  var ybnbfy_hclabel = new CSS3DSprite(ybnbfy_hc)
  ybnbfy_hclabel.name = 'ybnb_hcfy'
  twofloorFy.add(ybnbfylabel)
  twofloorFy_hc.add(ybnbfy_hclabel)

  /**12 -  多病原P2*/
  $('body').append(
    `	<div id="dbyp2fy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f12.dbyp2fy +
      `Pa</div>
  </div>
  </div>
  <div id="dbyp2fy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f12.dbyp2hcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var dbyp2fy = document.getElementById('dbyp2fy')
  var dbyp2fy_hc = document.getElementById('dbyp2fy_hc')

  var dbyp2fylabel = new CSS3DSprite(dbyp2fy)
  dbyp2fylabel.name = 'dbyp2fy'
  var dbyp2fy_hclabel = new CSS3DSprite(dbyp2fy_hc)
  dbyp2fy_hclabel.name = 'dbyp2_hcfy'
  twofloorFy.add(dbyp2fylabel)
  twofloorFy_hc.add(dbyp2fy_hclabel)

  /**12 -  预留P2*/
  /** 测序*/
  $('body').append(
    `	<div id="ylp2fy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f12.ylp2fy +
      `Pa</div>
  </div>
  </div>
  <div id="ylp2fy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f12.ylp2hcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var ylp2fy = document.getElementById('ylp2fy')
  var ylp2fy_hc = document.getElementById('ylp2fy_hc')

  var ylp2fylabel = new CSS3DSprite(ylp2fy)
  ylp2fylabel.name = 'ylp2fy'
  var ylp2fy_hclabel = new CSS3DSprite(ylp2fy_hc)
  ylp2fy_hclabel.name = 'ylp2_hcfy'
  twofloorFy.add(ylp2fylabel)
  twofloorFy_hc.add(ylp2fy_hclabel)

  /** 13-洁净*/
  $('body').append(
    `	<div id="jj1fy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f13.jj1fy +
      `Pa</div>
  </div>
  </div>
  <div id="jj1fy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f13.jj1hcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var jj1fy = document.getElementById('jj1fy')
  var jj1fy_hc = document.getElementById('jj1fy_hc')

  var jj1fylabel = new CSS3DSprite(jj1fy)
  jj1fylabel.name = 'jj1fy'
  var jj1fy_hclabel = new CSS3DSprite(jj1fy_hc)
  jj1fy_hclabel.name = 'jj1_hcfy'
  twofloorFy.add(jj1fylabel)
  twofloorFy_hc.add(jj1fy_hclabel)

  /** 洁净*/
  $('body').append(
    `	<div id="jj2fy" class="classFy">
  <div  class="labelFy">
    <div  class="temFy">
     
      风压差</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f13.jj2fy +
      `Pa</div>
  </div>
  </div>
  <div id="jj2fy_hc" class="classFy">
  <div  class="labelFy">
  <div  class="temFy">缓冲风压</div>
  <div  class="humFy">` +
      ModbusBmsvalue.ModbusBms2f13.jj2hcfy +
      `Pa</div>
  </div>
  </div>`
  )

  var jj2fy = document.getElementById('jj2fy')
  var jj2fy_hc = document.getElementById('jj2fy_hc')

  var jj2fylabel = new CSS3DSprite(jj2fy)
  jj2fylabel.name = 'jj2fy'
  var jj2fy_hclabel = new CSS3DSprite(jj2fy_hc)
  jj2fy_hclabel.name = 'jj2_hcfy'
  twofloorFy.add(jj2fylabel)
  twofloorFy_hc.add(jj2fy_hclabel)

  for (var i = 0; i < twofloorFy.children.length; i++) {
    twofloorFy.children[i].scale.set(0.31, 0.31, 0.31)
    //     twofloorFy.children[i].scale.set(0.1, 0.1, 0.1)
    //     twofloorFy.children[i].rotateX(-Math.PI / 2)
    console.log(twofloorFy.children[i])
    console.log(
      twofloorFy.children[i].name.substr(
        0,
        twofloorFy.children[i].name.length - 2
      )
    )
    twofloorFy.children[i].position.copy(
      scene
        .getObjectByName(
          twofloorFy.children[i].name.substr(
            0,
            twofloorFy.children[i].name.length - 2
          )
        )
        .getWorldPosition()
    )
    twofloorFy.children[i].position.x += 10
    // twofloorFy.children[i].position.y -= 240

    twofloorFy.children[i].element.style.visibility = 'visible'
  }

  for (var i = 0; i < twofloorFy_hc.children.length; i++) {
    twofloorFy_hc.children[i].scale.set(0.31, 0.31, 0.31)
    //     twofloorFy_hc.children[i].scale.set(0.1, 0.1, 0.1)
    //     twofloorFy_hc.children[i].rotateX(-Math.PI / 3)

    twofloorFy_hc.children[i].position.copy(
      scene
        .getObjectByName(
          twofloorFy_hc.children[i].name.substr(
            0,
            twofloorFy_hc.children[i].name.length - 2
          )
        )
        .getWorldPosition()
    )
    twofloorFy_hc.children[i].position.x += 10
    // twofloorFy_hc.children[i].position.y += 70

    twofloorFy_hc.children[i].element.style.visibility = 'visible'
  }

  scene.add(twofloorFy)
  scene.add(twofloorFy_hc)
}

function addlabel2F() {
  /**霉菌 */
  $('body').append(
    `
    <div  class="labelclass"  id="label_allroom">
		<div class="label_room_class" id = "mold">
				<div class = "out_class_PM25">
					<div    class ="img_pos">
					<img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                
				</div><div class = "font-class">PM2.5</div>
                        <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f2.moldPm25 +
      `</div>
				</div>
				<div class = "out_class_VOC">
					<div   class ="img_pos">
					<img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                              
				</div> <div class = "font-class">VOC</div>
                              
					<div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f2.moldVoc +
      `</div>
				</div>
			<div  class = "out_class_CO2">
				
				<div   class ="img_pos">
				<img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                        </div> <div class = "font-class">CO2</div>

			
				
				<div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f2.moldCo2 +
      `</div>
		</div>
     
			<div class= "out_class_FenYaKaDu">
					<div   class ="img_pos">
					<img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                               </div>  <div class = "font-class">风阀开度</div>

			 
					<div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f2.moldDamperOpen +
      `</div>
				</div>
			
		</div> 
      <div  class ="label_room_class_hc"   id = "mold_hc">
     
      <div  class="out_class_HcFenYaKaDu">
              <div class="img_pos">  
                        <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />
                      </div> <div class = "font-class">缓冲风阀开度</div>
                  <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f2.moldBuffDamperOpen +
      `</div>
      </div>
      </div>  
</div>
      `
  )

  var mold = document.getElementById('mold')
  var mold_hc = document.getElementById('mold_hc')

  var moldlabel = new CSS3DSprite(mold)
  moldlabel.name = 'moldn'
  var mold_hclabel = new CSS3DSprite(mold_hc)
  mold_hclabel.name = 'mold_hcn'

  twofloorRoomLabel.add(moldlabel)
  twofloorRoomLabel_hc.add(mold_hclabel)

  /**肠道 */
  $('body').append(
    `
      <div  class="labelclass"  id="label_allroom">
              <div class="label_room_class" id = "gut">
                          <div class = "out_class_PM25">
                                <div    class ="img_pos">
                                <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                              
                          </div> <div class = "font-class">PM2.5</div>
                                <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f2.gutPm25 +
      `</div>
                          </div>
                          <div class = "out_class_VOC">
                                <div   class ="img_pos">
                                <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			 
                                <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f2.gutVoc +
      `</div>
                          </div>
                    <div  class = "out_class_CO2">
                          
                          <div   class ="img_pos">
                          <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                          </div> <div class = "font-class">CO2</div>

			
                          
                          <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f2.gutCo2 +
      `</div>
              </div>
              
                    <div class= "out_class_FenYaKaDu">
                                <div   class ="img_pos">
                                <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                               </div>  <div class = "font-class">风阀开度</div>

			
                                <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f2.gutDamperOpen +
      `</div>
                          </div>
                    
              </div> 
        <div  class ="label_room_class_hc"   id = "gut_hc">
       
         <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
			
                    <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f2.gutBuffDamperOpen +
      `</div>
        </div>
        </div>  
  </div>
        `
  )

  var gut = document.getElementById('gut')
  var gut_hc = document.getElementById('gut_hc')

  var gutlabel = new CSS3DSprite(gut)
  gutlabel.name = 'gutn'
  var gut_hclabel = new CSS3DSprite(gut_hc)
  gut_hclabel.name = 'gut_hcn'
  twofloorRoomLabel.add(gutlabel)
  twofloorRoomLabel_hc.add(gut_hclabel)
  /**呼吸道 */
  $('body').append(
    `
      <div  class="labelclass"  id="label_allroom">
              <div class="label_room_class" id = "rst">
                          <div class = "out_class_PM25">
                                <div    class ="img_pos">
                                <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                              
                          </div> <div class = "font-class">PM2.5</div>
                                <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f2.rstPm25 +
      `</div>
                          </div>
                          <div class = "out_class_VOC">
                                <div   class ="img_pos">
                                <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			 
                                <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f2.rstVoc +
      `</div>
                          </div>
                    <div  class = "out_class_CO2">
                          
                          <div   class ="img_pos">
                          <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                          </div> <div class = "font-class">CO2</div>

			
                          
                          <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f2.rstCo2 +
      `</div>
              </div>
    
                    <div class= "out_class_FenYaKaDu">
                                <div   class ="img_pos">
                                <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                               </div>  <div class = "font-class">风阀开度</div>

			
                                <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f2.rstDamperOpen +
      `</div>
                          </div>
                    
              </div> 
        <div  class ="label_room_class_hc"   id = "rst_hc">
        
         <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			

			
                    <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f2.rstBuffDamperOpen +
      `</div>
        </div>
        </div>  
  </div>
        `
  )

  var rst = document.getElementById('rst')
  var rst_hc = document.getElementById('rst_hc')

  var rstlabel = new CSS3DSprite(rst)
  rstlabel.name = 'rstn'
  var rst_hclabel = new CSS3DSprite(rst_hc)
  rst_hclabel.name = 'rst_hcn'
  twofloorRoomLabel.add(rstlabel)
  twofloorRoomLabel_hc.add(rst_hclabel)

  /**modbusBm2f4 */
  /** 高致病*/
  $('body').append(
    `
      <div  class="labelclass"  id="label_allroom">
              <div class="label_room_class" id = "gzb">
                          <div class = "out_class_PM25">
                                <div    class ="img_pos">
                                <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                              
                          </div><div class = "font-class">PM2.5</div> 
                                <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.gzbpm25 +
      `</div>
                          </div>
                          <div class = "out_class_VOC">
                                <div   class ="img_pos">
                                <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			 
                                <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.gzbvoc +
      `</div>
                          </div>
                    <div  class = "out_class_CO2">
                          
                          <div   class ="img_pos">
                          <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                          </div> <div class = "font-class">CO2</div>

			
                          
                          <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.gzbco2 +
      `</div>
              </div>
              
                    <div class= "out_class_FenYaKaDu">
                                <div   class ="img_pos">
                                <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                               </div>  <div class = "font-class">风阀开度</div>

			
                                <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.gzbffkd +
      `</div>
                          </div>
                    
              </div> 
        <div  class ="label_room_class_hc"   id = "gzb_hc">
       
         <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                    <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f4.gzbhcffkd +
      `</div>
        </div>
        </div>  
  </div>
        `
  )

  var gzb = document.getElementById('gzb')
  var gzb_hc = document.getElementById('gzb_hc')

  var gzblabel = new CSS3DSprite(gzb)
  gzblabel.name = 'gzbn'
  var gzb_hclabel = new CSS3DSprite(gzb_hc)
  gzb_hclabel.name = 'gzb_hcn'
  twofloorRoomLabel.add(gzblabel)
  twofloorRoomLabel_hc.add(gzb_hclabel)

  /** 样本病*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "yb">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.ybpm25 +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.ybvoc +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.ybco2 +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.ybffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "yb_hc">
          
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f4.ybhcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var yb = document.getElementById('yb')
  var yb_hc = document.getElementById('yb_hc')

  var yblabel = new CSS3DSprite(yb)
  yblabel.name = 'ybn'
  var yb_hclabel = new CSS3DSprite(yb_hc)
  yb_hclabel.name = 'yb_hcn'
  twofloorRoomLabel.add(yblabel)
  twofloorRoomLabel_hc.add(yb_hclabel)

  /** 试剂*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "sj">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.sjpm25 +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.sjvoc +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.sjco2 +
      `</div>
                </div>
               <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.sjffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "sj_hc">
       
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f4.sjhcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var sj = document.getElementById('sj')
  var sj_hc = document.getElementById('sj_hc')

  var sjlabel = new CSS3DSprite(sj)
  sjlabel.name = 'sjn'
  var sj_hclabel = new CSS3DSprite(sj_hc)
  sj_hclabel.name = 'sj_hcn'
  twofloorRoomLabel.add(sjlabel)
  twofloorRoomLabel_hc.add(sj_hclabel)

  /** 核酸*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "hs">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.hspm25 +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.hsvoc +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.hsco2 +
      `</div>
                </div>
              
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.hsffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "hs_hc">
        
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f4.hshcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var hs = document.getElementById('hs')
  var hs_hc = document.getElementById('hs_hc')

  var hslabel = new CSS3DSprite(hs)
  hslabel.name = 'hsn'
  var hs_hclabel = new CSS3DSprite(hs_hc)
  hs_hclabel.name = 'hs_hcn'
  twofloorRoomLabel.add(hslabel)
  twofloorRoomLabel_hc.add(hs_hclabel)

  /** 扩增分析*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "kzfx">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.kzfxpm25 +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.kzfxvoc +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.kzfxco2 +
      `</div>
                </div>
              
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.kzfxffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "kzfx_hc">
       
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f4.kzfxhcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var kzfx = document.getElementById('kzfx')
  var kzfx_hc = document.getElementById('kzfx_hc')

  var kzfxlabel = new CSS3DSprite(kzfx)
  kzfxlabel.name = 'kzfxn'
  var kzfx_hclabel = new CSS3DSprite(kzfx_hc)
  kzfx_hclabel.name = 'kzfx_hcn'
  twofloorRoomLabel.add(kzfxlabel)
  twofloorRoomLabel_hc.add(kzfx_hclabel)

  /** 产物分析*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "cwfx">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.cwfxpm25 +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.cwfxvoc +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.cwfxco2 +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f4.cwfxffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "cwfx_hc">
        
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f4.cwfxhcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var cwfx = document.getElementById('cwfx')
  var cwfx_hc = document.getElementById('cwfx_hc')

  var cwfxlabel = new CSS3DSprite(cwfx)
  cwfxlabel.name = 'cwfxn'
  var cwfx_hclabel = new CSS3DSprite(cwfx_hc)
  cwfx_hclabel.name = 'cwfx_hcn'
  twofloorRoomLabel.add(cwfxlabel)
  twofloorRoomLabel_hc.add(cwfx_hclabel)

  /**ModbusBms2f8 */
  /** 产物*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "cw">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.cwpm25nd +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.cwvocdj +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.cwco2nd +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.cwffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "cw_hc">
          
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f8.cwhcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )

  var cw = document.getElementById('cw')
  var cw_hc = document.getElementById('cw_hc')

  var cwlabel = new CSS3DSprite(cw)
  cwlabel.name = 'cwn'
  var cw_hclabel = new CSS3DSprite(cw_hc)
  cw_hclabel.name = 'cw_hcn'
  twofloorRoomLabel.add(cwlabel)
  twofloorRoomLabel_hc.add(cw_hclabel)

  /** 致病菌*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "zbj">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.zbjpm25nd +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.zbjvocdj +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.zbjco2nd +
      `</div>
                </div>
              
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.zbjffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "zbj_hc">
          
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f8.zbjhcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )

  var zbj = document.getElementById('zbj')
  var zbj_hc = document.getElementById('zbj_hc')

  var zbjlabel = new CSS3DSprite(zbj)
  zbjlabel.name = 'zbjn'
  var zbj_hclabel = new CSS3DSprite(zbj_hc)
  zbj_hclabel.name = 'zbj_hcn'
  twofloorRoomLabel.add(zbjlabel)
  twofloorRoomLabel_hc.add(zbj_hclabel)

  /** 扩增分析室*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "kz">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.kzpm25nd +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.kzvocdj +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.kzco2nd +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.kzffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "kz_hc">
         
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f8.kzhcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var kz = document.getElementById('kz')
  var kz_hc = document.getElementById('kz_hc')

  var kzlabel = new CSS3DSprite(kz)
  kzlabel.name = 'kzn'
  var kz_hclabel = new CSS3DSprite(kz_hc)
  kz_hclabel.name = 'kz_hcn'
  twofloorRoomLabel.add(kzlabel)
  twofloorRoomLabel_hc.add(kz_hclabel)

  /** 样本1*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "yb1">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.ybpm25nd1 +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.ybvocdj1 +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.ybco2nd1 +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.ybffkd1 +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "yb1_hc">
         
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f8.ybhcffkd1 +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var yb1 = document.getElementById('yb1')
  var yb1_hc = document.getElementById('yb1_hc')

  var yblabel = new CSS3DSprite(yb1)
  yblabel.name = 'yb1n'
  var yb_hclabel = new CSS3DSprite(yb1_hc)
  yb_hclabel.name = 'yb1_hcn'
  twofloorRoomLabel.add(yblabel)
  twofloorRoomLabel_hc.add(yb_hclabel)

  /** 样本2*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "yb2">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.ybpm25nd2 +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.ybvocdj2 +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.ybco2nd2 +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.ybffkd2 +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "yb2_hc">
         
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f8.ybhcffkd2 +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var yb2 = document.getElementById('yb2')
  var yb2_hc = document.getElementById('yb2_hc')

  var yb2label = new CSS3DSprite(yb2)
  yb2label.name = 'yb2n'
  var yb2_hclabel = new CSS3DSprite(yb2_hc)
  yb2_hclabel.name = 'yb2_hcn'
  twofloorRoomLabel.add(yb2label)
  twofloorRoomLabel_hc.add(yb2_hclabel)

  /** 试剂1*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "sj1">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.sjpm25nd1 +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.sjvocdj1 +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.sjco2nd1 +
      `</div>
                </div>
                     <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.sjffkd1 +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "sj1_hc">
        
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f8.sjhcffkd1 +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var sj1 = document.getElementById('sj1')
  var sj1_hc = document.getElementById('sj1_hc')

  var sjlabel = new CSS3DSprite(sj1)
  sjlabel.name = 'sj1n'
  var sj_hclabel = new CSS3DSprite(sj1_hc)
  sj_hclabel.name = 'sj1_hcn'
  twofloorRoomLabel.add(sjlabel)
  twofloorRoomLabel_hc.add(sj_hclabel)

  /** 试剂2*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "sj">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.sjpm25nd2 +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.sjvocdj2 +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.sjco2nd2 +
      `</div>
                </div>
                
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.sjffkd2 +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "sj_hc">
         
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f8.sjhcffkd2 +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var sj2 = document.getElementById('sj2')
  var sj2_hc = document.getElementById('sj2_hc')

  var sj2label = new CSS3DSprite(sj2)
  sj2label.name = 'sj2n'
  var sj2_hclabel = new CSS3DSprite(sj2_hc)
  sj2_hclabel.name = 'sj2_hcn'
  twofloorRoomLabel.add(sj2label)
  twofloorRoomLabel_hc.add(sj2_hclabel)

  /** 核酸*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "hs2">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.hspm25nd +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.hsvocdj +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.hsco2nd +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f8.hsffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "hs2_hc">
          
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f8.hshcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var hs2 = document.getElementById('hs2')
  var hs2_hc = document.getElementById('hs2_hc')

  var hs2label = new CSS3DSprite(hs2)
  hs2label.name = 'hsbdn'
  var hs2_hclabel = new CSS3DSprite(hs2_hc)
  hs2_hclabel.name = 'hsbd_hcn'
  twofloorRoomLabel.add(hs2label)
  twofloorRoomLabel_hc.add(hs2_hclabel)

  /** 呼吸道*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "wxd2">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.wxdpm25nd +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.wxdvocdj +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.wxdco2nd +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.wxdffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "wxd2_hc">
          
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f9.wxdhcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var wxd2 = document.getElementById('wxd2')
  var wxd2_hc = document.getElementById('wxd2_hc')

  var wxd2label = new CSS3DSprite(wxd2)
  wxd2label.name = 'wxdn'
  var wxd2_hclabel = new CSS3DSprite(wxd2_hc)
  wxd2_hclabel.name = 'wxd_hcn'
  twofloorRoomLabel.add(wxd2label)
  twofloorRoomLabel_hc.add(wxd2_hclabel)

  /** 肠道病毒*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "cd2">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.cdpm25nd +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.cdvocdj +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.cdco2nd +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.cdffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "cd2_hc">
         
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f9.cdhcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var cd2 = document.getElementById('cd2')
  var cd2_hc = document.getElementById('cd2_hc')

  var cd2label = new CSS3DSprite(cd2)
  cd2label.name = 'cdn'
  var cd2_hclabel = new CSS3DSprite(cd2_hc)
  cd2_hclabel.name = 'cd_hcn'
  twofloorRoomLabel.add(cd2label)
  twofloorRoomLabel_hc.add(cd2_hclabel)

  /** 细胞培养1*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "xb1">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.xbpm25nd1 +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.xbvocdj1 +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.xbco2nd1 +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.xbffkd1 +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "xb1_hc">
        
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f9.xbhcffkd1 +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var xb1 = document.getElementById('xb1')
  var xb1_hc = document.getElementById('xb1_hc')

  var xblabel = new CSS3DSprite(xb1)
  xblabel.name = 'xb1n'
  var xb_hclabel = new CSS3DSprite(xb1_hc)
  xb_hclabel.name = 'xb1_hcn'
  twofloorRoomLabel.add(xblabel)
  twofloorRoomLabel_hc.add(xb_hclabel)

  /** 细胞培养2*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "xb2">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.xbm25nd2 +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.xbvoc2nd2 +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.xbco2nd2 +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.xbffkd2 +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "xb2_hc">
          
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f9.xbhcffkd2 +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var xb2 = document.getElementById('xb2')
  var xb2_hc = document.getElementById('xb2_hc')

  var xb2label = new CSS3DSprite(xb2)
  xb2label.name = 'xb2n'
  var xb2_hclabel = new CSS3DSprite(xb2_hc)
  xb2_hclabel.name = 'xb2_hcn'
  twofloorRoomLabel.add(xb2label)
  twofloorRoomLabel_hc.add(xb2_hclabel)

  /** 测序*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "cx2">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.cxpm25nd +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.cxvocdj +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.cxco2nd +
      `</div>
                </div>
                
          
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.cxffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "cx2_hc">
        
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f11.cxhcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var cx2 = document.getElementById('cx2')
  var cx2_hc = document.getElementById('cx2_hc')

  var cx2label = new CSS3DSprite(cx2)
  cx2label.name = 'cxn'
  var cx2_hclabel = new CSS3DSprite(cx2_hc)
  cx2_hclabel.name = 'cx_hcn'
  twofloorRoomLabel.add(cx2label)
  twofloorRoomLabel_hc.add(cx2_hclabel)

  /** 测序*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "kz2">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.kzpm25nd +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.kzvocdj +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.kzco2nd +
      `</div>
                </div>
              
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f9.kzffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "kz2_hc">
          
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f11.kzhcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var kz2 = document.getElementById('kz2')
  var kz2_hc = document.getElementById('kz2_hc')

  var kz2label = new CSS3DSprite(kz2)
  kz2label.name = 'kzndn'
  var kz2_hclabel = new CSS3DSprite(kz2_hc)
  kz2_hclabel.name = 'kznd_hcn'
  twofloorRoomLabel.add(kz2label)
  twofloorRoomLabel_hc.add(kz2_hclabel)

  /** 数据*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "shuju2">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.shujupm25nd +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.shujuvocdj +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.shujuco2nd +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.shujuffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "shuju2_hc">
          
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f11.shujuhcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var shuju2 = document.getElementById('shuju2')
  var shuju2_hc = document.getElementById('shuju2_hc')

  var shuju2label = new CSS3DSprite(shuju2)
  shuju2label.name = 'shujun'
  var shuju2_hclabel = new CSS3DSprite(shuju2_hc)
  shuju2_hclabel.name = 'shuju_hcn'
  twofloorRoomLabel.add(shuju2label)
  twofloorRoomLabel_hc.add(shuju2_hclabel)

  /** 11-试剂*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "sjnd">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.sjpm25nd +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.sjvocdj +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.sjco2nd +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.sjffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "sjnd_hc">
          
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f11.sjhcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var sj2 = document.getElementById('sjnd')
  var sj2_hc = document.getElementById('sjnd_hc')

  var sj2label = new CSS3DSprite(sj2)
  sj2label.name = 'sjndn'
  var sj2_hclabel = new CSS3DSprite(sj2_hc)
  sj2_hclabel.name = 'sjnd_hcn'
  twofloorRoomLabel.add(sj2label)
  twofloorRoomLabel_hc.add(sj2_hclabel)

  /** 11-文库*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "wk2">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.wkpm25nd +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.wkvocdj +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.wkco2nd +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.wkffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "wk2_hc">
        
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f11.wkhcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var wk2 = document.getElementById('wk2')
  var wk2_hc = document.getElementById('wk2_hc')

  var wk2label = new CSS3DSprite(wk2)
  wk2label.name = 'wkn'
  var wk2_hclabel = new CSS3DSprite(wk2_hc)
  wk2_hclabel.name = 'wk_hcn'
  twofloorRoomLabel.add(wk2label)
  twofloorRoomLabel_hc.add(wk2_hclabel)

  /** 11 - 样本*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "ybnd">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.ybpm25nd +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.ybvocdj +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.ybco2nd +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f11.ybffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "ybnd_hc">
        
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f11.ybhcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var yb2 = document.getElementById('ybnd')
  var yb2_hc = document.getElementById('ybnd_hc')

  var yb2label = new CSS3DSprite(yb2)
  yb2label.name = 'ybnbn'
  var yb2_hclabel = new CSS3DSprite(yb2_hc)
  yb2_hclabel.name = 'ybnb_hcn'
  twofloorRoomLabel.add(yb2label)
  twofloorRoomLabel_hc.add(yb2_hclabel)

  /**12 -  多病原P2*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "dbyp22">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f12.dbyp2pm25nd +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f12.dbyp2vocdj +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f12.dbyp2co2nd +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f12.dbyp2ffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "dbyp22_hc">
        
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f12.dbyp2hcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var dbyp22 = document.getElementById('dbyp22')
  var dbyp22_hc = document.getElementById('dbyp22_hc')

  var dbyp22label = new CSS3DSprite(dbyp22)
  dbyp22label.name = 'dbyp2n'
  var dbyp22_hclabel = new CSS3DSprite(dbyp22_hc)
  dbyp22_hclabel.name = 'dbyp2_hcn'
  twofloorRoomLabel.add(dbyp22label)
  twofloorRoomLabel_hc.add(dbyp22_hclabel)

  /**12 -  预留P2*/
  /** 测序*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "ylp22">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f12.ylp2pm25nd +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f12.ylp2vocdj +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f12.ylp2co2nd +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f12.ylp2ffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "ylp22_hc">
        
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />
                          </div>  <div class = "font-class">缓冲风阀开度</div>
                  
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f12.ylp2hcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var ylp22 = document.getElementById('ylp22')
  var ylp22_hc = document.getElementById('ylp22_hc')

  var ylp22label = new CSS3DSprite(ylp22)
  ylp22label.name = 'ylp2n'
  var ylp22_hclabel = new CSS3DSprite(ylp22_hc)
  ylp22_hclabel.name = 'ylp2_hcn'
  twofloorRoomLabel.add(ylp22label)
  twofloorRoomLabel_hc.add(ylp22_hclabel)

  /** 13-洁净*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "jj1">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f13.jj1pm25nd +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f13.jj1vocdj +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f13.jj1co2nd +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f13.jj1ffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "jj1_hc">
     
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f13.jj1hcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var jj1 = document.getElementById('jj1')
  var jj1_hc = document.getElementById('jj1_hc')

  var jjlabel = new CSS3DSprite(jj1)
  jjlabel.name = 'jj1n'
  var jj_hclabel = new CSS3DSprite(jj1_hc)
  jj_hclabel.name = 'jj1_hcn'
  twofloorRoomLabel.add(jjlabel)
  twofloorRoomLabel_hc.add(jj_hclabel)

  /** 洁净*/
  $('body').append(
    `
        <div  class="labelclass"  id="label_allroom">
                <div class="label_room_class" id = "jj2">
                            <div class = "out_class_PM25">
                                  <div    class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/pm2.5.png"  />
                                  </div> <div class = "font-class">PM2.5</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f13.jj2pm25nd +
      `</div>
                            </div>
                            <div class = "out_class_VOC">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/suffix-voc.png"  />
                                 </div> <div class = "font-class">VOC</div>

			
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f13.jj2vocdj +
      `</div>
                            </div>
                      <div  class = "out_class_CO2">
                            
                            <div   class ="img_pos">
                            <img  class = "fenya_class"   src = "./img/fenya/CO2浓度.png"  />
                            </div> <div class = "font-class">CO2</div>

			
                            
                            <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f13.jj2co2nd +
      `</div>
                </div>
               
                      <div class= "out_class_FenYaKaDu">
                                  <div   class ="img_pos">
                                  <img  class = "fenya_class"   src = "./img/fenya/风阀.png"  />
                                   </div>  <div class = "font-class">风阀开度</div>

			 
                                  <div   class = "img_value">` +
      ModbusBmsvalue.ModbusBms2f13.jj2ffkd +
      `</div>
                            </div>
                      
                </div> 
          <div  class ="label_room_class_hc"   id = "jj2_hc">
         
           <div  class="out_class_HcFenYaKaDu">
         <div class="img_pos">  
                          <img  class = "fenya_class"   src = "./img/fenya/缓冲风阀.png"  />

			
                      </div> <div class = "font-class">缓冲风阀开度</div>

			
                      <div class="img_value">` +
      ModbusBmsvalue.ModbusBms2f13.jj2hcffkd +
      `</div>
          </div>
          </div>  
    </div>
          `
  )
  var jj2 = document.getElementById('jj2')
  var jj2_hc = document.getElementById('jj2_hc')

  var jj2label = new CSS3DSprite(jj2)
  jj2label.name = 'jj2n'
  var jj2_hclabel = new CSS3DSprite(jj2_hc)
  jj2_hclabel.name = 'jj2_hcn'
  twofloorRoomLabel.add(jj2label)
  twofloorRoomLabel_hc.add(jj2_hclabel)

  scene.getObjectByName('ModbusBms2f').traverse(function (mesh) {
    console.log(mesh)
    if (mesh.name.search('ModbusBms') < 0) {
      $('body').append(
        `<div id = "` +
          mesh.name +
          `qq"><img src = "./img/fenya/定位.png"></div>
          
          `
      )

      var tagPA = document.getElementById(mesh.name + 'qq')
      var meshLabelPA = new CSS3DSprite(tagPA)
      meshLabelPA.name = mesh.name + 'nn'
      meshLabelPA.position.copy(mesh.getWorldPosition())
      meshLabelPA.element.style.visibility = 'visible'

      meshLabelPA.scale.set(0.08, 0.08, 0.08)
      meshLabelPA.position.y += 10
      scene.add(meshLabelPA)

      $('#' + mesh.name + 'qq').click(function () {
        console.log(mesh.name)
        if (clickmesh) {
          clickmesh.element.style.visibility = 'hidden'
        }
        show2Flabel(mesh.name + 'n')
      })

      tagPA.onpointermove = function () {
        scene.getObjectByName(mesh.name + 'nn').scale.set(0.2, 0.2, 0.2)
      }
      tagPA.onpointerleave = function () {
        scene.getObjectByName(mesh.name + 'nn').scale.set(0.08, 0.08, 0.08)
      }
    }
  })

  for (var i = 0; i < twofloorRoomLabel.children.length; i++) {
    twofloorRoomLabel.children[i].scale.set(0.7, 0.7, 0.7)
    //     twofloorRoomLabel.children[i].scale.set(0.1, 0.1, 0.1)
    //     twofloorRoomLabel.children[i].rotateX(-Math.PI / 2)

    twofloorRoomLabel.children[i].position.copy(
      scene
        .getObjectByName(
          twofloorRoomLabel.children[i].name.substr(
            0,
            twofloorRoomLabel.children[i].name.length - 1
          )
        )
        .getWorldPosition()
    )
    twofloorRoomLabel.children[i].position.x += 10
    twofloorRoomLabel.children[i].position.y -= 240

    //     twofloorRoomLabel.children[i].element.style.visibility = 'visible'
  }

  for (var i = 0; i < twofloorRoomLabel_hc.children.length; i++) {
    twofloorRoomLabel_hc.children[i].scale.set(0.7, 0.7, 0.7)
    //     twofloorRoomLabel_hc.children[i].scale.set(0.1, 0.1, 0.1)
    //     twofloorRoomLabel_hc.children[i].rotateX(-Math.PI / 3)

    twofloorRoomLabel_hc.children[i].position.copy(
      scene
        .getObjectByName(
          twofloorRoomLabel_hc.children[i].name.substr(
            0,
            twofloorRoomLabel_hc.children[i].name.length - 1
          )
        )
        .getWorldPosition()
    )
    twofloorRoomLabel_hc.children[i].position.x += 10
    twofloorRoomLabel_hc.children[i].position.y += 70

    //     twofloorRoomLabel_hc.children[i].element.style.visibility = 'visible'
  }

  scene.add(twofloorRoomLabel)
  scene.add(twofloorRoomLabel_hc)
}
/**隐藏二楼数据标签 */
function hiddenlabel2F(dataname) {
  if (dataname == 'img') {
    $('[class*=classFy]').remove()
    for (var i = 0; i < twofloorRoomLabel.children.length; i++) {
      twofloorRoomLabel.children[i].element.style.visibility = 'hidden'
      twofloorRoomLabel_hc.children[i].element.style.visibility = 'hidden'
    }

    scene.getObjectByName('ModbusBms2f').traverse(function (mesh) {
      var meshLabelname = scene.getObjectByName(mesh.name + 'nn')

      if (meshLabelname) meshLabelname.parent.remove(meshLabelname)
    })
  } else if (dataname == 'data') {
    for (var i = 0; i < twofloorFy.children.length; i++) {
      twofloorFy.children[i].element.style.visibility = 'hidden'
      twofloorFy_hc.children[i].element.style.visibility = 'hidden'
    }
  }

  $('[id*=label_allroom]').remove()
}
scene.add(TwoModbusBmsLabel)
/**获取三楼VAv设备值 */
$.ajax({
  type: 'get',
  url: 'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusFloor=3f',
  data: modbusVav,
  dataType: 'json',
  async: false, //默认为true 异步
  success: function (data) {
    modbusVav = data.data
    console.log('modbusVav: ', modbusVav)
  },
})

/**三楼六个空调设备组 */
var ThreeModbusBms3fLgroup = new THREE.Group()
var Threegroup = new THREE.Group()

/**三楼气体检测数据 */
var modbusAir
$.ajax({
  type: 'get',
  url: 'http://221.6.30.202:15007/prod-api/modbus/api/getNewestData?modbusFloor=3f&modbusType=ModbusBms3f6',
  data: modbusAir,
  dataType: 'json',
  async: false, //默认为true 异步
  success: function (data) {
    modbusAir = data.data.ModbusBms3f6
    console.log('modbusAir: ', modbusAir)
  },
})

var ThreeAirLgroup = new THREE.Group()
var ChineseName_air = ChineseName.ModbusBms3f6

console.log('ChineseName_air: ', ChineseName_air)

for (var item in ChineseName_air) {
  if (
    item.search('ylsz') < 0 &&
    item.search('xlsz') < 0 &&
    item.search('xlzt') < 0 &&
    item.search('ylzt') < 0 &&
    item.search('qpjYq1f') < 0
  ) {
    if (item.search('Yq') >= 0) {
      $('body').append(
        `	<div id="ID_` +
          item +
          `" class="classAir_O2">
          <div  id="` +
          item +
          `" class="labelAir_O2">

        <div  class="temAir_O2">氧气O2</div>
  <div  class="humAir_O2">` +
          modbusAir[item] +
          `%</div>
          </div>
    </div>`
      )
    } else if (item.search('Qq') >= 0) {
      $('body').append(
        `	<div id="ID_` +
          item +
          `" class="classAir_H2">
          <div  id="` +
          item +
          `" class="labelAir_H2">

        <div  class="temAir_H2">氢气H2</div>
  <div  class="humAir_H2">` +
          modbusAir[item] +
          `%</div>
          </div>
    </div>`
      )
    } else if (item.search('Jw') >= 0) {
      $('body').append(
        `	<div id="ID_` +
          item +
          `" class="classAir_CH4">
          <div  id="` +
          item +
          `" class="labelAir_CH4">

        <div  class="temAir_CH4">` +
          ChineseName_air[item] +
          `</div>
  <div  class="humAir_CH4">` +
          modbusAir[item] +
          `%</div>
          </div>
    </div>`
      )
    } else if (item.search('Yiq') >= 0) {
      $('body').append(
        `	<div id="ID_` +
          item +
          `" class="classAir_C2H2">
          <div  id="` +
          item +
          `" class="labelAir_C2H2">

        <div  class="temAir_C2H2">` +
          ChineseName_air[item] +
          `</div>
  <div  class="humAir_C2H2">` +
          modbusAir[item] +
          `%</div>
          </div>
    </div>`
      )
    }

    var ThreeAir = document.getElementById('ID_' + item)
    var ThreeAirlabel = new CSS3DSprite(ThreeAir)

    ThreeAirlabel.name = item + 'n'
    ThreeAirLgroup.add(ThreeAirlabel)
  }
}
/**三层房间空气成分标签添加到场景中 */
scene.add(ThreeAirLgroup)

/**二层数据 */
function addTwoFloorlabel(meshname) {
  var outf = scene.getObjectByName(meshname)
  for (var i = 0; i < TwoModbusBmsLabel.children.length; i++) {
    TwoModbusBmsLabel.children[i].position.copy(
      outf.children[i].getWorldPosition()
    )
    TwoModbusBmsLabel.children[i].element.style.visibility = 'visible'
    TwoModbusBmsLabel.children[i].scale.set(0.4, 0.4, 0.4)
  }
}
/**三层VAV */
function addThreeFloorlabel(meshname) {
  var ThreeVAVLabelgroup = new THREE.Group()
  for (var item in ChineseName) {
    if (item.search('ModbusVav') == 0) {
      $('body').append(
        `	<div id="ID_` +
          item +
          `" class="classVAV">
        <div  id="` +
          item +
          `" class="labelVAV">
        
        </div>
  </div>`
      )
      $.each(ChineseName[item], function (i, me) {
        if (i.search('Fy') >= 0) {
          $('#' + item).append(
            `<div  class="temVAV">` +
              me +
              `</div>
  <div  class="humVAV">` +
              modbusVav[item][i] +
              `Pa</div>`
          )
        }
      })

      var ThreeVAV = document.getElementById('ID_' + item)
      var ThreeVAVlabel = new CSS3DSprite(ThreeVAV)

      ThreeVAVlabel.name = item + 'n'
      ThreeVAVLabelgroup.add(ThreeVAVlabel)
    }
  }
  /**三层房间负压标签添加到场景中 */
  scene.add(ThreeVAVLabelgroup)

  for (var i = 0; i < ThreeVAVLabelgroup.children.length; i++) {
    var labelname = ThreeVAVLabelgroup.children[i].name
    console.log('labelname: ', labelname)
    scene.getObjectByName('ModbusVav3f10')
    console.log(
      'scene.getObjectByName ',
      scene.getObjectByName('ModbusVav3f10')
    )
    ThreeVAVLabelgroup.children[i].position.copy(
      scene
        .getObjectByName(labelname.substr(0, labelname.length - 1))
        .getWorldPosition()
    )

    ThreeVAVLabelgroup.children[i].element.style.visibility = 'visible'
    ThreeVAVLabelgroup.children[i].position.y -= 25

    ThreeVAVLabelgroup.children[i].scale.set(0.35, 0.35, 0.35)
  }
}
/**三层空气成分添加 */
function addThreeFloorAirlabel(meshname) {
  for (var i = 0; i < ThreeAirLgroup.children.length; i++) {
    var labelname = ThreeAirLgroup.children[i].name

    ThreeAirLgroup.children[i].position.copy(
      scene
        .getObjectByName(labelname.substr(0, labelname.length - 1))
        .getWorldPosition()
    )

    ThreeAirLgroup.children[i].element.style.visibility = 'visible'
    ThreeAirLgroup.children[i].position.y -= 25

    ThreeAirLgroup.children[i].scale.set(0.35, 0.35, 0.35)
  }
}
/**隐藏三层空气成分标签 */
function HiddenThreeFloorAirlabel(meshname) {
  for (var i = 0; i < ThreeAirLgroup.children.length; i++) {
    ThreeAirLgroup.children[i].element.style.visibility = 'hidden'
  }
}
function ThreeModbusBms3fLabel(meshname) {
  var outf = scene.getObjectByName(meshname)
  console.log(outf)
  for (var i = 0; i < ThreeModbusBms3fLgroup.children.length; i++) {
    ThreeModbusBms3fLgroup.children[i].position.copy(
      outf.children[i].getWorldPosition()
    )
    ThreeModbusBms3fLgroup.children[i].element.style.visibility = 'visible'
    ThreeModbusBms3fLgroup.children[i].scale.set(0.4, 0.4, 0.4)
  }
}
var firecode
function fireStatus() {
  $.ajax({
    type: 'get',
    url: 'http://221.6.30.202:15007/prod-api/fire/api/getFireStatus',
    data: firecode,
    dataType: 'json',
    async: false, //默认为true 异步
    success: function (data) {
      firecode = data.data.fireStatus
    },
  })

  if (firecode == 1) {
    addtexture('Warning', 0.0005)
  } else if ((firecode = 0)) {
    addtexture('Warning', 0)
  }

  setTimeout(function () {
    fireStatus()
  }, 1200000)
}

export {
  TwoModbusBmsLabel,
  ThreeVAVLabelgroup,
  ThreeModbusBms3fLgroup,
  addTwoFloorlabel,
  ThreeModbusBms3fLabel,
  addThreeFloorlabel,
  addlabel2F,
  hiddenlabel2F,
  addThreeFloorAirlabel,
  HiddenThreeFloorAirlabel,
  fireStatus,
  addlabel2FFy,
}
