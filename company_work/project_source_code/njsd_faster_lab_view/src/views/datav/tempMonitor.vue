<template>
  <div id="temp-monitor">
    <div class="monitor-title">温度监控</div>

    <dv-charts :option="option" style="width: 250px;margin-left: -30px; margin-top: -30px;"/>

    <div class="temp-label">
      <div class="temp-label-box" style="border-left: 3px solid rgb(120,225,240);">
        <div style="margin-top: 18px;">当前温度</div>
        <div style="font-weight: 700;    margin-top: 4px;">{{chartData.tempInnerVo.averageTemperature}} ℃</div>
      </div>
      <div class="temp-label-box" style="border-left: 3px solid rgb(118,148,207);">
        <div style="margin-top: 18px;">最高温度</div>
        <div style="font-weight: 700;    margin-top: 4px;">{{chartData.maxTemp}} ℃</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { selectTempData } from "@/api/modbus/screen";

  export default {
    name: 'TempMonitor',
    data() {
      return {
        chartData: {
          tempInnerVo: {

          }
        },
        option: {
          title: {
            text: '当前温度监控',
            offset: [0, 5],
            style: {
              fill: '#fff',
            }
          },
          series: []
        }
      }
    },
    mounted() {
      this.selectTempData();
    },
    methods: {
      selectTempData() {
        selectTempData().then(response => {
          this.chartData = response.data;
          let average = Number.parseInt(this.chartData.tempInnerVo.averageTemperature);
          let max = Number.parseInt(this.chartData.maxTemp);
          this.option.series.push({
              type: 'gauge',
              min: 0,
              max: max,
              data: [{
                name: 'itemA',
                value: average,
                gradient: ['#0ecdf3', '#e6df00', '#fb825c', '#fb0000'],
              }],
              axisLabel: {
                formatter: '{value} ℃',
                style: {
                  fill: '#fff'
                }
              },
              details: {
                show: true,
                offset: [0, 20],
                formatter: '当前{value} ℃',
                style: {
                  fontSize: '13'

                }
              },
              animationCurve: 'easeOutBack'
            });
          this.option = { ...this.option };
        })
      }
    }
  }
</script>

<style lang="less">
  #temp-monitor {
    width: 100%;
    height: 378px;
    display: flex;
    flex-direction: column;
    background-color: rgba(5, 25, 55, 0.5);
    border-top: 2px solid rgba(1, 153, 209, .5);
    box-sizing: border-box;

    .monitor-title {
      height: 35px;
      font-weight: bold;
      text-indent: 20px;
      font-size: 17px;
      display: flex;
      align-items: center;
      border-bottom: 2px solid rgba(1, 153, 209, .5);
    }

    .temp-label {
      width: 120px;
      height: 170px;
      position: absolute;
      right: 0;
      margin-top: 65px;

      .temp-label-box {
        margin-top: 24px;
        width: 100%;
        height: 50px;
        text-align: left;
      }
      .temp-label-box>div {
        margin-top: 12px;
        margin-left: 10px;
      }
     }
  }
</style>
