<template>
  <div class="middle">
    <div class="tabPage">
      <div class="xtgl">
        <div class="xtgldiv">
          <div class="xtglimg"><img src="../../../../assets/portal/img_cpu.png" width="48" height="48" class="xtimg" /></div>
          <div class="xtglxx">
            <div class="xtglname greenfont">空调数量(台)</div>
            <div class="xtgldata"><span class="xtglnumber">12</span></div>
          </div>
        </div>

        <div class="xtgldiv">
          <div class="xtglimg"><img src="../../../../assets/portal/img_yycpu.png" width="48" height="48" class="xtimg" /></div>
          <div class="xtglxx">
            <div class="xtglname yellowfont01">冷热源(个)</div>
            <div class="xtgldata"><span class="xtglnumber">82</span></div>
          </div>
        </div>

        <div class="xtgldiv">
          <div class="xtglimg"><img src="../../../../assets/portal/img_jqzs.png" width="48" height="48" class="xtimg" /></div>
          <div class="xtglxx">
            <div class="xtglname bluefont01">安防(个)</div>
            <div class="xtgldata"><span class="xtglnumber">139</span></div>
          </div>
        </div>

        <div class="xtgldiv">
          <div class="xtglimg"><img src="../../../../assets/portal/img_xjzs.png" width="48" height="48" class="xtimg" /></div>
          <div class="xtglxx">
            <div class="xtglname yellowfont">能耗(台)</div>
            <div class="xtgldata"><span class="xtglnumber">155</span>
            </div>
          </div>
        </div>

        <div class="xtgldiv">
          <div class="xtglimg"><img src="../../../../assets/portal/img_kjzs.png" width="48" height="48" class="xtimg" /></div>
          <div class="xtglxx">
            <div class="xtglname purplefont01">总能耗</div>
            <div class="xtgldata"><span class="xtglnumber" style="font-size: 24px;">{{energyCenterVo.totalEnergy}}</span></div>
          </div>
        </div>

        <div class="xtgldiv">
          <div class="xtglimg"><img src="../../../../assets/portal/img_nczs.png" width="48" height="48" class="xtimg" /></div>
          <div class="xtglxx">
            <div class="xtglname pinkfont">门禁(台)</div>
            <div class="xtgldata"><span class="xtglnumber">62</span></div>
          </div>
        </div>

        <div class="xtgldiv">
          <div class="xtglimg"><img src="../../../../assets/portal/img_yync.png" width="48" height="48" class="xtimg" /></div>
          <div class="xtglxx">
            <div class="xtglname orangefont">实时能耗</div>
            <div class="xtgldata"><span class="xtglnumber">{{energyCenterVo.realTimeEnergy}}</span></div>
          </div>
        </div>

        <div class="xtgldiv">
          <div class="xtglimg"><img src="../../../../assets/portal/img_cczs.png" width="48" height="48" class="xtimg" /></div>
          <div class="xtglxx">
            <div class="xtglname bluefont">水流量</div>
            <div class="xtgldata"><span class="xtglnumber">{{energyCenterVo.waterFlow}}</span></div>
          </div>
        </div>

        <div class="xtgldiv">
          <div class="xtglimg"><img src="../../../../assets/portal/img_yycc.png" width="48" height="48" class="xtimg" /></div>
          <div class="xtglxx">
            <div class="xtglname purplefont">运行时间(天)</div>
            <div class="xtgldata"><span class="xtglnumber">{{energyCenterVo.maxRunDay}}</span></div>
          </div>
        </div>

      </div>
      <div class="table3">
        <div class="xjcputitle">
          <div class="title"><span class="titlexh">采集设备状态</span></div>
          <!-- :row-style="getRowClass" :header-row-style="headerRowStyle" -->
        </div>
        <!-- <el-table width="100%" style="color: white;" :row-class-name="tableRowClassName" cellspacing="0" cellpadding="0"
          :data="alarm">
          <el-table-column width="90" align="center" type="index" :index="indexMethod" label="序号"></el-table-column>
          <el-table-column width="165" align="center" prop="resourceId" label="云账号" show-overflow-tooltip="false"></el-table-column>
          <el-table-column width="165" align="center" prop="accountName" label="资源名" show-overflow-tooltip="false"></el-table-column>
          <el-table-column width="165" align="center" prop="description" label="详情" show-overflow-tooltip="false"></el-table-column>
        </el-table> -->

        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="xtzytable">
          <tr>
            <td width="10%" align="center">序号</td>
            <td width="13%" align="center">设备名称</td>
            <td width="22%" align="center">IP地址</td>
            <td width="10%" align="center">状态</td>
            <td width="25%" align="center">最后采集时间</td>
          </tr>
          <tr v-for="(item, index) in energyCenterVo.deviceStatusList" :key="index" :class="{evenrow : index % 2 == 0}">
            <td align="center">{{ index + 1 }}</td>
            <td align="center">{{ item.deviceName }}</td>
            <td align="center">{{ item.modbusIpHost }}</td>
            <td align="center">
              <span v-if="item.deviceStatus == 1" style="color: rgb(61,231,201)">正常</span>
              <span v-else style="color: rgb(231, 72, 80)">异常</span>
            </td>
            <td align="center">{{ dateFormat(item.latestTime) }}</td>
          </tr>

        </table>

      </div>
    </div>
  </div>
