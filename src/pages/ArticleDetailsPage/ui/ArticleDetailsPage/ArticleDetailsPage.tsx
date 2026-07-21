import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './ArticleDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import { Text } from '@/shared/ui/Text/Text';
import { CommentList } from '@/entities/Comment';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const { id } = useParams<{id: string}>();

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, className ? [className] : [])}>
                {t('ARTICLE_NOT_FOUND')}
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, className ? [className] : [])}>
            <ArticleDetails id={id} />
            <Text text={t('Коментарии')}/>
            <CommentList isLoading={true} comments={[]}/>
        </div>
    );
};

export default memo(ArticleDetailsPage);