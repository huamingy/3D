import request from '@/utils/request'

// 查询Ahu6列表
export function listAhu6(query) {
  return request({
    url: '/modbus/ahu6/list',
    method: 'get',
    params: query
  })
}

// 查询Ahu6详细
export function getAhu6(rowId) {
  return request({
    url: '/modbus/ahu6/' + rowId,
    method: 'get'
  })
}

// 新增Ahu6
export function addAhu6(data) {
  return request({
    url: '/modbus/ahu6',
    method: 'post',
    data: data
  })
}

// 修改Ahu6
export function updateAhu6(data) {
  return request({
    url: '/modbus/ahu6',
    method: 'put',
    data: data
  })
}

// 删除Ahu6
export function delAhu6(rowId) {
  return request({
    url: '/modbus/ahu6/' + rowId,
    method: 'delete'
  })
}
