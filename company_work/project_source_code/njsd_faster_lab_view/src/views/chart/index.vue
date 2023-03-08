<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
      <el-form-item label="所属表名称" prop="parentTableName" label-width="90">
        <el-select @change="selectSavedFields" v-model="queryParams.parentTableName" placeholder="请选择数据表" style="width: 16.25rem">
          <el-option
            v-for="table in modbusTableList"
            :key="table.tableName"
            :label="table.tableComment"
            :value="table.tableName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采集时间" prop="parentTableName" label-width="90">
        <el-date-picker
          v-model="queryParams.timeRange"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="center"
          :clearable="false"
          @keyup.enter.native="handleQuery"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-collapse>
      <el-collapse-item>
        <template slot="title">
          图表字段配置 <i class="header-icon el-icon-s-tools"></i>
        </template>
        <div class="dashboard-editor-container-checkbox">
          <el-tag v-for="field in savedFields" :key="field.fieldName" class="el-tag-customize">
            <el-checkbox @change="clickCheckbox(field)" v-model="field.isSelected == '1'">{{field.fieldComment}}</el-checkbox>
          </el-tag>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div class="dashboard-editor-container">
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <el-col :xs="24" :sm="24" :lg="24">
          <div class="chart-wrapper">
            <modbus-line-chart ref="modbusLineChart" :line-chart-data="lineChartData" :currentDevice="currentDeviceName"/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { selectSavedField, changeSelected } from "@/api/chart/chartField";
  import { selectModbusTable } from "@/api/modbus/machineList";
  import { selectLineData } from "@/api/chart/chartData";
  import ModbusLineChart from '@/views/dashboard/ModbusLineChart'

  export default {
    name: "Chart",
    components: {
      ModbusLineChart
    },
    data() {
      return {
        autoTimer: null,
        isLoading: true,
        lineChartData: {},
        // modbus数据表list
        modbusTableList: [],
        savedFields: [],
        queryParams: {
          parentTableName: 'modbus_ahu1',
          timeRange: null,
          startTime: null,
          endTime: null
        },
        currentDeviceName: 'AHU1数据图表' + this.currentDateTime(),
        pickerOptions: {
          shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      };
    },
    created() {
      this.selectModbusTable();
      this.selectSavedFields();
    },
    methods: {
      // 查询以modbus开头的数据表名称
      selectModbusTable() {
        selectModbusTable().then(response => {
          this.modbusTableList = response.data;
        })
      },
      // 根据表名称查询已经保存的图表字段数据
      selectSavedFields() {
        const tableName = this.queryParams.parentTableName;
        let filter = this.modbusTableList.filter(item => item.tableName === tableName);
        if (filter.length !== 0) {
          let tempName = filter[0].tableComment.split('【')[1];
          this.currentDeviceName = tempName.replaceAll('】', '') + '数据图表_' + this.currentDateTime();
        }
        selectSavedField(tableName).then(response => {
          this.savedFields = [];
          this.savedFields = response.data;
          this.selectLineData();
        })
      },
      // 根据表名称查询图表需要的所有数据
      selectLineData() {
        const tableName = this.queryParams.parentTableName;
        const startTime = this.queryParams.startTime;
        const endTime = this.queryParams.endTime;
        selectLineData(tableName, startTime, endTime).then(response => {
          this.lineChartData = response.data;
        })
        this.chartDynamization();
      },
      // 点击checkbox更改该字段的被选中状态，并且重新绘制图表
      clickCheckbox(field) {
        field.isSelected = field.isSelected === '1' ? '0' : '1';
        changeSelected(field.rowId, field.isSelected).then(response => {
          this.selectLineData();
        })
      },
      // 每5分钟重启加载一次图表
      chartDynamization() {
        const timer = setInterval(() =>{
          this.selectLineData();
        }, 5 * 60 * 1000);
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        this.$once('hook:beforeDestroy', () => {
            clearInterval(timer);
        })
      },
      selectChartByTimeRange() {
        if(this.queryParams.timeRange != null) {
          let timeArr = this.queryParams.timeRange;
          this.queryParams.startTime = this.utcFormat(timeArr[0]);
          this.queryParams.endTime = this.utcFormat(timeArr[1]);
        }
        this.selectLineData();
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.selectChartByTimeRange();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.queryParams.timeRange = null;
        this.queryParams.startTime = null;
        this.queryParams.endTime = null;
        this.handleQuery();
      },
      utcFormat(dateStr) {
        let date = new Date(dateStr);
        let year = date.getFullYear(); //年
        let month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)) ; //月份 + 1
        let day = date.getDate() >= 10 ? date.getDate() : ('0' + date.getDate()) ; //天
        let hour = date.getHours() >= 10 ? date.getHours() : ('0' + date.getHours()) ; //小时
        let minutes = date.getMinutes() >= 10 ? date.getMinutes() : ('0' + date.getMinutes()) ; //分钟
        let seconds = date.getSeconds() >= 10 ? date.getSeconds() : ('0' + date.getSeconds()) ; //秒
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
      },
      currentDateTime() {
        return new Date().getTime();
      }
    }
  };
</script>

<style lang="scss" scoped>
.dashboard-editor-container-checkbox {
    padding: 10px 20px 10px 20px;
    background-color: #f0f2f5;
    position: relative;

    .el-tag-customize {
      width: 190px;
      margin: 5px 4px;
    }
}
.dashboard-editor-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 13px 13px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
