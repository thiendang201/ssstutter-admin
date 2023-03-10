import { BreadCrumbs } from 'common/components/breadcrumbs/BreadCrumbs';
import { Button } from 'common/components/button/Button';
import { RiAddFill } from 'react-icons/ri';
import React, { useMemo, useState } from 'react';
import { SearchBar } from 'common/components/searchBar/SearchBar';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from 'common/components/table/Table';
import { DarkModeWrapper } from 'features/darkMode/DarkMode';
import { Badge } from 'common/components/badge/Badge';
import { find } from 'lodash';
import { useCategories } from 'api/categoryApi';
import { Link, useSearchParams } from 'react-router-dom';
import { CircleButton } from 'common/components/button/CircleButton';
import { MdDelete, MdEdit } from 'react-icons/md';
import tw from 'twin.macro';
import { useProductsProps } from 'api/productApi';

export interface CategoryProps {
  id: number;
  name: string;
  text: string | null;
  img: string | null;
  parentsId: number | null;
  deleted: number;
  visible: number;
}

export function CategoryListView() {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<useProductsProps>({
    keyword: searchParams.get('keyword') ?? '',
    page: Number(searchParams.get('page') ?? 1)
  });
  const { categories, pagination } = useCategories({
    keyword: filter.keyword,
    page: filter.page
  });

  const defaultColumns = useMemo<ColumnDef<CategoryProps>[]>(
    () => [
      {
        accessorKey: 'name',
        header: () => <p className='text-left'>Tên loại</p>,
        cell: (info) => (
          <p className='min-h-[82px] flex items-center'>
            {info.getValue<string>()}
          </p>
        )
      },
      {
        accessorKey: 'text',
        header: 'Tên hiển thị',
        cell: (info) => <p className='text-center'>{info.getValue<string>()}</p>
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
        accessorKey: 'visible',
        header: 'Hiển thị',
        cell: (info) => {
          const isVisible = !!info.getValue<number>();

          return (
            <div className='flex'>
              <Badge
                className='m-auto'
                variant={isVisible ? 'success' : 'disabled'}
              >
                {isVisible ? 'Hiện' : 'Đã ẩn'}
              </Badge>
            </div>
          );
        }
      },
      {
        accessorKey: 'parentsId',
        header: 'Danh mục cha',
        cell: (info) => (
          <p className='text-center'>
            {find(categories, (c) => c.id === info.getValue())?.name}
          </p>
        )
      },
      {
        accessorKey: 'id',
        header: '#',
        cell: (info) => (
          <div className='flex gap-2 justify-center'>
            <CircleButton variant='secondary' css={tw`bg-background`}>
              <Link to={`/category/edit/${info.getValue()}`}>
                <MdEdit size={20} className='text-icon' />
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
        state.page = 1;
      }

      return state;
    });

  return (
    <div>
      <BreadCrumbs>
        <span>quản lý thông tin</span>
        <span>thể loại</span>
      </BreadCrumbs>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl text-dark-blue font-semibold'>
          Quản lý thể loại
        </h1>
        <div className='flex gap-6'>
          <SearchBar
            variant='outline'
            placeHolder='Tìm kiếm loại sản phẩm'
            onChange={handleFilter('keyword')}
            defaultValue={searchParams.get('keyword') ?? ''}
          />
          <Button variant='primary'>
            <Link to='/category/add' className='flex items-center gap-2'>
              <RiAddFill className='text-white' size={24} />
              Thêm mới
            </Link>
          </Button>
        </div>
      </div>
      <DarkModeWrapper className='p-8 rounded-lg shadow-primary mt-10'>
        <Table
          onPaginationItemClick={handleFilter('page')}
          data={categories}
          pagination={pagination}
          columns={defaultColumns}
        />
      </DarkModeWrapper>
    </div>
  );
}
