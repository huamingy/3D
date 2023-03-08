import request from '@/utils/request'

// 查询冷却塔数据列表
export function listTower(query) {
  return request({
    url: '/modbus/tower/list',
    method: 'get',
    params: query
  })
}

// 查询冷却塔数据详细
export function getTower(rowId) {
  return request({
    url: '/modbus/tower/' + rowId,
    method: 'get'
  })
}

// 新增冷却塔数据
export function addTower(data) {
  return request({
    url: '/modbus/tower',
    method: 'post',
    data: data
  })
}

// 修改冷却塔数据
export function updateTower(data) {
  return request({
    url: '/modbus/tower',
    method: 'put',
    data: data
  })
}

// 删除冷却塔数据
export function delTower(rowId) {
  return request({
    url: '/modbus/tower/' + rowId,
    method: 'delete'
  })
}
