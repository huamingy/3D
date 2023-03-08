package com.ruoyi.project.datasource.modbus.base.controller;

import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.project.datasource.modbus.base.service.IModbusBaseEntityService;
import com.ruoyi.project.datasource.modbus.base.service.IModbusTimerFieldService;
import com.ruoyi.project.datasource.modbus.base.vo.DeviceStatusVo;
import com.ruoyi.project.datasource.modbus.base.vo.TempInnerVo;
import com.ruoyi.project.datasource.modbus.base.vo.energy.EnergyCenterVo;
import com.ruoyi.project.datasource.modbus.base.vo.energy.EnergyLeftVo;
import com.ruoyi.project.datasource.modbus.base.vo.energy.EnergyRightVo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author niminui
 * @date 2022/7/12 9:21
 */
@RestController
@RequestMapping("modbus/energy")
public class ModbusEnergyController {

    @Resource
    private IModbusBaseEntityService modbusBaseEntityService;
    @Resource
    private IModbusTimerFieldService modbusTimerFieldService;

    /**
     * 查询能耗看板左边数据
     * @return 数据
     */
    @GetMapping("selectEnergyLeftData")
    public AjaxResult selectEnergyLeftData() {
        EnergyLeftVo leftVo = modbusBaseEntityService.selectTempRank();
        TempInnerVo historyVo = modbusTimerFieldService.selectAllAverage();
        TempInnerVo nowVo = modbusTimerFieldService.selectAverageTop();

        leftVo.setHumidityHistoryAverage(historyVo.getAverageHumidity());
        leftVo.setTempHistoryAverage(historyVo.getAverageTemperature());
        leftVo.setHumidityNowAverage(nowVo.getAverageHumidity());
        leftVo.setTempNowAverage(nowVo.getAverageTemperature());
        return AjaxResult.success(leftVo);
    }

    /**
     * 查询能耗看板中间数据
     * @return 数据
     */
    @GetMapping("selectEnergyCenterData")
    public AjaxResult selectEnergyCenterData() {
        EnergyCenterVo centerVo = modbusBaseEntityService.selectEnergyData();
        List<DeviceStatusVo> voList = modbusBaseEntityService.selectDeviceDetailsEnergy();
        //对voList排序：先按设备状态升序，再按插入时间降序
        List<DeviceStatusVo> collect = voList.stream().sorted(Comparator.comparing(DeviceStatusVo::getDeviceStatus)
                .thenComparing(Comparator.comparing(DeviceStatusVo::getLatestTime).reversed())
        ).collect(Collectors.toList());

        centerVo.setDeviceStatusList(collect);
        return AjaxResult.success(centerVo);
    }

    /**
     * 查询能耗看板右侧数据
     * @return 数据
     */
    @GetMapping("selectEnergyRightData")
    public AjaxResult selectEnergyRightData() {
        EnergyRightVo rightVo = modbusBaseEntityService.selectCapsuleData();
        Map<String, List<String>> realTimeChartData = modbusBaseEntityService.selectRealTimeChartData();

        rightVo.setRealTimeChartData(realTimeChartData);
        return AjaxResult.success(rightVo);
    }

}
