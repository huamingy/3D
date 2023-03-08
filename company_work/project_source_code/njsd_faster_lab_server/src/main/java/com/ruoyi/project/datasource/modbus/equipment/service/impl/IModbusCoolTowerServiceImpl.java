package com.ruoyi.project.datasource.modbus.equipment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusCoolTower;
import com.ruoyi.project.datasource.modbus.equipment.mapper.ModbusCoolTowerMapper;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusCoolTowerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.*;

/**
 * @author niminui
 * @date 2022/3/28 14:45
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class IModbusCoolTowerServiceImpl extends ServiceImpl<ModbusCoolTowerMapper, ModbusCoolTower> implements IModbusCoolTowerService {

    @Resource
    private ModbusCoolTowerMapper modbusCoolTowerMapper;

    /**
     * 查询冷却塔数据列表
     * @param modbusCoolTower 冷却塔数据
     * @return 冷却塔数据集合
     */
    @Override
    public List<ModbusCoolTower> selectModbusCoolTowerList(ModbusCoolTower modbusCoolTower) {
        QueryWrapper<ModbusCoolTower> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .ge(StringUtils.isNotEmpty(modbusCoolTower.getStartTime()), ModbusCoolTower::getCreateTime, modbusCoolTower.getStartTime())
                .le(StringUtils.isNotEmpty(modbusCoolTower.getEndTime()), ModbusCoolTower::getCreateTime, modbusCoolTower.getEndTime())
                .orderByDesc(ModbusCoolTower::getCreateTime);
        return modbusCoolTowerMapper.selectList(queryWrapper);
    }

    /**
     * 查询冷却塔数据
     * @param rowId 冷却塔数据主键
     * @return 冷却塔数据
     */
    @Override
    public ModbusCoolTower selectModbusCoolTowerByRowId(String rowId) {
        return modbusCoolTowerMapper.selectById(rowId);
    }

    /**
     * 新增冷却塔数据
     * @param modbusCoolTower 冷却塔数据
     * @return 结果
     */
    @Override
    public int insertModbusCoolTower(ModbusCoolTower modbusCoolTower) {
        modbusCoolTower.setCreateTime(new Date());
        return modbusCoolTowerMapper.insert(modbusCoolTower);
    }

    /**
     * 修改冷却塔数据
     * @param modbusCoolTower 冷却塔数据
     * @return 结果
     */
    @Override
    public int updateModbusCoolTower(ModbusCoolTower modbusCoolTower) {
        modbusCoolTower.setUpdateTime(new Date());
        return modbusCoolTowerMapper.updateById(modbusCoolTower);
    }

    /**
     * 批量删除冷却塔数据
     * @param rowIds 需要删除的冷却塔数据主键集合
     * @return 结果
     */
    @Override
    public int deleteModbusCoolTowerByRowIds(String[] rowIds) {
        return modbusCoolTowerMapper.deleteBatchIds(Arrays.asList(rowIds));
    }

    /**
     * 查询最新的数据
     * @return
     */
    @Override
    public ModbusCoolTower selectNewestData() {
        QueryWrapper<ModbusCoolTower> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .orderByDesc(ModbusCoolTower::getCreateTime);
        List<ModbusCoolTower> list = modbusCoolTowerMapper.selectList(queryWrapper);
        return list.get(0);
    }

    /**
     * 查询冷却塔实时能耗1的每日均值
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return list
     */
    @Override
    public List<String> selectEnergyLineData(String startTime, String endTime) {
        List<String> retList = new ArrayList<>();
        List<BigDecimal> list = modbusCoolTowerMapper.selectEnergyLineData(startTime, endTime);
        for (BigDecimal value : list) {
            retList.add(value.setScale(2, BigDecimal.ROUND_HALF_UP).toString());
        }
        return retList;
    }
}
