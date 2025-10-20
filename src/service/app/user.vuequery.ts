/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './user';
import * as API from './types';

/** 获取用户列表 获取所有用户数据，支持分页和筛选 GET /users/ */
export function listUsersUsersGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.listUsersUsersGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.listUsersUsersGet(queryKey[1] as typeof options);
    },
    queryKey: ['listUsersUsersGet', options],
  });
}

/** 创建用户 创建新的用户记录 POST /users/ */
export function useCreateUserUsersPostMutation(options?: {
  onSuccess?: (value?: API.UserResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.createUserUsersPost,
    onSuccess(data: API.UserResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取用户详情 根据ID获取指定的用户详细信息 GET /users/${param0} */
export function getUserUsersUserIdGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getUserUsersUserIdGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getUserUsersUserIdGet(queryKey[1] as typeof options);
    },
    queryKey: ['getUserUsersUserIdGet', options],
  });
}

/** 更新用户 更新指定的用户信息 PUT /users/${param0} */
export function useUpdateUserUsersUserIdPutMutation(options?: {
  onSuccess?: (value?: API.UserResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.updateUserUsersUserIdPut,
    onSuccess(data: API.UserResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 删除用户 删除指定的用户记录 DELETE /users/${param0} */
export function useDeleteUserUsersUserIdDeleteMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deleteUserUsersUserIdDelete,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
