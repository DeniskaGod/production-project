import { classNames } from '@/shared/lib/classNames/classNames';
import React from 'react'
import cls from './PageLoader.module.scss';
import Loader from '@/shared/ui/Loader/Loader';

interface PageLoaderProps {
    className?: string;
}

export default function PageLoader({ className }: PageLoaderProps) {
  return (
    <div className={classNames(cls.PageLoader, {}, className ? [className] : [])}>
        <Loader />
    </div>
  )
}
