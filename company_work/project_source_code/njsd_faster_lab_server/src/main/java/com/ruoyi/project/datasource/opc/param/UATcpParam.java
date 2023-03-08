package com.ruoyi.project.datasource.opc.param;

import org.opcfoundation.ua.core.MessageSecurityMode;
import org.opcfoundation.ua.transport.security.SecurityPolicy;

/**
 * @author niminui
 * @date 2022/3/23 10:48
 */
public class UATcpParam {

    private String applicationName="myClient";

    private String url;

    private Integer authentication;//0:匿名;1:验证用户名、密码,2:certificate,3:IssuedToken

    private String userName;

    private String password;

    private MessageSecurityMode securityMode;//None;Sign;Sign&Encrypt

    private SecurityPolicy securityPolicy;//Basic128Rsa15;Basic256;Basic256Sha256


    public String getApplicationName() {
        return applicationName;
    }

    public void setApplicationName(String applicationName) {
        this.applicationName = applicationName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getAuthentication() {
        return authentication;
    }

    public void setAuthentication(Integer authentication) {
        this.authentication = authentication;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public MessageSecurityMode getSecurityMode() {
        return securityMode;
    }

    public void setSecurityMode(MessageSecurityMode securityMode) {
        this.securityMode = securityMode;
    }

    public SecurityPolicy getSecurityPolicy() {
        return securityPolicy;
    }

    public void setSecurityPolicy(SecurityPolicy securityPolicy) {
        this.securityPolicy = securityPolicy;
    }

}
