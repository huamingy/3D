package com.ruoyi.project.datasource.modbus.equipment.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusCraftInner;

import java.util.List;

/**
 * @author niminui
 * @date 2022/3/28 14:45
 */
public interface IModbusCraftInnerService extends IService<ModbusCraftInner> {
    /**
     * 查询工艺水内机数据列表
     * @param modbusCraftInner 工艺水内机数据
     * @return 工艺水内机数据集合
     */
    public List<ModbusCraftInner> selectModbusCraftInnerList(ModbusCraftInner modbusCraftInner);

    /**
     * 查询工艺水内机数据
     * @param rowId 工艺水内机数据主键
     * @return 工艺水内机数据
     */
    public ModbusCraftInner selectModbusCraftInnerByRowId(String rowId);

    /**
     * 新增工艺水内机数据
     * @param modbusCraftInner 工艺水内机数据
     * @return
     */
    public int insertModbusCraftInner(ModbusCraftInner modbusCraftInner);

    /**
     * 修改工艺水内机数据
     * @param modbusCraftInner 工艺水内机数据
     * @return 结果
     */
    public int updateModbusCraftInner(ModbusCraftInner modbusCraftInner);

    /**
     * 批量删除工艺水内机数据
     * @param rowIds 需要删除的工艺水内机数据主键集合
     * @return 结果
     */
    public int deleteModbusCraftInnerByRowIds(String[] rowIds);
}
