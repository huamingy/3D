<template>
  <div class="xtright">
    <div class="tabPage">
      <div class="xjcputitle">
        <div class="title"><span class="titlexh">设备使用能耗Top</span></div>
      </div>
      <div class="zyyl four">
        <div class="wzjq">门禁系统</div>
        <div class="zypm margin90">4</div>
      </div>
      <div class="zyyl two">
        <div class="oabg">安防系统</div>
        <div class="zypm margin90">2</div>
      </div>
      <div class="zyyl one">
        <div class="mhxt">空调系统
          <div class="zypm margin90">1</div>
        </div>
      </div>
      <div class="zyyl two">
        <div class="oabg">冷热源系统</div>
        <div class="zypm margin90">3</div>
      </div>
      <div class="zyyl four">
        <div class="wzjq">其他</div>
        <div class="zypm margin90">5</div>
      </div>
      <div class="xjcputitle" style="clear:both; ">
        <div class="title"><span class="titlexh">房间温度平均值</span></div>
      </div>
      <div class="xjtb">
        <dv-capsule-chart :config="config" style="width:90%;height:280px;margin-left: 30px;margin-top: 10px;" />
      </div>
      <div class="xjcputitle">
        <div class="title"><span class="titlexh">实时能耗趋势</span></div>
      </div>
      <div id="myChart" ref="myChart" :style="{width: '600px', height: '300px'}"></div>

    </div>
  </div>


</template>

<script>
  import echarts from 'echarts'
  import '@/views/datav/plugins/jquery.nicescroll.min.js'
  require('echarts/theme/macarons') // echarts theme
  import resize from '@/views/dashboard/mixins/resize'
  import { selectEnergyRightData } from "@/api/modbus/energy";

  export default {
    mixins: [resize],
    name: 'EnergyLeft',
    data() {
      return {
        config: {
          data: [],
          colors: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#EC6C77', '#F3D365', '#A6F892', '#FE8D3F'],
          unit: '℃',
          showValue: true
        },
        energyCenterVo: {
          capsuleData: {},
          realTimeChartData: {},
        },
        chart: null,
      }
    },
    mounted() {
      this.initEnergyData();
    },
    methods: {
      initEnergyData() {
        selectEnergyRightData().then(response => {
          this.energyCenterVo = response.data;
          this.initCapsuleChart();
          this.initChart();
        })
      },
      initCapsuleChart() {
        this.config.data.push({name: 'temp1', value: this.energyCenterVo.capsuleData.temp1});
        this.config.data.push({name: 'temp2', value: this.energyCenterVo.capsuleData.temp2});
        this.config.data.push({name: 'temp3', value: this.energyCenterVo.capsuleData.temp3});
        this.config.data.push({name: 'temp4', value: this.energyCenterVo.capsuleData.temp4});
        this.config.data.push({name: 'temp5', value: this.energyCenterVo.capsuleData.temp5});
        this.config.data.push({name: 'temp6', value: this.energyCenterVo.capsuleData.temp6});
        this.config.data.push({name: 'temp7', value: this.energyCenterVo.capsuleData.temp7});
        this.config.data.push({name: 'temp8', value: this.energyCenterVo.capsuleData.temp8});
        this.config = { ...this.config }
      },
      initChart() {
        this.chart = echarts.init(document.getElementById('myChart'))
        this.setOption();
      },
      setOption() {
        this.chart.setOption({
          title: {},
          tooltip: {
            trigger: 'axis'
          },
          color: ['#00FFFF', '#F7FE2E'],
          textStyle: {
            color: '#FFFFFF'
          },
          legend: {
            textStyle: {
              color: 'white'
            },
          },
          toolbox: {
            show: false,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.energyCenterVo.realTimeChartData.timeline,
            textStyle: {
              color: '#FFFFFF'
            },
            splitLine: {
              show: false
            }
          },
          yAxis: [
            {
              name: '冷却塔',
              type: 'value',
              axisLabel: {
                formatter: '{value} '
              },
              textStyle: {
                color: '#FFFFFF'
              },
              splitLine: {
                show: false
              }
            },
            {
              name: '工艺水外机',
              type: 'value',
              axisLabel: {
                formatter: '{value} '
              },
              textStyle: {
                color: '#FFFFFF'
              },
              min: 18,
              max: 30,
              splitLine: {
                show: false
              }
            },
          ],
          series: [{
              name: '冷却塔',
              type: 'line',
              symbol: 'none',
              data: this.energyCenterVo.realTimeChartData.coolTowerList,
              smooth: true,
              lineStyle: {
                color: '#00FFFF'
              },
              yAxisIndex: 0
            },
            {
              name: '工艺水外机',
              type: 'line',
              symbol: 'none',
              data: this.energyCenterVo.realTimeChartData.craftOuterList,
              smooth: true,
              lineStyle: {
                color: '#F7FE2E',
              },
              yAxisIndex: 1
            },
          ]
        })
      }
    }
  }
</script>

<style lang="less">
  .xtright {
    width: 33.3%;
    float: right;
    height: 1080px;
    box-sizing: border-box;
    border: 2px solid red;
    border-image: url(../../../../assets/portal/border.png) 51 38 21 38;
    border-width: 2.125rem 1.583rem 0.875rem 1.583rem;
    position: relative;
    margin-bottom: 0.833rem;
    background-color: #010b32;

    .tabPage {
      height: 100%;
    }

    .xjcputitle {
      background: url(../../../../assets/portal/img_titleL.png) no-repeat left;
      color: #fff;
      margin-bottom: 15px;
      margin-top: 15px;
    }

    .title {
      background: url(../../../../assets/portal/img_titleR.png) no-repeat right;
      width: 100%;
      text-align: center;
      color: #2fd5ff;
      font-size: 21px;
      line-height: 45px;
    }

    .titlexh {
      display: inline-block;
      border-bottom: 2px #23d7fb solid
    }

    .zyyl {
      width: 20%;
      text-align: center;
      height: 240px;
      float: left;
      margin-bottom: 20px;
    }

    .four {
      background: url(../../../../assets/portal/img_four.png) no-repeat center bottom;
    }

    .wzjq {
      color: #11caf9;
      margin-top: 50px;
      font-size: 18px;
      font-weight: bold;
    }

    .zypm {
      color: #11caf9;
      font-size: 28px;
      font-weight: bold;
    }

    .margin90 {
      margin-top: 90px;
    }

    .one {
      background: url(../../../../assets/portal/img_one.png) no-repeat center bottom;
    }

    .two {
      background: url(../../../../assets/portal/img_two.png) no-repeat center bottom;
    }

    .oabg {
      color: #11caf9;
      margin-top: 30px;
      font-size: 18px;
      font-weight: bold;
    }

    .mhxt {
      color: #11caf9;
      margin-top: 10px;
      font-size: 18px;
      font-weight: bold;
    }

    .xjtb {
      margin-bottom: 15px;
    }
  }
</style>
