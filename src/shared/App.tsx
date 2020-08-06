// import React, { Suspense } from 'react';
import * as React from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import routes from './routes';
import css from './App.module.css';

const App: React.FC<any> = () => {
    // const { t } = useTranslation();
    return (
        // <Suspense fallback={<div>Loading</div>}>
        <div className={css.wrapper}>
            <Switch>
                <Route exact path={routes.home} component={Home} />
                <Route render={() => <Redirect to="/0" />} />
            </Switch>
            {/* <h2>{t('router-headline')}</h2> */}
            {/* <ul>
                <li>
                    <Link to="/">{t('nav.home')}</Link>
                </li>
                <li>
                    <Link to="/page-1">{t('nav.page-1')}</Link>
                </li>
                <li>
                    <Link to="/page-2">{t('nav.page-2')}</Link>
                </li>
            </ul> */}
        </div>
        // </Suspense>
    );
};

export default App;
