<template>
  <div id="right-bottom">
    <div class="right-bottom-title">设备详情</div>
    <dv-scroll-board :config="config" @click="clickRow" @dblclick.native="doubleClickRow" style="width: 100%; height: 100%;" />
  </div>
</template>

<script>
  import { selectDeviceDetails } from "@/api/modbus/screen";
  export default {
    name: 'RightBottom',
    data() {
      return {
        config: {
          header: ['设备名称', '故障详情', '时间事件'],
          data: [
          ],
          columnWidth: [90, 120, 130],
          align: ['center', 'center', 'center'],
          oddRowBGC: 'rgba(9, 37, 50, 0.4)',
          evenRowBGC: 'rgba(10, 32, 50, 0.3)',
          headerBGC: 'rgba(5, 25, 55, 0.5)'
        }
      }
    },
    created() {
      this.selectDeviceDetails();
    },
    methods: {
      selectDeviceDetails() {
        selectDeviceDetails().then(response => {
          let list = response.data;
          for (let i = 0; i < list.length; i++) {
            let bean = list[i];
            let spanStr = '<span style="color:rgb(231, 72, 80);">' + bean.faultDescribe + '</span>'
            this.config.data.push([bean.deviceName, spanStr, bean.createTime])
          }
          this.config = { ...this.config }
        })
      },
      clickRow(row) {

      },
      doubleClickRow(row) {

      },
      // 针对时间字符串的format
      dateFormat(time){
        return (time == '' || time == null) ? '暂无' : time.split('.')[0].replace('T', ' ');
      },
    }
  }
</script>

<style lang="less">
#right-bottom {
  width: 100%;
  height: 378px;
  display: flex;
  flex-direction: column;
  background-color: rgba(5, 25, 55, 0.5);
  border-top: 2px solid rgba(1, 153, 209, .5);
  box-sizing: border-box;

  .right-bottom-title {
    height: 35px;
    font-weight: bold;
    text-indent: 20px;
    font-size: 17px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid rgba(1, 153, 209, .5);
  }

  .border-box-content {
    padding: 20px;
    box-sizing: border-box;
  }

  .table-name {
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;

    img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
    }
  }

  .dv-scroll-board {
    height: calc(~"100% - 60px");
  }

  .dv-scroll-board .rows .row-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 14px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    cursor: pointer;
  }
  .row-item:hover {
    transform: scale(1.15);
  }
}
</style>
