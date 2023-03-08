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
 * AHU4
 * @author ruoyi
 * @date 2022-03-28
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@TableName("modbus_ahu4")
public class ModbusAhu4 {

    /** 主键ID */
    @TableId(value = "row_id",type = IdType.UUID)
    private String rowId;

    /** 系统启停_TCP */
    @DevAttributes(fieldType = FieldType.WRITE_ONLY)
    @Excel(name = "系统启停_TCP")
    private Integer systemStartStopTcp;

    /** 设定回风温度--小数2位 */
    @DevAttributes(fieldType = FieldType.READ_AND_WRITE, isDecimal = "2")
    @Excel(name = "设定回风温度")
    private BigDecimal setReturnAirTemperature;

    /** 设定回风温度上限--小数2位 */
    @DevAttributes(fieldType = FieldType.READ_AND_WRITE, isDecimal = "2")
    @Excel(name = "设定回风温度上限")
    private BigDecimal setReturnAirTemperatureUpperLimit;

    /** 设定回风温度下限--小数2位 */
    @DevAttributes(fieldType = FieldType.READ_AND_WRITE, isDecimal = "2")
    @Excel(name = "设定回风温度下限")
    private BigDecimal setReturnAirTemperatureLowerLimit;

    /** 设定风机频率--小数0位 */
    @DevAttributes(fieldType = FieldType.READ_AND_WRITE)
    @Excel(name = "设定风机频率")
    private Integer setFanFrequency;

    /** 设定新风阀开度--小数0位 */
    @DevAttributes(fieldType = FieldType.READ_AND_WRITE)
    @Excel(name = "设定新风阀开度")
    private Integer setNewDamperOpen;

    /** 系统运行状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "系统运行状态")
    private Integer systemStatus;

    /** 系统启停状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "系统启停状态")
    private Integer systemStartStopStatus;

    /** 风机运行状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "风机运行状态")
    private Integer fanStatus;

    /** 初始化状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "初始化状态")
    private Integer initializationStatus;

    /** 系统待机状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "系统待机状态")
    private Integer systemStandbyStatus;

    /** 风机远程状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "风机远程状态")
    private Integer fanRemotelyStatus;

    /** 制热状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "制热状态")
    private Integer heatingStatus;

    /** 制冷状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "制冷状态")
    private Integer refrigerationStatus;

    /** 除湿状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "除湿状态")
    private Integer dehumidificationStatus;

    /** 加湿状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "加湿状态")
    private Integer humidificationStatus;

    /** 送风机运行频率--小数0位 */
    @DevAttributes
    @Excel(name = "送风机运行频率")
    private Integer blowerFrequency;

    /** 送风温度--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "送风温度")
    private BigDecimal airSupplyTemp;

    /** 送风湿度--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "送风湿度")
    private BigDecimal airSupplyHumidity;

    /** 送风量--小数0位 */
    @DevAttributes
    @Excel(name = "送风量")
    private Integer airSupplyAmount;

    /** 新风量--小数0位 */
    @DevAttributes
    @Excel(name = "新风量")
    private Integer airNewAmount;

    /** 二次回风阀开度--小数0位 */
    @DevAttributes
    @Excel(name = "二次回风阀开度")
    private Integer secReturnAirValveOpen;

    /** 温度1--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "温度1")
    private BigDecimal temp1;

    /** 温度2--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "温度2")
    private BigDecimal temp2;

    /** 温度3--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "温度3")
    private BigDecimal temp3;

    /** 温度4--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "温度4")
    private BigDecimal temp4;

    /** 温度5--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "温度5")
    private BigDecimal temp5;

    /** 温度6--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "温度6")
    private BigDecimal temp6;

    /** 温度7--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "温度7")
    private BigDecimal temp7;

    /** 温度8--小数2位 无探头 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "温度8")
    private BigDecimal temp8NoProbe;

    /** 湿度1--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "湿度1")
    private BigDecimal humidity1;

    /** 湿度2--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "湿度2")
    private BigDecimal humidity2;

    /** 湿度3--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "湿度3")
    private BigDecimal humidity3;

    /** 湿度4--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "湿度4")
    private BigDecimal humidity4;

    /** 湿度5--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "湿度5")
    private BigDecimal humidity5;

    /** 湿度6--小数2位 无探头 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "湿度6")
    private BigDecimal humidity6NoProbe;

    /** 温度平均--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "温度平均")
    private BigDecimal tempAvg;

    /** 湿度平均--小数2位 */
    @DevAttributes(isDecimal = "2")
    @Excel(name = "湿度平均")
    private BigDecimal humidityAvg;

