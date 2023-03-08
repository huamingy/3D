package com.ruoyi.project.datasource.modbus.base.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusNewestData;
import com.ruoyi.project.datasource.modbus.base.service.IModbusNewestDataService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.LinkedList;
import java.util.List;

/**
 * modbus外部接口controller
 * @author niminui
 * @date 2022/3/31 10:33
 */
@RestController
@RequestMapping("modbus/api")
public class ModbusApiController {

    @Resource
    private IModbusNewestDataService modbusNewestDataService;

    /**
     * 获取modbus最新的一条数据
     * @param modbusType
     * @return
     */
    @RequestMapping("getNewestData")
    public AjaxResult getNewestData(@RequestParam(required = false, defaultValue = "") String modbusType) {
        List<JSONObject> retList = new LinkedList<>();
        List<ModbusNewestData> list = modbusNewestDataService.selectListByModbusType(modbusType);
        for (ModbusNewestData data : list) {
            retList.add(JSON.parseObject(data.getModbusData()));;
        }
        return AjaxResult.success(retList);
    }

}
