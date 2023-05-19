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

export type OrderData = {
  id: string;
  item: ItemData;
  buyerId: string;
  sellerId: string;
  state: number;
  createTime: string;
  updateTime: string;
};

/*export type SubmitOrder = {
  itemId: string; //标识对应的item
  receiveName: string; //收货姓名不一定是NickName，参考京东淘宝
  receiveTelephone: string;
};*/
