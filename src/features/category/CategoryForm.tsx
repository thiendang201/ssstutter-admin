import { Button } from 'common/components/button/Button';
import TextField from 'common/components/InputField/TextField';
import { Formik, FormikValues, Form, FormikHelpers } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import SelectField from 'common/components/InputField/SelectField';
import { useCategories } from 'api/categoryApi';
import { toOptions } from 'common/utils/common';
import { getParentsCategories } from 'features/category/utils/common';
import { CategoryProps } from 'features/category/ListView';

interface CategoryFormProps {
  initialValues: CategoryProps;
  onsubmit: (data: CategoryProps) => void;
}

export const CategoryForm = ({
  initialValues,
  onsubmit
}: CategoryFormProps) => {
  const { categories } = useCategories({ pagesize: 9999999 });
  const schema = Yup.object().shape({
    name: Yup.string().trim().required('Vui lòng nhập tên thể loại!')
  });

  const options = React.useMemo(
    () => toOptions(getParentsCategories(categories), ['name', 'id']),
    [categories]
  );

  const handleSubmit = (
    values: CategoryProps,
    formikHelpers: FormikHelpers<CategoryProps>
  ) => {
    onsubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        handleBlur,
        handleChange,
        setFieldValue,
        touched
      }) => (
        <Form className='flex flex-col gap-2'>
          <SelectField
            label='Danh mục cha'
            name='parentsId'
            value={options[0]?.value ?? ''}
            error={errors.parentsId}
            options={options}
            onChange={(value) => setFieldValue('parentsId', value)}
            onBlur={handleBlur}
            placeHolder='Chọn danh mục cha'
          />
          <TextField
            label='Tên thể loại'
            name='name'
            required
            error={touched.name ? errors.name : ''}
            value={values.name}
            onChange={handleChange}
            onBlur={(e) => {
              handleBlur(e);
            }}
            placeHolder='Nhập tên thể loại'
          />
          <TextField
            label='Tên hiển thị'
            name='text'
            error={errors.text}
            value={values.text ?? ''}
            onChange={handleChange}
            placeHolder='Nhập tên hiển thị'
          />
          <div className='flex justify-end'>
            <Button variant='primary'>Lưu</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
