package com.ruoyi.project.datasource.modbus.equipment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu1;
import com.ruoyi.project.datasource.modbus.equipment.mapper.ModbusAhu1Mapper;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusAhu1Service;
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
public class IModbusAhu1ServiceImpl extends ServiceImpl<ModbusAhu1Mapper, ModbusAhu1> implements IModbusAhu1Service {

    @Resource
    private ModbusAhu1Mapper modbusAhu1Mapper;

    /**
     * 查询Ahu1 列表
     * @param modbusAhu1 查询参数
     * @return 列表
     */
    @Override
    public List<ModbusAhu1> selectModbusAhu1List(ModbusAhu1 modbusAhu1) {
        QueryWrapper<ModbusAhu1> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .ge(StringUtils.isNotEmpty(modbusAhu1.getStartTime()), ModbusAhu1::getCreateTime, modbusAhu1.getStartTime())
                .le(StringUtils.isNotEmpty(modbusAhu1.getEndTime()), ModbusAhu1::getCreateTime, modbusAhu1.getEndTime())
                .orderByDesc(ModbusAhu1::getCreateTime);
        return modbusAhu1Mapper.selectList(queryWrapper);
    }

    /**
     * 获取Ahu1 详细信息
     * @param rowId 主键ID
     * @return 详细信息
     */
    @Override
    public ModbusAhu1 selectModbusAhu1ByRowId(String rowId) {
        return modbusAhu1Mapper.selectById(rowId);
    }

    /**
     * 新增Ahu1
     * @param modbusAhu1 新增参数
     * @return 新增条数
     */
    @Override
    public int insertModbusAhu1(ModbusAhu1 modbusAhu1) {
        modbusAhu1.setCreateTime(new Date());
        return modbusAhu1Mapper.insert(modbusAhu1);
    }

    /**
     * 修改Ahu1
     * @param modbusAhu1 修改参数
     * @return 修改条数
     */
    @Override
    public int updateModbusAhu1(ModbusAhu1 modbusAhu1) {
        modbusAhu1.setUpdateTime(new Date());
        return modbusAhu1Mapper.updateById(modbusAhu1);
    }

    /**
     * 删除Ahu1
     * @param rowIds 需要删除的rowIds
     * @return 删除条数
     */
    @Override
    public int deleteModbusAhu1ByRowIds(String[] rowIds) {
        return modbusAhu1Mapper.deleteBatchIds(Arrays.asList(rowIds));
    }
}
