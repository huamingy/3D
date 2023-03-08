package com.ruoyi.project.datasource.modbus.util;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import com.digitalpetri.modbus.codec.Modbus;
import com.digitalpetri.modbus.master.ModbusTcpMaster;
import com.digitalpetri.modbus.master.ModbusTcpMasterConfig;
import com.digitalpetri.modbus.requests.ReadCoilsRequest;
import com.digitalpetri.modbus.requests.ReadDiscreteInputsRequest;
import com.digitalpetri.modbus.requests.ReadHoldingRegistersRequest;
import com.digitalpetri.modbus.requests.ReadInputRegistersRequest;
import com.digitalpetri.modbus.responses.ReadCoilsResponse;
import com.digitalpetri.modbus.responses.ReadDiscreteInputsResponse;
import com.digitalpetri.modbus.responses.ReadHoldingRegistersResponse;
import com.digitalpetri.modbus.responses.ReadInputRegistersResponse;

import io.netty.buffer.ByteBuf;
import io.netty.util.ReferenceCountUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author niminui
 * @date 2022/3/23 14:57
 */
public class ModbusMasterTCPUtil {

    private static final Logger logger = LoggerFactory.getLogger(ModbusMasterTCPUtil.class);

    static ModbusTcpMaster master;

    /**
     * 获取TCP协议的Master
     *
     * @return
     */
    public static void initModbusTcpMaster() {
        initModbusTcpMaster("192.168.1.109", 502);
    }

    public static void initModbusTcpMaster(String ipHost, int port) {
        if (master == null) {
            // 创建配置
            ModbusTcpMasterConfig config = new ModbusTcpMasterConfig.Builder(ipHost).setPort(port).build();
            master = new ModbusTcpMaster(config);
        }
    }

    /***
     * 释放资源
     */
    public static void release() {
        if (master != null) {
            master.disconnect();
        }
        Modbus.releaseSharedResources();
    }

    /**
     * 读取Coils开关量
     *
     * @param address
     *            寄存器开始地址
     * @param quantity
     *            数量
     * @param unitId
     *            ID
     * @return 读取值
     * @throws InterruptedException
     *             异常
     * @throws ExecutionException
     *             异常
     */
    public static Boolean readCoils(int address, int quantity, int unitId)
            throws InterruptedException, ExecutionException {
        Boolean result = null;
        CompletableFuture<ReadCoilsResponse> future = master.sendRequest(new ReadCoilsRequest(address, quantity),
                unitId);
        ReadCoilsResponse readCoilsResponse = future.get();// 工具类做的同步返回.实际使用推荐结合业务进行异步处理
        if (readCoilsResponse != null) {
            ByteBuf buf = readCoilsResponse.getCoilStatus();
            result = buf.readBoolean();
            ReferenceCountUtil.release(readCoilsResponse);
        }
        return result;
    }

    /**
     * 读取readDiscreteInputs开关量
     *
     * @param address
     *            寄存器开始地址
     * @param quantity
     *            数量
     * @param unitId
     *            ID
     * @return 读取值
     * @throws InterruptedException
     *             异常
     * @throws ExecutionException
     *             异常
     */
    public static Boolean readDiscreteInputs(int address, int quantity, int unitId)
            throws InterruptedException, ExecutionException {
        Boolean result = null;
        CompletableFuture<ReadDiscreteInputsResponse> future = master
                .sendRequest(new ReadDiscreteInputsRequest(address, quantity), unitId);
        ReadDiscreteInputsResponse discreteInputsResponse = future.get();// 工具类做的同步返回.实际使用推荐结合业务进行异步处理
        if (discreteInputsResponse != null) {
            ByteBuf buf = discreteInputsResponse.getInputStatus();
            result = buf.readBoolean();
            ReferenceCountUtil.release(discreteInputsResponse);
        }
        return result;
    }

    /**
     * 读取HoldingRegister数据
     *
     * @param address
     *            寄存器地址
     * @param quantity
     *            寄存器数量
     * @param unitId
     *            id
     * @return 读取结果
     * @throws InterruptedException
     *             异常
     * @throws ExecutionException
     *             异常
     */
    public static Number readHoldingRegisters(int address, int quantity, int unitId)
            throws InterruptedException, ExecutionException {
        Number result = null;
        CompletableFuture<ReadHoldingRegistersResponse> future = master
                .sendRequest(new ReadHoldingRegistersRequest(address, quantity), unitId);
        ReadHoldingRegistersResponse readHoldingRegistersResponse = future.get();// 工具类做的同步返回.实际使用推荐结合业务进行异步处理
        if (readHoldingRegistersResponse != null) {
            ByteBuf buf = readHoldingRegistersResponse.getRegisters();
            result = buf.readFloat();
            ReferenceCountUtil.release(readHoldingRegistersResponse);
        }
        return result;
    }

    /**
     * 读取InputRegisters模拟量数据
     *
     * @param address
     *            寄存器开始地址
     * @param quantity
     *            数量
     * @param unitId
     *            ID
     * @return 读取值
     * @throws InterruptedException
     *             异常
     * @throws ExecutionException
     *             异常
     */
    public static Number readInputRegisters(int address, int quantity, int unitId)
            throws InterruptedException, ExecutionException {
        Number result = null;
        CompletableFuture<ReadInputRegistersResponse> future = master
                .sendRequest(new ReadInputRegistersRequest(address, quantity), unitId);
        ReadInputRegistersResponse readInputRegistersResponse = future.get();// 工具类做的同步返回.实际使用推荐结合业务进行异步处理
        if (readInputRegistersResponse != null) {
            ByteBuf buf = readInputRegistersResponse.getRegisters();
            result = buf.readDouble();
            ReferenceCountUtil.release(readInputRegistersResponse);
        }
        return result;
    }

    public static String testModbus(String ipHost, Integer port, Integer address, Integer quantity, Integer unitId, Integer type) {
        String str = "";
        try {
            // 初始化资源
            initModbusTcpMaster(ipHost, port);

            // 执行操作
            switch (type) {
                case 1:
                    str = readCoils(address, quantity, unitId).toString();
                    logger.info(str);
                    break;
                case 2:
                    str = readDiscreteInputs(address, quantity, unitId).toString();
                    logger.info(str);
                    break;
                case 3:
                    str = readHoldingRegisters(address, quantity, unitId).toString();
                    logger.info(str);
                    break;
                case 4:
                    str = readInputRegisters(address, quantity, unitId).toString();
                    logger.info(str);
                    break;

            }
            release();
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getMessage());
        }
        return str;
    }

}
