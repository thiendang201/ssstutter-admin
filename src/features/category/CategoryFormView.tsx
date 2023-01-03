import { BreadCrumbs } from 'common/components/breadcrumbs/BreadCrumbs';
import * as React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { CategoryForm } from 'features/category/CategoryForm';
import { FormikValues } from 'formik/dist/types';
import { CategoryProps } from 'features/category/ListView';
import { CircleButton } from 'common/components/button/CircleButton';
import { TbArrowBack } from 'react-icons/tb';

export const CategoryFormView = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = React.useState<CategoryProps>({
    id: -1,
    name: '',
    visible: 0,
    parentsId: null,
    img: null,
    deleted: 0,
    text: ''
  });

  return (
    <div className='w-[700px] mx-auto'>
      <div>
        <BreadCrumbs>
          <span>quản lý thông tin</span>
          <Link to='/category/list' className='hover:text-primary-purple'>
            thể loại
          </Link>
          <span>thêm mới</span>
        </BreadCrumbs>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl text-dark-blue font-semibold mt-2'>
            Thêm thể loại mới
          </h1>
          <CircleButton variant='secondary' size='lg'>
            <Link to='/category/list' className='flex h-full w-full'>
              <TbArrowBack className='text-dark-blue m-auto' size={24} />
            </Link>
          </CircleButton>
        </div>
      </div>
      <div className='pt-16 mx-auto'>
        <CategoryForm
          initialValues={category}
          onsubmit={function (data: FormikValues): Promise<void> {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
    </div>
  );
};
