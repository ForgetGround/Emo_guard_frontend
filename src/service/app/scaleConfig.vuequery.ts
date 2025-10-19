/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './scaleConfig';
import * as API from './types';

/** 量表配置分页查询 GET /scale-configs */
export function getScaleConfigsQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getScaleConfigsParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getScaleConfigs(queryKey[1] as typeof options);
    },
    queryKey: ['getScaleConfigs', options],
  });
}

/** 创建量表配置 POST /scale-configs */
export function usePostScaleConfigsMutation(options?: {
  onSuccess?: (value?: { code?: number; data?: API.ScaleConfig }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postScaleConfigs,
    onSuccess(data: { code?: number; data?: API.ScaleConfig }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 删除量表配置 DELETE /scale-configs */
export function useDeleteScaleConfigsMutation(options?: {
  onSuccess?: (value?: { code?: number; msg?: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deleteScaleConfigs,
    onSuccess(data: { code?: number; msg?: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 查询量表配置 GET /scale-configs/${param0} */
export function getScaleConfigsIdQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getScaleConfigsIdParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getScaleConfigsId(queryKey[1] as typeof options);
    },
    queryKey: ['getScaleConfigsId', options],
  });
}
