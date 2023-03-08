package com.ruoyi.project.datasource.modbus.equipment.controller;

import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.framework.web.page.TableDataInfo;
import com.ruoyi.project.datasource.modbus.base.service.IModbusExportService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu7;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusAhu7Service;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Ahu7 Controller
 *
 * @author ruoyi
 * @date 2022-03-28
 */
@RestController
@RequestMapping("/modbus/ahu7")
public class ModbusAhu7Controller extends BaseController
{
    @Resource
    private IModbusAhu7Service modbusAhu7Service;
    @Resource
    private IModbusExportService modbusExportService;

    /**
     * 查询Ahu7 列表
     */
    @GetMapping("/list")
    public TableDataInfo list(ModbusAhu7 modbusAhu7)
    {
        startPage();
        List<ModbusAhu7> list = modbusAhu7Service.selectModbusAhu7List(modbusAhu7);
        return getDataTable(list);
    }

    /**
     * 导出Ahu7 列表
     */
    @Log(title = "导出Ahu7列表", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, ModbusAhu7 modbusAhu7)
    {
        List<ModbusAhu7> list = modbusAhu7Service.selectModbusAhu7List(modbusAhu7);
        ExcelUtil<ModbusAhu7> util = new ExcelUtil<ModbusAhu7>(ModbusAhu7.class, true, modbusAhu7.getFieldExport());
        util.exportExcel(response, list, "Ahu7 数据");
        if (modbusAhu7.getIsRemember()) {
            modbusExportService.saveLastSelected("ModbusAhu7", modbusAhu7.getFieldExport(), modbusAhu7.getIsRead());
        }
    }

    /**
     * 获取Ahu7 详细信息
     */
    @GetMapping(value = "/{rowId}")
    public AjaxResult getInfo(@PathVariable("rowId") String rowId)
    {
        return AjaxResult.success(modbusAhu7Service.selectModbusAhu7ByRowId(rowId));
    }

    /**
     * 新增Ahu7
     */
    @Log(title = "新增Ahu7", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody ModbusAhu7 modbusAhu7)
    {
        return toAjax(modbusAhu7Service.insertModbusAhu7(modbusAhu7));
    }

    /**
     * 修改Ahu7
     */
    @Log(title = "修改Ahu7", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody ModbusAhu7 modbusAhu7)
    {
        return toAjax(modbusAhu7Service.updateModbusAhu7(modbusAhu7));
    }

    /**
     * 删除Ahu7
     */
    @Log(title = "删除Ahu7", businessType = BusinessType.DELETE)
	@DeleteMapping("/{rowIds}")
    public AjaxResult remove(@PathVariable String[] rowIds)
    {
        return toAjax(modbusAhu7Service.deleteModbusAhu7ByRowIds(rowIds));
    }
}
