package com.ruoyi.project.datasource.chart.controller;

import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.project.datasource.chart.service.IModbusChartFieldService;
import com.ruoyi.project.datasource.chart.vo.ChartVo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.text.ParseException;

/**
 * @author niminui
 * @date 2022/5/18 11:11
 */
@RestController
@RequestMapping("/modbus/chart")
public class ModbusChartController {

    @Resource
    private IModbusChartFieldService modbusChartFieldService;

    /**
     * 根据表名称查询折线图所需的数据
     * @param tableName 表名称
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return 数据
     */
    @GetMapping("selectLineData")
    public AjaxResult selectLineData(@RequestParam String tableName,
                                     @RequestParam(required = false, defaultValue = "") String startTime,
                                     @RequestParam(required = false, defaultValue = "") String endTime) throws ParseException {
        ChartVo chartVo = modbusChartFieldService.selectChartElement(tableName, startTime, endTime);
        return AjaxResult.success(chartVo);
    }

}
