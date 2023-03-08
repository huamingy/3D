package com.ruoyi.project.datasource.modbus.equipment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusCraftOuter;

import java.util.List;

/**
 * @author niminui
 * @date 2022/3/28 14:45
 */
public interface IModbusCraftOuterService extends IService<ModbusCraftOuter> {
    /**
     * 查询工艺水外机数据列表
     * @param modbusCraftOuter 工艺水外机数据
     * @return 工艺水外机数据集合
     */
    public List<ModbusCraftOuter> selectModbusCraftOuterList(ModbusCraftOuter modbusCraftOuter);

    /**
     * 查询工艺水外机数据
     * @param rowId 工艺水外机数据主键
     * @return 工艺水外机数据
     */
    public ModbusCraftOuter selectModbusCraftOuterByRowId(String rowId);

    /**
     * 新增工艺水外机数据
     * @param modbusCraftOuter 工艺水外机数据
     * @return
     */
    public int insertModbusCraftOuter(ModbusCraftOuter modbusCraftOuter);

    /**
     * 修改工艺水外机数据
     * @param modbusCraftOuter 工艺水外机数据
     * @return 结果
     */
    public int updateModbusCraftOuter(ModbusCraftOuter modbusCraftOuter);

    /**
     * 批量删除工艺水外机数据
     * @param rowIds 需要删除的工艺水外机数据主键集合
     * @return 结果
     */
    public int deleteModbusCraftOuterByRowIds(String[] rowIds);

    /**
     * 查询最新的数据
     * @return
     */
    public ModbusCraftOuter selectNewestData();

    /**
     * 查询工艺水外机实时能耗的每日均值
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return list
     */
    List<String> selectEnergyLineData(String startTime, String endTime);
}
