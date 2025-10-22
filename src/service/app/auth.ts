/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 管理员登录 管理员账号密码登录 POST /auth/admin/login */
export async function adminLoginAuthAdminLoginPost({
  body,
  options,
}: {
  body: API.AdminLoginRequest;
  options?: CustomRequestOptions;
}) {
  return request<API.AdminLoginResponse>('/auth/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前管理员信息 获取当前登录管理员的基本信息 GET /auth/admin/me */
export async function getCurrentAdminInfoAuthAdminMeGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<API.AdminInfoResponse>('/auth/admin/me', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户账号密码登录 用户账号密码登录 POST /auth/user/login/password */
export async function userPasswordLoginAuthUserLoginPasswordPost({
  body,
  options,
}: {
  body: API.UserPasswordLoginRequest;
  options?: CustomRequestOptions;
}) {
  return request<API.UserLoginResponse>('/auth/user/login/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户微信登录 用户微信授权登录 POST /auth/user/login/wechat */
export async function userWechatLoginAuthUserLoginWechatPost({
  body,
  options,
}: {
  body: API.UserWeChatLoginRequest;
  options?: CustomRequestOptions;
}) {
  return request<API.UserLoginResponse>('/auth/user/login/wechat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前用户信息 获取当前登录用户的基本信息 GET /auth/user/me */
export async function getCurrentUserInfoAuthUserMeGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getCurrentUserInfoAuthUserMeGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.UserInfoResponse>('/auth/user/me', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户注册 用户账号密码注册 POST /auth/user/register */
export async function userRegisterAuthUserRegisterPost({
  body,
  options,
}: {
  body: API.UserRegisterRequest;
  options?: CustomRequestOptions;
}) {
  return request<API.UserRegisterResponse>('/auth/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 校验微信 access_token 有效性 校验 access_token 是否有效 POST /auth/wechat/check_token */
export async function checkWechatTokenAuthWechatCheckTokenPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.checkWechatTokenAuthWechatCheckTokenPostParams;
  body: API.WeChatCheckTokenRequest;
  options?: CustomRequestOptions;
}) {
  return request<API.WeChatCheckTokenResponse>('/auth/wechat/check_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 刷新微信 access_token 刷新 access_token（需在服务层实现具体逻辑） POST /auth/wechat/refresh_token */
export async function refreshWechatTokenAuthWechatRefreshTokenPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.refreshWechatTokenAuthWechatRefreshTokenPostParams;
  body: API.WeChatRefreshTokenRequest;
  options?: CustomRequestOptions;
}) {
  return request<API.WeChatRefreshTokenResponse>('/auth/wechat/refresh_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取微信会话信息 通过前端传来的 code 换取 openid 和 session_key POST /auth/wechat/session */
export async function getWechatSessionAuthWechatSessionPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getWechatSessionAuthWechatSessionPostParams;
  body: API.UserWeChatLoginRequest;
  options?: CustomRequestOptions;
}) {
  return request<API.WeChatSessionResponse>('/auth/wechat/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取微信用户信息 获取用户基本信息（需用户授权） POST /auth/wechat/userinfo */
export async function getWechatUserinfoAuthWechatUserinfoPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getWechatUserinfoAuthWechatUserinfoPostParams;
  body: API.WeChatUserInfoRequest;
  options?: CustomRequestOptions;
}) {
  return request<API.WeChatUserInfoResponse>('/auth/wechat/userinfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
