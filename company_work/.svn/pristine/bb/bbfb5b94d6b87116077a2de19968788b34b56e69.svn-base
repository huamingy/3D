import request from '@/utils/request'

// 查询Ahu5列表
export function listAhu5(query) {
  return request({
    url: '/modbus/ahu5/list',
    method: 'get',
    params: query
  })
}

// 查询Ahu5详细
export function getAhu5(rowId) {
  return request({
    url: '/modbus/ahu5/' + rowId,
    method: 'get'
  })
}

// 新增Ahu5
export function addAhu5(data) {
  return request({
    url: '/modbus/ahu5',
    method: 'post',
    data: data
  })
}

// 修改Ahu5
export function updateAhu5(data) {
  return request({
    url: '/modbus/ahu5',
    method: 'put',
    data: data
  })
}

// 删除Ahu5
export function delAhu5(rowId) {
  return request({
    url: '/modbus/ahu5/' + rowId,
    method: 'delete'
  })
}
