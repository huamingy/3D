import request from '@/utils/request'

// 查询Ahu4列表
export function listAhu4(query) {
  return request({
    url: '/modbus/ahu4/list',
    method: 'get',
    params: query
  })
}

// 查询Ahu4详细
export function getAhu4(rowId) {
  return request({
    url: '/modbus/ahu4/' + rowId,
    method: 'get'
  })
}

// 新增Ahu4
export function addAhu4(data) {
  return request({
    url: '/modbus/ahu4',
    method: 'post',
    data: data
  })
}

// 修改Ahu4
export function updateAhu4(data) {
  return request({
    url: '/modbus/ahu4',
    method: 'put',
    data: data
  })
}

// 删除Ahu4
export function delAhu4(rowId) {
  return request({
    url: '/modbus/ahu4/' + rowId,
    method: 'delete'
  })
}
