package com.ruoyi.project.datasource.modbus.util;

import com.intelligt.modbus.jlibmodbus.Modbus;
import com.intelligt.modbus.jlibmodbus.exception.ModbusIOException;
import com.intelligt.modbus.jlibmodbus.exception.ModbusNumberException;
import com.intelligt.modbus.jlibmodbus.exception.ModbusProtocolException;
import com.intelligt.modbus.jlibmodbus.master.ModbusMaster;
import com.intelligt.modbus.jlibmodbus.master.ModbusMasterFactory;
import com.intelligt.modbus.jlibmodbus.tcp.TcpParameters;
import com.ruoyi.project.datasource.modbus.field.annotation.DevAttributes;
import com.ruoyi.project.datasource.modbus.field.type.FieldType;
import com.ruoyi.project.datasource.modbus.vo.ModbusVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.net.InetAddress;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

/**
 * @author niminui
 * @date 2022/3/23 17:11
 */
public class ModbusJLibUtil {

    private static final Logger logger = LoggerFactory.getLogger(ModbusJLibUtil.class);

    /**
     * 初始化modbus所属的实体类
     * @param clazz modbus所属的实体类的class
     * @param list 通过modbus获取的结果列表
     * @param <T> 实体类泛型
     * @return 对应实体类
     */
    public static <T> T initEntity(Class<T> clazz, List<ModbusVo> list) {
        T obj = null;
        int count = 0;
        try {
            obj = clazz.newInstance();
            if (list.size() == 0) return obj;
            Field[] fields = clazz.getDeclaredFields();
            for (Field field : fields) {
                field.setAccessible(true);
                Field objField = obj.getClass().getDeclaredField(field.getName());
                objField.setAccessible(true);
                if (field.isAnnotationPresent(DevAttributes.class)) { //若实体类属性存在 DevAttributes 注解，说明该字段为数据字段
                    DevAttributes annotation = field.getAnnotation(DevAttributes.class);
                    FieldType fieldType = annotation.fieldType();
                    int decimal = Integer.parseInt(annotation.isDecimal());
                    boolean isFloat = annotation.is32Float();
                    int value = Integer.parseInt(list.get(count++).getValue());
                    if (fieldType == FieldType.READ_AND_WRITE || fieldType == FieldType.READ_ONLY) {
                        if (decimal != 0 && !isFloat) { //若存在小数位数，则需要先除以 小数位数 * 10
                            BigDecimal var1 = new BigDecimal(value);
                            var1 = var1.divide(BigDecimal.valueOf(Math.pow(10, decimal)), decimal, BigDecimal.ROUND_HALF_UP);
                            objField.set(obj, var1);
                        } else if (decimal != 0) { //若为32位浮点数
                            int value2 = Integer.parseInt(list.get(count++).getValue());
                            BigDecimal product = new BigDecimal(value * value2);
                            product = product.divide(BigDecimal.valueOf(Math.pow(10, decimal)), decimal, BigDecimal.ROUND_HALF_UP);
                            objField.set(obj, product);
                        } else {
                            objField.set(obj, value);
                        }
                    } else if (fieldType == FieldType.WRITE_ONLY){ //若为只读
                        objField.set(obj, value);
                    }
                } else if (field.getName().equalsIgnoreCase("createTime")) {
                    objField.set(obj, new Date());
                }
            }
        } catch (IllegalAccessException | InstantiationException | NoSuchFieldException e) {
            e.printStackTrace();
        }
        return obj;
    }

    /**
     * dataCollection
     * @param ipHost TCP的ip地址
     * @param slaveId 从机地址
     * @param offset 寄存器读取开始地址
     * @param quantity 读取的寄存器数量
     */
    public static List<ModbusVo> dataCollection(String ipHost, int port, int slaveId, int offset, int quantity, int type) {
        List<ModbusVo> modbusVos = new LinkedList<>();
        try {
            // 设置主机TCP参数
            TcpParameters tcpParameters = new TcpParameters();

            // 设置TCP的ip地址
            InetAddress adress = InetAddress.getByName(ipHost);

            // TCP参数设置ip地址
            tcpParameters.setHost(InetAddress.getLocalHost());
            tcpParameters.setHost(adress);

            // TCP设置长连接
            tcpParameters.setKeepAlive(true);
            // TCP设置端口，这里设置是默认端口502
            //tcpParameters.setPort(Modbus.TCP_PORT);
            tcpParameters.setPort(port);

            // 创建一个主机
            ModbusMaster master = ModbusMasterFactory.createModbusMasterTCP(tcpParameters);
            Modbus.setAutoIncrementTransactionId(true);

            try {
                if (!master.isConnected()) {
                    master.connect();// 开启连接
                }
                // 读取对应从机的数据，readInputRegisters读取的写寄存器，功能码04
                int[] registerValues = null;
                boolean[] coils = null;
                switch (type) {
                    //读取InputRegisters模拟量数据
                    case 1: registerValues = master.readInputRegisters(slaveId, offset, quantity);
                        break;
                    //读取Coils开关量
                    case 2: coils = master.readCoils(slaveId, offset, quantity);
                        break;
                    //读取HoldingRegister数据
                    case 3: registerValues = master.readHoldingRegisters(slaveId, offset, quantity);
                        break;
                    //读取readDiscreteInputs开关量
                    case 4: coils = master.readDiscreteInputs(slaveId, offset, quantity);
                        break;
                }
                if ((type & 1) == 1 ) {
                    // 控制台输出
                    for (int value : registerValues) {
                        ModbusVo vo = ModbusVo.builder()
                                .address(String.valueOf(offset++))
                                .value(String.valueOf(value))
                                .build();
                        modbusVos.add(vo);
                    }
                } else {
                    for (boolean coil : coils) {
                        ModbusVo vo = ModbusVo.builder()
                                .address(String.valueOf(offset++))
                                .value(String.valueOf(coil))
                                .build();
                        modbusVos.add(vo);
                    }
                }
            } catch (ModbusProtocolException | ModbusNumberException | ModbusIOException e) {
                e.printStackTrace();
                logger.error(e.getMessage());
            } finally {
                try {
                    master.disconnect();
                } catch (ModbusIOException e) {
                    e.printStackTrace();
                    logger.error(e.getMessage());
                }
            }
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getMessage());
        }
        return modbusVos;
    }

}
