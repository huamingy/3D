package com.ruoyi.project.datasource.modbus.equipment.controller;

import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.framework.web.page.TableDataInfo;
import com.ruoyi.project.datasource.modbus.base.service.IModbusExportService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu8;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusAhu8Service;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Ahu8 Controller
 *
 * @author ruoyi
 * @date 2022-03-28
 */
@RestController
@RequestMapping("/modbus/ahu8")
public class ModbusAhu8Controller extends BaseController
{
    @Resource
    private IModbusAhu8Service modbusAhu8Service;
    @Resource
    private IModbusExportService modbusExportService;

    /**
     * 查询Ahu8 列表
     */
    @GetMapping("/list")
    public TableDataInfo list(ModbusAhu8 modbusAhu8)
    {
        startPage();
        List<ModbusAhu8> list = modbusAhu8Service.selectModbusAhu8List(modbusAhu8);
        return getDataTable(list);
    }

    /**
     * 导出Ahu8 列表
     */
    @Log(title = "导出Ahu8列表", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, ModbusAhu8 modbusAhu8)
    {
        List<ModbusAhu8> list = modbusAhu8Service.selectModbusAhu8List(modbusAhu8);
        ExcelUtil<ModbusAhu8> util = new ExcelUtil<ModbusAhu8>(ModbusAhu8.class, true, modbusAhu8.getFieldExport());
        util.exportExcel(response, list, "Ahu8 数据");
        if (modbusAhu8.getIsRemember()) {
            modbusExportService.saveLastSelected("ModbusAhu8", modbusAhu8.getFieldExport(), modbusAhu8.getIsRead());
        }
    }

    /**
     * 获取Ahu8 详细信息
     */
    @GetMapping(value = "/{rowId}")
    public AjaxResult getInfo(@PathVariable("rowId") String rowId)
    {
        return AjaxResult.success(modbusAhu8Service.selectModbusAhu8ByRowId(rowId));
    }

    /**
     * 新增Ahu8
     */
    @Log(title = "新增Ahu8", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody ModbusAhu8 modbusAhu8)
    {
        return toAjax(modbusAhu8Service.insertModbusAhu8(modbusAhu8));
    }

    /**
     * 修改Ahu8
     */
    @Log(title = "修改Ahu8", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody ModbusAhu8 modbusAhu8)
    {
        return toAjax(modbusAhu8Service.updateModbusAhu8(modbusAhu8));
    }

    /**
     * 删除Ahu8
     */
    @Log(title = "删除Ahu8", businessType = BusinessType.DELETE)
	@DeleteMapping("/{rowIds}")
    public AjaxResult remove(@PathVariable String[] rowIds)
    {
        return toAjax(modbusAhu8Service.deleteModbusAhu8ByRowIds(rowIds));
    }
}
