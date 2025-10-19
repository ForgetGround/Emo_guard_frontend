/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 创建心情日记 POST /mood-journals */
export async function postMoodJournals({
  body,
  options,
}: {
  body: API.MoodJournal;
  options?: CustomRequestOptions;
}) {
  return request<{ code?: number; data?: API.MoodJournal }>('/mood-journals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除心情日记 DELETE /mood-journals/${param0} */
export async function deleteMoodJournalsId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deleteMoodJournalsIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code?: number; msg?: string }>(`/mood-journals/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询心情日记 GET /mood-journals/${param0}/detail */
export async function getMoodJournalsIdDetail({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getMoodJournalsIdDetailParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code?: number; data?: API.MoodJournal }>(
    `/mood-journals/${param0}/detail`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 按日期范围查询心情日记 GET /mood-journals/date-range */
export async function getMoodJournalsDateRange({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getMoodJournalsDateRangeParams;
  options?: CustomRequestOptions;
}) {
  return request<{ code?: number; data?: API.MoodJournal[] }>(
    '/mood-journals/date-range',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 分页查询心情日记 GET /mood-journals/pagination */
export async function getMoodJournalsPagination({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getMoodJournalsPaginationParams;
  options?: CustomRequestOptions;
}) {
  return request<{ code?: number; data?: API.MoodJournal[] }>(
    '/mood-journals/pagination',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
