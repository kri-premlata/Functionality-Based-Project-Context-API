import React from "react";
import { ProductContext } from "../utils/Context";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext);
  //getting unique or distinct category of product
  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []); //acc-accumulator, cv-curre-valuent
  // console.log(distinct_category); // here we r getting repeated values

  //finding unique categories values only
  distinct_category = [...new Set(distinct_category)];
  // console.log(distinct_category); // here we r getting unique values

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},0.4)`;
  };
  // console.log(color);

  return (
    <nav className="w-[15%] h-full bg-zinc-100 flex flex-col items-center pt-5">
      <a
        className="py-3 px-5 border rounded border-blue-300 text-blue-400"
        href="/create"
      >
        Add New Product
      </a>
      <hr className="w-[80%] my-3" />
      <h1 className="text-2xl w-[80%] mb-3">Category Filter</h1>
      <div className=" w-[80%]">
        {distinct_category.map((c, i) => (
          <Link
            key={i}
            to={`/?category=${c}`}
            className=" mb-3 flex items-center "
          >
            <span style={{backgroundColor:color()}}  //changing random color of category box
             className="rounded-full mr-3  w-[20px] h-[20px]"></span>{" "}
            {c}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
