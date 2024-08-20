import { Post } from '../types';

export const setSelectedPost = (post: Post) => ({
  type: 'SET_SELECTED_POST',
  payload: post,
});
