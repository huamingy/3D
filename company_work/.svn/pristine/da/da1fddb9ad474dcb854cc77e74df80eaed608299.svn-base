package com.ruoyi.project.datasource.modbus.equipment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusScrewMachine;

import java.util.List;

/**
 * @author niminui
 * @date 2022/3/28 14:45
 */
public interface IModbusScrewMachineService extends IService<ModbusScrewMachine> {
    /**
     * 查询螺杆机数据列表
     * @param modbusScrewMachine 螺杆机数据
     * @return 螺杆机数据集合
     */
    public List<ModbusScrewMachine> selectModbusScrewMachineList(ModbusScrewMachine modbusScrewMachine);

    /**
     * 查询螺杆机数据
     * @param rowId 螺杆机数据主键
     * @return 螺杆机数据
     */
    public Object selectModbusScrewMachineByRowId(String rowId);

    /**
     * 新增螺杆机数据
     * @param modbusScrewMachine 螺杆机数据
     * @return
     */
    public int insertModbusScrewMachine(ModbusScrewMachine modbusScrewMachine);

    /**
     * 修改螺杆机数据
     * @param modbusScrewMachine 螺杆机数据
     * @return 结果
     */
    public int updateModbusScrewMachine(ModbusScrewMachine modbusScrewMachine);

    /**
     * 批量删除螺杆机数据
     * @param rowIds 需要删除的螺杆机数据主键集合
     * @return 结果
     */
    public int deleteModbusScrewMachineByRowIds(String[] rowIds);
}
