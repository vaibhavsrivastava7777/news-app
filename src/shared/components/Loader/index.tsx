import React from 'react';
import css from './Loader.module.css';

const Loader = () => {
    return (
        <div className={css.LoaderContaier}>
            <div className={css.Loader} />
        </div>
    );
};
export default Loader;
