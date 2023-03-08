package com.ruoyi.project.datasource.modbus.equipment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusCoolTower;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusCraftOuter;
import com.ruoyi.project.datasource.modbus.equipment.mapper.ModbusCraftOuterMapper;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusCraftOuterService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * @author niminui
 * @date 2022/3/28 14:45
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class IModbusCraftOuterServiceImpl extends ServiceImpl<ModbusCraftOuterMapper, ModbusCraftOuter> implements IModbusCraftOuterService {

    @Resource
    private ModbusCraftOuterMapper modbusCraftOuterMapper;

    /**
     * 查询工艺水外机数据列表
     * @param modbusCraftOuter 工艺水外机数据
     * @return 工艺水外机数据集合
     */
    @Override
    public List<ModbusCraftOuter> selectModbusCraftOuterList(ModbusCraftOuter modbusCraftOuter) {
        QueryWrapper<ModbusCraftOuter> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .ge(StringUtils.isNotEmpty(modbusCraftOuter.getStartTime()), ModbusCraftOuter::getCreateTime, modbusCraftOuter.getStartTime())
                .le(StringUtils.isNotEmpty(modbusCraftOuter.getEndTime()), ModbusCraftOuter::getCreateTime, modbusCraftOuter.getEndTime())
                .orderByDesc(ModbusCraftOuter::getCreateTime);
        return modbusCraftOuterMapper.selectList(queryWrapper);
    }

    /**
     * 查询工艺水外机数据
     * @param rowId 工艺水外机数据主键
     * @return 工艺水外机数据
     */
    @Override
    public ModbusCraftOuter selectModbusCraftOuterByRowId(String rowId) {
        return modbusCraftOuterMapper.selectById(rowId);
    }

    /**
     * 新增工艺水外机数据
     * @param modbusCraftOuter 工艺水外机数据
     * @return
     */
    @Override
    public int insertModbusCraftOuter(ModbusCraftOuter modbusCraftOuter) {
        modbusCraftOuter.setCreateTime(new Date());
        return modbusCraftOuterMapper.insert(modbusCraftOuter);
    }

    /**
     * 修改工艺水外机数据
     * @param modbusCraftOuter 工艺水外机数据
     * @return 结果
     */
    @Override
    public int updateModbusCraftOuter(ModbusCraftOuter modbusCraftOuter) {
        modbusCraftOuter.setUpdateTime(new Date());
        return modbusCraftOuterMapper.updateById(modbusCraftOuter);
    }

    /**
     * 批量删除工艺水外机数据
     * @param rowIds 需要删除的工艺水外机数据主键集合
     * @return 结果
     */
    @Override
    public int deleteModbusCraftOuterByRowIds(String[] rowIds) {
        return modbusCraftOuterMapper.deleteBatchIds(Arrays.asList(rowIds));
    }

    /**
     * 查询最新的数据
     * @return
     */
    @Override
    public ModbusCraftOuter selectNewestData() {
        QueryWrapper<ModbusCraftOuter> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .orderByDesc(ModbusCraftOuter::getCreateTime);
        List<ModbusCraftOuter> list = modbusCraftOuterMapper.selectList(queryWrapper);
        return list.get(0);
    }

    /**
     * 查询工艺水外机实时能耗的每日均值
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return list
     */
    @Override
    @SuppressWarnings("all")
    public List<String> selectEnergyLineData(String startTime, String endTime) {
        List<String> retList = new ArrayList<>();
        List<BigDecimal> list = modbusCraftOuterMapper.selectEnergyLineData(startTime, endTime);
        for (BigDecimal value : list) {
            retList.add(value.setScale(2, BigDecimal.ROUND_HALF_UP).toString());
        }
        return retList;
    }
}
