<template>
  <div style="width: 100%;height: 550px;" />
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'

  export default {
    mixins: [resize],
    props: ['lineChartData', 'currentDevice'],
    data() {
      return {
        chart: null,
        seriesData: [],
        timeLine: [],
        legendData: [],
      }
    },
    watch: {
      lineChartData: {
        deep: true,
        handler(val) {
          this.initChartData(val)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      // 初始化图表
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.initChartData(this.lineChartData)
      },
      // 初始化图表数据
      initChartData(chartData) {
        let tempSeries = [];
        let resultMap = chartData.resultMap;
        if (resultMap != undefined) {
          for (let key in resultMap) {
            if (key !== 'timeline') {
              let lineName = chartData.legendConvertMap[key];
              tempSeries.push({
                name: lineName,
                smooth: true,
                type: 'line',
                data: resultMap[key],
                animationDuration: 2800,
                animationEasing: 'cubicInOut',
                yAxisIndex: lineName.indexOf("温度") !== -1 ? 0 : (lineName.indexOf("湿度") !== -1 ? 1 : 2),
              })
            }
          }
          this.timeLine = resultMap.timeline;
          this.seriesData = tempSeries;
          this.legendData = chartData.legendData;
          this.setOptions()
        }
      },
      setOptions() {
        this.chart.setOption({
          title: {
            text: this.currentDevice,
            show: false
          },
          toolbox: {
            feature: {
              dataView: {show: true}, //数据视图
              saveAsImage: {show: true}, //保存图片
              magicType: {type: ['bar', 'line']} //动态类型切换
            }
          },
          xAxis: {
            data: this.timeLine,
            boundaryGap: false,
            axisTick: {
              show: false
            },
            /* axisLabel:{
                rotate : 60
            } */
          },
          grid: {
            left: 10,
            right: (this.seriesData.filter(item => item.yAxisIndex === 2)).length === 0 ? 10 : 30,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: [
            {
              axisTick: {
                show: false
              },
              min: this.computeMin(0),
              max: this.computeMax(0),
            },
            {
              axisTick: {
                show: false
              },
              min: this.computeMin(1),
              max: this.computeMax(1),
            },
            {
              axisTick: {
                show: false
              },
              position:'right',
              offset: 50,
            },
          ],
          legend: {
            data: this.legendData
          },
          dataZoom: [{
              type: 'slider', //滑动条
              show: true,      //开启
              xAxisIndex: [0],
              start: 1,    //初始化时，滑动条宽度开始标度
              end: 999      //初始化时，滑动条宽度结束标度
            },
            //X轴内置滑动
            {
              type: 'inside',  //内置滑动，随鼠标滚轮展示
              xAxisIndex: [0],
              start: 1,//初始化时，滑动条宽度开始标度
              end: 999  //初始化时，滑动条宽度结束标度
            },{
              type: 'slider', //滑动条
              show: true,      //开启
              yAxisIndex: [0],
              left: '0%',  //滑动条位置
              start: 1,    //初始化时，滑动条宽度开始标度
              end: 999      //初始化时，滑动条宽度结束标度
            },{
              type: 'inside',  //内置滑动，随鼠标滚轮展示
              yAxisIndex: [0],
              start: 1,//初始化时，滑动条宽度开始标度
              end: 999  ,//初始化时，滑动条宽度结束标度
          },{
              type: 'slider', //滑动条
              show: true,      //开启
              yAxisIndex: [1],
              right: this.computeDataZoom(),  //滑动条位置
              start: 1,    //初始化时，滑动条宽度开始标度
              end: 999      //初始化时，滑动条宽度结束标度
            },{
              type: 'inside',  //内置滑动，随鼠标滚轮展示
              yAxisIndex: [1],
              start: 1,//初始化时，滑动条宽度开始标度
              end: 999  ,//初始化时，滑动条宽度结束标度
            },{
              type: 'slider', //滑动条
              show: true,      //开启
              yAxisIndex: [2],
              right: (this.seriesData.filter(item => item.yAxisIndex === 2)).length === 0 ? -1000 : '0%',  //滑动条位置
              start: 1,    //初始化时，滑动条宽度开始标度
              end: 999      //初始化时，滑动条宽度结束标度
            },{
              type: 'inside',  //内置滑动，随鼠标滚轮展示
              yAxisIndex: [2],
              start: 1,//初始化时，滑动条宽度开始标度
              end: 999  ,//初始化时，滑动条宽度结束标度
            }],
          series: this.seriesData
        }, true)
      },
      computeMax(yAxisIndex) {
        let max = 0;
        let maxList = [0];
        let filter = this.seriesData.filter(item => item.yAxisIndex === yAxisIndex);
        if (filter.length !== 0) {
          for (let i = 0; i < filter.length; i++) {
            maxList.push(Math.max.apply(null, filter[i].data))
          }
          max = Math.max.apply(null, maxList);
        }
        max = Math.floor(yAxisIndex === 0 ? (max + 2) : (yAxisIndex === 1 ? (max + 5) : max));
        if (yAxisIndex === 2) {
          let maxLength = (max + '').length;
          max = max + Math.pow(10, maxLength - 2);
        }
        console.log("yAxisIndex=" + yAxisIndex + " -> " + max)
        return max;
      },
      computeMin(yAxisIndex) {
        let min = 999999;
        let minList = [999999];
        let filter = this.seriesData.filter(item => item.yAxisIndex === yAxisIndex);
        if (filter.length !== 0) {
          for (let i = 0; i < filter.length; i++) {
            minList.push(Math.min.apply(null, filter[i].data))
          }
          min = Math.min.apply(null, minList);
        }
        min = Math.floor(yAxisIndex === 0 ? (min - 2) : (yAxisIndex === 1 ? (min - 5) : min));
        if (yAxisIndex === 2) {
          let minLength = (min + '').length;
          min = min - Math.pow(10, minLength - 2);
        }
        console.log("yAxisIndex=" + yAxisIndex + " -> " + min);
        return min < 0 ? 0 : min;
      },
      //计算图表右侧第一个y轴dataZoom的right值
      computeDataZoom() {
        let right = '0%';
        let maxList = [0];
        let filter = this.seriesData.filter(item => item.yAxisIndex === 2)
        if (filter.length !== 0) {
          for (let i = 0; i < filter.length; i++) {
            maxList.push(Math.max.apply(null, filter[i].data))
          }
          let max = Math.max.apply(null, maxList);
          switch ((max + '').length) {
            case 1: right = 40;break;
            case 2: right = 45;break;
            case 3: right = 51;break;
            case 4: right = 56;break;
            case 5: right = 66;break;
          }
        }
        return right;
      }
    }
  }
</script>
