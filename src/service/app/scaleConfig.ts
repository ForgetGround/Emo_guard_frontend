/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 获取量表配置列表 获取所有量表配置数据，支持分页和筛选 GET /scales/ */
export async function listScaleConfigsScalesGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.listScaleConfigsScalesGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.ScaleConfigResponse[]>('/scales/', {
    method: 'GET',
    params: {
      // limit has a default value: 100
      limit: '100',
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建量表配置 创建新的量表配置记录 POST /scales/ */
export async function createScaleConfigScalesPost({
  body,
  options,
}: {
  body: API.ScaleConfigCreate;
  options?: CustomRequestOptions;
}) {
  return request<API.ScaleConfigResponse>('/scales/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取量表配置详情 根据ID获取指定的量表配置详细信息 GET /scales/${param0} */
export async function getScaleConfigScalesScaleConfigIdGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getScaleConfigScalesScaleConfigIdGetParams;
  options?: CustomRequestOptions;
}) {
  const { scale_config_id: param0, ...queryParams } = params;

  return request<API.ScaleConfigResponse>(`/scales/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新量表配置 更新指定的量表配置信息 PUT /scales/${param0} */
export async function updateScaleConfigScalesScaleConfigIdPut({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.updateScaleConfigScalesScaleConfigIdPutParams;
  body: API.ScaleConfigUpdate;
  options?: CustomRequestOptions;
}) {
  const { scale_config_id: param0, ...queryParams } = params;

  return request<API.ScaleConfigResponse>(`/scales/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除量表配置 删除指定的量表配置记录 DELETE /scales/${param0} */
export async function deleteScaleConfigScalesScaleConfigIdDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deleteScaleConfigScalesScaleConfigIdDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { scale_config_id: param0, ...queryParams } = params;

  return request<unknown>(`/scales/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
