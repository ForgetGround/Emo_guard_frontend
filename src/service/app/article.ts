/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 创建文章 POST /articles */
export async function postArticles({
  body,
  options,
}: {
  body: API.Article;
  options?: CustomRequestOptions;
}) {
  return request<{ code?: number; data?: API.Article }>('/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询文章 GET /articles/${param0} */
export async function getArticlesId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getArticlesIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code?: number; data?: API.Article }>(`/articles/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除文章 DELETE /articles/${param0} */
export async function deleteArticlesId({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deleteArticlesIdParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<{ code?: number; msg?: string }>(`/articles/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页查询文章 POST /articles/pagination */
export async function postArticlesPagination({
  body,
  options,
}: {
  body: {
    /** 页码 */
    page?: number;
    /** 每页数量 */
    pageSize?: number;
  };
  options?: CustomRequestOptions;
}) {
  return request<{ code?: number; data?: API.Article[]; total?: number }>(
    '/articles/pagination',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    }
  );
}
