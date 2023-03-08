package com.ruoyi.project.datasource.modbus.equipment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu5;
import com.ruoyi.project.datasource.modbus.equipment.mapper.ModbusAhu5Mapper;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusAhu5Service;
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
public class IModbusAhu5ServiceImpl extends ServiceImpl<ModbusAhu5Mapper, ModbusAhu5> implements IModbusAhu5Service {

    @Resource
    private ModbusAhu5Mapper modbusAhu5Mapper;

    /**
     * 查询Ahu5
     * @param rowId Ahu5 主键
     * @return Ahu5
     */
    @Override
    public ModbusAhu5 selectModbusAhu5ByRowId(String rowId) {
        return modbusAhu5Mapper.selectById(rowId);
    }

    /**
     * 查询Ahu5 列表
     * @param modbusAhu5 Ahu5
     * @return Ahu5 集合
     */
    @Override
    public List<ModbusAhu5> selectModbusAhu5List(ModbusAhu5 modbusAhu5) {
        QueryWrapper<ModbusAhu5> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .ge(StringUtils.isNotEmpty(modbusAhu5.getStartTime()), ModbusAhu5::getCreateTime, modbusAhu5.getStartTime())
                .le(StringUtils.isNotEmpty(modbusAhu5.getEndTime()), ModbusAhu5::getCreateTime, modbusAhu5.getEndTime())
                .orderByDesc(ModbusAhu5::getCreateTime);
        return modbusAhu5Mapper.selectList(queryWrapper);
    }

    /**
     * 新增Ahu5
     * @param modbusAhu5 Ahu5
     * @return 结果
     */
    @Override
    public int insertModbusAhu5(ModbusAhu5 modbusAhu5) {
        modbusAhu5.setCreateTime(new Date());
        return modbusAhu5Mapper.insert(modbusAhu5);
    }

    /**
     * 修改Ahu5
     * @param modbusAhu5 Ahu5
     * @return 结果
     */
    @Override
    public int updateModbusAhu5(ModbusAhu5 modbusAhu5) {
        modbusAhu5.setUpdateTime(new Date());
        return modbusAhu5Mapper.updateById(modbusAhu5);
    }

    /**
     * 批量删除Ahu5
     * @param rowIds 需要删除的Ahu5 主键集合
     * @return 结果
     */
    @Override
    public int deleteModbusAhu5ByRowIds(String[] rowIds) {
        return modbusAhu5Mapper.deleteBatchIds(Arrays.asList(rowIds));
    }
}
