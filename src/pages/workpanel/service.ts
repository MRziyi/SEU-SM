import { request } from 'umi';
import type { ItemData, OrderData } from './data.d';

export async function queryReviewList(): Promise<{
  data: { totalNum: number; list: ItemData[] };
}> {
  return request('/api/item/listReview');
}

export async function queryAllList(): Promise<{
  data: { totalNum: number; list: ItemData[] };
}> {
  return request('/api/item/listAll');
}

export async function queryAllOrderList(): Promise<{
  data: { totalNum: number; list: ItemData[] };
}> {
  return request('/api/order/listAll');
}

export async function queryArbiList(): Promise<{
  data: { totalNum: number; list: OrderData[] };
}> {
  return request('/api/order/listArbitration');
}
