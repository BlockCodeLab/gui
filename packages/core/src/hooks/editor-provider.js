import { createContext } from 'preact';
import { useContext, useReducer } from 'preact/hooks';

const OPEN_PROJECT = 'OPEN_PROJECT';
const ADD_FILE = 'ADD_FILE';
const OPEN_FILE = 'OPEN_FILE';
const DELETE_FILE = 'DELETE_FILE';
const RENAME_FILE = 'RENAME_FILE';
const CHANGE_CONTENT = 'CHANGE_CONTENT';
const ADD_ASSET = 'ADD_ASSET';
const CONNECT_DEVICE = 'CONNECT_DEVICE';

const initialState = {
  assetList: [],
  fileList: [],
  selectedIndex: -1,
  device: null,
};

export const EditorContext = createContext({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case OPEN_PROJECT:
      return Object.assign({}, initialState, action.payload);
    case ADD_FILE:
      return {
        ...state,
        fileList: state.fileList.concat(action.payload),
        selectedIndex: state.fileList.length,
      };
    case OPEN_FILE:
      return {
        ...state,
        selectedIndex: action.payload,
      };
    case DELETE_FILE:
      return {
        ...state,
        fileList: state.fileList.filter((file, i) => i !== action.payload),
        selectedIndex:
          state.selectedIndex === action.payload && state.selectedIndex === state.fileList.length - 1
            ? state.selectedIndex - 1
            : state.selectedIndex,
      };
    case RENAME_FILE:
      return {
        ...state,
        fileList: state.fileList.map((file, i) => {
          if (i === state.selectedIndex) {
            return {
              ...file,
              name: action.payload,
            };
          }
          return file;
        }),
      };
    case CHANGE_CONTENT:
      return {
        ...state,
        fileList: state.fileList.map((file, i) => {
          if (i === state.selectedIndex) {
            return {
              ...file,
              content: action.payload,
            };
          }
          return file;
        }),
      };
    case ADD_ASSET:
      return {
        ...state,
        assetList: state.assetList.concat(action.payload),
      };
    case CONNECT_DEVICE:
      return {
        ...state,
        device: action.payload,
      };
    default:
      return state;
  }
};

export function useEdit() {
  const { state, dispatch } = useContext(EditorContext);

  return {
    ...state,

    openProject(project) {
      dispatch({ type: OPEN_PROJECT, payload: project });
    },

    addFile(newFile) {
      if (state.fileList.find((file) => file.name === newFile.name)) {
        throw Error('File already exists');
      }
      dispatch({ type: ADD_FILE, payload: newFile });
    },

    openFile(index) {
      if (index < 0 || index > state.fileList.length - 1) {
        throw Error('File does not exist');
      }
      dispatch({ type: OPEN_FILE, payload: index });
    },

    deleteFile(index) {
      if (index < 0 || index > state.fileList.length - 1) {
        throw Error('File does not exist');
      }
      dispatch({ type: DELETE_FILE, payload: index });
    },

    renameFile(name) {
      if (state.fileList.find((file) => file.name === name)) {
        throw Error('File already exists');
      }
      dispatch({ type: RENAME_FILE, payload: name });
    },

    changeContent(content) {
      dispatch({ type: CHANGE_CONTENT, payload: content });
    },

    addAsset(asset) {
      dispatch({ type: ADD_ASSET, payload: asset });
    },

    connectDevice(device) {
      dispatch({ type: CONNECT_DEVICE, payload: device });
    },
  };
}

export function EditorProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <EditorContext.Provider value={{ state, dispatch }}>{children}</EditorContext.Provider>;
}
