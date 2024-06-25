import Favorites from "@/components/shared/Favorites";
import { ICommentData, ICommentsData, IPostData } from "@/interfaces/MainInterface";

interface PostPageProps {
	params: {
	  postSlug: string;
	};
  }

async function fetchPostData(postSlug: string) {
	try {
		const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postSlug}`);
		if (!res.ok) {
		  	throw new Error('Failed to fetch');
		}
		const post: IPostData = await res.json();
		return post;
	} catch (error) {
		console.error('Error fetching post:', error);
	}
}

async function fetchCommentsData(postSlug: string) {
	try {
		const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postSlug}/comments`);
		if (!res.ok) {
		  	throw new Error('Failed to fetch');
		}
		const comments: ICommentData[] = await res.json();
		return comments;
	} catch (error) {
		console.error('Error fetching post:', error);
	}
}

export default async function Page({ params }: PostPageProps) {
	const data = await fetchPostData(params.postSlug);
	const dataComments = await fetchCommentsData(params.postSlug);
	
	return (
        <div className='flex flex-col gap-6 p-4 items-center justify-start'>
			<div className="">
            	<h1 className='text-wrap text-center font-bold text-2xl'>{data?.title}</h1>
			</div>
			<div className="w-full flex flex-col gap-4 items-start justify-start">
				<p className='text-wrap text-start'>{data?.body}</p>
				<div className='w-full flex flex-row p-2 items-center justify-between'>
					<div className="flex flex-row gap-8">
						<div className="flex flex-row items-center gap-4">
							<p>Post id:</p>
							<p className="font-bold">{data?.id}</p>
						</div>
						<div className="flex flex-row items-center gap-4">
							<p>User id:</p>
							<p className='font-bold'>{data?.userId}</p>
						</div>
					</div>
					<Favorites post={data!} />
				</div>
			</div>
			<div className="w-full flex flex-col gap-6 p-4 items-start justify-start">
				<div className="w-full flex flex-row items-center justify-start"><h2 className=" text-2xl font-bold">Commnets</h2></div>
				{dataComments?.map((elem) => (
					<div className='bg-orange-50 rounded-md p-3 flex flex-col gap-4 max-w-2xl' key={elem.id}>
						<div className='flex flex-row gap-3 items-center'>
							<h3 className='font-bold text-lg'>{elem.name}</h3>
							<p>{elem.email}</p>
						</div>
						<p>{elem.body}</p>
					</div>
					))}
            </div>
        </div>
    )
}