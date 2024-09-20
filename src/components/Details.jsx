import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "../utils/axios";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";

const Details = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const [product, setproduct] = useState(null);
  const { id } = useParams(); //we can get id by params , so we will use params for getting id of the product
  //  console.log(id);

  // commenting it for stop getting data from API
  //Get all by calling API
  // // Now finding single product by using productid
  // const getsingleproduct = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //     setproduct(data);
  //     // console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // calling API by using useEffect()
  // useEffect(() => {
  //   getsingleproduct();
  // }, []);

  useEffect(() => {
    if (!product) {
      setproduct(products.filter((p) => p.id == id)[0]);
    }
  }, []);

  const ProductDeleteHandler = (id) => {
    const filterProducts = products.filter((p) => p.id !== id);
    setproducts(filterProducts);
    localStorage.setItem("products", JSON.stringify(filterProducts));
    navigate("/");
  };

  return product ? (
    <div className="w-[60%] h-full flex justify-between items-center  m-auto p-[10%] ">
      <img
        className="object-contain w-[40%] h-[70%]"
        src={`${product.image}`}
        alt=""
      />
      <div className="content w-[55%] ">
        <h1 className="text-xl font-medium">{product.title}</h1>
        <h3 className="text-zinc-500 mt-1 text-xs">{product.category}</h3>
        <h2 className="text-green-600 mb-3 text-x">$ {product.price}</h2>

        <p className="mb-5 text-xs">{product.description}</p>
        <Link to={`/edit/${product.id}`} className="py-1 px-3 border rounded border-blue-300 text-blue-400">
          Edit
        </Link>
        <button
          onClick={() => ProductDeleteHandler(product.id)}
          className="ml-3 py-1 px-3 border rounded border-red-300 text-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
