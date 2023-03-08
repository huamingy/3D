package com.ruoyi.project.datasource.modbus.base.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 用户保存每小时所有设备温度湿度的平均值
 * @author niminui
 * @date 2022/6/15 15:14
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@TableName("modbus_timer_field")
public class ModbusTimerField {

    /** 主键ID */
    @TableId(value = "row_id",type = IdType.UUID)
    private String rowId;

    /** 小时 */
    private Integer hourOfDay;

    /** 温度值总和 */
    private BigDecimal tempSum;

    /** 湿度值总和 */
    private BigDecimal humiditySum;

    /** 温度字段总和 */
    private Integer tempCount;

    /** 湿度字段总和 */
    private Integer humidityCount;

    /** 插入时间 */
    private Date createTime;
}
