'use client'

import { IPostData } from "@/interfaces/MainInterface";
import { useMainStore } from "@/store/mainStore";

const index = (props: {post: IPostData}) => {
    const { post } = props;
    const { favorites, addPostToFavorites, removePostFromFavorites } = useMainStore();
    const isFavorite = favorites.some((favorite) => favorite.id === post.id);

  return (
    <>
        {isFavorite ? (
                <button onClick={(e) => {
                        e.stopPropagation();
                        removePostFromFavorites(post.id);
                    }} 
                    className='p-2 rounded-md bg-red-300 transition-shadow text-white hover:shadow-md'>
                    Remove form favorites
                </button>
            ) : (
                <button onClick={(e) => {
                        e.stopPropagation();
                        addPostToFavorites(post);
                    }} 
                    className='p-2 rounded-md bg-green-300 text-white transition-shadow hover:shadow-md'>
                    Add to favorites
                </button>
            )
        }
    </>
  )
}

export default index