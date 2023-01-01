import * as React from 'react';
import tw, { styled } from 'twin.macro';

interface ButtonProps {
  variant: 'primary' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CircleButton = styled.button(
  ({ variant, size = 'md' }: ButtonProps) => [
    tw`rounded-full flex items-center justify-center gap-2 text-white font-semibold text-sm`,
    variant === 'primary' && tw`bg-primary-purple`,
    variant === 'outline' && tw`border border-light-blue-grey`,
    variant === 'secondary' && tw`bg-white `,
    size === 'sm' && tw`w-8 h-8`,
    size === 'md' && tw`w-10 h-10`,
    size === 'lg' && tw`w-12 h-12`,
    size === 'xl' && tw`w-14 h-14`
  ]
);
