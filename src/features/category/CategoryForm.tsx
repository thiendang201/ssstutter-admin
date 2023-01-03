import { Button } from 'common/components/button/Button';
import TextField from 'common/components/textField/TextField';
import { Formik, FormikValues, Form } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

interface CategoryFormProps<T> {
  initialValues: T;
  onsubmit: (data: T) => Promise<void>;
}

export const CategoryForm = <T extends FormikValues>({
  initialValues,
  onsubmit
}: CategoryFormProps<T>) => {
  const schema = Yup.object().shape({
    name: Yup.string().trim().required('Vui lòng nhập tên thể loại!')
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      onSubmit={onsubmit}
    >
      {(formikProps) => (
        <Form className='flex flex-col gap-4'>
          <TextField
            label='Tên thể loại'
            name='name'
            required
            error={formikProps.errors?.name as string}
            value={formikProps.values?.name}
            onChange={formikProps.handleChange}
            placeHolder='Nhập tên thể loại'
          />
          <TextField
            label='Tên hiển thị'
            name='text'
            error={formikProps.errors?.text as string}
            value={formikProps.values?.text}
            onChange={formikProps.handleChange}
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
