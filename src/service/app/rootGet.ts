/* eslint-disable */
// @ts-ignore
import request from '@/utils/request';
import { CustomRequestOptions } from '@/interceptors/request';

import * as API from './types';

/** Root 根路径 GET / */
export async function rootGet({ options }: { options?: CustomRequestOptions }) {
  return request<unknown>('/', {
    method: 'GET',
    ...(options || {}),
  });
}
