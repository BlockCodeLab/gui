import localForage from 'localforage';
import { createContext } from 'preact';
import { useContext, useReducer } from 'preact/hooks';

const CLOSE_PROJECT = 'CLOSE_PROJECT';
const OPEN_PROJECT = 'OPEN_PROJECT';
const SET_PROJECT_NAME = 'SET_PROJECT_NAME';
const SET_PROJECT_THUMB = 'SET_PROJECT_THUMB';
const ADD_FILE = 'ADD_FILE';
const OPEN_FILE = 'OPEN_FILE';
const DELETE_FILE = 'DELETE_FILE';
const RENAME_FILE = 'RENAME_FILE';
const MODIFY_FILE = 'MODIFY_FILE';
const ADD_ASSET = 'ADD_ASSET';
const DELETE_ASSET = 'DELETE_ASSET';
const MODIFY_ASSET = 'MODIFY_ASSET';
const CONNECT_DEVICE = 'CONNECT_DEVICE';
const CONFIG_EDITOR = 'CONFIG_EDITOR';
const SAVE_KEY = 'SAVE_KEY';

localForage.config({
  name: 'blockcode-store',
});

const initialState = {
  key: null,
  thumb: '',
  name: '',
  editor: null,
  assetList: [],
  fileList: [],
  selectedIndex: -1,
  device: null,
  modified: false,
};

export const EditorContext = createContext({
  state: Object.assign({}, initialState),
  dispatch: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case CLOSE_PROJECT:
      return Object.assign({}, initialState);
    case OPEN_PROJECT:
      return Object.assign({}, initialState, action.payload);
    case SET_PROJECT_NAME:
      return {
        ...state,
        name: action.payload,
        modified: true,
      };
    case SET_PROJECT_THUMB:
      return {
        ...state,
        thumb: action.payload,
        modified: true,
      };
    case ADD_FILE:
      return {
        ...state,
        fileList: state.fileList.concat(action.payload),
        selectedIndex: state.fileList.length,
        modified: true,
      };
    case OPEN_FILE:
      return {
        ...state,
        selectedIndex: action.payload,
      };
    case DELETE_FILE:
      return {
        ...state,
        fileList: state.fileList.filter((_, i) => i !== action.payload),
        selectedIndex: action.payload === state.fileList.length - 1 ? action.payload - 1 : action.payload,
        modified: true,
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
        modified: true,
      };
    case MODIFY_FILE:
      return {
        ...state,
        fileList: state.fileList.map((file, i) => {
          if (action.payload.id ? file.id === action.payload.id : i === state.selectedIndex) {
            return {
              ...file,
              ...action.payload,
            };
          }
          return file;
        }),
        modified: true,
      };
    case ADD_ASSET:
      return {
        ...state,
        assetList: state.assetList.concat(action.payload),
        modified: true,
      };
    case DELETE_ASSET:
      return {
        ...state,
        assetList: state.assetList.filter((asset) => !action.payload.includes(asset.id)),
        modified: true,
      };
    case MODIFY_ASSET:
      return {
        ...state,
        assetList: state.assetList.map((asset, i) => {
          if (asset.id === action.payload.id) {
            return {
              ...asset,
              ...action.payload,
            };
          }
          return asset;
        }),
        modified: true,
      };
    case CONNECT_DEVICE:
      return {
        ...state,
        device: action.payload,
      };
    case CONFIG_EDITOR:
      return {
        ...state,
        editor: Object.assign(state.editor || {}, action.payload),
        modified: true,
      };
    case SAVE_KEY:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export function useEditor() {
  const { state, dispatch } = useContext(EditorContext);

  return {
    ...state,

    closeProject() {
      dispatch({ type: CLOSE_PROJECT });
    },

    async openProject(project) {
      if (typeof project === 'stirng') {
        project = await localForage.getItem(key);
      }
      if (project) {
        dispatch({ type: OPEN_PROJECT, payload: project });
      } else {
        throw new Error(`${key} does not exist.`);
      }
    },

    setProjectName(name) {
      dispatch({ type: SET_PROJECT_NAME, payload: name });
    },

    addFile(newFile) {
      if (state.fileList.find((file) => file.id === newFile.id)) {
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

    modifyFile(content) {
      dispatch({ type: MODIFY_FILE, payload: content });
    },

    addAsset(newAsset) {
      if (state.assetList.find((asset) => asset.id === newAsset.id)) {
        throw Error('Asset already exists');
      }
      dispatch({ type: ADD_ASSET, payload: newAsset });
    },

    deleteAsset(...assetIds) {
      if (Array.isArray(assetIds[0])) {
        assetIds = assetIds[0];
      }
      dispatch({ type: DELETE_ASSET, payload: assetIds });
    },

    modifyAsset(data) {
      dispatch({ type: MODIFY_ASSET, payload: data });
    },

    connectDevice(device) {
      dispatch({ type: CONNECT_DEVICE, payload: device });
    },

    setEditor(config) {
      dispatch({ type: CONFIG_EDITOR, payload: config });
    },

    setThumb(thumb) {
      dispatch({ type: SET_PROJECT_THUMB, payload: thumb });
    },

    async saveNow() {
      const modifiedDate = Date.now();
      let key = state.key || modifiedDate.toString(36);
      const { name, thumb, editor, assetList, fileList, selectedIndex } = state;
      const result = await localForage.setItem(key, {
        key,
        name,
        thumb,
        editor,
        assetList,
        fileList,
        selectedIndex,
        modifiedDate,
      });
      dispatch({ type: SAVE_KEY, payload: { key, modified: false } });
      return result;
    },

    async listProjects() {
      const result = [];
      await localForage.iterate((value, key) => {
        result.push({
          key,
          name: value.name,
          image: value.thumb,
          modifiedDate: value.modifiedDate,
        });
      });
      return result;
    },

    getProject(key) {
      return localForage.getItem(key);
    },

    async renameProject(key, name) {
      const project = await localForage.getItem(key);
      project.name = name;
      await localForage.setItem(project.key, project);
    },

    async duplicateProject(key) {
      const project = await localForage.getItem(key);
      project.modifiedDate = Date.now();
      project.key = project.modifiedDate.toString(36);
      await localForage.setItem(project.key, project);
    },

    async deleteProject(key) {
      await localForage.removeItem(key);
    },
  };
}

export function EditorProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <EditorContext.Provider value={{ state, dispatch }}>{children}</EditorContext.Provider>;
}
