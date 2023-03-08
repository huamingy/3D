package com.ruoyi.project.datasource.modbus.base.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusNewestData;

import java.util.List;

/**
 * @author niminui
 * @date 2022/3/31 11:46
 */
public interface IModbusNewestDataService extends IService<ModbusNewestData> {
    /**
     * 查询最新一组modbus数据
     * @param modbusType modbusType
     * @return List<ModbusNewestData>
     */
    public List<ModbusNewestData> selectListByModbusType(String modbusType);

    /**
     * 获取modbus最新的一条数据
     * @param modbusType 设备类别
     * @return
     */
    public ModbusNewestData selectListByModbusTypeTop(String modbusType);


    /**
     * 向最新数据表中插入最新的数据
     * @param tempList list
     */
    public void insertNewestData(List<ModbusNewestData> tempList);

}
