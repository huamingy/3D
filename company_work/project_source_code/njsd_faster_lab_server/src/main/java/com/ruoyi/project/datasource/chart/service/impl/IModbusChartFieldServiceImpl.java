package com.ruoyi.project.datasource.chart.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.DateUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.project.datasource.chart.domain.ModbusChartField;
import com.ruoyi.project.datasource.chart.mapper.ModbusChartFieldMapper;
import com.ruoyi.project.datasource.chart.service.IModbusChartFieldService;
import com.ruoyi.project.datasource.chart.vo.ChartVo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.text.ParseException;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author niminui
 * @date 2022/5/17 10:52
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class IModbusChartFieldServiceImpl extends ServiceImpl<ModbusChartFieldMapper, ModbusChartField> implements IModbusChartFieldService {

    @Resource
    private ModbusChartFieldMapper modbusChartFieldMapper;

    private static final Set<String> neglectFields = new HashSet<>();

    static {
        neglectFields.addAll(Arrays.asList("row_id", "create_time","update_time", "system_start_stop_tcp", "fault_reset"));
    }

    /**
     * 查询modbus图表字段配置列表
     * @param chartField 查询参数
     * @return 列表
     */
    @Override
    public List<ModbusChartField> selectChartFieldList(ModbusChartField chartField) {
        QueryWrapper<ModbusChartField> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .eq(ModbusChartField::getParentTableName, chartField.getParentTableName())
                .like(StringUtils.isNotEmpty(chartField.getFieldComment()), ModbusChartField::getFieldComment, chartField.getFieldComment())
                .eq(StringUtils.isNotEmpty(chartField.getFieldStatus()), ModbusChartField::getFieldStatus, chartField.getFieldStatus())
                .orderByAsc(ModbusChartField::getOrderNum);
        return modbusChartFieldMapper.selectList(queryWrapper);
    }

    /**
     * 根据表名称查询mysql的字段信息
     * @return 列表
     */
    @Override
    public List<ModbusChartField> selectDatabaseField(String tableName) {
        List<ModbusChartField> retList = new LinkedList<>();
        List<ModbusChartField> list = modbusChartFieldMapper.selectDatabaseField(tableName);
        for (ModbusChartField field : list) {

            if (StringUtils.contains(field.getFieldComment(), "小数")
                    && !StringUtils.contains(field.getFieldComment(), "开度")
                    && !StringUtils.contains(field.getFieldComment(), "开启度")
                    && !StringUtils.contains(field.getFieldName(), "_rotate_")
                    && !StringUtils.startsWith(field.getFieldName(), "run_")
                    && !StringUtils.startsWith(field.getFieldName(), "grand_")
                    && !StringUtils.startsWith(field.getFieldName(), "no_")
                    && !StringUtils.contains(field.getFieldName(), "no_probe")) {
                String[] split = field.getFieldComment().split("--");
                field.setFieldComment(split[1]);
                retList.add(field);
            }
        }
        return retList;
    }

    /**
     * 根据表名称查询mysql的温度字段信息
     * @return 列表
     */
    public List<ModbusChartField> selectDatabaseFieldWithTemp(String tableName) {
        List<ModbusChartField> retList = new LinkedList<>();
        List<ModbusChartField> list = modbusChartFieldMapper.selectDatabaseFieldWithTemp(tableName);
        for (ModbusChartField field : list) {
            String[] split = field.getFieldComment().split("--");
            field.setFieldComment(split[1]);
            retList.add(field);
        }
        return retList;
    }

    /**
     * 根据表名称查询modbus_chart_field表中已保存的字段信息
     * @param tableName 表名称
     * @return list
     */
    @Override
    public List<String> selectFieldByTableName(String tableName) {
        QueryWrapper<ModbusChartField> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .eq(ModbusChartField::getParentTableName, tableName)
                .orderByAsc(ModbusChartField::getOrderNum);
        List<ModbusChartField> list = modbusChartFieldMapper.selectList(queryWrapper);
        return list.stream().map(ModbusChartField::getFieldName).collect(Collectors.toList());
    }

    /**
     * 保存已选的图表字段
     * @param selectedFields 已选的图表字段
     * @param parentTableName 字段所属表名
     */
    @Override
    public void saveFields(List<String> selectedFields, String parentTableName) {
        List<ModbusChartField> list = this.selectDatabaseField(parentTableName); //parentTableName表中基本字段信息
        Map<String, ModbusChartField> collect = list.stream().collect(Collectors.toMap(ModbusChartField::getFieldName, Function.identity()));

        //找出在"配置图表字段"中删除(左移)的字段信息，若有则需要删除这些字段信息
        List<String> different = findListDifferent(selectedFields, this.selectFieldByTableName(parentTableName));
        if (different.size() > 0) {
            modbusChartFieldMapper.deleteDifferent(parentTableName, different);
        }

        for (String fieldName : selectedFields) {
            ModbusChartField field = collect.get(fieldName);
            if (field != null && countField(parentTableName, fieldName) == 0) {
                ModbusChartField chartField = ModbusChartField.builder()
                        .parentTableName(parentTableName)
                        .fieldName(fieldName)
                        .fieldComment(field.getFieldComment())
                        .fieldType(field.getFieldType())
                        .fieldStatus("1")
                        .createTime(new Date())
                        .orderNum(field.getOrderNum())
                        .build();
                modbusChartFieldMapper.insert(chartField);
            }
        }
    }

    /**
     * 删除图表字段信息
     * @param rowIds 主键id
     * @return 状态
     */
    @Override
    public int deleteChartFieldByRowIds(String[] rowIds) {
        return modbusChartFieldMapper.deleteBatchIds(Arrays.asList(rowIds));
    }

    /**
     * 根据表名称查询折线图所需的数据
     * @param tableName 表名称
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return 数据
     */
    @Override
    public ChartVo selectChartElement(String tableName, String startTime, String endTime) throws ParseException {
        Map<String, List<String>> resultMap = new HashMap<>();
        // 获取现在时间的下一个整点时间
        String endDate = StringUtils.isEmpty(endTime) ? DateUtils.getNextHourDate() : endTime;
        // 获取 endDate 前一天的时间
        String startDate = StringUtils.isEmpty(startTime) ? DateUtils.getBeforeDate(1, endDate) : startTime;

        // 查询被选择显示在图表中的字段信息
        List<ModbusChartField> list = this.findSelectedFields(tableName);

        // 获取图例信息
        List<String> legendData = list.stream().map(ModbusChartField::getFieldComment).collect(Collectors.toList());
        // 获取字段信息，用于mybatis动态拼接sql语句查询
        List<String> fieldNames = list.stream().map(ModbusChartField::getFieldName).collect(Collectors.toList());
        // 用于图表中图例的中英文转换
        Map<String, String> legendConvertMap = list.stream().collect(Collectors.toMap(ModbusChartField::getFieldName, ModbusChartField::getFieldComment));

        List<Map<String,Object>> listMap = modbusChartFieldMapper.selectLineChartData(startDate, endDate, tableName, fieldNames);
        // 循环将查询结果封装为eCharts图表可使用的数据结构
        for (Map<String, Object> map : listMap) {
            for (Map.Entry<String, Object> entry : map.entrySet()) {
                String key = entry.getKey();
                String value = entry.getValue() == null ? "0" : entry.getValue().toString();
                if (resultMap.containsKey(key)) {
                    List<String> remove = resultMap.remove(key);
                    remove.add(value);
                    resultMap.put(key, remove);
                } else {
                    resultMap.put(key, new ArrayList<>(Collections.singletonList(value)));
                }
            }
        }
        return ChartVo.builder()
                .legendData(legendData)
                .fieldNames(fieldNames)
                .legendConvertMap(legendConvertMap)
                .resultMap(resultMap)
                .build();
    }

    /**
     * 根据表名及字段名称查询数量
     * @param tableName 表名
     * @param fieldName 字段名称
     * @return 符合条件的记录数量
     */
    private int countField(String tableName, String fieldName) {
        QueryWrapper<ModbusChartField> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .eq(ModbusChartField::getParentTableName, tableName)
                .eq(ModbusChartField::getFieldName, fieldName);
        return modbusChartFieldMapper.selectCount(queryWrapper);
    }

    /**
     * 根据数据表名称，查询被选择在图表中展示的字段列表信息
     * @param tableName 数据表名称
     * @return list
     */
    private List<ModbusChartField> findSelectedFields(String tableName) {
        QueryWrapper<ModbusChartField> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .eq(ModbusChartField::getParentTableName, tableName)
                .eq(ModbusChartField::getFieldStatus, "1")
                .eq(ModbusChartField::getIsSelected, "1")
                .orderByAsc(ModbusChartField::getOrderNum);
        return modbusChartFieldMapper.selectList(queryWrapper);
    }

    /**
     * 找出在子串subList在list中不存在的元素
     * @param list list
     * @param subList 子串
     * @return 不同元素
     */
    private List<String> findListDifferent(List<String> list, List<String> subList) {
        List<String> retList = new LinkedList<>();
        for (String var1 : subList) {
            if (!list.contains(var1)) {
                retList.add(var1);
            }
        }
        return retList;
    }
}
