<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
      <el-form-item label="所属表名称" prop="parentTableName" label-width="90">
        <el-select @change="getList" v-model="queryParams.parentTableName" placeholder="请选择数据表" style="width: 16.25rem">
          <el-option
            v-for="table in modbusTableList"
            :key="table.tableName"
            :label="table.tableComment"
            :value="table.tableName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字段名称" prop="fieldComment" label-width="90" v-show="showSearch" >
        <el-input
          v-model="queryParams.fieldComment"
          placeholder="请输入字段名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >配置</el-button>
      </el-col>
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
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="fieldList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="字段名称(中)" align="center" prop="fieldComment" min-width="150"/>
      <el-table-column label="字段名称(英)" align="center" prop="fieldName" min-width="250"/>
      <el-table-column label="字段类型" align="center" prop="fieldType" min-width="120"/>
      <el-table-column label="字段状态" align="center" prop="fieldStatus" min-width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.fieldStatus"
            active-color="#13ce66"
            active-value="1"
            inactive-value="0"
            @change="changeFieldStats(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="字段状态显示" align="center" prop="isSelected" min-width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isSelected"
            active-color="#13ce66"
            active-value="1"
            inactive-value="0"
            @change="changeFieldSelected(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" :formatter="dateFormat" min-width="150"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
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

    <!-- 添加或修改modbus图表字段配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-transfer
        :titles="['待选列表', '已选列表']"
        :button-texts="['删除', '添加']"
        :left-default-checked="selectedFields"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入字段名称"
        v-model="selectedFields"
        :data="configFieldList">
      </el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="editTitle" :visible.sync="editOpen" width="500px" append-to-body>
       <el-form ref="form" :model="form" :rules="rules" label-width="120px">
         <el-form-item label="所属表名" prop="parentTableName">
           <el-input v-model="form.parentTableName" :disabled="true"/>
         </el-form-item>
         <el-form-item label="字段名称(英)" prop="fieldName">
           <el-input v-model="form.fieldName" :disabled="true"/>
         </el-form-item>
         <el-form-item label="字段名称(中)" prop="fieldComment">
           <el-input v-model="form.fieldComment" placeholder="请输入字段中文名称" />
         </el-form-item>
         <el-form-item label="字段类型" prop="fieldType">
           <el-input v-model="form.fieldType" :disabled="true"/>
         </el-form-item>
         <el-row>
           <el-col :span="12">
             <el-form-item label="字段状态" prop="fieldStatus">
               <el-switch
                 v-model="form.fieldStatus"
                 active-color="#13ce66"
                 active-value="1"
                 inactive-value="0">
               </el-switch>
             </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item label="默认显示" prop="isSelected">
               <el-switch
                 v-model="form.isSelected"
                 active-color="#13ce66"
                 active-value="1"
                 inactive-value="0">
               </el-switch>
             </el-form-item>
           </el-col>
         </el-row>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button type="primary" @click="editSubmitForm">确 定</el-button>
         <el-button @click="editCancel">取 消</el-button>
       </div>
    </el-dialog>
  </div>
</template>

<script>
import { listField, selectTableField, saveFields, changeFieldStats,
         changeFieldSelected, delField, getChartField, editChartField } from "@/api/chart/chartField";
import { selectModbusTable } from "@/api/modbus/machineList";

export default {
  name: "Field",
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
      // modbus图表字段配置表格数据
      fieldList: [],
      selectedFields: [],
      configFieldList: [],
      // modbus数据表list
      modbusTableList: [],
      // 弹出层标题
      title: "",
      editTitle: "",
      // 是否显示弹出层
      open: false,
      editOpen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parentTableName: 'modbus_ahu1',
        fieldComment: null,
        fieldStatus: null,
      },
      form: {},
      // 表单校验
      rules: {
        fieldComment: [
          { required: true, message: "字段中文名称不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.selectModbusTable();
  },
  methods: {
    selectModbusTable() {
      selectModbusTable().then(response => {
        this.modbusTableList = response.data;
        this.getList();
      })
    },
    /** 查询modbus图表字段配置列表 */
    getList() {
      this.loading = true;
      listField(this.queryParams).then(response => {
        this.fieldList = response.rows;
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
      this.configFieldList = [];
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
    handleEdit(row) {
      this.reset();
      getChartField(row.rowId).then(response => {
        this.form = response.data;
        this.editOpen = true;
        this.editTitle = "修改图表字段基本信息";
      });
    },
    editSubmitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          editChartField(this.form).then(response => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.editCancel();
            this.getList();
          });
        }
      });
    },
    editCancel() {
      this.editOpen = false;
      this.reset();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      const tableName = this.queryParams.parentTableName
      selectTableField(tableName).then(response => {
        this.selectedFields = response.data.selectedFields;
        response.data.fieldList.forEach((field, index) => {
          this.configFieldList.push({
            label: field.fieldComment,
            key: field.fieldName,
          })
        })
        this.open = true;
        this.title = "配置图表字段";
      });
    },
    filterMethod(query, item) {
      return item.label.indexOf(query) > -1;
    },
    /** 提交按钮 */
    submitForm() {
      if (this.selectedFields.length > 0) {
        const data = {
          selectedFields: this.selectedFields,
          parentTableName: this.queryParams.parentTableName
        }
        saveFields(data).then(response => {
          this.open = false;
          this.getList();
          this.$modal.msgSuccess("添加成功");
          this.selectedFields = [];
        })
      } else {
        this.$modal.msgError("已选列表不可为空！");
      }
    },
    changeFieldStats(row) {
      changeFieldStats(row.rowId, row.fieldStatus).then(response => {
        this.$modal.msgSuccess("状态更改成功");
      })
    },
    changeFieldSelected(row) {
      changeFieldSelected(row.rowId, row.isSelected).then(response => {
        this.$modal.msgSuccess("显示状态更改成功");
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const rowIds = row.rowId || this.ids;
      this.$modal.confirm('是否确认删除所选的数据项？').then(function() {
        return delField(rowIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    // 表单重置
    reset() {
      this.form = {
        rowId: undefined,
        parentTableName: undefined,
        fieldName: undefined,
        fieldType: undefined,
        fieldComment: undefined,
        fieldStatus: '0',
        isSelected: undefined,
      };
      this.resetForm("form");
    },
    // 针对时间字符串的format
    dateFormat(row, column){
       let str = row[column.property];
       return (str == '' || str == null) ? '暂无' : str.split('.')[0].replace('T', ' ');
    },
  }
};
</script>
