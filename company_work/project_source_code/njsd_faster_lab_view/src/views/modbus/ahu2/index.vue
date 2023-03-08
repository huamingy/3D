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

    <el-table v-loading="loading" :data="ahu2List" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" fixed/>
      <el-table-column label="采集时间" align="center" prop="createTime" width="150" :formatter="dateFormat" fixed/>
      <el-table-column label="系统启停_TCP" align="center" prop="systemStartStopTcp" width="110"/>
      <el-table-column label="设定回风温度" align="center" prop="setReturnAirTemperature" width="100"/>
      <el-table-column label="设定回风温度上限" align="center" prop="setReturnAirTemperatureUpperLimit" width="130"/>
      <el-table-column label="设定回风温度下限" align="center" prop="setReturnAirTemperatureLowerLimit" width="130"/>
      <el-table-column label="设定风机频率" align="center" prop="setFanFrequency" width="100"/>
      <el-table-column label="设定新风阀开度" align="center" prop="setNewDamperOpen" width="120"/>
      <el-table-column label="系统运行状态" align="center" prop="systemStatus" width="100"/>
      <el-table-column label="系统启停状态" align="center" prop="systemStartStopStatus" width="100"/>
      <el-table-column label="风机运行状态" align="center" prop="fanStatus" width="100"/>
      <el-table-column label="初始化状态" align="center" prop="initializationStatus" width="90"/>
      <el-table-column label="系统待机状态" align="center" prop="systemStandbyStatus" width="100"/>
      <el-table-column label="风机远程状态" align="center" prop="fanRemotelyStatus" width="100"/>
      <el-table-column label="制热状态" align="center" prop="heatingStatus" />
      <el-table-column label="制冷状态" align="center" prop="refrigerationStatus" />
      <el-table-column label="除湿状态" align="center" prop="dehumidificationStatus" />
      <el-table-column label="加湿状态" align="center" prop="humidificationStatus" />
      <el-table-column label="送风机运行频率" align="center" prop="blowerFrequency" width="120"/>
      <el-table-column label="送风温度" align="center" prop="airSupplyTemp" />
      <el-table-column label="送风湿度" align="center" prop="airSupplyHumidity" />
      <el-table-column label="送风量" align="center" prop="airSupplyAmount" />
      <el-table-column label="新风量" align="center" prop="airNewAmount" />
      <el-table-column label="二次回风阀开度" align="center" prop="secReturnAirValveOpen" width="120"/>
      <el-table-column label="温度1" align="center" prop="temp1" />
      <el-table-column label="温度2" align="center" prop="temp2" />
      <el-table-column label="温度3" align="center" prop="temp3" />
      <el-table-column label="温度4" align="center" prop="temp4" />
      <el-table-column label="温度5" align="center" prop="temp5" />
      <el-table-column label="温度6" align="center" prop="temp6" />
      <el-table-column label="温度7" align="center" prop="temp7" />
      <el-table-column label="温度8 无探头" align="center" prop="temp8NoProbe" width="100"/>
      <el-table-column label="湿度1" align="center" prop="humidity1" />
      <el-table-column label="湿度2" align="center" prop="humidity2" />
      <el-table-column label="湿度3" align="center" prop="humidity3" />
      <el-table-column label="湿度4" align="center" prop="humidity4" />
      <el-table-column label="湿度5" align="center" prop="humidity5" />
      <el-table-column label="湿度6" align="center" prop="humidity6" />
      <el-table-column label="温度平均" align="center" prop="tempAvg" />
      <el-table-column label="湿度平均" align="center" prop="humidityAvg" />
      <el-table-column label="主加热开度" align="center" prop="mainHeatingOpen" width="90"/>
      <el-table-column label="三通阀开度" align="center" prop="threeValveOpen" width="90"/>
      <el-table-column label="加温器开度" align="center" prop="heaterOpen" width="90" />
      <el-table-column label="末端开度1" align="center" prop="endOpen1" />
      <el-table-column label="末端开度2" align="center" prop="endOpen2" />
      <el-table-column label="末端开度3" align="center" prop="endOpen3" />
      <el-table-column label="末端开度4" align="center" prop="endOpen4" />
      <el-table-column label="末端开度5" align="center" prop="endOpen5" />
      <el-table-column label="末端开度6" align="center" prop="endOpen6" />
      <el-table-column label="末端开度7" align="center" prop="endOpen7" />
      <el-table-column label="末端开度8" align="center" prop="endOpen8" />
      <el-table-column label="末端开度" align="center" prop="endOpen" />
      <el-table-column label="运行 天" align="center" prop="runDay" />
      <el-table-column label="运行 时" align="center" prop="runHour" />
      <el-table-column label="运行 分" align="center" prop="runMin" />
      <el-table-column label="运行 秒" align="center" prop="runSec" />
      <el-table-column label="累计 时" align="center" prop="grandTotalHour" />
      <el-table-column label="主变频器故障保护状态" align="center" prop="mainInverterFaultProtectionStatus" width="150"/>
      <el-table-column label="送风失压故障" align="center" prop="airSupplyLossFault" width="100"/>
      <el-table-column label="主加热故障" align="center" prop="mainHeatingFault" width="90"/>
      <el-table-column label="加湿器故障" align="center" prop="humidifierFault" width="90"/>
      <el-table-column label="末端故障1" align="center" prop="endFault1" />
      <el-table-column label="末端故障2" align="center" prop="endFault2" />
      <el-table-column label="末端故障3" align="center" prop="endFault3" />
      <el-table-column label="末端故障4" align="center" prop="endFault4" />
      <el-table-column label="末端故障5" align="center" prop="endFault5" />
      <el-table-column label="末端故障6" align="center" prop="endFault6" />
      <el-table-column label="末端故障7" align="center" prop="endFault7" />
      <el-table-column label="末端故障8" align="center" prop="endFault8" />
      <el-table-column label="故障复位" align="center" prop="faultReset" />
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

    <!-- 添加或修改Ahu2对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="系统启停_TCP" prop="systemStartStopTcp">
          <el-input v-model="form.systemStartStopTcp" placeholder="请输入系统启停_TCP" />
        </el-form-item>
        <el-form-item label="设定回风温度" prop="setReturnAirTemperature">
          <el-input v-model="form.setReturnAirTemperature" placeholder="请输入设定回风温度" />
        </el-form-item>
        <el-form-item label="设定回风温度上限" prop="setReturnAirTemperatureUpperLimit">
          <el-input v-model="form.setReturnAirTemperatureUpperLimit" placeholder="请输入设定回风温度上限" />
        </el-form-item>
        <el-form-item label="设定回风温度下限" prop="setReturnAirTemperatureLowerLimit">
          <el-input v-model="form.setReturnAirTemperatureLowerLimit" placeholder="请输入设定回风温度下限" />
        </el-form-item>
        <el-form-item label="设定风机频率" prop="setFanFrequency">
          <el-input v-model="form.setFanFrequency" placeholder="请输入设定风机频率" />
        </el-form-item>
        <el-form-item label="设定新风阀开度" prop="setNewDamperOpen">
          <el-input v-model="form.setNewDamperOpen" placeholder="请输入设定新风阀开度" />
        </el-form-item>
        <el-form-item label="送风机运行频率" prop="blowerFrequency">
          <el-input v-model="form.blowerFrequency" placeholder="请输入送风机运行频率" />
        </el-form-item>
        <el-form-item label="送风温度" prop="airSupplyTemp">
          <el-input v-model="form.airSupplyTemp" placeholder="请输入送风温度" />
        </el-form-item>
        <el-form-item label="送风湿度" prop="airSupplyHumidity">
          <el-input v-model="form.airSupplyHumidity" placeholder="请输入送风湿度" />
        </el-form-item>
        <el-form-item label="送风量" prop="airSupplyAmount">
          <el-input v-model="form.airSupplyAmount" placeholder="请输入送风量" />
        </el-form-item>
        <el-form-item label="新风量" prop="airNewAmount">
          <el-input v-model="form.airNewAmount" placeholder="请输入新风量" />
        </el-form-item>
        <el-form-item label="二次回风阀开度" prop="secReturnAirValveOpen">
          <el-input v-model="form.secReturnAirValveOpen" placeholder="请输入二次回风阀开度" />
        </el-form-item>
        <el-form-item label="温度1" prop="temp1">
          <el-input v-model="form.temp1" placeholder="请输入温度1" />
        </el-form-item>
        <el-form-item label="温度2" prop="temp2">
          <el-input v-model="form.temp2" placeholder="请输入温度2" />
        </el-form-item>
        <el-form-item label="温度3" prop="temp3">
          <el-input v-model="form.temp3" placeholder="请输入温度3" />
        </el-form-item>
        <el-form-item label="温度4" prop="temp4">
          <el-input v-model="form.temp4" placeholder="请输入温度4" />
        </el-form-item>
        <el-form-item label="温度5" prop="temp5">
          <el-input v-model="form.temp5" placeholder="请输入温度5" />
        </el-form-item>
        <el-form-item label="温度6" prop="temp6">
          <el-input v-model="form.temp6" placeholder="请输入温度6" />
        </el-form-item>
        <el-form-item label="温度7" prop="temp7">
          <el-input v-model="form.temp7" placeholder="请输入温度7" />
        </el-form-item>
        <el-form-item label="温度8 无探头" prop="temp8NoProbe">
          <el-input v-model="form.temp8NoProbe" placeholder="请输入温度8 无探头" />
        </el-form-item>
        <el-form-item label="湿度1" prop="humidity1">
          <el-input v-model="form.humidity1" placeholder="请输入湿度1" />
        </el-form-item>
        <el-form-item label="湿度2" prop="humidity2">
          <el-input v-model="form.humidity2" placeholder="请输入湿度2" />
        </el-form-item>
        <el-form-item label="湿度3" prop="humidity3">
          <el-input v-model="form.humidity3" placeholder="请输入湿度3" />
        </el-form-item>
        <el-form-item label="湿度4" prop="humidity4">
          <el-input v-model="form.humidity4" placeholder="请输入湿度4" />
        </el-form-item>
        <el-form-item label="湿度5" prop="humidity5">
          <el-input v-model="form.humidity5" placeholder="请输入湿度5" />
        </el-form-item>
        <el-form-item label="湿度6" prop="humidity6">
          <el-input v-model="form.humidity6" placeholder="请输入湿度6" />
        </el-form-item>
        <el-form-item label="温度平均" prop="tempAvg">
          <el-input v-model="form.tempAvg" placeholder="请输入温度平均" />
        </el-form-item>
        <el-form-item label="湿度平均" prop="humidityAvg">
          <el-input v-model="form.humidityAvg" placeholder="请输入湿度平均" />
        </el-form-item>
        <el-form-item label="主加热开度" prop="mainHeatingOpen">
          <el-input v-model="form.mainHeatingOpen" placeholder="请输入主加热开度" />
        </el-form-item>
        <el-form-item label="三通阀开度" prop="threeValveOpen">
          <el-input v-model="form.threeValveOpen" placeholder="请输入三通阀开度" />
        </el-form-item>
        <el-form-item label="加温器开度" prop="heaterOpen">
          <el-input v-model="form.heaterOpen" placeholder="请输入加温器开度" />
        </el-form-item>
        <el-form-item label="末端开度1" prop="endOpen1">
          <el-input v-model="form.endOpen1" placeholder="请输入末端开度1" />
        </el-form-item>
        <el-form-item label="末端开度2" prop="endOpen2">
          <el-input v-model="form.endOpen2" placeholder="请输入末端开度2" />
        </el-form-item>
        <el-form-item label="末端开度3" prop="endOpen3">
          <el-input v-model="form.endOpen3" placeholder="请输入末端开度3" />
        </el-form-item>
        <el-form-item label="末端开度4" prop="endOpen4">
          <el-input v-model="form.endOpen4" placeholder="请输入末端开度4" />
        </el-form-item>
        <el-form-item label="末端开度5" prop="endOpen5">
          <el-input v-model="form.endOpen5" placeholder="请输入末端开度5" />
        </el-form-item>
        <el-form-item label="末端开度6" prop="endOpen6">
          <el-input v-model="form.endOpen6" placeholder="请输入末端开度6" />
        </el-form-item>
        <el-form-item label="末端开度7" prop="endOpen7">
          <el-input v-model="form.endOpen7" placeholder="请输入末端开度7" />
        </el-form-item>
        <el-form-item label="末端开度8" prop="endOpen8">
          <el-input v-model="form.endOpen8" placeholder="请输入末端开度8" />
        </el-form-item>
        <el-form-item label="末端开度" prop="endOpen">
          <el-input v-model="form.endOpen" placeholder="请输入末端开度" />
        </el-form-item>
        <el-form-item label="运行 天" prop="runDay">
          <el-input v-model="form.runDay" placeholder="请输入运行 天" />
        </el-form-item>
        <el-form-item label="运行 时" prop="runHour">
          <el-input v-model="form.runHour" placeholder="请输入运行 时" />
        </el-form-item>
        <el-form-item label="运行 分" prop="runMin">
          <el-input v-model="form.runMin" placeholder="请输入运行 分" />
        </el-form-item>
        <el-form-item label="运行 秒" prop="runSec">
          <el-input v-model="form.runSec" placeholder="请输入运行 秒" />
        </el-form-item>
        <el-form-item label="累计 时" prop="grandTotalHour">
          <el-input v-model="form.grandTotalHour" placeholder="请输入累计 时" />
        </el-form-item>
        <el-form-item label="送风失压故障" prop="airSupplyLossFault">
          <el-input v-model="form.airSupplyLossFault" placeholder="请输入送风失压故障" />
        </el-form-item>
        <el-form-item label="主加热故障" prop="mainHeatingFault">
          <el-input v-model="form.mainHeatingFault" placeholder="请输入主加热故障" />
        </el-form-item>
        <el-form-item label="加湿器故障" prop="humidifierFault">
          <el-input v-model="form.humidifierFault" placeholder="请输入加湿器故障" />
        </el-form-item>
        <el-form-item label="末端故障1" prop="endFault1">
          <el-input v-model="form.endFault1" placeholder="请输入末端故障1" />
        </el-form-item>
        <el-form-item label="末端故障2" prop="endFault2">
          <el-input v-model="form.endFault2" placeholder="请输入末端故障2" />
        </el-form-item>
        <el-form-item label="末端故障3" prop="endFault3">
          <el-input v-model="form.endFault3" placeholder="请输入末端故障3" />
        </el-form-item>
        <el-form-item label="末端故障4" prop="endFault4">
          <el-input v-model="form.endFault4" placeholder="请输入末端故障4" />
        </el-form-item>
        <el-form-item label="末端故障5" prop="endFault5">
          <el-input v-model="form.endFault5" placeholder="请输入末端故障5" />
        </el-form-item>
        <el-form-item label="末端故障6" prop="endFault6">
          <el-input v-model="form.endFault6" placeholder="请输入末端故障6" />
        </el-form-item>
        <el-form-item label="末端故障7" prop="endFault7">
          <el-input v-model="form.endFault7" placeholder="请输入末端故障7" />
        </el-form-item>
        <el-form-item label="末端故障8" prop="endFault8">
          <el-input v-model="form.endFault8" placeholder="请输入末端故障8" />
        </el-form-item>
        <el-form-item label="故障复位" prop="faultReset">
          <el-input v-model="form.faultReset" placeholder="请输入故障复位" />
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
import { listAhu2, getAhu2, delAhu2, addAhu2, updateAhu2 } from "@/api/modbus/ahu2";
import fieldDialog from '@/views/modbus/field'

