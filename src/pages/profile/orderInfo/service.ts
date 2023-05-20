import { request } from 'umi';
import type { ItemData } from '../data';

export async function queryOrderInfo(orderIdPara: string): Promise<{
  data: {
    id: string;
    item: ItemData;
    buyerId: string;
    sellerId: string;
    state: number;
    createTime: string; //下单时间
    deliveryTime: string; //交易时间
    payment: string; //付款信息
    delivery: string; //交付方式
    name: string; //收货人姓名
    tel: string; //收货人电话
    position: string; //交易地点
    remark: string; //订单备注
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
