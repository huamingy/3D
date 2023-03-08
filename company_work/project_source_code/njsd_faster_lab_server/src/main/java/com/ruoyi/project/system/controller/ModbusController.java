package com.ruoyi.project.system.controller;

import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.project.datasource.modbus.util.ModbusJLibUtil;
import com.ruoyi.project.datasource.modbus.util.ModbusMasterTCPUtil;
import com.ruoyi.project.datasource.modbus.vo.ModbusVo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author niminui
 * @date 2022/3/23 16:25
 */
@RestController
@RequestMapping("modbus")
public class ModbusController {

    /**
     * modbus测试接口
     * @param ipHost IP地址
     * @param port 端口号，默认502
     * @param type 类型
     * @param slaveId 从机地址 -- address
     * @param offset 寄存器读取开始地址 -- unitId
     * @param quantity 读取的寄存器数量 -- quantity
     * @return
     */
    @RequestMapping("receiveData")
    public AjaxResult testModbus(@RequestParam String ipHost, @RequestParam Integer port, @RequestParam Integer type,
                                 @RequestParam Integer slaveId , @RequestParam Integer offset, @RequestParam Integer quantity,
                                 @RequestParam Integer utilType) {
        String modbus = null;
        if (utilType == 1) {
            List<ModbusVo> modbusVos = ModbusJLibUtil.dataCollection(ipHost, port, slaveId, offset, quantity, type);
            return AjaxResult.success(modbusVos);
        } else if (utilType == 2){
            modbus = ModbusMasterTCPUtil.testModbus(ipHost, port, offset,  quantity, slaveId, type);
        }
        return AjaxResult.success(modbus);
    }

}
