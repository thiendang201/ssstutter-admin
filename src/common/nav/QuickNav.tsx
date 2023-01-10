import React from 'react';
import classNames from 'classnames';
import { Avatar } from 'common/components/avatar/Avatar';
import { CircleButton } from 'common/components/button/CircleButton';
import useDisClosure from 'common/customHooks/useDisclosure';
import WithCollapse, {
  CollapseContent,
  CollapseTrigger
} from 'common/HOC/withCollapse';
import { DarkMode } from 'features/darkMode/DarkMode';
import { HiReceiptPercent } from 'react-icons/hi2';
import { MdAdd } from 'react-icons/md';
import { RiSearchLine, RiTShirt2Fill } from 'react-icons/ri';
import tw from 'twin.macro';
import { Tooltip } from 'common/components/tooltip/Tooltip';
import { Link } from 'react-router-dom';

const TextEllipsis = tw.p`text-ellipsis overflow-hidden w-full whitespace-nowrap text-center`;
const Wrapper = tw.div`sticky top-0 right-0 h-screen bg-white dark:bg-slate-800 w-32
 py-10 px-4 grid grid-rows-3-max-tail`;

export function QuickNav() {
  const { isOpen, onToggle } = useDisClosure(false);

  return (
    <Wrapper>
      <div className='flex flex-col items-center'>
        <Avatar imgUrl={''} displayText={'TD'} bgColor={''} size='lg' />
        <TextEllipsis className='text-sm font-semibold mt-2 dark:text-white'>
          Thien Dang
        </TextEllipsis>
        <TextEllipsis className='text-xs dark:text-slate-400'>
          Administator
        </TextEllipsis>
      </div>
      <div className='flex flex-col justify-center items-center gap-2'>
        <DarkMode />
        <CircleButton
          variant='secondary'
          size='lg'
          className='dark:bg-transparent'
        >
          <RiSearchLine size={24} className='text-icon' />
        </CircleButton>
      </div>
      <div className='relative'>
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-full'>
          <WithCollapse isOpen={isOpen} onToggle={onToggle}>
            <CollapseContent>
              <div className='flex flex-col items-center gap-4 py-4'>
                <Link to='/product/add'>
                  <CircleButton
                    variant='secondary'
                    size='lg'
                    onClick={onToggle}
                    className='shadow-md dark:bg-slate-900 relative group'
                  >
                    <RiTShirt2Fill size={24} className='text-primary-purple' />
                    <Tooltip className='right-full mr-2'>Thêm sản phẩm</Tooltip>
                  </CircleButton>
                </Link>
                <CircleButton
                  variant='secondary'
                  size='lg'
                  className='shadow-md dark:bg-slate-900 relative group'
                >
                  <HiReceiptPercent size={24} className='text-primary-purple' />
                  <Tooltip className='right-full mr-2'>
                    Thêm CT giảm giá
                  </Tooltip>
                </CircleButton>
              </div>
            </CollapseContent>
            <CollapseTrigger>
              <CircleButton variant='primary' size='xl' className='shadow-md'>
                <MdAdd
                  size={24}
                  className={classNames([
                    'text-white transition-all',
                    isOpen ? 'rotate-[225deg]' : 'rotate-0'
                  ])}
                />
              </CircleButton>
            </CollapseTrigger>
          </WithCollapse>
        </div>
      </div>
    </Wrapper>
  );
}
