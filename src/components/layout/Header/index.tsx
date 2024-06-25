'use client'

import { useRouter } from "next/navigation";

const Index = () => {
  const { push } = useRouter();
  
  return (
    <div className='flex items-center justify-between w-full min-h-16 bg-slate-500 px-3'>
      <h1 onClick={() => push('/posts')} className='m-0 p-0 text-lg text-white cursor-pointer'>BandaPixels</h1>
      <nav className='flex items-center'>
        <ul className='flex items-center gap-6'>
          <li className='text-white cursor-pointer'>SomeLink</li>
          <li className='text-white cursor-pointer'>SomeLink</li>
          <li className='text-white cursor-pointer'>SomeLink</li>
        </ul>
      </nav>
    </div>
  )
}

export default Index