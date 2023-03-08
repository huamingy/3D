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

    <el-table v-loading="loading" :data="machineList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" fixed/>
      <el-table-column label="采集时间" align="center" prop="createTime" width="150" :formatter="dateFormat" fixed/>
      <el-table-column label="开启冷却塔提示" align="center" prop="openCoolTowerHint" width="120"/>
      <el-table-column label="冷却塔制冷提示" align="center" prop="coolTowerRefrigerationStatus" width="120"/>
      <el-table-column label="系统启停状态" align="center" prop="systemStartStopStatus" width="100"/>
      <el-table-column label="螺杆机运行状态1" align="center" prop="screwStatus1" width="120"/>
      <el-table-column label="螺杆机运行状态2" align="center" prop="screwStatus2" width="120"/>
      <el-table-column label="螺杆机运行状态3" align="center" prop="screwStatus3" width="120"/>
      <el-table-column label="冷冻水泵运行状态1" align="center" prop="coolWaterPumpStatus1" width="135"/>
      <el-table-column label="冷冻水泵运行状态2" align="center" prop="coolWaterPumpStatus2" width="135"/>
      <el-table-column label="冷冻水泵运行状态3" align="center" prop="coolWaterPumpStatus3" width="135"/>
      <el-table-column label="冷冻水泵远程状态1" align="center" prop="coolWaterPumpRemoteStatus1" width="135"/>
      <el-table-column label="冷冻水泵远程状态2" align="center" prop="coolWaterPumpRemoteStatus2" width="135"/>
      <el-table-column label="冷冻水泵远程状态3" align="center" prop="coolWaterPumpRemoteStatus3" width="135"/>
      <el-table-column label="冷冻水泵运行状态" align="center" prop="coolWaterPumpStatus" width="130"/>
      <el-table-column label="螺杆机冷冻/却阀开状态1" align="center" prop="screwCoolStatus1" width="165"/>
      <el-table-column label="螺杆机冷冻/却阀开状态2" align="center" prop="screwCoolStatus2" width="165"/>
      <el-table-column label="螺杆机冷冻/却阀开状态3" align="center" prop="screwCoolStatus3" width="165"/>
      <el-table-column label="冷冻管道状态" align="center" prop="coolPipelineStatus" width="100"/>
      <el-table-column label="运行方式" align="center" prop="operationType" />
      <el-table-column label="冷冻系统供回水压差" align="center" prop="coolSystemReturn" width="140"/>
      <el-table-column label="冷冻系统回水压力" align="center" prop="coolSystemReturnPress" width="130"/>
      <el-table-column label="压差旁通阀开度" align="center" prop="difPressValveOpen" width="120"/>
      <el-table-column label="冷冻系统出水压力" align="center" prop="coolSystemOutPress" width="130"/>
      <el-table-column label="冷冻泵频率反馈1" align="center" prop="coolPumpHzFeedback1" width="130"/>
      <el-table-column label="冷冻泵频率反馈2" align="center" prop="coolPumpHzFeedback2" width="130"/>
      <el-table-column label="冷冻泵频率反馈3" align="center" prop="coolPumpHzFeedback3" width="130"/>
      <el-table-column label="运行 天 " align="center" prop="runDay" />
      <el-table-column label="运行 时" align="center" prop="runHour" />
      <el-table-column label="螺杆机轮值运行 时" align="center" prop="screwRotateRunHour" width="140"/>
      <el-table-column label="螺杆机轮值运行 分" align="center" prop="screwRotateRunMin" width="140"/>
      <el-table-column label="冷冻水泵轮值运行 时" align="center" prop="coolPumpRotateRunHour" width="145"/>
      <el-table-column label="冷冻水泵轮值运行 分" align="center" prop="coolPumpRotateRunMin" width="145"/>
      <el-table-column label="螺杆机开度1" align="center" prop="screwOpen1" width="95"/>
      <el-table-column label="螺杆机开度2" align="center" prop="screwOpen2" width="95"/>
      <el-table-column label="螺杆机开度3" align="center" prop="screwOpen3" width="95"/>
      <el-table-column label="读设置冷冻水出水温度1" align="center" prop="readSetCoolWaterTemp1" width="160"/>
      <el-table-column label="冷冻出水温度1" align="center" prop="freezingOutTemp1" width="110"/>
      <el-table-column label="冷冻回水温度1" align="center" prop="freezingRetTemp1" width="110"/>
      <el-table-column label="冷却出水温度1" align="center" prop="coolDownOutTemp1" width="110"/>
      <el-table-column label="冷却回水温度1" align="center" prop="coolDownRetTemp1" width="110"/>
      <el-table-column label="压缩机电流1" align="center" prop="compressorCurrent1" width="100"/>
      <el-table-column label="水流开关状态1" align="center" prop="flowSwitchStatus1" width="110"/>
      <el-table-column label="读设置冷冻水出水温度2" align="center" prop="readSetCoolWaterTemp2" width="160"/>
      <el-table-column label="冷冻出水温度2" align="center" prop="freezingOutTemp2" width="110"/>
      <el-table-column label="冷冻回水温度2" align="center" prop="freezingRetTemp2" width="110"/>
      <el-table-column label="冷却出水温度2" align="center" prop="coolDownOutTemp2" width="110"/>
      <el-table-column label="冷却回水温度2" align="center" prop="coolDownRetTemp2" width="110"/>
      <el-table-column label="压缩机电流2" align="center" prop="compressorCurrent2" width="100"/>
      <el-table-column label="水流开关状态2" align="center" prop="flowSwitchStatus2" width="110"/>
      <el-table-column label="读设置冷冻水出水温度3" align="center" prop="readSetCoolWaterTemp3" width="160"/>
      <el-table-column label="冷冻出水温度3" align="center" prop="freezingOutTemp3" width="110"/>
      <el-table-column label="冷冻回水温度3" align="center" prop="freezingRetTemp3" width="110"/>
      <el-table-column label="冷却出水温度3" align="center" prop="coolDownOutTemp3" width="110"/>
      <el-table-column label="冷却回水温度3" align="center" prop="coolDownRetTemp3" width="110"/>
      <el-table-column label="压缩机电流3" align="center" prop="compressorCurrent3" width="100"/>
      <el-table-column label="水流开关状态3" align="center" prop="flowSwitchStatus3" width="110"/>
      <el-table-column label="冷冻泵故障保护状态1" align="center" prop="coolPumpFaultProtectionStatus1" width="150"/>
      <el-table-column label="冷冻泵故障保护状态2" align="center" prop="coolPumpFaultProtectionStatus2" width="150"/>
      <el-table-column label="冷冻泵故障保护状态3" align="center" prop="coolPumpFaultProtectionStatus3" width="150"/>
      <el-table-column label="螺杆机故障状态1" align="center" prop="screwFaultStatus1" width="120"/>
      <el-table-column label="螺杆机故障状态2" align="center" prop="screwFaultStatus2" width="120"/>
      <el-table-column label="螺杆机故障状态3" align="center" prop="screwFaultStatus3" width="120"/>
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

    <!-- 添加或修改螺杆机数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="开启冷却塔提示" prop="openCoolTowerHint">
          <el-input v-model="form.openCoolTowerHint" placeholder="请输入开启冷却塔提示" />
        </el-form-item>
        <el-form-item label="螺杆机运行状态1" prop="screwStatus1">
          <el-input v-model="form.screwStatus1" placeholder="请输入螺杆机运行状态1" />
        </el-form-item>
        <el-form-item label="螺杆机运行状态2" prop="screwStatus2">
          <el-input v-model="form.screwStatus2" placeholder="请输入螺杆机运行状态2" />
        </el-form-item>
        <el-form-item label="螺杆机运行状态3" prop="screwStatus3">
          <el-input v-model="form.screwStatus3" placeholder="请输入螺杆机运行状态3" />
        </el-form-item>
        <el-form-item label="冷冻水泵运行状态1" prop="coolWaterPumpStatus1">
          <el-input v-model="form.coolWaterPumpStatus1" placeholder="请输入冷冻水泵运行状态1" />
        </el-form-item>
        <el-form-item label="冷冻水泵运行状态2" prop="coolWaterPumpStatus2">
          <el-input v-model="form.coolWaterPumpStatus2" placeholder="请输入冷冻水泵运行状态2" />
        </el-form-item>
        <el-form-item label="冷冻水泵运行状态3" prop="coolWaterPumpStatus3">
          <el-input v-model="form.coolWaterPumpStatus3" placeholder="请输入冷冻水泵运行状态3" />
        </el-form-item>
        <el-form-item label="冷冻水泵远程状态1" prop="coolWaterPumpRemoteStatus1">
          <el-input v-model="form.coolWaterPumpRemoteStatus1" placeholder="请输入冷冻水泵远程状态1" />
        </el-form-item>
        <el-form-item label="冷冻水泵远程状态2" prop="coolWaterPumpRemoteStatus2">
          <el-input v-model="form.coolWaterPumpRemoteStatus2" placeholder="请输入冷冻水泵远程状态2" />
        </el-form-item>
        <el-form-item label="冷冻水泵远程状态3" prop="coolWaterPumpRemoteStatus3">
          <el-input v-model="form.coolWaterPumpRemoteStatus3" placeholder="请输入冷冻水泵远程状态3" />
        </el-form-item>
        <el-form-item label="螺杆机冷冻/却阀开状态1" prop="screwCoolStatus1">
          <el-input v-model="form.screwCoolStatus1" placeholder="请输入螺杆机冷冻/却阀开状态1" />
        </el-form-item>
        <el-form-item label="螺杆机冷冻/却阀开状态2" prop="screwCoolStatus2">
          <el-input v-model="form.screwCoolStatus2" placeholder="请输入螺杆机冷冻/却阀开状态2" />
        </el-form-item>
        <el-form-item label="螺杆机冷冻/却阀开状态3" prop="screwCoolStatus3">
          <el-input v-model="form.screwCoolStatus3" placeholder="请输入螺杆机冷冻/却阀开状态3" />
        </el-form-item>
        <el-form-item label="冷冻系统供回水压差" prop="coolSystemReturn">
          <el-input v-model="form.coolSystemReturn" placeholder="请输入冷冻系统供回水压差" />
        </el-form-item>
        <el-form-item label="冷冻系统回水压力" prop="coolSystemReturnPress">
          <el-input v-model="form.coolSystemReturnPress" placeholder="请输入冷冻系统回水压力" />
        </el-form-item>
        <el-form-item label="压差旁通阀开度" prop="difPressValveOpen">
          <el-input v-model="form.difPressValveOpen" placeholder="请输入压差旁通阀开度" />
        </el-form-item>
        <el-form-item label="冷冻系统出水压力" prop="coolSystemOutPress">
          <el-input v-model="form.coolSystemOutPress" placeholder="请输入冷冻系统出水压力" />
        </el-form-item>
        <el-form-item label="冷冻泵频率反馈1" prop="coolPumpHzFeedback1">
          <el-input v-model="form.coolPumpHzFeedback1" placeholder="请输入冷冻泵频率反馈1" />
        </el-form-item>
        <el-form-item label="冷冻泵频率反馈2" prop="coolPumpHzFeedback2">
          <el-input v-model="form.coolPumpHzFeedback2" placeholder="请输入冷冻泵频率反馈2" />
        </el-form-item>
        <el-form-item label="冷冻泵频率反馈3" prop="coolPumpHzFeedback3">
          <el-input v-model="form.coolPumpHzFeedback3" placeholder="请输入冷冻泵频率反馈3" />
        </el-form-item>
        <el-form-item label="运行 天 " prop="runDay">
          <el-input v-model="form.runDay" placeholder="请输入运行 天 " />
        </el-form-item>
        <el-form-item label="运行 时" prop="runHour">
          <el-input v-model="form.runHour" placeholder="请输入运行 时" />
        </el-form-item>
        <el-form-item label="螺杆机轮值运行 时" prop="screwRotateRunHour">
          <el-input v-model="form.screwRotateRunHour" placeholder="请输入螺杆机轮值运行 时" />
        </el-form-item>
        <el-form-item label="螺杆机轮值运行 分" prop="screwRotateRunMin">
          <el-input v-model="form.screwRotateRunMin" placeholder="请输入螺杆机轮值运行 分" />
        </el-form-item>
        <el-form-item label="冷冻水泵轮值运行 时" prop="coolPumpRotateRunHour">
          <el-input v-model="form.coolPumpRotateRunHour" placeholder="请输入冷冻水泵轮值运行 时" />
        </el-form-item>
        <el-form-item label="冷冻水泵轮值运行 分" prop="coolPumpRotateRunMin">
          <el-input v-model="form.coolPumpRotateRunMin" placeholder="请输入冷冻水泵轮值运行 分" />
        </el-form-item>
        <el-form-item label="螺杆机开度1" prop="screwOpen1">
          <el-input v-model="form.screwOpen1" placeholder="请输入螺杆机开度1" />
        </el-form-item>
        <el-form-item label="螺杆机开度2" prop="screwOpen2">
          <el-input v-model="form.screwOpen2" placeholder="请输入螺杆机开度2" />
        </el-form-item>
        <el-form-item label="螺杆机开度3" prop="screwOpen3">
          <el-input v-model="form.screwOpen3" placeholder="请输入螺杆机开度3" />
        </el-form-item>
        <el-form-item label="读设置冷冻水出水温度1" prop="readSetCoolWaterTemp1">
          <el-input v-model="form.readSetCoolWaterTemp1" placeholder="请输入读设置冷冻水出水温度1" />
        </el-form-item>
        <el-form-item label="冷冻出水温度1" prop="freezingOutTemp1">
          <el-input v-model="form.freezingOutTemp1" placeholder="请输入冷冻出水温度1" />
        </el-form-item>
        <el-form-item label="冷冻回水温度1" prop="freezingRetTemp1">
          <el-input v-model="form.freezingRetTemp1" placeholder="请输入冷冻回水温度1" />
        </el-form-item>
        <el-form-item label="冷却出水温度1" prop="coolDownOutTemp1">
          <el-input v-model="form.coolDownOutTemp1" placeholder="请输入冷却出水温度1" />
        </el-form-item>
        <el-form-item label="冷却回水温度1" prop="coolDownRetTemp1">
          <el-input v-model="form.coolDownRetTemp1" placeholder="请输入冷却回水温度1" />
        </el-form-item>
        <el-form-item label="压缩机电流1" prop="compressorCurrent1">
          <el-input v-model="form.compressorCurrent1" placeholder="请输入压缩机电流1" />
        </el-form-item>
        <el-form-item label="水流开关状态1" prop="flowSwitchStatus1">
          <el-input v-model="form.flowSwitchStatus1" placeholder="请输入水流开关状态1" />
        </el-form-item>
        <el-form-item label="读设置冷冻水出水温度2" prop="readSetCoolWaterTemp2">
          <el-input v-model="form.readSetCoolWaterTemp2" placeholder="请输入读设置冷冻水出水温度2" />
        </el-form-item>
        <el-form-item label="冷冻出水温度2" prop="freezingOutTemp2">
          <el-input v-model="form.freezingOutTemp2" placeholder="请输入冷冻出水温度2" />
        </el-form-item>
        <el-form-item label="冷冻回水温度2" prop="freezingRetTemp2">
          <el-input v-model="form.freezingRetTemp2" placeholder="请输入冷冻回水温度2" />
        </el-form-item>
        <el-form-item label="冷却出水温度2" prop="coolDownOutTemp2">
          <el-input v-model="form.coolDownOutTemp2" placeholder="请输入冷却出水温度2" />
        </el-form-item>
        <el-form-item label="冷却回水温度2" prop="coolDownRetTemp2">
          <el-input v-model="form.coolDownRetTemp2" placeholder="请输入冷却回水温度2" />
        </el-form-item>
        <el-form-item label="压缩机电流2" prop="compressorCurrent2">
          <el-input v-model="form.compressorCurrent2" placeholder="请输入压缩机电流2" />
        </el-form-item>
        <el-form-item label="水流开关状态2" prop="flowSwitchStatus2">
          <el-input v-model="form.flowSwitchStatus2" placeholder="请输入水流开关状态2" />
        </el-form-item>
        <el-form-item label="读设置冷冻水出水温度3" prop="readSetCoolWaterTemp3">
          <el-input v-model="form.readSetCoolWaterTemp3" placeholder="请输入读设置冷冻水出水温度3" />
        </el-form-item>
        <el-form-item label="冷冻出水温度3" prop="freezingOutTemp3">
          <el-input v-model="form.freezingOutTemp3" placeholder="请输入冷冻出水温度3" />
        </el-form-item>
        <el-form-item label="冷冻回水温度3" prop="freezingRetTemp3">
          <el-input v-model="form.freezingRetTemp3" placeholder="请输入冷冻回水温度3" />
        </el-form-item>
        <el-form-item label="冷却出水温度3" prop="coolDownOutTemp3">
          <el-input v-model="form.coolDownOutTemp3" placeholder="请输入冷却出水温度3" />
        </el-form-item>
        <el-form-item label="冷却回水温度3" prop="coolDownRetTemp3">
          <el-input v-model="form.coolDownRetTemp3" placeholder="请输入冷却回水温度3" />
        </el-form-item>
        <el-form-item label="压缩机电流3" prop="compressorCurrent3">
          <el-input v-model="form.compressorCurrent3" placeholder="请输入压缩机电流3" />
        </el-form-item>
        <el-form-item label="水流开关状态3" prop="flowSwitchStatus3">
          <el-input v-model="form.flowSwitchStatus3" placeholder="请输入水流开关状态3" />
        </el-form-item>
        <el-form-item label="冷冻泵故障保护状态1" prop="coolPumpFaultProtectionStatus1">
          <el-input v-model="form.coolPumpFaultProtectionStatus1" placeholder="请输入冷冻泵故障保护状态1" />
        </el-form-item>
        <el-form-item label="冷冻泵故障保护状态2" prop="coolPumpFaultProtectionStatus2">
          <el-input v-model="form.coolPumpFaultProtectionStatus2" placeholder="请输入冷冻泵故障保护状态2" />
        </el-form-item>
        <el-form-item label="冷冻泵故障保护状态3" prop="coolPumpFaultProtectionStatus3">
          <el-input v-model="form.coolPumpFaultProtectionStatus3" placeholder="请输入冷冻泵故障保护状态3" />
        </el-form-item>
        <el-form-item label="螺杆机故障状态1" prop="screwFaultStatus1">
          <el-input v-model="form.screwFaultStatus1" placeholder="请输入螺杆机故障状态1" />
        </el-form-item>
        <el-form-item label="螺杆机故障状态2" prop="screwFaultStatus2">
          <el-input v-model="form.screwFaultStatus2" placeholder="请输入螺杆机故障状态2" />
        </el-form-item>
        <el-form-item label="螺杆机故障状态3" prop="screwFaultStatus3">
          <el-input v-model="form.screwFaultStatus3" placeholder="请输入螺杆机故障状态3" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listMachine, getMachine, delMachine, addMachine, updateMachine } from "@/api/modbus/machine";

