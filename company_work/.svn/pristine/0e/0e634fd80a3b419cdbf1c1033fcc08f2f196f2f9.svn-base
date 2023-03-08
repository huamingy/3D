import request from '@/utils/request'

// 查询超快楼系统列表
export function listEntity(query) {
  return request({
    url: '/modbusBaseEntity/list',
    method: 'get',
    params: query
  })
}

// 查询超快楼系统详细
export function getEntity(rowId) {
  return request({
    url: '/modbusBaseEntity/' + rowId,
    method: 'get'
  })
}

// 新增超快楼系统
export function addEntity(data) {
  return request({
    url: '/modbusBaseEntity',
    method: 'post',
    data: data
  })
}

// 修改超快楼系统
export function updateEntity(data) {
  return request({
    url: '/modbusBaseEntity',
    method: 'put',
    data: data
  })
}

// 删除超快楼系统
export function delEntity(rowId) {
  return request({
    url: '/modbusBaseEntity/' + rowId,
    method: 'delete'
  })
}

// 查询modbus所有数据表用以关联
export function selectModbusTable() {
  return request({
    url: '/modbusBaseEntity/selectModbusTable',
    method: 'get',
  })
}

// 根据类的类型查询该类下的所有字段信息
export function selectEntityField(classType) {
  return request({
    url: '/modbusBaseEntity/selectEntityField/' + classType,
    method: 'get',
  })
}
