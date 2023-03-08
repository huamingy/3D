package com.ruoyi.project.datasource.modbus.base.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.SecurityUtils;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusExport;
import com.ruoyi.project.datasource.modbus.base.mapper.ModbusExportMapper;
import com.ruoyi.project.datasource.modbus.base.service.IModbusExportService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author niminui
 * @date 2022/10/9 14:13
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class IModbusExportServiceImpl extends ServiceImpl<ModbusExportMapper, ModbusExport> implements IModbusExportService {

    @Resource
    private ModbusExportMapper modbusExportMapper;

    /**
     * 保存用户本次选择的导出字段
     * @param modbusType modbus类型
     * @param fieldExport 本次导出所选的字段
     * @param isRead 是否记住本次所选的字段
     */
    @Override
    public void saveLastSelected(String modbusType, List<String> fieldExport, String isRead) {
        String fields = String.join(",", fieldExport);
        QueryWrapper<ModbusExport> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .eq(ModbusExport::getModbusType, modbusType)
                .eq(ModbusExport::getUserId, SecurityUtils.getUsername());
        List<ModbusExport> list = modbusExportMapper.selectList(queryWrapper);
        if (list.size() > 0) {
            ModbusExport export = list.get(0);
            export.setLastSelected(fields);
            export.setIsRead(isRead);
            modbusExportMapper.updateById(export);
        } else {
            ModbusExport export = new ModbusExport();
            export.setModbusType(modbusType);
            export.setLastSelected(fields);
            export.setUserId(SecurityUtils.getUsername());
            export.setIsRead(isRead);
            modbusExportMapper.insert(export);
        }
    }

    /**
     * 查找当前用户上次导出时所选字段
     * @param classType modbus类型
     * @return 结果
     */
    @Override
    public List<String> selectLastField(String classType) {
        List<String> fieldList = new ArrayList<>();
        QueryWrapper<ModbusExport> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .eq(ModbusExport::getModbusType, classType)
                .eq(ModbusExport::getUserId, SecurityUtils.getUsername());
        ModbusExport export = modbusExportMapper.selectOne(queryWrapper);
        if (export != null) {
            String[] split = export.getLastSelected().split(",");
            fieldList.addAll(Arrays.asList(split));
        }
        return fieldList;
    }
}
