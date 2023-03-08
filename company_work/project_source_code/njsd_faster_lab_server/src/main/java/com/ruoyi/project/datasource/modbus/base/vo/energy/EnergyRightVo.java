package com.ruoyi.project.datasource.modbus.base.vo.energy;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * @author niminui
 * @date 2022/7/12 13:59
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class EnergyRightVo {

    private Map<String, BigDecimal> capsuleData;

    private Map<String, List<String>> realTimeChartData;

}
