package com.ruoyi.project.oasystem.vo;

import com.ruoyi.project.system.domain.SysDept;
import lombok.*;

/**
 * @author niminui
 * @date 2022/10/10 16:40
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class EditDeptVo {

    private String dept_id;
    private String parent_id;
    private String dept_name;
    private String order_num;
    private String status;

    public EditDeptVo(SysDept dept) {
        this.dept_id = String.valueOf(dept.getDeptId());
        this.parent_id = String.valueOf(dept.getParentId());
        this.dept_name = dept.getDeptName();
        this.order_num = dept.getOrderNum();
        this.status = dept.getStatus();
    }

}
