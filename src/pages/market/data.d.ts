export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export type Params = {
  keyword?: string;
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
