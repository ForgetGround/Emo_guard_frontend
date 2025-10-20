/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 获取微信 access_token 通过前端传来的 code 换取 openid 和 session_key POST /wechat/access_token */
export async function getAccessTokenWechatAccessTokenPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getAccessTokenWechatAccessTokenPostParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/wechat/access_token', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 校验 access_token 有效性 校验 access_token 是否有效 GET /wechat/auth */
export async function checkAccessTokenWechatAuthGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.checkAccessTokenWechatAuthGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/wechat/auth', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 刷新微信 access_token 刷新 access_token（需在服务层实现具体逻辑） POST /wechat/refresh_token */
export async function refreshAccessTokenWechatRefreshTokenPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.refreshAccessTokenWechatRefreshTokenPostParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/wechat/refresh_token', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取微信用户信息 获取用户基本信息（需用户授权） GET /wechat/userinfo */
export async function getUserinfoWechatUserinfoGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getUserinfoWechatUserinfoGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/wechat/userinfo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
