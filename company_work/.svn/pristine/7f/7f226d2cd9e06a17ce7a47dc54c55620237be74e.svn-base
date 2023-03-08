package com.ruoyi.project.datasource.modbus.equipment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu7;
import com.ruoyi.project.datasource.modbus.equipment.mapper.ModbusAhu7Mapper;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusAhu7Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * @author niminui
 * @date 2022/3/28 14:45
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class IModbusAhu7ServiceImpl extends ServiceImpl<ModbusAhu7Mapper, ModbusAhu7> implements IModbusAhu7Service {

    @Resource
    private ModbusAhu7Mapper modbusAhu7Mapper;

    /**
     * 查询Ahu7
     * @param rowId Ahu7 主键
     * @return Ahu7
     */
    @Override
    public ModbusAhu7 selectModbusAhu7ByRowId(String rowId) {
        return modbusAhu7Mapper.selectById(rowId);
    }

    /**
     * 查询Ahu7 列表
     * @param modbusAhu7 Ahu7
     * @return Ahu7 集合
     */
    @Override
    public List<ModbusAhu7> selectModbusAhu7List(ModbusAhu7 modbusAhu7) {
        QueryWrapper<ModbusAhu7> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .ge(StringUtils.isNotEmpty(modbusAhu7.getStartTime()), ModbusAhu7::getCreateTime, modbusAhu7.getStartTime())
                .le(StringUtils.isNotEmpty(modbusAhu7.getEndTime()), ModbusAhu7::getCreateTime, modbusAhu7.getEndTime())
                .orderByDesc(ModbusAhu7::getCreateTime);
        return modbusAhu7Mapper.selectList(queryWrapper);
    }

    /**
     * 新增Ahu7
     * @param modbusAhu7 Ahu7
     * @return 结果
     */
    @Override
    public int insertModbusAhu7(ModbusAhu7 modbusAhu7) {
        modbusAhu7.setCreateTime(new Date());
        return modbusAhu7Mapper.insert(modbusAhu7);
    }

    /**
     * 修改Ahu7
     * @param modbusAhu7 Ahu7
     * @return 结果
     */
    @Override
    public int updateModbusAhu7(ModbusAhu7 modbusAhu7) {
        modbusAhu7.setUpdateTime(new Date());
        return modbusAhu7Mapper.updateById(modbusAhu7);
    }

    /**
     * 批量删除Ahu7
     * @param rowIds 需要删除的Ahu7 主键集合
     * @return 结果
     */
    @Override
    public int deleteModbusAhu7ByRowIds(String[] rowIds) {
        return modbusAhu7Mapper.deleteBatchIds(Arrays.asList(rowIds));
    }
}
