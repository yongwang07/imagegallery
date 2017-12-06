import { SHOW_DETAIL, DISPLAY_MENU, SHOW_GRID } from './actions';

const initialState = {
    imgs: ['sanfrancisco', 'aviv', 'dublin', 'london', 'charleston', 'saopaulo', 'boston', 'amsterdam', 
           'crazy', 'kuala', 'nyc', 'budapest', 'manhattan', 'milan', 'zurich', 'mountainview', 'chicago', 
           'austin', 'oakland', 'kahahai', 'moscow', 'gurgaon', 'headquarter', 'bangalore', 
           'bangkok', 'atlanta', 'pittsburgh'],
    currentImgIdx: 0,
    isGrid: true,
    showMenu: false
};

export function imageReducer (state = initialState, action) {
    switch (action.type) {
        case SHOW_DETAIL:
            return Object.assign({}, state, {currentImgIdx: action.payload}, {isGrid: false});
        case DISPLAY_MENU:
            return Object.assign({}, state, {showMenu: !state.showMenu});
        case SHOW_GRID:
            return Object.assign({}, state, {showMenu: false}, {isGrid: true});
        default:
            return state;
    }
}