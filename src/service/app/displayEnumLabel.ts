/* eslint-disable */
// @ts-ignore
import * as API from './types';

export function displayRegistrationTypeEnum(field: API.IRegistrationType) {
  return { manual: 'manual', wechat: 'wechat', admin: 'admin' }[field];
}

export function displayUserRoleEnum(field: API.IUserRole) {
  return { user: 'user', admin: 'admin', therapist: 'therapist' }[field];
}
