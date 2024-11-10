'use client';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import Image from 'next/image';
import LoadingSpinner from './LoadingSpinner';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [Loader, setLoader] = useState(false)
  const { userId, viewUplImg, setViewUplImg,items,REF,dataText ,Lang } = useContext(UserContext);
  const api = process.env.NEXT_PUBLIC_API_KEY; // Change this to your backend API when deployed
  
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check file type
    if (selectedFile && !selectedFile.type.startsWith('image/')) {
      setStatusMessage(Lang ==='en'?'Please upload a valid image file.':'اختر صوره');
      return;
    }

    // Check file size (e.g., 5MB limit)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setStatusMessage(Lang ==='en'?'File size must be less than 5MB.':"حجم الملفيجبب ان لا يكون اكر من 5 م ب");
      return;
    }

    setImage(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setStatusMessage(Lang ==='en'?'Please select an image to upload.':"اختر صوره");
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoader(true);
      // Check if userId is available
      if (!userId) {
        setStatusMessage('User ID is not available.');
        return;
      }
      setStatusMessage(Lang ==='en'?'uploading...':"...تحميل");
      const response = await axios.post(`${api}/uploadImage/${userId}/${REF}`, formData);

      setStatusMessage(Lang ==='en'?"Image uploaded successfully":"تم رفع الصوره بنجاح"); // Display success message
      setImage(null); // Reset the image state
    } catch (error) {
      setStatusMessage(error.response?.data.message || Lang ==='en'?'Error uploading image':"لم يتم رفع الصوره");
    } finally {
      setLoader(false);
    }
  };

  

  if (!dataText) {
    return <div >
      <LoadingSpinner />
    </div>;
  }

  return (
    <div className={`${viewUplImg ? 'flex' : 'hidden'} w-full h-full absolute top-0 left-0 items-center justify-center glass z-50`}>
      <div className="image-upload bg-my_dark w-fit max-w-[90%] p-5 rounded-xl flex flex-col items-center justify-center gap-4 text-my_light relative">
        <Image
          src={'/svgs/close-white.svg'}
          alt='close'
          width={25}
          height={25}
          className='cursor-pointer z-30 absolute right-3 top-3'
          onClick={() => setViewUplImg(false)}
        />
        <h2 className="text-xl text-my_light font-bold uppercase mt-4">{dataText.UpImg}  </h2>
        {
          Loader ?
            <div className="bg-my_light relative h-[50px] w-[200px] rounded-md ">
              <LoadingSpinner />
            </div>
            :
            <>
              <form className="flex flex-col gap-4 items-center justify-center" onSubmit={handleSubmit}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="max-w-[250px]"
                />
                <button type="submit" className="bg-my_light w-fit text-my_dark font-bold px-4 py-1 rounded-md">{dataText.Upload}  </button>
              </form>
              {statusMessage && <p>{statusMessage}</p>}
            </>
        }
      </div>
    </div>
  );
};

export default ImageUpload;
