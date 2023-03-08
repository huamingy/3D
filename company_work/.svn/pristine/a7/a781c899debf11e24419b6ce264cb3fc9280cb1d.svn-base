package com.ruoyi.project.datasource.modbus.base.controller;

import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.project.datasource.modbus.base.service.IModbusBaseEntityService;
import com.ruoyi.project.datasource.modbus.base.service.IModbusTimerFieldService;
import com.ruoyi.project.datasource.modbus.base.vo.DeviceStatusVo;
import com.ruoyi.project.datasource.modbus.base.vo.TempInnerVo;
import com.ruoyi.project.datasource.modbus.base.vo.TempVo;
import com.ruoyi.project.datasource.modbus.vo.FaultVo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * modbus大屏接口
 *
 * @author niminui
 * @date 2022/6/14 16:09
 */
@RestController
@RequestMapping("modbus/screen")
public class ModbusScreenController {

    @Resource
    private IModbusBaseEntityService modbusBaseEntityService;
    @Resource
    private IModbusTimerFieldService modbusTimerFieldService;

    /**
     * 获取系统总览(实时检测)数据
     *
     * @return
     */
    @RequestMapping("selectOverviewData")
    public AjaxResult selectOverviewData() {
        Map<String, Integer> map = modbusBaseEntityService.selectDeviceWithStatus();
        return AjaxResult.success(map);
    }

    /**
     * 查询Modbus设备中故障字段为1的故障列表
     * @return 结果
     */
    @RequestMapping("selectDeviceDetails")
    public AjaxResult selectDeviceDetails() {
        List<FaultVo> faultVos = modbusBaseEntityService.selectDeviceDetails();
        return AjaxResult.success(faultVos);
    }

    /**
     * 获取今日温度、湿度数据
     * @return
     */
    @RequestMapping("selectTodayData")
    public AjaxResult selectTodayData() {
        TempInnerVo tempInnerVo = modbusTimerFieldService.selectAllAverage();
        TempVo tempVo = modbusTimerFieldService.selectTodayLineChartData();
        tempVo.setTempInnerVo(tempInnerVo);
        return AjaxResult.success(tempVo);
    }

    /**
     * 获取设备分类数据
     * @return
     */
    @RequestMapping("selectCapsuleChart")
    public AjaxResult selectCapsuleChart() {
        Map<String, Integer> map = new HashMap<>();
        map.put("airConditioner", 88); //空调
        map.put("screwMachine", 6); //螺杆机
        map.put("coolTower", 6); //冷却塔
        map.put("craftOuter", 3); //工艺水外机
        map.put("craftInner", 10); //工艺水内机
        return AjaxResult.success(map);
    }

    /**
     * 获取当前温度以及最高温度
     * @return
     */
    @RequestMapping("selectTempData")
    public AjaxResult selectTempData() {
        TempInnerVo tempInnerVo = modbusTimerFieldService.selectAllAverage();
        TempVo tempVo = modbusTimerFieldService.selectTodayLineChartData();
        BigDecimal max = modbusTimerFieldService.selectMaxTemp();
        tempVo.setMaxTemp(max.toString());
        tempVo.setTempInnerVo(tempInnerVo);
        return AjaxResult.success(tempVo);
    }
}
