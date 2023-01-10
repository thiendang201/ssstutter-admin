import { useCategories } from 'api/categoryApi';
import { PropductProps } from 'api/productApi';
import NumberField from 'common/components/InputField/NumberField';
import SelectField from 'common/components/InputField/SelectField';
import TextField from 'common/components/InputField/TextField';
import { CloudImageProps } from 'common/utils/cloudinaryHelper';
import ImageField from 'common/components/InputField/ImageField';
import { TinyEditor } from 'common/components/editor/TinyEditor';
import { groupCategories } from 'features/category/utils/common';

import { useFormikContext } from 'formik';
import * as React from 'react';
import tw from 'twin.macro';

interface ProductInfoFormProps {}

export const FormHeading = tw.h2`font-semibold text-xl border-b border-dark-blue-grey pb-3`;

const ProductInfoForm = (props: ProductInfoFormProps) => {
  const { categories } = useCategories({ pagesize: 9999999 });
  const context = useFormikContext<PropductProps>();
  const { errors, handleChange, values, handleBlur, setFieldValue } = context;
  const categoryOptions = React.useMemo(
    () => groupCategories(categories),
    [categories]
  );

  const onImageChange = (value: CloudImageProps) => {
    setFieldValue('img', value.link);
  };

  const onRevertImage = (value: string) => {
    setFieldValue('img', '');
  };

  // console.log(values.description);

  return (
    <div>
      <FormHeading>Thông tin cơ bản</FormHeading>
      <div className='mt-10'>
        <ImageField
          label='Hình ảnh'
          name='img'
          onChange={onImageChange}
          onRevert={onRevertImage}
          value={values.img}
        />
        <SelectField
          label='Loại sản phẩm'
          name='categoryId'
          required
          value={values.categoryId}
          error={errors.categoryId}
          options={categoryOptions}
          onChange={(value) => setFieldValue('categoryId', value.value)}
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
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
          placeHolder='Nhập giá sản phẩm'
        />
        <TinyEditor
          label='Mô tả'
          value={values.description ?? ''}
          name='description'
          onChange={(value) => setFieldValue('description', value)}
        />
      </div>
    </div>
  );
};

export default ProductInfoForm;
