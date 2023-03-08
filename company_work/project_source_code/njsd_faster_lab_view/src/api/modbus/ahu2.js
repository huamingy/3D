import request from '@/utils/request'

// 查询Ahu2列表
export function listAhu2(query) {
  return request({
    url: '/modbus/ahu2/list',
    method: 'get',
    params: query
  })
}

// 查询Ahu2详细
export function getAhu2(rowId) {
  return request({
    url: '/modbus/ahu2/' + rowId,
    method: 'get'
  })
}

// 新增Ahu2
export function addAhu2(data) {
  return request({
    url: '/modbus/ahu2',
    method: 'post',
    data: data
  })
}

// 修改Ahu2
export function updateAhu2(data) {
  return request({
    url: '/modbus/ahu2',
    method: 'put',
    data: data
  })
}

// 删除Ahu2
export function delAhu2(rowId) {
  return request({
    url: '/modbus/ahu2/' + rowId,
    method: 'delete'
  })
}
