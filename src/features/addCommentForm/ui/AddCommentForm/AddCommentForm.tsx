import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice';
import { getAddCommentFormError, getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import cls from './AddCommentForm.module.scss';
import DynamicModuleLoader, { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import Button, { ThemeButton } from '@/shared/ui/Button/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/Input/Input';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { addCommentForArticle } from '@/pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation();
    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value));
    }, [dispatch]);

    const onSendHandler = useCallback(async () => {
        if (text?.trim()) {
            await dispatch(addCommentForArticle(text));
            onSendComment(text || '');
            onCommentTextChange('');
        }
    }, [dispatch, text, onSendComment, onCommentTextChange]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.AddCommentForm, {}, className ? [className] : [])}>
                <Input
                    className={cls.input}
                    placeholder={t('Введите текст комментария')}
                    value={text}
                    onChange={onCommentTextChange}
                />
                <Button
                    theme={ThemeButton.OUTLINE}
                    onClick={onSendHandler}
                >
                    {t('Отправить')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

AddCommentForm.displayName = 'AddCommentForm';

export default AddCommentForm;