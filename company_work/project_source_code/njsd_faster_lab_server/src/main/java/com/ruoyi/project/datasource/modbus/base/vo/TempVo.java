package com.ruoyi.project.datasource.modbus.base.vo;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * @author niminui
 * @date 2022/6/16 9:48
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TempVo {

    private List<Integer> axis;
    private Map<String, List<BigDecimal>> seriesData;
    private TempInnerVo tempInnerVo;
    private String maxTemp;


}
