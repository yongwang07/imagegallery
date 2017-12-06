export const SHOW_DETAIL = 'SHOW_DETAIL';
export const DISPLAY_MENU = 'DISPLAY_MENU';
export const SHOW_GRID = 'SHOW_GRID';


export const showDetail = idx => ({
    type: SHOW_DETAIL,
    payload: idx
});

export const displayMenu = () => ({
    type: DISPLAY_MENU
});

export const showGrid = () => ({
    type: SHOW_GRID
});