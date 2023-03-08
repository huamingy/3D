package com.ruoyi.project.datasource.modbus.equipment.domain;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.ruoyi.project.datasource.modbus.field.annotation.DevAttributes;
import lombok.*;
import com.ruoyi.framework.aspectj.lang.annotation.Excel;

/**
 * 螺杆机
 * @author ruoyi
 * @date 2022-03-28
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@TableName("modbus_screw_machine")
public class ModbusScrewMachine {

    /** 主键id */
    @TableId(value = "row_id",type = IdType.UUID)
    private String rowId;

    /** 开启冷却塔提示--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "开启冷却塔提示")
    private Integer openCoolTowerHint;

    /** 冷却塔制冷提示--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷却塔制冷提示")
    private Integer coolTowerRefrigerationStatus;

    /** 系统启停状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "系统启停状态")
    private Integer systemStartStopStatus;

    /** 螺杆机运行状态1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "螺杆机运行状态1")
    private Integer screwStatus1;

    /** 螺杆机运行状态2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "螺杆机运行状态2")
    private Integer screwStatus2;

    /** 螺杆机运行状态3--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "螺杆机运行状态3")
    private Integer screwStatus3;

    /** 冷冻水泵运行状态1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷冻水泵运行状态1")
    private Integer coolWaterPumpStatus1;

    /** 冷冻水泵运行状态2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷冻水泵运行状态2")
    private Integer coolWaterPumpStatus2;

    /** 冷冻水泵运行状态3--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷冻水泵运行状态3")
    private Integer coolWaterPumpStatus3;

    /** 冷冻水泵远程状态1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷冻水泵远程状态1")
    private Integer coolWaterPumpRemoteStatus1;

    /** 冷冻水泵远程状态2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷冻水泵远程状态2")
    private Integer coolWaterPumpRemoteStatus2;

    /** 冷冻水泵远程状态3--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷冻水泵远程状态3")
    private Integer coolWaterPumpRemoteStatus3;

    /** 冷冻水泵运行状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷冻水泵运行状态")
    private Integer coolWaterPumpStatus;

    /** 螺杆机冷冻/却阀开状态1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "螺杆机冷冻/却阀开状态1")
    private Integer screwCoolStatus1;

    /** 螺杆机冷冻/却阀开状态2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "螺杆机冷冻/却阀开状态2")
    private Integer screwCoolStatus2;

    /** 螺杆机冷冻/却阀开状态3--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "螺杆机冷冻/却阀开状态3")
    private Integer screwCoolStatus3;

    /** 冷冻管道状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷冻管道状态")
    private Integer coolPipelineStatus;

    /** 运行方式--0:自动 1:手动 */
    @DevAttributes
    @Excel(name = "运行方式")
    private Integer operationType;

    /** 冷冻系统供回水压差--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "冷冻系统供回水压差")
    private BigDecimal coolSystemReturn;

    /** 冷冻系统回水压力--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "冷冻系统回水压力")
    private BigDecimal coolSystemReturnPress;

    /** 压差旁通阀开度--小数0位 */
    @DevAttributes
    @Excel(name = "压差旁通阀开度")
    private Integer difPressValveOpen;

    /** 冷冻系统出水压力--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "冷冻系统出水压力")
    private BigDecimal coolSystemOutPress;

    /** 冷冻泵频率反馈1--小数0位 */
    @DevAttributes
    @Excel(name = "冷冻泵频率反馈1")
    private Integer coolPumpHzFeedback1;

    /** 冷冻泵频率反馈2--小数0位 */
    @DevAttributes
    @Excel(name = "冷冻泵频率反馈2")
    private Integer coolPumpHzFeedback2;

    /** 冷冻泵频率反馈3--小数0位 */
    @DevAttributes
    @Excel(name = "冷冻泵频率反馈3")
    private Integer coolPumpHzFeedback3;

    /** 运行 天--小数0位  */
    @DevAttributes
    @Excel(name = "运行 天")
    private Integer runDay;

    /** 运行 时--小数0位 */
    @DevAttributes
    @Excel(name = "运行 时")
    private Integer runHour;

    /** 螺杆机轮值运行 时--小数0位 */
    @DevAttributes
    @Excel(name = "螺杆机轮值运行 时")
    private Integer screwRotateRunHour;

    /** 螺杆机轮值运行 分--小数0位 */
    @DevAttributes
    @Excel(name = "螺杆机轮值运行 分")
    private Integer screwRotateRunMin;

    /** 冷冻水泵轮值运行 时--小数0位 */
    @DevAttributes
    @Excel(name = "冷冻水泵轮值运行 时")
    private Integer coolPumpRotateRunHour;

    /** 冷冻水泵轮值运行 分--小数0位 */
    @DevAttributes
    @Excel(name = "冷冻水泵轮值运行 分")
    private Integer coolPumpRotateRunMin;

    /** 螺杆机开度1--小数0位 */
    @DevAttributes
    @Excel(name = "螺杆机开度1")
    private Integer screwOpen1;

    /** 螺杆机开度2--小数0位 */
    @DevAttributes
    @Excel(name = "螺杆机开度2")
    private Integer screwOpen2;

    /** 螺杆机开度3--小数0位 */
    @DevAttributes
    @Excel(name = "螺杆机开度3")
    private Integer screwOpen3;

    /** 读设置冷冻水出水温度1--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "读设置冷冻水出水温度1")
    private BigDecimal readSetCoolWaterTemp1;

    /** 冷冻出水温度1--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "冷冻出水温度1")
    private BigDecimal freezingOutTemp1;

    /** 冷冻回水温度1--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "冷冻回水温度1")
    private BigDecimal freezingRetTemp1;

    /** 冷却出水温度1--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "冷却出水温度1")
    private BigDecimal coolDownOutTemp1;

    /** 冷却回水温度1--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "冷却回水温度1")
    private BigDecimal coolDownRetTemp1;

    /** 压缩机电流1--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "压缩机电流1")
    private BigDecimal compressorCurrent1;

    /** 水流开关状态1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "水流开关状态1")
    private Integer flowSwitchStatus1;

    /** 读设置冷冻水出水温度2--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "读设置冷冻水出水温度2")
    private BigDecimal readSetCoolWaterTemp2;

    /** 冷冻出水温度2--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "冷冻出水温度2")
    private BigDecimal freezingOutTemp2;

    /** 冷冻回水温度2--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "冷冻回水温度2")
    private BigDecimal freezingRetTemp2;

    /** 冷却出水温度2--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "冷却出水温度2")
    private BigDecimal coolDownOutTemp2;

    /** 冷却回水温度2--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "冷却回水温度2")
    private BigDecimal coolDownRetTemp2;

    /** 压缩机电流2--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "压缩机电流2")
    private BigDecimal compressorCurrent2;

    /** 水流开关状态2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "水流开关状态2")
    private Integer flowSwitchStatus2;

    /** 读设置冷冻水出水温度3--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "读设置冷冻水出水温度3")
    private BigDecimal readSetCoolWaterTemp3;

    /** 冷冻出水温度3--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "冷冻出水温度3")
    private BigDecimal freezingOutTemp3;

    /** 冷冻回水温度3--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "冷冻回水温度3")
    private BigDecimal freezingRetTemp3;

    /** 冷却出水温度3--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "冷却出水温度3")
    private BigDecimal coolDownOutTemp3;

    /** 冷却回水温度3--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "冷却回水温度3")
    private BigDecimal coolDownRetTemp3;

    /** 压缩机电流3--小数1位 */
    @DevAttributes(isDecimal = "1")
    @Excel(name = "压缩机电流3")
    private BigDecimal compressorCurrent3;

    /** 水流开关状态3--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "水流开关状态3")
    private Integer flowSwitchStatus3;

    /** 冷冻泵故障保护状态1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷冻泵故障保护状态1")
    private Integer coolPumpFaultProtectionStatus1;

    /** 冷冻泵故障保护状态2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷冻泵故障保护状态2")
    private Integer coolPumpFaultProtectionStatus2;

    /** 冷冻泵故障保护状态3--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "冷冻泵故障保护状态3")
    private Integer coolPumpFaultProtectionStatus3;

    /** 螺杆机故障状态1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "螺杆机故障状态1")
    private Integer screwFaultStatus1;

    /** 螺杆机故障状态2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "螺杆机故障状态2")
    private Integer screwFaultStatus2;

    /** 螺杆机故障状态3--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "螺杆机故障状态3")
    private Integer screwFaultStatus3;

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
