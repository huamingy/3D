<template>
  <div class="serverLeft ">
    <div class="tabPage">
      <div class="xjcpu">
        <div class="xjcputitle">
          <div class="title"><span class="titlexh">设备温度排名TOP</span></div>
          <div id="chartTempRank" ref="chartTempRank" :style="{width: '550px', height: '450px'}"></div>
        </div>
        <div class="xjtb">
          <!-- <img src="../../../../../assets/portal/img_tj01.png" width="528" height="428" /> -->

        </div>
      </div>
      <div class="xjcputitle">
        <div class="title"><span class="titlexh">设备平均温度</span></div>
      </div>
      <div class="zysyl">
        <div id="myChart2" ref="myChart2" :style="{width: '300px', height: '230px'}"></div>
        <!-- <div class="zysytitle">cpu使用率：{{cpu}}</div> -->
      </div>
      <div class="zysyl">
        <div id="myChart3" ref="myChart3" :style="{width: '300px', height: '230px'}"></div>
        <!-- <div class="zysytitle">内存使用率：{{memory}}</div> -->
      </div>
      <div class="zysyl">
        <div id="myChart4" ref="myChart4" :style="{width: '300px', height: '230px'}"></div>
        <!-- <div class="zysytitle">存储使用率：{{usage}}</div> -->
      </div>
      <!-- <div class="zysyl">

        <div class="zysytitle">高负载资源比例</div>
      </div> -->
      <div class="zysyl">
        <div id="myChart5" ref="myChart5" :style="{width: '300px', height: '230px'}"></div>
        <!-- <div class="zysytitle">空闲资源比例：{{idle}}</br>高占比资源比例：{{highLoad}}</div> -->
      </div>
    </div>
    <!--左边-->
  </div>

</template>

