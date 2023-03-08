import request from '@/utils/request'

// 查询modbus图表字段配置列表
export function listField(query) {
  return request({
    url: '/modbus/chartField/list',
    method: 'get',
    params: query
  })
}

// 查询modbus图表字段配置详细
export function selectTableField(tableName) {
  return request({
    url: '/modbus/chartField/selectTableField',
    method: 'get',
    params: {tableName: tableName}
  })
}

// 新增modbus图表字段配置
export function saveFields(data) {
  return request({
    url: '/modbus/chartField/saveFields',
    method: 'post',
    data: data
  })
}

// 修改图表字段状态
export function changeFieldStats(rowId, status) {
  return request({
    url: '/modbus/chartField/changeFieldStats',
    method: 'put',
    params:{rowId: rowId, status: status}
  })
}


// 修改图表字段显示状态
export function changeFieldSelected(rowId, isSelected) {
  return request({
    url: '/modbus/chartField/changeFieldSelected',
    method: 'put',
    params:{rowId: rowId, isSelected: isSelected}
  })
}

// 删除modbus图表字段配置
export function delField(rowId) {
  return request({
    url: '/modbus/chartField/' + rowId,
    method: 'delete'
  })
}

// 查询已保存的图表字段信息
export function selectSavedField(tableName) {
  return request({
    url: '/modbus/chartField/selectSavedField',
    method: 'get',
    params: {tableName: tableName}
  })
}

// 修改图表字段是否被选中状态
export function changeSelected(rowId, status) {
  return request({
    url: '/modbus/chartField/changeSelected',
    method: 'put',
    params:{rowId: rowId, status: status}
  })
}

// 根据主键id查询图表字段基本信息
export function getChartField(rowId) {
  return request({
    url: '/modbus/chartField/getChartField/' + rowId,
    method: 'get'
  })
}

// 编辑图表字段信息
export function editChartField(data) {
  return request({
    url: '/modbus/chartField/editChartField',
    method: 'post',
    data: data
  })
}

