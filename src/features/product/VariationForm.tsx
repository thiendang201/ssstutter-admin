import { useColors } from 'api/colorApi';
import { PropductProps, VariantProps } from 'api/productApi';
import { Button } from 'common/components/button/Button';
import { toOptions } from 'common/utils/common';
import { FormHeading } from 'features/product/ProductInfoForm';
import { VariationControl } from 'features/product/VariationFormControl';
import { Formik, useFormikContext } from 'formik';
import { cloneDeep } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import tw from 'twin.macro';
import { VariationFormBody } from './VariationFormBody';

interface VariationFormProps {}

const VariationForm = ({}: VariationFormProps) => {
  const { colors } = useColors();
  const { values, setFieldValue } = useFormikContext<PropductProps>();
  const [activeIndex, setActiveIndex] = useState(0);

  const variant = values.variant[activeIndex];
  const existsColors = useMemo(
    () => values.variant.map((v) => v.colorId),
    [values.variant]
  );
  const colorsOptions = useMemo(() => {
    const options = colors.filter(
      (c) => c.id === variant?.colorId || !existsColors.includes(c.id)
    );
    return toOptions(options, ['name', 'id']);
  }, [colors, existsColors, variant]);

  const onChangeVariant = (index: number) => {
    setActiveIndex(index);
  };

  const onAddVariant = () => {
    if (!colors) return;

    for (let i of colors) {
      if (existsColors.includes(i.id)) continue;

      const newVariant: VariantProps = {
        colorId: +i.id,
        colorName: i.name,
        thumbnail: '',
        sizes: [],
        images: [],
        deleted: 0
      };

      setFieldValue('variant', [newVariant, ...values.variant]);
      setActiveIndex(0);
      return;
    }
  };

  const onRemoveVariant = (index: number) => {
    const variants = [...values.variant];
    let newActiveIndex = index === 0 || variants.length === 2 ? 0 : index - 1;

    console.log(index, newActiveIndex);

    variants.splice(index, 1);

    setFieldValue('variant', variants);
    setActiveIndex(newActiveIndex);
  };

  useEffect(() => {
    const variants = cloneDeep(values.variant);

    if (!colors.length) return;

    for (let v of variants) {
      if (v.colorId !== -1) continue;

      v.colorId = colors[0].id;
      v.colorName = colors[0].name;
      setFieldValue('variant', variants);
      break;
    }
  }, [colors]);

  return (
    <div>
      <FormHeading className='mt-10'>Các phiên bản màu</FormHeading>
      <VariationControl
        data={values.variant}
        onClick={onChangeVariant}
        onAdd={onAddVariant}
        currentVariantId={variant.colorId}
      />
      <Button
        type='button'
        variant='outline'
        onClick={() => onRemoveVariant(activeIndex)}
        css={tw`w-full mb-6 border-2 border-red-400 text-red-400 bg-red-50 disabled:(border-gray-300 text-gray-400 bg-gray-50)`}
        disabled={values.variant.length <= 1}
      >
        Xóa phiên bản này
      </Button>
      <VariationFormBody
        activeIndex={activeIndex}
        colorOptions={colorsOptions}
        variant={variant}
      />
    </div>
  );
};

export default VariationForm;
