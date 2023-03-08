package com.ruoyi.project.datasource.modbus.base.vo.energy;

import lombok.*;

import java.math.BigDecimal;

/**
 * @author niminui
 * @date 2022/7/12 9:54
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RankVo {

    private String fieldName;
    private BigDecimal fieldValue;

}
