<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="采集时间" prop="timeRange">
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

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="towerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" fixed/>
      <el-table-column label="采集时间" align="center" prop="createTime" width="150" :formatter="dateFormat" fixed/>
      <el-table-column label="系统启停_TCP" align="center" prop="systemStartStopTcp" width="110"/>
      <el-table-column label="系统运行状态" align="center" prop="systemStatus" width="100"/>
      <el-table-column label="水泵运行状态" align="center" prop="waterPumpStatus" width="100"/>
      <el-table-column label="出水季节切换阀 开状态" align="center" prop="outletSeasonValveStatus" width="160"/>
      <el-table-column label="回水季节切换阀 开状态" align="center" prop="backSeansonValveStatus" width="160"/>
      <el-table-column label="水泵远程状态1" align="center" prop="waterPumpRotateStatus1" width="110"/>
      <el-table-column label="水泵远程状态2" align="center" prop="waterPumpRotateStatus2" width="110"/>
      <el-table-column label="水泵远程状态3" align="center" prop="waterPumpRotateStatus3" width="110"/>
      <el-table-column label="水泵运行状态1" align="center" prop="waterPumpStatus1" width="110"/>
      <el-table-column label="水泵运行状态2" align="center" prop="waterPumpStatus2" width="110"/>
      <el-table-column label="水泵运行状态3" align="center" prop="waterPumpStatus3" width="110"/>
      <el-table-column label="冷却风扇1运行状态" align="center" prop="coolFanStatus1" width="140"/>
      <el-table-column label="冷却风扇2运行状态" align="center" prop="coolFanStatus2" width="140"/>
      <el-table-column label="冷却风扇3运行状态" align="center" prop="coolFanStatus3" width="140"/>
      <el-table-column label="冷却管道2模式状态" align="center" prop="coolPipelineStatus2" width="140"/>
      <el-table-column label="冷却管道1模式状态" align="center" prop="coolPipelineStatus1" width="140"/>
      <el-table-column label="冷却塔状态" align="center" prop="coolTowerStatus" width="90"/>
      <el-table-column label="补水管电伴热电源" align="center" prop="waterPipeElePower" width="140"/>
      <el-table-column label="恒压补水电源" align="center" prop="conPressWaterSup" width="100"/>
      <el-table-column label="冷冻水加药开停" align="center" prop="freezingWaterOnOff" width="120"/>
      <el-table-column label="冷却水加药开停" align="center" prop="coolWaterOnOff" width="120"/>
      <el-table-column label="冷冻水加药开启度" align="center" prop="freezingWaterOnOffOpen" width="130"/>
      <el-table-column label="冷却水加药开启度" align="center" prop="coolWaterOnOffOpen" width="130"/>
      <el-table-column label="运行模式" align="center" prop="runMode" />
      <el-table-column label="环境温度" align="center" prop="environmentTemp" />
      <el-table-column label="温控二通旁通阀开度" align="center" prop="tempTwoValveOpen" width="140"/>
      <el-table-column label="冷却系统出水压力" align="center" prop="coolSysOutletPress" width="130"/>
      <el-table-column label="风扇轮值 时" align="center" prop="fanRotateHour" width="90"/>
      <el-table-column label="风扇轮值 分" align="center" prop="fanRotateMin" width="90"/>
      <el-table-column label="水泵轮值运行 时" align="center" prop="waterPumpRotateHour" width="120"/>
      <el-table-column label="水泵轮值运行 分" align="center" prop="waterPumpRotateMin" width="120"/>
      <el-table-column label="冷却系统流量" align="center" prop="coolSysFlow" width="100"/>
      <el-table-column label="冷却泵频率反馈1" align="center" prop="coolPumpHzFeedback1" width="120"/>
      <el-table-column label="冷却泵频率反馈2" align="center" prop="coolPumpHzFeedback2" width="120"/>
      <el-table-column label="冷却泵频率反馈3" align="center" prop="coolPumpHzFeedback3" width="120"/>
      <el-table-column label="冷却侧供水温度" align="center" prop="coolSupWaterTemp" width="120"/>
      <el-table-column label="冷却侧回水温度" align="center" prop="coolRetWaterTemp" width="120"/>
      <el-table-column label="冷冻侧供水温度" align="center" prop="freezingSupWaterTemp" width="120"/>
      <el-table-column label="冷冻侧回水温度" align="center" prop="freezingRetWaterTemp" width="120"/>
      <el-table-column label="运行 天" align="center" prop="runDay" />
      <el-table-column label="运行 时" align="center" prop="runHour" />
      <el-table-column label="变频器故障保护状态1" align="center" prop="inverterFaultProtectionStatus1" width="145"/>
      <el-table-column label="变频器故障保护状态2" align="center" prop="inverterFaultProtectionStatus2" width="145"/>
      <el-table-column label="变频器故障保护状态3" align="center" prop="inverterFaultProtectionStatus3" width="145"/>
      <el-table-column label="冷却塔分机故障1" align="center" prop="coolTowerFanFault1" width="130"/>
      <el-table-column label="冷却塔分机故障2" align="center" prop="coolTowerFanFault2" width="130"/>
      <el-table-column label="冷却塔分机故障3" align="center" prop="coolTowerFanFault3" width="130"/>
      <el-table-column label="EH水流量1" align="center" prop="ehFlow1" width="90"/>
      <el-table-column label="EH进水温度1" align="center" prop="ehInWaterTemp1" width="100"/>
      <el-table-column label="EH出水温度1" align="center" prop="ehOutWaterTemp1" width="100"/>
      <el-table-column label="EH实时能耗1" align="center" prop="ehRtEnergyCon1" width="100"/>
      <el-table-column label="EH总能量1" align="center" prop="ehTotalEnergy1" width="90"/>
      <el-table-column label="EH水流量2" align="center" prop="ehFlow2" width="90"/>
      <el-table-column label="EH进水温度2" align="center" prop="ehInWaterTemp2" width="100"/>
      <el-table-column label="EH出水温度2" align="center" prop="ehOutWaterTemp2" width="100"/>
      <el-table-column label="EH实时能耗2" align="center" prop="ehRtEnergyCon2" width="100"/>
      <el-table-column label="EH总能量2" align="center" prop="ehTotalEnergy2" width="90"/>
      <el-table-column label="EH水流量3" align="center" prop="ehFlow3" width="90"/>
      <el-table-column label="EH进水温度3" align="center" prop="ehInWaterTemp3" width="100"/>
      <el-table-column label="EH出水温度3" align="center" prop="ehOutWaterTemp3" width="100"/>
      <el-table-column label="EH实时能耗3" align="center" prop="ehRtEnergyCon3" width="100"/>
      <el-table-column label="EH总能量3" align="center" prop="ehTotalEnergy3" width="90"/>
      <el-table-column label="EH水流量" align="center" prop="ehFlowAll" width="90"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改冷却塔数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="系统启停_TCP" prop="systemStartStopTcp">
          <el-input v-model="form.systemStartStopTcp" placeholder="请输入系统启停_TCP" />
        </el-form-item>
        <el-form-item label="水泵远程状态1" prop="waterPumpRotateStatus1">
          <el-input v-model="form.waterPumpRotateStatus1" placeholder="请输入水泵远程状态1" />
        </el-form-item>
        <el-form-item label="水泵远程状态2" prop="waterPumpRotateStatus2">
          <el-input v-model="form.waterPumpRotateStatus2" placeholder="请输入水泵远程状态2" />
        </el-form-item>
        <el-form-item label="水泵远程状态3" prop="waterPumpRotateStatus3">
          <el-input v-model="form.waterPumpRotateStatus3" placeholder="请输入水泵远程状态3" />
        </el-form-item>
        <el-form-item label="水泵运行状态1" prop="waterPumpStatus1">
          <el-input v-model="form.waterPumpStatus1" placeholder="请输入水泵运行状态1" />
        </el-form-item>
        <el-form-item label="水泵运行状态2" prop="waterPumpStatus2">
          <el-input v-model="form.waterPumpStatus2" placeholder="请输入水泵运行状态2" />
        </el-form-item>
        <el-form-item label="水泵运行状态3" prop="waterPumpStatus3">
          <el-input v-model="form.waterPumpStatus3" placeholder="请输入水泵运行状态3" />
        </el-form-item>
        <el-form-item label="冷却风扇1运行状态" prop="coolFanStatus1">
          <el-input v-model="form.coolFanStatus1" placeholder="请输入冷却风扇1运行状态" />
        </el-form-item>
        <el-form-item label="冷却风扇2运行状态" prop="coolFanStatus2">
          <el-input v-model="form.coolFanStatus2" placeholder="请输入冷却风扇2运行状态" />
        </el-form-item>
        <el-form-item label="冷却风扇3运行状态" prop="coolFanStatus3">
          <el-input v-model="form.coolFanStatus3" placeholder="请输入冷却风扇3运行状态" />
        </el-form-item>
        <el-form-item label="冷却管道2模式状态" prop="coolPipelineStatus2">
          <el-input v-model="form.coolPipelineStatus2" placeholder="请输入冷却管道2模式状态" />
        </el-form-item>
        <el-form-item label="冷却管道1模式状态" prop="coolPipelineStatus1">
          <el-input v-model="form.coolPipelineStatus1" placeholder="请输入冷却管道1模式状态" />
        </el-form-item>
        <el-form-item label="补水管电伴热电源" prop="waterPipeElePower">
          <el-input v-model="form.waterPipeElePower" placeholder="请输入补水管电伴热电源" />
        </el-form-item>
        <el-form-item label="恒压补水电源" prop="conPressWaterSup">
          <el-input v-model="form.conPressWaterSup" placeholder="请输入恒压补水电源" />
        </el-form-item>
        <el-form-item label="冷冻水加药开停" prop="freezingWaterOnOff">
          <el-input v-model="form.freezingWaterOnOff" placeholder="请输入冷冻水加药开停" />
        </el-form-item>
        <el-form-item label="冷却水加药开停" prop="coolWaterOnOff">
          <el-input v-model="form.coolWaterOnOff" placeholder="请输入冷却水加药开停" />
        </el-form-item>
        <el-form-item label="冷冻水加药开启度" prop="freezingWaterOnOffOpen">
          <el-input v-model="form.freezingWaterOnOffOpen" placeholder="请输入冷冻水加药开启度" />
        </el-form-item>
        <el-form-item label="冷却水加药开启度" prop="coolWaterOnOffOpen">
          <el-input v-model="form.coolWaterOnOffOpen" placeholder="请输入冷却水加药开启度" />
        </el-form-item>
        <el-form-item label="运行模式" prop="runMode">
          <el-input v-model="form.runMode" placeholder="请输入运行模式" />
        </el-form-item>
        <el-form-item label="环境温度" prop="environmentTemp">
          <el-input v-model="form.environmentTemp" placeholder="请输入环境温度" />
        </el-form-item>
        <el-form-item label="温控二通旁通阀开度" prop="tempTwoValveOpen">
          <el-input v-model="form.tempTwoValveOpen" placeholder="请输入温控二通旁通阀开度" />
        </el-form-item>
        <el-form-item label="冷却系统出水压力" prop="coolSysOutletPress">
          <el-input v-model="form.coolSysOutletPress" placeholder="请输入冷却系统出水压力" />
        </el-form-item>
        <el-form-item label="风扇轮值 时" prop="fanRotateHour">
          <el-input v-model="form.fanRotateHour" placeholder="请输入风扇轮值 时" />
        </el-form-item>
        <el-form-item label="风扇轮值 分" prop="fanRotateMin">
          <el-input v-model="form.fanRotateMin" placeholder="请输入风扇轮值 分" />
        </el-form-item>
        <el-form-item label="水泵轮值运行 时" prop="waterPumpRotateHour">
          <el-input v-model="form.waterPumpRotateHour" placeholder="请输入水泵轮值运行 时" />
        </el-form-item>
        <el-form-item label="水泵轮值运行 分" prop="waterPumpRotateMin">
          <el-input v-model="form.waterPumpRotateMin" placeholder="请输入水泵轮值运行 分" />
        </el-form-item>
        <el-form-item label="冷却系统流量" prop="coolSysFlow">
          <el-input v-model="form.coolSysFlow" placeholder="请输入冷却系统流量" />
        </el-form-item>
        <el-form-item label="冷却泵频率反馈1" prop="coolPumpHzFeedback1">
          <el-input v-model="form.coolPumpHzFeedback1" placeholder="请输入冷却泵频率反馈1" />
        </el-form-item>
        <el-form-item label="冷却泵频率反馈2" prop="coolPumpHzFeedback2">
          <el-input v-model="form.coolPumpHzFeedback2" placeholder="请输入冷却泵频率反馈2" />
        </el-form-item>
        <el-form-item label="冷却泵频率反馈3" prop="coolPumpHzFeedback3">
          <el-input v-model="form.coolPumpHzFeedback3" placeholder="请输入冷却泵频率反馈3" />
        </el-form-item>
        <el-form-item label="冷却侧供水温度" prop="coolSupWaterTemp">
          <el-input v-model="form.coolSupWaterTemp" placeholder="请输入冷却侧供水温度" />
        </el-form-item>
        <el-form-item label="冷却侧回水温度" prop="coolRetWaterTemp">
          <el-input v-model="form.coolRetWaterTemp" placeholder="请输入冷却侧回水温度" />
        </el-form-item>
        <el-form-item label="冷冻侧供水温度" prop="freezingSupWaterTemp">
          <el-input v-model="form.freezingSupWaterTemp" placeholder="请输入冷冻侧供水温度" />
        </el-form-item>
        <el-form-item label="冷冻侧回水温度" prop="freezingRetWaterTemp">
          <el-input v-model="form.freezingRetWaterTemp" placeholder="请输入冷冻侧回水温度" />
        </el-form-item>
        <el-form-item label="运行 天" prop="runDay">
          <el-input v-model="form.runDay" placeholder="请输入运行 天" />
        </el-form-item>
        <el-form-item label="运行 时" prop="runHour">
          <el-input v-model="form.runHour" placeholder="请输入运行 时" />
        </el-form-item>
        <el-form-item label="变频器故障保护状态1" prop="inverterFaultProtectionStatus1">
          <el-input v-model="form.inverterFaultProtectionStatus1" placeholder="请输入变频器故障保护状态1" />
        </el-form-item>
        <el-form-item label="变频器故障保护状态2" prop="inverterFaultProtectionStatus2">
          <el-input v-model="form.inverterFaultProtectionStatus2" placeholder="请输入变频器故障保护状态2" />
        </el-form-item>
        <el-form-item label="变频器故障保护状态3" prop="inverterFaultProtectionStatus3">
          <el-input v-model="form.inverterFaultProtectionStatus3" placeholder="请输入变频器故障保护状态3" />
        </el-form-item>
        <el-form-item label="冷却塔分机故障1" prop="coolTowerFanFault1">
          <el-input v-model="form.coolTowerFanFault1" placeholder="请输入冷却塔分机故障1" />
        </el-form-item>
        <el-form-item label="冷却塔分机故障2" prop="coolTowerFanFault2">
          <el-input v-model="form.coolTowerFanFault2" placeholder="请输入冷却塔分机故障2" />
        </el-form-item>
        <el-form-item label="冷却塔分机故障3" prop="coolTowerFanFault3">
          <el-input v-model="form.coolTowerFanFault3" placeholder="请输入冷却塔分机故障3" />
        </el-form-item>
        <el-form-item label="EH水流量1" prop="ehFlow1">
          <el-input v-model="form.ehFlow1" placeholder="请输入EH水流量1" />
        </el-form-item>
        <el-form-item label="EH进水温度1" prop="ehInWaterTemp1">
          <el-input v-model="form.ehInWaterTemp1" placeholder="请输入EH进水温度1" />
        </el-form-item>
        <el-form-item label="EH出水温度1" prop="ehOutWaterTemp1">
          <el-input v-model="form.ehOutWaterTemp1" placeholder="请输入EH出水温度1" />
        </el-form-item>
        <el-form-item label="EH实时能耗1" prop="ehRtEnergyCon1">
          <el-input v-model="form.ehRtEnergyCon1" placeholder="请输入EH实时能耗1" />
        </el-form-item>
        <el-form-item label="EH总能量1" prop="ehTotalEnergy1">
          <el-input v-model="form.ehTotalEnergy1" placeholder="请输入EH总能量1" />
        </el-form-item>
        <el-form-item label="EH水流量2" prop="ehFlow2">
          <el-input v-model="form.ehFlow2" placeholder="请输入EH水流量2" />
        </el-form-item>
        <el-form-item label="EH进水温度2" prop="ehInWaterTemp2">
          <el-input v-model="form.ehInWaterTemp2" placeholder="请输入EH进水温度2" />
        </el-form-item>
        <el-form-item label="EH出水温度2" prop="ehOutWaterTemp2">
          <el-input v-model="form.ehOutWaterTemp2" placeholder="请输入EH出水温度2" />
        </el-form-item>
        <el-form-item label="EH实时能耗2" prop="ehRtEnergyCon2">
          <el-input v-model="form.ehRtEnergyCon2" placeholder="请输入EH实时能耗2" />
        </el-form-item>
        <el-form-item label="EH总能量2" prop="ehTotalEnergy2">
          <el-input v-model="form.ehTotalEnergy2" placeholder="请输入EH总能量2" />
        </el-form-item>
        <el-form-item label="EH水流量3" prop="ehFlow3">
          <el-input v-model="form.ehFlow3" placeholder="请输入EH水流量3" />
        </el-form-item>
        <el-form-item label="EH进水温度3" prop="ehInWaterTemp3">
          <el-input v-model="form.ehInWaterTemp3" placeholder="请输入EH进水温度3" />
        </el-form-item>
        <el-form-item label="EH出水温度3" prop="ehOutWaterTemp3">
          <el-input v-model="form.ehOutWaterTemp3" placeholder="请输入EH出水温度3" />
        </el-form-item>
        <el-form-item label="EH实时能耗3" prop="ehRtEnergyCon3">
          <el-input v-model="form.ehRtEnergyCon3" placeholder="请输入EH实时能耗3" />
        </el-form-item>
        <el-form-item label="EH总能量3" prop="ehTotalEnergy3">
          <el-input v-model="form.ehTotalEnergy3" placeholder="请输入EH总能量3" />
        </el-form-item>
        <el-form-item label="EH水流量--32为浮点数" prop="ehFlowAll">
          <el-input v-model="form.ehFlowAll" placeholder="请输入EH水流量--32为浮点数" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <field-dialog
      v-if="downloadDialogView"
      :modbusType="modbusType"
      :exportUrl="exportUrl"
      :exportName="exportName"
      :queryParams="queryParams"/>
  </div>
