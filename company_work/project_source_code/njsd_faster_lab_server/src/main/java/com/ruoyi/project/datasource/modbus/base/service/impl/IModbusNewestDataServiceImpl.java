package com.ruoyi.project.datasource.modbus.base.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusNewestData;
import com.ruoyi.project.datasource.modbus.base.mapper.ModbusNewestDataMapper;
import com.ruoyi.project.datasource.modbus.base.service.IModbusNewestDataService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author niminui
 * @date 2022/3/31 11:46
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class IModbusNewestDataServiceImpl extends ServiceImpl<ModbusNewestDataMapper, ModbusNewestData> implements IModbusNewestDataService {

    @Resource
    private ModbusNewestDataMapper modbusNewestDataMapper;

    /**
     * 查询最新一组modbus数据
     * @param modbusType modbusType
     * @return List<ModbusNewestData>
     */
    @Override
    public List<ModbusNewestData> selectListByModbusType(String modbusType) {
        QueryWrapper<ModbusNewestData> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .eq(StringUtils.isNotEmpty(modbusType), ModbusNewestData::getModbusType, modbusType);
        return modbusNewestDataMapper.selectList(queryWrapper);
    }

    /**
     * 获取modbus最新的一条数据
     * @param modbusType 设备类别
     * @return
     */
    @Override
    public ModbusNewestData selectListByModbusTypeTop(String modbusType) {
        QueryWrapper<ModbusNewestData> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .eq(StringUtils.isNotEmpty(modbusType), ModbusNewestData::getModbusType, modbusType)
                .orderByDesc(ModbusNewestData::getCreateTime);
        return modbusNewestDataMapper.selectOne(queryWrapper);
    }

    /**
     * 向最新数据表中插入最新的数据
     * @param tempList list
     */
    @Override
    public void insertNewestData(List<ModbusNewestData> tempList) {
        for (ModbusNewestData data : tempList) {
            QueryWrapper<ModbusNewestData> queryWrapper = new QueryWrapper<>();
            queryWrapper.lambda().eq(ModbusNewestData::getModbusType, data.getModbusType());
            modbusNewestDataMapper.delete(queryWrapper);
            modbusNewestDataMapper.insert(data);
        }
    }
}
