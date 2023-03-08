package com.ruoyi.project.datasource.modbus.equipment.controller;

import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import com.ruoyi.project.datasource.modbus.base.service.IModbusExportService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu2;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusAhu2Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.framework.web.page.TableDataInfo;

/**
 * Ahu2 Controller
 *
 * @author ruoyi
 * @date 2022-03-28
 */
@RestController
@RequestMapping("/modbus/ahu2")
public class ModbusAhu2Controller extends BaseController
{
    @Resource
    private IModbusAhu2Service modbusAhu2Service;
    @Resource
    private IModbusExportService modbusExportService;

    /**
     * 查询Ahu2 列表
     * @param modbusAhu2 查询参数
     * @return 列表
     */
    @GetMapping("/list")
    public TableDataInfo list(ModbusAhu2 modbusAhu2)
    {
        startPage();
        List<ModbusAhu2> list = modbusAhu2Service.selectModbusAhu2List(modbusAhu2);
        return getDataTable(list);
    }

    /**
     * 导出Ahu2 列表
     * @param response response
     * @param modbusAhu2 查询参数
     */
    @Log(title = "导出Ahu2列表 ", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, ModbusAhu2 modbusAhu2)
    {
        List<ModbusAhu2> list = modbusAhu2Service.selectModbusAhu2List(modbusAhu2);
        ExcelUtil<ModbusAhu2> util = new ExcelUtil<ModbusAhu2>(ModbusAhu2.class, true, modbusAhu2.getFieldExport());
        util.exportExcel(response, list, "Ahu2 数据");
        if (modbusAhu2.getIsRemember()) {
            modbusExportService.saveLastSelected("ModbusAhu2", modbusAhu2.getFieldExport(), modbusAhu2.getIsRead());
        }
    }

    /**
     * 获取Ahu2 详细信息
     * @param rowId 主键ID
     * @return 详细信息
     */
    @GetMapping(value = "/{rowId}")
    public AjaxResult getInfo(@PathVariable("rowId") String rowId)
    {
        return AjaxResult.success(modbusAhu2Service.selectModbusAhu2ByRowId(rowId));
    }

    /**
     * 新增Ahu2
     * @param modbusAhu2 新增参数
     * @return 新增条数
     */
    @Log(title = "新增Ahu2 ", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody ModbusAhu2 modbusAhu2)
    {
        return toAjax(modbusAhu2Service.insertModbusAhu2(modbusAhu2));
    }

    /**
     * 修改Ahu2
     * @param modbusAhu2 修改参数
     * @return 修改条数
     */
    @Log(title = "修改Ahu2 ", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody ModbusAhu2 modbusAhu2)
    {
        return toAjax(modbusAhu2Service.updateModbusAhu2(modbusAhu2));
    }

    /**
     * 删除Ahu2
     * @param rowIds 需要删除的rowIds
     * @return 删除条数
     */
    @Log(title = "删除Ahu2 ", businessType = BusinessType.DELETE)
	@DeleteMapping("/{rowIds}")
    public AjaxResult remove(@PathVariable String[] rowIds)
    {
        return toAjax(modbusAhu2Service.deleteModbusAhu2ByRowIds(rowIds));
    }
}
