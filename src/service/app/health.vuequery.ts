/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './health';
import * as API from './types';

/** 根路径 根路径，无需鉴权 GET / */
export function rootGetQueryOptions(options: {
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.rootGet(queryKey[1] as typeof options);
    },
    queryKey: ['rootGet', options],
  });
}

/** 健康检查 健康检查接口，无需鉴权 GET /health */
export function healthCheckHealthGetQueryOptions(options: {
  options?: CustomRequestOptions;
}) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return apis.healthCheckHealthGet(queryKey[1] as typeof options);
    },
    queryKey: ['healthCheckHealthGet', options],
  });
}
