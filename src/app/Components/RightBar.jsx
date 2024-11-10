'use client';
import React, { Suspense, useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext';
import Image from 'next/image';
import LoadingSpinner from './LoadingSpinner';


const RightBar = () => {
    const { items, itemLoader, setViewUplImg, REF, setSelectedItem, viewBoth, setviewBoth, ViewRht, setViewRht, ViewDetailesBar, setViewDetailesBar, ViewUsedBar, setViewUsedBar, dataText, Lang } = useContext(UserContext);
    const HandleSelectedItem = (url, type, itemIndex, catIndex) => {
        setSelectedItem({
            url: url,
            type: type,
            itemIndex: itemIndex,
            catIndex: catIndex,
        });
    };

    const HandleViewAdd = () => {
        if (REF !== null) {
            setViewUplImg(true);
        }
    }
    useEffect(() => {
        if (items !== null && items.type === 'both') {

            setviewBoth(true);
        } else {
            setviewBoth(false);
        }
    }, [items])




    if (!dataText) {
        return <div >
            <LoadingSpinner />
        </div>;
    }



    return (
        <div
            dir={Lang === 'en' ? 'ltr' : 'rtl'}

            className={` ${ViewUsedBar || ViewDetailesBar ? 'hidden' : 'flex'} my_transition w-[100px] sm:w-[200px] lg:w-[250px] h-full lg:static absolute  ${ViewRht ? 'right-0' : '-right-full'} top-80px  flex-col bg-my_red z-40 rounded-tl-3xl md:p-5 py-2`}
        >
            <Image
                src='/svgs/close-white.svg'
                alt='close'
                width={25}
                height={25}
                className='cursor-pointer z-30 absolute left-3 top-3 lg:hidden'
                onClick={() => setViewRht(false)}
            />
            <h2 className="text-sm lg:text-xl text-my_light text-center py-3 mt-8 sm:mt-0 uppercase font-semibold">{dataText.Items}</h2>


            <div
                className="py-2 cursor-pointer flex items-center justify-center gap-2 text-my_red bg-my_light uppercase mx-2 "
                onClick={HandleViewAdd}
            >
                <Image src='/svgs/add.svg' alt='Add item' width={15} height={15} />
                <span className='text-[10px]'>{dataText.AddItems}</span>
            </div>


            <div className='flex flex-col gap-2 items-start h-full w-full overflow-auto no_scrollbar list-none cursor-pointer py-5 md:my-5 my-8 border-y border-my_light'>
                {itemLoader ? (
                    <div className=" lg:w-[150px] lg:h-[150px] md:w-[100px] md:h-[100px] w-[80px] h-[80px] mx-auto bg-my_light flex items-center justify-center relative rounded-xl">
                        <LoadingSpinner />
                    </div>
                ) : (
                    items && items.urls && items.urls.length > 0 ? (
                        items.urls.map((item, index) => (
                            <span
                                key={index}
                                className='relative mx-auto bg-my_light lg:w-[150px] lg:h-[150px] md:w-[100px] md:h-[100px] w-[80px] h-[80px] cursor-pointer rounded-xl'
                            >
                                <Suspense fallback={<LoadingSpinner />}>
                                    <img
                                        src={item.url}
                                        alt={`User Image ${index + 1}`}
                                        className="object-contain w-full h-full"
                                        onClick={() => { HandleSelectedItem(item.url, items.type, index, REF) }}
                                    />
                                </Suspense>
                            </span>
                        ))
                    ) : (
                        <h2 className='text-md text-my_light m-auto'>{dataText.Noitems}</h2>
                    )
                )}

            </div>

        </div>
    )
}

export default RightBar