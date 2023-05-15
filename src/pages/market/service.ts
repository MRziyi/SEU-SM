import { request } from 'umi';
import type { Params, ItemData } from './data';

export async function queryList(): Promise<{ data: { totalNum: number; list: ItemData[] } }> {
  return request('/api/item/list');
}

export async function searchList(
  params: Params,
): Promise<{ data: { totalNum: number; list: ItemData[] } }> {
  return request('/api/item/search', {
    params,
  });
}
