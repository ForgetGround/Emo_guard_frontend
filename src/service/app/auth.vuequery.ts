/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './auth';
import * as API from './types';

/** 管理员登录 管理员账号密码登录 POST /auth/admin/login */
export function useAdminLoginAuthAdminLoginPostMutation(options?: {
  onSuccess?: (value?: API.AdminLoginResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.adminLoginAuthAdminLoginPost,
    onSuccess(data: API.AdminLoginResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取当前管理员信息 获取当前登录管理员的基本信息 GET /auth/admin/me */
export function getCurrentAdminInfoAuthAdminMeGetQueryOptions(options: {
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getCurrentAdminInfoAuthAdminMeGet(
        queryKey[1] as typeof options
      );
    },
    queryKey: ['getCurrentAdminInfoAuthAdminMeGet', options],
  });
}

/** 用户账号密码登录 用户账号密码登录 POST /auth/user/login/password */
export function useUserPasswordLoginAuthUserLoginPasswordPostMutation(options?: {
  onSuccess?: (value?: API.UserLoginResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.userPasswordLoginAuthUserLoginPasswordPost,
    onSuccess(data: API.UserLoginResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 用户微信登录 用户微信授权登录 POST /auth/user/login/wechat */
export function useUserWechatLoginAuthUserLoginWechatPostMutation(options?: {
  onSuccess?: (value?: API.UserLoginResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.userWechatLoginAuthUserLoginWechatPost,
    onSuccess(data: API.UserLoginResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取当前用户信息 获取当前登录用户的基本信息 GET /auth/user/me */
export function getCurrentUserInfoAuthUserMeGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getCurrentUserInfoAuthUserMeGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getCurrentUserInfoAuthUserMeGet(
        queryKey[1] as typeof options
      );
    },
    queryKey: ['getCurrentUserInfoAuthUserMeGet', options],
  });
}

/** 用户注册 用户账号密码注册 POST /auth/user/register */
export function useUserRegisterAuthUserRegisterPostMutation(options?: {
  onSuccess?: (value?: API.UserRegisterResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.userRegisterAuthUserRegisterPost,
    onSuccess(data: API.UserRegisterResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 校验微信 access_token 有效性 校验 access_token 是否有效 POST /auth/wechat/check_token */
export function useCheckWechatTokenAuthWechatCheckTokenPostMutation(options?: {
  onSuccess?: (value?: API.WeChatCheckTokenResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.checkWechatTokenAuthWechatCheckTokenPost,
    onSuccess(data: API.WeChatCheckTokenResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 刷新微信 access_token 刷新 access_token（需在服务层实现具体逻辑） POST /auth/wechat/refresh_token */
export function useRefreshWechatTokenAuthWechatRefreshTokenPostMutation(options?: {
  onSuccess?: (value?: API.WeChatRefreshTokenResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.refreshWechatTokenAuthWechatRefreshTokenPost,
    onSuccess(data: API.WeChatRefreshTokenResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取微信会话信息 通过前端传来的 code 换取 openid 和 session_key POST /auth/wechat/session */
export function useGetWechatSessionAuthWechatSessionPostMutation(options?: {
  onSuccess?: (value?: API.WeChatSessionResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.getWechatSessionAuthWechatSessionPost,
    onSuccess(data: API.WeChatSessionResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取微信用户信息 获取用户基本信息（需用户授权） POST /auth/wechat/userinfo */
export function useGetWechatUserinfoAuthWechatUserinfoPostMutation(options?: {
  onSuccess?: (value?: API.WeChatUserInfoResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.getWechatUserinfoAuthWechatUserinfoPost,
    onSuccess(data: API.WeChatUserInfoResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
