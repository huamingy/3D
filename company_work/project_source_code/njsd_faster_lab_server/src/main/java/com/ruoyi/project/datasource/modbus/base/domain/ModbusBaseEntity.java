package com.ruoyi.project.datasource.modbus.base.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.ruoyi.framework.aspectj.lang.annotation.Excel;
import lombok.*;

import java.util.Date;

/**
 * 超快楼系统实体类
 * @author niminui
 * @date 2022/3/29 9:25
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@TableName("modbus_base_entity")
public class ModbusBaseEntity {

    @TableId(value = "row_id",type = IdType.UUID)
    private String rowId;

    /** 类所在路径 */
    @Excel(name = "系统名称")
    private String systemName;

    /** 系统IP地址 */
    @Excel(name = "系统IP地址")
    private String systemIpHost;

    /** 系统端口号，默认502 */
    @Excel(name = "系统端口号")
    private Integer systemPort;

    /** 从机地址，默认1 */
    @Excel(name = "从机地址")
    private Integer slaveId;

    /** 寄存器读取开始地址，默认0 */
    @Excel(name = "寄存器读取开始地址")
    private Integer offset;

    /** 读取的寄存器数量 */
    @Excel(name = "读取的寄存器数量")
    private Integer quantity;

    /** 实体类名称 */
    @Excel(name = "实体类名称")
    private String className;

    /** 类所在路径 */
    @Excel(name = "类所在路径")
    private String classPath;

    /** 状态，1启用，0禁用 */
    @Excel(name = "状态，1启用，0禁用")
    private Integer status;

    @Excel(name = "实体类对应表名称")
    private String tableName;

    /** 创建时间 */
    private Date createTime;

    /** 更新时间 */
    private Date updateTime;

}
