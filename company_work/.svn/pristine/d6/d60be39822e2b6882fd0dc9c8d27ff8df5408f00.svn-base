package com.ruoyi.project.datasource.modbus.scheduled;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.extension.service.IService;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusBaseEntity;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusNewestData;
import com.ruoyi.project.datasource.modbus.base.service.IModbusBaseEntityService;
import com.ruoyi.project.datasource.modbus.base.service.IModbusNewestDataService;
import com.ruoyi.project.datasource.modbus.util.ModBusServiceUtil;
import com.ruoyi.project.datasource.modbus.util.ModbusCountUtils;
import com.ruoyi.project.datasource.modbus.util.ModbusJLibUtil;
import com.ruoyi.project.datasource.modbus.vo.ModbusVo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

/**
 * MODBUS定时任务采集
 * @author niminui
 * @date 2022/3/29 11:29
 */
@Component
public class ModbusTaskScheduled {

    @Resource
    private IModbusBaseEntityService modbusBaseEntityService;
    @Resource
    private ModBusServiceUtil modBusServiceUtil;
    @Resource
    private IModbusNewestDataService modbusNewestDataService;
    @Resource
    private ModbusCountUtils modbusCountUtils;

    /**
     * 定时按照设备进行数据采集，并将采集到的数据存入数据库中
     * @throws ClassNotFoundException
     */
    @SuppressWarnings("all")
    //@Scheduled(cron = "0 */5 * * * ?")
    public void dataCollectionTask() throws ClassNotFoundException {
        Date currentDate = new Date();
        List<ModbusNewestData> tempList = new LinkedList<>();
        List<ModbusBaseEntity> list = modbusBaseEntityService.getAllSystem();
        for (ModbusBaseEntity entity : list) {
            //根据保存的系统信息获取数据，每一个modbusVo即为一个字段
            List<ModbusVo> modbusVos = ModbusJLibUtil.dataCollection(entity.getSystemIpHost(), entity.getSystemPort(), entity.getSlaveId(), entity.getOffset(), entity.getQuantity(), 3);

            //实体类的class
            Class<?> eClass = Class.forName(entity.getClassPath() + ".domain." + entity.getClassName());

            //根据保存的class即获取的数据初始化实体类
            Object o = ModbusJLibUtil.initEntity(eClass, modbusVos);
            IService iService = modBusServiceUtil.getService(entity.getClassName());
            iService.save(o);

            //存入map
            String className = entity.getClassName();
            ModbusNewestData data = ModbusNewestData.builder()
                    .modbusType(className.substring(0, 1).toLowerCase() + className.substring(1))
                    .modbusData(JSON.toJSONString(o))
                    .createTime(currentDate)
                    .build();
            tempList.add(data);
        }
        //将最新的一组数据存入modbus_newest_data表
        modbusNewestDataService.insertNewestData(tempList);

        //保存到小数数据表中用于查询每小时所有设备温度湿度的平均值
        modbusCountUtils.savePerHourByDay(list);
    }

}
