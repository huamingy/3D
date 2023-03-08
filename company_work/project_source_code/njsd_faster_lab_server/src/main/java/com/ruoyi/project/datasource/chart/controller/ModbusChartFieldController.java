package com.ruoyi.project.datasource.chart.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.framework.web.page.TableDataInfo;
import com.ruoyi.project.datasource.chart.domain.ModbusChartField;
import com.ruoyi.project.datasource.chart.service.IModbusChartFieldService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author niminui
 * @date 2022/5/17 10:53
 */
@RestController
@RequestMapping("/modbus/chartField")
public class ModbusChartFieldController extends BaseController {

    @Resource
    private IModbusChartFieldService modbusChartFieldService;

    /**
     * 查询modbus图表字段配置列表
     * @param chartField 查询参数
     * @return 列表
     */
    @GetMapping("/list")
    public TableDataInfo list(ModbusChartField chartField)
    {
        startPage();
        List<ModbusChartField> list = modbusChartFieldService.selectChartFieldList(chartField);
        return getDataTable(list);
    }

    /**
     * 根据主键id查询图表字段基本信息
     * @param rowId 主键id
     * @return 图表字段信息
     */
    @GetMapping("getChartField/{rowId}")
    public AjaxResult getChartField(@PathVariable String rowId) {
        return AjaxResult.success(modbusChartFieldService.getById(rowId));
    }

    /**
     * 编辑图表字段信息
     * @param chartField form
     * @return 结果
     */
    @Log(title = "编辑图表字段信息", businessType = BusinessType.UPDATE)
    @PostMapping("editChartField")
    public AjaxResult editChartField(@RequestBody ModbusChartField chartField) {
        ModbusChartField saved = modbusChartFieldService.getById(chartField.getRowId());
        saved.setFieldComment(chartField.getFieldComment());
        saved.setIsSelected(chartField.getIsSelected());
        saved.setFieldStatus(chartField.getFieldStatus());
        saved.setUpdateTime(new Date());
        return AjaxResult.success(modbusChartFieldService.updateById(saved));
    }

    /**
     * 根据表名称查询该表下所有的字段信息
     * @return 列表
     */
    @GetMapping("/selectTableField")
    public AjaxResult selectTableField(@RequestParam String tableName) {
        Map<String, Object> map = new HashMap<>();
        //根据表名称查询mysql的字段信息
        List<ModbusChartField> fields = modbusChartFieldService.selectDatabaseField(tableName);
        //根据表名称查询modbus_chart_field表中已保存的字段信息
        List<String> selectedFields = modbusChartFieldService.selectFieldByTableName(tableName);

        map.put("fieldList", fields);
        map.put("selectedFields", selectedFields);
        return AjaxResult.success(map);
    }

    /**
     * 新增图表字段
     * @param object 参数
     * @return 状态
     */
    @Log(title = "新增图表字段", businessType = BusinessType.INSERT)
    @PostMapping("saveFields")
    public AjaxResult saveFields(@RequestBody JSONObject object) {
        List<String> selectedFields = object.getJSONArray("selectedFields").toJavaList(String.class);
        String parentTableName = object.getString("parentTableName");

        modbusChartFieldService.saveFields(selectedFields, parentTableName);
        return AjaxResult.success();
    }

    /**
     * 修改图表字段状态
     * @param rowId 主键id
     * @param status 修改后的状态
     * @return 结果
     */
    @Log(title = "修改图表字段状态", businessType = BusinessType.UPDATE)
    @PutMapping("changeFieldStats")
    public AjaxResult changeFieldStats(@RequestParam String rowId, @RequestParam String status) {
        ModbusChartField field = modbusChartFieldService.getById(rowId);
        field.setFieldStatus(status);
        return AjaxResult.success(modbusChartFieldService.updateById(field));
    }

    /**
     * 修改图表字段显示状态
     * @param rowId 主键id
     * @param isSelected 修改后的状态
     * @return 结果
     */
    @Log(title = "修改图表字段显示状态", businessType = BusinessType.UPDATE)
    @PutMapping("changeFieldSelected")
    public AjaxResult changeFieldSelected(@RequestParam String rowId, @RequestParam String isSelected) {
        ModbusChartField field = modbusChartFieldService.getById(rowId);
        field.setIsSelected(isSelected);
        return AjaxResult.success(modbusChartFieldService.updateById(field));
    }

    /**
     * 删除图表字段信息
     * @param rowIds 主键id
     * @return 状态
     */
    @Log(title = "删除图表字段", businessType = BusinessType.DELETE)
    @DeleteMapping("/{rowIds}")
    public AjaxResult remove(@PathVariable String[] rowIds)
    {
        return toAjax(modbusChartFieldService.deleteChartFieldByRowIds(rowIds));
    }

    /**
     * 查询已保存的图表字段信息
     * @param tableName 表名
     * @return 列表
     */
    @GetMapping("selectSavedField")
    public AjaxResult selectSavedField(@RequestParam String tableName) {
        QueryWrapper<ModbusChartField> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .eq(ModbusChartField::getParentTableName, tableName)
                .eq(ModbusChartField::getFieldStatus, "1")
                .orderByAsc(ModbusChartField::getOrderNum);
        return AjaxResult.success(modbusChartFieldService.list(queryWrapper));
    }

    /**
     * 修改图表字段是否被选中状态
     * @param rowId 主键id
     * @param status 修改后的状态
     * @return
     */
    @Log(title = "修改图表字段是否被选中状态", businessType = BusinessType.UPDATE)
    @PutMapping("changeSelected")
    public AjaxResult changeSelected(@RequestParam String rowId, @RequestParam String status) {
        ModbusChartField field = modbusChartFieldService.getById(rowId);
        field.setIsSelected(status);
        return AjaxResult.success(modbusChartFieldService.updateById(field));
    }
}
