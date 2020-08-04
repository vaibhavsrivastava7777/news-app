import { produce } from 'immer';
import { ActionTypes } from './actions';
import { Action, AppState } from './types';

export const initialState = Object.freeze<AppState>({
    locale: 'en_US',
    news: null,
    hideMap: null,
});

export default (state: AppState = initialState, action: Action): AppState =>
    produce(state, (draft) => {
        switch (action.type) {
            case ActionTypes.SETLOCALE: {
                draft.locale = action.payload;
                return;
            }
            case ActionTypes.SET_NEWS: {
                draft.news = { ...action.payload };
                return;
            }
            case ActionTypes.SET_HIDE_MAP: {
                let hideMap = { ...state.hideMap };
                if (Object.keys(hideMap).length === 0) {
                    hideMap = window && JSON.parse(window.localStorage.getItem('hideMap') || '{}');
                }
                hideMap[action.payload] = true;
                if (window) {
                    window.localStorage.setItem('hideMap', JSON.stringify(hideMap));
                }
                draft.hideMap = hideMap;
                return;
            }
            case ActionTypes.INIT_HIDE_MAP: {
                draft.hideMap =
                    window && JSON.parse(window.localStorage.getItem('hideMap') || '{}');
                return;
            }
        }
    });
