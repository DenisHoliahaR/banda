'use client'

import Card from "@/components/shared/Card";
import { IPostData, IPostsData } from "@/interfaces/MainInterface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [posts, setPosts] = useState<IPostsData>();
    const { push } = useRouter();

    const cardHandler = (id: number) => {
        push(`/posts/${id}`);
    }

    useEffect(() => {
        if (posts) return;
        const getPosts = async () => {
            const responce = await fetch('https://jsonplaceholder.typicode.com/posts');

            if (!responce.ok) {
                console.log('something went wrong, error:', responce.text)
            }

            const data = await responce.json();
            setPosts(data);
        }

        getPosts();
    }, [])

    return (
        <div className='flex items-center gap-10 flex-wrap justify-center p-8'>
            {posts?.map((elem: IPostData) => (
                <Card elem={elem} key={elem.id} />
            ))}
        </div>
    )
}

