import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';
import { Comment } from '../../model/types/comment';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const { className, isLoading, comments } = props;
    const { t } = useTranslation();

    // ✅ Сначала проверяем isLoading
    if (isLoading) {
        return (
            <div className={classNames(cls.CommentList, {}, className ? [className] : [])}>
                <CommentCard isLoading comment={{ id: '1', user: { id: '1', username: 'username' }, text: 'text' }} />
                <CommentCard isLoading comment={{ id: '1', user: { id: '1', username: 'username' }, text: 'text' }} />
                <CommentCard isLoading comment={{ id: '1', user: { id: '1', username: 'username' }, text: 'text' }} />
            </div> 
        );
    }

    return (
        <div className={classNames(cls.CommentList, {}, className ? [className] : [])}>
            {comments?.length
                ? comments.map((comment) => (
                    <CommentCard
                        isLoading={isLoading}
                        className={cls.comment}
                        comment={comment}
                        key={comment.id}
                    />
                ))
                : <Text text={t('Комментарии отсутствуют')} />}
        </div>
    );
});

CommentList.displayName = 'CommentList';