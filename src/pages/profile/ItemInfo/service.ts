import { request } from 'umi';
import type { ItemData, CurrentUser } from '../data';

export async function queryItemInfo(itemIdPara: any): Promise<{
  data: {
    itemInfo: ItemData;
    ownerInfo: CurrentUser;
  };
}> {
  return request('/api/item/info', {
    data: {
      itemId: itemIdPara,
    },
  });
}
