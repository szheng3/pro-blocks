// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { permission, TableListItem } from './data';
import { ListResponse } from './data';

/** 获取规则列表 GET /api/oauth2/permissions */
export async function getPermissions(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const response = await request<ListResponse<permission.Datum>>('/api/oauth2/permissions', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
  response?.data?.forEach((permissionDto) => {
    permissionDto.rowKey = permissionDto.id;
  });
  return response;
}

/** 新建规则 PUT /api/oauth2/permissions */
export async function savePermission(options?: { [key: string]: any }) {
  return request<TableListItem>('/api/oauth2/permissions', {
    method: 'POST',
    ...(options || {}),
  });
}

// /** 新建规则 POST /api/oauth2/permissions */
// export async function addRule(options?: { [key: string]: any }) {
//   return request<TableListItem>('/api/oauth2/permissions', {
//     method: 'POST',
//     ...(options || {}),
//   });
// }

/** 删除规则 DELETE /api/oauth2/permissions */
export async function deletePermission(Id: string) {
  return request<Record<string, any>>(`/api/oauth2/permissions/${Id}`, {
    method: 'DELETE',
  });
}
