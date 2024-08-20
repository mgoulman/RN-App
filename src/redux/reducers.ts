import { AnyAction } from 'redux';
import { Post } from '../types';

interface State {
  selectedPost: Post | null;
}

const initialState: State = {
  selectedPost: null,
};

const rootReducer = (state = initialState, action: AnyAction): State => {
  switch (action.type) {
    case 'SET_SELECTED_POST':
      return {
        ...state,
        selectedPost: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
