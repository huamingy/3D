package com.ruoyi.project.datasource.modbus.equipment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusAhu2;

import java.util.List;

/**
 * @author niminui
 * @date 2022/3/28 14:45
 */
public interface IModbusAhu2Service extends IService<ModbusAhu2> {

    /**
     * 查询Ahu2 列表
     * @param modbusAhu2 查询参数
     * @return 列表
     */
    public List<ModbusAhu2> selectModbusAhu2List(ModbusAhu2 modbusAhu2);

    /**
     * 获取Ahu2 详细信息
     * @param rowId 主键ID
     * @return 详细信息
     */
    public ModbusAhu2 selectModbusAhu2ByRowId(String rowId);

    /**
     * 新增Ahu2
     * @param modbusAhu2 新增参数
     * @return 新增条数
     */
    public int insertModbusAhu2(ModbusAhu2 modbusAhu2);

    /**
     * 修改Ahu2
     * @param modbusAhu2 修改参数
     * @return 修改条数
     */
    public int updateModbusAhu2(ModbusAhu2 modbusAhu2);

    /**
     * 删除Ahu2
     * @param rowIds 需要删除的rowIds
     * @return 删除条数
     */
    public int deleteModbusAhu2ByRowIds(String[] rowIds);

}
