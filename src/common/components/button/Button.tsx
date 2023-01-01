import * as React from 'react';
import tw, { styled } from 'twin.macro';

interface ButtonProps {
  variant: 'primary' | 'outline';
}

export const Button = styled.button(({ variant }: ButtonProps) => [
  tw`px-7 py-3 rounded-lg flex items-center gap-2 text-white font-semibold text-sm`,
  variant === 'primary' && tw`bg-primary-purple`,
  variant === 'outline' && tw`border border-light-blue-grey`
]);
