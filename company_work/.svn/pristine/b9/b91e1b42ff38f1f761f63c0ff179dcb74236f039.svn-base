package com.ruoyi.project.datasource.modbus.base.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.ruoyi.project.datasource.modbus.base.domain.ModbusExport;

import java.util.List;

/**
 * @author niminui
 * @date 2022/10/9 14:12
 */
public interface IModbusExportService extends IService<ModbusExport> {

    /**
     * 保存用户本次选择的导出字段
     * @param modbusType modbus类型
     * @param fieldExport 本次导出所选的字段
     * @param isRead 是否记住本次所选的字段
     */
    public void saveLastSelected(String modbusType, List<String> fieldExport, String isRead);

    /**
     * 查找当前用户上次导出时所选字段
     * @param classType modbus类型
     * @return 结果
     */
    public List<String> selectLastField(String classType);
}
