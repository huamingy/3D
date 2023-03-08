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

    <el-table v-loading="loading" :data="innerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" fixed/>
      <el-table-column label="采集时间" align="center" prop="createTime" width="150" :formatter="dateFormat" fixed/>
      <el-table-column label="故障复位" align="center" prop="faultReset"/>
      <el-table-column label="二次泵运行状态" align="center" prop="secPumpRunStatus" width="120"/>
      <el-table-column label="系统启停状态" align="center" prop="systemStartStopStatus" width="100"/>
      <el-table-column label="二次泵开停状态1" align="center" prop="secPumpStartStopStatus1" width="120"/>
      <el-table-column label="二次泵开停状态2" align="center" prop="secPumpStartStopStatus2" width="120"/>
      <el-table-column label="二次泵轮值运行 时" align="center" prop="secPumpRotateHour" width="130"/>
      <el-table-column label="二次泵轮值运行 分" align="center" prop="secPumpRotateMin" width="130"/>
      <el-table-column label="运行 天" align="center" prop="runDay" />
      <el-table-column label="运行 时" align="center" prop="runHour" />
      <el-table-column label="工艺供水温度" align="center" prop="craftSupWaterTemp" width="100"/>
      <el-table-column label="工艺回水温度" align="center" prop="craftRetWaterTemp" width="100"/>
      <el-table-column label="冷冻侧供水温度" align="center" prop="coolSideSupWaterTemp" width="120"/>
      <el-table-column label="冷冻侧回水温度" align="center" prop="coolSideRetWaterTemp" width="120"/>
      <el-table-column label="工艺冷却供水压力" align="center" prop="craftDownSupPress" width="130"/>
      <el-table-column label="工艺冷却回水压力" align="center" prop="craftDownRetPress" width="130"/>
      <el-table-column label="温控旁通阀开度" align="center" prop="tempValveOpen" width="120"/>
      <el-table-column label="压控旁通阀开度" align="center" prop="pressValveOpen" width="120"/>
      <el-table-column label="二次泵故障1" align="center" prop="secPumpFault1" width="100"/>
      <el-table-column label="二次泵故障2" align="center" prop="secPumpFault2" width="100"/>
      <el-table-column label="漏水检测点故障1" align="center" prop="leakCheckFault1" width="125"/>
      <el-table-column label="漏水检测点故障2" align="center" prop="leakCheckFault2" width="125"/>
      <el-table-column label="漏水检测点故障3" align="center" prop="leakCheckFault3" width="125"/>
      <el-table-column label="漏水检测点故障4" align="center" prop="leakCheckFault4" width="125"/>
      <el-table-column label="漏水检测点故障5" align="center" prop="leakCheckFault5" width="125"/>
      <el-table-column label="漏水检测点故障6" align="center" prop="leakCheckFault6" width="125"/>
      <el-table-column label="漏水检测点故障7" align="center" prop="leakCheckFault7" width="125"/>
      <el-table-column label="漏水检测点故障8" align="center" prop="leakCheckFault8" width="125"/>
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

    <!-- 添加或修改工艺水内机数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="故障复位" prop="faultReset">
          <el-input v-model="form.faultReset" placeholder="请输入故障复位" />
        </el-form-item>
        <el-form-item label="二次泵开停状态1" prop="secPumpStartStopStatus1">
          <el-input v-model="form.secPumpStartStopStatus1" placeholder="请输入二次泵开停状态1" />
        </el-form-item>
        <el-form-item label="二次泵开停状态2" prop="secPumpStartStopStatus2">
          <el-input v-model="form.secPumpStartStopStatus2" placeholder="请输入二次泵开停状态2" />
        </el-form-item>
        <el-form-item label="二次泵轮值运行 时" prop="secPumpRotateHour">
          <el-input v-model="form.secPumpRotateHour" placeholder="请输入二次泵轮值运行 时" />
        </el-form-item>
        <el-form-item label="二次泵轮值运行 分" prop="secPumpRotateMin">
          <el-input v-model="form.secPumpRotateMin" placeholder="请输入二次泵轮值运行 分" />
        </el-form-item>
        <el-form-item label="运行 天" prop="runDay">
          <el-input v-model="form.runDay" placeholder="请输入运行 天" />
        </el-form-item>
        <el-form-item label="运行 时" prop="runHour">
          <el-input v-model="form.runHour" placeholder="请输入运行 时" />
        </el-form-item>
        <el-form-item label="工艺供水温度" prop="craftSupWaterTemp">
          <el-input v-model="form.craftSupWaterTemp" placeholder="请输入工艺供水温度" />
        </el-form-item>
        <el-form-item label="工艺回水温度" prop="craftRetWaterTemp">
          <el-input v-model="form.craftRetWaterTemp" placeholder="请输入工艺回水温度" />
        </el-form-item>
        <el-form-item label="冷冻侧供水温度" prop="coolSideSupWaterTemp">
          <el-input v-model="form.coolSideSupWaterTemp" placeholder="请输入冷冻侧供水温度" />
        </el-form-item>
        <el-form-item label="冷冻侧回水温度" prop="coolSideRetWaterTemp">
          <el-input v-model="form.coolSideRetWaterTemp" placeholder="请输入冷冻侧回水温度" />
        </el-form-item>
        <el-form-item label="工艺冷却供水压力" prop="craftDownSupPress">
          <el-input v-model="form.craftDownSupPress" placeholder="请输入工艺冷却供水压力" />
        </el-form-item>
        <el-form-item label="工艺冷却回水压力" prop="craftDownRetPress">
          <el-input v-model="form.craftDownRetPress" placeholder="请输入工艺冷却回水压力" />
        </el-form-item>
        <el-form-item label="温控旁通阀开度" prop="tempValveOpen">
          <el-input v-model="form.tempValveOpen" placeholder="请输入温控旁通阀开度" />
        </el-form-item>
        <el-form-item label="压控旁通阀开度" prop="pressValveOpen">
          <el-input v-model="form.pressValveOpen" placeholder="请输入压控旁通阀开度" />
        </el-form-item>
        <el-form-item label="二次泵故障1" prop="secPumpFault1">
          <el-input v-model="form.secPumpFault1" placeholder="请输入二次泵故障1" />
        </el-form-item>
        <el-form-item label="二次泵故障2" prop="secPumpFault2">
          <el-input v-model="form.secPumpFault2" placeholder="请输入二次泵故障2" />
        </el-form-item>
        <el-form-item label="漏水检测点故障1" prop="leakCheckFault1">
          <el-input v-model="form.leakCheckFault1" placeholder="请输入漏水检测点故障1" />
        </el-form-item>
        <el-form-item label="漏水检测点故障2" prop="leakCheckFault2">
          <el-input v-model="form.leakCheckFault2" placeholder="请输入漏水检测点故障2" />
        </el-form-item>
        <el-form-item label="漏水检测点故障3" prop="leakCheckFault3">
          <el-input v-model="form.leakCheckFault3" placeholder="请输入漏水检测点故障3" />
        </el-form-item>
        <el-form-item label="漏水检测点故障4" prop="leakCheckFault4">
          <el-input v-model="form.leakCheckFault4" placeholder="请输入漏水检测点故障4" />
        </el-form-item>
        <el-form-item label="漏水检测点故障5" prop="leakCheckFault5">
          <el-input v-model="form.leakCheckFault5" placeholder="请输入漏水检测点故障5" />
        </el-form-item>
        <el-form-item label="漏水检测点故障6" prop="leakCheckFault6">
          <el-input v-model="form.leakCheckFault6" placeholder="请输入漏水检测点故障6" />
        </el-form-item>
        <el-form-item label="漏水检测点故障7" prop="leakCheckFault7">
          <el-input v-model="form.leakCheckFault7" placeholder="请输入漏水检测点故障7" />
        </el-form-item>
        <el-form-item label="漏水检测点故障8" prop="leakCheckFault8">
          <el-input v-model="form.leakCheckFault8" placeholder="请输入漏水检测点故障8" />
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
import { listInner, getInner, delInner, addInner, updateInner } from "@/api/modbus/inner";

