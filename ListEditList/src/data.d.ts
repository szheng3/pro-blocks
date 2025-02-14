export type TableListItem = {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: string;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};
//
// export type TableListData = {
//   list: TableListItem[];
//   pagination: Partial<TableListPagination>;
// };

// export type TableListParams = {
//   status?: string;
//   name?: string;
//   desc?: string;
//   key?: number;
//   pageSize?: number;
//   currentPage?: number;
//   filter?: Record<string, any[]>;
//   sorter?: Record<string, any>;
// };

declare module permission {
  export interface Datum {
    name?: string;
    createDate?: Date | number;
    updateDate?: Date | number;
    id?: string;
    rowKey?: any;
  }
}

type ListResponse<T> = {
  data?: T[];
  /** 列表的内容总数 */
  total?: number;
  success?: boolean;
};
