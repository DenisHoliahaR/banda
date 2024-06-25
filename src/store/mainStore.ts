import { IPostData, IPostsData, IUserData, UsersData } from '@/interfaces/MainInterface';
import { create } from 'zustand'

export interface IMainState {
    favorites: IPostsData;
    addPostToFavorites: (post: IPostData) => void,
    removePostFromFavorites: (postId: number) => void,
    users: UsersData;
    addUser: (user: IUserData) => void,
  }

  export const useMainStore = create<IMainState>((set) => ({
    favorites: [],
    addPostToFavorites: (post: IPostData) => {
      set((state) => ({
        favorites: [...state.favorites, post],
      }));
    },
    removePostFromFavorites: (postId: number) => {
      set((state) => ({
        favorites: state.favorites.filter((post) => post.id !== postId),
      }));
    },
    users: [],
    addUser: (user: IUserData) => {
      set((state) => ({
        users: [...state.users, user],
      }));
    },
  }));