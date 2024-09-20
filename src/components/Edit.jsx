import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";

const Edit = () => {
  const [products, setproducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setproduct] = useState({
    title: "",
    image: "",
    category: "",
    price: "",
    description: "",
  });

  const ChangeHandler = (e) => {
    // console.log(e.target.name, e.target.value);
    //its a two-way binding
    setproduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setproduct(products.filter((p) => p.id == id)[0]);
  }, [id]);
  //   console.log(product);

  const addProductHandler = (e) => {
    e.preventDefault(); //preventDefault will stop for refreshing page again & again

    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Please fill all the fields");
      return;
    }

    // pi=product index
    const pi = products.findIndex((p) => p.id == id);

    const copyData = [...products];
    copyData[pi] = {...products[pi],...product};   // we copied data by ...product[pi] then the new data by ...product
    console.log(copyData);
    // console.log(product, pi);

    setproducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData));
   navigate(-1);
    
    // setproducts([...products, product]); // ...products means old product should be there as it is & products means new products would be add or set there
    // console.log(product);
    // localStorage.setItem("products", JSON.stringify([...products, product]));
    // // localStorage.setItem("products", JSON.stringify(products));
    // navigate("/");
  };

//   console.log(products);


  return (
    <form
      onSubmit={addProductHandler}
      action=""
      className="flex flex-col items-center p-[5%] w-screen h-screen"
    >
      <h1 className="mb-5 text-3xl font-bold">Edit New Product</h1>
      <input
        type="url"
        placeholder="image link"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="image"
        onChange={ChangeHandler}
        value={product && product.image}
      />
      <input
        type="text"
        placeholder="title"
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        name="title"
        onChange={ChangeHandler}
        value={product && product.title}
      />
      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="category"
          className="text-1xl bg-zinc-100 rounded  p-3 w-[48%] mb-3"
          name="category"
          onChange={ChangeHandler}
          value={product && product.category}
        />

        <input
          type="number"
          placeholder="price"
          className="text-1xl bg-zinc-100 rounded p-3 w-[48%] mb-3"
          name="price"
          onChange={ChangeHandler}
          value={product && product.price}
        />
      </div>
      <textarea
        type="text"
        placeholder="Enter product description here..."
        className="text-1xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
        rows="10"
        name="description"
        onChange={ChangeHandler}
        value={product && product.description}
      />

      <div className="w-1/2">
        <button
          className="py-3 px-5 border rounded border-blue-300 text-blue-400 hover:bg-blue-100"
          href="/create"
        >
          Edit Product
        </button>
      </div>
    </form>
  );
};

export default Edit;
