package com.ruoyi.project.datasource.modbus.equipment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusCoolTower;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author niminui
 * @date 2022/3/28 14:45
 */
public interface IModbusCoolTowerService extends IService<ModbusCoolTower> {
    /**
     * 查询冷却塔数据列表
     * @param modbusCoolTower 冷却塔数据
     * @return 冷却塔数据集合
     */
    public List<ModbusCoolTower> selectModbusCoolTowerList(ModbusCoolTower modbusCoolTower);

    /**
     * 查询冷却塔数据
     * @param rowId 冷却塔数据主键
     * @return 冷却塔数据
     */
    public ModbusCoolTower selectModbusCoolTowerByRowId(String rowId);

    /**
     * 新增冷却塔数据
     * @param modbusCoolTower 冷却塔数据
     * @return 结果
     */
    public int insertModbusCoolTower(ModbusCoolTower modbusCoolTower);

    /**
     * 修改冷却塔数据
     * @param modbusCoolTower 冷却塔数据
     * @return 结果
     */
    public int updateModbusCoolTower(ModbusCoolTower modbusCoolTower);

    /**
     * 批量删除冷却塔数据
     * @param rowIds 需要删除的冷却塔数据主键集合
     * @return 结果
     */
    public int deleteModbusCoolTowerByRowIds(String[] rowIds);

    /**
     * 查询最新的数据
     * @return
     */
    public ModbusCoolTower selectNewestData();

    /**
     * 查询冷却塔实时能耗的每日均值
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return list
     */
    public List<String> selectEnergyLineData(String startTime, String endTime);
}
