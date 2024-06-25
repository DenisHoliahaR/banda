export type IPostsData = IPostData[]

export interface IPostData {
  userId: number
  id: number
  title: string
  body: string
}

export type ICommentsData = ICommentData[]

export interface ICommentData {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export type UsersData = IUserData[]

export interface IUserData {
  name: string;
  color: string;
  id: number;
}