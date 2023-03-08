package com.ruoyi.project.datasource.modbus.equipment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu4;
import com.ruoyi.project.datasource.modbus.equipment.mapper.ModbusAhu4Mapper;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusAhu4Service;
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
public class IModbusAhu4ServiceImpl extends ServiceImpl<ModbusAhu4Mapper, ModbusAhu4> implements IModbusAhu4Service {

    @Resource
    private ModbusAhu4Mapper modbusAhu4Mapper;

    /**
     * 查询Ahu4
     * @param rowId Ahu4 主键
     * @return Ahu4
     */
    @Override
    public ModbusAhu4 selectModbusAhu4ByRowId(String rowId) {
        return modbusAhu4Mapper.selectById(rowId);
    }

    /**
     * 查询Ahu4 列表
     * @param modbusAhu4 Ahu4
     * @return Ahu4 集合
     */
    @Override
    public List<ModbusAhu4> selectModbusAhu4List(ModbusAhu4 modbusAhu4) {
        QueryWrapper<ModbusAhu4> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .ge(StringUtils.isNotEmpty(modbusAhu4.getStartTime()), ModbusAhu4::getCreateTime, modbusAhu4.getStartTime())
                .le(StringUtils.isNotEmpty(modbusAhu4.getEndTime()), ModbusAhu4::getCreateTime, modbusAhu4.getEndTime())
                .orderByDesc(ModbusAhu4::getCreateTime);
        return modbusAhu4Mapper.selectList(queryWrapper);
    }

    /**
     * 新增Ahu4
     * @param modbusAhu4 Ahu4
     * @return 结果
     */
    @Override
    public int insertModbusAhu4(ModbusAhu4 modbusAhu4) {
        modbusAhu4.setCreateTime(new Date());
        return modbusAhu4Mapper.insert(modbusAhu4);
    }

    /**
     * 修改Ahu4
     * @param modbusAhu4 Ahu4
     * @return 结果
     */
    @Override
    public int updateModbusAhu4(ModbusAhu4 modbusAhu4) {
        modbusAhu4.setUpdateTime(new Date());
        return modbusAhu4Mapper.updateById(modbusAhu4);
    }

    /**
     * 批量删除Ahu4
     * @param rowIds 需要删除的Ahu4 主键集合
     * @return 结果
     */
    @Override
    public int deleteModbusAhu4ByRowIds(String[] rowIds) {
        return modbusAhu4Mapper.deleteBatchIds(Arrays.asList(rowIds));
    }
}
