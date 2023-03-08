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
 * 工艺水外机
 * @author ruoyi
 * @date 2022-03-28
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@TableName("modbus_craft_outer")
public class ModbusCraftOuter {

    /** 主键ID */
    @TableId(value = "row_id",type = IdType.UUID)
    private String rowId;

    /** 系统启停_TCP--置位复位（点动） */
    @DevAttributes(fieldType = FieldType.WRITE_ONLY)
    @Excel(name = "系统启停_TCP")
    private Integer systemStartStopTcp;

    /** 水机故障复位--置位复位（点动） */
    @DevAttributes(fieldType = FieldType.WRITE_ONLY)
    @Excel(name = "水机故障复位")
    private Integer waterplaneFaultReset;

    /** 水泵开停状态1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "水泵开停状态1")
    private Integer waterPumpStatus1;

    /** 水泵开停状态2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "水泵开停状态2")
    private Integer waterPumpStatus2;

    /** 系统启停状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "系统启停状态")
    private Integer systemStartStopStatus;

    /** 一次泵运行状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "一次泵运行状态")
    private Integer onePumpStatus;

    /** 运行 天--小数0位 */
    @DevAttributes
    @Excel(name = "运行 天")
    private Integer runDay;

    /** 运行 时--小数0位 */
    @DevAttributes
    @Excel(name = "运行 时")
    private Integer runHour;

    /** 一次泵轮值运行 时 */
    @DevAttributes
    @Excel(name = "一次泵轮值运行 时")
    private Integer onePumpRotateHour;

    /** 一次泵轮值运行 分 */
    @DevAttributes
    @Excel(name = "一次泵轮值运行 分")
    private Integer onePumpRotateMin;

    @DevAttributes
    @Excel(name = "水机开关机状态")
    private Integer waterplaneStatus;

    /** 系统回水温度--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "系统回水温度")
    private BigDecimal sysRetWaterTemp;

    /** 系统出水温度--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "系统出水温度")
    private BigDecimal sysOutWaterTemp;

    /** 外环境温度--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "外环境温度")
    private BigDecimal outEnvironmentTemp;

    /** 输出载荷% */
    @DevAttributes
    @Excel(name = "输出载荷%")
    private Integer outputLoad;

    /** 一次泵故障自保1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "一次泵故障自保1")
    private Integer onePumpFaultProtect1;

    /** 一次泵故障自保2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "一次泵故障自保2")
    private Integer onePumpFaultProtect2;

    /** 水机故障状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "水机故障状态")
    private Integer waterplaneFaultStatus;

    /** EH水流量--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH水流量")
    private BigDecimal ehFlow;

    /** EH进水温度--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH进水温度")
    private BigDecimal ehInWaterTemp;

    /** EH出水温度--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH出水温度")
    private BigDecimal ehOutWaterTemp;

    /** EH实时能耗--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "EH实时能耗")
    private BigDecimal ehRtEnergyCon;

    /** EH总能量--32位浮点 */
    @DevAttributes(is32Float = true, isDecimal = "1")
    @Excel(name = "EH总能量")
    private BigDecimal ehTotalEnergy;

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
