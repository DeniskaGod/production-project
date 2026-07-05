import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const AboutPage = memo(() => {
  const { t } = useTranslation('about');

  return (
    <div>
      {t('О сайте')}
    </div>
  );
});

export default AboutPage;
AboutPage.displayName = "AboutPage";