/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 用户登录 POST /auth/login */
export async function postAuthLogin({
  body,
  options,
}: {
  body: {
    /** 用户名 */
    username?: string;
    /** 密码 */
    password?: string;
  };
  options?: CustomRequestOptions;
}) {
  return request<{
    code?: number;
    data?: {
      user_id?: string;
      token?: string;
      registration_type?: string;
      is_admin?: boolean;
      role?: string;
    };
  }>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注册 POST /auth/register */
export async function postAuthRegister({
  body,
  options,
}: {
  body: {
    /** 用户名 */
    username?: string;
    /** 密码 */
    password?: string;
  };
  options?: CustomRequestOptions;
}) {
  return request<{
    code?: number;
    data?: {
      user_id?: string;
      token?: string;
      registration_type?: string;
      is_admin?: boolean;
      role?: string;
    };
  }>('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 微信一键登录 POST /auth/wechat-login */
export async function postAuthWechatLogin({
  body,
  options,
}: {
  body: {
    /** 微信 code */
    code?: string;
    /** 微信 openid（测试用例用） */
    openid?: string;
  };
  options?: CustomRequestOptions;
}) {
  return request<{ code?: number; data?: Record<string, unknown> }>(
    '/auth/wechat-login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    }
  );
}
