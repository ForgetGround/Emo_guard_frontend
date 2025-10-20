/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './scaleResult';
import * as API from './types';

/** 获取测评结果列表 获取所有测评结果，支持分页和筛选 GET /results/ */
export function listResultsResultsGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.listResultsResultsGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.listResultsResultsGet(queryKey[1] as typeof options);
    },
    queryKey: ['listResultsResultsGet', options],
  });
}

/** 创建测评结果 创建新的测评结果记录 POST /results/ */
export function useCreateResultResultsPostMutation(options?: {
  onSuccess?: (value?: API.ScaleResultResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.createResultResultsPost,
    onSuccess(data: API.ScaleResultResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取测评结果详情 根据ID获取指定的测评结果详细信息 GET /results/${param0} */
export function getResultResultsResultIdGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getResultResultsResultIdGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getResultResultsResultIdGet(queryKey[1] as typeof options);
    },
    queryKey: ['getResultResultsResultIdGet', options],
  });
}

/** 更新测评结果 更新指定的测评结果信息 PUT /results/${param0} */
export function useUpdateResultResultsResultIdPutMutation(options?: {
  onSuccess?: (value?: API.ScaleResultResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.updateResultResultsResultIdPut,
    onSuccess(data: API.ScaleResultResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 删除测评结果 删除指定的测评结果记录 DELETE /results/${param0} */
export function useDeleteResultResultsResultIdDeleteMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deleteResultResultsResultIdDelete,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
