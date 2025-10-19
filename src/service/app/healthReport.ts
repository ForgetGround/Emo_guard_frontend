/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 创建健康报告 POST /health-reports */
export async function postHealthReports({
  body,
  options,
}: {
  body: API.HealthReport;
  options?: CustomRequestOptions;
}) {
  return request<{ code?: number; data?: API.HealthReport }>(
    '/health-reports',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 查询健康报告 GET /health-reports/${param0} */
export async function getHealthReportsId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getHealthReportsIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code?: number; data?: API.HealthReport }>(
    `/health-reports/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 删除健康报告 DELETE /health-reports/${param0} */
export async function deleteHealthReportsId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deleteHealthReportsIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code?: number; msg?: string }>(`/health-reports/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页查询健康报告 POST /health-reports/pagination */
export async function postHealthReportsPagination({
  body,
  options,
}: {
  body: {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    pageSize?: number;
  };
  options?: CustomRequestOptions;
}) {
  return request<{
    code?: number;
    data?: { list?: API.HealthReport[]; total?: number };
  }>('/health-reports/pagination', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
