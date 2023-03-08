package com.ruoyi.project.datasource.modbus.equipment.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.ruoyi.framework.aspectj.lang.annotation.Excel;
import com.ruoyi.project.datasource.modbus.field.annotation.DevAttributes;
import com.ruoyi.project.datasource.modbus.field.type.FieldType;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * 冷却塔
 * @author ruoyi
 * @date 2022-03-28
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@TableName("modbus_cool_tower")
public class ModbusCoolTower
{

    /** 主键ID */
    @TableId(value = "row_id",type = IdType.UUID)
    private String rowId;

    /** 系统启停_TCP */
    @DevAttributes(fieldType = FieldType.WRITE_ONLY)
    @Excel(name = "系统启停_TCP")
    private Integer systemStartStopTcp;

    /** 系统运行状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "系统运行状态")
    private Integer systemStatus;

    /** 水泵运行状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "水泵运行状态")
    private Integer waterPumpStatus;

    /** 出水季节切换阀 开状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "出水季节切换阀 开状态")
    private Integer outletSeasonValveStatus;

    /** 回水季节切换阀 开状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "回水季节切换阀 开状态")
    private Integer backSeansonValveStatus;

    /** 水泵远程状态1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "水泵远程状态1")
    private Integer waterPumpRotateStatus1;

    /** 水泵远程状态2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "水泵远程状态2")
    private Integer waterPumpRotateStatus2;

    /** 水泵远程状态3--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "水泵远程状态3")
    private Integer waterPumpRotateStatus3;

    /** 水泵运行状态1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "水泵运行状态1")
    private Integer waterPumpStatus1;

    /** 水泵运行状态2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "水泵运行状态2")
    private Integer waterPumpStatus2;

    /** 水泵运行状态3--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "水泵运行状态3")
    private Integer waterPumpStatus3;

    /** 冷却风扇1运行状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷却风扇1运行状态")
    private Integer coolFanStatus1;

    /** 冷却风扇2运行状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷却风扇2运行状态")
    private Integer coolFanStatus2;

    /** 冷却风扇3运行状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷却风扇3运行状态")
    private Integer coolFanStatus3;

    /** 冷却管道2模式状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷却管道2模式状态")
    private Integer coolPipelineStatus2;

    /** 冷却管道1模式状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷却管道1模式状态")
    private Integer coolPipelineStatus1;

    /** 冷却塔状态--0:手动 1:自动 */
    @DevAttributes
    @Excel(name = "冷却塔状态")
    private Integer coolTowerStatus;

    /** 补水管电伴热电源--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "补水管电伴热电源")
    private Integer waterPipeElePower;

    /** 恒压补水电源--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "恒压补水电源")
    private Integer conPressWaterSup;

    /** 冷冻水加药开停--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷冻水加药开停")
    private Integer freezingWaterOnOff;

    /** 冷却水加药开停--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷却水加药开停")
    private Integer coolWaterOnOff;

    /** 冷冻水加药开启度--小数0位 */
    @DevAttributes
    @Excel(name = "冷冻水加药开启度")
    private Integer freezingWaterOnOffOpen;

    /** 冷却水加药开启度--小数0位 */
    @DevAttributes
    @Excel(name = "冷却水加药开启度")
    private Integer coolWaterOnOffOpen;

    /** 运行模式--螺杆制冷状态=1；冷却塔制冷状态=2； */
    @DevAttributes
    @Excel(name = "运行模式")
    private Integer runMode;

    /** 环境温度--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "环境温度")
    private BigDecimal environmentTemp;

    /** 温控二通旁通阀开度--小数0位 */
    @DevAttributes
    @Excel(name = "温控二通旁通阀开度")
    private Integer tempTwoValveOpen;

    /** 冷却系统出水压力--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "冷却系统出水压力")
    private BigDecimal coolSysOutletPress;

    /** 风扇轮值 时--小数0位 */
    @DevAttributes
    @Excel(name = "风扇轮值 时")
    private Integer fanRotateHour;

    /** 风扇轮值 分--小数0位 */
    @DevAttributes
    @Excel(name = "风扇轮值 分")
    private Integer fanRotateMin;

    /** 水泵轮值运行 时--小数0位 */
    @DevAttributes
    @Excel(name = "水泵轮值运行 时")
    private Integer waterPumpRotateHour;

    /** 水泵轮值运行 分--小数0位 */
    @DevAttributes
    @Excel(name = "水泵轮值运行 分")
    private Integer waterPumpRotateMin;

