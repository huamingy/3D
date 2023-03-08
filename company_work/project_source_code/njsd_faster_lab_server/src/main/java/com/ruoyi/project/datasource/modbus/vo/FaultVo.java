package com.ruoyi.project.datasource.modbus.vo;

import lombok.*;

/**
 * @author niminui
 * @date 2022/9/21 15:57
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FaultVo {

    /**
     * 设备名称
     */
    private String deviceName;

    /**
     * 故障描述
     */
    private String faultDescribe;

    /**
     * 事件发生时间
     */
    private String createTime;

    /**
     * 菜单路由
     */
    private String menuRouter;

    /**
     * 表名称
     */
    private String tableName;

    public FaultVo(String deviceName, String faultDescribe, String createTime) {
        this.deviceName = deviceName;
        this.faultDescribe = faultDescribe;
        this.createTime = createTime;
    }
}
