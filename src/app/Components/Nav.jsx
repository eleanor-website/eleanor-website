"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import Image from "next/image";
import { deleteItemNotiction, GetNotification, getUserData, reusedNotItem } from "../db/main";
import LoadingSpinner from "./LoadingSpinner";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Nav = () => {
  const { isLoged, setIsLoged, setUserId, userId, ViewNotfi, setViewNotfi, setVeiwHandleNot, CatNamForviewNotfi, setCatNamForviewNotfi, setCatItems, NOtifItems, setNOtifItems, reCalNotif, setreCalNotif, setViewRht, setItems, setREF, setSelectedItem, setSelectedBottom, setSelectedTop, Lang, setLang, dataText, setDataText } = useContext(UserContext);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/lang/${Lang}.json`);
        const result = await response.json();
        setDataText(result);
      } catch (error) {
      }
    };

    fetchData();
  }, [Lang]);





  const [navigation, setNavigation] = useState([
    { name: "home", href: "/", current: true },
  ]);

  useEffect(() => {
    setNavigation([
      { name: "Home", href: "/", current: true },
      ...(isLoged ? [{ name: "Wardrobe", href: "/Wardrobe", current: false }] : []),
    ]);
  }, [isLoged]); // Update navigation items based on isLoged

  const [view, setview] = useState(false);

  const handleClick = () => {

    setview(false);
    setViewNotfi(false);
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    setIsLoged(false);
    setUserId(null);
    setview(false);
    setItems(null);
    setREF(null)
    setSelectedItem(null);
    setSelectedTop(null);
    setSelectedBottom(null);
    setNOtifItems(null)
    setViewNotfi(false)
    setVeiwHandleNot(false)
    setCatNamForviewNotfi(null)
    setCatItems(null)
    setreCalNotif(false)

  };

  const handleView = () => { setview((prev) => !prev); setViewNotfi(false) }

  const [username, setUsername] = useState("");
  const handleGetUserData = async (id) => {
    if (id !== null) {
      try {
        const response = await getUserData(id);
        if (response.success) {
          setUsername(response.data.name);
        }
      } catch (error) {
        setUsername("unKnown");
      }
    }
  }


  useEffect(() => {
    handleGetUserData(userId);
  }, [userId]);

  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////


  const handleGetNotification = async () => {
    try {
      const response = await GetNotification(userId);
      if (response.success) {
        if (response.data.items !== null && isLoged) {
          const Allitems = response.data.items;
          const currentDate = new Date();
          const itemsEx = {};
          Allitems.forEach((itemGroup) => {
            const { name, type, urls } = itemGroup;
            const expiredItems = urls.filter((urlItem) => {
              const itemsDate = new Date(urlItem.dateAdded);
              const diffInTime = currentDate - itemsDate;
              // const daysAgo = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
              // return daysAgo >= 0; // days ex
              const minutesAgo = Math.ceil(diffInTime / (1000 * 60));
              return minutesAgo >= 5; // more than 5 minutes ago
            });
            if (expiredItems.length > 0) {
              if (!itemsEx[name]) {
                itemsEx[name] = { type, urls: [] };
              }
              itemsEx[name].urls.push(...expiredItems);
            }
            if (itemsEx.length !== 0 && itemsEx !== '') {

              setNOtifItems(itemsEx);
            }
          });
        }
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    if (userId !== null && isLoged) {
      handleGetNotification();
    }

  }, [userId, reCalNotif]);



  const HadleDeletNotItem = async (Catname, item) => {
    try {
      const response = await deleteItemNotiction(userId, Catname, item);
      if (response.success) {
        setreCalNotif(!reCalNotif);
      }
    } catch (error) {
    }
  }

  const handleReUse = async (catName, item) => {
    try {
      const response = await reusedNotItem(userId, catName, item);
      if (response.success) {
        setreCalNotif(!reCalNotif);
      }
    } catch (error) {
    }
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////
  const handleLang = () => {
    setLang(Lang === 'en' ? 'ar' : 'en');
  }


  if (!dataText) {
    return <div >
      <LoadingSpinner />
    </div>;
  }



  return (
    <Disclosure as="nav" dir={Lang === 'en' ? 'ltr' : 'rtl'} className="sticky top-0 z-50 bg-my_light text-my_red pt-4">
      <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">

        <div className="relative flex h-16 items-center justify-between">

          <div className={`absolute inset-y-0 ${Lang === 'en' ? 'right-0 ' : 'left-0'} flex items-center sm:hidden gap-2 `}>
            {isLoged && (
              <>
                <div className="relative">
                  <Image
                    src="/svgs/notification.svg"
                    alt="notf"
                    width={35}
                    height={35}
                    className="cursor-pointer sm:hidden block z-20 "
                    onClick={() => { setViewNotfi(!ViewNotfi); setview(false) }}
                  />
                  {
                    NOtifItems && Object.keys(NOtifItems).length > 0 ?
                      <span class="flex h-2 w-2 absolute bottom-1 right-0">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-my_dark opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-my_dark"></span>
                      </span>
                      :
                      ''
                  } 


                </div>

                <div className="relative">
                  <Image
                    onClick={handleView}
                    src="/svgs/account.svg"
                    alt="Logout"
                    width={30}
                    height={30}
                    className="cursor-pointer sm:hidden block z-20 "
                  />
                  <div className={`${view ? 'flex' : 'hidden'} my_transition shadow-xl uppercase absolute -left-[100%] top-[calc(100%+20px)] w-fit  min-w-[120px] bg-my_dark  flex-col gap-2 items-center justify-center rounded-xl`}>
                    <div className="px-4 py-2 text-my_light font-bold">{dataText.hi} {username} ! </div>   
                    <div className="px-0 py-2 text-my_light font-bold" onClick={handleLogOut}>{dataText.logout}</div>
                  </div>
                </div>

              </>

            )}
            <DisclosureButton
              className="group relative inline-flex items-center justify-center p-2 text-my_red focus:outline-none"
              aria-label="Open main menu"
            >
              <Bars3Icon aria-hidden="true" className="block h-8 w-8 group-data-[open]:hidden" />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-8 w-8 group-data-[open]:block border-2 border-my_dark text-my_red"
              />
            </DisclosureButton>
          </div>


          <div className="flex items-center justify-between px-1 sm:px-0 w-full ">
            <div className="flex items-center justify-center">

              <div className=" bg-my_dark w-fit h-fit text-my_light flex items-center justify-center mx-2 rounded-md">
                <div className="py-1 px-2 uppercase text-xs sm:text-xl flex items-center justify-center gap-2 cursor-pointer" onClick={handleLang}>{Lang}
                  <Image src={'/svgs/translate.svg'} width={20} height={20} alt="tran" />
                </div>
              </div>
              <h1 className="text-xl font-bold text-my_red uppercase md:text-4xl">
                {dataText.logo}
              </h1>
            </div>
            <div className="hidden sm:block">
              <div className="flex space-x-4">



                {
                  isLoged ?
                    <>
                      <Link
                        href={'/'}
                        className={" block px-3 py-2 text-2xl font-bold text-my_red"}
                        onClick={handleClick}
                      >
                        {dataText.home}
                      </Link>

                      <Link
                        href={'/Wardrobe'}
                        className={" block px-3 py-2 text-2xl font-bold text-my_red"}
                        onClick={handleClick}

                      >
                        {dataText.Wardrobe}
                      </Link>

                    </>
                    : ''
                }


                {isLoged ? (
                  <>
                    <div className="relative flex items-center justify-center">
                      <Image
                        src="/svgs/notification.svg"
                        alt="notf"
                        width={35}
                        height={35}
                        className="cursor-pointer"
                        onClick={() => { setViewNotfi(!ViewNotfi); setview(false) }}

                      />

                      {
                        NOtifItems && Object.keys(NOtifItems).length > 0 ?
                          <span class="flex h-2 w-2 absolute bottom-2 right-0">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-my_dark opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-my_dark"></span>
                          </span>
                          :
                          ''
                      }

                    </div>
                    <div className="relative flex items-center justify-center">
                      <Image
                        src="/svgs/account.svg"
                        onClick={handleView}
                        alt="Logout"
                        width={30}
                        height={30}
                        className="cursor-pointer"
                      />
                      <div className={`${view ? 'flex' : 'hidden'} my_transition shadow-xl absolute ${Lang === 'en' ? 'right-full' : 'left-full'}  top-[calc(100%+10px)] w-fit  min-w-[120px] bg-my_dark flex-col gap-2 items-center justify-center rounded-xl`}>
                        <div className="px-4 py-2 text-my_light font-bold uppercase cursor-pointer">{dataText.hi} {username} ! </div>
                        <div className="px-0 py-2 text-my_light font-bold uppercase cursor-pointer" onClick={handleLogOut}>{dataText.logout}</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href="/Log"
                    className="flex items-center justify-center px-6 py-2 text-2xl font-medium text-my_red border border-my_red uppercase"
                  >
                    {dataText.login}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden absolute w-full bg-myBlack bg-my_light">
        <div className="px-2 pb-3 pt-2 text-center bg-my_light my_transition shadow-2xl">

          {
            isLoged ?
              <>
                <Link
                  href={'/'}
                  className={"block px-3 py-2 text-md font-bold text-my_red"}
                  onClick={handleClick}

                >
                  {dataText.home}
                </Link>

                <Link
                  href={'/Wardrobe'}
                  className={"block px-3 py-2 text-md font-bold text-my_red"}
                  onClick={handleClick}

                >
                  {dataText.Wardrobe}
                </Link>

              </>
              : ''
          }



          {!isLoged && (
            <Link
              href="/Log"
              className="flex items-center justify-center px-4 mx-auto my-3 text-md font-medium text-my_red border border-my_red uppercase w-fit"
            >
              Login
            </Link>
          )}
        </div>
      </DisclosurePanel>


      <div
        className={`shadow-2xl border-y border-l border-my_light absolute top-full right-0 flex flex-col gap-2 items-start bg-my_dark min-w-[200px] min-h-[200px] max-h-[80vh] max-w-[90%] z-20 rounded-bl-xl pt-5 p-3 ${ViewNotfi ? 'translate-x-0' : 'translate-x-full'
          } my_transition overflow-x-auto no_scrollbar`}
      >
        {NOtifItems && Object.keys(NOtifItems).length > 0 ? (
          Object.entries(NOtifItems).map(([key, items], index) => (
            <div key={index} className=" w-full text-my_light flex flex-col items-center py-5 ">
              <h2 className=" text-sm self-center uppercase ">{key}</h2>
              <div className="flex flex-col items-center">

                {Array.isArray(items.urls) && items.urls.length > 0 ? (
                  items.urls.map((item, itemIndex) => (
                    <div key={itemIndex} className="w-[150px] h-[250px] mx-auto shadow-2xl flex flex-col items-center gap-5 mt-10 px-2">
                      <div className="h-[60%] w-full">
                        <img src={item.url} alt="notification item" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex flex-col items-center  w-full gap-2">

                        <div
                          className="bg-my_light w-full  text-center  rounded-sm text-my_dark uppercase text-md cursor-pointer"
                          onClick={() => HadleDeletNotItem(key, item)}
                        >
                          {dataText.Donate}
                        </div>
                        <div
                          className="bg-my_light  w-full  text-center rounded-sm text-my_dark uppercase text-md cursor-pointer"
                          onClick={() => handleReUse(key, item)}
                        >
                          {dataText.ReuseIt}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full text-center text-my_light text-md">{dataText.NoVw}</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <h2 className="text-my_light text-md">{dataText.NoVw}</h2>
          </div>
        )}
      </div>






    </Disclosure>
  );
};

export default Nav;
