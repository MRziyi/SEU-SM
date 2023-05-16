import { request } from 'umi';
import type { CurrentUser, ItemData, CommentData } from './data.d';

export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  return request('/api/user/currentUser');
}

export async function queryList(
  listType: 'myPublish' | 'orderHistory',
): Promise<{ data: { totalNum: number; list: ItemData[] } }> {
  let requestUrl = '/api';
  requestUrl += listType === 'myPublish' ? '/item/listMy' : '/order/list';
  return request(requestUrl);
}

export async function queryCommentList(): Promise<{
  data: { totalNum: number; list: CommentData[] };
}> {
  return request('/api/comment/list');
}
