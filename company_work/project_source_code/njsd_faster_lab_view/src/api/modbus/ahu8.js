import request from '@/utils/request'

// 查询Ahu8列表
export function listAhu8(query) {
  return request({
    url: '/modbus/ahu8/list',
    method: 'get',
    params: query
  })
}

// 查询Ahu8详细
export function getAhu8(rowId) {
  return request({
    url: '/modbus/ahu8/' + rowId,
    method: 'get'
  })
}

// 新增Ahu8
export function addAhu8(data) {
  return request({
    url: '/modbus/ahu8',
    method: 'post',
    data: data
  })
}

// 修改Ahu8
export function updateAhu8(data) {
  return request({
    url: '/modbus/ahu8',
    method: 'put',
    data: data
  })
}

// 删除Ahu8
export function delAhu8(rowId) {
  return request({
    url: '/modbus/ahu8/' + rowId,
    method: 'delete'
  })
}
