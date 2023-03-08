package com.ruoyi.project.datasource.modbus.base.vo;

import lombok.*;

/**
 * @author niminui
 * @date 2022/10/9 9:48
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FieldVo {

    private String fieldName;
    private String fieldValue;

}
