import { useReducer } from 'preact/hooks';

const CLEAR_LAYOUT = 'CLEAR_LAYOUT';
const SET_LAYOUT = 'SET_LAYOUT';
const SELECT_TAB = 'SELECT_TAB';
const ADD_TABS = 'ADD_TABS';

const initialState = {
  menus: [],
  tabs: [],
  sidebars: [],
  pane: false,
  tutorials: false,
  canEditProjectName: false,
  selectedTabIndex: -1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case CLEAR_LAYOUT:
      return Object.assign({}, initialState);
    case SET_LAYOUT:
      return Object.assign({}, initialState, action.payload);
    case SELECT_TAB:
      return {
        ...state,
        selectedTabIndex: action.payload,
      };
    case ADD_TABS:
      return {
        ...state,
        tabs: [...state.tabs, ...action.payload],
      };
    default:
      return state;
  }
};

export function useLayout() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    ...state,

    clearLayout() {
      dispatch({ type: CLEAR_LAYOUT });
    },

    setLayout(layout) {
      dispatch({ type: SET_LAYOUT, payload: layout });
    },

    selectTab(index) {
      dispatch({ type: SELECT_TAB, payload: index });
    },

    addTabs(tabs) {
      dispatch({ type: ADD_TABS, payload: tabs });
    },
  };
}
