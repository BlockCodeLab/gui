import { useReducer } from 'preact/hooks';

const SET_LAYOUT = 'SET_LAYOUT';
const SELECT_TAB = 'SELECT_TAB';
const ADD_TABS = 'ADD_TABS';

const initialState = {
  menus: [],
  tabs: [],
  sidebars: [],
  pane: false,
  selectedTab: -1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LAYOUT:
      return Object.assign({}, initialState, action.payload);
    case SELECT_TAB:
      return {
        ...state,
        selectedTab: action.payload,
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
