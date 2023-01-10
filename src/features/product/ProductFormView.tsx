import { BreadCrumbs } from 'common/components/breadcrumbs/BreadCrumbs';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { CircleButton } from 'common/components/button/CircleButton';
import { TbArrowBack } from 'react-icons/tb';
import { PropductProps, useProducts } from 'api/productApi';
import ProductInfoForm from './ProductInfoForm';
import { Form, Formik, FormikHelpers } from 'formik';
import VariationForm from './VariationForm';
import { Button } from 'common/components/button/Button';

export const ProductFormView = () => {
  const { productId } = useParams();
  const {
    create,
    update,
    product: updateProduct
  } = useProducts({
    productId: Number(productId) || undefined
  });

  const navigate = useNavigate();
  const [product, setProduct] = React.useState<PropductProps>({
    id: -1,
    name: '',
    categoryId: -1,
    img: '',
    deleted: 0,
    description: '',
    price: 0,
    variant: [
      {
        colorId: -1,
        colorName: 'Màu mới',
        thumbnail: '',
        sizes: [],
        images: [],
        deleted: 0
      }
    ]
  });

  React.useEffect(() => {
    updateProduct && setProduct(updateProduct);
  }, [updateProduct]);

  const onSubmit = async (
    values: PropductProps,
    formikHelpers: FormikHelpers<PropductProps>
  ) => {
    console.log(values);
    !productId && (await create(values));
    productId && (await update(values));
    navigate('/product');
  };

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
        <Formik initialValues={product} onSubmit={onSubmit} enableReinitialize>
          <Form>
            <ProductInfoForm />
            <VariationForm />
            <div className='flex justify-end mt-4'>
              <Button type='submit' variant='primary'>
                Lưu
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
