package com.ruoyi.project.datasource.modbus.equipment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu2;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu3;
import com.ruoyi.project.datasource.modbus.equipment.mapper.ModbusAhu3Mapper;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusAhu3Service;
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
public class IModbusAhu3ServiceImpl extends ServiceImpl<ModbusAhu3Mapper, ModbusAhu3> implements IModbusAhu3Service {

    @Resource
    private ModbusAhu3Mapper modbusAhu3Mapper;

    /**
     * 查询Ahu3
     * @param rowId Ahu3 主键
     * @return Ahu3
     */
    @Override
    public ModbusAhu3 selectModbusAhu3ByRowId(String rowId) {
        return modbusAhu3Mapper.selectById(rowId);
    }

    /**
     * 查询Ahu3 列表
     * @param modbusAhu3 Ahu3
     * @return Ahu3 集合
     */
    @Override
    public List<ModbusAhu3> selectModbusAhu3List(ModbusAhu3 modbusAhu3) {
        QueryWrapper<ModbusAhu3> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .ge(StringUtils.isNotEmpty(modbusAhu3.getStartTime()), ModbusAhu3::getCreateTime, modbusAhu3.getStartTime())
                .le(StringUtils.isNotEmpty(modbusAhu3.getEndTime()), ModbusAhu3::getCreateTime, modbusAhu3.getEndTime())
                .orderByDesc(ModbusAhu3::getCreateTime);
        return modbusAhu3Mapper.selectList(queryWrapper);
    }

    /**
     * 新增Ahu3
     * @param modbusAhu3 Ahu3
     * @return 结果
     */
    @Override
    public int insertModbusAhu3(ModbusAhu3 modbusAhu3) {
        modbusAhu3.setCreateTime(new Date());
        return modbusAhu3Mapper.insert(modbusAhu3);
    }

    /**
     * 修改Ahu3
     * @param modbusAhu3 Ahu3
     * @return 结果
     */
    @Override
    public int updateModbusAhu3(ModbusAhu3 modbusAhu3) {
        modbusAhu3.setUpdateTime(new Date());
        return modbusAhu3Mapper.updateById(modbusAhu3);
    }

    /**
     * 批量删除Ahu3
     * @param rowIds 需要删除的Ahu3 主键集合
     * @return 结果
     */
    @Override
    public int deleteModbusAhu3ByRowIds(String[] rowIds) {
        return modbusAhu3Mapper.deleteBatchIds(Arrays.asList(rowIds));
    }
}
