import React from "react";
import { useSearch } from "../context/search";

const Search = () => {
  const [values, setValues] = useSearch();

  return (
    <div >
      <div className="container">
        <div className="text-center">
          <h1 className="text-xl font-medium py-2">Search Resuts :</h1>
          <h6 className="text-xl font-medium py-2">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="flex flex-wrap justify-evenly mt-4 gap-5">
            {values?.results.map((p) => (
              <div className="border-[1px] border-black shadow-xl rounded-lg" style={{ width: "18rem" }}>
                <img
                  src={p.photo}

                  alt={p.name}
                />
                <div className="">
                  <h5 className="card-title">{p.name.slice(0, 25)}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 25)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <div className=" py-2 flex justify-around">
                    <button class="btn">More Details</button>
                    <button class="btn ">ADD TO CART</button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
