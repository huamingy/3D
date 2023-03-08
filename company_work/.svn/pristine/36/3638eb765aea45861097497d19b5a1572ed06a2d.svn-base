package com.ruoyi.project.datasource.modbus.equipment.controller;

import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.framework.web.page.TableDataInfo;
import com.ruoyi.project.datasource.modbus.base.service.IModbusExportService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusCraftOuter;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusCraftOuterService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 工艺水外机数据Controller
 *
 * @author ruoyi
 * @date 2022-03-28
 */
@RestController
@RequestMapping("/modbus/outer")
public class ModbusCraftOuterController extends BaseController
{
    @Resource
    private IModbusCraftOuterService modbusCraftOuterService;
    @Resource
    private IModbusExportService modbusExportService;

    /**
     * 查询工艺水外机数据列表
     */
    @GetMapping("/list")
    public TableDataInfo list(ModbusCraftOuter modbusCraftOuter)
    {
        startPage();
        List<ModbusCraftOuter> list = modbusCraftOuterService.selectModbusCraftOuterList(modbusCraftOuter);
        return getDataTable(list);
    }

    /**
     * 导出工艺水外机数据列表
     */
    @Log(title = "工艺水外机数据", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, ModbusCraftOuter modbusCraftOuter)
    {
        List<ModbusCraftOuter> list = modbusCraftOuterService.selectModbusCraftOuterList(modbusCraftOuter);
        ExcelUtil<ModbusCraftOuter> util = new ExcelUtil<ModbusCraftOuter>(ModbusCraftOuter.class, true, modbusCraftOuter.getFieldExport());
        util.exportExcel(response, list, "工艺水外机数据数据");
        if (modbusCraftOuter.getIsRemember()) {
            modbusExportService.saveLastSelected("ModbusCraftOuter", modbusCraftOuter.getFieldExport(), modbusCraftOuter.getIsRead());
        }
    }

    /**
     * 获取工艺水外机数据详细信息
     */
    @GetMapping(value = "/{rowId}")
    public AjaxResult getInfo(@PathVariable("rowId") String rowId)
    {
        return AjaxResult.success(modbusCraftOuterService.selectModbusCraftOuterByRowId(rowId));
    }

    /**
     * 新增工艺水外机数据
     */
    @Log(title = "工艺水外机数据", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody ModbusCraftOuter modbusCraftOuter)
    {
        return toAjax(modbusCraftOuterService.insertModbusCraftOuter(modbusCraftOuter));
    }

    /**
     * 修改工艺水外机数据
     */
    @Log(title = "工艺水外机数据", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody ModbusCraftOuter modbusCraftOuter)
    {
        return toAjax(modbusCraftOuterService.updateModbusCraftOuter(modbusCraftOuter));
    }

    /**
     * 删除工艺水外机数据
     */
    @Log(title = "工艺水外机数据", businessType = BusinessType.DELETE)
	@DeleteMapping("/{rowIds}")
    public AjaxResult remove(@PathVariable String[] rowIds)
    {
        return toAjax(modbusCraftOuterService.deleteModbusCraftOuterByRowIds(rowIds));
    }
}
