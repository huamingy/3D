package com.ruoyi.project.datasource.modbus.base.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.ruoyi.framework.aspectj.lang.annotation.Excel;
import com.ruoyi.framework.aspectj.lang.annotation.Log;
import com.ruoyi.framework.aspectj.lang.enums.BusinessType;
import com.ruoyi.framework.web.controller.BaseController;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.framework.web.page.TableDataInfo;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusBaseEntity;
import com.ruoyi.project.datasource.modbus.base.service.IModbusBaseEntityService;
import com.ruoyi.project.datasource.modbus.base.service.IModbusExportService;
import com.ruoyi.project.datasource.modbus.base.vo.FieldVo;
import com.ruoyi.project.datasource.modbus.field.annotation.DevAttributes;
import com.ruoyi.project.datasource.modbus.vo.TableVo;
import io.swagger.annotations.Api;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author niminui
 * @date 2022/3/29 9:32
 */
@Api("超快楼系统管理")
@CrossOrigin
@Controller
@RestController
@RequestMapping("/modbusBaseEntity")
public class ModbusBaseEntityController extends BaseController {

    @Resource
    private IModbusBaseEntityService modbusBaseEntityService;
    @Resource
    private IModbusExportService modbusExportService;
    /**
     * 查询超快楼系统列表
     * @param modbusBaseEntity 查询参数
     * @return 返回系统列表
     */
    @GetMapping("/list")
    public TableDataInfo list(ModbusBaseEntity modbusBaseEntity) {
        startPage();
        List<ModbusBaseEntity> list = modbusBaseEntityService.selectModbusBaseEntityList(modbusBaseEntity);
        return getDataTable(list);
    }

    /**
     * 获取超快楼系统详细信息
     * @param rowId 主键id
     * @return 详细信息
     */
    @GetMapping(value = "/{rowId}")
    public AjaxResult getInfo(@PathVariable("rowId") String rowId)
    {
        return AjaxResult.success(modbusBaseEntityService.selectModbusBaseEntityByRowId(rowId));
    }

    /**
     * 新增超快楼系统
     * @param modbusBaseEntity 新增参数
     * @return 结果
     */
    @Log(title = "超快楼系统", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody ModbusBaseEntity modbusBaseEntity)
    {
        return toAjax(modbusBaseEntityService.insertModbusBaseEntity(modbusBaseEntity));
    }

    /**
     * 修改超快楼系统
     * @param modbusBaseEntity 修改参数
     * @return 结果
     */
    @Log(title = "修改超快楼系统", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody ModbusBaseEntity modbusBaseEntity)
    {
        return toAjax(modbusBaseEntityService.updateModbusBaseEntity(modbusBaseEntity));
    }

    /**
     * 删除超快楼系统
     * @param rowIds 需要删除的rowIds
     * @return 结果
     */
    @Log(title = "删除超快楼系统", businessType = BusinessType.DELETE)
    @DeleteMapping("/{rowIds}")
    public AjaxResult remove(@PathVariable String[] rowIds)
    {
        return toAjax(modbusBaseEntityService.deleteModbusBaseEntityByRowIds(rowIds));
    }

    /**
     * 查询以"modbus"开头的所有表名称
     * @return 结果
     */
    @GetMapping("/selectModbusTable")
    public AjaxResult selectModbusTable() {
        List<TableVo> list = modbusBaseEntityService.selectModbusTable();
        return AjaxResult.success(list);
    }

    /**
     * 根据类的类型查询该类下的所有字段信息
     * @param classType 类型
     * @return 结果
     */
    @GetMapping("/selectEntityField/{classType}")
    public AjaxResult selectEntityField(@PathVariable String classType) throws ClassNotFoundException {
        Map<String, Object> map = new HashMap<>();
        List<FieldVo> fieldList = new ArrayList<>();
        QueryWrapper<ModbusBaseEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda().eq(ModbusBaseEntity::getClassName, classType);
        ModbusBaseEntity entity = modbusBaseEntityService.getOne(queryWrapper);
        Class<?> clazz = Class.forName(entity.getClassPath() + ".domain." + entity.getClassName());
        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            if (field.isAnnotationPresent(Excel.class)) {
                Excel annotation = field.getAnnotation(Excel.class);
                FieldVo fieldVo = new FieldVo(annotation.name(), field.getName());
                fieldList.add(fieldVo);
            }
        }
        map.put("fieldList", fieldList);
        map.put("fieldExport", modbusExportService.selectLastField(classType));
        return AjaxResult.success(map);
    }
}
