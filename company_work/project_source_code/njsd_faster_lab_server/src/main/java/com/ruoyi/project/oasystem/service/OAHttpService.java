package com.ruoyi.project.oasystem.service;

import cn.hutool.http.HttpRequest;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ruoyi.project.oasystem.vo.DelDeptVo;
import com.ruoyi.project.oasystem.vo.DelUserVo;
import com.ruoyi.project.oasystem.vo.EditDeptVo;
import com.ruoyi.project.oasystem.vo.EditUserVo;
import com.ruoyi.project.system.domain.SysDept;
import com.ruoyi.project.system.domain.SysUser;
import com.ruoyi.project.system.service.ISysUserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 用于同步本系统与OA系统人员、组织工具类
 * @author niminui
 * @date 2022/10/10 16:01
 */
@Component
public class OAHttpService {

    @Value("${oa.saveOrUpdateUser}")
    private String editUserUrl;
    @Value("${oa.saveOrUpdateDept}")
    private String editDeptUrl;
    @Value("${oa.delUser}")
    private String delUserUrl;
    @Value("${oa.delDept}")
    private String delDeptUrl;

    @Resource
    private ISysUserService userService;
    /**
     * 添加或修改人员信息同步到OA系统
     * @param user 添加/修改用户
     * @return 结果
     */
    public boolean saveOrUpdateUser(SysUser user) {
        boolean flag = false;
        EditUserVo editUserVo = new EditUserVo(user);
        String result = HttpRequest.post(editUserUrl)
                .body(JSON.toJSONString(editUserVo))
                .execute().body();
        if (JSON.parseObject(result).getInteger("code") == 200) {
            flag = true;
        }
        return flag;
    }

    /**
     * 添加或修改部门信息同步到OA系统
     * @param dept 部门信息
     * @return 结果
     */
    public boolean saveOrUpdateDept(SysDept dept) {
        boolean flag = false;
        EditDeptVo editDeptVo = new EditDeptVo(dept);
        String result = HttpRequest.post(editDeptUrl)
                .body(JSON.toJSONString(editDeptVo))
                .execute().body();
        if (JSON.parseObject(result).getInteger("code") == 200) {
            flag = true;
        }
        return flag;
    }

    /**
     * 删除用户信息同步到OA系统
     * @param userIds 用户ID
     * @return 结果
     */
    public boolean delUser(Long[] userIds) {
        boolean flag = false;
        List<String> param = new ArrayList<>();
        for (Long userId : userIds) {
            SysUser user = userService.selectUserById(userId);
            param.add(user.getUserName());
        }
        DelUserVo delUserVo = new DelUserVo(param);
        String result = HttpRequest.post(delUserUrl)
                .body(JSON.toJSONString(delUserVo))
                .execute().body();
        if (JSON.parseObject(result).getInteger("code") == 200) {
            flag = true;
        }
        return flag;
    }

    /**
     * 删除部门信息同步到OA系统
     * @param deptId 部门ID
     * @return 结果
     */
    public boolean delDept(Long deptId) {
        boolean flag = false;
        List<String> param = new ArrayList<>();
        param.add(String.valueOf(deptId));

        DelDeptVo delDeptVo = new DelDeptVo(param);
        String result = HttpRequest.post(delDeptUrl)
                .body(JSON.toJSONString(delDeptVo))
                .execute().body();
        if (JSON.parseObject(result).getInteger("code") == 200) {
            flag = true;
        }
        return flag;
    }
}
