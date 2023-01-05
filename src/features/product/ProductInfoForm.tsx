import { useCategories } from 'api/categoryApi';
import { PropductProps } from 'api/productApi';
import NumberField from 'common/components/InputField/NumberField';
import SelectField from 'common/components/InputField/SelectField';
import TextField from 'common/components/InputField/TextField';
import { useFormikContext } from 'formik';
import { groupCategories } from 'mock/categoryMockData';
import * as React from 'react';
import tw from 'twin.macro';

interface ProductInfoFormProps {}

const FormHeading = tw.h2`font-semibold text-xl border-b border-dark-blue-grey pb-3`;

const ProductInfoForm = (props: ProductInfoFormProps) => {
  const { categories } = useCategories();
  const context = useFormikContext<PropductProps>();
  const { errors, handleChange, values, handleBlur, setFieldValue } = context;

  return (
    <div>
      <FormHeading>Thông tin cơ bản</FormHeading>
      <div className='flex gap-10 mt-10'>
        <div className='w-[300px] bg-slate-100'>ảnh</div>
        <div className='flex-1'>
          <SelectField
            label='Loại sản phẩm'
            name='categoryId'
            required
            value={1}
            error={errors.categoryId}
            options={groupCategories}
            onChange={(value) => setFieldValue('categoryId', value)}
            onBlur={handleBlur}
            placeHolder='Chọn loại sản phẩm'
          />
          <TextField
            label='Tên sản phẩm'
            name='name'
            required
            error={errors.name}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeHolder='Nhập tên sản phẩm'
          />
          <NumberField
            label='Giá bán'
            name='price'
            required
            error={errors.price}
            value={values.price + ''}
            onChange={handleChange}
            onBlur={handleBlur}
            placeHolder='Nhập giá sản phẩm'
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfoForm;
