import { HTMLAttributes, memo, ReactNode } from 'react';
import cls from './Card.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
}

export const Card = memo((props: CardProps) => {
    const { className, children, ...otherProps } = props;

    return (
        <div
            className={classNames(cls.Card, {}, className ? [className] : [])}
            {...otherProps}
        >
            {children}
        </div>
    );
});

Card.displayName = 'Card';
