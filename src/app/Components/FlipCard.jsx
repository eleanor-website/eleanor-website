'use client'
import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";

const FlipCard = (props) => {
  const {  dataText ,Lang} = useContext(UserContext);

    const [isFlipped, setIsFlipped] = useState(false);
    const date = new Date(props.item.dateAdded);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',

    });

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // Use 12-hour format
    });

    

  if (!dataText) {
    return <div >
      <LoadingSpinner />
    </div>;
  }

    return (
        <div class="flip-card h-[400px] w-[250px]  ">
            <div class={`flip-card-inner ${isFlipped ? 'viewBack' : ''}`}>

                <div class="flip-card-front absolute w-full h-full flex flex-col items-center justify-center rounded-[8px] bg-my_light shadow-2xl p-3 gap-2 mx-auto">
                    <div className=" w-full h-[80%] relative">
                        <img src={props.item.url} alt="image not found" className='object-contain h-full w-full' />
                    </div>
                    <div className="bg-my_dark text-my_light py-2 sm:text-md text-sm rounded-md flex items-center justify-center uppercase w-[80%] cursor-pointer" onClick={() => { setIsFlipped(true) }} >{dataText.viDt}  
                    </div>
                </div>

                <div dir={ Lang === 'en'? 'ltr' :'rtl'} class="flip-card-back absolute w-full h-full flex flex-col items-center justify-center rounded-[8px] bg-my_dark shadow-2xl p-3 gap-2 mx-auto ">

                    <div className="flex flex-col w-full h-[80%] text-my_light gap-4">
                        <div className="flex flex-wrap items-start justify-start gap-2">
                            <span className="uppercase">{dataText.AddDate}   :</span>
                            <span className="pl-4 felx flex-col gap-2"><div className="">{formattedDate}</div> {formattedTime}</span>
                        </div>
                        <div className="flex flex-wrap items-start justify-start gap-2">
                            <span className="uppercase">{dataText.UsTi}   :</span>
                            <span className="pl-4">{props.item.usedTime}</span>
                        </div>
                    </div>
                    <div className="text-my_dark bg-my_light py-2 sm:text-md text-sm font-semibold rounded-md flex items-center justify-center uppercase w-[80%] cursor-pointer" onClick={() => { setIsFlipped(false) }} >{dataText.HiDt}  
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
