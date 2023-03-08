package com.ruoyi.project.datasource.chart.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

/**
 * @author niminui
 * @date 2022/5/18 16:12
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChartVo {

    /**
     * 所属表名称
     */
    private String tableName;

    /**
     * 所属表备注
     */
    private String tableComment;

    /**
     * 图例列表
     */
    private List<String> legendData;

    /**
     * 字段名称
     */
    private List<String> fieldNames;

    /**
     * 用于字段名称与备注的转换map
     */
    private Map<String, String> legendConvertMap;

    /**
     * 数据map
     */
    private Map<String, List<String>> resultMap;

}
