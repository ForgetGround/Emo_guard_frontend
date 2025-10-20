/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './healthReport';
import * as API from './types';

/** 获取健康报告列表 获取所有健康报告数据，支持分页和筛选 GET /health-reports/ */
export function listHealthReportsHealthReportsGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.listHealthReportsHealthReportsGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.listHealthReportsHealthReportsGet(
        queryKey[1] as typeof options
      );
    },
    queryKey: ['listHealthReportsHealthReportsGet', options],
  });
}

/** 创建健康报告 创建新的健康报告记录 POST /health-reports/ */
export function useCreateHealthReportHealthReportsPostMutation(options?: {
  onSuccess?: (value?: API.HealthReportResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.createHealthReportHealthReportsPost,
    onSuccess(data: API.HealthReportResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取健康报告详情 根据ID获取指定的健康报告详细信息 GET /health-reports/${param0} */
export function getHealthReportHealthReportsHealthReportIdGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getHealthReportHealthReportsHealthReportIdGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getHealthReportHealthReportsHealthReportIdGet(
        queryKey[1] as typeof options
      );
    },
    queryKey: ['getHealthReportHealthReportsHealthReportIdGet', options],
  });
}

/** 更新健康报告 更新指定的健康报告信息 PUT /health-reports/${param0} */
export function useUpdateHealthReportHealthReportsHealthReportIdPutMutation(options?: {
  onSuccess?: (value?: API.HealthReportResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.updateHealthReportHealthReportsHealthReportIdPut,
    onSuccess(data: API.HealthReportResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 删除健康报告 删除指定的健康报告记录 DELETE /health-reports/${param0} */
export function useDeleteHealthReportHealthReportsHealthReportIdDeleteMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deleteHealthReportHealthReportsHealthReportIdDelete,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
