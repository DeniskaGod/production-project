import { classNames } from '@/shared/lib/classNames/classNames';
import React from 'react'
import './Loader.scss';

interface LoaderProps {
    className?: string;
}

export default function Loader({ className }: LoaderProps) {
  return (
    <div className={classNames('loader', {}, className ? [className] : [])}>
        <span></span>
    </div>
  )
}
