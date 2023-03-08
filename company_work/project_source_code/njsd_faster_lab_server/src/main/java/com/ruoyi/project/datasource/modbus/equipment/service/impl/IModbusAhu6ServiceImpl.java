package com.ruoyi.project.datasource.modbus.equipment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu1;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu5;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu6;
import com.ruoyi.project.datasource.modbus.equipment.mapper.ModbusAhu6Mapper;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusAhu6Service;
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
public class IModbusAhu6ServiceImpl extends ServiceImpl<ModbusAhu6Mapper, ModbusAhu6> implements IModbusAhu6Service {

    @Resource
    private ModbusAhu6Mapper modbusAhu6Mapper;

    /**
     * 查询Ahu6
     * @param rowId Ahu6 主键
     * @return Ahu6
     */
    @Override
    public ModbusAhu6 selectModbusAhu6ByRowId(String rowId) {
        return modbusAhu6Mapper.selectById(rowId);
    }

    /**
     * 查询Ahu6 列表
     * @param modbusAhu6 Ahu6
     * @return Ahu6 集合
     */
    @Override
    public List<ModbusAhu6> selectModbusAhu6List(ModbusAhu6 modbusAhu6) {
        QueryWrapper<ModbusAhu6> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .ge(StringUtils.isNotEmpty(modbusAhu6.getStartTime()), ModbusAhu6::getCreateTime, modbusAhu6.getStartTime())
                .le(StringUtils.isNotEmpty(modbusAhu6.getEndTime()), ModbusAhu6::getCreateTime, modbusAhu6.getEndTime())
                .orderByDesc(ModbusAhu6::getCreateTime);
        return modbusAhu6Mapper.selectList(queryWrapper);
    }

    /**
     * 新增Ahu6
     * @param modbusAhu6 Ahu6
     * @return 结果
     */
    @Override
    public int insertModbusAhu6(ModbusAhu6 modbusAhu6) {
        modbusAhu6.setCreateTime(new Date());
        return modbusAhu6Mapper.insert(modbusAhu6);
    }

    /**
     * 修改Ahu6
     * @param modbusAhu6 Ahu6
     * @return 结果
     */
    @Override
    public int updateModbusAhu6(ModbusAhu6 modbusAhu6) {
        modbusAhu6.setUpdateTime(new Date());
        return modbusAhu6Mapper.updateById(modbusAhu6);
    }

    /**
     * 批量删除Ahu6
     * @param rowIds 需要删除的Ahu6 主键集合
     * @return 结果
     */
    @Override
    public int deleteModbusAhu6ByRowIds(String[] rowIds) {
        return modbusAhu6Mapper.deleteBatchIds(Arrays.asList(rowIds));
    }
}
