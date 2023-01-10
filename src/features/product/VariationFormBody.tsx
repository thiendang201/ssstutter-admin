import { ImageProps, PropductProps, VariantProps } from 'api/productApi';
import { SizeProps, useSizes } from 'api/sizeApi';
import FieldContainer from 'common/components/InputField/FieldContainer';
import ImageField from 'common/components/InputField/ImageField';
import SelectField, { Option } from 'common/components/InputField/SelectField';
import { CloudImageProps } from 'common/utils/cloudinaryHelper';
import { useFormikContext } from 'formik';
import { cloneDeep } from 'lodash';
import * as React from 'react';
import SizePickerItem from './SizePickerItem';

interface VariationFormBodyProps {
  activeIndex: number;
  colorOptions: Option[];
  variant: VariantProps;
}

export const VariationFormBody: React.FunctionComponent<
  VariationFormBodyProps
> = ({ activeIndex, colorOptions, variant }) => {
  const { sizes } = useSizes();
  const { values, setFieldValue } = useFormikContext<PropductProps>();
  const [tempImgs, setTempImgs] = React.useState<Record<number, ImageProps[]>>(
    []
  );

  const imageList = React.useMemo(
    () => variant.images.map((v) => v.url),
    [variant]
  );
  const sizePicked = React.useMemo(
    () => variant.sizes.map((v) => v.size),
    [variant]
  );

  React.useEffect(() => {
    const changeVariant = cloneDeep(variant);
    const variantList = cloneDeep(values.variant);

    if (!(activeIndex in tempImgs)) return;

    changeVariant.images = [...tempImgs[activeIndex]];
    variantList[activeIndex] = changeVariant;
    setFieldValue('variant', variantList);
  }, [tempImgs]);

  const onChange =
    (
      key:
        | 'colorId'
        | 'thumbnail'
        | 'thumbnail-revert'
        | 'images'
        | 'images-revert'
    ) =>
    (value: CloudImageProps | Option | string) => {
      const changeVariant = cloneDeep(variant);
      const variantList = cloneDeep(values.variant);

      switch (key) {
        case 'colorId':
          value = value as Option;
          changeVariant.colorId = +value.value;
          changeVariant.colorName = value.label;
          break;
        case 'thumbnail':
          value = value as CloudImageProps;
          changeVariant.thumbnail = value.link;
          break;
        case 'thumbnail-revert':
          changeVariant.thumbnail = '';
          break;
        case 'images':
          setTempImgs((prev) => {
            if (activeIndex in prev) {
              return {
                ...prev,
                [activeIndex]: [
                  ...prev[activeIndex],
                  {
                    url: (value as CloudImageProps).link,
                    deleted: 0
                  }
                ]
              };
            }

            return {
              ...prev,
              [activeIndex]: [
                {
                  url: (value as CloudImageProps).link,
                  deleted: 0
                }
              ]
            };
          });

          break;
        case 'images-revert':
          setTempImgs((prev) => {
            if (!(activeIndex in tempImgs)) return prev;

            return {
              ...prev,
              [activeIndex]: prev[activeIndex].filter(
                (i) => !i.url.includes(value + '')
              )
            };
          });
          break;
      }
      variantList[activeIndex] = changeVariant;
      setFieldValue('variant', variantList);
    };

  const onSizeClick = (value: SizeProps) => {
    const changeVariant = cloneDeep(variant);
    const variantList = cloneDeep(values.variant);

    if (sizePicked.includes(value.size)) {
      changeVariant.sizes = changeVariant.sizes.filter(
        (s) => s.size !== value.size
      );
    } else {
      changeVariant.sizes.push(value);
    }

    variantList[activeIndex] = changeVariant;
    setFieldValue('variant', variantList);
  };

  const onSizeQtyChange = (value: SizeProps) => {
    const changeVariant = cloneDeep(variant);
    const variantList = cloneDeep(values.variant);
    const size = changeVariant.sizes.find((s) => s.size === value.size);

    if (!size) return;

    size.quantity = value.quantity;
    variantList[activeIndex] = changeVariant;
    setFieldValue('variant', variantList);
  };

  return (
    <div>
      <SelectField
        label='Màu sắc'
        name='colorId'
        required
        value={variant.colorId}
        options={colorOptions}
        onChange={onChange('colorId')}
        placeHolder='Chọn màu'
      />
      <FieldContainer label='Kích cỡ & số lượng' required>
        <div className='gap-4 grid grid-cols-5'>
          {sizes.map((s, i) => (
            <SizePickerItem
              key={s.size}
              size={s.size}
              quantity={
                variant.sizes.find((i) => i.size === s.size)?.quantity ?? 0
              }
              selected={sizePicked.includes(s.size)}
              onClick={onSizeClick}
              onChange={onSizeQtyChange}
            />
          ))}
        </div>
      </FieldContainer>
      <ImageField
        label='Hình thu nhỏ'
        name='thumbnail'
        onChange={onChange('thumbnail')}
        onRevert={onChange('thumbnail-revert')}
        value={variant.thumbnail ?? ''}
        keyReload={variant.colorId}
      />
      <ImageField
        label='Hình ảnh sản phẩm'
        name='images'
        allowMultiple
        maxFile={4}
        onChange={onChange('images')}
        onRevert={onChange('images-revert')}
        value={imageList}
        keyReload={variant.colorId}
      />
    </div>
  );
};
