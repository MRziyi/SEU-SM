import { request } from 'umi';
import type { CurrentUser, OrderData } from '../data';

export async function queryOrderInfo(orderIdPara: string): Promise<{
  data: {
    orderDTO: OrderData;
    buyer: CurrentUser;
    seller: CurrentUser;
  };
}> {
  return request('/api/order/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { orderId: orderIdPara },
  });
}
