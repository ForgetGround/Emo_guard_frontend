/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './userProfile';
import * as API from './types';

/** 获取用户完整信息 获取当前登录用户的完整信息（基本信息+档案） GET /user/profile/ */
export function getUserCompleteInfoUserProfileGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getUserCompleteInfoUserProfileGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getUserCompleteInfoUserProfileGet(
        queryKey[1] as typeof options
      );
    },
    queryKey: ['getUserCompleteInfoUserProfileGet', options],
  });
}

/** 更新用户档案 更新当前登录用户的档案信息 PUT /user/profile/ */
export function useUpdateUserProfileUserProfilePutMutation(options?: {
  onSuccess?: (value?: API.app_api_userProfileApi_UserProfileResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.updateUserProfileUserProfilePut,
    onSuccess(data: API.app_api_userProfileApi_UserProfileResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
