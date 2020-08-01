import * as React from 'react';
import { useTranslation } from 'react-i18next';
import css from './Features.module.css';

const Features = () => {
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <h2>{t('features')}</h2>
        </React.Fragment>
    );
};

export default Features;
