import { request } from 'umi';
import type { ItemData, OrderData } from './data.d';

export async function queryReviewList(): Promise<{
  data: { totalNum: number; list: ItemData[] };
}> {
  return request('/api/item/listReview');
}

export async function queryCommentList(): Promise<{
  data: { totalNum: number; list: OrderData[] };
}> {
  return request('/api/order/listArbitration');
}
