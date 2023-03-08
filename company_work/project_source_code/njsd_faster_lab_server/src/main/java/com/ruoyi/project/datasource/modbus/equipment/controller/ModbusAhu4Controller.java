package com.ruoyi.project.datasource.modbus.equipment.controller;

import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.framework.web.page.TableDataInfo;
import com.ruoyi.project.datasource.modbus.base.service.IModbusExportService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu4;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusAhu4Service;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Ahu4 Controller
 *
 * @author ruoyi
 * @date 2022-03-28
 */
@RestController
@RequestMapping("/modbus/ahu4")
public class ModbusAhu4Controller extends BaseController
{
    @Resource
    private IModbusAhu4Service modbusAhu4Service;
    @Resource
    private IModbusExportService modbusExportService;

    /**
     * 查询Ahu4 列表
     */
    @GetMapping("/list")
    public TableDataInfo list(ModbusAhu4 modbusAhu4)
    {
        startPage();
        List<ModbusAhu4> list = modbusAhu4Service.selectModbusAhu4List(modbusAhu4);
        return getDataTable(list);
    }

    /**
     * 导出Ahu4 列表
     */
    @Log(title = "导出Ahu4列表", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, ModbusAhu4 modbusAhu4)
    {
        List<ModbusAhu4> list = modbusAhu4Service.selectModbusAhu4List(modbusAhu4);
        ExcelUtil<ModbusAhu4> util = new ExcelUtil<ModbusAhu4>(ModbusAhu4.class, true, modbusAhu4.getFieldExport());
        util.exportExcel(response, list, "Ahu4 数据");
        if (modbusAhu4.getIsRemember()) {
            modbusExportService.saveLastSelected("ModbusAhu4", modbusAhu4.getFieldExport(), modbusAhu4.getIsRead());
        }
    }

    /**
     * 获取Ahu4 详细信息
     */
    @GetMapping(value = "/{rowId}")
    public AjaxResult getInfo(@PathVariable("rowId") String rowId)
    {
        return AjaxResult.success(modbusAhu4Service.selectModbusAhu4ByRowId(rowId));
    }

    /**
     * 新增Ahu4
     */
    @Log(title = "新增Ahu4", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody ModbusAhu4 modbusAhu4)
    {
        return toAjax(modbusAhu4Service.insertModbusAhu4(modbusAhu4));
    }

    /**
     * 修改Ahu4
     */
    @Log(title = "修改Ahu4", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody ModbusAhu4 modbusAhu4)
    {
        return toAjax(modbusAhu4Service.updateModbusAhu4(modbusAhu4));
    }

    /**
     * 删除Ahu4
     */
    @Log(title = "删除Ahu4", businessType = BusinessType.DELETE)
	@DeleteMapping("/{rowIds}")
    public AjaxResult remove(@PathVariable String[] rowIds)
    {
        return toAjax(modbusAhu4Service.deleteModbusAhu4ByRowIds(rowIds));
    }
}
