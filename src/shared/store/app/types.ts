export type Locale = 'en_US' | 'de_DE';

export type AppState = Readonly<{
    locale: Locale;
    news: any;
    hideMap: any;
    upVoteMap: any;
}>;

export type Action = {
    type: string;
    payload: any;
};
