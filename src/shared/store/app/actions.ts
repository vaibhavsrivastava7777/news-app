import { Locale } from './types';

export const ActionTypes = {
    SETLOCALE: 'app/set-locale',
    SET_NEWS: 'SET_NEWS',
    SET_HIDE_MAP: 'SET_HIDE_MAP',
    INIT_HIDE_MAP: 'INIT_HIDE_MAP',
    UP_VOTE: 'UP_VOTE',
    INIT_UP_VOTE_MAP: 'INIT_UP_VOTE_MAP',
};

export const initUpVoteMap = () => ({
    type: ActionTypes.INIT_UP_VOTE_MAP,
});

export const initHideMap = () => ({
    type: ActionTypes.INIT_HIDE_MAP,
});

export const setUpVoteMap = (objectId: string) => ({
    type: ActionTypes.UP_VOTE,
    payload: objectId,
});

export const setHideMap = (objectId: string) => ({
    type: ActionTypes.SET_HIDE_MAP,
    payload: objectId,
});

export const setLocale = (locale: Locale) => ({
    type: ActionTypes.SETLOCALE,
    payload: locale,
});

function setNews(payload: any) {
    return {
        type: ActionTypes.SET_NEWS,
        payload,
    };
}

export function newsAsync(config: any) {
    return (dispatch: any) => {
        // Yay! Can invoke sync or async actions with `dispatch`
        fetch(`https://hn.algolia.com/api/v1/search?page=${config.page}`)
            .then((response) => response.json())
            .then((response) => {
                dispatch(setNews(response));
            })
            .catch((err) => {
                console.log(err);
            });
        console.log('dispatched');
    };
}
