package com.ruoyi.project.datasource.modbus.base.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusBaseEntity;
import com.ruoyi.project.datasource.modbus.base.vo.DeviceStatusVo;
import com.ruoyi.project.datasource.modbus.base.vo.energy.EnergyCenterVo;
import com.ruoyi.project.datasource.modbus.base.vo.energy.EnergyLeftVo;
import com.ruoyi.project.datasource.modbus.base.vo.energy.EnergyRightVo;
import com.ruoyi.project.datasource.modbus.vo.FaultVo;
import com.ruoyi.project.datasource.modbus.vo.TableVo;
import com.ruoyi.project.datasource.modbus.vo.WaterLevelVo;
import com.ruoyi.project.datasource.modbus.base.vo.ScreenVo;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

/**
 * @author niminui
 * @date 2022/3/29 9:31
 */
public interface IModbusBaseEntityService extends IService<ModbusBaseEntity> {
    /**
     * 查询超快楼系统列表
     * @param modbusBaseEntity 查询参数
     * @return 返回系统列表
     */
    public List<ModbusBaseEntity> selectModbusBaseEntityList(ModbusBaseEntity modbusBaseEntity);

    /**
     * 获取超快楼系统详细信息
     * @param rowId 主键id
     * @return 详细信息
     */
    public ModbusBaseEntity selectModbusBaseEntityByRowId(String rowId);

    /**
     * 新增超快楼系统
     * @param modbusBaseEntity 新增参数
     * @return 结果
     */
    public int insertModbusBaseEntity(ModbusBaseEntity modbusBaseEntity);

    /**
     * 修改超快楼系统
     * @param modbusBaseEntity 修改参数
     * @return 结果
     */
    public int updateModbusBaseEntity(ModbusBaseEntity modbusBaseEntity);

    /**
     * 删除超快楼系统
     * @param rowIds 需要删除的rowIds
     * @return 结果
     */
    public int deleteModbusBaseEntityByRowIds(String[] rowIds);

    /**
     * 获取所有status为启用(即为1)的系统列表
     * @return 列表
     */
    public List<ModbusBaseEntity> getAllSystem();

    /**
     * 查询以"modbus"开头的所有表名称
     * @return 结果
     */
    public List<TableVo> selectModbusTable();

    /**
     * 根据modbus类型查询信息
     * @param modbusType modbus类型
     * @return 结果
     */
    public List<ModbusBaseEntity> selectModbusSystemByType(String modbusType);

    /**
     * 查询系统状态（大屏总览数据）
     * @return list
     */
    public List<ScreenVo> selectModbusStatus();

    /**
     * 查询modbus温度排名前10的设备
     * @return map
     */
    public Map<String, List<String>> selectModbusRankTop10();

    /**
     * 根据表名称查询表信息
     * @param tableName
     * @return
     */
    public ModbusBaseEntity selectTableInformation(String tableName);

    /**
     * 查询modbus数据采集数量统计(全部/本周/当天)
     * @return 统计数据
     */
    public List<WaterLevelVo> selectModbusCount() throws ParseException;

    /**
     * 查询Modbus实时检测所需的数据
     * @return
     */
    public Map<String, Integer> selectDeviceWithStatus();

    /**
     * 查询Modbus设备中故障字段为1的故障列表
     * @return 结果
     */
    public List<FaultVo> selectDeviceDetails();

    /**
     * 查询Modbus设备详情
     * @return 结果
     */
    public List<DeviceStatusVo> selectDeviceDetailsEnergy();

    /**
     * 查询modbus设备温度排名及设备名称
     * @return EnergyLeftVo
     */
    public EnergyLeftVo selectTempRank();

    /**
     * 查询能耗数据
     * @return EnergyCenterVo
     */
    public EnergyCenterVo selectEnergyData();

    /**
     * 查询横向胶囊图的数据
     * @return EnergyRightVo
     */
    public EnergyRightVo selectCapsuleData();

    /**
     * 查询实时能耗曲线图数据
     * @return 数据
     */
    public Map<String, List<String>> selectRealTimeChartData();

}
