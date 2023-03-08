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

    <el-table v-loading="loading" :data="outerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" fixed/>
      <el-table-column label="采集时间" align="center" prop="createTime" width="150" :formatter="dateFormat" fixed/>
      <el-table-column label="系统启停_TCP" align="center" prop="systemStartStopTcp" width="110"/>
      <el-table-column label="水机故障复位" align="center" prop="waterplaneFaultReset" width="100"/>
      <el-table-column label="水泵开停状态1" align="center" prop="waterPumpStatus1" width="110"/>
      <el-table-column label="水泵开停状态2" align="center" prop="waterPumpStatus2" width="110"/>
      <el-table-column label="系统启停状态" align="center" prop="systemStartStopStatus" width="100"/>
      <el-table-column label="一次泵运行状态" align="center" prop="onePumpStatus" width="120"/>
      <el-table-column label="运行 天" align="center" prop="runDay" />
      <el-table-column label="运行 时" align="center" prop="runHour" />
      <el-table-column label="一次泵轮值运行 时" align="center" prop="onePumpRotateHour" width="130"/>
      <el-table-column label="一次泵轮值运行 分" align="center" prop="onePumpRotateMin" width="130"/>
      <el-table-column label="系统回水温度" align="center" prop="sysRetWaterTemp" width="100"/>
      <el-table-column label="系统出水温度" align="center" prop="sysOutWaterTemp" width="100"/>
      <el-table-column label="外环境温度" align="center" prop="outEnvironmentTemp" width="90"/>
      <el-table-column label="输出载荷%" align="center" prop="outputLoad" width="90"/>
      <el-table-column label="一次泵故障自保1" align="center" prop="onePumpFaultProtect1" width="130"/>
      <el-table-column label="一次泵故障自保2" align="center" prop="onePumpFaultProtect2" width="130"/>
      <el-table-column label="水机故障状态" align="center" prop="waterplaneFaultStatus" width="100"/>
      <el-table-column label="EH水流量" align="center" prop="ehFlow" />
      <el-table-column label="EH进水温度" align="center" prop="ehInWaterTemp" width="100"/>
      <el-table-column label="EH出水温度" align="center" prop="ehOutWaterTemp" width="100"/>
      <el-table-column label="EH实时能耗" align="center" prop="ehRtEnergyCon" width="100"/>
      <el-table-column label="EH总能量" align="center" prop="ehTotalEnergy" />
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

    <!-- 添加或修改工艺水外机数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="系统启停_TCP" prop="systemStartStopTcp">
          <el-input v-model="form.systemStartStopTcp" placeholder="请输入系统启停_TCP" />
        </el-form-item>
        <el-form-item label="水机故障复位" prop="waterplaneFaultReset">
          <el-input v-model="form.waterplaneFaultReset" placeholder="请输入水机故障复位" />
        </el-form-item>
        <el-form-item label="水泵开停状态1" prop="waterPumpStatus1">
          <el-input v-model="form.waterPumpStatus1" placeholder="请输入水泵开停状态1" />
        </el-form-item>
        <el-form-item label="水泵开停状态2" prop="waterPumpStatus2">
          <el-input v-model="form.waterPumpStatus2" placeholder="请输入水泵开停状态2" />
        </el-form-item>
        <el-form-item label="运行 天" prop="runDay">
          <el-input v-model="form.runDay" placeholder="请输入运行 天" />
        </el-form-item>
        <el-form-item label="运行 时" prop="runHour">
          <el-input v-model="form.runHour" placeholder="请输入运行 时" />
        </el-form-item>
        <el-form-item label="一次泵轮值运行 时" prop="onePumpRotateHour">
          <el-input v-model="form.onePumpRotateHour" placeholder="请输入一次泵轮值运行 时" />
        </el-form-item>
        <el-form-item label="一次泵轮值运行 分" prop="onePumpRotateMin">
          <el-input v-model="form.onePumpRotateMin" placeholder="请输入一次泵轮值运行 分" />
        </el-form-item>
        <el-form-item label="系统回水温度" prop="sysRetWaterTemp">
          <el-input v-model="form.sysRetWaterTemp" placeholder="请输入系统回水温度" />
        </el-form-item>
        <el-form-item label="系统出水温度" prop="sysOutWaterTemp">
          <el-input v-model="form.sysOutWaterTemp" placeholder="请输入系统出水温度" />
        </el-form-item>
        <el-form-item label="外环境温度" prop="outEnvironmentTemp">
          <el-input v-model="form.outEnvironmentTemp" placeholder="请输入外环境温度" />
        </el-form-item>
        <el-form-item label="输出载荷%" prop="outputLoad">
          <el-input v-model="form.outputLoad" placeholder="请输入输出载荷%" />
        </el-form-item>
        <el-form-item label="一次泵故障自保1" prop="onePumpFaultProtect1">
          <el-input v-model="form.onePumpFaultProtect1" placeholder="请输入一次泵故障自保1" />
        </el-form-item>
        <el-form-item label="一次泵故障自保2" prop="onePumpFaultProtect2">
          <el-input v-model="form.onePumpFaultProtect2" placeholder="请输入一次泵故障自保2" />
        </el-form-item>
        <el-form-item label="EH水流量" prop="ehFlow">
          <el-input v-model="form.ehFlow" placeholder="请输入EH水流量" />
        </el-form-item>
        <el-form-item label="EH进水温度" prop="ehInWaterTemp">
          <el-input v-model="form.ehInWaterTemp" placeholder="请输入EH进水温度" />
        </el-form-item>
        <el-form-item label="EH出水温度" prop="ehOutWaterTemp">
          <el-input v-model="form.ehOutWaterTemp" placeholder="请输入EH出水温度" />
        </el-form-item>
        <el-form-item label="EH实时能耗" prop="ehRtEnergyCon">
          <el-input v-model="form.ehRtEnergyCon" placeholder="请输入EH实时能耗" />
        </el-form-item>
        <el-form-item label="EH总能量" prop="ehTotalEnergy">
          <el-input v-model="form.ehTotalEnergy" placeholder="请输入EH总能量" />
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
import { listOuter, getOuter, delOuter, addOuter, updateOuter } from "@/api/modbus/outer";

