<template>
  <div id="capsule-chart">
    <div class="capsule-chart-title">
      <div>设备分类</div>
    </div>
    <div class="lc1-details">设备运行总数<span>{{total}}</span></div>
    <dv-capsule-chart :config="config" style="width:300px;height:200px;margin-left: 20px;margin-top: 10px;" />
  </div>
</template>

<script>
  import { selectCapsuleChart } from "@/api/modbus/screen";

  export default {
    data() {
      return {
        total: 0,
        config: {
          data: [],
          colors: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
          unit: '个',
          showValue: true
        }
      };
    },
    mounted() {
      this.selectCapsuleChart();
    },
    methods: {
      selectCapsuleChart() {
        selectCapsuleChart().then(response => {
          this.config.data.push({name: '新风空调', value: response.data.airConditioner});
          this.config.data.push({name: '螺杆机', value: response.data.screwMachine});
          this.config.data.push({name: '冷却塔', value: response.data.coolTower});
          this.config.data.push({name: '工艺水外机', value: response.data.craftOuter});
          this.config.data.push({name: '工艺水内机', value: response.data.craftInner});
          this.config = { ...this.config }
          this.total = response.data.airConditioner + response.data.screwMachine + response.data.coolTower + response.data.craftOuter + response.data.craftInner;
        })
      }
    }
  }
</script>

<style lang="less">
  #capsule-chart {
    width: 100%;
    height: 317px;
    display: flex;
    flex-direction: column;
    background-color: rgba(5, 25, 55, 0.5);
    border-top: 2px solid rgba(1, 153, 209, .5);
    box-sizing: border-box;

    .capsule-chart-title {
      height: 35px;
      font-weight: bold;
      text-indent: 20px;
      font-size: 17px;
      display: flex;
      align-items: center;
      border-bottom: 2px solid rgba(1, 153, 209, .5);
    }

    .lc1-details {
      border: 2px solid transparent;
      border-radius: 5px;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-image: linear-gradient(to right, rgb(3,62,88), rgb(12,46,70)), linear-gradient(90deg, #119fdd, #ffffff);
      height: 40px;
      width: 200px;
      font-size: 16px;
      display: flex;
      align-items: center;
      text-indent: 20px;
      margin: 16px 0 5px 65px;

      span {
        color: #096dd9;
        font-weight: bold;
        font-size: 25px;
      }
    }
  }
</style>
