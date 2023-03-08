package com.ruoyi.project.datasource.modbus.field.annotation;

import com.ruoyi.project.datasource.modbus.field.type.FieldType;

import java.lang.annotation.*;

/**
 * @author niminui
 * @date 2022/3/28 15:26
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface DevAttributes {

    FieldType fieldType() default FieldType.READ_ONLY;

    /** 是否为小数，若为0则不是小数，若小数位数大于0则为小数，需要对获取的整数做处理 */
    String isDecimal() default "0";

    /** 是否为32位浮点数，若为32位浮点数则需要占用两位寄存器地址 */
    boolean is32Float() default false;

}
