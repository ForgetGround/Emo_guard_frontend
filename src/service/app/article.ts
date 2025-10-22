/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 获取文章列表 获取所有文章数据，支持分页和筛选 GET /articles/ */
export async function listArticlesArticlesGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.listArticlesArticlesGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.ArticleResponse[]>('/articles/', {
    method: 'GET',
    params: {
      // limit has a default value: 100
      limit: '100',
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建文章 创建新的文章记录 POST /articles/ */
export async function createArticleArticlesPost({
  body,
  options,
}: {
  body: API.ArticleCreateRequest;
  options?: CustomRequestOptions;
}) {
  return request<API.ArticleResponse>('/articles/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取文章详情 根据ID获取指定的文章详细信息 GET /articles/${param0} */
export async function getArticleArticlesArticleIdGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.getArticleArticlesArticleIdGetParams;
  options?: CustomRequestOptions;
}) {
  const { article_id: param0, ...queryParams } = params;

  return request<API.ArticleResponse>(`/articles/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 更新文章 更新指定的文章信息 PUT /articles/${param0} */
export async function updateArticleArticlesArticleIdPut({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.updateArticleArticlesArticleIdPutParams;
  body: API.ArticleUpdateRequest;
  options?: CustomRequestOptions;
}) {
  const { article_id: param0, ...queryParams } = params;

  return request<API.ArticleResponse>(`/articles/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除文章 删除指定的文章记录 DELETE /articles/${param0} */
export async function deleteArticleArticlesArticleIdDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.deleteArticleArticlesArticleIdDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { article_id: param0, ...queryParams } = params;

  return request<unknown>(`/articles/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
