package com.ruoyi.project.datasource.modbus.base.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.DateUtils;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusTimerField;
import com.ruoyi.project.datasource.modbus.base.mapper.ModbusTimerFieldMapper;
import com.ruoyi.project.datasource.modbus.base.service.IModbusTimerFieldService;
import com.ruoyi.project.datasource.modbus.base.vo.TempInnerVo;
import com.ruoyi.project.datasource.modbus.base.vo.TempVo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.*;

/**
 * @author niminui
 * @date 2022/6/15 15:18
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class IModbusTimerFieldServiceImpl extends ServiceImpl<ModbusTimerFieldMapper, ModbusTimerField> implements IModbusTimerFieldService {

    @Resource
    private ModbusTimerFieldMapper modbusTimerFieldMapper;

    /**
     * 保存modbusTimer
     * @param timerField 数据
     */
    @Override
    public void saveTimerField(ModbusTimerField timerField) {
        String nowDate = DateUtils.dateTimeNow("yyyy-MM-dd");
        QueryWrapper<ModbusTimerField> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .eq(ModbusTimerField::getHourOfDay, timerField.getHourOfDay())
                .ge(ModbusTimerField::getCreateTime, nowDate + " 00:00:00")
                .le(ModbusTimerField::getCreateTime, nowDate + " 23:59:59");
        ModbusTimerField bean = modbusTimerFieldMapper.selectOne(queryWrapper);
        if (bean != null) {
            timerField.setTempSum(timerField.getTempSum().add(bean.getTempSum()));
            timerField.setHumiditySum(timerField.getHumiditySum().add(bean.getHumiditySum()));
            timerField.setTempCount(timerField.getTempCount() + bean.getTempCount());
            timerField.setHumidityCount(timerField.getHumidityCount() + bean.getHumidityCount());
            modbusTimerFieldMapper.delete(queryWrapper);
        }
        modbusTimerFieldMapper.insert(timerField);
    }

    /**
     * 查询系统总平均值（温度、湿度）
     * @return
     */
    @Override
    public TempInnerVo selectAllAverage() {
        String nowDate = DateUtils.dateTimeNow("yyyy-MM-dd");
        QueryWrapper<ModbusTimerField> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .ge(ModbusTimerField::getCreateTime, nowDate + " 00:00:00")
                .le(ModbusTimerField::getCreateTime, nowDate + " 23:59:59");
        List<ModbusTimerField> timerFields = modbusTimerFieldMapper.selectList(queryWrapper);

        BigDecimal tempAverage = new BigDecimal(0);
        BigDecimal humidityAverage = new BigDecimal(0);

        for (ModbusTimerField field : timerFields) {
            BigDecimal tempDivide = field.getTempSum().divide(new BigDecimal(field.getTempCount()), 2, BigDecimal.ROUND_HALF_UP);
            tempAverage = tempAverage.add(tempDivide);
            BigDecimal humidityDivide = field.getHumiditySum().divide(new BigDecimal(field.getHumidityCount()), 2, BigDecimal.ROUND_HALF_UP);
            humidityAverage = humidityAverage.add(humidityDivide);
        }
        return TempInnerVo.builder()
                .averageTemperature(tempAverage.divide(new BigDecimal(timerFields.size()), 2, BigDecimal.ROUND_HALF_UP).toString())
                .averageHumidity(humidityAverage.divide(new BigDecimal(timerFields.size()), 2, BigDecimal.ROUND_HALF_UP).toString())
                .build();
    }

    /**
     * 查询统计图需要的今日温度、湿度数据
     * @return
     */
    @Override
    public TempVo selectTodayLineChartData() {
        List<BigDecimal> tempList = new ArrayList<>();
        List<BigDecimal> humidityList = new ArrayList<>();
        String nowDate = DateUtils.dateTimeNow("yyyy-MM-dd");
        List<Integer> hourXAxis = getHourXAxis(new Date());
        QueryWrapper<ModbusTimerField> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .ge(ModbusTimerField::getCreateTime, nowDate + " 00:00:00")
                .le(ModbusTimerField::getCreateTime, nowDate + " 23:59:59")
                .in(ModbusTimerField::getHourOfDay, hourXAxis)
                .orderByAsc(ModbusTimerField::getHourOfDay);
        List<ModbusTimerField> timerFields = modbusTimerFieldMapper.selectList(queryWrapper);

        Map<Integer, BigDecimal> tempMap = new LinkedHashMap<>();
        Map<Integer, BigDecimal> humidityMap = new LinkedHashMap<>();
        for (ModbusTimerField timer : timerFields) {
            tempMap.put(timer.getHourOfDay(), timer.getTempSum().divide(new BigDecimal(timer.getTempCount()), 2, BigDecimal.ROUND_HALF_UP));
            humidityMap.put(timer.getHourOfDay(), timer.getHumiditySum().divide(new BigDecimal(timer.getHumidityCount()), 2, BigDecimal.ROUND_HALF_UP));
        }
        for (Integer hour : hourXAxis) {
            tempList.add(tempMap.getOrDefault(hour, new BigDecimal(0)));
            humidityList.add(humidityMap.getOrDefault(hour, new BigDecimal(0)));
        }

        Map<String, List<BigDecimal>> seriesData = new HashMap<>();
        seriesData.put("tempSeries", tempList);
        seriesData.put("humiditySeries", humidityList);
        return TempVo.builder()
                .axis(hourXAxis)
                .seriesData(seriesData)
                .build();
    }

    /**
     * 根据当前时间获取该时间前后8小时的时间list
     * @param date 当前时间
     * @return
     */
    private List<Integer> getHourXAxis(Date date) {
        List<Integer> xAxis = new ArrayList<>();
        int hour = DateUtils.getHourByDate(date);
        for (int i = 0; i < hour && i < 8; i++) {
            int xValue = hour < 8 ? i : Math.abs(hour - 8 + i);
            xAxis.add(xValue);
            if (xValue < 0) {
                break;
            }
        }
        xAxis.add(hour);
        int maxLength = 17 - xAxis.size();
        for (int i = 0; i < maxLength; i++) {
            int xValue = hour + i + 1;
            xAxis.add(xValue);
            if (xValue >= 23) {
                break;
            }
        }
        if (xAxis.size() < 17) {
            Integer minValue = xAxis.get(0);
            maxLength = 17 - xAxis.size();
            for (int i = 0; i < maxLength; i++) {
                xAxis.add(0, minValue - i - 1);
            }
        }
        return xAxis;
    }

    /**
     * 查询最高温度
     * @return
     */
    @Override
    public BigDecimal selectMaxTemp() {
        QueryWrapper<ModbusTimerField> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .orderByDesc(ModbusTimerField::getTempSum);
        List<ModbusTimerField> maxList = modbusTimerFieldMapper.selectList(queryWrapper);
        ModbusTimerField max = maxList.get(0);
        return max.getTempSum().divide(new BigDecimal(max.getTempCount()), 2, BigDecimal.ROUND_HALF_UP);
    }

    /**
     * 查询最新的一条数据平均值
     * @return
     */
    @Override
    public TempInnerVo selectAverageTop() {
        TempInnerVo innerVo = new TempInnerVo();
        QueryWrapper<ModbusTimerField> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .orderByDesc(ModbusTimerField::getCreateTime);
        List<ModbusTimerField> fieldList = modbusTimerFieldMapper.selectList(queryWrapper);
        ModbusTimerField field = fieldList.get(0);

        innerVo.setAverageTemperature(field.getTempSum().divide(new BigDecimal(field.getTempCount()), 2, BigDecimal.ROUND_HALF_UP).toString());
        innerVo.setAverageHumidity(field.getHumiditySum().divide(new BigDecimal(field.getHumidityCount()), 2, BigDecimal.ROUND_HALF_UP).toString());
        return innerVo;
    }
}
