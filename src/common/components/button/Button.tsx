import * as React from 'react';
import tw, { styled } from 'twin.macro';

interface ButtonProps {
  variant: 'primary' | 'outline' | 'secondary';
}

export const Button = styled.button(({ variant }: ButtonProps) => [
  tw`px-7 py-3 rounded-lg flex items-center gap-2 font-semibold text-sm justify-center`,
  variant === 'primary' && tw`bg-primary-purple text-white`,
  variant === 'secondary' && tw`bg-background`,
  variant === 'outline' && tw`border border-light-blue-grey`
]);
