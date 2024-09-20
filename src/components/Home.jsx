import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [products] = useContext(ProductContext); //reading the data of product only here
  // console.log(products);

  //using useLocation for searching category of the product becoz in all products are coming in the productContext.
  const { search } = useLocation();
  //-------converting the address of category & converting the address into string with "decodeURIComponent(), decodeURIComponent() converts the params data into normal string form"
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredProducts, setfilteredProducts] = useState(null);

  const getproductscategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // calling the getproductcategory function with the help of useeffect()
  useEffect(() => {
    if (!filteredProducts || category == "undefined")
      setfilteredProducts(products);
    if (category != "undefined") {
      // getproductscategory()    // removing data from API which means now we are not calling data from API
      setfilteredProducts(products.filter((p)=>p.category == category));     // filtering data from local storage 
    };
  }, [category, products]);

  // console.log(filteredProducts);
  // console.log(category);
  // console.log(search);

  // If product is available then it will return fragment part else it will show Loading
  return products ? (
    <>
      <Nav />
      <div className=" w-[85%]  p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {/* Rendering all productdata on home at a time or showing all products */}
        {filteredProducts &&
          filteredProducts.map((p, i) => (
            <Link
              key={p.id}
              to={`/details/${p.id}`} // by default it is giving product id
              className="card w-[18%] h-[40vh] mr-3 p-3 border shadow rounded flex  flex-col  justify-center items-center"
            >
              <div
                className="w-full h-[80%] hover:scale-110 mb-5 bg-contain bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              ></div>
              <h1 className="hover:text-blue-400">{p.title}</h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
