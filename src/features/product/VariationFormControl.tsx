import { VariantProps } from 'api/productApi';
import { Button } from 'common/components/button/Button';
import { values } from 'lodash';
import Carousel, { ScrollMode } from 'nuka-carousel';
import * as React from 'react';
import tw, { css } from 'twin.macro';

interface VariationControlProps {
  data: VariantProps[];
  onClick: (index: number) => void;
  onAdd: () => void;
  currentVariantId: number;
}

const scrollStyle = css`
  ::-webkit-scrollbar {
    height: 4px;
    width: 4px;
    background: gray;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb:horizontal {
    background: #ddd;
    border-radius: 10px;
  }
`;
const VariantTabs = tw.div`flex gap-6 overflow-x-auto py-3 mb-6 border-b border-dark-blue-grey`;

export const VariationControl: React.FunctionComponent<
  VariationControlProps
> = ({ data, currentVariantId, onClick, onAdd }) => {
  const handleClick = (index: number) => () => onClick(index);

  return (
    <VariantTabs css={scrollStyle}>
      <Button
        variant='outline'
        onClick={onAdd}
        type='button'
        css={tw`border-primary-purple border-2 text-primary-purple`}
      >
        Thêm mới
      </Button>
      {data.map((v, i) => (
        <Button
          key={v.colorId}
          type='button'
          onClick={handleClick(i)}
          variant={v.colorId === currentVariantId ? 'primary' : 'secondary'}
        >
          {v.colorName}
        </Button>
      ))}
    </VariantTabs>
  );
};
