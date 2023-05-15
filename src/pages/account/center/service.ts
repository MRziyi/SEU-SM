import { request } from 'umi';
import type { CurrentUser, ItemData } from './data.d';

export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  return request('/api/user/currentUser');
}

export async function queryMyList(): Promise<{ data: { totalNum: number; list: ItemData[] } }> {
  return request('/api/item/myList');
}