    /** 冷却系统流量--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "冷却系统流量")
    private BigDecimal coolSysFlow;

    /** 冷却泵频率反馈1--小数0位 */
    @DevAttributes
    @Excel(name = "冷却泵频率反馈1")
    private Integer coolPumpHzFeedback1;

    /** 冷却泵频率反馈2--小数0位 */
    @DevAttributes
    @Excel(name = "冷却泵频率反馈2")
    private Integer coolPumpHzFeedback2;

    /** 冷却泵频率反馈3--小数0位 */
    @DevAttributes
    @Excel(name = "冷却泵频率反馈3")
    private Integer coolPumpHzFeedback3;

    /** 冷却侧供水温度--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "冷却侧供水温度")
    private BigDecimal coolSupWaterTemp;

    /** 冷却侧回水温度--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "冷却侧回水温度")
    private BigDecimal coolRetWaterTemp;

    /** 冷冻侧供水温度--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "冷冻侧供水温度")
    private BigDecimal freezingSupWaterTemp;

    /** 冷冻侧回水温度--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "冷冻侧回水温度")
    private BigDecimal freezingRetWaterTemp;

    /** 运行 天--小数0位 */
    @DevAttributes
    @Excel(name = "运行 天")
    private Integer runDay;

    /** 运行 时--小数0位 */
    @DevAttributes
    @Excel(name = "运行 时")
    private Integer runHour;

    /** 变频器故障保护状态1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "变频器故障保护状态1")
    private Integer inverterFaultProtectionStatus1;

    /** 变频器故障保护状态2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "变频器故障保护状态2")
    private Integer inverterFaultProtectionStatus2;

    /** 变频器故障保护状态3--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "变频器故障保护状态3")
    private Integer inverterFaultProtectionStatus3;

    /** 冷却塔分机故障1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷却塔分机故障1")
    private Integer coolTowerFanFault1;

    /** 冷却塔分机故障2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷却塔分机故障2")
    private Integer coolTowerFanFault2;

    /** 冷却塔分机故障3--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷却塔分机故障3")
    private Integer coolTowerFanFault3;

    /** EH水流量1--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH水流量1")
    private BigDecimal ehFlow1;

    /** EH进水温度1--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH进水温度1")
    private BigDecimal ehInWaterTemp1;

    /** EH出水温度1--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH出水温度1")
    private BigDecimal ehOutWaterTemp1;

    /** EH实时能耗1--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH实时能耗1")
    private BigDecimal ehRtEnergyCon1;

    /** EH水流量2--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH水流量2")
    private BigDecimal ehFlow2;

    /** EH进水温度2--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH进水温度2")
    private BigDecimal ehInWaterTemp2;

    /** EH出水温度2--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH出水温度2")
    private BigDecimal ehOutWaterTemp2;

    /** EH实时能耗2--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH实时能耗2")
    private BigDecimal ehRtEnergyCon2;

    /** EH水流量3--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH水流量3")
    private BigDecimal ehFlow3;

    /** EH进水温度3--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH进水温度3")
    private BigDecimal ehInWaterTemp3;

    /** EH出水温度3--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH出水温度3")
    private BigDecimal ehOutWaterTemp3;

    /** EH实时能耗3--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH实时能耗3")
    private BigDecimal ehRtEnergyCon3;

    /** EH水流量ALL--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH水流量ALL")
    private BigDecimal ehFlowAll;

    /** EH总能量1--小数1位 双字 */
    @DevAttributes(is32Float = true, isDecimal = "1")
    @Excel(name = "EH总能量1")
    private BigDecimal ehTotalEnergy1;

    /** EH总能量2--小数1位 双字 */
    @DevAttributes(is32Float = true, isDecimal = "1")
    @Excel(name = "EH总能量2")
    private BigDecimal ehTotalEnergy2;

    /** EH总能量3--小数1位 双字 */
    @DevAttributes(is32Float = true, isDecimal = "1")
    @Excel(name = "EH总能量3")
    private BigDecimal ehTotalEnergy3;

    /** 创建时间 */
    @Excel(name = "创建时间", width = 30, dateFormat = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    /** 更新时间 */
    @Excel(name = "更新时间", width = 30, dateFormat = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;

    /** 请求参数-开始时间 */
    @TableField(exist = false)
    private String startTime;

    /** 请求参数-开始时间 */
    @TableField(exist = false)
    private String endTime;

    /** 用于导出字段本次所选的字段 */
    @TableField(exist = false)
    private List<String> fieldExport;

    /** 用于导出字段是否记住本次所选的字段 */
    @TableField(exist = false)
    private Boolean isRemember;

    /** 用于导出字段提示信息是否继续提示 1:提示 2:取消 */
    @TableField(exist = false)
    private String isRead;

}
