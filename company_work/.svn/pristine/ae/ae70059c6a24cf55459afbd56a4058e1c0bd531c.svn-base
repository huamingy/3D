package com.ruoyi.project.datasource.modbus.equipment.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusCoolTower;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author niminui
 * @date 2022/3/28 14:38
 */
public interface ModbusCoolTowerMapper extends BaseMapper<ModbusCoolTower> {
    /**
     * 查询冷却塔实时能耗1的每日均值
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return list
     */
    public List<BigDecimal> selectEnergyLineData(@Param("startTime") String startTime, @Param("endTime") String endTime);
}
