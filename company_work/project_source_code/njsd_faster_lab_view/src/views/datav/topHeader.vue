<template>
  <div id="top-header">
    <dv-decoration-8 class="header-left-decoration" />
    <dv-decoration-5 class="header-center-decoration" />
    <dv-decoration-8 class="header-right-decoration" :reverse="true" />
    <div class="center-title">超快楼数据可视化服务中心</div>
    <img style="right: 144px;" @click="quitBigScreen" src="../../assets/images/home.png" width="32" height="32" class="quitBtn" title="退出">
    <img style="right: 96px; margin-top: 17px;" @click="schematicBtn" src="../../assets/images/schematic.png" width="30" height="30" class="quitBtn" title="原理图">
    <img style="right: 48px; margin-top: 17px;" @click="humitureBtn" src="../../assets/images/humiture.png" width="30" height="30" class="quitBtn" title="温湿度详情">
    <!--    <img style="right: 48px; margin-top: 17px;" @click="showDeviceList" src="../../assets/images/device_list.png" width="30" height="30" class="quitBtn" title="设备列表">-->
    <img v-if="showFull" @click="fullScreen3dChild" src="../../assets/images/full_screen.png" width="32" height="32" class="quitBtn" title="全屏">
    <img v-if="!showFull" @click="fullScreen3dChild" src="../../assets/images/no_full_screen.png" width="32" height="32" class="quitBtn" title="退出全屏">
  </div>
</template>

<script>
export default {
  name: 'TopHeader',
  data() {
    return {
      showFull: true
    }
  },
  created() {

  },
  methods: {
    quitBigScreen() {
      const that = this;
      this.$modal.confirm('是否确认返回主页？').then(function() {
        let routeUrl = that.$router.resolve({
          path: "/index"
        });
        window.open(routeUrl.href, '_blank');
      })
    },
    schematicBtn() {
      this.$modal.confirm('是否确认返回前往原理图页面？').then(function() {
        window.open("http://221.6.30.202:15010/3d_model/fbx/Princip.html", '_blank');
      })
    },
    humitureBtn() {
      this.$modal.confirm('是否确认返回前往温湿度详情页面？').then(function() {
        window.open("http://221.6.30.202:15010/tz_faster_lab/Internal_LayoutofCKL.html", '_blank');
      })
    },
    fullScreen3dChild() {
      this.showFull = !this.showFull;
      this.$parent.fullScreen3d();
    },
    changeShowFull() {
      this.showFull = false;
    }
  }
}
</script>

<style lang="less">
#top-header {
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;

  .header-center-decoration {
    width: 40%;
    height: 30px;
    margin-top: 30px;
  }

  .header-left-decoration, .header-right-decoration {
    width: 25%;
    height: 30px;
  }

  .center-title {
    position: absolute;
    font-size: 20px;
    font-weight: bold;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
  }

  .quitBtn {
    margin-top: 15px;
    margin-right: 20px;
    cursor: pointer;
    position: absolute;
    right: 0;
    transition: all 0.3s;
  }
  .quitBtn:hover {
    transform: scale(1.30);
  }
}
</style>
