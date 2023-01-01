import { DetailedHTMLProps, HTMLAttributes } from 'react';
import tw, { styled } from 'twin.macro';

interface BadgeProps {
  variant?: 'danger' | 'warning' | 'success' | 'disabled' | 'info';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Badge = styled.span(
  ({ variant = 'info', size = 'md' }: BadgeProps) => [
    tw`rounded-full font-semibold dark:bg-gray-600/20`,
    variant === 'danger' && tw`text-red-400 bg-red-100`,
    variant === 'warning' && tw`text-yellow-500 bg-yellow-100`,
    variant === 'success' && tw`text-green-500 bg-green-100`,
    variant === 'disabled' && tw`text-gray-600 bg-gray-100 `,
    variant === 'info' && tw`text-blue-500 bg-blue-100`,
    size === 'sm' && tw`px-2 py-1 text-xs`,
    size === 'md' && tw`px-3 py-1.5 text-sm`,
    size === 'lg' && tw`px-4 py-2`,
    size === 'xl' && tw`px-5 py-2.5 text-lg`
  ]
);
