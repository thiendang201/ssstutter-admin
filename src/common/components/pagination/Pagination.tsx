import React, { FC, MouseEvent } from 'react';
import { Button } from 'common/components/button/Button';
import tw from 'twin.macro';
import { getDifference } from 'common/utils/common';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
  total: number;
  active: number;
  onClick: (page: number) => void;
  padding?: number;
}

const Pagination: FC<PaginationProps> = ({
  total,
  active,
  padding = 2,
  onClick
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getLeftPages = (paddingLeft: number = padding, active: number) => {
    if ([1, 2].includes(active) || active > total) return [];

    return Array.from(
      { length: paddingLeft },
      (v, i) => active - (paddingLeft - i)
    );
  };

  const getRightPages = (paddingRight: number = padding, active: number) => {
    if ([total, total - 1].includes(active) || active > total) return [];

    return Array.from({ length: paddingRight }, (v, i) => active + i + 1);
  };

  const visiblePages = (() => {
    const middlePage =
      [1, total].includes(active) || active > total ? [] : [active];

    const paddingLeft =
      active - padding <= 1 ? getDifference(active, 1) - 1 : padding;

    const paddingRight =
      active + padding >= total ? getDifference(total, active) - 1 : padding;
    // const visibleCount = middlePage.length + paddingLeft + paddingRight < middlePage.length +

    return [
      ...getLeftPages(paddingLeft, active),
      ...middlePage,
      ...getRightPages(paddingRight, active)
    ];
  })();

  const handleClick = (page: number) => () => {
    onClick(page);

    searchParams.set('page', page.toString());
    setSearchParams(searchParams);

    window.scrollTo(0, 0);
  };
  const onNext = () => active < total && handleClick(active + 1)();
  const onPrev = () => active > 1 && handleClick(active - 1)();

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <Button
          css={[
            tw`rounded-md px-0 w-10 h-10`,
            active !== 1 && tw`dark:bg-slate-900`
          ]}
          variant={active === 1 ? 'primary' : 'secondary'}
          onClick={handleClick(1)}
        >
          1
        </Button>
        {visiblePages[0] > 2 && <p>...</p>}
        {visiblePages.map((page) => (
          <Button
            key={page}
            css={[
              tw`rounded-md px-0 w-10 h-10`,
              active !== page && tw`dark:bg-slate-900`
            ]}
            variant={active === page ? 'primary' : 'secondary'}
            onClick={handleClick(page)}
          >
            {page}
          </Button>
        ))}
        {visiblePages[visiblePages.length - 1] < total - 1 && <p>...</p>}
        {total > 1 && (
          <Button
            css={[
              tw`rounded-md px-0 w-10 h-10`,
              active !== total && tw`dark:bg-slate-900`
            ]}
            variant={active === total ? 'primary' : 'secondary'}
            onClick={handleClick(total)}
          >
            {total}
          </Button>
        )}
      </div>
      <div className='flex items-center gap-3'>
        <Button
          css={[tw`rounded-md dark:bg-slate-900`]}
          variant='secondary'
          onClick={onPrev}
          disabled={active === 1}
        >
          Trang trước
        </Button>
        <Button
          css={[tw`rounded-md dark:bg-slate-900`]}
          variant='secondary'
          onClick={onNext}
          disabled={active === total}
        >
          Trang sau
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
