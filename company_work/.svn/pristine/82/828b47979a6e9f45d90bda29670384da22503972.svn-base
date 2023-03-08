package com.ruoyi.project.datasource.opc;

import com.ruoyi.project.datasource.opc.param.UATcpParam;
import org.opcfoundation.ua.application.Application;
import org.opcfoundation.ua.application.Client;
import org.opcfoundation.ua.application.SessionChannel;
import org.opcfoundation.ua.builtintypes.DataValue;
import org.opcfoundation.ua.builtintypes.NodeId;
import org.opcfoundation.ua.common.ServiceResultException;
import org.opcfoundation.ua.core.*;
import org.opcfoundation.ua.transport.security.KeyPair;
import org.opcfoundation.ua.utils.EndpointUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * @author niminui
 * @date 2022/3/23 10:04
 */
public class OpcTcpClientUtil {

    private static final Logger logger = LoggerFactory.getLogger(OpcTcpClientUtil.class);

    public static String[] readData(UATcpParam param, NodeId[] nodeIds) {
        int nodeLength = nodeIds.length;
        String[] resValue = new String[nodeLength];
        try {
            SessionChannel mySession = getSession(param);
            if (mySession == null) {
                return null;
            }
            try {
                ReadValueId[] nodesToRead = new ReadValueId[nodeLength];
                for (int i = 0; i < nodeLength; i++) {
                    ReadValueId r = new ReadValueId(nodeIds[i], Attributes.Value, null, null);
                    nodesToRead[i] = r;
                }
                ReadResponse res = mySession.Read(null, null, TimestampsToReturn.Neither, nodesToRead);
                DataValue[] data = res.getResults();
                for (int i = 0; i < nodeLength; i++) {
                    String val = data[i].getValue().getValue().toString();
                    resValue[i] = val;
                }
            } finally {
                mySession.close();
                mySession.closeAsync();
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.info("楼控读取失败原因：" + e.getMessage());
        }
        return resValue;
    }

    public static SessionChannel getSession(UATcpParam param) throws ServiceResultException, UnknownHostException {
        SessionChannel mySession = null;
        Application myClientApplication = new Application();
        Client myClient = new Client(myClientApplication);
        if (param.getSecurityMode() != null && !param.getSecurityMode().equals(MessageSecurityMode.None)) {
            String hostName = InetAddress.getLocalHost().getHostName();
            String applicationName = param.getApplicationName();
            String applicationUri = "urn:" + hostName + ":OPCUA:" + applicationName;
            KeyPair myClientApplicationInstanceCertificate = ExampleKeys.getCert(applicationName, hostName, applicationUri);
            myClientApplication.setApplicationUri(applicationUri);
            myClientApplication.addApplicationInstanceCertificate(myClientApplicationInstanceCertificate);
            EndpointDescription[] endpoints = myClient.discoverEndpoints(param.getUrl());
            endpoints = EndpointUtil.selectByProtocol(endpoints, "opc.tcp");
            endpoints = EndpointUtil.selectByMessageSecurityMode(endpoints, param.getSecurityMode());
            if (param.getSecurityPolicy() != null) {
                endpoints = EndpointUtil.selectBySecurityPolicy(endpoints, param.getSecurityPolicy());
            }
            endpoints = EndpointUtil.sortBySecurityLevel(endpoints);
            if (endpoints.length == 0) {
                return null;
            }
            EndpointDescription endpoint = endpoints[endpoints.length - 1];
            mySession = myClient.createSessionChannel(endpoint);
        } else {
            mySession = myClient.createSessionChannel(param.getUrl());
        }

        //用户名密码验证֤
        if (param.getAuthentication() == 0) {
            mySession.activate();
        } else if (param.getAuthentication() == 1) {
            mySession.activate(param.getUserName(), param.getPassword());
        } else {
            mySession.activate();
        }
        return mySession;
    }

}
