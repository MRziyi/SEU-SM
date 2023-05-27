export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export type Params = {
  keyword: string;
  // 其他已有属性
};

type KeyValuePair = {
  key: string;
  value: string;
};

export type ItemData = {
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
  messages: KeyValuePair[];
};

export type CurrentUser = {
  nickName: string;
  id: string;
  imgUrl: string;
  access: string;
  phone: string;
  credit: number;
};
