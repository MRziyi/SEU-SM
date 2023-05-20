import type { Request, Response } from 'express';
import type { ItemData } from './data.d';

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

function fakeItemList(count: number): ItemData[] {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      itemId: `item-${i}`,
      itemName: itemName[i % 8],
      imgUrl: imgUrl[i % 4],
      ownerId: `owner-${i}`,
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

function getFakeItemList(req: Request, res: Response) {
  const result = fakeItemList(30);
  return res.json({
    code: 0,
    data: {
      totalNum: 30,
      list: result,
    },
  });
}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

function publishItem(req: Request, res: Response) {
  waitTime(1000);
  const { _imgUrl } = req.body;
  if (_imgUrl === 'http://test_for_upload')
    res.send({
      data: 1,
      code: 0,
    });
  else
    res.send({
      data: 1,
      code: 0,
    });
  return;
}

export default {
  'GET  /api/item/list': getFakeItemList,
  'POST /api/item/create': publishItem,
};
