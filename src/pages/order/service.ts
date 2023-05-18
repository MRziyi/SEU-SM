import { request } from 'umi';
import type { OrderData } from './data';

export async function queryOrderInfo(orderIdPara: any): Promise<{
  data: {
    OrderInfo: OrderData;
  };
}> {
  return request('/api/item/info', {
    data: {
      orderId: orderIdPara,
    },
  });
}
