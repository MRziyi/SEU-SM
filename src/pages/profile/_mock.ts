import type { Request, Response } from 'express';
import type { CurrentUser } from './data.d';

const itemName = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const ownerUrl = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];

const imgUrl = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const description = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];
const ownerName = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];

function fakeUserList(count: number): CurrentUser[] {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      nickName: ownerName[i % 10],
      id: `213213002`,
      imgUrl: ownerUrl[i % 8],
      access: 'user',
      phone: '1999999' + i,
      credit: i + 50,
    });
  }
  return list;
}

function getItemInfo(req: Request, res: Response) {
  const { itemId } = req.body;
  const itemResult = {
    itemId: itemId,
    itemName: itemName[1 % 8],
    imgUrl: imgUrl[1 % 4],
    ownerId: '213213002',
    description: description[1 % 5],
    price: 1 * 10,
    status: 1,
    uploadedTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * 1).toString(),
    ownerName: ownerName[1 % 10],
    ownerUrl: ownerUrl[1 % 8],
  };
  const ownerResult = fakeUserList(1);
  return res.json({
    code: 0,
    data: {
      itemInfo: itemResult,
      ownerInfo: ownerResult[0],
    },
  });
}

function getOrderInfo(req: Request, res: Response) {
  return res.json({
    code: 0,
    data: {
      id: 'order-' + 1,
      buyerId: 'buyer-' + 1,
      sellerId: '213213001',
      state: 1,
      createTime: new Date(new Date().getTime() - 2000 * 60 * 60 * 2 * 1).toString(),
      deliveryTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * 1).toString(),
      item: {
        itemId: 'item-' + 1,
        itemName: itemName[1 % 8],
        imgUrl: imgUrl[1 % 4],
        ownerId: '213213001',
        description: description[1 % 5],
        price: 1 * 10,
        status: 1,
        uploadedTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * 1).toString(),
        ownerName: ownerName[1 % 10],
        ownerUrl: ownerUrl[1 % 8],
      },
      payment: '微信支付',
      delivery: '面交',
      name: '小张',
      tel: '18777777777',
      position: '教学楼-J2 201门口',
      remark: '记得带盒子',
    },
  });
}

/*const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};*/

function createOrder(req: Request, res: Response) {
  setTimeout(() => {
    res.send({
      data: 1,
      code: 0,
    });
  }, 1000);
  return;
}

export default {
  'POST /api/item/info': getItemInfo,
  'POST /api/order/info': getOrderInfo,
  'POST /api/order/create': createOrder,
  'POST /api/item/status': createOrder,
};
