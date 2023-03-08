<template>
  <div id="water-level">
    <div class="water-title">综合态势</div>

    <div class="chart-container">
      <div class="water-parent">
        <dv-water-level-pond :config="config1" style="margin-left: -6px;"/>
        <div class="water-lable" style="margin-left: 5px;">
          <span>设备综合评分</span>
        </div>
      </div>
      <div class="water-parent">
        <dv-water-level-pond :config="config2" style="margin-left: 8px;"/>
        <div class="water-lable" style="margin-left: 20px;">
          <span>安全管理评分</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'waterLevel',
    data() {
      return {
        config1: {
          data: [93],
          shape: 'round',
          waveHeight: 15,
          waveNum: 3,
          colors: ['#00BAFF', '#3DE7C9'],
          formatter: '{value}分'
        },
        config2: {
          data: [88],
          shape: 'round',
          waveHeight: 15,
          waveNum: 3,
          colors: ['#00BAFF', '#3DE7C9'],
          formatter: '{value}分'
        }
      }
    },
    methods: {

    }
  }
</script>

<style lang="less">
  #water-level {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    background-color: rgba(5, 25, 55, 0.5);
    border-top: 2px solid rgba(1, 153, 209, .5);
    box-sizing: border-box;

    .water-title {
      height: 35px;
      font-weight: bold;
      text-indent: 20px;
      font-size: 17px;
      display: flex;
      align-items: center;
      border-bottom: 2px solid rgba(1, 153, 209, .5);
    }
    .chart-container {
      flex: 1;
      display: flex;
      justify-content: center;
      /* align-items: center; */
      margin-top: 20px;

      .water-parent  {
        width: 150px;
        height: 150px;

        .water-lable {
          border: 2px solid transparent;
          border-radius: 5px;
          background-clip: padding-box, border-box;
          background-origin: padding-box, border-box;
          background-image: linear-gradient(to right, rgb(6,22,47), rgb(6,22,47)), linear-gradient(90deg, #8F41E9, #578AEF);
          width: 130px;
          height: 35px;
          margin-top: 10px;
          text-align: center;
        }

        .water-lable>span {
          line-height: 30px;
        }
      }
    }
    .dv-water-pond-level {
      width: 100%;
      height: 100%;
      border: 10px solid #19c3eb;
      border-radius: 50%;

      ellipse {
        stroke: transparent !important;
      }

      text {
        font-size: 40px;
      }
    }

  }
</style>
