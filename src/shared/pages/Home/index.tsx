import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newsAsync, setHideMap, initHideMap, initUpVoteMap, setUpVoteMap } from 'store/app/actions';
import { getNews, getHideMap, getUpVoteMap } from 'store/app/selectors';
import { ReactComponent as UpVote } from '../../assets/triangle.svg';
import Chart from '../../components/Features';
import Loader from '../../components/Loader';
import css from './home.module.css';

const Home: React.FC<any> = () => {
    // const { t } = useTranslation();
    const dispatch = useDispatch();
    const news = useSelector(getNews);
    const hideMap = useSelector(getHideMap);
    const upVoteMap = useSelector(getUpVoteMap);

    useEffect(() => {
        if (upVoteMap === null) {
            dispatch(initUpVoteMap());
        }
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
                    upvote: upVoteMap[hit.objectID] || 0,
                    comments: hit.num_comments || 0,
                };
            });

    const hideHit = (objectID: string) => {
        dispatch(setHideMap(objectID));
    };

    const upVote = (objectID: string) => {
        dispatch(setUpVoteMap(objectID));
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
    };

    if (!news) {
        return <Loader />;
    }
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
                                <div className={css['col-10']}>
                                    <span>{hit.comments}</span>
                                </div>
                                <div className={css['col-10']}>
                                    <span>{hit.upvote}</span>
                                </div>
                                <div className={css['col-10']}>
                                    <span>
                                        <UpVote
                                            className={css.upVote}
                                            onClick={() => upVote(hit.objectID)}
                                        />
                                    </span>
                                </div>
                                <div className={css.col}>
                                    <span>
                                        {hit.title} {hit.url} by {hit.author} {hit.created_at_i}{' '}
                                        days ago{' '}
                                        <button
                                            type="button"
                                            className={css.btnToLink}
                                            onClick={() => hideHit(hit.objectID)}
                                        >
                                            [Hide]
                                        </button>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className={css.pageBtns}>
                <button type="button" className={css.btnToLink} onClick={previousPage}>
                    Previous
                </button>
                |
                <button type="button" className={css.btnToLink} onClick={nextPage}>
                    Next
                </button>
            </div>

            {upVoteMap && <Chart upVoteMap={upVoteMap} />}
        </React.Fragment>
    );
};

export default Home;
