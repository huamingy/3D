package com.ruoyi.project.datasource.modbus.base.service.impl;

import cn.hutool.db.Db;
import cn.hutool.db.Entity;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.ruoyi.common.utils.DateUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.project.datasource.chart.domain.ModbusChartField;
import com.ruoyi.project.datasource.chart.service.IModbusChartFieldService;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusBaseEntity;
import com.ruoyi.project.datasource.modbus.base.mapper.ModbusBaseEntityMapper;
import com.ruoyi.project.datasource.modbus.base.service.IModbusBaseEntityService;
import com.ruoyi.project.datasource.modbus.base.vo.DeviceStatusVo;
import com.ruoyi.project.datasource.modbus.base.vo.energy.EnergyCenterVo;
import com.ruoyi.project.datasource.modbus.base.vo.energy.EnergyLeftVo;
import com.ruoyi.project.datasource.modbus.base.vo.energy.EnergyRightVo;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusCoolTower;
import com.ruoyi.project.datasource.modbus.equipment.domain.ModbusCraftOuter;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusCoolTowerService;
import com.ruoyi.project.datasource.modbus.equipment.service.IModbusCraftOuterService;
import com.ruoyi.project.datasource.modbus.vo.FaultVo;
import com.ruoyi.project.datasource.modbus.vo.TableFieldVo;
import com.ruoyi.project.datasource.modbus.vo.TableVo;
import com.ruoyi.project.datasource.modbus.vo.WaterLevelVo;
import com.ruoyi.project.datasource.modbus.base.vo.RankVo;
import com.ruoyi.project.datasource.modbus.base.vo.ScreenVo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author niminui
 * @date 2022/3/29 9:31
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class IModbusBaseEntityServiceImpl extends ServiceImpl<ModbusBaseEntityMapper, ModbusBaseEntity> implements IModbusBaseEntityService {

    @Resource
    private ModbusBaseEntityMapper modbusBaseEntityMapper;
    @Resource
    private IModbusChartFieldService modbusChartFieldService;
    @Resource
    private IModbusCoolTowerService coolTowerService;
    @Resource
    private IModbusCraftOuterService craftOuterService;

    private static final Map<String, String> DEVICE_RANK_NAME = new HashMap<>();
    private static final Map<String, List<String>> AHU_ROOM_FIELD = new HashMap<>();
    static {
        DEVICE_RANK_NAME.put("ModbusAhu1", "air_supply_temp");
        DEVICE_RANK_NAME.put("ModbusAhu2", "air_supply_temp");
        DEVICE_RANK_NAME.put("ModbusAhu3", "air_supply_temp");
        DEVICE_RANK_NAME.put("ModbusAhu4", "air_supply_temp");
        DEVICE_RANK_NAME.put("ModbusAhu5", "air_supply_temp");
        DEVICE_RANK_NAME.put("ModbusAhu6", "air_supply_temp");
        DEVICE_RANK_NAME.put("ModbusAhu7", "air_supply_temp");
        DEVICE_RANK_NAME.put("ModbusAhu8", "air_supply_temp");
        DEVICE_RANK_NAME.put("ModbusCoolTower", "cool_sup_water_temp"); //冷却侧供水温度
        DEVICE_RANK_NAME.put("ModbusCraftInner", "craft_sup_water_temp"); //工艺供水温度
        DEVICE_RANK_NAME.put("ModbusCraftOuter", "sys_ret_water_temp"); //系统回水温度
        DEVICE_RANK_NAME.put("ModbusScrewMachine", "freezing_out_temp1"); //冷冻出水温度1

        AHU_ROOM_FIELD.put("ModbusAhu1", Arrays.asList("temp1", "temp2", "temp3", "temp4", "temp5", "temp6", "temp7", "temp8"));
        AHU_ROOM_FIELD.put("ModbusAhu2", Arrays.asList("temp1", "temp2", "temp3", "temp4", "temp5", "temp6", "temp7"));
        AHU_ROOM_FIELD.put("ModbusAhu3", Arrays.asList("temp1", "temp2", "temp3", "temp4", "temp5", "temp6", "temp7"));
        AHU_ROOM_FIELD.put("ModbusAhu4", Arrays.asList("temp1", "temp2", "temp3", "temp4", "temp5", "temp6", "temp7"));
        AHU_ROOM_FIELD.put("ModbusAhu5", Arrays.asList("temp1", "temp2", "temp3", "temp4", "temp5", "temp6", "temp7"));
        AHU_ROOM_FIELD.put("ModbusAhu6", Arrays.asList("temp1", "temp2", "temp3", "temp4", "temp5", "temp6", "temp7"));
        AHU_ROOM_FIELD.put("ModbusAhu7", Arrays.asList("temp1", "temp2", "temp3", "temp4", "temp5"));
    }

    /**
     * 查询超快楼系统列表
     * @param modbusBaseEntity 查询参数
     * @return 返回系统列表
     */
    @Override
    public List<ModbusBaseEntity> selectModbusBaseEntityList(ModbusBaseEntity modbusBaseEntity) {
        QueryWrapper<ModbusBaseEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .like(StringUtils.isNotEmpty(modbusBaseEntity.getSystemName()), ModbusBaseEntity::getSystemName, modbusBaseEntity.getSystemName())
                .like(StringUtils.isNotEmpty(modbusBaseEntity.getClassName()), ModbusBaseEntity::getClassName, modbusBaseEntity.getClassName())
                .like(StringUtils.isNotEmpty(modbusBaseEntity.getSystemIpHost()), ModbusBaseEntity::getSystemIpHost, modbusBaseEntity.getSystemIpHost())
                .eq(modbusBaseEntity.getStatus() != null, ModbusBaseEntity::getStatus, modbusBaseEntity.getStatus())
                .orderByAsc(ModbusBaseEntity::getCreateTime);
        return modbusBaseEntityMapper.selectList(queryWrapper);
    }

    /**
     * 获取超快楼系统详细信息
     * @param rowId 主键id
     * @return 详细信息
     */
    @Override
    public ModbusBaseEntity selectModbusBaseEntityByRowId(String rowId) {
        return modbusBaseEntityMapper.selectById(rowId);
    }

    /**
     * 新增超快楼系统
     * @param modbusBaseEntity 新增参数
     * @return 结果
     */
    @Override
    public int insertModbusBaseEntity(ModbusBaseEntity modbusBaseEntity) {
        modbusBaseEntity.setCreateTime(new Date());
        return modbusBaseEntityMapper.insert(modbusBaseEntity);
    }

    /**
     * 修改超快楼系统
     * @param modbusBaseEntity 修改参数
     * @return 结果
     */
    @Override
    public int updateModbusBaseEntity(ModbusBaseEntity modbusBaseEntity) {
        modbusBaseEntity.setUpdateTime(new Date());
        return modbusBaseEntityMapper.updateById(modbusBaseEntity);
    }

    /**
     * 删除超快楼系统
     * @param rowIds 需要删除的rowIds
     * @return 结果
     */
    @Override
    public int deleteModbusBaseEntityByRowIds(String[] rowIds) {
        return modbusBaseEntityMapper.deleteBatchIds(Arrays.asList(rowIds));
    }

    /**
     * 获取所有status为启用(即为1)的系统列表
     * @return 列表
     */
    @Override
    public List<ModbusBaseEntity> getAllSystem() {
        QueryWrapper<ModbusBaseEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .eq(ModbusBaseEntity::getStatus, 1)
                .orderByAsc(ModbusBaseEntity::getCreateTime);
        return modbusBaseEntityMapper.selectList(queryWrapper);
    }

    /**
     * 查询以"modbus"开头的所有表名称
     * @return 结果
     */
    @Override
    public List<TableVo> selectModbusTable() {
        List<TableVo> list = modbusBaseEntityMapper.selectModbusTable();
        for (TableVo vo : list) {
            vo.setTableComment(vo.getTableName() + "【" + vo.getTableComment() + "】");
        }
        return list;
    }

    /**
     * 根据modbus类型查询信息
     * @param modbusType modbus类型
     * @return
     */
    @Override
    public List<ModbusBaseEntity> selectModbusSystemByType(String modbusType) {
        List<ModbusBaseEntity> list = new ArrayList<>();
        QueryWrapper<ModbusBaseEntity> queryWrapper = new QueryWrapper<>();
        if (StringUtils.isNotEmpty(modbusType)) {
            modbusType = modbusType.toLowerCase();
            String prefix = modbusType.substring(0, 1).toUpperCase();
            String tempType = prefix + modbusType.substring(1).toLowerCase();
            queryWrapper.lambda()
                    .eq(ModbusBaseEntity::getClassName, tempType);
            list.add(modbusBaseEntityMapper.selectOne(queryWrapper));
        } else {
            list.addAll(modbusBaseEntityMapper.selectList(queryWrapper));
        }
        return list;
    }

    /**
     * 查询系统状态（大屏总览数据）
     * @return list
     */
    @Override
    public List<ScreenVo> selectModbusStatus() {
        List<ScreenVo> tempList = new ArrayList<>();
        Date nowDate = DateUtils.getNowDate();
        List<ModbusBaseEntity> baseList = modbusBaseEntityMapper.selectList(new QueryWrapper<>());
        Map<Integer, Integer> map = new HashMap<>();

        for (ModbusBaseEntity entity : baseList) {
            Date createTime = modbusBaseEntityMapper.selectDataTopFromTable(entity.getTableName());
            long interval = DateUtils.calculateInterval(nowDate, createTime);
            int flag = interval > 10 * 60 * 1000 ? 2 : entity.getStatus();// 1启用，0禁用，2数据异常
            if (map.containsKey(flag)) {
                Integer remove = map.remove(flag);
                remove++;
                map.put(flag, remove);
            } else {
                map.put(flag, 1);
            }
        }

        if (map.size() != 3) {
            // 若不存在正常设备，则将数量设为0
            if (map.getOrDefault(1, -1) == -1) {
                map.put(1, 0);
            }
            // 若不存在异常设备，则将数量设为0
            if (map.getOrDefault(2, -1) == -1) {
                map.put(2, 0);
            }
            // 若不存在停用设备，则将数量设为0
            if (map.getOrDefault(0, -1) == -1) {
                map.put(0, 0);
            }
        }

        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            tempList.add(new ScreenVo(entry.getKey() == 1
                    ? "正常设备" :
                    (entry.getKey() == 2 ? "异常设备" : "停用设备"), entry.getValue()));
        }

        ScreenVo normal = tempList.stream().filter(item -> StringUtils.equals(item.getName(), "正常设备")).findFirst().get();
        ScreenVo abnormal = tempList.stream().filter(item -> StringUtils.equals(item.getName(), "异常设备")).findFirst().get();
        ScreenVo disable = tempList.stream().filter(item -> StringUtils.equals(item.getName(), "停用设备")).findFirst().get();
        return new ArrayList<>(Arrays.asList(normal, abnormal, disable));
    }

    /**
     * 查询modbus温度排名前10的设备
     * @return map
     */
    @Override
    public Map<String, List<String>> selectModbusRankTop10() {
        Map<String, List<String>> retMap = new HashMap<>();
        List<RankVo> screenVos = new ArrayList<>();
        Map<String, String> parameterMap = new HashMap<>();
        List<ModbusBaseEntity> baseList = modbusBaseEntityMapper.selectList(new QueryWrapper<>());
        for (ModbusBaseEntity entity : baseList) {
            List<ModbusChartField> list = modbusChartFieldService.selectDatabaseFieldWithTemp(entity.getTableName());
            ModbusChartField field = selectTempRankField(list);
            parameterMap.put("tableName", entity.getTableName());
            parameterMap.put("fieldName", field.getFieldName());
            BigDecimal tempVale = modbusBaseEntityMapper.selectTopData(parameterMap);
            screenVos.add(new RankVo(entity.getSystemName(), tempVale));
        }
        screenVos.sort((o1, o2) -> {
            BigDecimal tag1 = o1.getValue();
            BigDecimal tag2 = o2.getValue();
            return -tag1.compareTo(tag2);
        });

        List<String> names = new ArrayList<>();
        List<String> values = new ArrayList<>();
        for (int i = 0; i < 8; i++) {
            RankVo rankVo = screenVos.get(i);
            names.add(rankVo.getName());
            values.add(rankVo.getValue().toString());
        }
        retMap.put("xValue", values);
        retMap.put("yValue", names);
        return retMap;
    }

    /**
     * 根据表名称查询表信息
     * @param tableName
     * @return
     */
    @Override
    public ModbusBaseEntity selectTableInformation(String tableName) {
        QueryWrapper<ModbusBaseEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.lambda()
                .eq(ModbusBaseEntity::getTableName, tableName);
        return modbusBaseEntityMapper.selectOne(queryWrapper);
    }

    /**
     * 查询modbus数据采集数量统计(全部/本周/当天)
     * @return 统计数据
     */
    @Override
    public List<WaterLevelVo> selectModbusCount() throws ParseException {
        List<WaterLevelVo> levelVos = new ArrayList<>();
        int countALL = 0, countWeek = 0, countDay = 0;
        String nowDate = DateUtils.parseDateToStr("yyyy-MM-dd HH:mm:ss", new Date());
        String nowDate2 = DateUtils.parseDateToStr("yyyy-MM-dd", new Date());
        String beforeDate = DateUtils.getBeforeDate(7, nowDate);

        List<TableVo> tableList = this.selectModbusTable();
        for (TableVo tableVo : tableList) {
            countALL += modbusBaseEntityMapper.selectCountByTable(tableVo.getTableName(), "", "");
            countWeek += modbusBaseEntityMapper.selectCountByTable(tableVo.getTableName(), beforeDate, nowDate);
            countDay += modbusBaseEntityMapper.selectCountByTable(tableVo.getTableName(), nowDate2 + " 00:00:00", nowDate2 + " 23:59:59");
        }

        String weekPercent = String.valueOf(Math.ceil(percentage(countWeek, countALL, 2)));
        String dayPercent = String.valueOf(Math.ceil(percentage(countDay, countALL, 2)));

        levelVos.add(new WaterLevelVo(countALL, 1, "100"));
        levelVos.add(new WaterLevelVo(countWeek, 2, weekPercent));
        levelVos.add(new WaterLevelVo(countDay, 3, dayPercent));
        return levelVos;
    }

    /**
     * 查询Modbus实时检测所需的数据
     * 注意：
     *      ①、此处"设备正常"指在modbus_base_entity表中status=1的设备
     *      ①、此处"数据正常"指在modbus设备有最新数据
     * @return
     */
    @Override
    public Map<String, Integer> selectDeviceWithStatus() {
        Map<String, Integer> map = new HashMap<>();
        String startTime = DateUtils.getBeforeMinDate(10);
        List<DeviceStatusVo> list = modbusBaseEntityMapper.selectDeviceWithStatus(startTime);
        List<FaultVo> faultVos = selectDeviceDetails();
        int offline = (int) list.stream().filter(o -> o.getDeviceStatus() == 0).count();
        int fault = (int) faultVos.stream().filter(o -> !StringUtils.equals(o.getDeviceName(), "暂无")).count();
        int total = 113;

        map.put("normal", total - offline - fault); //正常设备
        map.put("fault", fault); //故障设备
        map.put("offline", offline); //离线设备
        return map;
    }

    /**
     * 查询Modbus设备中故障字段为1的故障列表
     * @return 结果
     */
    @Override
    public List<FaultVo> selectDeviceDetails() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        List<FaultVo> faultVos = new LinkedList<>();
        List<TableVo> tableVos = modbusBaseEntityMapper.selectModbusTable();
        List<ModbusBaseEntity> baseList = selectModbusSystemByType("");
        Map<String, String> tableMap = baseList.stream().collect(Collectors.toMap(ModbusBaseEntity::getTableName, ModbusBaseEntity::getSystemName));
        try {
            for (TableVo tableVo : tableVos) {
                StringBuilder sql = new StringBuilder("select ");
                // 查出tableVo表中所有字段备注中存在“故障”的字段
                List<TableFieldVo> fieldVos = modbusBaseEntityMapper.selectTableFaultField(tableVo.getTableName());
                if (fieldVos.size() > 0) {
                    Map<String, String> fieldMap = fieldVos.stream().collect(Collectors.toMap(TableFieldVo::getFieldName, TableFieldVo::getFieldComment));
                    for (TableFieldVo fieldVo : fieldVos) {
                        sql.append(fieldVo.getFieldName()).append(", ");
                    }
                    String substring = sql.substring(0, sql.length() - 2)  + " from " + tableVo.getTableName() + " order by create_time desc limit 1";
                    List<Entity> result = Db.use().query(substring);
                    for (Map.Entry<String, Object> entry : result.get(0).entrySet()) {

                        //判断每一个故障字段对应的值是否为1(0:正常，1:故障)
                        if (entry.getValue() == (Object) 1) {
                            String faultDescribe = fieldMap.get(entry.getKey());
                            if (StringUtils.contains(faultDescribe, "--")) {
                                faultDescribe = faultDescribe.split("--")[1];
                            }
                            long create_time = ((Timestamp) result.get(0).get("create_time")).getTime();
                            FaultVo faultVo = FaultVo.builder()
                                    .deviceName(tableMap.get(tableVo.getTableName()))
                                    .faultDescribe(faultDescribe)
                                    .createTime(sdf.format(create_time))
                                    .tableName(tableVo.getTableName())
                                    .build();
                            faultVos.add(faultVo);
                        }
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (faultVos.size() == 0) {
                faultVos.add(new FaultVo("暂无", "暂无", "暂无"));
            }
        }
        return faultVos;
    }

    /**
     * 查询Modbus设备详情
     * @return 结果
     */
    @Override
    public List<DeviceStatusVo> selectDeviceDetailsEnergy() {
        String startTime = DateUtils.getBeforeMinDate(10);
        return modbusBaseEntityMapper.selectDeviceWithStatus(startTime);
    }

    /**
     * 查询modbus设备温度排名及设备名称
     * @return map
     */
    @Override
    public EnergyLeftVo selectTempRank() {
        EnergyLeftVo leftVo = new EnergyLeftVo();
        List<RankVo> rankVos = new ArrayList<>();

        List<ModbusBaseEntity> baseList = this.getAllSystem();
        for (ModbusBaseEntity entity : baseList) {
            String value = modbusBaseEntityMapper.selectValueByTableDetails(entity.getTableName(), DEVICE_RANK_NAME.get(entity.getClassName()));
            rankVos.add(new RankVo(entity.getSystemName(), new BigDecimal(value)));
        }

        List<RankVo> collect = rankVos.stream().sorted(Comparator
                .comparing(RankVo::getValue).reversed())
                .collect(Collectors.toList()).subList(0, 10);
        leftVo.setFieldNames(collect.stream().map(RankVo::getName).collect(Collectors.toList()));
        leftVo.setFieldValues(collect.stream().map(RankVo::getValue).collect(Collectors.toList()));
        return leftVo;
    }

    /**
     * 查询能耗数据
     * @return EnergyCenterVo
     */
    @Override
    public EnergyCenterVo selectEnergyData() {
        ModbusCoolTower coolTower = coolTowerService.selectNewestData();
        ModbusCraftOuter craftOuter = craftOuterService.selectNewestData();

        BigDecimal totalEnergy = coolTower.getEhTotalEnergy1()
                .add(coolTower.getEhTotalEnergy2())
                .add(coolTower.getEhTotalEnergy3())
                .add(craftOuter.getEhTotalEnergy())
                .divide(new BigDecimal(4), 2, BigDecimal.ROUND_HALF_UP);
        BigDecimal realTimeEnergy = coolTower.getEhRtEnergyCon1()
                .add(coolTower.getEhRtEnergyCon2())
                .add(coolTower.getEhRtEnergyCon3())
                .add(craftOuter.getEhRtEnergyCon())
                .divide(new BigDecimal(4), 2, BigDecimal.ROUND_HALF_UP);
        BigDecimal waterFlow = coolTower.getEhFlow1()
                .add(coolTower.getEhFlow2())
                .add(coolTower.getEhFlow3())
                .add(craftOuter.getEhFlow())
                .divide(new BigDecimal(4), 2, BigDecimal.ROUND_HALF_UP);

        int maxRunDay = 0;
        List<ModbusBaseEntity> baseList = this.getAllSystem();
        for (ModbusBaseEntity entity : baseList) {
            String value = modbusBaseEntityMapper.selectValueByTableDetails(entity.getTableName(), "run_day");
            maxRunDay = Math.max(Integer.parseInt(value), maxRunDay);
        }
        return EnergyCenterVo.builder()
                .totalEnergy(totalEnergy.toString())
                .realTimeEnergy(realTimeEnergy.toString())
                .waterFlow(waterFlow.toString())
                .maxRunDay(String.valueOf(maxRunDay))
                .build();
    }

    /**
     * 查询横向胶囊图的数据
     * @return EnergyRightVo
     */
    @Override
    public EnergyRightVo selectCapsuleData() {
        Map<String, BigDecimal> totalMap = new LinkedHashMap<>();
        List<ModbusBaseEntity> baseList = this.getAllSystem();
        for (ModbusBaseEntity entity : baseList) {
            if (AHU_ROOM_FIELD.containsKey(entity.getClassName())) {
                LinkedHashMap<String, BigDecimal> map = modbusBaseEntityMapper.selectTempList(entity.getTableName(), AHU_ROOM_FIELD.get(entity.getClassName()));
                for (Map.Entry<String, BigDecimal> entry : map.entrySet()) {
                    if (totalMap.containsKey(entry.getKey()) && !(entry.getValue().compareTo(new BigDecimal(0)) == 0)) {
                        BigDecimal contains = totalMap.get(entry.getKey());
                        BigDecimal divide = contains.add(entry.getValue()).divide(new BigDecimal(2), 2, BigDecimal.ROUND_HALF_UP);
                        totalMap.put(entry.getKey(), divide);
                    } else {
                        totalMap.put(entry.getKey(), entry.getValue());
                    }
                }
            }
        }
        return EnergyRightVo.builder().capsuleData(totalMap).build();
    }

    /**
     * 查询实时能耗曲线图数据
     * @return 数据
     */
    @Override
    public Map<String, List<String>> selectRealTimeChartData() {
        Map<String, List<String>> resultMap = new HashMap<>();
        String currentDate = DateUtils.dateTimeNow("yyyy-MM-dd");
        List<String> days = DateUtils.getDays(currentDate, 7);

        List<String> coolTowerList = coolTowerService.selectEnergyLineData(days.get(0) + " 00:00:00", currentDate + " 23:59:59");
        List<String> craftOuterList = craftOuterService.selectEnergyLineData(days.get(0) + " 00:00:00", currentDate + " 23:59:59");

        resultMap.put("timeline", days);
        resultMap.put("coolTowerList", coolTowerList);
        resultMap.put("craftOuterList", craftOuterList);
        return resultMap;
    }

    /**
     * 查询 list 中的温度数据
     * @param list list
     * @return 温度数据
     */
    private ModbusChartField selectTempRankField(List<ModbusChartField> list) {
        ModbusChartField var = null;
        for (ModbusChartField field : list) {
            if (StringUtils.equals(field.getFieldName(), "temp1")) {
                var = field;
                break;
            } else if (StringUtils.equals(field.getFieldName(), "air_supply_temp")) {
                var = field;
                break;
            } else if (StringUtils.equals(field.getFieldName(), "environment_temp")) {
                var = field;
                break;
            } else if (StringUtils.equals(field.getFieldName(), "craft_sup_water_temp")) {
                var = field;
                break;
            } else if (StringUtils.equals(field.getFieldName(), "sys_ret_water_temp")) {
                var = field;
                break;
            } else if (StringUtils.equals(field.getFieldName(), "cool_down_out_temp1")) {
                var = field;
                break;
            }
        }
        return var;
    }

    /**
     * @param d1：分子；
     * @param zs：分母；
     * @param dot：要保留的小数
     * @return
     * @Description: 计算百分比
     * @date 2022/4/2 16:50
     */
    public static double percentage(int d1, int zs, int dot) {
        double bs = Math.pow(10.0, toDouble(dot + 2, 0.0));
        double cs = Math.pow(10.0, toDouble(dot, 0.0));
        double num = 0.0;
        if (zs > 0) {
            num = Math.floor(d1 * bs / zs) / cs;
        }
        return num;
    }

    /**
     * 将object转为double
     * @param value 目标值
     * @param defaultValue 若object为空时的默认值
     * @return double
     */
    private static Double toDouble(Object value, Double defaultValue) {
        if (null == value) {
            return defaultValue;
        }
        return Double.parseDouble(value.toString());
    }
}
