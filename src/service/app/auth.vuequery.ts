/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './auth';
import * as API from './types';

/** 用户登录 仅支持账号密码登录 POST /auth/login */
export function useLoginAuthLoginPostMutation(options?: {
  onSuccess?: (value?: API.AuthResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.loginAuthLoginPost,
    onSuccess(data: API.AuthResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 用户注册 仅支持账号密码注册 POST /auth/register */
export function useRegisterAuthRegisterPostMutation(options?: {
  onSuccess?: (value?: API.AuthResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.registerAuthRegisterPost,
    onSuccess(data: API.AuthResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
