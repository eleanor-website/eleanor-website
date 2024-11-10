'use client';
import React, { createContext, useState } from "react";

// Create the Context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [isLoged, setIsLoged] = useState(() => false);
  const [userId, setUserId] = useState(() => null);
  const [viewUplImg, setViewUplImg] = useState(false);
  const [viewUpCat, setViewUpCat] = useState(false);
  const [items, setItems] = useState(null);
  const [itemLoader, setItemLoader] = useState(false)
  const [REF, setREF] = useState(null)
  //////////////////
  const [selectedItem, setSelectedItem] = useState(null);
  const [SelectedTop, setSelectedTop] = useState(null);
  const [SelectedBottom, setSelectedBottom] = useState(null);
  const [viewBoth, setviewBoth] = useState(false);

  const [Resfetch, setResfetch] = useState(false);

  const [ViewLeft, setViewLeft] = useState(false);
  const [ViewRht, setViewRht] = useState(false);

  const [ViewDetailesBar, setViewDetailesBar] = useState(false);
  const [ViewUsedBar, setViewUsedBar] = useState(false);

  const [NOtifItems, setNOtifItems] = useState(null);


  const [ViewNotfi, setViewNotfi] = useState(false);

  ///////////notification
  const [VeiwHandleNot, setVeiwHandleNot] = useState(false);
  const [CatNamForviewNotfi, setCatNamForviewNotfi] = useState(null)
  const [CatNamItems, setCatItems] = useState(null);

  const [reCalNotif, setreCalNotif] = useState(false);

  
  ///////////lang
  const [Lang, setLang] = useState('en');
  const [dataText, setDataText] = useState(null);


  return (
    <UserContext.Provider value={
      { isLoged, setIsLoged, userId, setUserId, viewUplImg, setViewUplImg, viewUpCat, setViewUpCat, items, setItems, itemLoader, setItemLoader, REF, setREF, SelectedTop, setSelectedTop, SelectedBottom, setSelectedBottom, selectedItem, setSelectedItem, viewBoth, setviewBoth, Resfetch, setResfetch, ViewLeft, setViewLeft, ViewRht, setViewRht, ViewUsedBar, setViewUsedBar, ViewDetailesBar, setViewDetailesBar, NOtifItems, setNOtifItems, ViewNotfi, setViewNotfi, CatNamForviewNotfi, setCatNamForviewNotfi, CatNamItems, setCatItems,VeiwHandleNot, setVeiwHandleNot,reCalNotif, setreCalNotif,Lang, setLang,dataText, setDataText }}>
      {children}
    </UserContext.Provider>
  );
};
