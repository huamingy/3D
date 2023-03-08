package com.ruoyi.project.datasource.modbus.vo;

import lombok.*;

/**
 * @author niminui
 * @date 2022/9/21 15:20
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TableFieldVo {

    private String fieldName;
    private String fieldComment;
    private String fieldType;
    private String orderNum;

}
