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
  itemId: number;
  itemName: string;
  imgUrl: string;
  ownerId: number;
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
  centent: string;
};
