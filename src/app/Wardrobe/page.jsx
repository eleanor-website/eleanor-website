'use client';
import React, { useContext } from 'react'
import { UserContext } from '../Components/UserContext';
import Link from 'next/link';
import LeftBar from '../Components/LeftBar';
import AddCategory from '../Components/AddCategory';
import RightBar from '../Components/RightBar';
import ImageUpload from '../Components/ImageUpload';
import ViewBar from '../Components/ViewBar';
import DetailsBar from '../Components/DetailsBar';
import UsedBar from '../Components/UsedBar';
import FlipCard from '../Components/FlipCard';

const page = () => {
    const { isLoged, userId, viewUpCat, viewUplImg, ViewDetailesBar, setViewDetailesBar, ViewUsedBar, setViewUsedBar,Lang } = useContext(UserContext);

    
    return (
        !isLoged ?
            <div className="w-full h-[calc(100%-80px)] flex items-center justify-center">
                <Link href={'/Log'} className='text-md font-medium bg-my_dark text-my_light px-4 py-3 rounded-md'>{Lang ==='en'?'Login to start':'نسجيل الدخول للبدا'}</Link>
            </div>
            :

            <div className='w-full h-[calc(100vh-80px)] relative font-Frank flex pt-4 overflow-hidden'>
                <LeftBar />
                {
                    ViewDetailesBar || ViewUsedBar ?
                        ViewDetailesBar ?
                            <DetailsBar />
                            :
                            <UsedBar />
                        :
                        <ViewBar />
                }
                <RightBar />
                {
                    viewUpCat ?
                        <AddCategory />
                        :
                        ''
                }
                {
                    viewUplImg ?
                        <ImageUpload /> : ''
                }
            </div>

    )
}

export default page