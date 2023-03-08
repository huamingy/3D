package com.ruoyi.project.datasource.modbus.base.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;

import java.util.Date;

/**
 * @author niminui
 * @date 2022/3/31 11:40
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@TableName("modbus_newest_data")
public class ModbusNewestData {

    /** 主键ID */
    @TableId(value = "row_id",type = IdType.UUID)
    private String rowId;

    /** modbus类型，详见modbus属性表 */
    private String modbusType;

    /** modbus数据 */
    private String modbusData;

    /** 创建时间 */
    private Date createTime;

}
