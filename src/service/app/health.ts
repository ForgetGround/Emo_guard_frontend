/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** 根路径 根路径，无需鉴权 GET / */
export async function rootGet({ options }: { options?: CustomRequestOptions }) {
  return request<API.RootResponse>('/', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 健康检查 健康检查接口，无需鉴权 GET /health */
export async function healthCheckHealthGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<API.HealthCheckResponse>('/health', {
    method: 'GET',
    ...(options || {}),
  });
}
