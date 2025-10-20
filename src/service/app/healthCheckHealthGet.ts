/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** Health Check 健康检查接口 GET /health */
export async function healthCheckHealthGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/health', {
    method: 'GET',
    ...(options || {}),
  });
}
