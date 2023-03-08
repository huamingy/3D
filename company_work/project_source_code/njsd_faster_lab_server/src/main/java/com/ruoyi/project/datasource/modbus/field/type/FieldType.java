package com.ruoyi.project.datasource.modbus.field.type;

/**
 * @author niminui
 * @date 2022/3/28 15:17
 */
public enum FieldType {

    READ_ONLY(1),
    WRITE_ONLY(2),
    READ_AND_WRITE(3),
    ;

    private final int fieldType;

    FieldType(int fieldType) {
        this.fieldType = fieldType;
    }

    public int getFieldType() {
        return fieldType;
    }

}
