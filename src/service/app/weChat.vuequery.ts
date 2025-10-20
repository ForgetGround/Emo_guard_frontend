/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './weChat';
import * as API from './types';

/** 获取微信 access_token 通过前端传来的 code 换取 openid 和 session_key POST /wechat/access_token */
export function useGetAccessTokenWechatAccessTokenPostMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.getAccessTokenWechatAccessTokenPost,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 校验 access_token 有效性 校验 access_token 是否有效 GET /wechat/auth */
export function checkAccessTokenWechatAuthGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.checkAccessTokenWechatAuthGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.checkAccessTokenWechatAuthGet(queryKey[1] as typeof options);
    },
    queryKey: ['checkAccessTokenWechatAuthGet', options],
  });
}

/** 刷新微信 access_token 刷新 access_token（需在服务层实现具体逻辑） POST /wechat/refresh_token */
export function useRefreshAccessTokenWechatRefreshTokenPostMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.refreshAccessTokenWechatRefreshTokenPost,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取微信用户信息 获取用户基本信息（需用户授权） GET /wechat/userinfo */
export function getUserinfoWechatUserinfoGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getUserinfoWechatUserinfoGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getUserinfoWechatUserinfoGet(queryKey[1] as typeof options);
    },
    queryKey: ['getUserinfoWechatUserinfoGet', options],
  });
}
