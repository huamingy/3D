package com.ruoyi.project.datasource.modbus.equipment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusScrewMachine;
import com.ruoyi.project.datasource.modbus.equipment.mapper.ModbusScrewMachineMapper;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusScrewMachineService;
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
public class IModbusScrewMachineServiceImpl extends ServiceImpl<ModbusScrewMachineMapper, ModbusScrewMachine> implements IModbusScrewMachineService {

    @Resource
    private ModbusScrewMachineMapper modbusScrewMachineMapper;

    /**
     * 查询螺杆机数据列表
     * @param modbusScrewMachine 螺杆机数据
     * @return 螺杆机数据集合
     */
    @Override
    public List<ModbusScrewMachine> selectModbusScrewMachineList(ModbusScrewMachine modbusScrewMachine) {
        QueryWrapper<ModbusScrewMachine> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .ge(StringUtils.isNotEmpty(modbusScrewMachine.getStartTime()), ModbusScrewMachine::getCreateTime, modbusScrewMachine.getStartTime())
                .le(StringUtils.isNotEmpty(modbusScrewMachine.getEndTime()), ModbusScrewMachine::getCreateTime, modbusScrewMachine.getEndTime())
                .orderByDesc(ModbusScrewMachine::getCreateTime);
        return modbusScrewMachineMapper.selectList(queryWrapper);
    }

    /**
     * 查询螺杆机数据
     * @param rowId 螺杆机数据主键
     * @return 螺杆机数据
     */
    @Override
    public Object selectModbusScrewMachineByRowId(String rowId) {
        return modbusScrewMachineMapper.selectById(rowId);
    }

    /**
     * 新增螺杆机数据
     * @param modbusScrewMachine 螺杆机数据
     * @return
     */
    @Override
    public int insertModbusScrewMachine(ModbusScrewMachine modbusScrewMachine) {
        modbusScrewMachine.setCreateTime(new Date());
        return modbusScrewMachineMapper.insert(modbusScrewMachine);
    }

    /**
     * 修改螺杆机数据
     * @param modbusScrewMachine 螺杆机数据
     * @return 结果
     */
    @Override
    public int updateModbusScrewMachine(ModbusScrewMachine modbusScrewMachine) {
        modbusScrewMachine.setUpdateTime(new Date());
        return modbusScrewMachineMapper.updateById(modbusScrewMachine);
    }

    /**
     * 批量删除螺杆机数据
     * @param rowIds 需要删除的螺杆机数据主键集合
     * @return 结果
     */
    @Override
    public int deleteModbusScrewMachineByRowIds(String[] rowIds) {
        return modbusScrewMachineMapper.deleteBatchIds(Arrays.asList(rowIds));
    }
}
