import { request } from 'umi';
import type { ItemData, CurrentUser } from '../data';

export async function queryItemInfo(itemIdPara: any): Promise<{
  data: {
    itemInfo: ItemData;
    ownerInfo: CurrentUser;
  };
}> {
  return request('/api/item/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      itemId: itemIdPara,
    },
  });
}

export function SendOrderInfo(OrderPara: any) {
  return request('/api/item/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      itemId: OrderPara,
    },
  });
}
