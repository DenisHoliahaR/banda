'use client'

import { IPostData, IUserData } from '@/interfaces/MainInterface'
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useLayoutEffect, useState } from 'react'
import Favorites from '../Favorites';
import { useMainStore } from '@/store/mainStore';

const Index = (props: { elem: IPostData }) => {
    const { id, title, body, userId } = props.elem;

    const [user, setUser] = useState<IUserData | undefined>()
    const { users, addUser } = useMainStore();
    
    const isUser = users.some((user) => userId === user.id);
    const { push } = useRouter();

    function getRandomRGBAColor(): string {
        const r = Math.floor(Math.random() * 256); 
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const a = Math.random().toFixed(2);
      
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    const getUser = async () => {
        const responce = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

        if (!responce.ok) {
            console.log('something went wrong, error:', responce.text)
        }

        const data = await responce.json();
        const userData = {name: `${data.name.split(' ')[0].split('')[0].toUpperCase() + data.name.split(' ')[1].split('')[0].toUpperCase()}`, color: getRandomRGBAColor(), id: data.id as number};
        addUser(userData);
        setUser(userData);
    }

    useLayoutEffect(() => {
        if (!users.some((user) => user.id === userId)) {
            getUser();
        } else {
            setUser(users.find((user) => user.id === userId))
        }
    }, [])

    
  return (
    <div onClick={() => push(`/posts/${id}`)} className='p-2 bg-slate-300 flex flex-col items-center justify-between max-w-96 min-h-72 max-h-72 rounded-md transition-shadow shadow-md hover:shadow-lg'>
        <h1 className='text-wrap text-center font-bold text-lg'>{title}</h1>
        <div className="overflow-auto" style={{scrollbarWidth: 'none'}}>
            <p className='text-wrap text-center'>{body}</p>
        </div>
        <div className="flex flex-row w-full items-center justify-between">
            <span className='rounded-full h-12 w-12 flex items-center justify-center' style={{backgroundColor: user?.color ? user.color : 'red'}}>
                {user?.name ? <p>{user.name}</p> : <p>?</p>}
            </span>
            <Favorites post={props.elem} />
        </div>
    </div>
  )
}

export default Index;