</template>

<script>
  import { selectEnergyCenterData } from "@/api/modbus/energy";
  export default {
    name: 'EnergyCenter',
    data() {
      return {
        energyCenterVo: {
          deviceStatusList: [],
        },
      }
    },
    mounted() {
      this.initEnergyData();
    },
    methods: {
      initEnergyData() {
        selectEnergyCenterData().then(response => {
          this.energyCenterVo = response.data;
        })
      },
      // 针对时间字符串的format
      dateFormat(time){
        return (time == '' || time == null) ? '暂无' : time.split('.')[0].replace('T', ' ');
      },
    }
  }
</script>

<style lang="less">
  .middle {
    width: 33.3%;
    height: 1080px;
    float: left;
    background-color: #010b32;

    .tabPage {
      height: 100%;
    }

    .xtgl {
      width: 98%;
      margin: auto;
      background: url(../../../../assets/portal/img_bg.png) no-repeat;
      height: 370px;
    }

    .xtgldiv {
      width: 33.3%;
      margin-top: 35px;
      float: left;
    }

    .xtglimg {
      width: 40%;
      text-align: right;
      float: left;
    }

    .xtglxx {
      width: 60%;
      text-align: left;
      float: left
    }

    .xtglname {
      font-size: 18px;
      line-height: 40px;
    }

    .xtglnumber {
      font-size: 28px;
      color: #fff;
    }

    .xtimg {
      margin-right: 15px;
      margin-top: 20px;
    }

    .greenfont {
      color: #30c277;
    }

    .yellowfont {
      color: #d9cd3b;
    }

    .orangefont {
      color: #d38137;
    }

    .pinkfont {
      color: #d5698d;
    }

    .bluefont {
      color: #009ae3;
    }

    .purplefont {
      color: #a355b9;
    }

    .purplefont01 {
      color: #a77bf7;
    }

    .yellowfont01 {
      color: #f3ab10
    }

    .bluefont01 {
      color: #149bb9;
    }

    .xjcputitle {
      background: url(../../../../assets/portal/img_titleL.png) no-repeat left;
      color: #fff;
      margin-bottom: 15px;
      margin-top: 15px;
    }

    .titlexh {
      display: inline-block;
      border-bottom: 2px #23d7fb solid
    }

    .xtzytable {}

    .xtzytable td {
      height: 42px;
      font-size: 16px;
      color: #fff;
      padding: 3px;
    }

    .title {
      background: url(../../../../assets/portal/img_titleR.png) no-repeat right;
      width: 100%;
      text-align: center;
      color: #2fd5ff;
      font-size: 21px;
      line-height: 45px;
    }

    .evenrow {
      background: #022061;
    }

    .td-style-1 {
      text-align: center;
      width: 150px;
      color: white;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      display: inline-block;
    }
  }
</style>
