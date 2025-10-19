/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 量表配置分页查询 GET /scale-configs */
export async function getScaleConfigs({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getScaleConfigsParams;
  options?: CustomRequestOptions;
}) {
  return request<{
    code?: number;
    data?: {
      list?: API.ScaleConfig[];
      total?: number;
      page?: number;
      pageSize?: number;
    };
  }>('/scale-configs', {
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

/** 创建量表配置 POST /scale-configs */
export async function postScaleConfigs({
  body,
  options,
}: {
  body: API.ScaleConfig;
  options?: CustomRequestOptions;
}) {
  return request<{ code?: number; data?: API.ScaleConfig }>('/scale-configs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除量表配置 DELETE /scale-configs */
export async function deleteScaleConfigs({
  body,
  options,
}: {
  body: string;
  options?: CustomRequestOptions;
}) {
  return request<{ code?: number; msg?: string }>('/scale-configs', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询量表配置 GET /scale-configs/${param0} */
export async function getScaleConfigsId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getScaleConfigsIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code?: number; data?: API.ScaleConfig }>(
    `/scale-configs/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
