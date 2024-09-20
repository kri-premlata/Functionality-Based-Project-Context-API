import React, { useContext } from "react";
import { useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");

  const addProductHandler = (e) => {
    e.preventDefault(); //preventDefault will stop for refreshing page again & again

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert("Please fill all the fields");
      return;
    }

    const product = {
      id: nanoid(), //need to import & then write it , then automatically id will come with new product.
      title,
      image,
      category,
      price,
      description,
    };
    setproducts([...products, product]); // ...products means old product should be there as it is & products means new products would be add or set there
    // console.log(product);
    localStorage.setItem("products", JSON.stringify([...products, product]));
    // localStorage.setItem("products", JSON.stringify(products));

    toast.success("Product Added Successfully");
    navigate("/");
  };

  return (
    <form
      onSubmit={addProductHandler}
      action=""
      className="flex flex-col items-center p-[5%] w-screen h-screen"
    >
      <h1 className="mb-5 text-3xl font-bold">Add New Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => setimage(e.target.value)}
        value={image}
      />
      <input
        type="text"
        placeholder="title"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        onChange={(e) => settitle(e.target.value)}
        value={title}
      />
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="category"
          className="text-1xl bg-zinc-100 rounded  p-3 w-[48%] mb-3"
          onChange={(e) => setcategory(e.target.value)}
          value={category}
        />

        <input
          type="number"
          placeholder="price"
          className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          onChange={(e) => setprice(e.target.value)}
          value={price}
        />
      </div>
      <textarea
        type="text"
        placeholder="Enter product description here..."
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        rows="10"
        onChange={(e) => setdescription(e.target.value)}
        value={description}
      />

      <div className="w-1/2">
        <button
          className="py-3 px-5 border rounded border-blue-300 text-blue-400 hover:bg-blue-100"
          href="/create"
        >
          Add New Product
        </button>
      </div>
    </form>
  );
};

export default Create;
