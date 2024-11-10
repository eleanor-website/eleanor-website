import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext';
import Image from 'next/image';
import { fetchAllItems } from '../db/main';
import FlipCard from './FlipCard';

const DetailsBar = () => {
  const { isLoged, userId, setViewLeft ,dataText ,Lang} = useContext(UserContext);
  const [AllItem, setAllItem] = useState(null);
  const HandlefetchAllItems = async () => {
    try {
      const response = await fetchAllItems(userId);
      if (response.success) {
        setAllItem(response.data.items)
        
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    if (isLoged && userId !== null) {
      HandlefetchAllItems()
    }
  }, [])


  
  if (!dataText) {
    return <div >
      <LoadingSpinner />
    </div>;
  }


  return (
    <div className=' w-full  flex flex-col gap-5 p-5 overflow-y-auto items-start justify-start'>
      <div className={`my_transition absolute top-0 left-0 p-2 bg-my_red rounded-r-2xl lg:hidden mt-5`} onClick={() => setViewLeft(true)}>
        <Image src='/svgs/left_errow.svg' alt='arrow-view' width={15} height={15} />
      </div>
      {
        AllItem !== null && AllItem.length !== 0 ?
          AllItem.map((cates) => (
            <>

              <h1 className="text-xl text-my_dark font-bold uppercase">{cates.name}</h1>
              <div className="border-b border-black  w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 p-5 items-start justify-center">
                {
                  cates.urls.length !== 0 ?
                    cates.urls.map((item) => (
                      <FlipCard item={item}/>
                    ))
                    :
                    <h2 className=" text-my_dark font-bold sm:text-xl text-sm mx-auto">{dataText.EmCat} </h2>
                }
              </div>
            </>
          ))
          :
          <h2 className=" text-my_dark font-bold text-xl mx-auto">{dataText.NoVw} </h2>

      }




    </div>
  )
}

export default DetailsBar 