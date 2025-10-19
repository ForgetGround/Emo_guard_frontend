/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './userAuth';
import * as API from './types';

/** 用户登录 POST /auth/login */
export function usePostAuthLoginMutation(options?: {
  onSuccess?: (value?: {
    code?: number;
    data?: {
      user_id?: string;
      token?: string;
      registration_type?: string;
      is_admin?: boolean;
      role?: string;
    };
  }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postAuthLogin,
    onSuccess(data: {
      code?: number;
      data?: {
        user_id?: string;
        token?: string;
        registration_type?: string;
        is_admin?: boolean;
        role?: string;
      };
    }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 用户注册 POST /auth/register */
export function usePostAuthRegisterMutation(options?: {
  onSuccess?: (value?: {
    code?: number;
    data?: {
      user_id?: string;
      token?: string;
      registration_type?: string;
      is_admin?: boolean;
      role?: string;
    };
  }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postAuthRegister,
    onSuccess(data: {
      code?: number;
      data?: {
        user_id?: string;
        token?: string;
        registration_type?: string;
        is_admin?: boolean;
        role?: string;
      };
    }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 微信一键登录 POST /auth/wechat-login */
export function usePostAuthWechatLoginMutation(options?: {
  onSuccess?: (value?: {
    code?: number;
    data?: Record<string, unknown>;
  }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postAuthWechatLogin,
    onSuccess(data: { code?: number; data?: Record<string, unknown> }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
