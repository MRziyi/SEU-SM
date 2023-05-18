import { request } from 'umi';
import type { ItemData } from '../data';

export async function queryOrderInfo(orderIdPara: string): Promise<{
  data: {
    id: string;
    item: ItemData;
    buyerId: string;
    sellerId: string;
    state: number;
    createTime: string;
    updateTime: string;
  };
}> {
  return request('/api/order/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      orderId: orderIdPara,
    },
  });
}
