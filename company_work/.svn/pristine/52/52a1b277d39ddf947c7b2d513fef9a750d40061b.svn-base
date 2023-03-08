<template>
  <div class="rootDiv">
    <!-- header -->
    <div class="header">
      <div class="headerLeft">
        <div @click="goBackstage" style="cursor: pointer;">
          <span>后</span>
          <span style="margin-left: 20px;">台</span>
        </div>
        <div @click="goBigScreen" style="cursor: pointer;">
          <span>大</span>
          <span style="margin-left: 20px;">屏</span>
        </div>
      </div>
      <div class="headerRight">
        <!-- <div>3楼设备</div>
        <div>4楼设备</div>
        <div>
          <span>其</span>
          <span style="margin-left: 20px;">他</span>
        </div> -->
      </div>
    </div>

    <!-- 服务器视图 -->
    <div class="tabPage">
      <!--左边-->
      <energy-left/>
      <!--中间-->
      <energy-center/>
      <!--右边-->
      <energy-right/>
    </div>
  </div>
</template>

<script>
  import energyLeft from '@/views/screen/energy/components/energyLeft'
  import energyCenter from '@/views/screen/energy/components/energyCenter'
  import energyRight from '@/views/screen/energy/components/energyRight'

  export default {
    name: 'EnergyPortal',
    components: {
      energyLeft,
      energyCenter,
      energyRight
    },
    data() {
      return {

      }
    },
    methods: {
      goBackstage() {
        const that = this;
        this.$modal.confirm('是否前往后台页面？').then(function() {
          let routeUrl = that.$router.resolve({
            path: "/index"
          });
          window.open(routeUrl.href, '_blank');
        })
      },
      goBigScreen() {
        const that = this;
        this.$modal.confirm('是否前往大屏页面？').then(function() {
          let routeUrl = that.$router.resolve({
            path: "/portal"
          });
          window.open(routeUrl.href, '_blank');
        })
      }
    }
  }

</script>

<style lang="less">
  body {
    background-color: #010b32;
  }
  .rootDiv {
    font-size: 14px;
    margin: 0 auto;
    padding: 0;
    background-repeat: no-repeat;
    background-position: 0 0 / cover;
    background-color: #010b32;
    Font-size: 62.5%;
    width: 1920px;
    height: 1080px;

    .header {
      background: url(../../../assets/portal/img_headerbg.png) no-repeat top;
      width: 100%;
      height: 110px;
      margin-bottom: 15px;
    }

    .headerLeft {
      float: left;
      width: 35%;
    }

    .headerLeft div {
      width: 45%;
      margin-top: 50px;
      float: left;
      color: #00a0e9;
      background: url(../../../assets/portal/menubg.png) center no-repeat;
      height: 55px;
      text-align: center;
      line-height: 65px;
      font-size: 18px;
    }

    .headerRight {
      float: right;
      width: 35%;
    }

    .headerRight div {
      width: 33.3%;
      margin-top: 50px;
      float: left;
      color: #00a0e9;
      background: url(../../../assets/portal/menubg.png) center no-repeat;
      height: 55px;
      text-align: center;
      line-height: 65px;
      font-size: 18px;
    }

    .tabPage {
      background-color: #010b32;
      height: 100%;
    }
  }
</style>
