<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch">
      <el-form-item label="实体类名称" prop="className">
        <el-input
          v-model="queryParams.className"
          placeholder="请输入实体类名称"
          clearable
          @keyup.enter.native="handleQuery"
          style="width: 160px;"
        />
      </el-form-item>
      <el-form-item label="系统名称" prop="systemName" style="margin-left: 10px;">
        <el-input
          v-model="queryParams.systemName"
          placeholder="请输入系统名称"
          clearable
          @keyup.enter.native="handleQuery"
          style="width: 160px;"
        />
      </el-form-item>
      <el-form-item label="IP地址" prop="systemIpHost" style="margin-left: 10px;">
        <el-input
          v-model="queryParams.systemIpHost"
          placeholder="请输入IP地址"
          clearable
          @keyup.enter.native="handleQuery"
          style="width: 160px;"
        />
      </el-form-item>
      <el-form-item label="系统状态" prop="status" style="margin-left: 10px;">
        <el-select v-model="queryParams.status" placeholder="请选择系统状态" clearable size="small" style="width: 9.25rem;">
          <el-option
            v-for="status in statusList"
            :key="status.value"
            :label="status.label"
            :value="status.value"
          />
        </el-select>
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

    <el-table v-loading="loading" :data="entityList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" fixed/>
      <el-table-column label="系统名称" align="center" prop="systemName" width="120" fixed/>
      <el-table-column label="数据表名称" align="center" prop="tableName" width="200"/>
      <el-table-column label="系统IP地址" align="center" prop="systemIpHost" width="120"/>
      <el-table-column label="系统端口号" align="center" prop="systemPort" width="90"/>
      <el-table-column label="从机地址" align="center" prop="slaveId" />
      <el-table-column label="实体类名称" align="center" prop="className" width="170"/>
      <el-table-column label="类所在路径" align="center" prop="classPath" width="270"/>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" type="success">启用</el-tag>
          <el-tag v-else type="info">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" :formatter="dateFormat" width="150"/>
      <el-table-column label="最后更新时间" align="center" prop="updateTime" :formatter="dateFormat" width="150"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
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

    <!-- 添加或修改超快楼系统对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" :close-on-click-modal="false" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item label="系统名称" prop="systemName">
          <el-input v-model="form.systemName" placeholder="请输入系统名称" />
        </el-form-item>
        <el-form-item label="数据表名称" prop="tableName">
          <el-select v-model="form.tableName" placeholder="请选择数据表" style="width: 100%;">
            <el-option
              v-for="table in modbusTableList"
              :key="table.tableName"
              :label="table.tableComment"
              :value="table.tableName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统IP地址" prop="systemIpHost">
          <el-input v-model="form.systemIpHost" placeholder="如120.0.0.1" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="系统端口号" prop="systemPort">
              <el-input v-model="form.systemPort" placeholder="如8080" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="从机地址" prop="slaveId">
              <el-input v-model="form.slaveId" placeholder="请输入从机地址(默认为1)" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="寄存器读取开始地址" prop="offset">
              <el-input-number v-model="form.offset" :min="0" :max="9999" style="width: 11.25rem;"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="读取的寄存器数量" prop="quantity">
              <el-input v-model="form.quantity" placeholder="如100" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="实体类名称" prop="className">
          <el-input v-model="form.className" placeholder="如modbusxxx" />
        </el-form-item>
        <el-form-item label="类所在路径" prop="classPath">
          <el-input v-model="form.classPath" placeholder="如com.xxx.xxx.xxx" />
        </el-form-item>
        <el-form-item label="系统状态" prop="status">
          <el-switch
            v-model="form.status"
            active-text="启用"
            inactive-text="禁用"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
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
import { listEntity, getEntity, delEntity, addEntity, updateEntity, selectModbusTable } from "@/api/modbus/machineList";

export default {
  name: "Entity",
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
      // 超快楼系统表格数据
      entityList: [],
      // modbus数据表list
      modbusTableList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        systemName: null,
        className: null,
        systemIpHost: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        systemName:[
          { required: true, message: '系统名称不能为空', trigger: 'blur' }
        ],
        systemIpHost:[
          { required: true, message: '系统IP地址不能为空', trigger: 'blur' },
          {
            pattern: /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/,
            message: "请输入格式正确的IP地址",
            trigger: "blur"
          }
        ],
        systemPort:[
          { required: true, message: '系统端口号不能为空', trigger: 'blur' }
        ],
        slaveId:[
          { required: true, message: '从机地址不能为空', trigger: 'blur' }
        ],
        offset:[
          { required: true, message: '寄存器读取开始地址不能为空', trigger: 'blur' }
        ],
        quantity:[
          { required: true, message: '读取的寄存器数量不能为空', trigger: 'blur' }
        ],
        className:[
          { required: true, message: '实体类名称不能为空', trigger: 'blur' }
        ],
        classPath:[
          { required: true, message: '类路径不能为空', trigger: 'blur' }
        ],
      },
      statusList: [
        {value: 1, label: '启用'},
        {value: 0, label: '禁用'}
      ]
    };
  },
  created() {
    this.getList();
    this.selectModbusTable();
  },
  methods: {
    /** 查询超快楼系统列表 */
    getList() {
      this.loading = true;
      listEntity(this.queryParams).then(response => {
        this.entityList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    selectModbusTable() {
      selectModbusTable().then(response => {
        this.modbusTableList = response.data;
      })
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
        systemName: null,
        tableName: null,
        systemIpHost: null,
        systemPort: 502,
        slaveId: 1,
        offset: 0,
        quantity: null,
        className: null,
        classPath: null,
        status: 1,
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
      this.title = "添加超快楼系统";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const rowId = row.rowId || this.ids
      getEntity(rowId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改超快楼系统";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.rowId != null) {
            updateEntity(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addEntity(this.form).then(response => {
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
        return delEntity(rowIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    // 针对时间字符串的format
    dateFormat(row, column){
       let str = row[column.property];
       return (str == '' || str == null) ? '暂无' : str.split('.')[0].replace('T', ' ');
    },
  }
};
</script>
