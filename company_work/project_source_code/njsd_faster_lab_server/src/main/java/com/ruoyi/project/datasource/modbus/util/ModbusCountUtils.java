package com.ruoyi.project.datasource.modbus.util;

import com.alibaba.fastjson.JSONObject;
import com.ruoyi.common.utils.DateUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.framework.aspectj.lang.annotation.Excel;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusBaseEntity;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusNewestData;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusTimerField;
import com.ruoyi.project.datasource.modbus.base.service.IModbusNewestDataService;
import com.ruoyi.project.datasource.modbus.base.service.IModbusTimerFieldService;
import com.ruoyi.project.datasource.modbus.field.annotation.DevAttributes;
import com.ruoyi.project.datasource.modbus.vo.CountFieldVo;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author niminui
 * @date 2022/6/15 14:30
 */
@Component
public class ModbusCountUtils {

    @Resource
    private IModbusNewestDataService modbusNewestDataService;
    @Resource
    private IModbusTimerFieldService modbusTimerFieldService;

    /**
     * 将获取的modbus数据中的温度、湿度按每天的小时数存入库中
     * @param list modbus基本信息
     */
    public void savePerHourByDay(List<ModbusBaseEntity> list) throws ClassNotFoundException {
        List<Date> maxList = new ArrayList<>();
        CountFieldVo fieldVo = parseModbusCountField(list);
        BigDecimal tempSum = new BigDecimal(0);
        BigDecimal humiditySum = new BigDecimal(0);
        for (ModbusBaseEntity entity : list) {
            ModbusNewestData newestData = modbusNewestDataService.selectListByModbusTypeTop(entity.getClassName());
            if (newestData != null && StringUtils.isNotEmpty(newestData.getModbusData()))
            {
                JSONObject object = JSONObject.parseObject(newestData.getModbusData());
                List<String> listTemp = fieldVo.getCountTempField().get(entity.getClassName());
                for (String fieldName : listTemp) {
                    if (object.containsKey(fieldName)) {
                        tempSum = tempSum.add(object.getBigDecimal(fieldName));
                    }
                }
                List<String> listHumidity = fieldVo.getCountHumidityField().get(entity.getClassName());
                for (String fieldName : listHumidity) {
                    if (object.containsKey(fieldName)) {
                        humiditySum = humiditySum.add(object.getBigDecimal(fieldName));
                    }
                }
                maxList.add(newestData.getCreateTime());
            }
        }
        List<Date> collect = maxList.stream().sorted(Comparator.comparing(Date::getTime).reversed()).collect(Collectors.toList());
        ModbusTimerField timerField = ModbusTimerField.builder()
                .tempSum(tempSum).tempCount(fieldVo.getCountTemp())
                .humiditySum(humiditySum).humidityCount(fieldVo.getCountHumidity())
                .hourOfDay(DateUtils.getHourByDate(collect.get(0)))
                .createTime(new Date())
                .build();
        modbusTimerFieldService.saveTimerField(timerField);
    }


    /**
     * 根据modbus设备基本信息获取其中包含温度、湿度的字段信息
     * @param list modbus设备基本信息
     * @return
     * @throws ClassNotFoundException
     */
    private CountFieldVo parseModbusCountField(List<ModbusBaseEntity> list) throws ClassNotFoundException {
        Map<String, List<String>> countTempField = new HashMap<>();
        Map<String, List<String>> countHumidityField = new HashMap<>();
        int countTemp = 0;
        int countHumidity = 0;
        for (ModbusBaseEntity entity : list) {
            //实体类的class
            Class<?> clazz = Class.forName(entity.getClassPath() + ".domain." + entity.getClassName());
            Field[] fields = clazz.getDeclaredFields();
            List<String> tempList = new ArrayList<>();
            List<String> humidityList = new ArrayList<>();
            for (Field field : fields) {
                field.setAccessible(true);
                if (field.isAnnotationPresent(Excel.class) && field.isAnnotationPresent(DevAttributes.class)) {
                    Excel annotation = field.getAnnotation(Excel.class);
                    String name = annotation.name();
                    if (StringUtils.contains(name, "温度") && !StringUtils.contains(name, "无探头")) {
                        tempList.add(field.getName());
                        countTemp++;
                    } else if (StringUtils.contains(name, "湿度") && !StringUtils.contains(name, "无探头")) {
                        humidityList.add(field.getName());
                        countHumidity++;
                    }
                }
            }
            countTempField.put(entity.getClassName(), tempList);
            countHumidityField.put(entity.getClassName(), humidityList);
        }
        return CountFieldVo.builder()
                .countTempField(countTempField)
                .countHumidityField(countHumidityField)
                .countTemp(countTemp)
                .countHumidity(countHumidity)
                .build();
    }
}
