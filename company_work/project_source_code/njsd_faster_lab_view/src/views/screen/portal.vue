<template>
  <div id="data-view">
    <!-- <dv-full-screen-container> -->
      <top-header ref="topHeader"/>

      <div class="main-content">
        <div class="block-left-right-content">
          <div v-show="showDataView" id="main-left-right">
            <overview/>
            <ranking-board />
            <temp-monitor />
          </div>
          <div class="switch_div" :style="{'right': noFullSwitch}">
            <el-switch
              @change="switchFloor"
              v-model="modelType"
              active-text="透明版"
              inactive-text="实景版"
              active-value="1"
              inactive-value="2"
              active-color="#1890ff"
              inactive-color="rgb(22,182,17)">
            </el-switch>
          </div>
          <div id="main-center">
            <iframe v-if="show3DModel" ref="iframe3d" id="iframe-3d" :src="modelUrl" class="iframe-3d"></iframe>
          </div>
          <div v-show="showDataView" id="main-left-left">
            <water-level />
            <capsule-chart />
            <right-bottom />
            <!-- <line-chart/>
            <line-chart2/> -->
          </div>
        </div>
      </div>
    <!-- </dv-full-screen-container> -->
  </div>
</template>

<script>
  import topHeader from '@/views/datav/topHeader'
  import overview from '@/views/datav/overview'
  import rankingBoard from '@/views/datav/rankingBoard'
  import tempMonitor from '@/views/datav/tempMonitor'
  import waterLevel from '@/views/datav/waterLevel'
  import capsuleChart from '@/views/datav/capsuleChart'
  import rightBottom from '@/views/datav/rightBottom'

  export default {
    name: 'Portal',
    components: {
      topHeader,
      overview,
      rankingBoard,
      tempMonitor,
      waterLevel,
      capsuleChart,
      rightBottom,
    },
    data() {
      return {
        modelType: '1',
        noFullSwitch: '390px',
        showDataView: true,
        show3DModel: true,
        modelUrl: '/3dModel/tz_faster_lab/3D-map-ocpity.html',
      }
    },
    methods: {
      switchFloor() {
        if (this.modelType === '1') {
          this.modelUrl = '/3dModel/tz_faster_lab/3D-map-ocpity.html';
        } else if(this.modelType === '2') {
          this.modelUrl = '/3dModel/JiGuangLou_3D/JiGuangLou-3D.html';
        }
        this.showDataView = false;
        const that = this;
        setTimeout(function (){
          that.controlBarFun();
        },3000)
        this.$refs.topHeader.changeShowFull();
      },
      fullScreen3d() {
        this.controlBarFun();
        this.showDataView = !this.showDataView;
      },
      controlBarFun() {
        const iframe3d = this.$refs.iframe3d;
        let controlBar = iframe3d.contentDocument.body.getElementsByClassName('controllabelclass')[0]
        if (controlBar != null) {
          let width = controlBar.offsetLeft === 350 ? 80 : 350;
          this.$refs.iframe3d.contentWindow.postMessage({
            cmd: 'controlBarWidth',
            params: {offsetLeft: width}
          }, '*')
        }
      }
    }
  }
</script>

<style lang="less">
  #data-view {
    width: 100%;
    height: 100%;
    background-color: #030409;
    color: #fff;
    overflow-y: auto;
    background-image: url('../../assets/images/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
    position: absolute;

    #dv-full-screen-container {
      background-image: url('../../assets/images/bg.png');
      background-size: 100% 100%;
      box-shadow: 0 0 3px blue;
      display: flex;
      flex-direction: column;
      position: absolute;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;

      #main-left-right {
        position: absolute;
        min-width: 340px;
        height: 100%;
        z-index: 9999;
      }

      #main-left-left {
        min-width: 340px;
        height: 100%;
        z-index: 9999;
        position: absolute;
        right: 0;
      }

      #main-center {
        width: 100%;
        height: 1080px;
      }

      .iframe-3d {
        border:0px;
        padding:0px;
        margin:0px;
        height: 100%;
        width: 100%;
      }
    }

    .block-left-right-content {
      flex: 1;
      display: flex;
      margin-top: 20px;
    }

    .block-top-bottom-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-left: 20px;
    }

    .block-top-content {
      height: 55%;
      display: flex;
      flex-grow: 0;
      box-sizing: border-box;
      padding-bottom: 20px;
    }
    .switch_div {
      position: absolute;
      margin-top: 20px;
      .el-switch__label.is-active {
        color: rgb(140,240,220);
      }
      .el-switch__label * {
        line-height: 1;
        font-size: 17px;
        display: inline-block;
        font-weight: 700;
      }
      .el-switch__label {
        -webkit-transition: 0.2s;
        transition: 0.2s;
        height: 20px;
        display: inline-block;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        vertical-align: middle;
        color: #5f6062;
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .25s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
      opacity: 0
    }
  }
</style>
