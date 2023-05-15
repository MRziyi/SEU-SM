import { request } from 'umi';
import type { Params, ItemData } from './data';

export async function queryFakeList(params: Params): Promise<{ data: { list: ItemData[] } }> {
  return request('/api/item/List', {
    params,
  });
}
