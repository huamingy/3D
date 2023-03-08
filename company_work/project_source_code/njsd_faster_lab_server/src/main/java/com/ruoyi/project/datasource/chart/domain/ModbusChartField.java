package com.ruoyi.project.datasource.chart.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;

import java.util.Date;

/**
 * @author niminui
 * @date 2022/5/17 10:46
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@TableName("modbus_chart_field")
public class ModbusChartField {

    /**
     * 主键id
     */
    @TableId(value = "row_id",type = IdType.UUID)
    private String rowId;

    /**
     * 所属表名称
     */
    private String parentTableName;

    /**
     * 字段名称
     */
    private String fieldName;

    /**
     * 字段类型
     */
    private String fieldType;

    /**
     * 字段备注
     */
    private String fieldComment;

    /**
     * 字段状态 1-开启 0关闭
     */
    private String fieldStatus;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 排序
     */
    private Integer orderNum;

    /**
     * 是否在图表中被选择 1-已选择 0-未选择
     */
    private String isSelected;

}
