import { ColumnDef } from '@tanstack/react-table';
import { PropductProps, useProducts, useProductsProps } from 'api/productApi';
import { BreadCrumbs } from 'common/components/breadcrumbs/BreadCrumbs';
import { Button } from 'common/components/button/Button';
import { CircleButton } from 'common/components/button/CircleButton';
import { SearchBar } from 'common/components/searchBar/SearchBar';
import { Table } from 'common/components/table/Table';
import { formatVNCurrency } from 'common/utils/common';
import { DarkModeWrapper } from 'features/darkMode/DarkMode';

import React, { useMemo, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { RiAddFill, RiEyeFill } from 'react-icons/ri';
import { Link, useSearchParams } from 'react-router-dom';
import tw from 'twin.macro';

const ProductListView = () => {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<useProductsProps>({
    keyword: searchParams.get('keyword') ?? '',
    page: Number(searchParams.get('page') ?? 1)
  });
  const { products, pagination } = useProducts({
    keyword: filter.keyword,
    page: filter.page
  });

  const defaultColumns = useMemo<ColumnDef<PropductProps>[]>(
    () => [
      {
        accessorKey: 'name',
        header: () => <p className='text-left'>Tên sản phẩm</p>,
        cell: (info) => (
          <p className='min-h-[82px] flex items-center'>
            {info.getValue<string>()}
          </p>
        )
      },
      {
        accessorKey: 'price',
        header: 'Giá tiền',
        cell: (info) => (
          <p className='text-center'>
            {formatVNCurrency(+info.getValue<string>())}
          </p>
        )
      },
      {
        accessorKey: 'img',
        header: 'Hình ảnh',
        cell: (info) => {
          const value = info.getValue<string>();
          return value ? (
            <img
              className='w-16 h-16 rounded object-cover m-auto'
              src={info.getValue<string>()}
            />
          ) : (
            ''
          );
        }
      },
      {
        accessorKey: 'categoryName',
        header: 'Loại sản phẩm',
        cell: (info) => <p className='text-center'>{info.getValue<string>()}</p>
      },
      {
        accessorKey: 'id',
        header: '#',
        cell: (info) => (
          <div className='flex gap-2 justify-center'>
            <CircleButton variant='secondary' css={tw`bg-background`}>
              <Link
                to={`/product/details/${info.getValue()}`}
                className='flex w-full h-full'
              >
                <RiEyeFill size={20} className='text-icon m-auto' />
              </Link>
            </CircleButton>
            <CircleButton variant='secondary' css={tw`bg-background`}>
              <Link
                to={`/product/edit/${info.getValue()}`}
                className='flex w-full h-full'
              >
                <MdEdit size={20} className='text-icon m-auto' />
              </Link>
            </CircleButton>
            <CircleButton variant='secondary' css={tw`bg-background`}>
              <MdDelete size={20} className='text-icon' />
            </CircleButton>
          </div>
        )
      }
    ],
    []
  );

  const handleFilter = (key: string) => (value: string | number) =>
    setFilter((prev) => {
      const state = { ...prev, [key]: value };
      if (key === 'keyword') {
        // state.page = 1;
      }

      return state;
    });

  return (
    <div>
      <BreadCrumbs>
        <span>quản lý thông tin</span>
        <span>sản phẩm</span>
      </BreadCrumbs>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl text-dark-blue font-semibold'>
          Quản lý sản phẩm
        </h1>
        <div className='flex gap-6 items-center'>
          <SearchBar
            variant='outline'
            placeHolder='Tìm kiếm sản phẩm'
            onChange={handleFilter('keyword')}
            defaultValue={searchParams.get('keyword') ?? ''}
          />
          <Button variant='primary'>
            <Link to='/product/add' className='flex items-center gap-2'>
              <RiAddFill className='text-white' size={24} />
              Thêm mới
            </Link>
          </Button>
        </div>
      </div>
      <DarkModeWrapper className='p-8 rounded-lg shadow-primary mt-10'>
        <Table
          onPaginationItemClick={handleFilter('page')}
          data={products}
          pagination={pagination}
          columns={defaultColumns}
        />
      </DarkModeWrapper>
    </div>
  );
};

export default ProductListView;