export default {
  name: "Machine",
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
      // 螺杆机数据表格数据
      machineList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
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
    /** 查询螺杆机数据列表 */
    getList() {
      this.loading = true;
      if(this.queryParams.timeRange != null) {
        let timeArr = this.queryParams.timeRange;
        this.queryParams.startTime = this.utcFormat(timeArr[0]);
        this.queryParams.endTime = this.utcFormat(timeArr[1]);
      }
      listMachine(this.queryParams).then(response => {
        this.machineList = response.rows;
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
        openCoolTowerHint: null,
        coolTowerRefrigerationStatus: 0,
        systemStartStopStatus: 0,
        screwStatus1: null,
        screwStatus2: null,
        screwStatus3: null,
        coolWaterPumpStatus1: null,
        coolWaterPumpStatus2: null,
        coolWaterPumpStatus3: null,
        coolWaterPumpRemoteStatus1: null,
        coolWaterPumpRemoteStatus2: null,
        coolWaterPumpRemoteStatus3: null,
        coolWaterPumpStatus: 0,
        screwCoolStatus1: null,
        screwCoolStatus2: null,
        screwCoolStatus3: null,
        coolPipelineStatus: 0,
        operationType: null,
        coolSystemReturn: null,
        coolSystemReturnPress: null,
        difPressValveOpen: null,
        coolSystemOutPress: null,
        coolPumpHzFeedback1: null,
        coolPumpHzFeedback2: null,
        coolPumpHzFeedback3: null,
        runDay: null,
        runHour: null,
        screwRotateRunHour: null,
        screwRotateRunMin: null,
        coolPumpRotateRunHour: null,
        coolPumpRotateRunMin: null,
        screwOpen1: null,
        screwOpen2: null,
        screwOpen3: null,
        readSetCoolWaterTemp1: null,
        freezingOutTemp1: null,
        freezingRetTemp1: null,
        coolDownOutTemp1: null,
        coolDownRetTemp1: null,
        compressorCurrent1: null,
        flowSwitchStatus1: null,
        readSetCoolWaterTemp2: null,
        freezingOutTemp2: null,
        freezingRetTemp2: null,
        coolDownOutTemp2: null,
        coolDownRetTemp2: null,
        compressorCurrent2: null,
        flowSwitchStatus2: null,
        readSetCoolWaterTemp3: null,
        freezingOutTemp3: null,
        freezingRetTemp3: null,
        coolDownOutTemp3: null,
        coolDownRetTemp3: null,
        compressorCurrent3: null,
        flowSwitchStatus3: null,
        coolPumpFaultProtectionStatus1: null,
        coolPumpFaultProtectionStatus2: null,
        coolPumpFaultProtectionStatus3: null,
        screwFaultStatus1: null,
        screwFaultStatus2: null,
        screwFaultStatus3: null,
        createTime: null,
        updateTime: null
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
      this.title = "添加螺杆机数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const rowId = row.rowId || this.ids
      getMachine(rowId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改螺杆机数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.rowId != null) {
            updateMachine(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMachine(this.form).then(response => {
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
        return delMachine(rowIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('/modbus/machine/export', {
        ...this.queryParams
      }, `machine_${new Date().getTime()}.xlsx`)
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