export default {
  name: "Ahu2",
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
      // Ahu2表格数据
      ahu2List: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      exportUrl: '/modbus/ahu2/export',
      exportName: 'ahu2_',
      modbusType: 'ModbusAhu2',
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
    /** 查询Ahu2列表 */
    getList() {
      this.loading = true;
      if(this.queryParams.timeRange != null) {
        let timeArr = this.queryParams.timeRange;
        this.queryParams.startTime = this.utcFormat(timeArr[0]);
        this.queryParams.endTime = this.utcFormat(timeArr[1]);
      }
      listAhu2(this.queryParams).then(response => {
        this.ahu2List = response.rows;
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
        setReturnAirTemperature: null,
        setReturnAirTemperatureUpperLimit: null,
        setReturnAirTemperatureLowerLimit: null,
        setFanFrequency: null,
        setNewDamperOpen: null,
        systemStatus: 0,
        systemStartStopStatus: 0,
        fanStatus: 0,
        initializationStatus: 0,
        systemStandbyStatus: 0,
        fanRemotelyStatus: 0,
        heatingStatus: 0,
        refrigerationStatus: 0,
        dehumidificationStatus: 0,
        humidificationStatus: 0,
        blowerFrequency: null,
        airSupplyTemp: null,
        airSupplyHumidity: null,
        airSupplyAmount: null,
        airNewAmount: null,
        secReturnAirValveOpen: null,
        temp1: null,
        temp2: null,
        temp3: null,
        temp4: null,
        temp5: null,
        temp6: null,
        temp7: null,
        temp8NoProbe: null,
        humidity1: null,
        humidity2: null,
        humidity3: null,
        humidity4: null,
        humidity5: null,
        humidity6: null,
        tempAvg: null,
        humidityAvg: null,
        mainHeatingOpen: null,
        threeValveOpen: null,
        heaterOpen: null,
        endOpen1: null,
        endOpen2: null,
        endOpen3: null,
        endOpen4: null,
        endOpen5: null,
        endOpen6: null,
        endOpen7: null,
        endOpen8: null,
        endOpen: null,
        runDay: null,
        runHour: null,
        runMin: null,
        runSec: null,
        grandTotalHour: null,
        mainInverterFaultProtectionStatus: 0,
        airSupplyLossFault: null,
        mainHeatingFault: null,
        humidifierFault: null,
        endFault1: null,
        endFault2: null,
        endFault3: null,
        endFault4: null,
        endFault5: null,
        endFault6: null,
        endFault7: null,
        endFault8: null,
        faultReset: null,
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
      this.title = "添加Ahu2";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const rowId = row.rowId || this.ids
      getAhu2(rowId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改Ahu2";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.rowId != null) {
            updateAhu2(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAhu2(this.form).then(response => {
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
        return delAhu2(rowIds);
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
