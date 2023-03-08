package com.ruoyi.project.datasource.modbus.base.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusBaseEntity;
import com.ruoyi.project.datasource.modbus.base.vo.DeviceStatusVo;
import com.ruoyi.project.datasource.modbus.vo.TableFieldVo;
import com.ruoyi.project.datasource.modbus.vo.TableVo;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @author niminui
 * @date 2022/3/29 9:30
 */
public interface ModbusBaseEntityMapper extends BaseMapper<ModbusBaseEntity> {

    /**
     * 查询以"modbus"开头的所有表名称
     * @return 结果
     */
    public List<TableVo> selectModbusTable();

    /**
     * 根据表名称查询最新一条记录的时间
     * @param tableName 表名称
     * @return 插入时间
     */
    public Date selectDataTopFromTable(String tableName);

    /**
     * 根据参数查询最近一条数据的文档
     * @param parameterMap 参数
     * @return 文档
     */
    public BigDecimal selectTopData(Map<String, String> parameterMap);

    /**
     * 根据tableList统计全部数据量
     * @return 统计数据
     */
    public Integer selectCountByTable(@Param("tableName") String tableName,
                                      @Param("startTime") String startTime,
                                      @Param("endTime") String endTime);

    /**
     * 查询modbus设备列表及最新更新数据时间，并且查询每一个设备当前状态(1正常，0异常-即无10分钟内数据)
     * @param startTime 开始时间
     * @return list
     */
    public List<DeviceStatusVo> selectDeviceWithStatus(String startTime);

    /**
     * 根据表名称及字段名称查询信息
     * @param tableName 表名称
     * @param fieldName 字段名称
     * @return 数值
     */
    public String selectValueByTableDetails(@Param("tableName") String tableName, @Param("fieldName") String fieldName);

    /**
     * 根据表名及字段列表查询信息
     * @param tableName 表名
     * @param fieldNames 字段列表
     * @return
     */
    public LinkedHashMap<String, BigDecimal> selectTempList(@Param("tableName") String tableName, @Param("fieldNames") List<String> fieldNames);

    /**
     * 根据数据表名称查询表内故障字段
     * @param tableName 数据表名称
     * @return 结果
     */
    public List<TableFieldVo> selectTableFaultField(String tableName);

}
