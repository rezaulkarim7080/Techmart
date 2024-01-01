import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";

const Categories = () => {
  const categories = useCategory();

  return (
    <div>   <h1 className="text-4xl text-center font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 py-10">See All Brand Laptop Categories</h1>
      <div className="py-10" style={{ marginTop: "20px" }}>

        <div className="flex justify-center flex-wrap gap-10">
          {categories.map((c) => (
            <div className="p-5" key={c._id}>
              <div className="card">
                <Link to={`/category/${c.slug}`} className="px-10 py-5 border-[2px] border-black font-medium text-4xl hover:rounded-2xl hover:shadow-xl ">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
