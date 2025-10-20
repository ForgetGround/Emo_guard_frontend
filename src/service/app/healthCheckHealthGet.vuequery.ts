/* eslint-disable */
// @ts-ignore
import { queryOptions, useMutation } from '@tanstack/vue-query';
import type { DefaultError } from '@tanstack/vue-query';
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as apis from './healthCheckHealthGet';
import * as API from './types';

/** Health Check 健康检查接口 GET /health */
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