<script>
  import $ from 'jquery'
  import echarts from 'echarts'
  import '@/views/datav/plugins/jquery.nicescroll.min.js'
  require('echarts/theme/macarons') // echarts theme
  import resize from '@/views/dashboard/mixins/resize'
  import { selectEnergyLeftData } from "@/api/modbus/energy";

  export default {
    mixins: [resize],
    name: 'EnergyLeft',
    data() {
      return {
        energyLeftVo: {},
        chartTempRank: null,
        chart2: null,
        chart3: null,
        chart4: null,
        chart5: null,
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initEnergyData();
      });
    },
    methods: {
      initEnergyData() {
        selectEnergyLeftData().then(response => {
          this.energyLeftVo = response.data;
          this.initChart();
        })
      },
      initChart() {
        this.chartTempRank = echarts.init(document.getElementById('chartTempRank'))
        this.chart2 = echarts.init(document.getElementById('myChart2'))
        this.chart3 = echarts.init(document.getElementById('myChart3'))
        this.chart4 = echarts.init(document.getElementById('myChart4'))
        this.chart5 = echarts.init(document.getElementById('myChart5'))
        this.setOptions1();
        this.setOptionOthers();
      },
      setOptionOthers() {
        this.initChart2();
        this.initChart3();
        this.initChart4();
        this.initChart5();
      },
      setOptions1() {
        var getmydmc = this.energyLeftVo.fieldNames;
        var getmyd = this.energyLeftVo.fieldValues;
        var getmydzd = [];
        let big = 0;
        getmyd.forEach((el) => {
          if (!(el === undefined || el === '')) {
            if (big < Number(el)) {
              big = Number(el);
            }
          }
        });
        for (let i = 0; i < getmyd.length; i++) {
          getmydzd.push(big * 4);
        }
        var max = Math.ceil(this.calMax([getmyd]) / 10) * 10;

        this.chartTempRank.setOption({
          backgroundColor: 'transparent',
          grid: {
            left: '5%',
            right: '10%',
            bottom: '10%',
            top: '0%',
            containLabel: true
          },
          tooltip: {
            formatter: (params) => {
              if (params.name !== '') {
                return params.name + ' : ' + getmyd[params.dataIndex] + ' ℃';
              }
            },
            textStyle: {
              align: 'left'
            }
          },
          xAxis: [{
              show: false,
              type: 'value',
              min: 0,
              max: max, // 计算最大值
              interval: max / 5, //  平均分为5份
              splitNumber: 5,
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#fff'
                }
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            },
            {
              type: 'value',
              axisLabel: {
                show: false
              },
              min: 0,
              max: max, // 计算最大值
              interval: max / 10, //  平均分为5份
              splitNumber: 10,
              splitLine: {
                show: false,
                lineStyle: {
                  type: 'dashed',
                  color: '#D8D8D8'
                }
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              }
            }
          ],
          yAxis: [{
            type: 'category',
            inverse: true,
            axisLabel: {
              formatter: (value, index) => {
                if (value.length >= 12) {
                  value = value.slice(0, 12) + `\n` + value.slice(12);
                }
                if (value.length >= 26) {
                  value = value.slice(0, 26) + `\n` + value.slice(26);
                }
                return value;
              },
              textStyle: {
                color: 'white',
                fontSize: '12',
                align: 'right',
                lineHeight: 10
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            data: getmydmc
          }],
          series: [{
              name: '值',
              type: 'bar',
              xAxisIndex: 0,
              itemStyle: {
                normal: {
                  color: function(params) {
                    //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    var colorList = [
                      new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                          offset: 0,
                          color: '#B89D9D'
                        },
                        {
                          offset: 1,
                          color: 'red'
                        }
                      ]),
                      new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                          offset: 0,
                          color: '#BDB973'
                        },
                        {
                          offset: 1,
                          color: 'yellow'
                        }
                      ]),
                      new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                          offset: 0,
                          color: '#9EABB3'
                        },
                        {
                          offset: 1,
                          color: '#2fd5ff'
                        }
                      ]),
                      new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                          offset: 0,
                          color: '#9EABB3'
                        },
                        {
                          offset: 1,
                          color: '#2fd5ff'
                        }
                      ]),
                      new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                          offset: 0,
                          color: '#9EABB3'
                        },
                        {
                          offset: 1,
                          color: '#2fd5ff'
                        }
                      ]),
                      new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                          offset: 0,
                          color: '#9EABB3'
                        },
                        {
                          offset: 1,
                          color: '#2fd5ff'
                        }
                      ]),
                      new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                          offset: 0,
                          color: '#9EABB3'
                        },
                        {
                          offset: 1,
                          color: '#2fd5ff'
                        }
                      ]),
                      new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                          offset: 0,
                          color: '#9EABB3'
                        },
                        {
                          offset: 1,
                          color: '#2fd5ff'
                        }
                      ]),
                      new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                          offset: 0,
                          color: '#9EABB3'
                        },
                        {
                          offset: 1,
                          color: '#2fd5ff'
                        }
                      ]),
                      new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                          offset: 0,
                          color: '#9EABB3'
                        },
                        {
                          offset: 1,
                          color: '#2fd5ff'
                        }
                      ])
                    ];

                    return colorList[params.dataIndex];
                  }
                }
              },
              barWidth: 15,
              data: getmyd,
              z: 0
            },
            {
              // 分隔
              type: 'pictorialBar',
              itemStyle: {
                normal: {
                  color: '#022539'
                }
              },
              symbolRepeat: 'fixed',
              symbolMargin: 4,
              symbol: 'rect',
              symbolClip: true,
              symbolSize: [2, 15],
              symbolPosition: 'start',
              symbolOffset: [-1, 0],
              data: getmydzd,
              z: 66,
              animationEasing: 'elasticOut'
            },
            {
              name: '背景',
              type: 'bar',
              barWidth: 15,
              barGap: '-100%',
              xAxisIndex: 1,
              data: getmydzd,
              itemStyle: {
                normal: {
                  color: {
                    colorStops: [{
                        offset: 0,
                        color: 'transparent' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(99,180,255,0.3)' // 100% 处的颜色
                      }
                    ]
                  }
                }
              },
              z: 0
            },
            {
              // 外边框
              type: 'pictorialBar',
              symbol: 'rect',
              itemStyle: {
                normal: {
                  color: 'none'
                }
              },
              label: {
                normal: {
                  formatter: (params) => {
                    var text;
                    if (params.dataIndex == 1) {
                      text = '{f|  ' + params.data + '}';
                    } else if (params.dataIndex == 2) {
                      text = '{f|  ' + params.data + '}';
                    } else if (params.dataIndex == 3) {
                      text = '{f|  ' + params.data + '}';
                    } else {
                      text = '{f|  ' + params.data + '}';
                    }
                    return text;
                  },
                  rich: {
                    f: {
                      color: '#ccfff4',
                      fontSize: '16'
                    }
                  },
                  position: 'right',
                  padding: [0, 0, 0, -10],
                  show: true
                }
              },
              data: getmyd,
              z: 77,
              animationEasing: 'elasticOut'
            }
          ]
        })
      },
      //计算最大值
      calMax(arr) {
        let max = 0;
        arr.forEach((el) => {
          el.forEach((el1) => {
            if (!(el1 === undefined || el1 === '')) {
              if (max < Number(el1)) {
                max = Number(el1);
              }
            }
          });
        });
        let maxint = Math.ceil(max / 9.5);
        //不让最高的值超过最上面的刻度
        let maxval = maxint * 10;
        //让显示的刻度是整数
        return maxval;
      },
      initChart2() {
        this.chart2.setOption({
          tooltip: {
            formatter: (params) => {
              return params.name + "：" + params.value + " ℃";
            },
          },
          grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            top: '0%',
            containLabel: true
          },
          series: [
            {
              name: 'Pressure',
              type: 'gauge',
              detail: {
                formatter: '{value}',
                color: 'white'
              },
              startAngle: 200,
              endAngle: -20,
              axisLine: {
                // 坐标轴线
                show:false,
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  type:'dotted',
                  width: 2,
                  color: [
                    [0, '#379EF4'],
                    [1, '#379EF4']
                  ]
                }
              },
              axisTick: {
                distance: 0,
                length: 2,
                lineStyle: {
                  color: '#379EF4',
                  width: 2
                }
              },
              axisLabel: {
                color: 'white',
                distance: 8,
                fontSize: 10,
              },
              splitLine: {
                distance: 0,
                length: 10,
                lineStyle: {
                  color: '#FFBF00',
                  width: 2
                }
              },
              pointer: {
                width: 3,
                length: '60%',
                itemStyle:{
                  color:'orange'
                },
              },
              data: [
                {
                  value: this.energyLeftVo.tempHistoryAverage,
                  name:'历史平均温度',
                }
              ],
              title:{
                color:'white',
                fontSize:'15',
                offsetCenter: ['0%', '70%'],
              },
            }
          ]
        })
      },
      initChart3() {
        this.chart3.setOption({
          tooltip: {
            formatter: (params) => {
              return params.name + "：" + params.value;
            },
          },
          grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            top: '0%',
            containLabel: true
          },
          series: [
            {
              name: 'Pressure',
              type: 'gauge',
              detail: {
                formatter: '{value}',
                color: 'white'
              },
              startAngle: 200,
              endAngle: -20,
              axisLine: {
                // 坐标轴线
                show:false,
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  type:'dotted',
                  width: 2,
                  color: [
                    [0, '#379EF4'],
                    [1, '#379EF4']
                  ]
                }
              },
              axisTick: {
                distance: 0,
                length: 2,
                lineStyle: {
                  color: '#379EF4',
                  width: 2
                }
              },
              axisLabel: {
                color: 'white',
                distance: 8,
                fontSize: 10,
              },
              splitLine: {
                distance: 0,
                length: 10,
                lineStyle: {
                  color: '#FFBF00',
                  width: 2
                }
              },
              pointer: {
                width: 3,
                length: '60%',
                itemStyle:{
                  color:'orange'
                },
              },
              data: [
                {
                  value: this.energyLeftVo.humidityHistoryAverage,
                  name:'历史平均湿度'
                }
              ],
              title:{
                color:'white',
                fontSize:'15',
                offsetCenter: ['0%', '70%'],
              },
            }
          ]
        })
      },
      initChart4() {
        this.chart4.setOption({
          tooltip: {
            formatter: (params) => {
              return params.name + "：" + params.value + " ℃";
            },
          },
          grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            top: '0%',
            containLabel: true
          },
          series: [
            {
              name: 'Pressure',
              type: 'gauge',
              detail: {
                formatter: '{value}',
                color: 'white'
              },
              startAngle: 200,
              endAngle: -20,
              axisLine: {
                // 坐标轴线
                show:false,
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  type:'dotted',
                  width: 2,
                  color: [
                    [0, '#379EF4'],
                    [1, '#379EF4']
                  ]
                }
              },
              axisTick: {
                distance: 0,
                length: 2,
                lineStyle: {
                  color: '#379EF4',
                  width: 2
                }
              },
              axisLabel: {
                color: 'white',
                distance: 8,
                fontSize: 10,
              },
              splitLine: {
                distance: 0,
                length: 10,
                lineStyle: {
                  color: '#FFBF00',
                  width: 2
                }
              },
              pointer: {
                width: 3,
                length: '60%',
                itemStyle:{
                  color:'orange'
                },
              },
              data: [
                {
                  value: this.energyLeftVo.tempNowAverage,
                  name:'当前平均温度'
                }
              ],
              title:{
                color:'white',
                fontSize:'15',
                offsetCenter: ['0%', '70%'],
              },
            }
          ]
        })
      },
      initChart5() {
        this.chart5.setOption({
          tooltip: {
            formatter: (params) => {
              return params.name + "：" + params.value;
            },
          },
          grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            top: '0%',
            containLabel: true
          },
          series: [
            {
              name: 'Pressure',
              type: 'gauge',
              detail: {
                formatter: '{value}',
                color: 'white'
              },
              startAngle: 200,
              endAngle: -20,
              axisLine: {
                // 坐标轴线
                show:false,
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  type:'dotted',
                  width: 2,
                  color: [
                    [0, '#379EF4'],
                    [1, '#379EF4']
                  ]
                }
              },
              axisTick: {
                distance: 0,
                length: 2,
                lineStyle: {
                  color: '#379EF4',
                  width: 2
                }
              },
              axisLabel: {
                color: 'white',
                distance: 8,
                fontSize: 10,
              },
              splitLine: {
                distance: 0,
                length: 10,
                lineStyle: {
                  color: '#FFBF00',
                  width: 2
                }
              },
              pointer: {
                width: 3,
                length: '60%',
                itemStyle:{
                  color:'orange'
                },
              },
              data: [
                {
                  value: this.energyLeftVo.humidityNowAverage,
                  name:'当前平均湿度'
                }
              ],
              title:{
                color:'white',
                fontSize:'15',
                offsetCenter: ['0%', '70%'],
              },
            }
          ]
        })
      }
    }
  }
</script>

<style lang="less">
  .serverLeft {
    float: left;
    width: 33.3%;
    box-sizing: border-box;
    border: 2px solid red;
    border-image: url(../../../../assets/portal/border.png) 51 38 21 38;
    border-width: 2.125rem 1.583rem 0.875rem 1.583rem;
    position: relative;
    margin-bottom: 0.833rem;
    height: 1080px;
    background-color: #010b32;

    .tabPage {
      height: 100%;
    }

    .xjcpu {
      width: 100%;
      height: 490px;
      width: 100%;
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

    .xjtb {
      margin-bottom: 15px;
    }

    .zysyl {
      width: 50%;
      float: left;
      text-align: center;
      margin-top: 0px
    }

    #chartTempRank {
      position: absolute;
      margin-top: 36px;
    }
  }
</style>
