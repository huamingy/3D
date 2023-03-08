package com.ruoyi.project.datasource.modbus.base.vo.energy;

import com.ruoyi.project.datasource.modbus.base.vo.DeviceStatusVo;
import lombok.*;

import java.util.List;

/**
 * @author niminui
 * @date 2022/7/12 11:10
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class EnergyCenterVo {

    private String totalEnergy;
    private String realTimeEnergy;
    private String waterFlow;
    private String maxRunDay;

    private List<DeviceStatusVo> deviceStatusList;

}
