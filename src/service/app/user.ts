/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 获取用户列表 获取所有用户数据，支持分页和筛选 GET /users/ */
export async function listUsersUsersGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.listUsersUsersGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.UserResponse[]>('/users/', {
    method: 'GET',
    params: {
      // limit has a default value: 100
      limit: '100',
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建用户 创建新的用户记录 POST /users/ */
export async function createUserUsersPost({
  body,
  options,
}: {
  body: API.UserCreate;
  options?: CustomRequestOptions;
}) {
  return request<API.UserResponse>('/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户详情 根据ID获取指定的用户详细信息 GET /users/${param0} */
export async function getUserUsersUserIdGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getUserUsersUserIdGetParams;
  options?: CustomRequestOptions;
}) {
  const { user_id: param0, ...queryParams } = params;

  return request<API.UserResponse>(`/users/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新用户 更新指定的用户信息 PUT /users/${param0} */
export async function updateUserUsersUserIdPut({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.updateUserUsersUserIdPutParams;
  body: API.UserUpdate;
  options?: CustomRequestOptions;
}) {
  const { user_id: param0, ...queryParams } = params;

  return request<API.UserResponse>(`/users/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 删除指定的用户记录 DELETE /users/${param0} */
export async function deleteUserUsersUserIdDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deleteUserUsersUserIdDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { user_id: param0, ...queryParams } = params;

  return request<unknown>(`/users/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
