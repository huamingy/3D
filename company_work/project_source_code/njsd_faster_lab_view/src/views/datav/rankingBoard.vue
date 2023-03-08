<template>
  <div id="ranking-board">
    <div class="ranking-board-title">
      <div>今日数据</div>
      <div class="title-click">
        <div id="title-click-1" style="cursor: pointer;color: rgb(39,152,160);" class="click-active" @click="clickTransfer(1)">温度</div>
        <div class="title-click-div"/>
        <div id="title-click-2" style="margin-left: -16px;color: rgb(39,152,160);cursor: pointer;" @click="clickTransfer(2)">湿度</div>
        <!-- <div class="title-click-div"/>
        <div style="margin-left: -16px;color: rgb(39,152,160);cursor: pointer; margin-right: 10px;">用碳排放量</div> -->
      </div>
    </div>

    <div class="ranking-label">
      <div class="ranking-label-box">
        <div class="label-name">
          <span>平均温度</span>
        </div>
        <div class="label-value">
          <span class="lable-vv">{{chartData.tempInnerVo.averageTemperature}}</span>
          <span> ℃</span>
        </div>
      </div>
      <div class="ranking-label-box">
        <div class="label-name">
          <span>平均湿度</span>
        </div>
        <div class="label-value">
          <span class="lable-vv">{{chartData.tempInnerVo.averageHumidity}}</span>
          <span> %</span>
        </div>
      </div>
    </div>

    <dv-charts class="chart-view" :option="option" />
  </div>
</template>

<script>
  import $ from 'jquery'
  import { selectTodayData } from "@/api/modbus/screen";

  export default {
    data() {
      return {
        chartData: {
          tempInnerVo: {

          }
        },
        option: {
          legend: {
            data: [{
                name: '用电量',
                color: '#00baff'
              },
            ],
            textStyle: {
              fill: 'f7f7f7'
            }
          },
          xAxis: {
            name: "时间(小时)",
            nameTextStyle: {
              fill: '#fff',
              fontSize: 13
            },
            nameGap: 25,
            nameLocation: 'center',
            data: [],
            axisLine: {
              style: {
                stroke: '#f7f7f7'
              }
            },
            axisLabel: {
              style: {
                fill: '#f7f7f7'
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
            name: "温度(℃)",
            nameTextStyle: {
              fill: '#fff',
              fontSize: 12
            },
            nameGap: 8,
            data: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              style: {
                stroke: '#f7f7f7'
              }
            },
            axisLabel: {
              style: {
                fill: '#f7f7f7'
              }
            },
            axisTick: {
              show: false
            },
            min: 0,
          },
          series: []
        }
      };
    },
    mounted() {
      this.selectTodayData();
    },
    methods: {
      selectTodayData() {
        selectTodayData().then(response => {
          this.chartData = response.data;
          this.option.xAxis.data = this.chartData.axis;
          this.option.series.push({
            name: '今日温度',
            data: this.chartData.seriesData.tempSeries,
            type: 'bar',
            barStyle: {
              fill: 'rgba(3, 241, 163, 0.8)'
            },
          });
          this.option.yAxis.min = 0;
          this.option = { ...this.option }
        })
      },
      clickTransfer(e) {
        this.option.series = [];
        var $click = $("#title-click-" + e);
        if (!$click.hasClass('click-active')) {
          $click.addClass('click-active');
          $("#title-click-" + (e === 1 ? 2 : 1)).removeClass('click-active');
        }
        if(e === 1) {
          this.option.series.push({
            name: '今日温度',
            data: this.chartData.seriesData.tempSeries,
            type: 'bar',
            barStyle: {
              fill: 'rgba(3, 241, 163, 0.8)'
            },
          });
          this.option.yAxis.name = '温度(℃)';
        } else {
          this.option.series.push({
            name: '今日湿度',
            data: this.chartData.seriesData.humiditySeries,
            type: 'bar',
            barStyle: {
              fill: 'rgba(3, 241, 163, 0.8)'
            },
          });
          this.option.yAxis.name = '湿度(%)';
        }
        this.option.yAxis.min = 0;
        this.option = { ...this.option }
      }
    }
  }
</script>

<style lang="less">
  #ranking-board {
    width: 100%;
    height: 317px;
    display: flex;
    flex-direction: column;
    background-color: rgba(5, 25, 55, 0.5);
    border-top: 2px solid rgba(1, 153, 209, .5);
    box-sizing: border-box;
    /* background-image: linear-gradient(to right, rgba(6, 30, 93, 0.8), rgba(6, 30, 93, 0.1));
  border-right: none; */

    .ranking-board-title {
      height: 35px;
      font-weight: bold;
      text-indent: 20px;
      font-size: 17px;
      display: flex;
      align-items: center;
      border-bottom: 2px solid rgba(1, 153, 209, .5);

      .title-click {
        font-size: 10px;
        margin-left: 165px;
        font-weight: 100;

        .title-click-div {
          width: 2px;
          height: 15px;
          background-image: linear-gradient(rgb(9, 66, 96), rgb(0,255,161), rgb(9, 66, 96));
          margin-left: 4px;
        }
      }

      .title-click>div {
        float: left;
      }
    }

    .ranking-label {
      width: 100%;
      height: 70px;
      text-align: center;
      font-size: 13px;

      .ranking-label-box {
        width: 43%;
        height: 60px;
        float: left;
        margin: 10px;
        background-image: linear-gradient(to right, rgba(9, 66, 96, 0.8), rgba(6, 46, 86, 0.8));
      }

      .label-name {
        padding-top: 9px;
      }

      .label-value {
        padding-top: 7px;

        .lable-vv {
          font-weight: 700;
        }
      }
    }

    .dv-scroll-ranking-board {
      flex: 1;
    }

    .chart-view {
      width: 100%;
      height: 240px;
      margin-top: -30px;
      margin-left: 13px;
      margin-right: -72px;
    }
  }

  .click-active {
    color: rgb(0,255,161) !important;
  }
</style>
