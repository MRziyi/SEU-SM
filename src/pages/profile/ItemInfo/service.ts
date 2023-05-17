import { request } from 'umi';
import type { ItemData, CurrentUser } from '../data.d';

export async function queryItemInfo(_itemId: string): Promise<{
  data: {
    Item: ItemData;
    OwnerInfo: CurrentUser;
  };
}> {
  return request('/api/item/info', {
    data: {
      itemId: _itemId,
    },
  });
}
