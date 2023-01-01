import * as React from 'react';
import tw, { styled } from 'twin.macro';

interface AvatarProps {
  imgUrl: string;
  displayText: string;
  bgColor: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circle' | 'square';
}

const AvatarWrapper = styled.div(
  ({ size, variant }: Pick<AvatarProps, 'size' | 'variant'>) => [
    tw`overflow-hidden`,
    variant === 'circle' && tw`rounded-full`,
    variant === 'square' && tw`rounded-md`,
    size === 'sm' && tw`w-8 h-8`,
    size === 'md' && tw`w-12 h-12`,
    size === 'lg' && tw`w-16 h-16`,
    size === 'xl' && tw`w-24 h-24`
  ]
);

export function Avatar({
  imgUrl,
  displayText,
  bgColor,
  alt,
  size = 'md',
  variant = 'circle'
}: AvatarProps) {
  return (
    <AvatarWrapper size={size} variant={variant}>
      {imgUrl ? (
        <img src={imgUrl} alt={alt ?? 'user-avatar'} />
      ) : (
        <div
          css={[
            tw`bg-blue-400 h-full flex items-center justify-center font-medium text-white`
          ]}
        >
          {displayText}
        </div>
      )}
    </AvatarWrapper>
  );
}
