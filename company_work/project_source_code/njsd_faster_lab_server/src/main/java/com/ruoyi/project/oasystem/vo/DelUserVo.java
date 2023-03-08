package com.ruoyi.project.oasystem.vo;

import lombok.*;

import java.util.List;

/**
 * @author niminui
 * @date 2022/10/11 9:37
 */
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class DelUserVo {

    private List<String> user_id;

}
