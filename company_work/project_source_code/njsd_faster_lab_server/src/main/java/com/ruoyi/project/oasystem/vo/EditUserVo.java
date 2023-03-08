package com.ruoyi.project.oasystem.vo;

import com.ruoyi.project.system.domain.SysUser;
import lombok.*;

/**
 * @author niminui
 * @date 2022/10/10 16:22
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class EditUserVo {

    private String dept_id;
    private String user_name;
    private String nick_name;
    private String email;
    private String phonenumber;
    private String sex;
    private String password;
    private String status;

    public EditUserVo (SysUser user) {
        this.dept_id = String.valueOf(user.getDeptId());
        this.user_name = user.getUserName();
        this.nick_name = user.getNickName();
        this.email = user.getEmail();
        this.phonenumber = user.getPhonenumber();
        this.sex = user.getSex();
        this.status = user.getStatus();
    }

}
