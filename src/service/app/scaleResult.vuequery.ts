/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './scaleResult';
import * as API from './types';

/** 量表结果分页查询 GET /api/scale_results */
export function getApiScaleResultsQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getApiScaleResultsParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getApiScaleResults(queryKey[1] as typeof options);
    },
    queryKey: ['getApiScaleResults', options],
  });
}

/** 查询量表结果 GET /api/scale_results/${param0} */
export function getApiScaleResultsIdQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getApiScaleResultsIdParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getApiScaleResultsId(queryKey[1] as typeof options);
    },
    queryKey: ['getApiScaleResultsId', options],
  });
}

/** 删除量表结果 DELETE /api/scale_results/${param0} */
export function useDeleteApiScaleResultsIdMutation(options?: {
  onSuccess?: (value?: { code?: number; msg?: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deleteApiScaleResultsId,
    onSuccess(data: { code?: number; msg?: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 量表结果导出 GET /api/scale_results/export */
export function getApiScaleResultsOpenApiExportQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getApiScaleResults_openAPI_exportParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getApiScaleResultsOpenApiExport(
        queryKey[1] as typeof options
      );
    },
    queryKey: ['getApiScaleResultsOpenApiExport', options],
  });
}

/** 创建量表结果 POST /scale-results */
export function usePostScaleResultsMutation(options?: {
  onSuccess?: (value?: { code?: number; data?: API.ScaleResult }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postScaleResults,
    onSuccess(data: { code?: number; data?: API.ScaleResult }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
