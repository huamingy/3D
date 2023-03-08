package com.ruoyi.project.datasource.modbus.base.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;

/**
 * @author niminui
 * @date 2022/10/9 14:05
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@TableName("modbus_export")
public class ModbusExport {

    @TableId(value = "row_id",type = IdType.UUID)
    private String rowId;

    /** modbus类型 */
    private String modbusType;

    /** 上次选择的字段 */
    private String lastSelected;

    /** 操作人id */
    private String userId;

    /** 提示信息是否继续提示 1:提示 2:取消 */
    private String isRead;

}
