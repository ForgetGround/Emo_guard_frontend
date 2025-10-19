/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 量表结果分页查询 GET /api/scale_results */
export async function getApiScaleResults({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getApiScaleResultsParams;
  options?: CustomRequestOptions;
}) {
  return request<{
    code?: number;
    data?: {
      list?: API.ScaleResult[];
      total?: number;
      page?: number;
      pageSize?: number;
    };
  }>('/api/scale_results', {
    method: 'GET',
    params: {
      // page has a default value: 1
      page: '1',
      // pageSize has a default value: 10
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询量表结果 GET /api/scale_results/${param0} */
export async function getApiScaleResultsId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getApiScaleResultsIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code?: number; data?: API.ScaleResult }>(
    `/api/scale_results/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 删除量表结果 DELETE /api/scale_results/${param0} */
export async function deleteApiScaleResultsId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deleteApiScaleResultsIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code?: number; msg?: string }>(
    `/api/scale_results/${param0}`,
    {
      method: 'DELETE',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 量表结果导出 GET /api/scale_results/export */
export async function getApiScaleResultsOpenApiExport({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getApiScaleResults_openAPI_exportParams;
  options?: CustomRequestOptions;
}) {
  return request<string>('/api/scale_results/export', {
    method: 'GET',
    params: {
      // format has a default value: csv
      format: 'csv',
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建量表结果 POST /scale-results */
export async function postScaleResults({
  body,
  options,
}: {
  body: API.ScaleResultRequest;
  options?: CustomRequestOptions;
}) {
  return request<{ code?: number; data?: API.ScaleResult }>('/scale-results', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
