'use client';
import React, { useContext, useState } from 'react'
import { UserContext } from './UserContext';
import Image from 'next/image';
import { addCategory } from '../db/main';
import LoadingSpinner from './LoadingSpinner';

const AddCategory = () => {
    const { userId, viewUpCat, setViewUpCat,dataText ,Lang } = useContext(UserContext);
    const [catNamIN, setCatNamIN] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [Error, setError] = useState('')
    const [Loader, setLoader] = useState(false)
    const handleChange = (e) => {
        setCatNamIN(e.target.value);
    }
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const handleAddCategory = async () => {
        try {
            setLoader(true)
            const response = await addCategory(userId, catNamIN,selectedOption);
            if (response.success) {
                setError( Lang ==='en'?'Category added successfully!':'تم الاضافه بنجاح'); // Display success message
                // Optionally, clear the input field or update state
                setCatNamIN('');
                setSelectedOption('');
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError(Lang ==='en'?'Error adding category':'لم يتم الاضافه بنجاح');
        } finally {
            setLoader(false);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!catNamIN) {
            setError(Lang ==='en'? 'Category name is required':'اسم الفئه مطلوب');
        }  else if (!selectedOption) {
            setError( Lang ==='en'?'Please select an option' :'اختر نوع الفئه');
        } else {
            handleAddCategory();
        }
    };

    


  if (!dataText) {
    return <div >
      <LoadingSpinner />
    </div>;
  }


    return (
        <div dir={ Lang === 'en'? 'ltr' :'rtl'}  className={`${viewUpCat ? 'flex' : 'hidden'} w-full h-full absolute top-0 left-0 items-center justify-center glass z-50`}>
            <div className=" bg-my_dark w-fit max-w-[90%] p-5 rounded-xl flex flex-col items-center justify-center gap-4 text-my_light relative">
                <Image src={'/svgs/close-white.svg'} alt='close' width={25} height={25} className='cursor-pointer z-30  absolute right-3 top-3 ' onClick={() => setViewUpCat(false)} />
                <div className="flex  flex-col items-start justify-center gap-2 mt-5">
                    <label htmlFor="catName" className='font-bold'>{dataText.CatName}  </label>
                    <input onChange={handleChange} value={catNamIN} type="text" name='catName' className='bg-transparent border-2 border-my_light px-2 py-1 focus:outline-none outline-none  rounded-md ' />
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label className="font-bold">{dataText.SelOp}  </label>
                    <div className="flex gap-4">
                        <label>
                            <input type="radio" value="top" checked={selectedOption === 'top'} onChange={handleOptionChange} />
                            {dataText.Top}  
                        </label>
                        <label>
                            <input type="radio" value="bottom" checked={selectedOption === 'bottom'} onChange={handleOptionChange} />
                            {dataText.Bottom}  
                        </label>
                        <label>
                            <input type="radio" value="both" checked={selectedOption === 'both'} onChange={handleOptionChange} />
                            {dataText.Both}  
                        </label>
                    </div>
                </div>
                {
                    Loader ?
                        <div className="bg-my_light relative h-[40px] w-[100px] rounded-md ">
                            <LoadingSpinner />
                        </div>
                        :
                        <>
                            {Error}
                            <button onClick={handleSubmit} className="bg-my_light w-fit text-my_dark font-bold px-8 py-1 rounded-md uppercase">{dataText.addBtn}  </button>
                        </>
                }
            </div>
        </div>
    )
}

export default AddCategory