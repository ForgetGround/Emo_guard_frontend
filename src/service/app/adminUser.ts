/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 获取用户列表 管理员获取所有用户数据，支持分页 GET /admin/users/ */
export async function listUsersAdminUsersGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.listUsersAdminUsersGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.UserListResponse>('/admin/users/', {
    method: 'GET',
    params: {
      // limit has a default value: 100
      limit: '100',
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建用户 管理员创建新用户 POST /admin/users/ */
export async function createUserAdminUsersPost({
  body,
  options,
}: {
  body: API.UserCreateRequest;
  options?: CustomRequestOptions;
}) {
  return request<API.UserCreateResponse>('/admin/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户详情 管理员获取指定用户的详细信息 GET /admin/users/${param0} */
export async function getUserDetailAdminUsersUserIdGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getUserDetailAdminUsersUserIdGetParams;
  options?: CustomRequestOptions;
}) {
  const { user_id: param0, ...queryParams } = params;

  return request<API.UserResponse>(`/admin/users/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新用户 管理员更新用户信息 PUT /admin/users/${param0} */
export async function updateUserAdminUsersUserIdPut({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.updateUserAdminUsersUserIdPutParams;
  body: API.UserUpdateRequest;
  options?: CustomRequestOptions;
}) {
  const { user_id: param0, ...queryParams } = params;

  return request<API.UserResponse>(`/admin/users/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 管理员删除用户（会同时删除用户档案） DELETE /admin/users/${param0} */
export async function deleteUserAdminUsersUserIdDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deleteUserAdminUsersUserIdDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { user_id: param0, ...queryParams } = params;

  return request<API.UserDeleteResponse>(`/admin/users/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
