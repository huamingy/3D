<template>
  <div id="dataCount">
    <div class="dataCount-title">数据总览</div>

    <dv-loading v-if="isLoading">Loading...</dv-loading>
    <div v-if="!isLoading" id="waterName" class="water-name" style="margin-left: 30px;margin-top: -6px;">

    </div>
    <dv-water-level-pond v-if="!isLoading" :config="config" />
  </div>
</template>

<script>
  import $ from 'jquery'
  import { selectModbusCount } from "@/api/modbus/screen";

  export default {
    name: 'DataCount',
    data() {
      return {
        config: {},
        waterContainer: [],
        isLoading: true,
      }
    },
    created() {
      this.initModbusCount();
    },
    methods: {
      initModbusCount() {
        selectModbusCount().then(response => {
          this.isLoading = false;
          this.waterContainer = response.data;
          this.initWaterContainer()
        })
      },
      initWaterContainer() {
        var i = 0;
        var looper = () => {
            i++;
            if (i == this.waterContainer.length) {
                i = 0;
            }
            var bean = this.waterContainer[i];
            var type = bean.countType === 1 ? '所有数据' : (bean.countType === 2 ? '本周数据' : '今日数据');
            this.config = {
              data: [bean.count],
              shape: 'roundRect',
              waveHeight: 40,
              waveNum: 2,
              formatter: '{value}条'
            };
            $("#waterName").empty();
            $("<div></div>").addClass('circle').appendTo("#waterName");
            $("<span></span>").append(type).appendTo("#waterName");
            this.config = { ...this.config }
            return looper;
        };
        setInterval(looper(), 3000);
      }
    }
  }
</script>

<style lang="less">
  #dataCount {
    width: 100%;
    height: 32%;
    background-color: rgba(6, 30, 93, 0.8);
    border-top: 2px solid rgba(1, 153, 209, .5);
    box-sizing: border-box;
    margin-bottom: 20px;
    /* background-image: linear-gradient(to left, rgba(6, 30, 93, 0.8), rgba(6, 30, 93, 0.1));
    border-left: none; */


    .dataCount-title {
      height: 50px;
      font-weight: bold;
      text-indent: 20px;
      font-size: 20px;
      display: flex;
      align-items: center;
    }

    .dv-loading {
      width: 100%;
      height: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin-top: -46px;
    }

    .water-name {
      margin-left: 30px;
      margin-top: -6px;

      .circle{
        width: 10px;
        height: 10px;
        background-color: #00BAFF;
        border-radius: 50%;
        display: inline-block;
        margin-right: 5px;
      }
      span {
        font-size: 18px;
        color: #3DE7C9;
      }
    }

    .chart-container {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dv-water-pond-level {
      max-width: 90%;
      width: 300px;
      height: 150px;
      margin-left: 49px;
      margin-top: 10px;

      ellipse {
        stroke: transparent !important;
      }

      text {
        font-size: 40px;
      }
    }
  }
</style>
