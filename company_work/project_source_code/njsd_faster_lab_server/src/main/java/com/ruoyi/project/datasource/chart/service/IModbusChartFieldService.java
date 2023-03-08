package com.ruoyi.project.datasource.chart.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ruoyi.project.datasource.chart.domain.ModbusChartField;
import com.ruoyi.project.datasource.chart.vo.ChartVo;

import java.text.ParseException;
import java.util.List;

/**
 * @author niminui
 * @date 2022/5/17 10:51
 */
public interface IModbusChartFieldService extends IService<ModbusChartField> {
    /**
     * 查询modbus图表字段配置列表
     * @param chartField 查询参数
     * @return 列表
     */
    public List<ModbusChartField> selectChartFieldList(ModbusChartField chartField);

    /**
     * 根据表名称查询mysql的字段信息
     * @return 列表
     */
    public List<ModbusChartField> selectDatabaseField(String tableName);

    /**
     * 根据表名称查询mysql的温度字段信息
     * @return 列表
     */
    public List<ModbusChartField> selectDatabaseFieldWithTemp(String tableName);

    /**
     * 根据表名称查询modbus_chart_field表中已保存的字段信息
     * @param tableName 表名称
     * @return list
     */
    public List<String> selectFieldByTableName(String tableName);

    /**
     * 保存已选的图表字段
     * @param selectedFields 已选的图表字段
     * @param parentTableName 字段所属表名
     */
    public void saveFields(List<String> selectedFields, String parentTableName);

    /**
     * 删除图表字段信息
     * @param rowIds 主键id
     * @return 状态
     */
    public int deleteChartFieldByRowIds(String[] rowIds);

    /**
     * 根据表名称查询折线图所需的数据
     * @param tableName 表名称
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return 数据
     */
    public ChartVo selectChartElement(String tableName, String startTime, String endTime) throws ParseException;
}
