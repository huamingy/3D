import request from '@/utils/request'

// 查询Ahu1列表
export function listAhu1(query) {
  return request({
    url: '/modbus/ahu1/list',
    method: 'get',
    params: query
  })
}

// 查询Ahu1详细
export function getAhu1(rowId) {
  return request({
    url: '/modbus/ahu1/' + rowId,
    method: 'get'
  })
}

// 新增Ahu1
export function addAhu1(data) {
  return request({
    url: '/modbus/ahu1',
    method: 'post',
    data: data
  })
}

// 修改Ahu1
export function updateAhu1(data) {
  return request({
    url: '/modbus/ahu1',
    method: 'put',
    data: data
  })
}

// 删除Ahu1
export function delAhu1(rowId) {
  return request({
    url: '/modbus/ahu1/' + rowId,
    method: 'delete'
  })
}
