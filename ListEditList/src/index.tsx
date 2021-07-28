import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { deletePermission, getPermissions, savePermission } from './service';
import type { permission } from '@/pages/admin/permissions/data';
import { Modal, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { cloneDeep } from 'lodash';
import moment from "moment";

// const waitTime = (time: number = 100) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// };

// const defaultData: DataSourceType[] = [
//   {
//     id: 624748504,
//     title: '活动名称一',
//     decs: '这个活动真好玩',
//     state: 'open',
//     created_at: '2020-05-26T09:42:56Z',
//     update_at: '2020-05-26T09:42:56Z',
//   },
//   {
//     id: 624691229,
//     title: '活动名称二',
//     decs: '这个活动真好玩',
//     state: 'closed',
//     created_at: '2020-05-26T08:19:22Z',
//     update_at: '2020-05-26T08:19:22Z',
//   },
// ];

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<permission.Datum[]>([]);
  const ref = useRef<ActionType>();
  const page = (ref?.current?.pageInfo?.current || 1) - 1;
  // const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [allSelectedRows, setAllSelectedRows] = useState<any[]>([]);
  const cancelResetCreator = (
    _allSelectedRows: permission.Datum[][],
    index = 0,
    _selectedRows?: any,
  ) => {
    if (!_selectedRows) {
      _allSelectedRows[index] = _allSelectedRows[index].filter((value) => {
        return !(value?.rowKey < 0);
      });
    } else {
      _allSelectedRows[index] = _selectedRows;
    }

    const newSelectedRows = Object.values(_allSelectedRows)
      .filter((value) => value)
      .reduce((a, b) => a?.concat(b));
    // 新的选中行id
    const newSelectedRowKeys = newSelectedRows?.map((item) => item?.rowKey);
    setAllSelectedRows(_allSelectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // useEffect((() => {
  //   editableKeys?.filter((value) => value < 0).forEach((key) => {
  //     ref?.current?.cancelEditable?.(key)
  //
  //   })
  //
  // }) ,[page])

  // // 初始选中的rows
  // useEffect(() => {
  //   if (selectedData) {
  //     setSelectedRows(selectedData);
  //     setSelectedRowKeys(selectedData.map(item=> item.id))
  //   }
  // },[selectedData]);

  const columns: ProColumns<permission.Datum>[] = [
    {
      title: '标识符',
      dataIndex: 'id',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
      // hideInSearch:true,
      // 第二行不允许编辑
      editable: (text) => {
        // console.log(text, record, index)
        return !text;
      },
      // width: '30%',
    },
    // {
    //   title: '状态',
    //   key: 'state',
    //   dataIndex: 'state',
    //   valueType: 'select',
    //   valueEnum: {
    //     all: { text: '全部', status: 'Default' },
    //     open: {
    //       text: '未解决',
    //       status: 'Error',
    //     },
    //     closed: {
    //       text: '已解决',
    //       status: 'Success',
    //     },
    //   },
    // },
    {
      title: '名称',
      onFilter: true,
      sorter: true,

      dataIndex: 'name',
      // width: '30%',

      // fieldProps: (from, { rowKey, rowIndex }) => {
      //   if (from.getFieldValue([rowKey || '', 'title']) === '不好玩') {
      //     return {
      //       disabled: true,
      //     };
      //   }
      //   if (rowIndex > 9) {
      //     return {
      //       disabled: true,
      //     };
      //   }
      //   return {};
      // },
    },
    {
      title: '创立时间',
      dataIndex: 'createDate',
      valueType: 'date',
      hideInSearch: true,
      sorter: true,
      defaultSortOrder: 'descend',
      editable: false,
    },
    {
      title: '更新时间',
      dataIndex: 'updateDate',
      hideInSearch: true,
      sorter: true,
      renderText: (val: any) => moment(moment.utc(val).toDate()).local(true).fromNow(),

      editable: false,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            // action?.reloadAndRest?.()
            action?.startEditable?.(record?.rowKey || -new Date());
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            Modal.confirm({
              title: 'Do you want to delete these items?',
              icon: <ExclamationCircleOutlined />,
              // content: 'Some descriptions',
              async onOk() {
                const req = await deletePermission(record?.id || '');
                action?.reload?.();
                // setDataSource(dataSource.filter((item) => item.rowKey !== record.rowKey));
                return req;
              },
            });
            // Modal.confirm({
            //   title: 'Confirm',
            //   icon: <ExclamationCircleOutlined />,
            //   content: 'Bla bla ...',
            //   okText: '确认',
            //   cancelText: '取消',
            // });

            // setDataSource(dataSource.filter((item) => item.rowKey !== record.rowKey));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <EditableProTable<permission.Datum>
        rowKey="rowKey"
        headerTitle="可编辑表格"
        // maxLength={5}
        search={{
          labelWidth: 'auto',
        }}
        actionRef={ref}
        toolBarRender={() => []}
        rowSelection={{
          selectedRowKeys,
          onChange: (_selectedRowKeys: any, _selectedRows: any) => {
            const newAllRows = cloneDeep(allSelectedRows); // 深拷贝

            cancelResetCreator(newAllRows, page, _selectedRows);
          },
        }}
        tableAlertRender={() => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项<a style={{ marginLeft: 8 }}>取消选择</a>
            </span>
          </Space>
        )}
        // tableAlertOptionRender={({selectedRowKeys, selectedRows, onCleanSelected}) => {
        //   return (
        //     <Space size={16}>
        //       <a>批量删除</a>
        //     </Space>
        //   );
        // }}
        recordCreatorProps={{
          position: 'top',
          record: () => ({ rowKey: -Date.now(), createDate: Date.now(), updateDate: Date.now() }),
          // newRecordType: 'dataSource',
          onClick: () => {
            if (page > 0) {
              ref?.current?.setPageInfo?.({ current: 1 });
            }
          },
        }}
        pagination={{
          pageSize: 8,
          showQuickJumper: true,
        }}
        // toolBarRender={() => [
        //   <ProFormRadio.Group
        //     key="render"
        //     fieldProps={{
        //       value: position,
        //       onChange: (e) => setPosition(e.target.value),
        //     }}
        //     options={[
        //       {
        //         label: '添加到顶部',
        //         value: 'top',
        //       },
        //       {
        //         label: '添加到底部',
        //         value: 'bottom',
        //       },
        //       {
        //         label: '隐藏',
        //         value: 'hidden',
        //       },
        //     ]}
        //   />,
        // ]}
        columns={columns}
        request={({ pageSize = 4, current = 1, ...rest }, sort, filter) => {
          console.log(sort, filter, rest);

          if (current - 1 > 0) {
            editableKeys
              ?.filter((value) => value < 0)
              .forEach((key) => {
                ref?.current?.cancelEditable?.(key);

                cancelResetCreator(allSelectedRows);
              });
            // ref?.current?.cancelEditable?.(-1)
            // setEditableRowKeys([])
          }
          return getPermissions({ pageSize, current });
        }}
        value={dataSource}
        onChange={(value) => {
          setDataSource(value);
        }}
        editable={{
          onlyAddOneLineAlertMessage: 'only add one line at the same time!',
          deletePopconfirmMessage: 'delete?',
          type: 'multiple',
          editableKeys,
          onSave: async (_, data) => {
            const { id, name } = data;
            data.rowKey = id;
            const req = await savePermission({ data: { id, name } });
            ref?.current?.reload?.();
            return req;
          },
          onDelete: async (_, { id = '' }) => {
            return deletePermission(id).then(() => {
              ref?.current?.reload?.();
            });
          },

          onCancel: async () => {
            cancelResetCreator(allSelectedRows);
          },
          onChange: setEditableRowKeys,
        }}
      />
    </PageContainer>
  );
};
