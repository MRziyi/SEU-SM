import { request } from 'umi';
import type { OrderData } from '../data';

export async function queryOrderInfo(orderIdPara: any): Promise<{
  data: {
    OrderInfo: OrderData;
  };
}> {
  return request('/api/order/info', {
    data: {
      orderId: orderIdPara,
    },
  });
}
