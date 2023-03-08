package com.ruoyi.project.datasource.modbus.equipment.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusCraftInner;
import com.ruoyi.project.datasource.modbus.equipment.mapper.ModbusCraftInnerMapper;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusCraftInnerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * @author niminui
 * @date 2022/3/28 14:45
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class IModbusCraftInnerServiceImpl extends ServiceImpl<ModbusCraftInnerMapper, ModbusCraftInner> implements IModbusCraftInnerService {

    @Resource
    private ModbusCraftInnerMapper modbusCraftInnerMapper;

    /**
     * 查询工艺水内机数据列表
     * @param modbusCraftInner 工艺水内机数据
     * @return 工艺水内机数据集合
     */
    @Override
    public List<ModbusCraftInner> selectModbusCraftInnerList(ModbusCraftInner modbusCraftInner) {
        QueryWrapper<ModbusCraftInner> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .ge(StringUtils.isNotEmpty(modbusCraftInner.getStartTime()), ModbusCraftInner::getCreateTime, modbusCraftInner.getStartTime())
                .le(StringUtils.isNotEmpty(modbusCraftInner.getEndTime()), ModbusCraftInner::getCreateTime, modbusCraftInner.getEndTime())
                .orderByDesc(ModbusCraftInner::getCreateTime);
        return modbusCraftInnerMapper.selectList(queryWrapper);
    }

    /**
     * 查询工艺水内机数据
     * @param rowId 工艺水内机数据主键
     * @return 工艺水内机数据
     */
    @Override
    public ModbusCraftInner selectModbusCraftInnerByRowId(String rowId) {
        return modbusCraftInnerMapper.selectById(rowId);
    }

    /**
     * 新增工艺水内机数据
     * @param modbusCraftInner 工艺水内机数据
     * @return
     */
    @Override
    public int insertModbusCraftInner(ModbusCraftInner modbusCraftInner) {
        modbusCraftInner.setCreateTime(new Date());
        return modbusCraftInnerMapper.insert(modbusCraftInner);
    }

    /**
     * 修改工艺水内机数据
     * @param modbusCraftInner 工艺水内机数据
     * @return 结果
     */
    @Override
    public int updateModbusCraftInner(ModbusCraftInner modbusCraftInner) {
        modbusCraftInner.setUpdateTime(new Date());
        return modbusCraftInnerMapper.updateById(modbusCraftInner);
    }

    /**
     * 批量删除工艺水内机数据
     * @param rowIds 需要删除的工艺水内机数据主键集合
     * @return 结果
     */
    @Override
    public int deleteModbusCraftInnerByRowIds(String[] rowIds) {
        return modbusCraftInnerMapper.deleteBatchIds(Arrays.asList(rowIds));
    }
}
