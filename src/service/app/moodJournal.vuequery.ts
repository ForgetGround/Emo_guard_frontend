/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './moodJournal';
import * as API from './types';

/** 获取心情日记列表 获取所有心情日记数据，支持分页和筛选 GET /mood-journals/ */
export function listMoodJournalsMoodJournalsGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.listMoodJournalsMoodJournalsGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.listMoodJournalsMoodJournalsGet(
        queryKey[1] as typeof options
      );
    },
    queryKey: ['listMoodJournalsMoodJournalsGet', options],
  });
}

/** 创建心情日记 创建新的心情日记记录 POST /mood-journals/ */
export function useCreateMoodJournalMoodJournalsPostMutation(options?: {
  onSuccess?: (value?: API.MoodJournalResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.createMoodJournalMoodJournalsPost,
    onSuccess(data: API.MoodJournalResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 获取心情日记详情 根据ID获取指定的心情日记详细信息 GET /mood-journals/${param0} */
export function getMoodJournalMoodJournalsMoodJournalIdGetQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getMoodJournalMoodJournalsMoodJournalIdGetParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getMoodJournalMoodJournalsMoodJournalIdGet(
        queryKey[1] as typeof options
      );
    },
    queryKey: ['getMoodJournalMoodJournalsMoodJournalIdGet', options],
  });
}

/** 更新心情日记 更新指定的心情日记信息 PUT /mood-journals/${param0} */
export function useUpdateMoodJournalMoodJournalsMoodJournalIdPutMutation(options?: {
  onSuccess?: (value?: API.MoodJournalResponse) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.updateMoodJournalMoodJournalsMoodJournalIdPut,
    onSuccess(data: API.MoodJournalResponse) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 删除心情日记 删除指定的心情日记记录 DELETE /mood-journals/${param0} */
export function useDeleteMoodJournalMoodJournalsMoodJournalIdDeleteMutation(options?: {
  onSuccess?: (value?: unknown) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deleteMoodJournalMoodJournalsMoodJournalIdDelete,
    onSuccess(data: unknown) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
