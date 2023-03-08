package com.ruoyi.project.datasource.modbus.base.vo;

import lombok.*;

/**
 * @author niminui
 * @date 2022/6/16 9:28
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TempInnerVo {

    /** 当日总平均温度 */
    private String averageTemperature;

    /** 当日总平均湿度 */
    private String averageHumidity;

}
