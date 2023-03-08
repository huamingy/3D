package com.ruoyi.project.datasource.modbus.equipment.controller;

import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.framework.web.page.TableDataInfo;
import com.ruoyi.project.datasource.modbus.base.service.IModbusExportService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusCraftInner;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusCraftInnerService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 工艺水内机数据Controller
 * @author ruoyi
 * @date 2022-03-28
 */
@RestController
@RequestMapping("/modbus/inner")
public class ModbusCraftInnerController extends BaseController
{
    @Resource
    private IModbusCraftInnerService modbusCraftInnerService;
    @Resource
    private IModbusExportService modbusExportService;

    /**
     * 查询工艺水内机数据列表
     */
    @GetMapping("/list")
    public TableDataInfo list(ModbusCraftInner modbusCraftInner)
    {
        startPage();
        List<ModbusCraftInner> list = modbusCraftInnerService.selectModbusCraftInnerList(modbusCraftInner);
        return getDataTable(list);
    }

    /**
     * 导出工艺水内机数据列表
     */
    @Log(title = "导出工艺水内机数据列表", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, ModbusCraftInner modbusCraftInner)
    {
        List<ModbusCraftInner> list = modbusCraftInnerService.selectModbusCraftInnerList(modbusCraftInner);
        ExcelUtil<ModbusCraftInner> util = new ExcelUtil<>(ModbusCraftInner.class, true, modbusCraftInner.getFieldExport());
        util.exportExcel(response, list, "工艺水内机数据数据");
        if (modbusCraftInner.getIsRemember()) {
            modbusExportService.saveLastSelected("ModbusCraftInner", modbusCraftInner.getFieldExport(), modbusCraftInner.getIsRead());
        }
    }

    /**
     * 获取工艺水内机数据详细信息
     */
    @GetMapping(value = "/{rowId}")
    public AjaxResult getInfo(@PathVariable("rowId") String rowId)
    {
        return AjaxResult.success(modbusCraftInnerService.selectModbusCraftInnerByRowId(rowId));
    }

    /**
     * 新增工艺水内机数据
     */
    @Log(title = "新增工艺水内机数据", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody ModbusCraftInner modbusCraftInner)
    {
        return toAjax(modbusCraftInnerService.insertModbusCraftInner(modbusCraftInner));
    }

    /**
     * 修改工艺水内机数据
     */
    @Log(title = "修改工艺水内机数据", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody ModbusCraftInner modbusCraftInner)
    {
        return toAjax(modbusCraftInnerService.updateModbusCraftInner(modbusCraftInner));
    }

    /**
     * 删除工艺水内机数据
     */
    @Log(title = "删除工艺水内机数据", businessType = BusinessType.DELETE)
	@DeleteMapping("/{rowIds}")
    public AjaxResult remove(@PathVariable String[] rowIds)
    {
        return toAjax(modbusCraftInnerService.deleteModbusCraftInnerByRowIds(rowIds));
    }
}
