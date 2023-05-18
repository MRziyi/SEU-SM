export type tabKeyType = 'orderHistory' | 'comments' | 'myPublish';

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
  uploadedTime: string;
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
  buyerId: string;
  sellerId: string;
  state: number;
  createTime: string;
  updateTime: string;
};
