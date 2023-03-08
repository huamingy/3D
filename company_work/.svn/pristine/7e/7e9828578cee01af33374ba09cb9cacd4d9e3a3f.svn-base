import request from '@/utils/request'

// 查询Ahu3列表
export function listAhu3(query) {
  return request({
    url: '/modbus/ahu3/list',
    method: 'get',
    params: query
  })
}

// 查询Ahu3详细
export function getAhu3(rowId) {
  return request({
    url: '/modbus/ahu3/' + rowId,
    method: 'get'
  })
}

// 新增Ahu3
export function addAhu3(data) {
  return request({
    url: '/modbus/ahu3',
    method: 'post',
    data: data
  })
}

// 修改Ahu3
export function updateAhu3(data) {
  return request({
    url: '/modbus/ahu3',
    method: 'put',
    data: data
  })
}

// 删除Ahu3
export function delAhu3(rowId) {
  return request({
    url: '/modbus/ahu3/' + rowId,
    method: 'delete'
  })
}
