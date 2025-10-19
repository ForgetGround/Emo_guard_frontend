/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 用户分页列表 GET /user/list */
export async function getUserList({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getUserListParams;
  options?: CustomRequestOptions;
}) {
  return request<{
    code?: number;
    data?: {
      list?: API.UserProfile[];
      total?: number;
      page?: number;
      pageSize?: number;
    };
  }>('/user/list', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 10
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 记录用户行为 POST /user/log-action */
export async function postUserLogAction({
  body,
  options,
}: {
  body: {
    /** 用户ID */
    userId?: string;
    /** 行为类型 */
    action?: string;
    /** 行为详情 */
    detail?: string;
  };
  options?: CustomRequestOptions;
}) {
  return request<{ code?: number; msg?: string }>('/user/log-action', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户资料 GET /user/profile */
export async function getUserProfile({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getUserProfileParams;
  options?: CustomRequestOptions;
}) {
  return request<{ code?: number; data?: API.UserProfile }>('/user/profile', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新用户资料 PUT /user/profile */
export async function putUserProfile({
  body,
  options,
}: {
  body: {
    /** 用户ID */
    user_id?: string;
    personal_info?: API.PersonalInfo;
  };
  options?: CustomRequestOptions;
}) {
  return request<{ code?: number; data?: API.UserProfile }>('/user/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
