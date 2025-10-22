/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './adminUser';
import * as API from './types';

/** 获取用户列表 管理员获取所有用户数据，支持分页 GET /admin/users/ */
export function listUsersAdminUsersGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.listUsersAdminUsersGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.listUsersAdminUsersGet(queryKey[1] as typeof options);
    },
    queryKey: ['listUsersAdminUsersGet', options],
  });
}

/** 创建用户 管理员创建新用户 POST /admin/users/ */
export function useCreateUserAdminUsersPostMutation(options?: {
  onSuccess?: (value?: API.UserCreateResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.createUserAdminUsersPost,
    onSuccess(data: API.UserCreateResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取用户详情 管理员获取指定用户的详细信息 GET /admin/users/${param0} */
export function getUserDetailAdminUsersUserIdGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getUserDetailAdminUsersUserIdGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getUserDetailAdminUsersUserIdGet(
        queryKey[1] as typeof options
      );
    },
    queryKey: ['getUserDetailAdminUsersUserIdGet', options],
  });
}

/** 更新用户 管理员更新用户信息 PUT /admin/users/${param0} */
export function useUpdateUserAdminUsersUserIdPutMutation(options?: {
  onSuccess?: (value?: API.UserResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.updateUserAdminUsersUserIdPut,
    onSuccess(data: API.UserResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 删除用户 管理员删除用户（会同时删除用户档案） DELETE /admin/users/${param0} */
export function useDeleteUserAdminUsersUserIdDeleteMutation(options?: {
  onSuccess?: (value?: API.UserDeleteResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deleteUserAdminUsersUserIdDelete,
    onSuccess(data: API.UserDeleteResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
