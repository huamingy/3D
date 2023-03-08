package com.ruoyi.project.datasource.modbus.equipment.controller;

import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.framework.web.page.TableDataInfo;
import com.ruoyi.project.datasource.modbus.base.service.IModbusExportService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu6;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusAhu6Service;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Ahu6 Controller
 *
 * @author ruoyi
 * @date 2022-03-28
 */
@RestController
@RequestMapping("/modbus/ahu6")
public class ModbusAhu6Controller extends BaseController
{
    @Resource
    private IModbusAhu6Service modbusAhu6Service;
    @Resource
    private IModbusExportService modbusExportService;

    /**
     * 查询Ahu6 列表
     */
    @GetMapping("/list")
    public TableDataInfo list(ModbusAhu6 modbusAhu6)
    {
        startPage();
        List<ModbusAhu6> list = modbusAhu6Service.selectModbusAhu6List(modbusAhu6);
        return getDataTable(list);
    }

    /**
     * 导出Ahu6 列表
     */
    @Log(title = "导出Ahu6列表", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, ModbusAhu6 modbusAhu6)
    {
        List<ModbusAhu6> list = modbusAhu6Service.selectModbusAhu6List(modbusAhu6);
        ExcelUtil<ModbusAhu6> util = new ExcelUtil<ModbusAhu6>(ModbusAhu6.class, true, modbusAhu6.getFieldExport());
        util.exportExcel(response, list, "Ahu6 数据");
        if (modbusAhu6.getIsRemember()) {
            modbusExportService.saveLastSelected("ModbusAhu6", modbusAhu6.getFieldExport(), modbusAhu6.getIsRead());
        }
    }

    /**
     * 获取Ahu6 详细信息
     */
    @GetMapping(value = "/{rowId}")
    public AjaxResult getInfo(@PathVariable("rowId") String rowId)
    {
        return AjaxResult.success(modbusAhu6Service.selectModbusAhu6ByRowId(rowId));
    }

    /**
     * 新增Ahu6
     */
    @Log(title = "新增Ahu6", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody ModbusAhu6 modbusAhu6)
    {
        return toAjax(modbusAhu6Service.insertModbusAhu6(modbusAhu6));
    }

    /**
     * 修改Ahu6
     */
    @Log(title = "修改Ahu6", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody ModbusAhu6 modbusAhu6)
    {
        return toAjax(modbusAhu6Service.updateModbusAhu6(modbusAhu6));
    }

    /**
     * 删除Ahu6
     */
    @Log(title = "删除Ahu6", businessType = BusinessType.DELETE)
	@DeleteMapping("/{rowIds}")
    public AjaxResult remove(@PathVariable String[] rowIds)
    {
        return toAjax(modbusAhu6Service.deleteModbusAhu6ByRowIds(rowIds));
    }
}
