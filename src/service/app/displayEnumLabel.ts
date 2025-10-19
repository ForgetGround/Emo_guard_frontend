/* eslint-disable */
// @ts-ignore
import * as API from './types';

export function displayGenderEnum(field: API.IGenderEnum) {
  return { NUMBER_0: 0, NUMBER_1: 1, NUMBER_2: 2 }[field];
}

export function displayMaritalStatusEnum(field: API.IMarital_statusEnum) {
  return {
    未婚: '未婚',
    已婚: '已婚',
    离异: '离异',
    丧偶: '丧偶',
    其他: '其他',
  }[field];
}

export function displayStatusEnum(field: API.IStatusEnum) {
  return { draft: 'draft', active: 'active', archived: 'archived' }[field];
}

export function displayStatusEnum2(field: API.IStatusEnum2) {
  return {
    completed: 'completed',
    in_progress: 'in_progress',
    invalid: 'invalid',
  }[field];
}
