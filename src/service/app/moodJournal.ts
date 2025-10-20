/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 获取心情日记列表 获取所有心情日记数据，支持分页和筛选 GET /mood-journals/ */
export async function listMoodJournalsMoodJournalsGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.listMoodJournalsMoodJournalsGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.MoodJournalResponse[]>('/mood-journals/', {
    method: 'GET',
    params: {
      // limit has a default value: 100
      limit: '100',
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建心情日记 创建新的心情日记记录 POST /mood-journals/ */
export async function createMoodJournalMoodJournalsPost({
  body,
  options,
}: {
  body: API.MoodJournalCreate;
  options?: CustomRequestOptions;
}) {
  return request<API.MoodJournalResponse>('/mood-journals/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取心情日记详情 根据ID获取指定的心情日记详细信息 GET /mood-journals/${param0} */
export async function getMoodJournalMoodJournalsMoodJournalIdGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getMoodJournalMoodJournalsMoodJournalIdGetParams;
  options?: CustomRequestOptions;
}) {
  const { mood_journal_id: param0, ...queryParams } = params;

  return request<API.MoodJournalResponse>(`/mood-journals/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新心情日记 更新指定的心情日记信息 PUT /mood-journals/${param0} */
export async function updateMoodJournalMoodJournalsMoodJournalIdPut({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.updateMoodJournalMoodJournalsMoodJournalIdPutParams;
  body: API.MoodJournalUpdate;
  options?: CustomRequestOptions;
}) {
  const { mood_journal_id: param0, ...queryParams } = params;

  return request<API.MoodJournalResponse>(`/mood-journals/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除心情日记 删除指定的心情日记记录 DELETE /mood-journals/${param0} */
export async function deleteMoodJournalMoodJournalsMoodJournalIdDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deleteMoodJournalMoodJournalsMoodJournalIdDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { mood_journal_id: param0, ...queryParams } = params;

  return request<unknown>(`/mood-journals/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
