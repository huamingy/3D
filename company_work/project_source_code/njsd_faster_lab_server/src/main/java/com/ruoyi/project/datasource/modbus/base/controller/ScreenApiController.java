package com.ruoyi.project.datasource.modbus.base.controller;

import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.project.datasource.chart.service.IModbusChartFieldService;
import com.ruoyi.project.datasource.chart.vo.ChartVo;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusBaseEntity;
import com.ruoyi.project.datasource.modbus.base.service.IModbusBaseEntityService;
import com.ruoyi.project.datasource.modbus.base.vo.ScreenVo;
import com.ruoyi.project.datasource.modbus.vo.WaterLevelVo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author niminui
 * @date 2022/5/24 10:02
 */
@RestController
@RequestMapping("/screen/api")
public class ScreenApiController {

    @Resource
    private IModbusBaseEntityService modbusBaseEntityService;
    @Resource
    private IModbusChartFieldService modbusChartFieldService;

    /**
     * 查询系统状态（大屏总览数据）
     * @return list
     */
    @GetMapping("selectOverview")
    public AjaxResult selectOverview() {
        List<ScreenVo> overview = modbusBaseEntityService.selectModbusStatus();
        ScreenVo remove = overview.remove(1);
        remove.setValue(1);
        overview.add(1, remove);

        ScreenVo remove2 = overview.remove(2);
        remove2.setValue(2);
        overview.add(2, remove2);
        return AjaxResult.success(overview);
    }

    /**
     * 查询modbus温度排名前10的设备
     * @return map
     */
    @GetMapping("selectTempRank")
    public AjaxResult selectTempRank() {
        Map<String, List<String>> map = modbusBaseEntityService.selectModbusRankTop10();
        return AjaxResult.success(map);
    }

    /**
     * 根据表名称查询折线图所需的数据
     * @param tableNames 表名称，以逗号","分隔
     * @return
     */
    @GetMapping("selectLineChartData")
    public AjaxResult selectLineChartData(@RequestParam String tableNames) throws ParseException {
        List<ChartVo> list = new ArrayList<>();
        String[] split = tableNames.split(",");
        for (String tableName : split) {
            ChartVo chartVo = modbusChartFieldService.selectChartElement(tableName, null, null);
            ModbusBaseEntity entity = modbusBaseEntityService.selectTableInformation(tableName);
            chartVo.setTableName(tableName);
            chartVo.setTableComment(entity.getSystemName());
            list.add(chartVo);
        }
        return AjaxResult.success(list);
    }

    /**
     * 查询modbus数据采集数量统计(全部/本周/当天)
     * @return 统计数据
     */
    @GetMapping("selectModbusCount")
    public AjaxResult selectModbusCount() throws ParseException {
        List<WaterLevelVo> levelVos = modbusBaseEntityService.selectModbusCount();
        return AjaxResult.success(levelVos);
    }

}
