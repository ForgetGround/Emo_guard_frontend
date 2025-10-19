/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './moodJournal';
import * as API from './types';

/** 创建心情日记 POST /mood-journals */
export function usePostMoodJournalsMutation(options?: {
  onSuccess?: (value?: { code?: number; data?: API.MoodJournal }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postMoodJournals,
    onSuccess(data: { code?: number; data?: API.MoodJournal }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 删除心情日记 DELETE /mood-journals/${param0} */
export function useDeleteMoodJournalsIdMutation(options?: {
  onSuccess?: (value?: { code?: number; msg?: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deleteMoodJournalsId,
    onSuccess(data: { code?: number; msg?: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 查询心情日记 GET /mood-journals/${param0}/detail */
export function getMoodJournalsIdDetailQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getMoodJournalsIdDetailParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getMoodJournalsIdDetail(queryKey[1] as typeof options);
    },
    queryKey: ['getMoodJournalsIdDetail', options],
  });
}

/** 按日期范围查询心情日记 GET /mood-journals/date-range */
export function getMoodJournalsDateRangeQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getMoodJournalsDateRangeParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getMoodJournalsDateRange(queryKey[1] as typeof options);
    },
    queryKey: ['getMoodJournalsDateRange', options],
  });
}

/** 分页查询心情日记 GET /mood-journals/pagination */
export function getMoodJournalsPaginationQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getMoodJournalsPaginationParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getMoodJournalsPagination(queryKey[1] as typeof options);
    },
    queryKey: ['getMoodJournalsPagination', options],
  });
}
