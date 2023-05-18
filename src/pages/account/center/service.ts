import { request } from 'umi';
import type { CurrentUser, ItemData, CommentData, OrderData } from './data.d';

export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  return request('/api/user/currentUser');
}

/*export async function queryList(
  listType: 'myPublish' | 'orderHistory',
): Promise<{ data: { totalNum: number; list: ItemData[] } }> {
  let requestUrl = '/api';
  requestUrl += listType === 'myPublish' ? '/item/listMy' : '/order/list';
  return request(requestUrl);
}*/

export async function queryItemList(): Promise<{
  data: { totalNum: number; list: ItemData[] };
}> {
  return request('/api/item/listMy');
}

export async function queryOrderList(): Promise<{
  data: { totalNum: number; list: OrderData[] };
}> {
  return request('/api/order/list');
}

export async function queryCommentList(): Promise<{
  data: { totalNum: number; list: CommentData[] };
}> {
  return request('/api/comment/list');
}
