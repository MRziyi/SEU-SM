export type tabKeyType = '1' | '2' | '3' | '4';

export type CurrentUser = {
  nickName?: string;
  id?: string;
  imgUrl?: string;
  privilege?: string;
  phone?: string;
  credit: number;
};

export interface ItemData {
  itemId: string;
  itemName: string;
  imgUrl: string;
  ownerId: string;
  description: string;
  price: number;
  status: number;
  uploadTime: string;
  ownerName: string;
  ownerUrl: string;
}

export type CommentData = {
  commentId: number;
  fromUserName: string;
  fromUserUrl: string;
  rank: number;
  content: string;
  commentTime: string;
};

export type OrderData = {
  id: string;
  item: ItemData;
  state: number;
  createTime: string; //下单时间
  deliveryTime: string; //交易时间
  payment: string; //付款信息
  delivery: string; //交付方式
  name: string; //收货人姓名
  tel: string; //收货人电话
  position: string; //交易地点
  remark: string; //订单备注
  message: KeyValuePair[];
  imgUrl: string;
};
