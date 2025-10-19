/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './userProfile';
import * as API from './types';

/** 用户分页列表 GET /user/list */
export function getUserListQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getUserListParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getUserList(queryKey[1] as typeof options);
    },
    queryKey: ['getUserList', options],
  });
}

/** 记录用户行为 POST /user/log-action */
export function usePostUserLogActionMutation(options?: {
  onSuccess?: (value?: { code?: number; msg?: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postUserLogAction,
    onSuccess(data: { code?: number; msg?: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取用户资料 GET /user/profile */
export function getUserProfileQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getUserProfileParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getUserProfile(queryKey[1] as typeof options);
    },
    queryKey: ['getUserProfile', options],
  });
}

/** 更新用户资料 PUT /user/profile */
export function usePutUserProfileMutation(options?: {
  onSuccess?: (value?: { code?: number; data?: API.UserProfile }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.putUserProfile,
    onSuccess(data: { code?: number; data?: API.UserProfile }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
