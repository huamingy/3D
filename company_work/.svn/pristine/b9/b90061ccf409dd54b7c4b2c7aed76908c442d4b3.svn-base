package com.ruoyi.project.datasource.modbus.equipment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu2;
import com.ruoyi.project.datasource.modbus.equipment.mapper.ModbusAhu2Mapper;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusAhu2Service;
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
public class IModbusAhu2ServiceImpl extends ServiceImpl<ModbusAhu2Mapper, ModbusAhu2> implements IModbusAhu2Service {

    @Resource
    private ModbusAhu2Mapper modbusAhu2Mapper;

    /**
     * 查询Ahu2 列表
     * @param modbusAhu2 查询参数
     * @return 列表
     */
    @Override
    public List<ModbusAhu2> selectModbusAhu2List(ModbusAhu2 modbusAhu2) {
        QueryWrapper<ModbusAhu2> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .ge(StringUtils.isNotEmpty(modbusAhu2.getStartTime()), ModbusAhu2::getCreateTime, modbusAhu2.getStartTime())
                .le(StringUtils.isNotEmpty(modbusAhu2.getEndTime()), ModbusAhu2::getCreateTime, modbusAhu2.getEndTime())
                .orderByDesc(ModbusAhu2::getCreateTime);
        return modbusAhu2Mapper.selectList(queryWrapper);
    }

    /**
     * 获取Ahu2 详细信息
     * @param rowId 主键ID
     * @return 详细信息
     */
    @Override
    public ModbusAhu2 selectModbusAhu2ByRowId(String rowId) {
        return modbusAhu2Mapper.selectById(rowId);
    }

    /**
     * 新增Ahu2
     * @param modbusAhu2 新增参数
     * @return 新增条数
     */
    @Override
    public int insertModbusAhu2(ModbusAhu2 modbusAhu2) {
        modbusAhu2.setCreateTime(new Date());
        return modbusAhu2Mapper.insert(modbusAhu2);
    }

    /**
     * 修改Ahu2
     * @param modbusAhu2 修改参数
     * @return 修改条数
     */
    @Override
    public int updateModbusAhu2(ModbusAhu2 modbusAhu2) {
        modbusAhu2.setUpdateTime(new Date());
        return modbusAhu2Mapper.updateById(modbusAhu2);
    }

    /**
     * 删除Ahu2
     * @param rowIds 需要删除的rowIds
     * @return 删除条数
     */
    @Override
    public int deleteModbusAhu2ByRowIds(String[] rowIds) {
        return modbusAhu2Mapper.deleteBatchIds(Arrays.asList(rowIds));
    }
}
