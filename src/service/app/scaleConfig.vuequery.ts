/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './scaleConfig';
import * as API from './types';

/** 获取量表配置列表 获取所有量表配置数据，支持分页和筛选 GET /scales/ */
export function listScaleConfigsScalesGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.listScaleConfigsScalesGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.listScaleConfigsScalesGet(queryKey[1] as typeof options);
    },
    queryKey: ['listScaleConfigsScalesGet', options],
  });
}

/** 创建量表配置 创建新的量表配置记录 POST /scales/ */
export function useCreateScaleConfigScalesPostMutation(options?: {
  onSuccess?: (value?: API.ScaleConfigResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.createScaleConfigScalesPost,
    onSuccess(data: API.ScaleConfigResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取量表配置详情 根据ID获取指定的量表配置详细信息 GET /scales/${param0} */
export function getScaleConfigScalesScaleConfigIdGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getScaleConfigScalesScaleConfigIdGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getScaleConfigScalesScaleConfigIdGet(
        queryKey[1] as typeof options
      );
    },
    queryKey: ['getScaleConfigScalesScaleConfigIdGet', options],
  });
}

/** 更新量表配置 更新指定的量表配置信息 PUT /scales/${param0} */
export function useUpdateScaleConfigScalesScaleConfigIdPutMutation(options?: {
  onSuccess?: (value?: API.ScaleConfigResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.updateScaleConfigScalesScaleConfigIdPut,
    onSuccess(data: API.ScaleConfigResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 删除量表配置 删除指定的量表配置记录 DELETE /scales/${param0} */
export function useDeleteScaleConfigScalesScaleConfigIdDeleteMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deleteScaleConfigScalesScaleConfigIdDelete,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
