import { BreadCrumbs } from 'common/components/breadcrumbs/BreadCrumbs';
import * as React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { CircleButton } from 'common/components/button/CircleButton';
import { TbArrowBack } from 'react-icons/tb';
import { PropductProps } from 'api/productApi';

export const ProductFormView = () => {
  const { productId } = useParams();
  const [product, setProduct] = React.useState<PropductProps>({
    id: -1,
    name: '',
    categoryId: -1,
    img: '',
    deleted: 0,
    description: '',
    price: 0
  });

  return (
    <div className='w-[700px] mx-auto'>
      <div>
        <BreadCrumbs>
          <span>quản lý thông tin</span>
          <Link to='/product/list' className='hover:text-primary-purple'>
            sản phẩm
          </Link>
          <span>thêm mới</span>
        </BreadCrumbs>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl text-dark-blue font-semibold mt-2'>
            Thêm sản phẩm mới
          </h1>
          <CircleButton variant='secondary' size='lg'>
            <Link to='/product/list' className='flex h-full w-full'>
              <TbArrowBack className='text-dark-blue m-auto' size={24} />
            </Link>
          </CircleButton>
        </div>
      </div>
      <div className='pt-16 mx-auto'>
        {/* <CategoryForm
          initialValues={product}
          onsubmit={function (data: FormikValues): Promise<void> {
            throw new Error('Function not implemented.');
          }} */}
        {/* /> */}
      </div>
    </div>
  );
};
