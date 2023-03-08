package com.ruoyi.project.datasource.chart.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ruoyi.project.datasource.chart.domain.ModbusChartField;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @author niminui
 * @date 2022/5/17 10:51
 */
public interface ModbusChartFieldMapper extends BaseMapper<ModbusChartField> {
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
     * 删除在"配置图表字段"中删除(左移)的字段信息
     * @param tableName 表名称
     * @param different 不同元素
     */
    public void deleteDifferent(@Param("tableName") String tableName, @Param("different") List<String> different);

    /**
     * 根据时间范围、表名及字段名称查询折线图数据
     * @param startDate 开始时间
     * @param endDate 结束时间
     * @param tableName 表名称
     * @param fieldNames 字段list
     * @return
     */
    public List<Map<String, Object>> selectLineChartData(@Param("startDate") String startDate, @Param("endDate") String endDate,
                                                         @Param("tableName") String tableName, @Param("fieldNames") List<String> fieldNames);
}
