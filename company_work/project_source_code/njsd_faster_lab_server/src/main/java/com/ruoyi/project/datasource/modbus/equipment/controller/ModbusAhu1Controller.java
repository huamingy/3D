package com.ruoyi.project.datasource.modbus.equipment.controller;

import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.framework.web.page.TableDataInfo;
import com.ruoyi.project.datasource.modbus.base.service.IModbusExportService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu1;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusAhu1Service;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Ahu1 Controller
 *
 * @author ruoyi
 * @date 2022-03-28
 */
@RestController
@RequestMapping("/modbus/ahu1")
public class ModbusAhu1Controller extends BaseController
{
    @Resource
    private IModbusAhu1Service modbusAhu1Service;
    @Resource
    private IModbusExportService modbusExportService;

    /**
     * 查询Ahu1 列表
     * @param modbusAhu1 查询参数
     * @return 列表
     */
    @GetMapping("/list")
    public TableDataInfo list(ModbusAhu1 modbusAhu1)
    {
        startPage();
        List<ModbusAhu1> list = modbusAhu1Service.selectModbusAhu1List(modbusAhu1);
        return getDataTable(list);
    }

    /**
     * 导出Ahu1 列表
     * @param response response
     * @param modbusAhu1 查询参数
     */
    @Log(title = "导出Ahu1列表 ", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, ModbusAhu1 modbusAhu1)
    {
        List<ModbusAhu1> list = modbusAhu1Service.selectModbusAhu1List(modbusAhu1);
        ExcelUtil<ModbusAhu1> util = new ExcelUtil<ModbusAhu1>(ModbusAhu1.class, true, modbusAhu1.getFieldExport());
        util.exportExcel(response, list, "Ahu1 数据");
        if (modbusAhu1.getIsRemember()) {
            modbusExportService.saveLastSelected("ModbusAhu1", modbusAhu1.getFieldExport(), modbusAhu1.getIsRead());
        }
    }

    /**
     * 获取Ahu1 详细信息
     * @param rowId 主键ID
     * @return 详细信息
     */
    @GetMapping(value = "/{rowId}")
    public AjaxResult getInfo(@PathVariable("rowId") String rowId)
    {
        return AjaxResult.success(modbusAhu1Service.selectModbusAhu1ByRowId(rowId));
    }

    /**
     * 新增Ahu1
     * @param modbusAhu1 新增参数
     * @return 新增条数
     */
    @Log(title = "新增Ahu1 ", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody ModbusAhu1 modbusAhu1)
    {
        return toAjax(modbusAhu1Service.insertModbusAhu1(modbusAhu1));
    }

    /**
     * 修改Ahu1
     * @param modbusAhu1 修改参数
     * @return 修改条数
     */
    @Log(title = "修改Ahu1 ", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody ModbusAhu1 modbusAhu1)
    {
        return toAjax(modbusAhu1Service.updateModbusAhu1(modbusAhu1));
    }

    /**
     * 删除Ahu1
     * @param rowIds 需要删除的rowIds
     * @return 删除条数
     */
    @Log(title = "删除Ahu1 ", businessType = BusinessType.DELETE)
	@DeleteMapping("/{rowIds}")
    public AjaxResult remove(@PathVariable String[] rowIds)
    {
        return toAjax(modbusAhu1Service.deleteModbusAhu1ByRowIds(rowIds));
    }
}
