/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './healthReport';
import * as API from './types';

/** 创建健康报告 POST /health-reports */
export function usePostHealthReportsMutation(options?: {
  onSuccess?: (value?: { code?: number; data?: API.HealthReport }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postHealthReports,
    onSuccess(data: { code?: number; data?: API.HealthReport }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 查询健康报告 GET /health-reports/${param0} */
export function getHealthReportsIdQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getHealthReportsIdParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getHealthReportsId(queryKey[1] as typeof options);
    },
    queryKey: ['getHealthReportsId', options],
  });
}

/** 删除健康报告 DELETE /health-reports/${param0} */
export function useDeleteHealthReportsIdMutation(options?: {
  onSuccess?: (value?: { code?: number; msg?: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deleteHealthReportsId,
    onSuccess(data: { code?: number; msg?: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 分页查询健康报告 POST /health-reports/pagination */
export function usePostHealthReportsPaginationMutation(options?: {
  onSuccess?: (value?: {
    code?: number;
    data?: { list?: API.HealthReport[]; total?: number };
  }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postHealthReportsPagination,
    onSuccess(data: {
      code?: number;
      data?: { list?: API.HealthReport[]; total?: number };
    }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
