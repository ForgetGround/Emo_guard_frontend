/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 获取健康报告列表 获取所有健康报告数据，支持分页和筛选 GET /health-reports/ */
export async function listHealthReportsHealthReportsGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.listHealthReportsHealthReportsGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.HealthReportResponse[]>('/health-reports/', {
    method: 'GET',
    params: {
      // limit has a default value: 100
      limit: '100',
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建健康报告 创建新的健康报告记录 POST /health-reports/ */
export async function createHealthReportHealthReportsPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.createHealthReportHealthReportsPostParams;
  body: API.HealthReportCreateRequest;
  options?: CustomRequestOptions;
}) {
  return request<API.HealthReportResponse>('/health-reports/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取健康报告详情 根据ID获取指定的健康报告详细信息 GET /health-reports/${param0} */
export async function getHealthReportHealthReportsHealthReportIdGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getHealthReportHealthReportsHealthReportIdGetParams;
  options?: CustomRequestOptions;
}) {
  const { health_report_id: param0, ...queryParams } = params;

  return request<API.HealthReportResponse>(`/health-reports/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 更新健康报告 更新指定的健康报告信息 PUT /health-reports/${param0} */
export async function updateHealthReportHealthReportsHealthReportIdPut({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.updateHealthReportHealthReportsHealthReportIdPutParams;
  body: API.HealthReportUpdateRequest;
  options?: CustomRequestOptions;
}) {
  const { health_report_id: param0, ...queryParams } = params;

  return request<API.HealthReportResponse>(`/health-reports/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...queryParams,
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除健康报告 删除指定的健康报告记录 DELETE /health-reports/${param0} */
export async function deleteHealthReportHealthReportsHealthReportIdDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deleteHealthReportHealthReportsHealthReportIdDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { health_report_id: param0, ...queryParams } = params;

  return request<unknown>(`/health-reports/${param0}`, {
    method: 'DELETE',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
