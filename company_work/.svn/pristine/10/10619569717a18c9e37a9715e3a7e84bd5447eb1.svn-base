import request from '@/utils/request'

// 查询Ahu7列表
export function listAhu7(query) {
  return request({
    url: '/modbus/ahu7/list',
    method: 'get',
    params: query
  })
}

// 查询Ahu7详细
export function getAhu7(rowId) {
  return request({
    url: '/modbus/ahu7/' + rowId,
    method: 'get'
  })
}

// 新增Ahu7
export function addAhu7(data) {
  return request({
    url: '/modbus/ahu7',
    method: 'post',
    data: data
  })
}

// 修改Ahu7
export function updateAhu7(data) {
  return request({
    url: '/modbus/ahu7',
    method: 'put',
    data: data
  })
}

// 删除Ahu7
export function delAhu7(rowId) {
  return request({
    url: '/modbus/ahu7/' + rowId,
    method: 'delete'
  })
}
