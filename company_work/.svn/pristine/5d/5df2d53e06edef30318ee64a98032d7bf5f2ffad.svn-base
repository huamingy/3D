package com.ruoyi.project.datasource.modbus.equipment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu8;
import com.ruoyi.project.datasource.modbus.equipment.mapper.ModbusAhu8Mapper;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusAhu8Service;
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
public class IModbusAhu8ServiceImpl extends ServiceImpl<ModbusAhu8Mapper, ModbusAhu8> implements IModbusAhu8Service {

    @Resource
    private ModbusAhu8Mapper modbusAhu8Mapper;

    /**
     * 查询Ahu8 列表
     * @param modbusAhu8 Ahu8
     * @return Ahu8 集合
     */
    @Override
    public List<ModbusAhu8> selectModbusAhu8List(ModbusAhu8 modbusAhu8) {
        QueryWrapper<ModbusAhu8> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .ge(StringUtils.isNotEmpty(modbusAhu8.getStartTime()), ModbusAhu8::getCreateTime, modbusAhu8.getStartTime())
                .le(StringUtils.isNotEmpty(modbusAhu8.getEndTime()), ModbusAhu8::getCreateTime, modbusAhu8.getEndTime())
                .orderByDesc(ModbusAhu8::getCreateTime);
        return modbusAhu8Mapper.selectList(queryWrapper);
    }

    /**
     * 查询Ahu8
     * @param rowId Ahu8 主键
     * @return Ahu8
     */
    @Override
    public ModbusAhu8 selectModbusAhu8ByRowId(String rowId) {
        return modbusAhu8Mapper.selectById(rowId);
    }

    /**
     * 新增Ahu8
     * @param modbusAhu8 Ahu8
     * @return 结果
     */
    @Override
    public int insertModbusAhu8(ModbusAhu8 modbusAhu8) {
        modbusAhu8.setCreateTime(new Date());
        return modbusAhu8Mapper.insert(modbusAhu8);
    }

    /**
     * 修改Ahu8
     * @param modbusAhu8 Ahu8
     * @return 结果
     */
    @Override
    public int updateModbusAhu8(ModbusAhu8 modbusAhu8) {
        modbusAhu8.setUpdateTime(new Date());
        return modbusAhu8Mapper.updateById(modbusAhu8);
    }

    /**
     * 批量删除Ahu8
     * @param rowIds 需要删除的Ahu8 主键集合
     * @return 结果
     */
    @Override
    public int deleteModbusAhu8ByRowIds(String[] rowIds) {
        return modbusAhu8Mapper.deleteBatchIds(Arrays.asList(rowIds));
    }
}
