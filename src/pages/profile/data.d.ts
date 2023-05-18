export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export type Params = {
  keyword: string;
  // 其他已有属性
};

export type ItemData = {
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
};

export type CurrentUser = {
  nickName: string;
  id: string;
  imgUrl: string;
  privilege: string;
  phone: string;
  credit: number;
};
