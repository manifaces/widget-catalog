import { ReactNode } from 'react';
import s from './ContentBox.module.scss';
import clsx from 'clsx';

export interface ContentBoxProps {
  className?: string;
  children?: ReactNode;
}

export const ContentBox = ({
  className,
  children
}: ContentBoxProps) => {
  return (
    <div className={clsx(s.ContentBox, className)}>
      {children}
    </div>
  )
}