    /** 主加热开度--小数0位 */
    @DevAttributes
    @Excel(name = "主加热开度")
    private Integer mainHeatingOpen;

    /** 三通阀开度--小数0位 */
    @DevAttributes
    @Excel(name = "三通阀开度")
    private Integer threeValveOpen;

    /** 加温器开度--小数0位 */
    @DevAttributes
    @Excel(name = "加温器开度")
    private Integer heaterOpen;

    /** 末端开度1--小数0位 */
    @DevAttributes
    @Excel(name = "末端开度1")
    private Integer endOpen1;

    /** 末端开度2--小数0位 */
    @DevAttributes
    @Excel(name = "末端开度2")
    private Integer endOpen2;

    /** 末端开度3--小数0位 */
    @DevAttributes
    @Excel(name = "末端开度3")
    private Integer endOpen3;

    /** 末端开度4--小数0位 */
    @DevAttributes
    @Excel(name = "末端开度4")
    private Integer endOpen4;

    /** 末端开度5--小数0位 */
    @DevAttributes
    @Excel(name = "末端开度5")
    private Integer endOpen5;

    /** 末端开度6--小数0位 */
    @DevAttributes
    @Excel(name = "末端开度6")
    private Integer endOpen6;

    /** 末端开度7--小数0位 */
    @DevAttributes
    @Excel(name = "末端开度7")
    private Integer endOpen7;

    /** 末端开度8--小数0位 */
    @DevAttributes
    @Excel(name = "末端开度8")
    private Integer endOpen8;

    /** 末端开度--小数0位 */
    @DevAttributes
    @Excel(name = "末端开度")
    private Integer endOpen;

    /** 运行 天--小数0位 */
    @DevAttributes
    @Excel(name = "运行 天")
    private Integer runDay;

    /** 运行 时--小数0位 */
    @DevAttributes
    @Excel(name = "运行 时")
    private Integer runHour;

    /** 运行 分--小数0位 */
    @DevAttributes
    @Excel(name = "运行 分")
    private Integer runMin;

    /** 运行 秒--小数0位 */
    @DevAttributes
    @Excel(name = "运行 秒")
    private Integer runSec;

    /** 累计 时--小数0位 */
    @DevAttributes
    @Excel(name = "累计 时")
    private Integer grandTotalHour;

    /** 主变频器故障保护状态--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "主变频器故障保护状态")
    private Integer mainInverterFaultProtectionStatus;

    /** 送风失压故障--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "送风失压故障")
    private Integer airSupplyLossFault;

    /** 主加热故障--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "主加热故障")
    private Integer mainHeatingFault;

    /** 加湿器故障--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "加湿器故障")
    private Integer humidifierFault;

    /** 末端故障1--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "末端故障1")
    private Integer endFault1;

    /** 末端故障2--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "末端故障2")
    private Integer endFault2;

    /** 末端故障3--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "末端故障3")
    private Integer endFault3;

    /** 末端故障4--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "末端故障4")
    private Integer endFault4;

    /** 末端故障5--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "末端故障5")
    private Integer endFault5;

    /** 末端故障6--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "末端故障6")
    private Integer endFault6;

    /** 末端故障7--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "末端故障7")
    private Integer endFault7;

    /** 末端故障8--0:OFF 1:ON */
    @DevAttributes
    @Excel(name = "末端故障8")
    private Integer endFault8;

    /** 故障复位 */
    @DevAttributes(fieldType = FieldType.WRITE_ONLY)
    @Excel(name = "故障复位")
    private Integer faultReset;

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
