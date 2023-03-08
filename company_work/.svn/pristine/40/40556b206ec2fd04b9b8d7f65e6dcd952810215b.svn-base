package com.ruoyi.framework.interceptor;

import com.baomidou.mybatisplus.core.conditions.AbstractWrapper;
import com.ruoyi.common.utils.html.EscapeUtil;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.reflection.DefaultReflectorFactory;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;

/**
 * 自定义拦截器方法，处理模糊查询中包含特殊字符（_、%、\）
 * @author niminui
 * @date 2022/3/15 10:00
 */
@Component
@Intercepts({@Signature(type = StatementHandler.class, method = "prepare", args = {Connection.class, Integer.class})})
public class SpecialCharactersInterceptor implements Interceptor {

    Logger LOGGER = LoggerFactory.getLogger(SpecialCharactersInterceptor.class);

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        StatementHandler statementHandler = (StatementHandler) invocation.getTarget();
        MetaObject metaObject = MetaObject.forObject(statementHandler, SystemMetaObject.DEFAULT_OBJECT_FACTORY, SystemMetaObject.DEFAULT_OBJECT_WRAPPER_FACTORY,
                new DefaultReflectorFactory());
        BoundSql boundSql = statementHandler.getBoundSql();
        //获取到原始sql语句
        modifyLikeSql(boundSql.getSql(), metaObject.getValue("delegate.boundSql.parameterObject"), boundSql);

        return invocation.proceed();
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {

    }

    @SuppressWarnings({"unchecked","rawtypes"})
    public static String modifyLikeSql(String sql, Object parameterObject, BoundSql boundSql) {
        if (parameterObject instanceof HashMap) {
        } else {
            return sql;
        }
        if (!sql.toLowerCase().contains(" like ") || !sql.toLowerCase().contains("?")) {
            return sql;
        }
        // 获取关键字的个数（去重）
        String[] strList = sql.split("\\?");
        Set<String> keyNames = new HashSet<>();
        for (int i = 0; i < strList.length; i++) {
            if (strList[i].toLowerCase().contains(" like ") && !strList[i].toLowerCase().contains(" not like ")) {
                String keyName = boundSql.getParameterMappings().get(i).getProperty();
                keyNames.add(keyName);
            }
        }
        // 对关键字进行特殊字符“清洗”，如果有特殊字符的，在特殊字符前添加转义字符（\）
        for (String keyName : keyNames) {
            HashMap parameter = (HashMap)parameterObject;
            if (keyName.contains("ew.paramNameValuePairs.") && sql.toLowerCase().contains(" like ?")) {
                // 第一种情况：在业务层进行条件构造产生的模糊查询关键字
                AbstractWrapper wrapper = (AbstractWrapper)parameter.get("ew");
                parameter = (HashMap)wrapper.getParamNameValuePairs();

                String[] keyList = keyName.split("\\.");
                // ew.paramNameValuePairs.MPGENVAL1，截取字符串之后，获取第三个，即为参数名
                Object a = parameter.get(keyList[2]);
                if (a instanceof String && !a.toString().contains("\\_") && (a.toString().contains("_") || a.toString().contains("\\") || a.toString()
                        .contains("%"))) {
                    parameter.put(keyList[2],
                            "%" + EscapeUtil.escapeChar(a.toString().substring(1, a.toString().length() - 1)) + "%");
                }
            } else if (!keyName.contains("ew.paramNameValuePairs.") && sql.toLowerCase().contains(" like ?")) {
                // 第二种情况：未使用条件构造器，但是在service层进行了查询关键字与模糊查询符`%`手动拼接
                Object a = parameter.get(keyName);
                if (a instanceof String && !a.toString().contains("\\_") && (a.toString().contains("_") || a.toString().contains("\\") || a.toString()
                        .contains("%"))) {
                    parameter.put(keyName,
                            "%" + EscapeUtil.escapeChar(a.toString().substring(1, a.toString().length() - 1)) + "%");
                }
            } else {
                // 第三种情况：在Mapper类的注解SQL中进行了模糊查询的拼接
                Object a = parameter.get(keyName);
                if (a instanceof String && !a.toString().contains("\\_") && (a.toString().contains("_") || a.toString().contains("\\") || a.toString()
                        .contains("%"))) {
                    parameter.put(keyName, EscapeUtil.escapeChar(a.toString()));
                }
            }
        }
        return sql;
    }
}
