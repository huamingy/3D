package com.ruoyi.project.datasource.modbus.equipment.controller;

import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.framework.web.page.TableDataInfo;
import com.ruoyi.project.datasource.modbus.base.service.IModbusExportService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusCoolTower;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusCoolTowerService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 冷却塔数据Controller
 *
 * @author ruoyi
 * @date 2022-03-28
 */
@RestController
@RequestMapping("/modbus/tower")
public class ModbusCoolTowerController extends BaseController
{
    @Resource
    private IModbusCoolTowerService modbusCoolTowerService;
    @Resource
    private IModbusExportService modbusExportService;

    /**
     * 查询冷却塔数据列表
     */
    @GetMapping("/list")
    public TableDataInfo list(ModbusCoolTower modbusCoolTower)
    {
        startPage();
        List<ModbusCoolTower> list = modbusCoolTowerService.selectModbusCoolTowerList(modbusCoolTower);
        return getDataTable(list);
    }

    /**
     * 导出冷却塔数据列表
     */
    @Log(title = "导出冷却塔数据列表", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, ModbusCoolTower modbusCoolTower)
    {
        List<ModbusCoolTower> list = modbusCoolTowerService.selectModbusCoolTowerList(modbusCoolTower);
        ExcelUtil<ModbusCoolTower> util = new ExcelUtil<>(ModbusCoolTower.class, true, modbusCoolTower.getFieldExport());
        util.exportExcel(response, list, "冷却塔数据数据");
        if (modbusCoolTower.getIsRemember()) {
            modbusExportService.saveLastSelected("ModbusCoolTower", modbusCoolTower.getFieldExport(), modbusCoolTower.getIsRead());
        }
    }

    /**
     * 获取冷却塔数据详细信息
     */
    @GetMapping(value = "/{rowId}")
    public AjaxResult getInfo(@PathVariable("rowId") String rowId)
    {
        return AjaxResult.success(modbusCoolTowerService.selectModbusCoolTowerByRowId(rowId));
    }

    /**
     * 新增冷却塔数据
     */
    @Log(title = "新增冷却塔数据", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody ModbusCoolTower modbusCoolTower)
    {
        return toAjax(modbusCoolTowerService.insertModbusCoolTower(modbusCoolTower));
    }

    /**
     * 修改冷却塔数据
     */
    @Log(title = "修改冷却塔数据", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody ModbusCoolTower modbusCoolTower)
    {
        return toAjax(modbusCoolTowerService.updateModbusCoolTower(modbusCoolTower));
    }

    /**
     * 删除冷却塔数据
     */
    @Log(title = "删除冷却塔数据", businessType = BusinessType.DELETE)
	@DeleteMapping("/{rowIds}")
    public AjaxResult remove(@PathVariable String[] rowIds)
    {
        return toAjax(modbusCoolTowerService.deleteModbusCoolTowerByRowIds(rowIds));
    }
}
