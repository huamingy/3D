package com.ruoyi.project.system.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.ruoyi.common.utils.DesUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.common.utils.UrlUtil;
import com.ruoyi.project.system.domain.vo.MetaVo;
import com.ruoyi.project.system.domain.vo.RouterVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.ruoyi.common.constant.Constants;
import com.ruoyi.common.utils.SecurityUtils;
import com.ruoyi.framework.security.LoginBody;
import com.ruoyi.framework.security.service.SysLoginService;
import com.ruoyi.framework.security.service.SysPermissionService;
import com.ruoyi.framework.web.domain.AjaxResult;
import com.ruoyi.project.system.domain.SysMenu;
import com.ruoyi.project.system.domain.SysUser;
import com.ruoyi.project.system.service.ISysMenuService;

/**
 * 登录验证
 *
 * @author ruoyi
 */
@RestController
public class SysLoginController
{
    @Value("${oa.loginUrl}")
    private String oaUrl;
    @Autowired
    private SysLoginService loginService;
    @Autowired
    private ISysMenuService menuService;
    @Autowired
    private SysPermissionService permissionService;

    /**
     * 登录方法
     *
     * @param loginBody 登录信息
     * @return 结果
     */
    @PostMapping("/login")
    public AjaxResult login(@RequestBody LoginBody loginBody)
    {
        AjaxResult ajax = AjaxResult.success();
        // 生成令牌
        String token = loginService.login(loginBody.getUsername(), loginBody.getPassword(), loginBody.getCode(),
                loginBody.getUuid());
        ajax.put(Constants.TOKEN, token);
        return ajax;
    }

    /**
     * 获取用户信息
     *
     * @return 用户信息
     */
    @GetMapping("getInfo")
    public AjaxResult getInfo()
    {
        SysUser user = SecurityUtils.getLoginUser().getUser();
        // 角色集合
        Set<String> roles = permissionService.getRolePermission(user);
        // 权限集合
        Set<String> permissions = permissionService.getMenuPermission(user);
        AjaxResult ajax = AjaxResult.success();
        ajax.put("user", user);
        ajax.put("roles", roles);
        ajax.put("permissions", permissions);
        return ajax;
    }

    /**
     * 获取路由信息
     *
     * @return 路由信息
     */
    @GetMapping("getRouters")
    public AjaxResult getRouters() throws Exception {
        String encrypt = DesUtils.encrypt(SecurityUtils.getUsername());
        String oaLogin = oaUrl + UrlUtil.getURLEncoderString(encrypt);
        Long userId = SecurityUtils.getUserId();
        List<SysMenu> menus = menuService.selectMenuTreeByUserId(userId);
        List<RouterVo> routerVos = menuService.buildMenus(menus);
        for (RouterVo routerVo : routerVos) {
            if (StringUtils.equals(routerVo.getName(), "System")) {
                List<RouterVo> children = routerVo.getChildren();
                for (RouterVo child : children) {
                    if (StringUtils.equals(child.getName(), "OASystem")) {
                        child.setName(oaLogin);
                        child.setPath(oaLogin);
                        MetaVo meta = child.getMeta();
                        meta.setLink(oaLogin);
                        child.setMeta(meta);
                        break;
                    }
                }
                break;
            }
        }
        return AjaxResult.success(routerVos);
    }
}
