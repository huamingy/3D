<template>
  <div id="overview">
    <div class="overview-title">实时检测</div>

    <div class="overview-status">
      <div class="overview-status-box">
        <div class="status-image">
          <img src="../../assets/images/success.png" width="32" height="32" class="quitBtn">
        </div>
        <div class="status-label">
          <div class="label-name">正常</div>
          <div class="label-value">
            <span class="value-span">{{deviceData.normal}}</span>
            <span class="unit-span">台</span>
          </div>
        </div>
      </div>
      <div class="overview-status-box">
        <div class="status-image">
          <img src="../../assets/images/fault.png" width="32" height="32" class="quitBtn">
        </div>
        <div class="status-label">
          <div class="label-name">故障</div>
          <div class="label-value">
            <span class="value-span">{{deviceData.fault}}</span>
            <span class="unit-span">台</span>
          </div>
        </div>
      </div>
      <div class="overview-status-box">
        <div class="status-image">
          <img src="../../assets/images/off-line.png" width="32" height="32" class="quitBtn">
        </div>
        <div class="status-label">
          <div class="label-name">离线</div>
          <div class="label-value">
            <span class="value-span">{{deviceData.offline}}</span>
            <span class="unit-span">台</span>
          </div>
        </div>
      </div>
    </div>

    <!-- <div id="overview-chart"/> -->
    <dv-active-ring-chart :config="config" class="ccmc-middle" style="width:170px;height:170px" />

    <LabelTag :config="labelConfig" />
  </div>
</template>

<script>
  import { selectOverviewData } from "@/api/modbus/screen";
  import LabelTag from './LabelTag';

  export default {
    name: 'Overview',
    components: {
      LabelTag
    },
    data () {
      return {
        deviceData: {
          normal: 0,
          fault: 0,
          offline: 0,
        },
        config: {
          data: [],
          color: ['#3de7c9','#ffc530', '#00baff'],
          lineWidth: 12,
          radius: '60%',
          activeRadius: '70%',
          digitalFlopStyle: {
            fontSize: 17,
            fill: '#fff'
          }
        },
        labelConfig: {
          data: ['正常', '故障', '离线']
        }
      }
    },
    created() {
      this.selectOverview();
    },
    methods: {
      selectOverview() {
        selectOverviewData().then(response => {
          this.deviceData = response.data;
          this.config.data.push({name: '正常', value: response.data.normal});
          this.config.data.push({name: '故障', value: response.data.fault});
          this.config.data.push({name: '离线', value: response.data.offline});
          this.config = { ...this.config }
        });
      }
    }
  }
</script>

<style lang="less">
#overview {
  width: 100%;
  height: 300px;
  background-color: rgba(5,25,55, 0.5);
  border-top: 2px solid rgba(1, 153, 209, .5);
  box-sizing: border-box;
  /* margin-bottom: 20px; */
  /* background-image: linear-gradient(to right, rgba(6, 30, 93, 0.8), rgba(6, 30, 93, 0.1));
  border-right: none; */

  .overview-title {
    height: 35px;
    font-weight: bold;
    text-indent: 20px;
    font-size: 17px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid rgba(1, 153, 209, .5);
  }

  .overview-status {
    width: 120px;
    height: 210px;
    float: left;
    margin-top: 15px;

    .overview-status-box {
      width: 120px;
      height: 70px;

      .status-image {
        width: 50px;
        height: 100%;
        float: left;
        .quitBtn {
          margin: 19px 20px 0 10px;
        }
      }
      .status-label {
        width: 70px;
        height: 100%;
        float: right;
        .label-name {
          color: rgb(43,150,156);
          margin-top: 12px;
        }
        .label-value {
          margin-top: 4px;
          .value-span {
            font-size: 19px;
            font-weight: 700;
            font-family: "宋体";
          }
          .unit-span {
            margin-left: 5px;
          }
        }
      }
    }
  }

  .dv-charts-container {
    height: calc(~"100% - 50px");
  }

  #overview-chart {
    width: 100%;
    height: 60%;
    margin-top: -17px;
  }

  .ccmc-middle {
    float: left;
    margin-top: 32px;
    margin-left: -26px;
    .active-ring-name {
    }

  }
}
</style>
