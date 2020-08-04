import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import Features from 'shared/components/Features';
// import { setLocale } from 'store/app/actions';
import { newsAsync, setHideMap, initHideMap } from 'store/app/actions';
import { getNews, getHideMap } from 'store/app/selectors';
// import { Locale } from 'store/app/types';
import css from './home.module.css';

const Home: React.FC<any> = () => {
    // const { t } = useTranslation();
    const dispatch = useDispatch();
    const news = useSelector(getNews);
    const hideMap = useSelector(getHideMap);

    useEffect(() => {
        if (hideMap === null) {
            dispatch(initHideMap());
        }
        if (news === null) {
            dispatch(newsAsync({ page: 0 }));
        }
    });

    const getUrl = (url: string) => {
        try {
            const host = new URL(url).host;
            return <a href={url}>({host})</a>;
        } catch (e) {
            return '';
        }
    };

    const getDateDiff = (createdAt: number) => {
        const diff = new Date().getTime() - createdAt;
        return Math.ceil(diff / (1000 * 60 * 60 * 60 * 24));
    };

    const hits =
        news &&
        news.hits
            .filter((hit: any) => {
                return !hideMap[hit.objectID];
            })
            .map((hit: any) => {
                return {
                    title: hit.title,
                    url: getUrl(hit.url),
                    author: hit.author,
                    created_at_i: getDateDiff(hit.created_at_i),
                    objectID: hit.objectID,
                    hide: false,
                    upvote: 0,
                    comments: 0,
                };
            });

    const hideHit = (objectID: string) => {
        dispatch(setHideMap(objectID));
    };

    const previousPage = () => {
        const page = news.page - 1;
        if (page >= 0) {
            dispatch(newsAsync({ page }));
        }
        console.log(page);
    };

    const nextPage = () => {
        const page = news.page + 1;
        if (page <= news.nbPages) {
            dispatch(newsAsync({ page }));
        }
        console.log(page);
    };

    console.log('renderewd', news, hideMap);
    return (
        <React.Fragment>
            <div className={css.container}>
                <div className={`${css.row} ${css.header}`}>
                    <div className={css['col-10']}>Comments</div>
                    <div className={css['col-10']}>Vote Count</div>
                    <div className={css['col-10']}>UpVote</div>
                    <div className={css.col}>News Details</div>
                </div>
                {hits &&
                    hits.map((hit: any) => {
                        return (
                            <div key={hit.objectID} className={`${css.row} ${css.item}`}>
                                <div className={css['col-10']}>{hit.comments}</div>
                                <div className={css['col-10']}>{hit.upvote}</div>
                                <div className={css['col-10']}>x</div>
                                <div className={css.col}>
                                    {hit.title} {hit.url} by {hit.author} {hit.created_at_i} days
                                    ago{' '}
                                    <button onClick={() => hideHit(hit.objectID)}>[hide]</button>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div>
                <button onClick={previousPage}>Previous</button>
                <button onClick={nextPage}>Next</button>
            </div>
        </React.Fragment>
    );
};

export default Home;
