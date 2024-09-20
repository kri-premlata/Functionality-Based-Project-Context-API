import axios from "./axios";
import React, { createContext, useEffect } from "react";
import { useState } from "react";

//---------centralising the data by context()--------------
export const ProductContext = createContext();

const Context = (props) => {
  //--------storing data by using useState & saving data in localstorage-------------
  const [products, setproducts] = useState(
    JSON.parse(localStorage.getItem("products")) || null
  );

  //   putting axios here   , From this axios part we are getting data from API
  // COMMENTING THESE PART , NOW WE DON'T WANT DATA FROM API , We will create our own data.
  // const getproducts = async () => {
  //   try {
  //     const { data } = await axios("/products");
  //     // console.log(data); //printing data on console
  //     setproducts(data); //Saving productData by "setProduct"
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(products);
  // //------calling getProducts by using useEffect(),means react is calling getProducts for us-----
  // useEffect(() => {
  //   getproducts();
  // }, []);

  // console.log(products);

  {
    /* --------below in return, getting the data with help of props & centerlising the data with the help of ProductContext.Provider-----------  */
  }
  return (
    <ProductContext.Provider value={[products, setproducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
