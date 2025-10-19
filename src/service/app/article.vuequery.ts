/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './article';
import * as API from './types';

/** 创建文章 POST /articles */
export function usePostArticlesMutation(options?: {
  onSuccess?: (value?: { code?: number; data?: API.Article }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postArticles,
    onSuccess(data: { code?: number; data?: API.Article }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 查询文章 GET /articles/${param0} */
export function getArticlesIdQueryOptions(options: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getArticlesIdParams;
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.getArticlesId(queryKey[1] as typeof options);
    },
    queryKey: ['getArticlesId', options],
  });
}

/** 删除文章 DELETE /articles/${param0} */
export function useDeleteArticlesIdMutation(options?: {
  onSuccess?: (value?: { code?: number; msg?: string }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.deleteArticlesId,
    onSuccess(data: { code?: number; msg?: string }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}

/** 分页查询文章 POST /articles/pagination */
export function usePostArticlesPaginationMutation(options?: {
  onSuccess?: (value?: {
    code?: number;
    data?: API.Article[];
    total?: number;
  }) => void;
  onError?: (error?: DefaultError) => void;
}) {
  const { onSuccess, onError } = options || {};

  const response = useMutation({
    mutationFn: apis.postArticlesPagination,
    onSuccess(data: { code?: number; data?: API.Article[]; total?: number }) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return response;
}