</template>

<script>
import { listTower, getTower, delTower, addTower, updateTower } from "@/api/modbus/tower";
import fieldDialog from '@/views/modbus/field'

export default {
  name: "Tower",
  components: {
    fieldDialog,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 冷却塔数据表格数据
      towerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      exportUrl: '/modbus/tower/export',
      exportName: 'tower_',
      modbusType: 'ModbusCoolTower',
      downloadDialogView: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        timeRange: null,
        startTime: null,
        endTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      pickerOptions: {
        shortcuts: [{
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
    this.getList();
  },
  methods: {
    /** 查询冷却塔数据列表 */
    getList() {
      this.loading = true;
      if(this.queryParams.timeRange != null) {
        let timeArr = this.queryParams.timeRange;
        this.queryParams.startTime = this.utcFormat(timeArr[0]);
        this.queryParams.endTime = this.utcFormat(timeArr[1]);
      }
      listTower(this.queryParams).then(response => {
        this.towerList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        rowId: null,
        systemStartStopTcp: null,
        systemStatus: 0,
        waterPumpStatus: 0,
        outletSeasonValveStatus: 0,
        backSeansonValveStatus: 0,
        waterPumpRotateStatus1: null,
        waterPumpRotateStatus2: null,
        waterPumpRotateStatus3: null,
        waterPumpStatus1: null,
        waterPumpStatus2: null,
        waterPumpStatus3: null,
        coolFanStatus1: null,
        coolFanStatus2: null,
        coolFanStatus3: null,
        coolPipelineStatus2: null,
        coolPipelineStatus1: null,
        coolTowerStatus: 0,
        waterPipeElePower: null,
        conPressWaterSup: null,
        freezingWaterOnOff: null,
        coolWaterOnOff: null,
        freezingWaterOnOffOpen: null,
        coolWaterOnOffOpen: null,
        runMode: null,
        environmentTemp: null,
        tempTwoValveOpen: null,
        coolSysOutletPress: null,
        fanRotateHour: null,
        fanRotateMin: null,
        waterPumpRotateHour: null,
        waterPumpRotateMin: null,
        coolSysFlow: null,
        coolPumpHzFeedback1: null,
        coolPumpHzFeedback2: null,
        coolPumpHzFeedback3: null,
        coolSupWaterTemp: null,
        coolRetWaterTemp: null,
        freezingSupWaterTemp: null,
        freezingRetWaterTemp: null,
        runDay: null,
        runHour: null,
        inverterFaultProtectionStatus1: null,
        inverterFaultProtectionStatus2: null,
        inverterFaultProtectionStatus3: null,
        coolTowerFanFault1: null,
        coolTowerFanFault2: null,
        coolTowerFanFault3: null,
        ehFlow1: null,
        ehInWaterTemp1: null,
        ehOutWaterTemp1: null,
        ehRtEnergyCon1: null,
        ehTotalEnergy1: null,
        ehFlow2: null,
        ehInWaterTemp2: null,
        ehOutWaterTemp2: null,
        ehRtEnergyCon2: null,
        ehTotalEnergy2: null,
        ehFlow3: null,
        ehInWaterTemp3: null,
        ehOutWaterTemp3: null,
        ehRtEnergyCon3: null,
        ehTotalEnergy3: null,
        ehFlowAll: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.rowId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加冷却塔数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const rowId = row.rowId || this.ids
      getTower(rowId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改冷却塔数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.rowId != null) {
            updateTower(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTower(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const rowIds = row.rowId || this.ids;
      this.$modal.confirm('是否确认删除数据项？').then(function() {
        return delTower(rowIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 打开导出弹窗操作 */
    handleExport() {
      this.downloadDialogView = true;
    },
    /** 关闭导出弹窗操作 */
    closeFieldExport() {
      this.downloadDialogView = false;
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
    // 针对时间字符串的format
    dateFormat(row, column){
       let str = row[column.property];
       return (str == '' || str == null) ? '暂无' : str.split('.')[0].replace('T', ' ');
    },
  }
};
</script>
