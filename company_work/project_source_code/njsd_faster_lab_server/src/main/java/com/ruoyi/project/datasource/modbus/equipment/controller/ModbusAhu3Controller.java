package com.ruoyi.project.datasource.modbus.equipment.controller;

import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import com.ruoyi.project.datasource.modbus.base.service.IModbusExportService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu3;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusAhu3Service;
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
 * Ahu3 Controller
 *
 * @author ruoyi
 * @date 2022-03-28
 */
@RestController
@RequestMapping("/modbus/ahu3")
public class ModbusAhu3Controller extends BaseController
{
    @Resource
    private IModbusAhu3Service modbusAhu3Service;
    @Resource
    private IModbusExportService modbusExportService;

    /**
     * 查询Ahu3 列表
     * @param modbusAhu3 查询参数
     * @return 列表
     */
    @GetMapping("/list")
    public TableDataInfo list(ModbusAhu3 modbusAhu3)
    {
        startPage();
        List<ModbusAhu3> list = modbusAhu3Service.selectModbusAhu3List(modbusAhu3);
        return getDataTable(list);
    }

    /**
     * 导出Ahu3 列表
     * @param response response
     * @param modbusAhu3 查询参数
     */
    @Log(title = "导出Ahu3列表", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, ModbusAhu3 modbusAhu3)
    {
        List<ModbusAhu3> list = modbusAhu3Service.selectModbusAhu3List(modbusAhu3);
        ExcelUtil<ModbusAhu3> util = new ExcelUtil<ModbusAhu3>(ModbusAhu3.class, true, modbusAhu3.getFieldExport());
        util.exportExcel(response, list, "Ahu3 数据");
        if (modbusAhu3.getIsRemember()) {
            modbusExportService.saveLastSelected("ModbusAhu3", modbusAhu3.getFieldExport(), modbusAhu3.getIsRead());
        }
    }

    /**
     * 获取Ahu3 详细信息
     * @param rowId 主键ID
     * @return 详细信息
     */
    @GetMapping(value = "/{rowId}")
    public AjaxResult getInfo(@PathVariable("rowId") String rowId)
    {
        return AjaxResult.success(modbusAhu3Service.selectModbusAhu3ByRowId(rowId));
    }

    /**
     * 新增Ahu3
     * @param modbusAhu3 新增参数
     * @return 新增条数
     */
    @Log(title = "新增Ahu3", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody ModbusAhu3 modbusAhu3)
    {
        return toAjax(modbusAhu3Service.insertModbusAhu3(modbusAhu3));
    }

    /**
     * 修改Ahu3
     * @param modbusAhu3 修改参数
     * @return 修改条数
     */
    @Log(title = "修改Ahu3", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody ModbusAhu3 modbusAhu3)
    {
        return toAjax(modbusAhu3Service.updateModbusAhu3(modbusAhu3));
    }

    /**
     * 删除Ahu3
     * @param rowIds 需要删除的rowIds
     * @return 删除条数
     */
    @Log(title = "删除Ahu3", businessType = BusinessType.DELETE)
	@DeleteMapping("/{rowIds}")
    public AjaxResult remove(@PathVariable String[] rowIds)
    {
        return toAjax(modbusAhu3Service.deleteModbusAhu3ByRowIds(rowIds));
    }
}
