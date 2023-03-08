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
 * 工艺水内机
 * @author ruoyi
 * @date 2022-03-28
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@TableName("modbus_craft_inner")
public class ModbusCraftInner {

    /** 主键ID */
    @TableId(value = "row_id",type = IdType.UUID)
    private String rowId;

    /** 故障复位 */
    @Excel(name = "故障复位")
    @DevAttributes(fieldType = FieldType.WRITE_ONLY)
    private Integer faultReset;

    /** 二次泵运行状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "二次泵运行状态")
    private Integer secPumpRunStatus;

    /** 系统启停状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "系统启停状态")
    private Integer systemStartStopStatus;

    /** 二次泵开停状态1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "二次泵开停状态1")
    private Integer secPumpStartStopStatus1;

    /** 二次泵开停状态2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "二次泵开停状态2")
    private Integer secPumpStartStopStatus2;

    /** 二次泵轮值运行 时--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "二次泵轮值运行 时")
    private Integer secPumpRotateHour;

    /** 二次泵轮值运行 分--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "二次泵轮值运行 分")
    private Integer secPumpRotateMin;

    /** 运行 天 */
    @DevAttributes
    @Excel(name = "运行 天")
    private Integer runDay;

    /** 运行 时 */
    @DevAttributes
    @Excel(name = "运行 时")
    private Integer runHour;

    /** 工艺供水温度--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "工艺供水温度")
    private BigDecimal craftSupWaterTemp;

    /** 工艺回水温度--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "工艺回水温度")
    private BigDecimal craftRetWaterTemp;

    /** 冷冻侧供水温度--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "冷冻侧供水温度")
    private BigDecimal coolSideSupWaterTemp;

    /** 冷冻侧回水温度--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "冷冻侧回水温度")
    private BigDecimal coolSideRetWaterTemp;

    /** 工艺冷却供水压力--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "工艺冷却供水压力")
    private BigDecimal craftDownSupPress;

    /** 工艺冷却回水压力--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "工艺冷却回水压力")
    private BigDecimal craftDownRetPress;

    /** 温控旁通阀开度--小数0位 */
    @DevAttributes
    @Excel(name = "温控旁通阀开度")
    private Integer tempValveOpen;

    /** 压控旁通阀开度--小数0位 */
    @DevAttributes
    @Excel(name = "压控旁通阀开度")
    private Integer pressValveOpen;

    /** 二次泵故障1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "二次泵故障1")
    private Integer secPumpFault1;

    /** 二次泵故障2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "二次泵故障2")
    private Integer secPumpFault2;

    /** 漏水检测点故障1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "漏水检测点故障1")
    private Integer leakCheckFault1;

    /** 漏水检测点故障2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "漏水检测点故障2")
    private Integer leakCheckFault2;

    /** 漏水检测点故障3--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "漏水检测点故障3")
    private Integer leakCheckFault3;

    /** 漏水检测点故障4--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "漏水检测点故障4")
    private Integer leakCheckFault4;

    /** 漏水检测点故障5--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "漏水检测点故障5")
    private Integer leakCheckFault5;

    /** 漏水检测点故障6--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "漏水检测点故障6")
    private Integer leakCheckFault6;

    /** 漏水检测点故障7--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "漏水检测点故障7")
    private Integer leakCheckFault7;

    /** 漏水检测点故障8--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "漏水检测点故障8")
    private Integer leakCheckFault8;

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
