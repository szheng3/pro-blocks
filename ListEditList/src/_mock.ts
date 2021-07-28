// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';

function getRule(req: Request, res: Response) {
  return res.json({
    current: 1,
    pageSize: 8,
    total: 16,
    data: [
      {
        name: 'Development Read',
        createDate: '2020-07-01T16:57:54',
        updateDate: '2020-07-01T16:57:54',
        id: 'DEVELOPMENT_READ',
      },
      {
        name: 'Menu Delete',
        createDate: '2020-07-27T21:10:02',
        updateDate: '2020-07-27T21:10:02',
        id: 'MENU_DELETE',
      },
      {
        name: 'Menu Access',
        createDate: '2020-06-15T14:06:46',
        updateDate: '2020-06-17T00:57:11',
        id: 'MENU_READ',
      },
      {
        name: 'Menu Write',
        createDate: '2020-06-15T14:06:58',
        updateDate: '2020-06-15T14:06:58',
        id: 'MENU_WRITE',
      },
      {
        name: 'Permission Delete',
        createDate: '2020-07-27T21:58:10',
        updateDate: '2020-07-27T21:58:10',
        id: 'PERMISSION_DELETE',
      },
      {
        name: 'Permission Access',
        createDate: '2020-06-15T16:04:42',
        updateDate: '2020-06-15T16:04:42',
        id: 'PERMISSION_READ',
      },
      {
        name: 'Permission Write',
        createDate: '2020-06-15T16:05:18',
        updateDate: '2020-06-15T16:05:18',
        id: 'PERMISSION_WRITE',
      },
      {
        name: 'Personal Access',
        createDate: '2020-06-10T14:09:48',
        updateDate: '2020-06-10T14:09:48',
        id: 'PERSONAL_READ',
      },
    ],
  });
}

function postRule(req: Request, res: Response) {
  return res.json({ success: true });
}

export default {
  'GET /api/oauth2/permissions': getRule,
  'POST /api/oauth2/permissions': postRule,
  'DELETE /api/oauth2/permissions': postRule,
};