export default {
  name: "Outer",
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
      // 工艺水外机数据表格数据
      outerList: [],
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
    /** 查询工艺水外机数据列表 */
    getList() {
      this.loading = true;
      if(this.queryParams.timeRange != null) {
        let timeArr = this.queryParams.timeRange;
        this.queryParams.startTime = this.utcFormat(timeArr[0]);
        this.queryParams.endTime = this.utcFormat(timeArr[1]);
      }
      listOuter(this.queryParams).then(response => {
        this.outerList = response.rows;
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
        waterplaneFaultReset: null,
        waterPumpStatus1: null,
        waterPumpStatus2: null,
        systemStartStopStatus: 0,
        onePumpStatus: 0,
        runDay: null,
        runHour: null,
        onePumpRotateHour: null,
        onePumpRotateMin: null,
        sysRetWaterTemp: null,
        sysOutWaterTemp: null,
        outEnvironmentTemp: null,
        outputLoad: null,
        onePumpFaultProtect1: null,
        onePumpFaultProtect2: null,
        waterplaneFaultStatus: 0,
        ehFlow: null,
        ehInWaterTemp: null,
        ehOutWaterTemp: null,
        ehRtEnergyCon: null,
        ehTotalEnergy: null
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
      this.title = "添加工艺水外机数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const rowId = row.rowId || this.ids
      getOuter(rowId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工艺水外机数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.rowId != null) {
            updateOuter(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOuter(this.form).then(response => {
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
        return delOuter(rowIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('/modbus/outer/export', {
        ...this.queryParams
      }, `outer_${new Date().getTime()}.xlsx`)
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