export default {
  name: "Inner",
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
      // 工艺水内机数据表格数据
      innerList: [],
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
    /** 查询工艺水内机数据列表 */
    getList() {
      this.loading = true;
      if(this.queryParams.timeRange != null) {
        let timeArr = this.queryParams.timeRange;
        this.queryParams.startTime = this.utcFormat(timeArr[0]);
        this.queryParams.endTime = this.utcFormat(timeArr[1]);
      }
      listInner(this.queryParams).then(response => {
        this.innerList = response.rows;
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
        faultReset: null,
        secPumpRunStatus: 0,
        systemStartStopStatus: 0,
        secPumpStartStopStatus1: null,
        secPumpStartStopStatus2: null,
        secPumpRotateHour: null,
        secPumpRotateMin: null,
        runDay: null,
        runHour: null,
        craftSupWaterTemp: null,
        craftRetWaterTemp: null,
        coolSideSupWaterTemp: null,
        coolSideRetWaterTemp: null,
        craftDownSupPress: null,
        craftDownRetPress: null,
        tempValveOpen: null,
        pressValveOpen: null,
        secPumpFault1: null,
        secPumpFault2: null,
        leakCheckFault1: null,
        leakCheckFault2: null,
        leakCheckFault3: null,
        leakCheckFault4: null,
        leakCheckFault5: null,
        leakCheckFault6: null,
        leakCheckFault7: null,
        leakCheckFault8: null,
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
      this.title = "添加工艺水内机数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const rowId = row.rowId || this.ids
      getInner(rowId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工艺水内机数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.rowId != null) {
            updateInner(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInner(this.form).then(response => {
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
        return delInner(rowIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('/modbus/inner/export', {
        ...this.queryParams
      }, `inner_${new Date().getTime()}.xlsx`)
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
