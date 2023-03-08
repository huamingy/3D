package com.ruoyi.project.datasource.modbus.equipment.controller;

import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.framework.web.page.TableDataInfo;
import com.ruoyi.project.datasource.modbus.base.service.IModbusExportService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusScrewMachine;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusScrewMachineService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 螺杆机数据Controller
 *
 * @author ruoyi
 * @date 2022-03-28
 */
@RestController
@RequestMapping("/modbus/machine")
public class ModbusScrewMachineController extends BaseController
{
    @Resource
    private IModbusScrewMachineService modbusScrewMachineService;
    @Resource
    private IModbusExportService modbusExportService;

    /**
     * 查询螺杆机数据列表
     */
    @GetMapping("/list")
    public TableDataInfo list(ModbusScrewMachine modbusScrewMachine)
    {
        startPage();
        List<ModbusScrewMachine> list = modbusScrewMachineService.selectModbusScrewMachineList(modbusScrewMachine);
        return getDataTable(list);
    }

    /**
     * 导出螺杆机数据列表
     */
    @Log(title = "导出螺杆机数据列表", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, ModbusScrewMachine modbusScrewMachine)
    {
        List<ModbusScrewMachine> list = modbusScrewMachineService.selectModbusScrewMachineList(modbusScrewMachine);
        ExcelUtil<ModbusScrewMachine> util = new ExcelUtil<ModbusScrewMachine>(ModbusScrewMachine.class, true, modbusScrewMachine.getFieldExport());
        util.exportExcel(response, list, "螺杆机数据数据");
        if (modbusScrewMachine.getIsRemember()) {
            modbusExportService.saveLastSelected("ModbusScrewMachine", modbusScrewMachine.getFieldExport(), modbusScrewMachine.getIsRead());
        }
    }

    /**
     * 获取螺杆机数据详细信息
     */
    @GetMapping(value = "/{rowId}")
    public AjaxResult getInfo(@PathVariable("rowId") String rowId)
    {
        return AjaxResult.success(modbusScrewMachineService.selectModbusScrewMachineByRowId(rowId));
    }

    /**
     * 新增螺杆机数据
     */
    @Log(title = "新增螺杆机数据", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody ModbusScrewMachine modbusScrewMachine)
    {
        return toAjax(modbusScrewMachineService.insertModbusScrewMachine(modbusScrewMachine));
    }

    /**
     * 修改螺杆机数据
     */
    @Log(title = "修改螺杆机数据", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody ModbusScrewMachine modbusScrewMachine)
    {
        return toAjax(modbusScrewMachineService.updateModbusScrewMachine(modbusScrewMachine));
    }

    /**
     * 删除螺杆机数据
     */
    @Log(title = "删除螺杆机数据", businessType = BusinessType.DELETE)
	@DeleteMapping("/{rowIds}")
    public AjaxResult remove(@PathVariable String[] rowIds)
    {
        return toAjax(modbusScrewMachineService.deleteModbusScrewMachineByRowIds(rowIds));
    }
}
