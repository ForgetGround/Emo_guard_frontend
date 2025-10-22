/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 获取用户完整信息 获取当前登录用户的完整信息（基本信息+档案） GET /user/profile/ */
export async function getUserCompleteInfoUserProfileGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getUserCompleteInfoUserProfileGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.UserBaseInfoResponse>('/user/profile/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新用户档案 更新当前登录用户的档案信息 PUT /user/profile/ */
export async function updateUserProfileUserProfilePut({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.updateUserProfileUserProfilePutParams;
  body: API.UserProfileUpdateRequest;
  options?: CustomRequestOptions;
}) {
  return request<API.app_api_userProfileApi_UserProfileResponse>(
    '/user/profile/',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        ...params,
      },
      data: body,
      ...(options || {}),
    }
  );
}
