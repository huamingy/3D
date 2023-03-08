package com.ruoyi.project.datasource.modbus.base.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusNewestData;

/**
 * @author niminui
 * @date 2022/3/31 11:46
 */
public interface ModbusNewestDataMapper extends BaseMapper<ModbusNewestData> {

    /**
     * 清空当前表
     */
    public void truncateTable();

}
