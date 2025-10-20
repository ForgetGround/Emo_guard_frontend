/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 用户登录 仅支持账号密码登录 POST /auth/login */
export async function loginAuthLoginPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.loginAuthLoginPostParams;
  options?: CustomRequestOptions;
}) {
  return request<API.AuthResponse>('/auth/login', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户注册 仅支持账号密码注册 POST /auth/register */
export async function registerAuthRegisterPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.registerAuthRegisterPostParams;
  options?: CustomRequestOptions;
}) {
  return request<API.AuthResponse>('/auth/register', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
