package com.ruoyi.project.datasource.modbus.base.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusTimerField;
import com.ruoyi.project.datasource.modbus.base.vo.TempInnerVo;
import com.ruoyi.project.datasource.modbus.base.vo.TempVo;

import java.math.BigDecimal;

/**
 * @author niminui
 * @date 2022/6/15 15:18
 */
public interface IModbusTimerFieldService extends IService<ModbusTimerField> {
    /**
     * 保存modbusTimer
     * @param timerField 数据
     */
    public void saveTimerField(ModbusTimerField timerField);

    /**
     * 查询系统总平均值（温度、湿度）
     * @return
     */
    public TempInnerVo selectAllAverage();

    /**
     * 查询统计图需要的今日温度、湿度数据
     * @return
     */
    public TempVo selectTodayLineChartData();

    /**
     * 查询最高温度
     * @return
     */
    public BigDecimal selectMaxTemp();

    /**
     * 查询最新的一条数据平均值
     * @return
     */
    public TempInnerVo selectAverageTop();
}
