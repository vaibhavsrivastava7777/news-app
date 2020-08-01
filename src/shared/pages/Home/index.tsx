import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import Features from 'shared/components/Features';
// import { setLocale } from 'store/app/actions';
// import { Locale } from 'store/app/types';
import css from './home.module.css';

const App: React.FC<any> = () => {
    // const { t } = useTranslation();
    // const dispatch = useDispatch();
    // const handleLocaleChange = useCallback(
    //     (e: React.FormEvent<HTMLButtonElement>) => {
    //         dispatch(setLocale(e.currentTarget.value as Locale));
    //     },
    //     [dispatch]
    // );

    return (
        <React.Fragment>
            <div className={css.container}>
                <div className={`${css.row} ${css.header}`}>
                    <div className={css['col-10']}>Comments</div>
                    <div className={css['col-10']}>Vote Count</div>
                    <div className={css['col-10']}>UpVote</div>
                    <div className={css.col}>News Details</div>
                </div>
                <div className={`${css.row} ${css.item}`}>
                    <div className={css['col-10']}>36</div>
                    <div className={css['col-10']}>96</div>
                    <div className={css['col-10']}>x</div>
                    <div className={css.col}>
                        Seemingly impossible Swift Programs (fewbutripe.com) by wool gather 5hours
                        ago [hide]
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default App;
