import type { Request, Response } from 'express';
import type { ItemData, CommentData, OrderData } from './data.d';

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

function fakeList(count: number): ItemData[] {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      itemId: i,
      itemName: itemName[i % 8],
      imgUrl: imgUrl[i % 4],
      ownerId: i,
      description: description[i % 5],
      price: i * 10,
      status: i,
      uploadedTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).toString(),
      ownerName: ownerName[i % 10],
      ownerUrl: ownerUrl[i % 8],
    });
  }

  return list;
}

function fakeCommentList(count: number): CommentData[] {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      commentId: i,
      fromUserName: itemName[i % 8],
      fromUserUrl: ownerUrl[i % 8],
      rank: (i % 5) + 1,
      centent: description[i % 5],
    });
  }
  return list;
}

function fakeOrderList(count: number): OrderData[] {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: 'i',
      buyerld: 'i',
      sellerld: 'i',
      state: 1,
      updateTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).toString(),
      createTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).toString(),
      item: {
        itemId: i,
        itemName: itemName[i % 8],
        imgUrl: imgUrl[i % 4],
        ownerId: i,
        description: description[i % 5],
        price: i * 10,
        status: i,
        uploadedTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).toString(),
        ownerName: ownerName[i % 10],
        ownerUrl: ownerUrl[i % 8],
      },
    });
  }

  return list;
}

function getMyList(req: Request, res: Response) {
  const result = fakeList(18);
  return res.json({
    code: 0,
    data: {
      totalNum: 18,
      list: result,
    },
  });
}

function getOrderList(req: Request, res: Response) {
  const result = fakeOrderList(36);
  return res.json({
    code: 0,
    data: {
      totalNum: 36,
      list: result,
    },
  });
}

function getCommentList(req: Request, res: Response) {
  const result = fakeCommentList(24);
  return res.json({
    code: 0,
    data: {
      totalNum: 24,
      list: result,
    },
  });
}

export default {
  'GET  /api/item/listMy': getMyList,
  'GET  /api/order/list': getOrderList,
  'GET  /api/comment/list': getCommentList,
};
