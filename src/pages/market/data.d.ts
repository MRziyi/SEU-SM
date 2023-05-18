export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export type Params = {
  description?: string;
  // 其他已有属性
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

export type CurrentUser = {
  nickName?: string;
  id?: string;
  imgUrl?: string;
  privilege?: string;
  phone?: string;
  credit: number;
};
