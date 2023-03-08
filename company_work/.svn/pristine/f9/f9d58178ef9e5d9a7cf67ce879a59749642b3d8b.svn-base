package com.ruoyi.project.datasource.modbus.util;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ruoyi.project.datasource.modbus.equipment.service.*;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * @author niminui
 * @date 2022/3/29 16:04
 */
@Component
public class ModBusServiceUtil {

    @Resource
    private IModbusAhu1Service modbusAhu1Service;
    @Resource
    private IModbusAhu2Service modbusAhu2Service;
    @Resource
    private IModbusAhu3Service modbusAhu3Service;
    @Resource
    private IModbusAhu4Service modbusAhu4Service;
    @Resource
    private IModbusAhu5Service modbusAhu5Service;
    @Resource
    private IModbusAhu6Service modbusAhu6Service;
    @Resource
    private IModbusAhu7Service modbusAhu7Service;
    @Resource
    private IModbusAhu8Service modbusAhu8Service;
    @Resource
    private IModbusScrewMachineService modbusScrewMachineService;
    @Resource
    private IModbusCoolTowerService modbusCoolTowerService;
    @Resource
    private IModbusCraftOuterService modbusCraftOuterService;
    @Resource
    private IModbusCraftInnerService modbusCraftInnerService;

    private final Map<String, IService> SERVICE_MAP = new HashMap<>();

    /**
     * 初始化所有的modbus的service
     */
    @PostConstruct
    private void beforeInit() {
        SERVICE_MAP.put("ModbusAhu1", modbusAhu1Service);
        SERVICE_MAP.put("ModbusAhu2", modbusAhu2Service);
        SERVICE_MAP.put("ModbusAhu3", modbusAhu3Service);
        SERVICE_MAP.put("ModbusAhu4", modbusAhu4Service);
        SERVICE_MAP.put("ModbusAhu5", modbusAhu5Service);
        SERVICE_MAP.put("ModbusAhu6", modbusAhu6Service);
        SERVICE_MAP.put("ModbusAhu7", modbusAhu7Service);
        SERVICE_MAP.put("ModbusAhu8", modbusAhu8Service);
        SERVICE_MAP.put("ModbusCoolTower", modbusCoolTowerService);
        SERVICE_MAP.put("ModbusCraftInner", modbusCraftInnerService);
        SERVICE_MAP.put("ModbusCraftOuter", modbusCraftOuterService);
        SERVICE_MAP.put("ModbusScrewMachine", modbusScrewMachineService);
    }

    /**
     * 获取对应class的service的父类IService
     * @param className service类别
     * @return IService
     */
    public IService getService(String className) {
        return SERVICE_MAP.get(className);
    }

}
