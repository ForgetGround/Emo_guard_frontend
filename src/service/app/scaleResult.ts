/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 获取测评结果列表 获取所有测评结果，支持分页和筛选 GET /results/ */
export async function listResultsResultsGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.listResultsResultsGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.ScaleResultResponse[]>('/results/', {
    method: 'GET',
    params: {
      // limit has a default value: 100
      limit: '100',
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建测评结果 创建新的测评结果记录 POST /results/ */
export async function createResultResultsPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.createResultResultsPostParams;
  body: API.ScaleResultCreate;
  options?: CustomRequestOptions;
}) {
  return request<API.ScaleResultResponse>('/results/', {
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

/** 获取测评结果详情 根据ID获取指定的测评结果详细信息 GET /results/${param0} */
export async function getResultResultsResultIdGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getResultResultsResultIdGetParams;
  options?: CustomRequestOptions;
}) {
  const { result_id: param0, ...queryParams } = params;

  return request<API.ScaleResultResponse>(`/results/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 更新测评结果 更新指定的测评结果信息 PUT /results/${param0} */
export async function updateResultResultsResultIdPut({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.updateResultResultsResultIdPutParams;
  body: API.ScaleResultUpdate;
  options?: CustomRequestOptions;
}) {
  const { result_id: param0, ...queryParams } = params;

  return request<API.ScaleResultResponse>(`/results/${param0}`, {
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

/** 删除测评结果 删除指定的测评结果记录 DELETE /results/${param0} */
export async function deleteResultResultsResultIdDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deleteResultResultsResultIdDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { result_id: param0, ...queryParams } = params;

  return request<API.ScaleResultDeleteResponse>(`/results/${param0}`, {
    method: 'DELETE',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
