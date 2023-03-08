package com.ruoyi.project.datasource.modbus.equipment.controller;

import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.framework.web.page.TableDataInfo;
import com.ruoyi.project.datasource.modbus.base.service.IModbusExportService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu5;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusAhu5Service;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Ahu5 Controller
 *
 * @author ruoyi
 * @date 2022-03-28
 */
@RestController
@RequestMapping("/modbus/ahu5")
public class ModbusAhu5Controller extends BaseController
{
    @Resource
    private IModbusAhu5Service modbusAhu5Service;
    @Resource
    private IModbusExportService modbusExportService;

    /**
     * 查询Ahu5 列表
     */
    @GetMapping("/list")
    public TableDataInfo list(ModbusAhu5 modbusAhu5)
    {
        startPage();
        List<ModbusAhu5> list = modbusAhu5Service.selectModbusAhu5List(modbusAhu5);
        return getDataTable(list);
    }

    /**
     * 导出Ahu5 列表
     */
    @Log(title = "导出Ahu5列表", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, ModbusAhu5 modbusAhu5)
    {
        List<ModbusAhu5> list = modbusAhu5Service.selectModbusAhu5List(modbusAhu5);
        ExcelUtil<ModbusAhu5> util = new ExcelUtil<ModbusAhu5>(ModbusAhu5.class, true, modbusAhu5.getFieldExport());
        util.exportExcel(response, list, "Ahu5 数据");
        if (modbusAhu5.getIsRemember()) {
            modbusExportService.saveLastSelected("ModbusAhu5", modbusAhu5.getFieldExport(), modbusAhu5.getIsRead());
        }
    }

    /**
     * 获取Ahu5 详细信息
     */
    @GetMapping(value = "/{rowId}")
    public AjaxResult getInfo(@PathVariable("rowId") String rowId)
    {
        return AjaxResult.success(modbusAhu5Service.selectModbusAhu5ByRowId(rowId));
    }

    /**
     * 新增Ahu5
     */
    @Log(title = "新增Ahu5", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody ModbusAhu5 modbusAhu5)
    {
        return toAjax(modbusAhu5Service.insertModbusAhu5(modbusAhu5));
    }

    /**
     * 修改Ahu5
     */
    @Log(title = "修改Ahu5", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody ModbusAhu5 modbusAhu5)
    {
        return toAjax(modbusAhu5Service.updateModbusAhu5(modbusAhu5));
    }

    /**
     * 删除Ahu5
     */
    @Log(title = "删除Ahu5", businessType = BusinessType.DELETE)
	@DeleteMapping("/{rowIds}")
    public AjaxResult remove(@PathVariable String[] rowIds)
    {
        return toAjax(modbusAhu5Service.deleteModbusAhu5ByRowIds(rowIds));
    }
}
