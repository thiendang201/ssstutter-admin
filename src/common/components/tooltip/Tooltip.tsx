import tw from 'twin.macro';

export const Tooltip = tw.span`absolute -z-10 p-2 text-xs leading-none opacity-0 invisible
text-white whitespace-nowrap bg-slate-700 shadow-lg rounded-md
group-hover:(z-10 opacity-100 visible)`;
